/* ===========================================================================
   main.js — Phaser front-end for the generalized moving-sofa simulation.

   The visual fix: world geometry is exact (both corridors are unit width and
   the sofa is a rigid body — verified). The old canvas stretched x and y
   unequally, which made the corridors look mismatched and the sofa appear to
   squeeze. Here a single Phaser camera applies a UNIFORM zoom over a
   device-pixel-correct buffer, so 1 world unit = the same number of screen
   pixels in x and y at all times. Corridors stay equal width; the sofa stays
   rigid. Instead of auto-fitting the whole corridor, the user zooms and pans.

   Math world is y-up; Phaser world is y-down. The map is (x, y) -> (x, -y),
   a reflection (isometry), so it preserves lengths and does not distort.
   =========================================================================== */
(function () {
  "use strict";
  var SM = window.SofaMath;

  /* ----- DOM ----- */
  var el = function (id) { return document.getElementById(id); };
  var alphaSlider = el('alpha'), aval = el('aval'), areaEl = el('area'), regimeEl = el('regime'),
      playBtn = el('play'), scrub = el('scrub'), statusEl = el('status'),
      einS = el('ein'), einLen = el('einLen'), eoutS = el('eout'), eoutLen = el('eoutLen'),
      zoomS = el('zoom'), zval = el('zval'), resetBtn = el('reset'), gameDiv = el('game');

  /* ----- app state ----- */
  var APP = {
    ready: false, scene: null, cam: null, gCorr: null, gCouch: null,
    alpha: 90, tau: 0, playing: false,
    entryExtra: 0, exitExtra: 0,
    shape: null, entryLen: 0, exitLen: 0
  };
  var ZMIN = 6, ZMAX = 900;
  var sliderToZoom = function (v) { return ZMIN * Math.pow(ZMAX / ZMIN, v / 1000); };
  var zoomToSlider = function (z) { return 1000 * Math.log(z / ZMIN) / Math.log(ZMAX / ZMIN); };
  var clamp = function (x, a, b) { return x < a ? a : (x > b ? b : x); };

  /* ----- per-alpha rebuild (shape + hallway lengths + readouts) ----- */
  function rebuildShape() {
    APP.shape = SM.buildShape(APP.alpha);
    APP.entryLen = APP.shape.minLin + APP.entryExtra;
    APP.exitLen = APP.shape.minLout + APP.exitExtra;
    areaEl.textContent = APP.shape.area.toFixed(3);
    regimeEl.textContent = APP.alpha < 89.5 ? 'acute corner' : (APP.alpha > 90.5 ? 'obtuse corner' : 'right angle');
    einLen.textContent = APP.entryLen.toFixed(1);
    eoutLen.textContent = APP.exitLen.toFixed(1);
  }
  function updateLengths() {
    APP.entryLen = APP.shape.minLin + APP.entryExtra;
    APP.exitLen = APP.shape.minLout + APP.exitExtra;
    einLen.textContent = APP.entryLen.toFixed(1);
    eoutLen.textContent = APP.exitLen.toFixed(1);
  }

  /* ----- geometry helpers (math coords, y-up) ----- */
  function corridorPolyMath() {
    var phi = APP.shape.phi, O = [Math.tan(phi / 2), 1], edx = Math.cos(phi), edy = -Math.sin(phi);
    var Lin = APP.entryLen, Lout = APP.exitLen;
    return [[-Lin, 1], O, [O[0] + Lout * edx, O[1] + Lout * edy], [Lout * edx, Lout * edy], [0, 0], [-Lin, 0]];
  }
  function couchVertsMath(tau) {
    var sh = APP.shape, st = { phi: sh.phi, Din: sh.Din, Dout: sh.Dout, xyAt: sh.xyAt };
    var pz = SM.pose(tau, st), c = Math.cos(pz.th), s = Math.sin(pz.th), P = sh.poly, out = new Array(P.length);
    for (var i = 0; i < P.length; i++) out[i] = [c * P[i][0] - s * P[i][1] + pz.vx, s * P[i][0] + c * P[i][1] + pz.vy];
    return out;
  }
  var toPhaser = function (pts) { var o = new Array(pts.length); for (var i = 0; i < pts.length; i++) o[i] = { x: pts[i][0], y: -pts[i][1] }; return o; };

  /* ----- rendering (constant on-screen stroke widths via /zoom) ----- */
  function render() {
    if (!APP.ready) return;
    var z = APP.cam.zoom;
    var corr = toPhaser(corridorPolyMath());
    APP.gCorr.clear();
    APP.gCorr.fillStyle(0x151a2e, 1); APP.gCorr.fillPoints(corr, true);
    APP.gCorr.lineStyle(2.5 / z, 0x3d4d80, 1); APP.gCorr.strokePoints(corr, true);
    var couch = toPhaser(couchVertsMath(APP.tau));
    APP.gCouch.clear();
    APP.gCouch.fillStyle(0x5882c8, 0.92); APP.gCouch.fillPoints(couch, true);
    APP.gCouch.lineStyle(1.7 / z, 0xe6ecff, 1); APP.gCouch.strokePoints(couch, true);
  }

  /* ----- camera: uniform zoom, pan, fit ----- */
  function syncZoomUI() { zoomS.value = clamp(zoomToSlider(APP.cam.zoom), 0, 1000); zval.textContent = Math.round(APP.cam.zoom); }
  function setZoomAboutScreen(sx, sy, newZoom) {
    var cam = APP.cam, z = clamp(newZoom, ZMIN, ZMAX);
    var before = cam.getWorldPoint(sx, sy); cam.setZoom(z); var after = cam.getWorldPoint(sx, sy);
    cam.scrollX += before.x - after.x; cam.scrollY += before.y - after.y;
    syncZoomUI(); render();
  }
  function setZoomKeepCenter(newZoom) {
    var cam = APP.cam; setZoomAboutScreen(cam.width / 2, cam.height / 2, newZoom);
  }
  // Frame the bend: sofa mid-turn + both hallway mouths (not the whole extended corridor).
  function resetView() {
    var sh = APP.shape, phi = sh.phi, O = [Math.tan(phi / 2), 1], edx = Math.cos(phi), edy = -Math.sin(phi);
    var pts = couchVertsMath(0.5).slice();
    pts.push([0, 0], O, [-2.5, 0], [-2.5, 1], [O[0] + 2.5 * edx, O[1] + 2.5 * edy], [2.5 * edx, 2.5 * edy]);
    var mx0 = 1e9, mx1 = -1e9, my0 = 1e9, my1 = -1e9;
    for (var i = 0; i < pts.length; i++) { var p = pts[i]; if (p[0] < mx0) mx0 = p[0]; if (p[0] > mx1) mx1 = p[0]; if (p[1] < my0) my0 = p[1]; if (p[1] > my1) my1 = p[1]; }
    var m = 0.4; mx0 -= m; mx1 += m; my0 -= m; my1 += m;
    var cam = APP.cam, vw = cam.width, vh = cam.height;
    // Phaser world (y-down): x unchanged, y -> -y
    var w = mx1 - mx0, h = my1 - my0;
    var z = clamp(Math.min(vw / w, vh / h) * 0.92, ZMIN, ZMAX);
    cam.setZoom(z);
    cam.centerOn((mx0 + mx1) / 2, -(my0 + my1) / 2);
    syncZoomUI(); render();
  }

  /* ----- Phaser scene ----- */
  class SofaScene extends Phaser.Scene {
    constructor() { super('sofa'); }
    create() {
      APP.scene = this; APP.cam = this.cameras.main;
      APP.gCorr = this.add.graphics(); APP.gCouch = this.add.graphics();

      // wheel zoom about pointer
      this.input.on('wheel', function (ptr, over, dx, dy) {
        var factor = dy > 0 ? 0.88 : 1.136;
        setZoomAboutScreen(ptr.x, ptr.y, APP.cam.zoom * factor);
      });
      // drag pan
      var dragging = false, lx = 0, ly = 0;
      this.input.on('pointerdown', function (ptr) { dragging = true; lx = ptr.x; ly = ptr.y; gameDiv.classList.add('grabbing'); });
      var endDrag = function () { dragging = false; gameDiv.classList.remove('grabbing'); };
      this.input.on('pointerup', endDrag);
      this.input.on('pointerupoutside', endDrag);
      this.input.on('pointermove', function (ptr) {
        if (!dragging) return;
        APP.cam.scrollX -= (ptr.x - lx) / APP.cam.zoom; APP.cam.scrollY -= (ptr.y - ly) / APP.cam.zoom;
        lx = ptr.x; ly = ptr.y;
      });
      // keep proportions correct on container resize
      this.scale.on('resize', function () { render(); });
      // wheel over the canvas zooms; don't let it scroll the surrounding page (esp. in an iframe)
      gameDiv.addEventListener('wheel', function (e) { e.preventDefault(); }, { passive: false });

      APP.ready = true;
      rebuildShape();
      resetView();
      render();
    }
    update(time, delta) {
      if (!APP.playing) return;
      APP.tau += Math.min(0.05, delta / 1000) * 0.16;
      if (APP.tau > 1) APP.tau -= 1;
      scrub.value = APP.tau * 100;
      render();
    }
  }

  /* ----- UI wiring ----- */
  playBtn.addEventListener('click', function () {
    APP.playing = !APP.playing;
    playBtn.innerHTML = APP.playing ? '\u275A\u275A&nbsp; Pause' : '\u25B6&nbsp; Play through';
  });
  scrub.addEventListener('input', function () {
    APP.playing = false; playBtn.innerHTML = '\u25B6&nbsp; Play through';
    APP.tau = +scrub.value / 100; render();
  });
  alphaSlider.addEventListener('input', function () {
    APP.alpha = +alphaSlider.value; aval.textContent = APP.alpha.toFixed(1);
    rebuildShape(); render();
  });
  einS.addEventListener('input', function () { APP.entryExtra = +einS.value; updateLengths(); render(); });
  eoutS.addEventListener('input', function () { APP.exitExtra = +eoutS.value; updateLengths(); render(); });
  zoomS.addEventListener('input', function () { setZoomKeepCenter(sliderToZoom(+zoomS.value)); });
  resetBtn.addEventListener('click', resetView);

  /* ----- boot: build the solution family, then start Phaser ----- */
  setTimeout(function () {
    var t0 = performance.now();
    var rng = SM.buildFamily();
    // clamp alpha slider to the achievable family range
    alphaSlider.min = rng.AMIN; alphaSlider.max = rng.AMAX;
    if (+alphaSlider.value < rng.AMIN) alphaSlider.value = rng.AMIN;
    if (+alphaSlider.value > rng.AMAX) alphaSlider.value = rng.AMAX;
    APP.alpha = +alphaSlider.value; aval.textContent = APP.alpha.toFixed(1);
    statusEl.innerHTML = 'Solution family computed for &alpha; in [' + rng.AMIN + '\u00B0,' + rng.AMAX + '\u00B0]; acute/right &alpha;\u2264' + (rng.CROSS - 1) + '\u00B0, obtuse &alpha;\u2265' + rng.CROSS + '\u00B0. <span style="opacity:.55">(' + Math.round(performance.now() - t0) + ' ms)</span>';

    new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#0b0e19',
      scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
      render: { antialias: true },
      scene: SofaScene
    });
  }, 30);
})();
