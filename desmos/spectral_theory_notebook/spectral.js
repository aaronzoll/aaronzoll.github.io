// Spectral theory notebook.
//
// Figure 1 is two Desmos states in /assets/desmos/json_files/spectral_theory_notebook/
// (built by _build_json.py) that draw everything through one matrix
// M = [a b; c d]. This script walks M through the three factors of
// A = P D P^T (left) and B = M D M^{-1} (right) with one shared slider,
// t in [0, 3]: step 1 applies P^T or M^{-1}, step 2 the shared D, step 3
// P or M. Styling and helpers follow the diagonalization notebook.

(function () {

  var C = { orange: '#fa7e19', purple: '#6042a6', gray: '#9a9a9a' };

  // ── Numbers and matrices ───────────────────────────────────────────────
  function num(x) { var s = (Math.round(x * 1e6) / 1e6).toString(); return s === '-0' ? '0' : s; }
  // Snap float noise first, so 11/8 = 1.375 rounds the same way wherever it appears.
  function hundredth(x) { var s = (Math.round(Math.round(x * 1e9) / 1e7) / 100).toString(); return s === '-0' ? '0' : s; }
  function mul(A, v) { return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; }
  function mm(A, B) {
    return [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  }
  function lerp(A, B, u) { return A.map(function (r, i) { return r.map(function (v, j) { return v + u * (B[i][j] - v); }); }); }
  function rot(th) { return [[Math.cos(th), -Math.sin(th)], [Math.sin(th), Math.cos(th)]]; }
  var I = [[1, 0], [0, 1]];
  function inv(M) {
    var d = M[0][0] * M[1][1] - M[0][1] * M[1][0];
    return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]];
  }

  // ── TeX ────────────────────────────────────────────────────────────────
  function colored(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }
  function vec(v) {
    var s = v.map(hundredth), neg = s.some(function (x) { return x.charAt(0) === '-'; });
    s = s.map(function (x) { return neg && x.charAt(0) !== '-' ? '\\phantom{-}' + x : x; });
    return '\\begin{bmatrix} ' + s.join(' \\\\ ') + ' \\end{bmatrix}';
  }

  function typesetMath(nodes) {
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise = MathJax.startup.promise
        .then(function () { return MathJax.typesetPromise(nodes); })
        .catch(function (err) { console.error(err); });
    }
  }
  function setMath(id, tex) {
    var el = document.getElementById(id);
    if (el.getAttribute('data-tex') === tex) { return null; }
    el.setAttribute('data-tex', tex);
    el.innerHTML = tex;
    return el;
  }
  function typesetAll(pairs) {
    calcOnRestPairs(pairs, function (ready) {
      var nodes = ready.map(function (p) { return setMath(p[0], p[1]); }).filter(Boolean);
      if (nodes.length) { typesetMath(nodes); }
    });
  }

  // ── Desmos helpers ─────────────────────────────────────────────────────
  function setVar(calc, id, name, v) { calc.setExpression({ id: id, latex: name + '=' + num(v) }); }
  function watch(calc, names, fn) {
    names.forEach(function (name) {
      calc.HelperExpression({ latex: name }).observe('numericValue', function () { fn(); });
    });
  }
  function value(calc, name) {
    if (!calc._spHelpers) { calc._spHelpers = {}; }
    if (!calc._spHelpers[name]) { calc._spHelpers[name] = calc.HelperExpression({ latex: name }); }
    return calc._spHelpers[name].numericValue;
  }
  // An empty label would show the point's coordinates, so hide it instead.
  function label(calc, id, text) { calc.setExpression({ id: id, label: text, showLabel: !!text }); }
  function quiet(calc) { calc.updateSettings({ zoomButtons: false }); }

  // Fit the +-6 board to the frame, whatever its shape, with a small margin.
  function fitBoard(calc) {
    var half = 6.5;
    function fit() {
      var pc = calc.graphpaperBounds.pixelCoordinates, w = pc.width, h = pc.height;
      if (!w || !h) { return; }
      var sx = w > h ? half * w / h : half, sy = w > h ? half : half * h / w;
      calc.setMathBounds({ left: -sx, right: sx, bottom: -sy, top: sy });
    }
    fit();
    window.addEventListener('resize', function () { requestAnimationFrame(fit); });
  }

  function frameThrottle(fn) {
    var pending = false;
    return function () {
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () { pending = false; fn(); });
    };
  }

  // ════════════════════════════════════════════════════════════════════════
  // Figure 1: rotate, stretch, rotate back (against change, stretch, change back)
  // ════════════════════════════════════════════════════════════════════════
  // Both sides share D = diag(2, 3/4). On the left, P is the 45 degree
  // rotation, so A = P D P^T = (1/8)[11 5; 5 11] is symmetric. On the right,
  // M = [v1 v2] with v1 = (1, 1), v2 = (-2, 3), so B = M D M^{-1} is the
  // diagonalization notebook's (1/4)[6 2; 3 5]. (v2 is that notebook's
  // (2, -3) flipped, so that det M > 0 and the in-between matrices
  // (1 - u) I + u M never collapse the plane.)
  var D = [[2, 0], [0, 0.75]];
  var TH = Math.PI / 4;
  var Mb = [[1, -2], [1, 3]], Mbi = inv(Mb);

  // The cumulative matrix after t of the three steps. Rotations turn
  // through their angle; the other factors slide straight from I.
  function stages(t, first, last) {
    var k = Math.min(2, Math.floor(t)), u = t - k;
    if (k === 0) { return first(u); }
    var F1 = first(1);
    if (k === 1) { return mm(lerp(I, D, u), F1); }
    return mm(last(u), mm(D, F1));
  }
  var SIDES = {
    sym: {
      at: function (t) { return stages(t, function (u) { return rot(-TH * u); }, function (u) { return rot(TH * u); }); },
      factors: [rot(-TH), D, rot(TH)],
      names: ['P^T', 'D', 'P'], whole: 'A', basis: ['u_1', 'u_2']
    },
    gen: {
      at: function (t) { return stages(t, function (u) { return lerp(I, Mbi, u); }, function (u) { return lerp(I, Mb, u); }); },
      factors: [Mbi, D, Mb],
      names: ['M^{-1}', 'D', 'M'], whole: 'B', basis: ['v_1', 'v_2']
    }
  };

  var STEP_TEXT = [
    'Start: the eigenvectors, their grid, and a circle of radius \\(2\\).',
    'Step 1: \\(P^T\\) <em>rotates</em> the eigenbasis onto \\(\\mathbf{e}_1, \\mathbf{e}_2\\); \\(M^{-1}\\) has to shear and squash it there.',
    'Step 2: the same stretch \\(D\\) on both sides, \\(2\\) along \\(\\mathbf{e}_1\\) and \\(\\tfrac{3}{4}\\) along \\(\\mathbf{e}_2\\).',
    'Step 3: \\(P\\) rotates back; \\(M\\) undoes its shear and squash.'
  ];

  function Figure(sym, gen) {
    var both = [sym, gen];
    both.forEach(function (c) { quiet(c); fitBoard(c); c._spSide = c === sym ? SIDES.sym : SIDES.gen; });
    var S = { t: 0, x: [3, -2] };
    var root = document.getElementById('sp1-steps');
    var input = root.querySelector('input'), play = document.getElementById('sp1-play');
    var snaps = root.querySelectorAll('[data-step]'), anim = null;

    // Dragging x in either graph moves it in both; only the graph last
    // pressed may move it (see the diagonalization notebook for why).
    var driver = null;
    both.forEach(function (calc) {
      calc._spEl.addEventListener('pointerdown', function () { driver = calc; }, true);
      watch(calc, ['p_{1}', 'p_{2}'], function () {
        if (calc !== driver) { return; }
        var x = [value(calc, 'p_{1}'), value(calc, 'p_{2}')];
        if (isNaN(x[0]) || isNaN(x[1]) || Math.hypot(x[0] - S.x[0], x[1] - S.x[1]) < 1e-6) { return; }
        S.x = x;
        both.forEach(function (c) {
          if (c !== calc) { setVar(c, 'p1', 'p_{1}', x[0]); setVar(c, 'p2', 'p_{2}', x[1]); }
        });
        readout();
      });
    });

    function set(t) {
      S.t = t;
      input.value = t;
      both.forEach(function (c) {
        var M = c._spSide.at(t);
        setVar(c, 'a', 'a', M[0][0]); setVar(c, 'b', 'b', M[0][1]);
        setVar(c, 'c', 'c', M[1][0]); setVar(c, 'd', 'd', M[1][1]);
      });
      labels();
      readout();
    }

    // At each whole step, name what the eigenvectors and x have become.
    function labels() {
      var k = Math.round(S.t), at = Math.abs(S.t - k) < 1e-6 ? k : -1;
      both.forEach(function (c) {
        var sd = c._spSide, n = sd.names;
        var b = [[sd.basis[0], 'e_1', 'De_1', sd.whole + sd.basis[0]], [sd.basis[1], 'e_2', 'De_2', sd.whole + sd.basis[1]]];
        var x = ['x', n[0] + 'x', 'D' + n[0] + 'x', sd.whole + 'x'];
        label(c, 'b1_tip', at < 0 ? '' : '`' + b[0][at] + '`');
        label(c, 'b2_tip', at < 0 ? '' : '`' + b[1][at] + '`');
        label(c, 'ax_tip', at < 0 ? '' : '`' + x[at] + '`');
      });
      var step = Math.min(3, Math.ceil(S.t - 1e-6));
      snaps.forEach(function (b) {
        var on = +b.getAttribute('data-step') === at;
        b.classList.toggle('site-btn--active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      typesetAll([['sp1-step', STEP_TEXT[Math.max(0, step)]]]);
    }

    // x, then each factor applied in turn; the ones not reached yet are grayed.
    var readout = frameThrottle(function () {
      var reached = Math.floor(S.t + 1e-6);
      function row(sd, title) {
        var v = S.x, out = '\\[\\text{' + title + ': } ' + colored(C.orange, '\\mathbf{x} = ' + vec(v));
        sd.factors.forEach(function (Fk, i) {
          v = mul(Fk, v);
          var tex = vec(v) + (i === 2 ? ' = ' + sd.whole + '\\mathbf{x}' : '');
          out += ' \\;\\xrightarrow{\\;' + sd.names[i] + '\\;}\\; ' + colored(i < reached ? C.orange : C.gray, tex);
        });
        return out + '\\]';
      }
      typesetAll([['sp1-calc-sym', row(SIDES.sym, 'Symmetric')], ['sp1-calc-gen', row(SIDES.gen, 'Not symmetric')]]);
    });

    var pause = null;
    function cancel() {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      if (pause) { clearTimeout(pause); pause = null; }
      play.textContent = '▶ Play';
    }
    // Glide from the current t to the target, easing in and out.
    function glide(to, dur, then) {
      var from = S.t, t0 = null;
      (function step(now) {
        if (t0 === null) { t0 = now; }
        var u = Math.min(1, (now - t0) / dur);
        set(Math.round((from + (to - from) * u * u * (3 - 2 * u)) * 1000) / 1000);
        if (u < 1) { anim = requestAnimationFrame(step); } else { anim = null; if (then) { then(); } }
      })(performance.now());
    }
    // Play walks through the remaining steps one at a time, pausing at each.
    function walk() {
      if (S.t >= 3 - 1e-6) { cancel(); return; }
      glide(Math.floor(S.t + 1e-6) + 1, 1300, function () {
        if (S.t >= 3 - 1e-6) { cancel(); return; }
        pause = setTimeout(function () { pause = null; walk(); }, 450);
      });
    }

    input.addEventListener('input', function () { cancel(); set(parseFloat(input.value)); });
    play.addEventListener('click', function () {
      if (anim || pause) { cancel(); return; }
      if (S.t >= 3 - 1e-6) { set(0); }
      play.textContent = '❚❚ Pause';
      walk();
    });
    snaps.forEach(function (b) {
      b.addEventListener('click', function () { cancel(); glide(+b.getAttribute('data-step'), 700); });
    });

    set(0);
  }

  // ════════════════════════════════════════════════════════════════════════
  // Figure 2: A x = l_1 P_1 x + l_2 P_2 x, built from the spectrum
  // ════════════════════════════════════════════════════════════════════════
  // The page owns the angle of u_1 and the two eigenvalues; the graph owns x.
  window.spFig2 = function (calc) {
    quiet(calc);
    fitBoard(calc);
    var S = { deg: 45, l: [2, 0.75], x: [-1, 4] };
    var sliders = [['sp2-th', 'deg'], ['sp2-l1', 0], ['sp2-l2', 1]];

    function set() {
      setVar(calc, 'q', 'q', S.deg * Math.PI / 180);
      setVar(calc, 'l1', 'l_{1}', S.l[0]);
      setVar(calc, 'l2', 'l_{2}', S.l[1]);
      readout();
    }
    sliders.forEach(function (s) {
      var input = document.getElementById(s[0]), out = document.getElementById(s[0] + '-val');
      input.addEventListener('input', function () {
        var v = parseFloat(input.value);
        if (s[1] === 'deg') { S.deg = v; out.textContent = v + '°'; } else { S.l[s[1]] = v; out.textContent = hundredth(v); }
        set();
      });
    });
    watch(calc, ['p_{1}', 'p_{2}'], function () {
      var x = [value(calc, 'p_{1}'), value(calc, 'p_{2}')];
      if (isNaN(x[0]) || isNaN(x[1])) { return; }
      S.x = x;
      readout();
    });

    var readout = frameThrottle(function () {
      var th = S.deg * Math.PI / 180, l = S.l, x = S.x;
      var u = [[Math.cos(th), Math.sin(th)], [-Math.sin(th), Math.cos(th)]];
      var A = [[0, 0], [0, 0]];
      u.forEach(function (w, k) {
        for (var i = 0; i < 2; i++) { for (var j = 0; j < 2; j++) { A[i][j] += l[k] * w[i] * w[j]; } }
      });
      var c = u.map(function (w) { return w[0] * x[0] + w[1] * x[1]; }), Ax = mul(A, x);
      var U = [colored(C.purple, '\\mathbf{u}_1'), colored(C.purple, '\\mathbf{u}_2')];
      var mat = '\\begin{bmatrix} ' + A.map(function (r) { return r.map(hundredth).join(' & '); }).join(' \\\\ ') + ' \\end{bmatrix}';
      var lam = function (k) { return '(' + hundredth(l[k]) + ')'; };
      typesetAll([
        ['sp2-calc-a', '\\[A = \\lambda_1' + U[0] + U[0] + '^T + \\lambda_2' + U[1] + U[1] + '^T = ' + mat +
          ', \\qquad ' + U[0] + ' = ' + vec(u[0]) + ', \\quad ' + U[1] + ' = ' + vec(u[1]) + '\\]'],
        ['sp2-calc-x', '\\[A' + colored(C.orange, '\\mathbf{x}') + ' = \\lambda_1(' + U[0] + '^T' + colored(C.orange, '\\mathbf{x}') + ')' + U[0] +
          ' + \\lambda_2(' + U[1] + '^T' + colored(C.orange, '\\mathbf{x}') + ')' + U[1] + ' = ' +
          lam(0) + '(' + hundredth(c[0]) + ')' + U[0] + ' + ' + lam(1) + '(' + hundredth(c[1]) + ')' + U[1] + ' = ' +
          colored('#c74440', vec(Ax)) + '\\]']
      ]);
    });

    set();
  };

  // Build once both graphs have loaded.
  var calcs = {};
  ['spFig1Sym', 'spFig1Gen'].forEach(function (n) {
    window[n] = function (calc, container) {
      calc._spEl = container;
      calcs[n] = calc;
      if (calcs.spFig1Sym && calcs.spFig1Gen) { Figure(calcs.spFig1Sym, calcs.spFig1Gen); }
    };
  });
})();
