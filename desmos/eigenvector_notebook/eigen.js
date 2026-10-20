// Eigenvector notebook: one shared matrix and the figures that use it.
//
// Each figure is a Desmos state in /assets/desmos/json_files/eigenvector_notebook/
// that draws everything from a few plain variables (the entries a, b, c, d,
// the morph s, a vector, ...). This script owns those variables: it writes them
// when the page's controls change, reads them back when a point is dragged,
// and does the linear algebra for the live computations under each figure.
//
// There is one matrix A for the whole page. Every figure panel carries a copy
// of its controls, and editing any copy (or dragging a column in Figure 1)
// updates every figure. Every number shown is rounded to the nearest tenth.

(function () {

  // ── Look ───────────────────────────────────────────────────────────────
  // The change-of-basis family's palette; these match the JSON layer colors.
  var C = { red: '#c74440', blue: '#2d70b3', orange: '#fa7e19', green: '#388c46', purple: '#6042a6' };

  var EXAMPLES = [
    { name: '3Blue1Brown', A: [[3, 1], [0, 2]] },
    { name: 'Diagonal',    A: [[-1, 0], [0, 2]] },
    { name: 'Rotation',    A: [[0, -1], [1, 0]] },
    { name: 'Shear',       A: [[1, 1], [0, 1]] }
  ];

  var MAX_ENTRY = 6;     // the JSON sliders' range
  var TOL = 1e-9;

  // ── Numbers ────────────────────────────────────────────────────────────
  function tenth(x) { return Math.round(x * 10) / 10; }
  function fmt(x) {
    var s = tenth(x).toFixed(1).replace(/\.0$/, '');
    return s === '-0' ? '0' : s;
  }
  function num(x) { var s = (Math.round(x * 1e6) / 1e6).toString(); return s === '-0' ? '0' : s; }
  function clean(x) { return Math.abs(x) < TOL ? 0 : x; }
  function clone(A) { return [A[0].slice(), A[1].slice()]; }
  function same(A, B) { return [0, 1].every(function (i) { return [0, 1].every(function (j) { return Math.abs(A[i][j] - B[i][j]) < TOL; }); }); }

  // "3", "-2/5", "0.25", ".5", "−1" -> a number rounded to tenths; anything else -> null.
  function parseEntry(s) {
    var t = String(s).replace(/\s+/g, '').replace(/−/g, '-'), m, v;
    if (t === '' || t === '-') { return 0; }
    if ((m = /^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/.exec(t))) { v = parseFloat(m[1]) / parseFloat(m[2]); }
    else if (/^-?(\d+\.?\d*|\.\d+)$/.test(t)) { v = parseFloat(t); }
    else { return null; }
    if (!isFinite(v)) { return null; }
    return Math.max(-MAX_ENTRY, Math.min(MAX_ENTRY, tenth(v)));
  }

  // ── 2 x 2 linear algebra ───────────────────────────────────────────────
  function mul(A, v) { return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; }
  function mm(A, B) {
    return [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  }
  function det(A) { return A[0][0] * A[1][1] - A[0][1] * A[1][0]; }
  function inv(A) {
    var D = det(A);
    return [[A[1][1] / D, -A[0][1] / D], [-A[1][0] / D, A[0][0] / D]];
  }
  function shift(A, l) { return [[A[0][0] - l, A[0][1]], [A[1][0], A[1][1] - l]]; }
  function cols(A) { return [[A[0][0], A[1][0]], [A[0][1], A[1][1]]]; }

  // Scale a direction so its largest entry is +1 (ties: the last entry positive),
  // so (1, -1) reads as 3Blue1Brown's (-1, 1).
  function nice(v) {
    var m = Math.abs(v[0]) > Math.abs(v[1]) + TOL ? v[0] : v[1];
    return [clean(v[0] / m), clean(v[1] / m)];
  }

  // A basis of N(B) for a 2 x 2 matrix B: [], one vector, or the whole plane.
  function nullBasis(B) {
    var r0 = B[0], r1 = B[1];
    var n0 = Math.hypot(r0[0], r0[1]), n1 = Math.hypot(r1[0], r1[1]);
    var r = n0 >= n1 ? r0 : r1, n = Math.max(n0, n1);
    if (n < TOL) { return [[1, 0], [0, 1]]; }
    if (Math.abs(det(B)) > 1e-7 * Math.max(1, n * n)) { return []; }
    return [nice([-r[1], r[0]])];
  }

  // Real eigenvalues in increasing order, with their eigenspaces, and an
  // eigenbasis when there is one.
  function eig(A) {
    var tr = A[0][0] + A[1][1], D = det(A), disc = clean(tr * tr - 4 * D);
    var out = { tr: tr, det: D, disc: disc };
    if (disc < 0) {
      out.complex = { re: tr / 2, im: Math.sqrt(-disc) / 2 };
      out.vals = [];
      out.spaces = [];
      return out;
    }
    var q = Math.sqrt(disc) / 2;
    out.vals = q < TOL ? [tr / 2] : [tr / 2 - q, tr / 2 + q];
    out.spaces = out.vals.map(function (l) { return nullBasis(shift(A, l)); });
    // Two independent eigenvectors: distinct eigenvalues, or A = lambda I.
    // The basis lists the larger eigenvalue first, as in 3Blue1Brown's example.
    if (out.vals.length === 2) {
      out.basis = { P: [out.spaces[1][0], out.spaces[0][0]], L: [out.vals[1], out.vals[0]] };
    } else if (out.spaces[0].length === 2) {
      out.basis = { P: out.spaces[0], L: [out.vals[0], out.vals[0]] };
    }
    return out;
  }

  // ── TeX ────────────────────────────────────────────────────────────────
  // \color recolors the rest of its group in MathJax, so each piece gets its own.
  function colored(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }

  // Matrix from columns of numbers. In any column holding a negative entry,
  // the other entries get a \phantom{-} so the digits line up.
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
  function mtx(A) { return bmatrix(cols(A)); }
  function vec(v) { return bmatrix([v]); }

  // lambda^2 - (tr) lambda + det, with signs and unit coefficients tidied.
  function charPoly(tr, D) {
    var s = '\\lambda^2';
    var t = tenth(-tr), d = tenth(D);
    if (t) { s += (t < 0 ? ' - ' : ' + ') + (Math.abs(t) === 1 ? '' : fmt(Math.abs(t))) + '\\lambda'; }
    if (d) { s += (d < 0 ? ' - ' : ' + ') + fmt(Math.abs(d)); }
    return s;
  }
  function complexPair(z) {
    var re = tenth(z.re) ? fmt(z.re) + ' \\pm ' : '\\pm ';
    return re + (tenth(z.im) === 1 ? '' : fmt(z.im)) + 'i';
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
    var nodes = pairs.map(function (p) { return setMath(p[0], p[1]); }).filter(Boolean);
    if (nodes.length) { typesetMath(nodes); }
  }

  // ── Desmos helpers ─────────────────────────────────────────────────────
  function setVar(calc, id, name, v) { calc.setExpression({ id: id, latex: name + '=' + num(v) }); }
  function setEntries(calc, A) {
    setVar(calc, 'a', 'a', A[0][0]); setVar(calc, 'b', 'b', A[0][1]);
    setVar(calc, 'c', 'c', A[1][0]); setVar(calc, 'd', 'd', A[1][1]);
  }
  function show(calc, id, on) { calc.setExpression({ id: id, hidden: !on }); }
  function watch(calc, names, fn) {
    names.forEach(function (name) {
      calc.HelperExpression({ latex: name }).observe('numericValue', function () { fn(); });
    });
  }
  function value(calc, name) {
    if (!calc._evHelpers) { calc._evHelpers = {}; }
    if (!calc._evHelpers[name]) { calc._evHelpers[name] = calc.HelperExpression({ latex: name }); }
    return calc._evHelpers[name].numericValue;
  }
  function quiet(calc) { calc.updateSettings({ zoomButtons: false }); }

  // Fit the +-6 board to the frame, whatever its shape, with a small margin.
  // Returns the fitting function, for frames that change size later.
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
    return fit;
  }

  // Throttle a render to one per animation frame.
  function frameThrottle(fn) {
    var pending = false;
    return function () {
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () { pending = false; fn(); });
    };
  }

  // ── The shared matrix ──────────────────────────────────────────────────
  var SHARED = { A: clone(EXAMPLES[0].A), controls: [], figures: [] };

  // source: the figure that changed A (it already shows the new value).
  function setShared(A, source) {
    if (same(A, SHARED.A)) { return; }
    SHARED.A = clone(A);
    SHARED.controls.forEach(function (c) { c.show(); });
    SHARED.figures.forEach(function (f) { if (f !== source) { f(clone(A)); } });
  }
  function onShared(fn) { SHARED.figures.push(fn); return fn; }

  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  // A random integer matrix with two real eigenvalues (the examples cover
  // rotations and shears), different from the current one.
  function randomMatrix() {
    for (var tries = 0; tries < 500; tries++) {
      var A = [[randInt(-3, 3), randInt(-3, 3)], [randInt(-3, 3), randInt(-3, 3)]];
      var zeros = A[0].concat(A[1]).filter(function (x) { return x === 0; }).length;
      if (zeros > 2 || same(A, SHARED.A)) { continue; }
      var E = eig(A);
      if (E.vals.length === 2 && Math.abs(E.vals[0]) <= 4 && Math.abs(E.vals[1]) <= 4) { return A; }
    }
    return clone(EXAMPLES[0].A);
  }

  // One copy of the matrix controls: a bracketed 2 x 2 grid of entry boxes
  // (after the null-space page), the examples, and Random.
  function MatrixControl(root) {
    var text = SHARED.A.map(function (r) { return r.map(fmt); });

    root.innerHTML =
      '<div class="ev-mtx"><span class="ev-mtx-name">\\(A =\\)</span><div class="ev-mtx-body"></div></div>' +
      '<div class="ev-grid2 ev-examples">' +
      EXAMPLES.map(function (p, i) {
        return '<button type="button" class="site-btn ev-example" data-k="' + i + '" aria-pressed="false">' + p.name + '</button>';
      }).join('') +
      '<button type="button" class="site-btn ev-random ev-span2">Random</button>' +
      '</div>';

    var body = root.querySelector('.ev-mtx-body');
    body.innerHTML = [0, 1].map(function (i) {
      return [0, 1].map(function (j) {
        return '<input data-i="' + i + '" data-j="' + j + '" inputmode="decimal" autocomplete="off" spellcheck="false"' +
               ' title="A number between −6 and 6, such as 1.5 or 3/4 (rounded to the nearest tenth); arrow keys move between entries"' +
               ' aria-label="Entry ' + (i + 1) + ', ' + (j + 1) + ' of A">';
      }).join('');
    }).join('');
    var boxes = body.querySelectorAll('input'), chips = root.querySelectorAll('.ev-example');

    // Rewrite the boxes from the shared matrix, leaving alone a box being typed in.
    function sync(except) {
      boxes.forEach(function (inp) {
        var i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
        if (inp === except) { return; }
        var typed = parseEntry(text[i][j]);
        if (typed === null || Math.abs(typed - SHARED.A[i][j]) > TOL) { text[i][j] = fmt(SHARED.A[i][j]); }
        inp.value = text[i][j];
        inp.classList.remove('bad');
      });
      chips.forEach(function (b) {
        var on = same(EXAMPLES[+b.getAttribute('data-k')].A, SHARED.A);
        b.classList.toggle('site-btn--active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    body.addEventListener('input', function (e) {
      var inp = e.target, i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
      var v = parseEntry(inp.value);
      inp.classList.toggle('bad', v === null);
      text[i][j] = inp.value;
      if (v === null) { return; }
      var A = clone(SHARED.A);
      A[i][j] = v;
      typing = inp;
      setShared(A);
      typing = null;
    });
    var typing = null;
    // On leaving a box, show the value actually used (rounded and clamped).
    body.addEventListener('focusout', function (e) {
      var inp = e.target, i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
      text[i][j] = fmt(SHARED.A[i][j]);
      inp.value = text[i][j];
      inp.classList.remove('bad');
    });
    body.addEventListener('focusin', function (e) { if (e.target.select) { e.target.select(); } });
    body.addEventListener('keydown', function (e) {
      var inp = e.target, i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
      var all = inp.selectionEnd - inp.selectionStart === inp.value.length, to = null;
      if (e.key === 'ArrowUp') { to = [i - 1, j]; }
      else if (e.key === 'ArrowDown') { to = [i + 1, j]; }
      else if (e.key === 'ArrowLeft' && (all || inp.selectionStart === 0)) { to = [i, j - 1]; }
      else if (e.key === 'ArrowRight' && (all || inp.selectionStart === inp.value.length)) { to = [i, j + 1]; }
      else if (e.key === 'Enter') { to = j === 0 ? [i, 1] : [(i + 1) % 2, 0]; }
      var next = to && body.querySelector('input[data-i="' + to[0] + '"][data-j="' + to[1] + '"]');
      if (next) { e.preventDefault(); next.focus(); next.select(); }
    });

    chips.forEach(function (b) {
      b.addEventListener('click', function () { setShared(EXAMPLES[+b.getAttribute('data-k')].A); });
    });
    root.querySelector('.ev-random').addEventListener('click', function () { setShared(randomMatrix()); });

    var ctl = { show: function () { sync(typing); } };
    SHARED.controls.push(ctl);
    sync();
    typesetMath([root.querySelector('.ev-mtx-name')]);
    return ctl;
  }

  // ── Morph slider ───────────────────────────────────────────────────────
  // s runs from 0 (the identity) to 1 (A); the play button eases it along,
  // the way 3Blue1Brown animates a transformation.
  function Morph(id, onS) {
    var root = document.getElementById(id);
    var input = root.querySelector('input'), out = root.querySelector('.ev-s-val'), btn = root.querySelector('button');
    var anim = null;
    function set(s) {
      input.value = s;
      out.textContent = fmt(s);
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

  function wireToggles(scope, calc, onToggle) {
    document.querySelectorAll(scope + ' .ev-toggle').forEach(function (btn) {
      // Start each folder in the state its button shows.
      var f = btn.getAttribute('data-folder');
      if (f) { show(calc, f, btn.getAttribute('aria-pressed') === 'true'); }
      btn.addEventListener('click', function () {
        var on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.classList.toggle('site-btn--active', on);
        if (f) { show(calc, f, on); }
        if (onToggle) { onToggle(btn.getAttribute('data-key') || f, on); }
      });
    });
  }
  function pressed(scope, key) {
    var b = document.querySelector(scope + ' .ev-toggle[data-key="' + key + '"], ' + scope + ' .ev-toggle[data-folder="' + key + '"]');
    return !!b && b.getAttribute('aria-pressed') === 'true';
  }

  function setLine(calc, ids, names, v) { setVar(calc, ids[0], names[0], v[0]); setVar(calc, ids[1], names[1], v[1]); }

  // ════════════════════════════════════════════════════════════════════════
  // Figure 1: a matrix is a transformation (inside the closed refresher)
  // ════════════════════════════════════════════════════════════════════════
  window.evFig1 = function (calc) {
    quiet(calc);
    var fit = fitBoard(calc);
    var S = { x: [1, 1], s: 1 };
    MatrixControl(document.getElementById('ev1-matrix'));

    // The refresher starts closed, so the graph is laid out at zero size;
    // resize and refit it the first time it opens.
    var box = document.getElementById('refresher');
    box.addEventListener('toggle', function () { if (box.open) { calc.resize(); fit(); } });

    var me = onShared(function (A) { setEntries(calc, A); render(); });

    var morph = Morph('ev1-morph', function (s) {
      S.s = s;
      setVar(calc, 's', 's', s);
      show(calc, 'h1', s === 1); show(calc, 'h2', s === 1);
      layers();
    });

    wireToggles('#ev1', calc);

    // Dragging a column tip writes the sliders; share the result.
    watch(calc, ['a', 'b', 'c', 'd'], function () {
      var B = [[value(calc, 'a'), value(calc, 'b')], [value(calc, 'c'), value(calc, 'd')]];
      if (B.some(function (r) { return r.some(isNaN); })) { return; }
      B = B.map(function (r) { return r.map(tenth); });
      if (!same(B, SHARED.A)) { setShared(B, me); render(); }
    });
    watch(calc, ['x_{1}', 'x_{2}'], function () {
      var x = [value(calc, 'x_{1}'), value(calc, 'x_{2}')];
      if (isNaN(x[0]) || isNaN(x[1])) { return; }
      S.x = x.map(tenth);
      render();
    });

    // The null space shows once the transformation has finished, since it
    // is the set of vectors A (not the in-between matrices) sends to 0.
    function layers() {
      var N = nullBasis(SHARED.A), on = N.length === 1 && S.s === 1;
      if (on) { setLine(calc, ['n1', 'n2'], ['n_{1}', 'n_{2}'], N[0]); }
      show(calc, 'null', on);
    }

    var render = frameThrottle(function () {
      layers();
      var A = SHARED.A, c = cols(A), Ax = mul(A, S.x), D = det(A), N = nullBasis(A);
      var null_;
      if (N.length === 2) { null_ = '\\det A = 0 \\text{ and } A = 0, \\text{ so } \\mathcal{N}(A) = \\R^2'; }
      else if (N.length === 1) {
        null_ = '\\det A = 0, \\text{ so } \\mathcal{N}(A) = \\operatorname{span}\\left\\{' + colored(C.green, vec(N[0])) + '\\right\\}';
      } else { null_ = '\\det A = ' + fmt(D) + ' \\neq 0, \\text{ so } \\mathcal{N}(A) = \\{\\mathbf{0}\\}'; }
      typesetAll([
        ['ev1-calc-ax', '\\[A' + colored(C.orange, '\\mathbf{x}') + ' = ' + colored(C.orange, fmt(S.x[0])) + colored(C.red, vec(c[0])) +
          (tenth(S.x[1]) < 0 ? ' - ' + colored(C.orange, fmt(-S.x[1])) : ' + ' + colored(C.orange, fmt(S.x[1]))) +
          colored(C.blue, vec(c[1])) + ' = ' + colored(C.orange, vec(Ax)) + '\\]'],
        ['ev1-calc-null', '\\[' + null_ + '\\]']
      ]);
    });

    setEntries(calc, SHARED.A);
    morph.set(1);
    render();
  };

  // ════════════════════════════════════════════════════════════════════════
  // Figure 2: vectors that stay on their span
  // ════════════════════════════════════════════════════════════════════════
  window.evFig2 = function (calc) {
    quiet(calc); fitBoard(calc);
    var S = { v: [1, 2], s: 1 };
    MatrixControl(document.getElementById('ev2-matrix'));
    onShared(function (A) { setEntries(calc, A); render(); });

    var morph = Morph('ev2-morph', function (s) {
      S.s = s;
      setVar(calc, 's', 's', s);
      calc.setExpression({ id: 'av_tip', label: s === 0 ? '`v`' : s === 1 ? '`Av`' : '' });
    });

    wireToggles('#ev2', calc, function () { render(); });

    watch(calc, ['v_{1}', 'v_{2}'], function () {
      var v = [value(calc, 'v_{1}'), value(calc, 'v_{2}')];
      if (isNaN(v[0]) || isNaN(v[1])) { return; }
      S.v = v;
      render();
    });

    // Snap v onto the eigenline closest in angle, keeping its length.
    document.getElementById('ev2-snap').addEventListener('click', function () {
      var lines = [];
      eig(SHARED.A).spaces.forEach(function (sp) { if (sp.length === 1) { lines.push(sp[0]); } });
      if (!lines.length) { return; }
      var r = Math.hypot(S.v[0], S.v[1]) || 2, best = null, bestCos = -1;
      lines.forEach(function (u) {
        var cs = Math.abs(u[0] * S.v[0] + u[1] * S.v[1]) / (Math.hypot(u[0], u[1]) * r);
        if (cs > bestCos) { bestCos = cs; best = u; }
      });
      var sign = best[0] * S.v[0] + best[1] * S.v[1] < 0 ? -1 : 1, k = sign * r / Math.hypot(best[0], best[1]);
      // When the eigenline passes through tenths points, land on one, so the
      // rounded v and Av shown below agree exactly.
      if (tenth(best[0]) === best[0] && tenth(best[1]) === best[1]) {
        k = tenth(k) || sign * 0.1;
        while (Math.abs(best[0] * k) > MAX_ENTRY || Math.abs(best[1] * k) > MAX_ENTRY) { k -= sign * 0.1; }
      }
      setVar(calc, 'v1', 'v_{1}', best[0] * k);
      setVar(calc, 'v2', 'v_{2}', best[1] * k);
    });

    function eigenlines(E) {
      var on = pressed('#ev2', 'eig'), spaces = E.spaces;
      var whole = spaces.length === 1 && spaces[0].length === 2;
      // Green is the larger eigenvalue, purple the smaller, as in Figure 5.
      [0, 1].forEach(function (k) {
        var sp = spaces[spaces.length - 1 - k];
        var u = whole ? [[1, 0], [0, 1]][k] : sp && sp.length === 1 ? sp[0] : null;
        if (on && u) {
          setLine(calc, ['u' + (k + 1) + 'x', 'u' + (k + 1) + 'y'], ['u_{' + (k + 1) + 'x}', 'u_{' + (k + 1) + 'y}'], u);
        }
        show(calc, 'eig' + (k + 1), on && !!u);
      });
      document.getElementById('ev2-snap').disabled = !E.vals.length;
    }

    var render = frameThrottle(function () {
      var A = SHARED.A, E = eig(A);
      eigenlines(E);
      var v = S.v, Av = mul(A, v), r = Math.hypot(v[0], v[1]);
      var cross = v[0] * Av[1] - v[1] * Av[0], dotp = v[0] * Av[0] + v[1] * Av[1];
      var ang = Math.atan2(cross, dotp) * 180 / Math.PI, off = Math.min(Math.abs(ang), 180 - Math.abs(ang));
      var V = colored(C.orange, '\\mathbf{v}'), status;
      if (r < TOL) {
        status = '\\mathbf{v} = \\mathbf{0} \\text{ has no span to stay on.}';
      } else if (Math.abs(cross) < 1e-6 * Math.max(1, r * r)) {
        status = 'A' + V + ' = ' + fmt(dotp / (r * r)) + V + ' \\text{: } \\mathbf{v} \\text{ stays on its span, so it is an eigenvector.}';
      } else {
        status = 'A' + V + ' \\text{ is knocked off the span of } ' + V + ' \\text{ by } ' + fmt(off) + '^\\circ.';
      }
      var lines = '';
      if (pressed('#ev2', 'eig')) {
        if (E.complex) {
          lines = '\\text{No real eigenvalues, so every } \\mathbf{v} \\neq \\mathbf{0} \\text{ is knocked off its span.}';
        } else if (E.spaces.length === 1 && E.spaces[0].length === 2) {
          lines = 'A = ' + fmt(E.vals[0]) + 'I: \\text{ every nonzero vector is an eigenvector.}';
        } else {
          var last = E.vals.length - 1;
          lines = E.vals.map(function (l, k) {
            var hex = k === last ? C.green : C.purple;
            return colored(hex, 'E_{' + fmt(l) + '}') + ' = \\operatorname{span}\\left\\{' + colored(hex, vec(E.spaces[k][0])) + '\\right\\}';
          }).reverse().join(', \\qquad ');
        }
        lines = '\\[' + lines + '\\]';
      }
      typesetAll([
        ['ev2-calc-v', '\\[A' + V + ' = ' + mtx(A) + colored(C.orange, vec(v)) + ' = ' + colored(C.orange, vec(Av)) + '\\]'],
        ['ev2-calc-status', '\\[' + status + '\\]'],
        ['ev2-calc-lines', lines]
      ]);
    });

    setEntries(calc, SHARED.A);
    morph.set(1);
    render();
  };

  // ════════════════════════════════════════════════════════════════════════
  // Figure 3: turning the lambda knob (two graphs in tandem)
  // ════════════════════════════════════════════════════════════════════════
  var F3 = {};
  window.evFig3Left = function (calc) { F3.left = calc; fig3(); };
  window.evFig3Right = function (calc) { F3.right = calc; fig3(); };

  function fig3() {
    if (!F3.left || !F3.right) { return; }
    var L = F3.left, R = F3.right;
    quiet(L); quiet(R); fitBoard(L);
    var S = { l: 0, E: null };
    var slider = document.getElementById('ev3-l'), out = document.getElementById('ev3-l-val');
    var snaps = document.getElementById('ev3-snaps');

    MatrixControl(document.getElementById('ev3-matrix'));
    onShared(function () { loadMatrix(); });

    // Fit the polynomial's window around its vertex and roots; the lambda
    // slider spans the same range.
    function loadMatrix() {
      var A = SHARED.A;
      setEntries(L, A); setEntries(R, A);
      var E = S.E = eig(A), mid = E.tr / 2;
      var w = Math.max(3, Math.sqrt(Math.max(E.disc, 0)) / 2 + 2);
      var lo = tenth(mid - w), hi = tenth(mid + w);
      var bottom = Math.min(-E.disc / 4, 0), top = Math.max(w * w - E.disc / 4, 1);
      var h = top - bottom;
      R.setMathBounds({ left: lo - 0.3, right: hi + 0.3, bottom: bottom - 0.12 * h - 0.5, top: bottom + 0.75 * h + 0.5 });
      slider.min = lo; slider.max = hi;
      R.setExpression({ id: 'R', latex: 'R=\\left[' + E.vals.map(num).join(',') + '\\right]' });
      snaps.innerHTML = E.vals.length
        ? E.vals.map(function (l) { return '<button type="button" class="site-btn" data-l="' + l + '">\\(\\lambda = ' + fmt(l) + '\\)</button>'; }).join('')
        : '<span class="ev-hint">None: the parabola never touches the axis.</span>';
      typesetMath([snaps]);
      setL(Math.max(lo, Math.min(hi, S.l)));
    }

    // Within a twentieth of an eigenvalue, lambda snaps onto it exactly
    // (otherwise a tenths slider could never hit an irrational root).
    function magnet(l) {
      var hit = S.E.vals.find(function (r) { return Math.abs(r - l) < 0.05; });
      return hit === undefined ? l : hit;
    }

    function setL(l) {
      S.l = l;
      slider.value = l;
      out.textContent = fmt(l);
      setVar(L, 'l', 'l', l);
      if (Math.abs(value(R, 'l') - l) > TOL) { setVar(R, 'l', 'l', l); }
      render();
    }

    slider.addEventListener('input', function () { setL(magnet(parseFloat(slider.value))); });
    snaps.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-l]');
      if (b) { setL(parseFloat(b.getAttribute('data-l'))); }
    });
    // Dragging the point on the lambda axis.
    watch(R, ['l'], function () {
      var l = value(R, 'l');
      if (isNaN(l) || Math.abs(l - S.l) < TOL) { return; }
      var m = magnet(l);
      if (m !== l) { setVar(R, 'l', 'l', m); }
      S.l = m;
      slider.value = m;
      out.textContent = fmt(m);
      setVar(L, 'l', 'l', m);
      render();
    });

    var render = frameThrottle(function () {
      var A = SHARED.A, l = S.l, B = shift(A, l), p = det(B), E = S.E;
      var N = Math.abs(p) < 1e-9 ? nullBasis(B) : [];
      var on = N.length === 1;
      if (on) { setLine(L, ['n1', 'n2'], ['n_{1}', 'n_{2}'], N[0]); }
      show(L, 'null', on);

      var lamTex = tenth(l) < 0 ? '(' + fmt(l) + ')' : fmt(l);
      var roots;
      if (E.complex) { roots = '\\text{ has roots } \\lambda = ' + complexPair(E.complex) + ' \\text{ (not real)}'; }
      else if (E.vals.length === 1) { roots = ' = 0 \\text{ only at } \\lambda = ' + fmt(E.vals[0]); }
      else { roots = ' = 0 \\text{ at } \\lambda = ' + fmt(E.vals[0]) + ' \\text{ and } \\lambda = ' + fmt(E.vals[1]); }

      var at = 'A - ' + lamTex + 'I = ' + mtx(B) + ', \\qquad \\det(A - ' + lamTex + 'I) = ' + fmt(p);
      if (N.length === 2) {
        at += ', \\text{ and every vector is an eigenvector.}';
      } else if (on) {
        at += ', \\qquad \\mathcal{N}(A - ' + lamTex + 'I) = \\operatorname{span}\\left\\{' + colored(C.green, vec(N[0])) + '\\right\\}';
      }
      typesetAll([
        ['ev3-calc-p', '\\[\\det(A - \\lambda I) = ' + charPoly(E.tr, E.det) + roots + '\\]'],
        ['ev3-calc-at', '\\[' + at + '\\]']
      ]);
    });

    loadMatrix();
  }

  // ════════════════════════════════════════════════════════════════════════
  // Figure 4: when the pattern breaks (fixed rotation and shear)
  // ════════════════════════════════════════════════════════════════════════
  var F4 = { calcs: [], morph: null };
  function fig4Ready(calc) {
    quiet(calc); fitBoard(calc);
    F4.calcs.push(calc);
    if (!F4.morph) {
      F4.morph = Morph('ev4-morph', function (s) {
        F4.calcs.forEach(function (c) { setVar(c, 's', 's', s); });
      });
    }
    setVar(calc, 's', 's', parseFloat(document.querySelector('#ev4-morph input').value));
  }
  window.evFig4Rot = fig4Ready;
  window.evFig4Shear = fig4Ready;

  // ════════════════════════════════════════════════════════════════════════
  // Figure 5: the eigenbasis
  // ════════════════════════════════════════════════════════════════════════
  window.evFig5 = function (calc) {
    quiet(calc); fitBoard(calc);
    var S = { x: [1, 1], s: 1, n: 3 };
    var nInput = document.getElementById('ev5-n'), nOut = document.getElementById('ev5-n-val');
    var note = document.getElementById('ev5-note');

    MatrixControl(document.getElementById('ev5-matrix'));
    onShared(function () { draw(); });

    var morph = Morph('ev5-morph', function (s) {
      S.s = s;
      setVar(calc, 's', 's', s);
      labels();
    });

    nInput.addEventListener('input', function () {
      S.n = parseInt(nInput.value, 10);
      nOut.textContent = S.n;
      draw();
    });

    function Pmat(E) { return [[E.basis.P[0][0], E.basis.P[1][0]], [E.basis.P[0][1], E.basis.P[1][1]]]; }

    watch(calc, ['p_{1}', 'p_{2}'], function () {
      var x = [value(calc, 'p_{1}'), value(calc, 'p_{2}')];
      if (isNaN(x[0]) || isNaN(x[1])) { return; }
      if (Math.hypot(x[0] - S.x[0], x[1] - S.x[1]) < 1e-6) { return; }
      S.x = x;
      draw(true);
    });

    function labels() {
      [0, 1].forEach(function (k) {
        var v = 'v_' + (k + 1);
        calc.setExpression({ id: 'w' + (k + 1) + '_tip', label: S.s === 0 ? '`' + v + '`' : S.s === 1 ? '`A' + v + '`' : '' });
      });
    }

    // fromDrag: x came from the graph, so leave the point where the pointer put it.
    function draw(fromDrag) {
      var E = eig(SHARED.A), has = !!E.basis, M = SHARED.A;
      setEntries(calc, M);
      if (!fromDrag) { setVar(calc, 'p1', 'p_{1}', S.x[0]); setVar(calc, 'p2', 'p_{2}', S.x[1]); }

      if (has) {
        setLine(calc, ['u1x', 'u1y'], ['u_{1x}', 'u_{1y}'], E.basis.P[0]);
        setLine(calc, ['u2x', 'u2y'], ['u_{2x}', 'u_{2y}'], E.basis.P[1]);
      }
      show(calc, 'egrid', has);
      show(calc, 'evec', has);

      var pts = [S.x], y = S.x;
      for (var k = 0; k < S.n; k++) { y = mul(M, y); pts.push(y); }
      calc.setExpression({ id: 'It', latex: 'I_{t}=\\left[' + pts.map(function (q) { return '\\left(' + num(q[0]) + ',' + num(q[1]) + '\\right)'; }).join(',') + '\\right]' });

      labels();
      readout();
    }

    var readout = frameThrottle(function () {
      var E = eig(SHARED.A), n = S.n;
      if (!E.basis) {
        note.innerHTML = E.complex
          ? 'No eigenbasis: the eigenvalues \\(' + complexPair(E.complex) + '\\) are not real.'
          : 'No eigenbasis: the only eigenvectors lie on one line, which cannot span the plane.';
        note.hidden = false;
        typesetMath([note]);
        typesetAll([['ev5-calc-d', ''], ['ev5-calc-n', '']]);
        return;
      }
      note.hidden = true;
      var P = Pmat(E), L = E.basis.L, Dn = [[Math.pow(L[0], n), 0], [0, Math.pow(L[1], n)]];
      var An = mm(P, mm(Dn, inv(P)));
      var Ptex = '\\begin{bmatrix} ' + colored(C.green, '\\mathbf{v}_1') + ' & ' + colored(C.purple, '\\mathbf{v}_2') + ' \\end{bmatrix}';
      typesetAll([
        ['ev5-calc-d', '\\[P = ' + Ptex + ' = ' + mtx(P) + ', \\qquad D = P^{-1}AP = ' +
          bmatrix([[colored(C.green, fmt(L[0])), '0'], ['0', colored(C.purple, fmt(L[1]))]]) + '\\]'],
        ['ev5-calc-n', '\\[A^{' + n + '} = PD^{' + n + '}P^{-1} = P' + mtx(Dn) + 'P^{-1} = ' + mtx(An) + '\\]']
      ]);
    });

    morph.set(1);
    draw();
  };
})();
