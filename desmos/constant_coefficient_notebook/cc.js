// Constant-coefficient differential equations notebook.
//
// Every figure is driven by the roots of a characteristic polynomial with real
// coefficients. A Model holds those roots (real roots, and complex roots as one
// entry per conjugate pair), and the views — the graph of p(r), the complex
// plane, the basis functions, the particular solution — redraw from it.
// The roots can be changed three ways: dragging them in a complex plane,
// dragging the purple a_0 handle on the graph of p, or moving the coefficient
// sliders. Figures 1 and 2 share one model; Figure 3 has its own.
//
// Desmos states are built by _build_json.py; styling reuses the eigenvector
// notebook's stylesheet plus cc.css.

(function (root) {

  // ══════════════════════════════════════════════════════════════════════
  // Math core (no DOM; exported for testing under node)
  // ══════════════════════════════════════════════════════════════════════
  var MAXDEG = 6;

  // ── complex numbers as [re, im] ──
  function cadd(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
  function csub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
  function cmul(a, b) { return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; }
  function cscale(a, k) { return [a[0] * k, a[1] * k]; }
  function cdiv(a, b) {
    var d = b[0] * b[0] + b[1] * b[1];
    return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
  }
  function cabs(a) { return Math.hypot(a[0], a[1]); }

  // ── real polynomials, coefficients in ascending order ──
  function polymul(p, q) {
    var r = new Array(p.length + q.length - 1).fill(0);
    p.forEach(function (a, i) { q.forEach(function (b, j) { r[i + j] += a * b; }); });
    return r;
  }
  function peval(c, x) { var v = 0; for (var i = c.length - 1; i >= 0; i--) { v = v * x + c[i]; } return v; }
  function pevalC(c, z) {
    var v = [0, 0];
    for (var i = c.length - 1; i >= 0; i--) { v = cadd(cmul(v, z), [c[i], 0]); }
    return v;
  }
  function deriv(c) { return c.slice(1).map(function (a, i) { return a * (i + 1); }); }
  function clean(x) { var r = Math.round(x * 1e9) / 1e9; return r === 0 ? 0 : r; }

  // A root: { kind: 'real', re } or { kind: 'pair', re, im } (im >= 0 stands
  // for the pair re +- i im). A pair with im = 0 is a double real root.
  function degree(roots) { return roots.reduce(function (n, r) { return n + (r.kind === 'pair' ? 2 : 1); }, 0); }

  // Monic p(r) = prod (r - r_i), multiplied out with real arithmetic only.
  function expand(roots) {
    var c = [1];
    roots.forEach(function (r) {
      c = r.kind === 'pair' ? polymul(c, [r.re * r.re + r.im * r.im, -2 * r.re, 1]) : polymul(c, [-r.re, 1]);
    });
    return c.map(clean);
  }

  // Durand–Kerner. Plenty for degree <= 6; repeated roots come out as tight
  // clusters, which rootsFromCoeffs merges.
  function polyRoots(c) {
    var n = c.length - 1;
    while (n > 0 && c[n] === 0) { n--; }
    if (n < 1) { return []; }
    var a = c.slice(0, n + 1).map(function (v) { return v / c[n]; });
    var R = 1 + Math.max.apply(null, a.slice(0, n).map(Math.abs));
    var z = [];
    for (var k = 0; k < n; k++) {
      var t = 2 * Math.PI * k / n + 0.4;
      z.push([0.9 * R * Math.cos(t), 0.9 * R * Math.sin(t)]);
    }
    for (var it = 0; it < 3000; it++) {
      var big = 0;
      for (var i = 0; i < n; i++) {
        var den = [1, 0];
        for (var j = 0; j < n; j++) { if (j !== i) { den = cmul(den, csub(z[i], z[j])); } }
        var step = cdiv(pevalC(a, z[i]), den);
        if (!isFinite(step[0]) || !isFinite(step[1])) { step = [1e-3, 1e-3]; }
        z[i] = csub(z[i], step);
        big = Math.max(big, cabs(step));
      }
      if (big < 1e-15 * R) { break; }
    }
    return z;
  }

  // Coefficients -> roots, merging the clusters a repeated root leaves behind
  // (an m-fold root comes back spread over a radius of about eps^(1/m)).
  function rootsFromCoeffs(c) {
    var z = polyRoots(c), groups = [];
    z.forEach(function (w) {
      var g = groups.find(function (g) { return cabs(csub(g.sum.map(function (v) { return v / g.n; }), w)) < 2e-2 * Math.max(1, cabs(w)); });
      if (g) { g.sum = cadd(g.sum, w); g.n++; } else { groups.push({ sum: w.slice(), n: 1 }); }
    });
    var out = [];
    groups.forEach(function (g) {
      var mu = [g.sum[0] / g.n, g.sum[1] / g.n], spread = 0;
      z.forEach(function (w) {
        var d = cabs(csub(w, mu));
        if (d < 2e-2 * Math.max(1, cabs(w))) { spread = Math.max(spread, d); }
      });
      // A cluster straddling the axis is a real root.
      var isReal = Math.abs(mu[1]) <= Math.max(spread, 1e-6 * Math.max(1, cabs(mu)));
      if (isReal) { mu[1] = 0; }
      // An m-fold root of p is a simple root of p^(m-1): polish it there.
      var d1 = c.slice();
      for (var r = 1; r < g.n; r++) { d1 = deriv(d1); }
      var d2 = deriv(d1);
      for (var it = 0; it < 30; it++) {
        var den = pevalC(d2, mu);
        if (cabs(den) < 1e-300) { break; }
        var st = cdiv(pevalC(d1, mu), den);
        if (isReal) { st[1] = 0; }
        mu = csub(mu, st);
        if (cabs(st) < 1e-15 * Math.max(1, cabs(mu))) { break; }
      }
      var re = clean(mu[0]), im = clean(mu[1]);
      if (isReal) {
        for (var k = 0; k < g.n; k++) { out.push({ kind: 'real', re: re + 0 }); }
      } else if (im > 0) {
        for (var k2 = 0; k2 < g.n; k2++) { out.push({ kind: 'pair', re: re + 0, im: im }); }
      }
    });
    return out;
  }

  // Distinct roots in the closed upper half plane with their multiplicities,
  // sorted by real part (then imaginary part).
  function clusters(roots) {
    var cl = [];
    function add(re, im, m) {
      var c = cl.find(function (c) { return Math.abs(c.re - re) < 1e-7 && Math.abs(c.im - im) < 1e-7; });
      if (c) { c.mult += m; } else { cl.push({ re: re, im: im, mult: m }); }
    }
    roots.forEach(function (r) {
      if (r.kind === 'real') { add(r.re, 0, 1); }
      else if (r.im < 1e-9) { add(r.re, 0, 2); }
      else { add(r.re, r.im, 1); }
    });
    cl.sort(function (a, b) { return a.re - b.re || a.im - b.im; });
    return cl;
  }

  // T[j] = p^(j)(s) / j!, the Taylor coefficients of p at the complex point s,
  // by repeated synthetic division.
  function taylorAt(c, s) {
    var b = c.map(function (v) { return [v, 0]; }), T = [];
    while (b.length) {
      var acc = [0, 0], q = new Array(b.length - 1);
      for (var i = b.length - 1; i >= 0; i--) {
        acc = cadd(cmul(acc, s), b[i]);
        if (i > 0) { q[i - 1] = acc; }
      }
      T.push(acc);
      b = q;
    }
    return T;
  }

  function fact(n) { var f = 1; for (var i = 2; i <= n; i++) { f *= i; } return f; }

  // Undetermined coefficients, done once in complex form. For b(x) =
  // P(x) e^{alpha x} cos(beta x) (or sin), set s = alpha + i beta and look for
  // Y = x^k Q(x) e^{sx}, with k the multiplicity of s as a root of p. Since
  //   L[e^{sx} u] = e^{sx} sum_j T[j] u^(j),
  // L[Y] = P e^{sx} is a triangular system for the coefficients of Q. Because L
  // has real coefficients, Re Y solves the cosine problem and Im Y the sine one.
  // Returns y_p = x^k e^{alpha x} (U(x) cos(beta x) + V(x) sin(beta x)).
  function particular(c, s, k, P, trig) {
    var T = taylorAt(c, s), m = P.length - 1, q = new Array(m + 1);
    for (var j = 0; j < k; j++) { T[j] = [0, 0]; }
    for (var t = m; t >= 0; t--) {
      var rhs = [P[t], 0];
      for (var i = t + 1; i <= m; i++) {
        var jj = i + k - t;
        if (jj < T.length) { rhs = csub(rhs, cscale(cmul(q[i], T[jj]), fact(i + k) / fact(t))); }
      }
      q[t] = cdiv(rhs, cscale(T[k], fact(t + k) / fact(t)));
    }
    var A = q.map(function (z) { return clean(z[0]); }), B = q.map(function (z) { return clean(z[1]); });
    var cosCase = trig === 'cos' || s[1] === 0;
    return cosCase ? { U: A, V: B.map(function (v) { return v === 0 ? 0 : -v; }), k: k }
                   : { U: B, V: A, k: k };
  }

  var core = { expand: expand, polyRoots: polyRoots, rootsFromCoeffs: rootsFromCoeffs, clusters: clusters,
               taylorAt: taylorAt, particular: particular, peval: peval, pevalC: pevalC, degree: degree };
  if (typeof module !== 'undefined' && module.exports) { module.exports = core; return; }

  // ══════════════════════════════════════════════════════════════════════
  // Formatting
  // ══════════════════════════════════════════════════════════════════════
  var PAL = ['#c74440', '#2d70b3', '#388c46', '#6042a6', '#b5651d', '#1f8a8a'];
  var ORANGE = '#fa7e19';

  // Desmos wants plain decimals, never 1e-7.
  function dnum(x) {
    var s = (Math.round(x * 1e6) / 1e6).toFixed(6).replace(/\.?0+$/, '');
    return s === '-0' ? '0' : s;
  }
  // TeX numbers: small fractions where exact, otherwise up to 3 decimals.
  function tnum(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) { return String(Math.round(x)); }
    for (var d = 2; d <= 400; d++) {
      var n = Math.round(x * d);
      if (Math.abs(x * d - n) < 1e-7 * d) {
        if (d > 60 && Math.abs(x) > 0.01) { break; }
        return (n < 0 ? '-' : '') + '\\tfrac{' + Math.abs(n) + '}{' + d + '}';
      }
    }
    var s = x.toFixed(3).replace(/\.?0+$/, '');
    return s === '-0' ? '0' : s;
  }
  function colored(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }

  // Join signed terms: each term is [coefficient, monomial tex]. Coefficients
  // of +-1 are dropped in front of a monomial.
  function sumTex(terms, numf) {
    numf = numf || tnum;
    var out = '';
    terms.forEach(function (t) {
      var c = t[0], m = t[1];
      if (Math.abs(c) < 1e-12) { return; }
      var neg = c < 0, mag = numf(Math.abs(c));
      var body = m ? (mag === '1' ? m : mag + (numf === dnum ? '' : '\\,') + m) : mag;
      if (numf === dnum && m && mag !== '1') { body = mag + m; }
      out += out ? (neg ? ' - ' : ' + ') + body : (neg ? '-' : '') + body;
    });
    return out || '0';
  }
  function powTex(v, j) { return j === 0 ? '' : j === 1 ? v : v + '^{' + j + '}'; }
  function polyTex(c, v) {
    var terms = [];
    for (var i = c.length - 1; i >= 0; i--) { terms.push([c[i], powTex(v, i)]); }
    return sumTex(terms);
  }
  function nonzero(c) { return c.filter(function (v) { return Math.abs(v) > 1e-12; }).length; }

  function expTex(a) {
    if (Math.abs(a) < 1e-12) { return ''; }
    if (Math.abs(a - 1) < 1e-12) { return 'e^{x}'; }
    if (Math.abs(a + 1) < 1e-12) { return 'e^{-x}'; }
    return 'e^{' + tnum(a) + 'x}';
  }
  function trigTex(f, b) { return Math.abs(b - 1) < 1e-12 ? '\\' + f + ' x' : '\\' + f + '(' + tnum(b) + 'x)'; }
  function dexp(a) { return Math.abs(a) < 1e-12 ? '' : 'e^{' + dnum(a) + 'x}'; }
  function dtrig(f, b) { return '\\' + f + '\\left(' + dnum(b) + 'x\\right)'; }
  function dpoly(c) {
    var terms = [];
    for (var i = c.length - 1; i >= 0; i--) { terms.push([c[i], i === 0 ? '' : i === 1 ? 'x' : 'x^{' + i + '}']); }
    return '\\left(' + sumTex(terms, dnum) + '\\right)';
  }

  // a + bi, a - bi, a +- bi
  function cplxTex(re, im, pm) {
    var a = Math.abs(re) < 1e-12 ? '' : tnum(re);
    var b = Math.abs(im - 1) < 1e-12 ? 'i' : tnum(Math.abs(im)) + 'i';
    if (Math.abs(im) < 1e-12) { return tnum(re); }
    var sign = pm ? '\\pm' : im < 0 ? '-' : '+';
    if (!a) { return (pm ? '\\pm ' : im < 0 ? '-' : '') + b; }
    return a + ' ' + sign + ' ' + b;
  }

  function yDer(k) { return k === 0 ? 'y' : k <= 3 ? 'y' + new Array(k + 1).join("'") : 'y^{(' + k + ')}'; }
  function deTex(c) {
    var terms = [];
    for (var k = c.length - 1; k >= 0; k--) { terms.push([c[k], yDer(k)]); }
    return sumTex(terms);
  }

  // Real factorization: (r - a)^m for real roots, quadratics for pairs.
  function factorTex(cl) {
    return cl.map(function (c) {
      var f;
      if (c.im === 0) {
        f = Math.abs(c.re) < 1e-12 ? 'r' : '(r ' + (c.re < 0 ? '+ ' : '- ') + tnum(Math.abs(c.re)) + ')';
      } else {
        f = '(' + polyTex([c.re * c.re + c.im * c.im, -2 * c.re, 1], 'r') + ')';
      }
      return c.mult > 1 ? f + '^{' + c.mult + '}' : f;
    }).join('').replace(/^\((.*)\)$/, function (all, inner) {
      return cl.length === 1 && cl[0].mult === 1 ? inner : all;
    });
  }

  // The basis functions a cluster contributes (Cases 1-4 of Lecture 31).
  function basisOf(cl) {
    var out = [];
    cl.forEach(function (c, ci) {
      for (var j = 0; j < c.mult; j++) {
        (c.im === 0 ? [null] : ['cos', 'sin']).forEach(function (f) {
          var tex = [powTex('x', j), expTex(c.re), f ? trigTex(f, c.im) : ''].join('');
          var des = [j === 0 ? '' : j === 1 ? 'x' : 'x^{' + j + '}', dexp(c.re), f ? dtrig(f, c.im) : ''].join('');
          out.push({ cl: ci, j: j, f: f, tex: tex || '1', des: des || '1' });
        });
      }
    });
    return out;
  }
  function caseOf(c) { return c.im === 0 ? (c.mult === 1 ? 1 : 2) : (c.mult === 1 ? 3 : 4); }

  // ══════════════════════════════════════════════════════════════════════
  // Page plumbing
  // ══════════════════════════════════════════════════════════════════════
  function typesetMath(nodes) {
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise = MathJax.startup.promise
        .then(function () { return MathJax.typesetPromise(nodes); })
        .catch(function (err) { console.error(err); });
    }
  }
  function setMath(id, tex) {
    var el = document.getElementById(id);
    if (!el || el.getAttribute('data-tex') === tex) { return null; }
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

  function setVar(calc, id, name, v) { calc.setExpression({ id: id, latex: name + '=' + dnum(v) }); }

  // Send only the properties that changed since we last sent them. Every
  // update touches several graphs, and resending unchanged expressions makes
  // Desmos redo work (and makes drags lag).
  function put(calc, e) {
    var cache = calc._ccCache || (calc._ccCache = {});
    var prev = cache[e.id] || (cache[e.id] = {}), diff = { id: e.id }, any = false;
    Object.keys(e).forEach(function (k) {
      if (k !== 'id' && prev[k] !== e[k]) { diff[k] = e[k]; prev[k] = e[k]; any = true; }
    });
    if (any) { calc.setExpression(diff); }
  }
  // Slider variables also change under the user's drag, which the cache can't
  // see, so compare against Desmos's own current value instead.
  function syncVar(calc, id, name, v) {
    var now = value(calc, name);
    if (typeof now === 'number' && Math.abs(now - v) < 1e-9) { return; }
    setVar(calc, id, name, v);
  }
  function helper(calc, name) {
    if (!calc._ccH) { calc._ccH = {}; }
    if (!calc._ccH[name]) { calc._ccH[name] = calc.HelperExpression({ latex: name }); }
    return calc._ccH[name];
  }
  function value(calc, name) { return helper(calc, name).numericValue; }
  function watch(calc, names, fn) { names.forEach(function (n) { helper(calc, n).observe('numericValue', fn); }); }
  function quiet(calc) { calc.updateSettings({ zoomButtons: false }); }

  // Keep the complex plane square (so circles stay round) whatever the frame.
  function fitSquare(calc, half) {
    function fit() {
      var pc = calc.graphpaperBounds.pixelCoordinates, w = pc.width, h = pc.height;
      if (!w || !h) { return; }
      var sx = w > h ? half * w / h : half, sy = w > h ? half : half * h / w;
      calc.setMathBounds({ left: -sx, right: sx, bottom: -sy, top: sy });
    }
    fit();
    window.addEventListener('resize', function () { requestAnimationFrame(fit); });
  }

  function onFrame(fn) {
    var pending = false, arg;
    return function (a) {
      arg = a;
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () { pending = false; fn(arg); });
    };
  }

  // One pointer drives at a time. A graph's watchers only act while the pointer
  // went down in that graph (and briefly after it lifts, for the last report);
  // everything else they hear is an echo of our own writes.
  // drag.any: a pointer is down anywhere (a graph or a slider), which holds
  // off rescaling the graph of p until the reader lets go.
  var drag = { calc: null, down: false, any: false, upAt: 0, onUp: [] };
  function track(calc, container) {
    container.addEventListener('pointerdown', function () { drag.calc = calc; drag.down = true; }, true);
  }
  window.addEventListener('pointerdown', function () { drag.any = true; }, true);
  window.addEventListener('pointerup', function () {
    drag.any = false;
    if (!drag.down) { return; }
    drag.down = false;
    drag.upAt = performance.now();
    var c = drag.calc;
    setTimeout(function () { drag.onUp.forEach(function (f) { f(c); }); }, 150);
  });
  function driving(calc) { return drag.calc === calc && (drag.down || performance.now() - drag.upAt < 300); }

  function btnGroup(rootEl, items, onPick, active) {
    rootEl.innerHTML = items.map(function (it, i) {
      return '<button type="button" class="site-btn' + (i === active ? ' site-btn--active' : '') + (it.wide ? ' ev-span2' : '') +
        '" data-k="' + i + '" aria-pressed="' + (i === active) + '">' + it.label + '</button>';
    }).join('');
    typesetMath([rootEl]);
    function mark(i) {
      rootEl.querySelectorAll('button').forEach(function (b) {
        var on = +b.getAttribute('data-k') === i;
        b.classList.toggle('site-btn--active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    rootEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-k]');
      if (!b) { return; }
      var i = +b.getAttribute('data-k');
      mark(i);
      onPick(items[i], i);
    });
    return { mark: mark };
  }

  function toggle(btn, onToggle) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('site-btn--active', on);
      onToggle(on);
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // Model
  // ══════════════════════════════════════════════════════════════════════
  function R(x) { return { kind: 'real', re: x }; }
  function Z(a, b) { return { kind: 'pair', re: a, im: b }; }
  function copyRoots(rs) { return rs.map(function (r) { return r.kind === 'pair' ? Z(r.re, r.im) : R(r.re); }); }

  function Model(roots) { this.views = []; this.set(roots, null); }
  Model.prototype.set = function (roots, source) {
    this.roots = copyRoots(roots);
    this.c = expand(this.roots);
    this.refresh(source);
  };
  Model.prototype.setCoeffs = function (c, source) {
    this.c = c.map(clean);
    this.roots = rootsFromCoeffs(this.c);
    this.refresh(source);
  };
  Model.prototype.refresh = function (source) {
    this.cl = clusters(this.roots);
    this.views.forEach(function (v) { v(source); });
  };
  // Graph views run immediately (their writes are cheap and cached, and a
  // frame's delay shows as lag behind the dragged point); heavier views wait
  // for the next frame and coalesce.
  Model.prototype.on = function (fn, now) { this.views.push(now ? fn : onFrame(fn)); };
  Model.prototype.color = function (re, im) {
    var i = this.cl.findIndex(function (c) { return Math.abs(c.re - re) < 1e-7 && Math.abs(c.im - Math.abs(im)) < 1e-7; });
    return PAL[Math.max(0, i) % PAL.length];
  };

  // Snap a dragged root to the 0.1 grid, onto the real axis when a pair gets
  // close to it, and onto any other root within reach: that is how repeated
  // roots get made.
  var SNAP = 0.2;
  function snapRoots(next, prev) {
    next.forEach(function (r, i) {
      var p = prev[i];
      if (p && r.re === p.re && (r.kind === 'real' || r.im === p.im)) { return; }
      r.re = Math.round(r.re * 10) / 10;
      if (r.kind === 'pair') {
        r.im = Math.round(Math.abs(r.im) * 10) / 10;
        if (r.im < SNAP) { r.im = 0; }
      }
      var ri = r.kind === 'pair' ? r.im : 0;
      next.forEach(function (o, j) {
        if (j === i) { return; }
        var oi = o.kind === 'pair' ? o.im : 0;
        if (Math.hypot(o.re - r.re, oi - ri) <= SNAP + 1e-9) {
          r.re = o.re;
          if (r.kind === 'pair') { r.im = oi; }
        }
      });
    });
    return next;
  }
  function sameRoots(a, b) {
    return a.length === b.length && a.every(function (r, i) {
      return r.kind === b[i].kind && Math.abs(r.re - b[i].re) < 1e-9 && (r.kind !== 'pair' || Math.abs(r.im - b[i].im) < 1e-9);
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // Views
  // ══════════════════════════════════════════════════════════════════════

  // The complex plane: draggable roots, conjugates, multiplicity circles.
  function PlaneView(calc, container, model, extra) {
    quiet(calc);
    fitSquare(calc, 4.4);
    track(calc, container);
    var MAXR = 6, MAXP = 3;

    function slots() {
      var ri = 0, pi = 0;
      return model.roots.map(function (r) { return r.kind === 'pair' ? { pair: ++pi } : { real: ++ri }; });
    }

    // Each slot is described in full every time, but put() only sends what
    // changed, so during a drag the dragged point itself is left alone.
    function render(source) {
      var mine = source === calc, sl = slots(), seen = {};
      var used = { R: {}, Z: {} };
      model.roots.forEach(function (r, i) {
        var s = sl[i], im = r.kind === 'pair' ? r.im : 0, color = model.color(r.re, im);
        var cl = model.cl.find(function (c) { return Math.abs(c.re - r.re) < 1e-7 && Math.abs(c.im - im) < 1e-7; });
        var key = r.re + ',' + im, first = !seen[key];
        seen[key] = true;
        var mult = cl ? cl.mult : 1;
        var lab = first && mult > 1 ? '`\\times' + mult + '`' : '';
        // One ring per unit of multiplicity, all on the first handle of the root.
        var rings = [];
        if (first) { for (var j = 0; j < mult; j++) { rings.push(dnum(0.3 + 0.16 * j)); } }
        var list = '\\left[' + rings.join(',') + '\\right]';
        if (s.real) {
          used.R[s.real] = true;
          if (!mine) { syncVar(calc, 'h' + s.real, 'h_{' + s.real + '}', r.re); }
          put(calc, { id: 'R' + s.real, hidden: false, color: color, label: lab, showLabel: !!lab });
          put(calc, { id: 'Q' + s.real, latex: 'Q_{' + s.real + '}=' + list });
        } else {
          used.Z[s.pair] = true;
          if (!mine) {
            syncVar(calc, 'g' + s.pair, 'g_{' + s.pair + '}', r.re);
            syncVar(calc, 'w' + s.pair, 'w_{' + s.pair + '}', r.im);
          }
          put(calc, { id: 'Z' + s.pair, hidden: false, color: color, label: lab, showLabel: !!lab });
          put(calc, { id: 'W' + s.pair, hidden: r.im === 0, color: color });
          put(calc, { id: 'P' + s.pair, latex: 'P_{' + s.pair + '}=' + list });
          // A pair sitting on the axis is a double real root: one set of rings.
          put(calc, { id: 'PL' + s.pair, hidden: r.im === 0 });
        }
      });
      for (var k = 1; k <= MAXR; k++) {
        if (used.R[k]) { continue; }
        put(calc, { id: 'R' + k, hidden: true, showLabel: false });
        put(calc, { id: 'Q' + k, latex: 'Q_{' + k + '}=\\left[\\right]' });
      }
      for (var k2 = 1; k2 <= MAXP; k2++) {
        if (used.Z[k2]) { continue; }
        put(calc, { id: 'Z' + k2, hidden: true, showLabel: false });
        put(calc, { id: 'W' + k2, hidden: true });
        put(calc, { id: 'P' + k2, latex: 'P_{' + k2 + '}=\\left[\\right]' });
      }
      if (extra) { extra.render(source); }
    }
    model.on(render, true);

    function read() {
      if (!driving(calc)) { return; }
      var sl = slots();
      var next = copyRoots(model.roots).map(function (r, i) {
        var s = sl[i];
        if (s.real) { r.re = value(calc, 'h_{' + s.real + '}'); }
        else { r.re = value(calc, 'g_{' + s.pair + '}'); r.im = Math.abs(value(calc, 'w_{' + s.pair + '}')); }
        return r;
      });
      if (next.some(function (r) { return isNaN(r.re) || (r.kind === 'pair' && isNaN(r.im)); })) { return; }
      if (sameRoots(next, model.roots)) { return; }
      next = snapRoots(next, model.roots);
      if (sameRoots(next, model.roots)) { return; }
      model.set(next, calc);
    }
    var names = [];
    for (var k = 1; k <= MAXR; k++) { names.push('h_{' + k + '}'); }
    for (var k2 = 1; k2 <= MAXP; k2++) { names.push('g_{' + k2 + '}', 'w_{' + k2 + '}'); }
    watch(calc, names, read);
    // When the drag ends, seat the handle on its snapped spot.
    drag.onUp.push(function (c) { if (c === calc) { render(null); } });
    render(null);
    return { calc: calc };
  }

  // The graph of p(r) on the real line, with a_0 draggable at (0, a_0).
  function PolyView(calc, container, model) {
    quiet(calc);
    track(calc, container);

    // The y-scale shows the turning points and p(0). It never changes while
    // anything is being dragged or slid (a moving scale makes the curve look
    // like it is jittering); once things are still, it eases to the new scale,
    // and only if the old one no longer fits or is far too loose.
    // The x-range is [-4.5, 4.5], widened when a real root lies further out.
    // Once the reader pans or zooms, their view is left alone until (0, a_0)
    // or a real root drops out of it.
    var curX = null, curY = null, anim = null, settle = null, lastSet = null, userView = false;
    function realRoots() {
      return model.roots.filter(function (r) { return r.kind === 'real' || r.im === 0; }).map(function (r) { return r.re; });
    }
    function needX() {
      var far = realRoots().reduce(function (m, x) { return Math.max(m, Math.abs(x)); }, 0);
      return Math.max(4.5, 1.15 * far);
    }
    function needY(X) {
      var c = model.c, crit = polyRoots(deriv(c)).filter(function (z) { return Math.abs(z[1]) < 1e-6 && Math.abs(z[0]) < X; });
      var vals = crit.map(function (z) { return Math.abs(peval(c, z[0])); }).concat([Math.abs(c[0])]);
      return Math.min(50000, Math.max(1.5, 1.35 * Math.max.apply(null, vals)));
    }
    function setXY(X, Y) {
      lastSet = { left: -X, right: X, bottom: -Y, top: Y };
      calc.setMathBounds(lastSet);
    }
    // Any bounds change we didn't make ourselves is the reader panning or zooming.
    calc.observe('graphpaperBounds', function () {
      var b = calc.graphpaperBounds.mathCoordinates;
      if (!lastSet) { return; }
      var tol = 1e-6 * (lastSet.right - lastSet.left + lastSet.top - lastSet.bottom);
      if (Math.abs(b.left - lastSet.left) > tol || Math.abs(b.right - lastSet.right) > tol ||
          Math.abs(b.bottom - lastSet.bottom) > tol || Math.abs(b.top - lastSet.top) > tol) { userView = true; }
    });
    function inView() {
      var b = calc.graphpaperBounds.mathCoordinates, a0 = model.c[0];
      if (b.left > 0 || b.right < 0 || a0 < b.bottom || a0 > b.top) { return false; }
      if (b.bottom > 0 || b.top < 0) { return false; }
      return realRoots().every(function (x) { return x >= b.left && x <= b.right; });
    }
    function easeTo(X, Y) {
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      var fromX = curX, fromY = curY, t0 = null, dur = 350;
      curX = X; curY = Y;
      if (fromY === null || userView) { userView = false; setXY(X, Y); return; }
      (function step(t) {
        if (t0 === null) { t0 = t; }
        var u = Math.min(1, (t - t0) / dur);
        u = u * u * (3 - 2 * u);
        setXY(fromX * Math.pow(X / fromX, u), fromY * Math.pow(Y / fromY, u));
        anim = u < 1 ? requestAnimationFrame(step) : null;
      })(performance.now());
    }
    function refit(force) {
      clearTimeout(settle);
      settle = setTimeout(function () {
        if (drag.any) { refit(force); return; }
        var X = needX(), Y = needY(X);
        if (userView && !force) {
          if (!inView()) { easeTo(X, Y); }
          return;
        }
        if (force || curY === null || Y > curY || Y < 0.4 * curY || Math.abs(X - curX) > 1e-9) { easeTo(X, Y); }
      }, curY === null ? 0 : 250);
    }

    // p is built in Desmos from the roots (see _build_json.py), so a change
    // only rewrites the root variables, and curve and markers move together.
    function render(source) {
      var mine = source === calc, ri = 0, pi = 0, seen = {};
      var usedR = {}, usedN = {};
      model.roots.forEach(function (r) {
        var im = r.kind === 'pair' ? r.im : 0, key = r.re + ',' + im, first = !seen[key];
        seen[key] = true;
        var cl = model.cl.find(function (c) { return Math.abs(c.re - r.re) < 1e-7 && Math.abs(c.im - im) < 1e-7; });
        var mult = cl ? cl.mult : 1, lab = first && mult > 1 ? '`\\times' + mult + '`' : '';
        var marker = { hidden: !first, color: model.color(r.re, im), label: lab, showLabel: !!lab };
        if (r.kind === 'real') {
          ri++; usedR[ri] = true;
          syncVar(calc, 'h' + ri, 'h_{' + ri + '}', r.re);
          put(calc, { id: 'o' + ri, latex: 'o_{' + ri + '}=1' });
          marker.id = 'M' + ri; put(calc, marker);
        } else {
          pi++;
          syncVar(calc, 'g' + pi, 'g_{' + pi + '}', r.re);
          syncVar(calc, 'w' + pi, 'w_{' + pi + '}', r.im);
          put(calc, { id: 'q' + pi, latex: 'q_{' + pi + '}=1' });
          if (r.im === 0) { usedN[pi] = true; marker.id = 'N' + pi; put(calc, marker); }
        }
      });
      for (var k = ri + 1; k <= 6; k++) {
        put(calc, { id: 'o' + k, latex: 'o_{' + k + '}=0' });
        put(calc, { id: 'M' + k, hidden: true, showLabel: false });
      }
      for (var k2 = 1; k2 <= 3; k2++) {
        if (k2 > pi) { put(calc, { id: 'q' + k2, latex: 'q_{' + k2 + '}=0' }); }
        if (!usedN[k2]) { put(calc, { id: 'N' + k2, hidden: true, showLabel: false }); }
      }
      // Mid-drag of a_0 Desmos already holds the new value; otherwise a_0 = F(0).
      if (!mine) { syncVar(calc, 'a0', 'a_{0}', model.c[0]); }
      refit(source === null);
    }
    model.on(render, true);

    watch(calc, ['a_{0}'], function () {
      if (!driving(calc)) { return; }
      var a0 = value(calc, 'a_{0}');
      if (isNaN(a0) || Math.abs(a0 - model.c[0]) < 1e-9) { return; }
      var c = model.c.slice();
      c[0] = Math.round(a0 * 10) / 10;
      model.setCoeffs(c, calc);
    });
    render(null);
  }

  // Coefficient sliders a_{n-1}, ..., a_0 (p is monic), and root add/remove.
  function CoeffPanel(el, model, addEl) {
    var deg = -1;
    function build() {
      var c = model.c, n = c.length - 1;
      deg = n;
      var rows = '';
      for (var k = n - 1; k >= 0; k--) {
        rows += '<label class="cc-coef"><span class="cc-coef-name">a<sub>' + k + '</sub></span>' +
          '<input class="site-slider" type="range" min="-20" max="20" step="0.1" data-k="' + k + '" aria-label="Coefficient a' + k + '">' +
          '<span class="cc-coef-val" data-v="' + k + '"></span></label>';
      }
      el.innerHTML = rows;
    }
    function render(source) {
      if (model.c.length - 1 !== deg) { build(); }
      var c = model.c;
      el.querySelectorAll('input[data-k]').forEach(function (inp) {
        var k = +inp.getAttribute('data-k');
        if (!(source && source.panel === el && source.k === k)) { inp.value = c[k]; }
        el.querySelector('[data-v="' + k + '"]').textContent = dnum(Math.round(c[k] * 1000) / 1000);
      });
      var n = degree(model.roots);
      addEl.querySelector('[data-add="real"]').disabled = n >= MAXDEG;
      addEl.querySelector('[data-add="pair"]').disabled = n > MAXDEG - 2;
      addEl.querySelector('[data-add="drop"]').disabled = n <= 1;
    }
    el.addEventListener('input', function (e) {
      var inp = e.target.closest('input[data-k]');
      if (!inp) { return; }
      var c = model.c.slice(), k = +inp.getAttribute('data-k');
      c[k] = parseFloat(inp.value);
      model.setCoeffs(c, { panel: el, k: k });
    });
    // New roots go to the first free spot near the origin.
    function free(cands, kind) {
      var taken = model.roots.map(function (r) { return r.re + ',' + (r.kind === 'pair' ? r.im : 0); });
      var hit = cands.find(function (z) { return taken.indexOf(z[0] + ',' + z[1]) < 0; }) || cands[0];
      return kind === 'pair' ? Z(hit[0], hit[1]) : R(hit[0]);
    }
    addEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-add]');
      if (!b || b.disabled) { return; }
      var rs = copyRoots(model.roots), what = b.getAttribute('data-add');
      if (what === 'real') { rs.push(free([[0, 0], [-1, 0], [1, 0], [-2, 0], [2, 0], [-3, 0], [3, 0]], 'real')); }
      if (what === 'pair') { rs.push(free([[0, 1], [-1, 1], [-1, 2], [0, 2], [1, 1], [-2, 1]], 'pair')); }
      if (what === 'drop') { rs.pop(); }
      model.set(rs, null);
    });
    model.on(render);
    render(null);
  }

  // ══════════════════════════════════════════════════════════════════════
  // Figures 1 and 2: one model, three graphs
  // ══════════════════════════════════════════════════════════════════════
  var PRESETS = [
    { label: "\\(y'' + y = 0\\)", roots: [Z(0, 1)] },
    { label: "\\(y'' + 3y' + 2y = 0\\)", roots: [R(-2), R(-1)] },
    { label: "\\(y'' + 2y' + y = 0\\)", roots: [R(-1), R(-1)] },
    { label: "\\(y'' + 2y' + 5y = 0\\)", roots: [Z(-1, 2)] },
    { label: "\\(y^{(4)} = y\\)", roots: [R(-1), R(1), Z(0, 1)] },
    { label: "\\(y^{(5)} + 2y^{(4)} + y''' = 0\\)", roots: [R(-1), R(-1), R(0), R(0), R(0)] },
    { label: "\\(y^{(4)} + 4y''' + 8y'' + 8y' + 4y = 0\\)", roots: [Z(-1, 1), Z(-1, 1)], wide: true }
  ];
  var M12 = new Model(PRESETS[4].roots);
  var fig12 = {};

  function readoutFig1() {
    var m = M12, c = m.c;
    var pTex = sumTex(c.map(function (v, k) { return [v, powTex('r', k)]; }).reverse());
    var rootList = m.cl.map(function (q) {
      var mult = q.mult > 1 ? '\\ (\\times ' + q.mult + ')' : '';
      return colored(m.color(q.re, q.im), cplxTex(q.re, q.im, true)) + mult;
    }).join(', \\quad ');
    typesetAll([
      ['cc1-calc-p', '\\[' + deTex(c) + ' = 0 \\qquad \\longleftrightarrow \\qquad p(r) = ' + pTex + '\\]'],
      ['cc1-calc-f', '\\[p(r) = ' + factorTex(m.cl) + '\\]'],
      ['cc1-calc-r', '\\[\\text{Roots: } \\quad ' + rootList + '\\]']
    ]);
  }

  window.ccFig1Poly = function (calc, el) { fig12.poly = [calc, el]; startFig12(); };
  window.ccFig1Plane = function (calc, el) { fig12.plane1 = [calc, el]; startFig12(); };
  window.ccFig2Plane = function (calc, el) { fig12.plane2 = [calc, el]; startFig12(); };
  window.ccFig2Basis = function (calc, el) { fig12.basis = [calc, el]; startFig12(); };

  function startFig12() {
    if (!(fig12.poly && fig12.plane1 && fig12.plane2 && fig12.basis) || fig12.started) { return; }
    fig12.started = true;
    PolyView(fig12.poly[0], fig12.poly[1], M12);
    PlaneView(fig12.plane1[0], fig12.plane1[1], M12);
    PlaneView(fig12.plane2[0], fig12.plane2[1], M12);
    CoeffPanel(document.getElementById('cc1-coefs'), M12, document.getElementById('cc1-add'));
    var presets = btnGroup(document.getElementById('cc1-presets'), PRESETS, function (p) { M12.set(p.roots, null); }, 4);
    // Any change other than picking a preset leaves no preset selected.
    M12.on(function () {
      var hit = PRESETS.findIndex(function (p) { return sameRoots(copyRoots(p.roots), M12.roots) && p.roots.length === M12.roots.length; });
      presets.mark(hit);
      readoutFig1();
    });
    BasisView(fig12.basis[0], M12);
    M12.refresh(null);
  }

  // Basis functions, with coordinate sliders for y_c = sum c_k y_k.
  function BasisView(calc, model) {
    quiet(calc);
    var coordsEl = document.getElementById('cc2-coords');
    var coordsBlock = document.getElementById('cc2-coords-block');
    var ycEl = document.getElementById('cc2-calc-yc');
    var S = { c: [1, 0, 0, 0, 0, 0], basis: true, comb: false, n: -1 };

    function build(n) {
      S.n = n;
      var rows = '';
      for (var k = 1; k <= n; k++) {
        rows += '<label class="cc-coef"><span class="cc-coef-name" data-cn="' + k + '">c<sub>' + k + '</sub></span>' +
          '<input class="site-slider" type="range" min="-2" max="2" step="0.1" value="' + S.c[k - 1] + '" data-c="' + k + '" aria-label="Coordinate c' + k + '">' +
          '<span class="cc-coef-val" data-cv="' + k + '">' + dnum(S.c[k - 1]) + '</span></label>';
      }
      coordsEl.innerHTML = rows;
    }
    coordsEl.addEventListener('input', function (e) {
      var inp = e.target.closest('input[data-c]');
      if (!inp) { return; }
      var k = +inp.getAttribute('data-c');
      S.c[k - 1] = parseFloat(inp.value);
      coordsEl.querySelector('[data-cv="' + k + '"]').textContent = dnum(S.c[k - 1]);
      draw();
    });
    toggle(document.getElementById('cc2-basis'), function (on) { S.basis = on; draw(); });
    // The coordinate sliders (and the y_c line of the computation) only
    // matter while the combination is drawn, so they come and go with it.
    // (style.display, since .ev-block's own display overrides [hidden].)
    function showComb() { coordsBlock.style.display = ycEl.style.display = S.comb ? '' : 'none'; }
    toggle(document.getElementById('cc2-comb'), function (on) { S.comb = on; showComb(); draw(); });
    showComb();

    function draw() {
      var B = basisOf(model.cl), n = B.length;
      if (n !== S.n) { build(n); }
      B.forEach(function (b, i) {
        var col = PAL[b.cl % PAL.length];
        // x^j copies from a repeated root fade linearly from 1 down to 0.5.
        var m = model.cl[b.cl].mult;
        put(calc, { id: 'u' + (i + 1), latex: 'u_{' + (i + 1) + '}\\left(x\\right)=' + b.des, color: col,
          hidden: !S.basis, lineStyle: b.f === 'sin' ? 'DASHED' : 'SOLID',
          lineOpacity: String(m > 1 ? 1 - 0.5 * b.j / (m - 1) : 1) });
        var lab = coordsEl.querySelector('[data-cn="' + (i + 1) + '"]');
        if (lab) { lab.style.color = col; }
      });
      for (var k = n + 1; k <= 6; k++) { put(calc, { id: 'u' + k, hidden: true }); }
      var terms = B.map(function (b, i) { return [S.c[i], 'u_{' + (i + 1) + '}\\left(x\\right)']; });
      put(calc, { id: 'Y', latex: 'y=' + sumTex(terms, dnum), hidden: !S.comb });

      var rows = model.cl.map(function (q, ci) {
        var fs = B.filter(function (b) { return b.cl === ci; }).map(function (b) { return colored(PAL[ci % PAL.length], b.tex); });
        return colored(PAL[ci % PAL.length], cplxTex(q.re, q.im, true)) + ' & ' + q.mult + ' & (' + caseOf(q) + ') & ' + fs.join(',\\ ');
      });
      var table = '\\[\\begin{array}{llll} \\text{root} & \\text{mult.} & \\text{case} & \\text{contributes} \\\\ \\hline ' +
        rows.join(' \\\\ ') + '\\end{array}\\]';
      var beta = '\\[\\beta = \\left\\{ ' + B.map(function (b) { return colored(PAL[b.cl % PAL.length], b.tex); }).join(',\\ ') + ' \\right\\}, \\qquad \\dim \\mathcal{N}(L) = ' + n + '\\]';
      var yc = '\\[y_c(x) = ' + sumTex(B.map(function (b, i) { return [S.c[i], b.tex === '1' ? '' : b.tex]; })) + '\\]';
      typesetAll([['cc2-calc-table', table], ['cc2-calc-beta', beta], ['cc2-calc-yc', yc]]);
    }
    model.on(draw);
  }

  // Graphs inside a closed dropdown (the introduction, particular solutions)
  // are built at zero size. When one opens, resize its calculators and replay
  // a window resize so fitSquare can square up the complex planes.
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('details.cc-intro').forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) { return; }
        d.querySelectorAll('.dnb-graph').forEach(function (g) { if (g.desmosCalc) { g.desmosCalc.resize(); } });
        window.dispatchEvent(new Event('resize'));
      });
    });
  });

  // The opening compound-interest graph is a picture, not a toy.
  // On a phone the long labels run off the edge, so keep only the amounts.
  window.ccStory = function (calc, el) {
    calc.updateSettings({ lockViewport: true, zoomButtons: false });
    var labels = [['P1', 'yearly: $2', '$2'], ['P2', 'every 6 months: $2.25', '$2.25'],
                  ['P4', 'quarterly: $2.44', '$2.44'], ['P12', 'monthly: $2.61', '$2.61']];
    function fit() {
      if (!el.clientWidth) { return; }   // still hidden; wait for the intro to open
      calc.resize();
      var wide = el.clientWidth >= 600;
      labels.forEach(function (l) { calc.setExpression({ id: l[0], label: wide ? l[1] : l[2] }); });
    }
    // The graph sits in the closed introduction, so it is built at zero size
    // and only measured once the introduction is opened.
    var intro = document.getElementById('cc-intro');
    if (intro) {
      intro.addEventListener('toggle', function () { if (intro.open) { fit(); } });
    }
    fit();
  };

  // ══════════════════════════════════════════════════════════════════════
  // Figure 3: the particular solution, with a draggable exponent s for b(x)
  // ══════════════════════════════════════════════════════════════════════
  var EQ3 = [
    { label: "\\(y'' + y\\)", roots: [Z(0, 1)] },
    { label: "\\(y'' + 2y' + 5y\\)", roots: [Z(-1, 2)] },
    { label: "\\(y'' - 3y' + 2y\\)", roots: [R(1), R(2)] },
    { label: "\\(y'' - 2y' + y\\)", roots: [R(1), R(1)] },
    { label: "\\(y''' - y''\\)", roots: [R(0), R(0), R(1)] },
    { label: "\\(y'' - y'\\)", roots: [R(0), R(1)] }
  ];
  var TRIG3 = [{ label: '\\(\\cos\\)', f: 'cos' }, { label: '\\(\\sin\\)', f: 'sin' }];
  // b(x) = x^m e^{alpha x} cos(beta x) (or sin); alpha and beta are also s.
  var SL3 = [
    { k: 'm', name: '\\(m\\)', min: 0, max: 3, step: 1, aria: 'Degree m of the power of x' },
    { k: 'a', name: '\\(\\alpha\\)', min: -4, max: 4, step: 0.1, aria: 'Exponential rate alpha' },
    { k: 'b', name: '\\(\\beta\\)', min: 0, max: 4, step: 0.1, aria: 'Frequency beta' }
  ];
  var M3 = new Model(EQ3[0].roots);
  var fig3 = {}, F = { a: 0, b: 2, m: 0, f: 'cos' };
  function monomial(m) { var P = new Array(m + 1).fill(0); P[m] = 1; return P; }

  window.ccFig3Plane = function (calc, el) { fig3.plane = [calc, el]; startFig3(); };
  window.ccFig3Graph = function (calc, el) { fig3.graph = [calc, el]; startFig3(); };

  function startFig3() {
    if (!(fig3.plane && fig3.graph) || fig3.started) { return; }
    fig3.started = true;
    var plane = fig3.plane[0], graph = fig3.graph[0];
    quiet(graph);
    plane.setExpression({ id: 'S', hidden: false });
    plane.setExpression({ id: 'S2', hidden: false });
    var trigEl = document.getElementById('cc3-trig');
    var trig3 = btnGroup(trigEl, TRIG3, function (t) { F.f = t.f; solve(); }, 0);

    // Sliders for m, alpha, beta, kept in step with s on the plane.
    var slEl = document.getElementById('cc3-sliders'), slSource = null;
    slEl.innerHTML = SL3.map(function (d) {
      return '<label class="cc-coef"><span class="cc-coef-name">' + d.name + '</span>' +
        '<input class="site-slider" type="range" min="' + d.min + '" max="' + d.max + '" step="' + d.step + '" data-s="' + d.k +
        '" aria-label="' + d.aria + '"><span class="cc-coef-val" data-sv="' + d.k + '"></span></label>';
    }).join('');
    typesetMath([slEl]);
    slEl.addEventListener('input', function (e) {
      var inp = e.target.closest('input[data-s]');
      if (!inp) { return; }
      var k = inp.getAttribute('data-s'), v = parseFloat(inp.value);
      F[k] = k === 'm' ? Math.round(v) : Math.round(v * 10) / 10;
      if (k !== 'm') { syncVar(plane, 'fa', 'f_{a}', F.a); syncVar(plane, 'fb', 'f_{b}', F.b); }
      slSource = k;
      solve();
    });
    function syncSliders() {
      SL3.forEach(function (d) {
        var inp = slEl.querySelector('[data-s="' + d.k + '"]');
        if (slSource !== d.k) { inp.value = F[d.k]; }
        slEl.querySelector('[data-sv="' + d.k + '"]').textContent = dnum(F[d.k]);
      });
      slSource = null;
    }

    var solve = onFrame(function () {
      var cl = M3.cl, c = M3.c, s = [F.a, F.b];
      var hit = cl.find(function (q) { return Math.abs(q.re - F.a) < 1e-7 && Math.abs(q.im - F.b) < 1e-7; });
      var k = hit ? hit.mult : 0, real = F.b === 0, f = real ? 'cos' : F.f;
      F.P = monomial(F.m);
      syncSliders();
      // sin(0x) = 0, so with beta = 0 only the cosine (no trig at all) makes sense.
      var sinBtn = trigEl.querySelector('[data-k="1"]');
      sinBtn.disabled = real;
      trig3.mark(f === 'cos' ? 0 : 1);
      var sol = particular(c, s, k, F.P, f);
      var shift = function (poly) { return new Array(k).fill(0).concat(poly); };
      var U = shift(sol.U), V = shift(sol.V);

      // Graph: b dashed, y_p orange.
      var bDes = dpoly(F.P) + dexp(F.a) + (real ? '' : dtrig(f, F.b));
      put(graph, { id: 'b', latex: 'y=' + bDes });
      var ypDes = real ? dpoly(U) + dexp(F.a)
        : dexp(F.a) + '\\left(' + dpoly(U) + dtrig('cos', F.b) + '+' + dpoly(V) + dtrig('sin', F.b) + '\\right)';
      put(graph, { id: 'yp', latex: 'y=' + ypDes });
      put(plane, { id: 'S', showLabel: true, label: '`s`' });

      // Readout.
      var e = expTex(F.a), trig = real ? '' : trigTex(f, F.b);
      var Pt = polyTex(F.P, 'x'), Pm = Pt === '1' ? '' : Pt;
      var bTex = (Pm + e + trig) || '1';
      var sTex = colored(ORANGE, cplxTex(F.a, F.b, false));
      var lhs = deTex(c) + ' = ' + bTex;
      var row1 = '\\[' + lhs + ', \\qquad s = \\alpha + i\\beta = ' + sTex + '\\]';
      var bShow = '\\[b(x) = ' + bTex + '\\]';
      var row2;
      if (k === 0) {
        var ps = pevalC(c, s);
        row2 = '\\[p(s) = ' + cplxTex(clean(ps[0]), clean(ps[1]), false) + ' \\neq 0, \\quad \\text{so } k = 0' +
          (F.P.length === 1 ? ', \\qquad \\left|\\tfrac{1}{p(s)}\\right| = ' + tnum(Math.round(1000 / cabs(ps)) / 1000) : '') + '\\]';
      } else {
        row2 = '\\[p(s) = 0: \\ ' + sTex + '\\text{ is a root of multiplicity } ' + k + ', \\text{ so } k = ' + k + '\\]';
      }
      var m = F.P.length - 1, A = [], Bv = [];
      for (var i = 0; i <= m; i++) { A.push(m === 0 ? 'A' : 'A_{' + i + '}' + powTex('x', i)); Bv.push(m === 0 ? 'B' : 'B_{' + i + '}' + powTex('x', i)); }
      var pa = m === 0 ? 'A' : '(' + A.join(' + ') + ')', pb = m === 0 ? 'B' : '(' + Bv.join(' + ') + ')';
      var guess = real ? powTex('x', k) + pa.replace(/^\((.*)\)$/, k ? '($1)' : '$1') + e
        : (function () {
          var inner = pa + trigTex('cos', F.b) + ' + ' + pb + trigTex('sin', F.b), pre = powTex('x', k) + e;
          return pre ? pre + '\\big[' + inner + '\\big]' : inner;
        })();
      var row3 = '\\[\\text{Guess: } \\quad y_p = ' + guess + '\\]';
      var row4 = '\\[y_p(x) = ' + ypTex(U, V, e, real ? null : F.b) + '\\]';
      typesetAll([['cc3-b', bShow], ['cc3-calc-eq', row1],['cc3-calc-k', row2], ['cc3-calc-guess', row3], ['cc3-calc-yp', row4]]);
    });
    var extra = {
      render: function (source) {
        if (source !== plane) { syncVar(plane, 'fa', 'f_{a}', F.a); syncVar(plane, 'fb', 'f_{b}', F.b); }
        solve();
      }
    };
    PlaneView(plane, fig3.plane[1], M3, extra);

    // The point s snaps to the grid, and onto a root when close to one.
    watch(plane, ['f_{a}', 'f_{b}'], function () {
      if (!driving(plane)) { return; }
      var a = value(plane, 'f_{a}'), b = Math.abs(value(plane, 'f_{b}'));
      if (isNaN(a) || isNaN(b)) { return; }
      a = Math.round(a * 10) / 10; b = Math.round(b * 10) / 10;
      if (b < SNAP) { b = 0; }
      M3.cl.forEach(function (q) { if (Math.hypot(q.re - a, q.im - b) <= SNAP + 1e-9) { a = q.re; b = q.im; } });
      if (a === F.a && b === F.b) { return; }
      F.a = a; F.b = b;
      solve();
    });
    drag.onUp.push(function (c) {
      if (c === plane) { setVar(plane, 'fa', 'f_{a}', F.a); setVar(plane, 'fb', 'f_{b}', F.b); }
    });

    var eqs = btnGroup(document.getElementById('cc3-presets'), EQ3, function (p) { M3.set(p.roots, null); }, 0);
    M3.on(function () {
      eqs.mark(EQ3.findIndex(function (p) { return p.roots.length === M3.roots.length && sameRoots(copyRoots(p.roots), M3.roots); }));
    });

    M3.refresh(null);
  }

  // (U) e cos + (V) e sin, dropping zero parts and parentheses around monomials.
  function ypTex(U, V, e, b) {
    var parts = [];
    [[U, b === null ? '' : trigTex('cos', b)], [V, b === null ? null : trigTex('sin', b)]].forEach(function (pr) {
      var poly = pr[0], tail = pr[1];
      if (tail === null || nonzero(poly) === 0) { return; }
      var t = e + tail;
      if (nonzero(poly) === 1) {
        var i = poly.findIndex(function (v) { return Math.abs(v) > 1e-12; });
        parts.push([poly[i], powTex('x', i) + t]);
      } else {
        parts.push([1, t ? '\\left(' + polyTex(poly, 'x') + '\\right)' + t : polyTex(poly, 'x')]);
      }
    });
    return parts.length ? sumTex(parts) : '0';
  }

})(this);
