// Diagonalization notebook.
//
// Each figure is a Desmos state in /assets/desmos/json_files/diagonalization_notebook/
// (built by _build_json.py) that draws everything from a few plain variables.
// This script writes those variables when the page's controls change, reads
// them back when a point is dragged, and fills in the live computations.
// Styling and helpers follow the eigenvector notebook, whose stylesheet the
// page links.

(function () {

  var C = { red: '#c74440', blue: '#2d70b3', orange: '#fa7e19', green: '#388c46', purple: '#6042a6' };
  var TOL = 1e-9;

  // ── Numbers ────────────────────────────────────────────────────────────
  function tenth(x) { return Math.round(x * 10) / 10; }
  function fmt(x) {
    var s = tenth(x).toFixed(1).replace(/\.0$/, '');
    return s === '-0' ? '0' : s;
  }
  function num(x) { var s = (Math.round(x * 1e6) / 1e6).toString(); return s === '-0' ? '0' : s; }
  function dec(x, k) { var s = x.toFixed(k); return /^-0\.?0*$/.test(s) ? s.slice(1) : s; }
  // 2.3 x 10^{-7} style, for the angles that shrink past what decimals can show.
  function sci(x) {
    if (x === 0) { return '0'; }
    if (x >= 0.01) { return dec(x, 3).replace(/\.?0+$/, ''); }
    var e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e);
    if (m >= 9.95) { m = 1; e += 1; }
    return m.toFixed(1) + ' \\times 10^{' + e + '}';
  }

  function mul(A, v) { return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; }

  // ── TeX ────────────────────────────────────────────────────────────────
  function colored(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }

  // Matrix from columns; columns holding a negative get \phantom{-} padding.
  function bmatrix(colList) {
    var padded = colList.map(function (col) {
      var strs = col.map(function (x) { return typeof x === 'string' ? x : fmt(x); });
      var neg = strs.some(function (s) { return s.charAt(0) === '-'; });
      return strs.map(function (s) { return neg && s.charAt(0) !== '-' ? '\\phantom{-}' + s : s; });
    });
    var rows = padded[0].map(function (_, i) {
      return padded.map(function (col) { return col[i]; }).join(' & ');
    });
    return '\\begin{bmatrix} ' + rows.join(' \\\\ ') + ' \\end{bmatrix}';
  }
  function mtx(A) { return bmatrix([[A[0][0], A[1][0]], [A[0][1], A[1][1]]]); }
  function vec(v) { return bmatrix([v]); }

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
    var nodes = pairs.map(function (p) { return setMath(p[0], p[1]); }).filter(Boolean);
    if (nodes.length) { typesetMath(nodes); }
  }

  // ── Desmos helpers ─────────────────────────────────────────────────────
  function setVar(calc, id, name, v) { calc.setExpression({ id: id, latex: name + '=' + num(v) }); }
  function show(calc, id, on) { calc.setExpression({ id: id, hidden: !on }); }
  function watch(calc, names, fn) {
    names.forEach(function (name) {
      calc.HelperExpression({ latex: name }).observe('numericValue', function () { fn(); });
    });
  }
  function value(calc, name) {
    if (!calc._dgHelpers) { calc._dgHelpers = {}; }
    if (!calc._dgHelpers[name]) { calc._dgHelpers[name] = calc.HelperExpression({ latex: name }); }
    return calc._dgHelpers[name].numericValue;
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

  function toggle(btn, onToggle) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('site-btn--active', on);
      onToggle(on);
    });
  }

  // s runs from 0 (the identity) to 1 (the full transformation); play eases it along.
  function Morph(id, onS) {
    var root = document.getElementById(id);
    var input = root.querySelector('input'), out = root.querySelector('.ev-s-val'), btn = root.querySelector('button');
    var anim = null;
    function set(s) {
      input.value = s;
      if (out) { out.textContent = fmt(s); }
      onS(s);
    }
    function cancel() { if (anim) { cancelAnimationFrame(anim); anim = null; } }
    input.addEventListener('input', function () { cancel(); set(parseFloat(input.value)); });
    btn.addEventListener('click', function () {
      cancel();
      var t0 = null, dur = 1600;
      (function step(t) {
        if (t0 === null) { t0 = t; }
        var u = Math.min(1, (t - t0) / dur);
        set(Math.round(u * u * (3 - 2 * u) * 100) / 100);
        anim = u < 1 ? requestAnimationFrame(step) : null;
      })(performance.now());
    });
    return { set: set };
  }

  // ════════════════════════════════════════════════════════════════════════
  // Figures 1 and 3: one transformation, two grids (two graphs in tandem)
  // ════════════════════════════════════════════════════════════════════════
  // A two-graph figure: the same plane, the same x and Ax, drawn once against
  // the standard grid and once against an eigenbasis grid. Each example gives
  // A, the eigenbasis P (as columns) and the matching eigenvalues L.
  // k, when given, is the factor pulled out front so the shown entries are integers.
  var FIG1 = { A: [[1.5, 0.5], [0.75, 1.25]], P: [[1, 2], [1, -3]], L: [2, 0.75], k: 4 };
  var PRESETS = [
    { name: 'Diagonal',      A: [[2, 0], [0, 3]],   P: [[1, 0], [0, 1]],  L: [2, 3] },
    { name: 'Symmetric',     A: [[2, 1], [1, 2]],   P: [[1, -1], [1, 1]], L: [3, 1] },
    { name: 'Symmetric',     A: [[1.8, 0.4], [0.4, 1.2]], P: [[2, -1], [1, 2]], L: [2, 1], k: 5 },
    { name: 'Not symmetric', A: [[1, 1], [0, 2]],   P: [[1, 1], [1, 0]],  L: [2, 1] }
  ];

  // Entries like 3/4 read better as fractions; anything else gets two decimals.
  function hundredth(x) { var s = (Math.round(x * 100) / 100).toString(); return s === '-0' ? '0' : s; }
  function frac(x) {
    for (var d = 1; d <= 12; d++) {
      var n = Math.round(x * d);
      if (Math.abs(x * d - n) < 1e-9) {
        if (d === 1) { return String(n); }
        return (n < 0 ? '-' : '') + '\\tfrac{' + Math.abs(n) + '}{' + d + '}';
      }
    }
    return hundredth(x);
  }
  function fmtx(A, f) { return bmatrix([[A[0][0], A[1][0]], [A[0][1], A[1][1]]].map(function (c) { return c.map(f); })); }
  // A, with the example's factor k pulled out front: (1/k)(kA).
  function aTex(ex) {
    if (!ex.k) { return fmtx(ex.A, frac); }
    return '\\tfrac{1}{' + ex.k + '}' + fmtx(ex.A.map(function (r) { return r.map(function (v) { return v * ex.k; }); }), frac);
  }
  function inv(M) {
    var d = M[0][0] * M[1][1] - M[0][1] * M[1][0];
    return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]];
  }
  // P^{-1} as (1/det) times the integer adjugate.
  function invTex(P) {
    var d = P[0][0] * P[1][1] - P[0][1] * P[1][0];
    var adj = [[P[1][1], -P[0][1]], [-P[1][0], P[0][0]]];
    if (d < 0) { d = -d; adj = adj.map(function (r) { return r.map(function (v) { return -v; }); }); }
    return (d === 1 ? '' : '\\frac{1}{' + d + '}') + fmtx(adj, frac);
  }
  // c1 b1 + c2 b2, with signs and unit coefficients tidied.
  function combo(c, b) {
    var out = '';
    [0, 1].forEach(function (k) {
      var v = hundredth(c[k]);
      if (v === '0') { return; }
      var neg = v.charAt(0) === '-', mag = neg ? v.slice(1) : v;
      out += (neg ? ' - ' : out ? ' + ' : '') + (mag === '1' ? '' : mag) + b[k];
    });
    return out || '\\mathbf{0}';
  }

  // o: { std, eig, morph, out: [ids of readout rows], factor: id or null, ex, x }
  function TwoGrids(o) {
    var both = [o.std, o.eig];
    both.forEach(function (c) { quiet(c); fitBoard(c); });
    var S = { x: o.x, s: 1, ex: o.ex };

    var morph = Morph(o.morph, function (s) {
      S.s = s;
      both.forEach(function (c) { setVar(c, 's', 's', s); });
      labels();
    });

    // Dragging x in either graph moves it in both.
    both.forEach(function (calc) {
      watch(calc, ['p_{1}', 'p_{2}'], function () {
        var x = [value(calc, 'p_{1}'), value(calc, 'p_{2}')];
        if (isNaN(x[0]) || isNaN(x[1]) || Math.hypot(x[0] - S.x[0], x[1] - S.x[1]) < 1e-6) { return; }
        S.x = x;
        place(calc);
      });
    });
    function place(source) {
      both.forEach(function (c) {
        if (c !== source) { setVar(c, 'p1', 'p_{1}', S.x[0]); setVar(c, 'p2', 'p_{2}', S.x[1]); }
      });
      render();
    }

    function load(ex) {
      S.ex = ex;
      var A = ex.A, P = ex.P;
      both.forEach(function (c) {
        setVar(c, 'a', 'a', A[0][0]); setVar(c, 'b', 'b', A[0][1]);
        setVar(c, 'c', 'c', A[1][0]); setVar(c, 'd', 'd', A[1][1]);
      });
      setVar(o.eig, 'u1x', 'u_{1x}', P[0][0]); setVar(o.eig, 'u1y', 'u_{1y}', P[1][0]);
      setVar(o.eig, 'u2x', 'u_{2x}', P[0][1]); setVar(o.eig, 'u2y', 'u_{2y}', P[1][1]);
      render();
    }

    // Tip labels name the vector before the morph and its image after.
    function labels() {
      [[o.std, 'e_1', 'e_2'], [o.eig, 'v_1', 'v_2']].forEach(function (g) {
        label(g[0], 'b1_tip', S.s === 0 ? '`' + g[1] + '`' : S.s === 1 ? '`A' + g[1] + '`' : '');
        label(g[0], 'b2_tip', S.s === 0 ? '`' + g[2] + '`' : S.s === 1 ? '`A' + g[2] + '`' : '');
        label(g[0], 'ax_tip', S.s === 1 ? '`Ax`' : '');
      });
    }

    var render = frameThrottle(function () {
      var ex = S.ex, A = ex.A, L = ex.L, D = [[L[0], 0], [0, L[1]]];
      var x = S.x, y = mul(inv(ex.P), x), Ax = mul(A, x), Dy = [L[0] * y[0], L[1] * y[1]];
      var X = colored(C.orange, '\\mathbf{x}'), Xb = colored(C.orange, '[\\mathbf{x}]_\\beta');
      var E = ['\\mathbf{e}_1', '\\mathbf{e}_2'];
      var V = [colored(C.purple, '\\mathbf{v}_1'), colored(C.purple, '\\mathbf{v}_2')];
      var cv = function (v) { return colored(C.orange, bmatrix([v.map(hundredth)])); };
      var rows = [
        [o.out[0], '\\[\\text{Standard: } ' + X + ' = ' + combo(x, E) + ', \\qquad A' + X + ' = ' + aTex(ex) +
          cv(x) + ' = ' + cv(Ax) + ', \\quad \\text{so } A' + X + ' = ' + combo(Ax, E) + '\\]'],
        [o.out[1], '\\[\\text{Eigenbasis: } ' + X + ' = ' + combo(y, V) + ', \\qquad D' + Xb + ' = ' + fmtx(D, frac) +
          cv(y) + ' = ' + cv(Dy) + ', \\quad \\text{so } A' + X + ' = ' + combo(Dy, V) + '\\]']
      ];
      if (o.factor) {
        rows.unshift([o.factor, '\\[A = PDP^{-1}: \\qquad ' + aTex(ex) + ' = ' + fmtx(ex.P, frac) + fmtx(D, frac) + invTex(ex.P) + '\\]']);
      }
      typesetAll(rows);
    });

    load(S.ex);
    morph.set(1);
    place(null);
    return { load: load };
  }

  // Figure 1 and the exploration each pair two graphs; build once both load.
  function pair(names, build) {
    var calcs = {};
    names.forEach(function (n) {
      window[n] = function (calc) {
        calcs[n] = calc;
        if (names.every(function (m) { return calcs[m]; })) { build(calcs[names[0]], calcs[names[1]]); }
      };
    });
  }

  pair(['dgFig1Std', 'dgFig1Eig'], function (std, eig) {
    TwoGrids({ std: std, eig: eig, morph: 'dg1-morph', out: ['dg1-calc-std', 'dg1-calc-eig'], ex: FIG1, x: [3, -2] });
  });

  pair(['dgFig3Std', 'dgFig3Eig'], function (std, eig) {
    var fig = TwoGrids({ std: std, eig: eig, morph: 'dg3-morph', out: ['dg3-calc-std', 'dg3-calc-eig'],
                         factor: 'dg3-calc-fact', ex: PRESETS[0], x: [2, -1] });
    var root = document.getElementById('dg3-presets');
    root.innerHTML = PRESETS.map(function (p, i) {
      return '<button type="button" class="site-btn ev-example" data-k="' + i + '" aria-pressed="' + (i === 0) + '">' +
        p.name + ' \\(' + fmtx(p.A, hundredth).replace('bmatrix', 'smallmatrix').replace('bmatrix', 'smallmatrix')
          .replace('\\begin{smallmatrix}', '\\left[\\begin{smallmatrix}').replace('\\end{smallmatrix}', '\\end{smallmatrix}\\right]') + '\\)</button>';
    }).join('');
    root.querySelector('[data-k="0"]').classList.add('site-btn--active');
    typesetMath([root]);
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-k]');
      if (!b) { return; }
      root.querySelectorAll('button').forEach(function (x) {
        var on = x === b;
        x.classList.toggle('site-btn--active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      fig.load(PRESETS[+b.getAttribute('data-k')]);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Figure 2: Fibonacci iterates F^k x, with a view that follows them out
  // ════════════════════════════════════════════════════════════════════════
  var PHI = (1 + Math.sqrt(5)) / 2;

  window.dgFig2 = function (calc) {
    quiet(calc);
    var S = { n: 6, scaled: false, eig: true };
    var nInput = document.getElementById('dg2-n'), nOut = document.getElementById('dg2-n-val');
    var play = document.getElementById('dg2-play'), timer = null, zoom = null;

    // F^k x for x = (0, 1) is (f_k, f_{k+1}); exact in doubles well past n = 30.
    function iterates(n) {
      var pts = [[0, 1]];
      for (var k = 1; k <= n; k++) { var q = pts[k - 1]; pts.push([q[1], q[0] + q[1]]); }
      return pts;
    }
    function shown(pts) {
      return S.scaled ? pts.map(function (q, k) { var r = Math.pow(PHI, -k); return [q[0] * r, q[1] * r]; }) : pts;
    }

    // The smallest box around the origin and every shown point, padded and
    // widened to the frame's shape so the eigenlines keep their true slopes.
    function target(pts) {
      var xs = [0], ys = [0];
      pts.forEach(function (q) { xs.push(q[0]); ys.push(q[1]); });
      if (S.scaled) { xs.push(1); ys.push(PHI); }
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
      var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var pad = 0.18 * Math.max(x1 - x0, y1 - y0, 1);
      x0 -= pad; x1 += pad; y0 -= pad; y1 += pad;
      var pc = calc.graphpaperBounds.pixelCoordinates, aspect = pc.width / pc.height || 1.4;
      var w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      if (w / h < aspect) { w = h * aspect; } else { h = w / aspect; }
      return { left: cx - w / 2, right: cx + w / 2, bottom: cy - h / 2, top: cy + h / 2 };
    }

    // Glide to the new box. The width moves geometrically, so a jump of
    // several powers of phi still reads as a steady zoom.
    function zoomTo(b, instant) {
      if (zoom) { cancelAnimationFrame(zoom); zoom = null; }
      var a = calc.graphpaperBounds.mathCoordinates;
      if (instant || !a || !isFinite(a.width)) { calc.setMathBounds(b); return; }
      var a0 = { left: a.left, right: a.right, bottom: a.bottom, top: a.top };
      var wa = a0.right - a0.left, wb = b.right - b.left, t0 = null, dur = 450;
      (function step(t) {
        if (t0 === null) { t0 = t; }
        var u = Math.min(1, (t - t0) / dur); u = u * u * (3 - 2 * u);
        var w = wa * Math.pow(wb / wa, u), f = Math.abs(wb - wa) < TOL ? u : (w - wa) / (wb - wa);
        calc.setMathBounds({
          left: a0.left + f * (b.left - a0.left), right: a0.right + f * (b.right - a0.right),
          bottom: a0.bottom + f * (b.bottom - a0.bottom), top: a0.top + f * (b.top - a0.top)
        });
        zoom = u < 1 ? requestAnimationFrame(step) : null;
      })(performance.now());
    }

    function draw(instant) {
      var raw = iterates(S.n), pts = shown(raw), n = S.n;
      calc.setExpression({ id: 'It', latex: 'I_{t}=\\left[' + pts.map(function (q) {
        return '\\left(' + q[0] + ',' + q[1] + '\\right)';
      }).join(',') + '\\right]' });
      label(calc, 'ilast', n === 0 || S.scaled ? '' : '`F^{' + n + '}x`');
      show(calc, 'lim', S.scaled);
      // Once the view zooms far out, the unit eigenvectors are a smudge at the origin.
      show(calc, 'evec', S.eig && (S.scaled || n <= 6));
      zoomTo(target(pts), instant);
      readout(raw);
    }

    function readout(raw) {
      var n = S.n, q = raw[n];
      var Fx = 'F^{' + n + '}' + colored(C.orange, '\\mathbf{x}');
      var first = '\\[' + Fx + ' = ' + bmatrix([['f_{' + n + '}', 'f_{' + (n + 1) + '}']]) + ' = ' +
        colored(C.orange, bmatrix([[String(q[0]), String(q[1])]]));
      if (n > 0) {
        var r = q[1] / q[0];
        first += ', \\qquad \\frac{f_{' + (n + 1) + '}}{f_{' + n + '}} = ' + dec(r, 6) + ', \\qquad ' +
          colored(C.green, '\\phi') + ' = ' + dec(PHI, 6);
      }
      first += '\\]';
      // Angle between F^n x and the green eigenline y = phi x.
      var ang = Math.abs(Math.atan2(q[1], q[0]) - Math.atan2(PHI, 1)) * 180 / Math.PI;
      var second = '\\[\\text{Angle between } ' + Fx + ' \\text{ and } ' + colored(C.green, 'E_\\phi') + ' : \\; {' + sci(ang) + '}^\\circ';
      if (S.scaled) {
        var s = Math.pow(PHI, -n);
        second += ', \\qquad \\phi^{-' + n + '}' + Fx + ' = ' + colored(C.orange, bmatrix([[dec(q[0] * s, 6), dec(q[1] * s, 6)]])) +
          ' \\to \\tfrac{1}{\\sqrt{5}}' + colored(C.green, '\\mathbf{v}_\\phi') + ' = ' +
          bmatrix([[dec(1 / Math.sqrt(5), 6), dec(PHI / Math.sqrt(5), 6)]]);
      }
      second += '\\]';
      typesetAll([['dg2-calc-n', first], ['dg2-calc-lim', second]]);
    }

    function setN(n, instant) {
      S.n = n;
      nInput.value = n;
      nOut.textContent = n;
      draw(instant);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; play.textContent = '▶ Play'; } }

    nInput.addEventListener('input', function () { stop(); setN(parseInt(nInput.value, 10)); });
    play.addEventListener('click', function () {
      if (timer) { stop(); return; }
      var max = parseInt(nInput.max, 10);
      setN(S.n >= max ? 0 : S.n + 1);
      play.textContent = '❚❚ Pause';
      timer = setInterval(function () {
        if (S.n >= max) { stop(); return; }
        setN(S.n + 1);
      }, 750);
    });
    toggle(document.getElementById('dg2-scale'), function (on) { S.scaled = on; draw(); });
    toggle(document.getElementById('dg2-eig'), function (on) { S.eig = on; show(calc, 'eig', on); draw(true); });

    window.addEventListener('resize', frameThrottle(function () { draw(true); }));
    setN(S.n, true);
  };
})();
