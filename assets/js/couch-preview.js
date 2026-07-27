/* ===========================================================================
   couch-preview.js — generates the Gallery thumbnail for the optimal-couch
   widget directly from its own math (widgets/src/couch/{coef,sofa-math}.js),
   instead of a hardcoded png/gif. Renders the Gerver construction at a fixed
   45deg corner; hovering plays the same enter->turn->exit motion the full
   widget uses (SofaMath.pose), a plain 2D canvas takes the place of Phaser
   since this is a small, chrome-free preview.
   =========================================================================== */
(function () {
  "use strict";

  function init() {
    var wrap = document.getElementById("couch-gallery-preview");
    var canvas = document.getElementById("couch-preview-canvas");
    var fallback = document.getElementById("couch-preview-fallback");
    if (!wrap || !canvas || typeof SofaMath === "undefined") return;

    var ALPHA = 45; // fixed corner angle (degrees); "gerver" construction
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var SIZE = 640;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    var shape = null, xform = null, tau = 0, playing = false, rafId = null, lastT = null;

    // Two different hallway lengths: VIEW_LEN sizes the camera (tight crop on
    // just the turn), DRAW_LEN is deliberately much longer so the hallway
    // polygon bleeds past the frame edges instead of showing a dead-end wall.
    var VIEW_LEN = 1.3, DRAW_LEN = VIEW_LEN + 18;

    // pose()'s straight entry/exit slide distance is scaled by Din/Dout, which
    // buildShape() sizes to the sofa's own extent (the minimum distance that
    // clears the turn without overlapping it). Keep TRAVEL at 1 so the couch
    // starts/ends right at that natural resting point, close to the corner —
    // computeTransform's camera fit (below) then hugs that tight sweep
    // instead of zooming out for a long straightaway.
    var TRAVEL = 1.0;
    function poseShape(sh) {
      if (!sh._poseShape) sh._poseShape = { phi: sh.phi, Din: sh.Din * TRAVEL, Dout: sh.Dout * TRAVEL, xyAt: sh.xyAt };
      return sh._poseShape;
    }

    function corridorPolyMath(sh, len) {
      var phi = sh.phi, O = [Math.tan(phi / 2), 1];
      var edx = Math.cos(phi), edy = -Math.sin(phi);
      return [[-len, 1], O, [O[0] + len * edx, O[1] + len * edy], [len * edx, len * edy], [0, 0], [-len, 0]];
    }

    function couchVertsMath(sh, t) {
      var pz = SofaMath.pose(t, poseShape(sh)), c = Math.cos(pz.th), s = Math.sin(pz.th), P = sh.poly, out = new Array(P.length);
      for (var i = 0; i < P.length; i++) out[i] = [c * P[i][0] - s * P[i][1] + pz.vx, s * P[i][0] + c * P[i][1] + pz.vy];
      return out;
    }

    function computeTransform(sh) {
      var pts = corridorPolyMath(sh, VIEW_LEN).slice();
      for (var k = 0; k <= 24; k++) pts = pts.concat(couchVertsMath(sh, k / 24));
      var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0];
        if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
      }
      var m = 0.12; x0 -= m; x1 += m; y0 -= m; y1 += m;
      var scale = Math.min(SIZE / (x1 - x0), SIZE / (y1 - y0));
      return { scale: scale, ox: (SIZE - scale * (x0 + x1)) / 2, oy: (SIZE + scale * (y0 + y1)) / 2 };
    }

    function toScreen(p) { return [xform.ox + xform.scale * p[0], xform.oy - xform.scale * p[1]]; }

    function drawPoly(pts, fill, stroke, lineWidth) {
      ctx.beginPath();
      var p0 = toScreen(pts[0]);
      ctx.moveTo(p0[0], p0[1]);
      for (var i = 1; i < pts.length; i++) { var p = toScreen(pts[i]); ctx.lineTo(p[0], p[1]); }
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.lineWidth = lineWidth; ctx.strokeStyle = stroke; ctx.stroke(); }
    }

    // Same palette as the deployed widget (widgets/optimal-couch_code.html
    // render()): cream ground, wood-toned couch — not the dark navy scheme
    // from the older unbundled src/couch/main.js.
    function render() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "#f7f5f0";
      ctx.fillRect(0, 0, SIZE, SIZE);
      drawPoly(corridorPolyMath(shape, DRAW_LEN), "#efe9db", "#b0bec5", 2.5);
      drawPoly(couchVertsMath(shape, tau), "rgba(166, 123, 91, 0.92)", "#593302", 1.7);
    }

    var PAUSE_MS = 650; // hold at the end of the exit slide before looping back
    var pausedAt = null;

    function step(t) {
      if (!playing) { rafId = null; return; }
      if (lastT == null) lastT = t;
      var dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;

      if (pausedAt != null) {
        if (t - pausedAt >= PAUSE_MS) { pausedAt = null; tau = 0; render(); }
      } else {
        tau += dt * 0.24; // 50% faster than the full widget's default pace (0.16)
        if (tau >= 1) { tau = 1; pausedAt = t; }
        render();
      }
      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (!shape || playing) return;
      playing = true; lastT = null; pausedAt = null;
      rafId = requestAnimationFrame(step);
    }
    function stop() {
      playing = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      tau = 0;
      pausedAt = null;
      if (shape) render();
    }

    var link = wrap.closest("a");
    link.addEventListener("mouseenter", start);
    link.addEventListener("mouseleave", stop);
    link.addEventListener("focus", start);
    link.addEventListener("blur", stop);

    // Touch devices have no hover: the gallery's tap-to-reveal script (see
    // custom_js) toggles an "is-revealed" class on first tap instead. Mirror
    // that here so the animation plays then too, rather than only reacting
    // to mouse events.
    new MutationObserver(function () {
      if (link.classList.contains("is-revealed")) start(); else stop();
    }).observe(link, { attributes: true, attributeFilter: ["class"] });

    // Solving the sofa family + extracting its boundary is the only non-trivial
    // cost here; defer it so it never blocks first paint of the gallery.
    setTimeout(function () {
      try {
        SofaMath.buildFamily();
        shape = SofaMath.buildShape(ALPHA);
        xform = computeTransform(shape);
        render();
        canvas.hidden = false;
        if (fallback) fallback.style.display = "none";
      } catch (e) {
        console.error("couch preview generation failed, keeping static fallback image", e);
      }
    }, 0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
