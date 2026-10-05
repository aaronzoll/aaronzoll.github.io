---
layout: desmos-notebook
title: "Null Space and Range"
---

<div class="dnb-row ns-graphs">
  <div class="dnb-graph" id="ns-dom" data-json="null_space_domain.json" data-3d="true" data-height="460" data-no-toggle="true" data-ready-fn="nsDomainReady">
    <p class="ns-graph-title" id="ns-title-dom"></p>
    <p class="ns-caption" id="ns-cap-dom"></p>
  </div>
  <div class="dnb-graph" id="ns-cod" data-json="null_space_codomain.json" data-3d="true" data-height="460" data-no-toggle="true" data-ready-fn="nsCodomainReady">
    <p class="ns-graph-title" id="ns-title-cod"></p>
    <p class="ns-caption" id="ns-cap-cod"></p>
  </div>
</div>


<div class="ns-lower" id="ns-lower">

<div class="ns-panel" id="ns-panel">

  <div class="ns-block ns-block--size">
    <span class="ns-label">Size</span>
    <div class="ns-dials">
      <div class="ns-dial"><span class="ns-sub">\(m\)</span><div class="ns-dial-box"><button data-dial="m" data-dir="-1" aria-label="Fewer rows">−</button><span class="ns-dial-v" id="ns-m">2</span><button data-dial="m" data-dir="1" aria-label="More rows">+</button></div></div>
      <div class="ns-dial"><span class="ns-sub">\(n\)</span><div class="ns-dial-box"><button data-dial="n" data-dir="-1" aria-label="Fewer columns">−</button><span class="ns-dial-v" id="ns-n">3</span><button data-dial="n" data-dir="1" aria-label="More columns">+</button></div></div>
      <div class="ns-dial"><span class="ns-sub">rank</span><div class="ns-dial-box"><button data-dial="r" data-dir="-1" aria-label="Lower rank">−</button><span class="ns-dial-v" id="ns-r">1</span><button data-dial="r" data-dir="1" aria-label="Higher rank">+</button></div></div>
    </div>
    <button class="site-btn ns-wide" id="ns-random">Random \(A\) of this rank</button>
    <button class="site-btn ns-wide" id="ns-reset">Reset</button>
  </div>

  <div class="ns-block ns-block--matrix">
    <span class="ns-label">Matrix \(A\)</span>
    <div class="ns-mtx">
      <span class="ns-mtx-name">\(A =\)</span>
      <div class="ns-mtx-body" id="ns-matrix"></div>
    </div>
  </div>

  <div class="ns-block ns-block--x">
    <span class="ns-label">Vector \(\mathbf{x}\)</span>
    <div class="ns-mtx">
      <span class="ns-mtx-name">\(\mathbf{x} =\)</span>
      <div class="ns-mtx-body ns-xs" id="ns-xs"></div>
    </div>
  </div>

  <div class="ns-block ns-block--display">
    <span class="ns-label">Display</span>
    <div class="ns-grid2">
      <button class="site-btn ns-toggle" aria-pressed="false" data-show="nb">\(\mathcal{N}(A)\)</button>
      <button class="site-btn ns-toggle" aria-pressed="false" data-show="rb">\(\mathcal{R}(A)\)</button>
      <button class="site-btn ns-toggle" aria-pressed="false" data-show="bgrid">Basis grids</button>
      <button class="site-btn ns-toggle" aria-pressed="false" data-show="coset">\(\mathbf{x} + \mathcal{N}(A)\)</button>
    </div>
    <button class="site-btn ns-wide" id="ns-view">Reset 3D view</button>
  </div>

</div>

<div class="ns-swap">
  <button id="ns-swap" title="Swap the settings and the computation" aria-label="Swap the settings and the computation">&#8645;</button>
</div>

<div class="ns-calc">
  <span class="ns-label">Computation</span>
  <div class="ns-calc-row">
    <div class="ns-calc-math" id="ns-calc-rref"></div>
    <div class="ns-calc-math" id="ns-calc-null"></div>
    <div class="ns-calc-math" id="ns-calc-range"></div>
    <div class="ns-calc-math" id="ns-calc-ax"></div>
  </div>
</div>

</div>

<style>
  .ns-graphs {
    margin-bottom: 1rem;
  }

  .ns-graphs .ns-graph-title {
    margin: 0 0 0.35rem;
    font-size: 1rem;
    text-align: center;
    color: var(--color-ink);
  }

  /* Captions double as legends, since Desmos 3D draws no labels. */
  .ns-graphs .ns-caption {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
    text-align: center;
    color: var(--color-label);
  }

  .ns-swatch {
    display: inline-block;
    width: 0.75em;
    height: 0.75em;
    border-radius: 50%;
    margin: 0 0.3em 0 0.9em;
    vertical-align: -0.02em;
  }

  .ns-swatch:first-child {
    margin-left: 0;
  }

  /* Frozen 2D/1D views: a clear cover stops Desmos rotating the flat picture. */
  .ns-cover {
    position: absolute;
    inset: 0;
    z-index: 5;
    cursor: default;
  }

  /* On the domain, pressing anywhere puts x under the pointer. */
  #ns-dom .ns-cover {
    cursor: crosshair;
    touch-action: none;
  }

  /* Settings and computation stack under the graphs; the swap button
     between them reverses their order. */
  .ns-lower {
    display: flex;
    flex-direction: column;
    border-top: 2px solid var(--color-divider);
  }

  .ns-lower.ns-swapped {
    flex-direction: column-reverse;
  }

  .ns-swap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .ns-swap::before,
  .ns-swap::after {
    content: "";
    flex: 1;
    border-top: 2px solid var(--color-divider);
  }

  .ns-swap button {
    padding: 0 0.4rem;
    font: inherit;
    font-size: 1.1rem;
    line-height: 1.4;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--color-ink-faint);
    cursor: pointer;
  }

  .ns-swap button:hover {
    border-color: var(--color-ink-faint);
    color: var(--color-ink-mute);
  }

  .ns-panel {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.25rem;
    align-items: flex-start;
    padding: 1rem 0;
  }

  .ns-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .ns-block--size    { flex: 0 0 245px; }
  .ns-block--matrix  { flex: 0 0 auto; }
  .ns-block--x       { flex: 1 1 auto; }
  .ns-block--display { flex: 0 0 250px; }

  .ns-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ns-label mjx-container {
    text-transform: none;
  }

  .ns-sub {
    font-size: 0.85rem;
    color: var(--color-label);
  }

  /* Size dials, after the row-reduction game: label over − value +. */
  .ns-dials {
    display: flex;
    justify-content: space-between;
  }

  .ns-dial {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }

  .ns-dial-box {
    display: flex;
    align-items: center;
  }

  .ns-dial-box button {
    padding: 0.1rem 0.25rem;
    font: inherit;
    font-size: 1rem;
    line-height: 1;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--color-label);
    cursor: pointer;
  }

  .ns-dial-box button:hover:not(:disabled) {
    border-color: var(--color-ink-faint);
  }

  .ns-dial-box button:disabled {
    color: var(--color-divider);
    cursor: default;
  }

  .ns-dial-v {
    min-width: 1.1rem;
    text-align: center;
    font-size: 1.2rem;
    font-variant-numeric: tabular-nums;
  }

  /* Matrix entry, after the game's custom screen: a bracketed grid of boxes. */
  .ns-mtx {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ns-mtx-body {
    position: relative;
    display: grid;
    gap: 0.25rem 0.3rem;
    padding: 0.25rem 0.45rem;
  }

  .ns-mtx-body::before,
  .ns-mtx-body::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0.4rem;
    border: 2px solid var(--color-ink);
    pointer-events: none;
  }

  .ns-mtx-body::before { left: 0; border-right: none; }
  .ns-mtx-body::after  { right: 0; border-left: none; }

  .ns-mtx-body input {
    width: 2.6rem;
    padding: 0.15rem 0.1rem;
    font: inherit;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid var(--color-ink-faint);
    border-radius: 4px;
    background: #ffffff;
    color: var(--color-ink);
  }

  .ns-mtx-body input:focus {
    outline: none;
    border-color: var(--color-ink-accent);
    box-shadow: 0 0 0 2px rgba(84, 110, 122, 0.2);
  }

  .ns-mtx-body input.bad {
    border-color: #b7312c;
    background: #fff5f5;
  }

  /* x is a one-column version of the matrix entry. */
  .ns-mtx-body.ns-xs {
    grid-template-columns: auto;
  }

  .ns-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }

  .ns-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.4rem;
    font-size: 0.85rem;
  }

  .ns-wide {
    width: 100%;
  }

  .ns-panel .site-btn:disabled {
    opacity: 0.45;
    cursor: default;
  }

  /* Live computation under the controls: one row, wrapping when narrow. */
  .ns-calc {
    padding: 0.75rem 0 0.5rem;
  }

  .ns-calc .ns-label {
    display: block;
  }

  /* Fixed cells, so a changing x only moves its own cell; the Ax cell grows
     to the right from a fixed left edge instead of re-centering (which made
     everything shake while x was dragged). */
  .ns-calc-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    align-items: center;
    column-gap: 1.5em;
  }

  .ns-calc-row #ns-calc-ax mjx-container[display="true"] {
    text-align: left;
  }

  /* A bit smaller than body text so the row fits without scrolling. */
  .ns-calc-math {
    font-size: 0.9rem;
  }

  .ns-calc-math mjx-container[display="true"] {
    margin: 0.4em 0;
  }

  .ns-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

  @media (max-width: 680px) {
    /* Stacked graphs would otherwise shrink to their caption's width. */
    .ns-graphs > .dnb-graph {
      align-self: stretch;
    }

    .ns-block--size,
    .ns-block--matrix,
    .ns-block--x,
    .ns-block--display {
      flex: 1 1 100%;
    }
  }
</style>

<script>
(function () {

  // ── Look ───────────────────────────────────────────────────────────────
  // The row-reduction game's palette; these match the layer colors in the
  // two JSON files.
  var C_NULL = '#2e6cb5', C_RANGE = '#4b7d3c', C_X = '#8a3a3a', C_AX = '#d9822b';

  // Views. Desmos stores the camera as worldRotation3D, whose rows are the
  // world axes written in (away, left, up) screen coordinates. Top view:
  // x right, y up, z toward the viewer.
  var TOP = [0, -1, 0, 0, 0, 1, -1, 0, 0];
  function tilt(phi, alpha) {        // azimuth phi, then tip z up by alpha
    var cp = Math.cos(phi), sp = Math.sin(phi), ca = Math.cos(alpha), sa = Math.sin(alpha);
    var axes = [[cp, sp * ca, -sp * sa], [-sp, cp * ca, -cp * sa], [0, sa, ca]];   // (right, up, toward)
    return [].concat.apply([], axes.map(function (s) { return [-s[2], -s[0], s[1]]; }));
  }
  var ANGLED = tilt(-2.0, 1.2);

  // Drawing extents (grid and clipping) and viewport half-widths per dimension.
  var EXT = { 1: 7, 2: 7, 3: 4 };
  var VIEW = { 1: 3.9, 2: 3.9, 3: 3.0 };

  var RANDOM_MAX = 3;

  // Pixels per unit of an orthographic Desmos 3D view, measured: the camera
  // fits about 1/0.339 viewport half-widths into the frame's shorter side.
  var PX_PER_UNIT = 0.339;

  // ── Exact arithmetic ───────────────────────────────────────────────────
  // Entries may be typed as fractions or decimals, so A is kept as exact
  // BigInt fractions: row reduction then gives an exact rank, never a
  // tolerance call.
  function gcd(a, b) { if (a < 0n) { a = -a; } if (b < 0n) { b = -b; } while (b) { var t = a % b; a = b; b = t; } return a || 1n; }
  function Q(n, d) {
    n = BigInt(n); d = d === undefined ? 1n : BigInt(d);
    if (d < 0n) { n = -n; d = -d; }
    var g = gcd(n, d);
    return { n: n / g, d: d / g };
  }
  function qadd(a, b) { return Q(a.n * b.d + b.n * a.d, a.d * b.d); }
  function qsub(a, b) { return Q(a.n * b.d - b.n * a.d, a.d * b.d); }
  function qmul(a, b) { return Q(a.n * b.n, a.d * b.d); }
  function qdiv(a, b) { return Q(a.n * b.d, a.d * b.n); }
  function qval(a) { return Number(a.n) / Number(a.d); }
  function qzero(a) { return a.n === 0n; }

  // "3", "-2/5", "0.25", ".5" -> fraction; "" -> 0; anything else -> null.
  function parseQ(s) {
    var t = String(s).replace(/\s+/g, '').replace(/−/g, '-'), m;
    if (t === '') { return Q(0); }
    if ((m = /^(-?\d+)\/(-?\d+)$/.exec(t))) { return BigInt(m[2]) === 0n ? null : Q(m[1], m[2]); }
    if ((m = /^-?\d+$/.exec(t))) { return Q(t); }
    if ((m = /^(-?)(\d*)\.(\d+)$/.exec(t))) {
      return Q(m[1] + (m[2] || '0') + m[3], 10n ** BigInt(m[3].length));
    }
    return null;
  }
  // How a fraction appears in an entry box.
  function textQ(q) { return q.d === 1n ? q.n.toString() : q.n.toString() + '/' + q.d.toString(); }

  function rref(M, m, n) {
    var R = M.slice(0, m).map(function (row) { return row.slice(0, n); });
    var piv = [], row = 0;
    for (var c = 0; c < n && row < m; c++) {
      var p = -1;
      for (var i = row; i < m; i++) { if (!qzero(R[i][c])) { p = i; break; } }
      if (p < 0) { continue; }
      var t = R[row]; R[row] = R[p]; R[p] = t;
      var lead = R[row][c];
      R[row] = R[row].map(function (v) { return qdiv(v, lead); });
      for (i = 0; i < m; i++) {
        if (i === row || qzero(R[i][c])) { continue; }
        var f = R[i][c];
        R[i] = R[i].map(function (v, j) { return qsub(v, qmul(f, R[row][j])); });
      }
      piv.push(c);
      row++;
    }
    return { R: R, piv: piv };
  }

  // Special solutions: one per free column, with a 1 in that slot.
  function nullBasis(red, n) {
    var free = [];
    for (var j = 0; j < n; j++) { if (red.piv.indexOf(j) < 0) { free.push(j); } }
    return free.map(function (f) {
      var u = [];
      for (var j = 0; j < n; j++) { u.push(Q(j === f ? 1 : 0)); }
      red.piv.forEach(function (pc, k) { u[pc] = Q(-red.R[k][f].n, red.R[k][f].d); });
      return u;
    });
  }

  // ── State ──────────────────────────────────────────────────────────────
  // A (with its typed text) and x are kept at full 3x3 / 3 size, so
  // shrinking and regrowing m or n brings entries back.
  // The default A is written as it should appear in the entry boxes.
  var DEFAULT = {
    m: 2, n: 3, r: 1,
    A: [['1', '1', '1'], ['0.5', '0.5', '0.5'], ['0', '0', '0']],
    x: ['2', '2', '0']
  };
  var S;
  function reset() {
    S = {
      m: DEFAULT.m, n: DEFAULT.n, r: DEFAULT.r,
      A: DEFAULT.A.map(function (r) { return r.map(parseQ); }),
      text: DEFAULT.A.map(function (r) { return r.slice(); }),
      x: DEFAULT.x.map(parseQ),
      xText: DEFAULT.x.slice()
    };
  }
  reset();
  var show = { nb: false, rb: false, bgrid: false, coset: false };

  // ── 3-vector geometry ──────────────────────────────────────────────────
  // Everything lives in R^3; a lower-dimensional space just keeps the
  // trailing coordinates at 0.
  function v3(a) { return [a[0] || 0, a[1] || 0, a[2] || 0]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function len(a) { return Math.sqrt(dot(a, a)); }

  function box(d) { var E = EXT[d]; return [E, d >= 2 ? E : 0, d >= 3 ? E : 0]; }
  function inBox(p, ext) {
    return Math.abs(p[0]) <= ext[0] + 1e-9 && Math.abs(p[1]) <= ext[1] + 1e-9 && Math.abs(p[2]) <= ext[2] + 1e-9;
  }

  // The part of the line p + t d inside the box, as [start, end] or null.
  function clipLine(p, d, ext) {
    var lo = -Infinity, hi = Infinity;
    for (var i = 0; i < 3; i++) {
      if (Math.abs(d[i]) < 1e-12) {
        if (Math.abs(p[i]) > ext[i] + 1e-9) { return null; }
        continue;
      }
      var a = (-ext[i] - p[i]) / d[i], b = (ext[i] - p[i]) / d[i];
      lo = Math.max(lo, Math.min(a, b));
      hi = Math.min(hi, Math.max(a, b));
    }
    return hi - lo > 1e-9 ? [add(p, mul(d, lo)), add(p, mul(d, hi))] : null;
  }

  // The polygon cut from the box by the plane through c spanned by b1, b2,
  // with vertices in order around the plane.
  function planePolygon(c, b1, b2, ext) {
    var nrm = cross(b1, b2), pts = [];
    var corners = [];
    [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sy) { [-1, 1].forEach(function (sz) {
      corners.push([sx * ext[0], sy * ext[1], sz * ext[2]]);
    }); }); });
    corners.forEach(function (P, i) {
      corners.forEach(function (R, j) {
        if (j <= i) { return; }
        var diff = 0;
        for (var k = 0; k < 3; k++) { if (P[k] !== R[k]) { diff++; } }
        if (diff !== 1) { return; }                       // not an edge
        var dp = dot(nrm, sub(R, P));
        if (Math.abs(dp) < 1e-12) { return; }
        var s = dot(nrm, sub(c, P)) / dp;
        if (s < -1e-9 || s > 1 + 1e-9) { return; }
        var X = add(P, mul(sub(R, P), s));
        if (!pts.some(function (q) { return len(sub(q, X)) < 1e-6; })) { pts.push(X); }
      });
    });
    if (pts.length < 3) { return null; }
    var mid = mul(pts.reduce(add, [0, 0, 0]), 1 / pts.length);
    var e1 = mul(b1, 1 / len(b1)), e2 = cross(mul(nrm, 1 / len(nrm)), e1);
    pts.sort(function (a, b) {
      return Math.atan2(dot(sub(a, mid), e2), dot(sub(a, mid), e1)) -
             Math.atan2(dot(sub(b, mid), e2), dot(sub(b, mid), e1));
    });
    return { mid: mid, pts: pts };
  }

  // Lattice lines c + j b1 + t b2 (and the same with b1, b2 swapped).
  function latticeLines(c, b1, b2, ext) {
    var segs = [];
    [[b1, b2], [b2, b1]].forEach(function (pair) {
      var step = pair[0], dir = pair[1];
      for (var j = -60; j <= 60; j++) {
        var s = clipLine(add(c, mul(step, j)), dir, ext);
        if (s) { segs.push(s); }
      }
    });
    return segs;
  }

  // ── Desmos latex ───────────────────────────────────────────────────────
  function num(x) { var s = (Math.round(x * 1e4) / 1e4).toString(); return s === '-0' ? '0' : s; }
  function pt(p) { return '\\left(' + num(p[0]) + ',' + num(p[1]) + ',' + num(p[2]) + '\\right)'; }
  function list(ps) { return '\\left[' + ps.map(pt).join(',') + '\\right]'; }
  function segments(segs) {
    if (!segs.length) { return null; }
    return '\\operatorname{segment}\\left(' + list(segs.map(function (s) { return s[0]; })) + ',' +
           list(segs.map(function (s) { return s[1]; })) + '\\right)';
  }
  function vectors(tips) {
    tips = tips.filter(function (t) { return len(t) > 1e-9; });
    if (!tips.length) { return null; }
    return '\\operatorname{vector}\\left(' + list(tips.map(function () { return [0, 0, 0]; })) + ',' + list(tips) + '\\right)';
  }
  // A filled convex polygon, as a fan of parametric triangles around its middle.
  function fill(poly) {
    if (!poly) { return null; }
    var P = list(poly.pts), Qs = list(poly.pts.slice(1).concat([poly.pts[0]])), M = pt(poly.mid);
    return M + '+u\\left(' + P + '+v\\left(' + Qs + '-' + P + '\\right)-' + M + '\\right)';
  }

  function setLayer(calc, id, latex) {
    if (latex) { calc.setExpression({ id: id, latex: latex, hidden: false }); }
    else { calc.setExpression({ id: id, hidden: true }); }
  }

  // ── Scenes ─────────────────────────────────────────────────────────────
  function standardGrid(d) {
    var E = EXT[d], segs = [], j;
    if (d === 1) {
      for (j = -E; j <= E; j++) { segs.push([[j, -0.15, 0], [j, 0.15, 0]]); }
    } else {
      for (j = -E; j <= E; j++) {
        segs.push([[j, -E, 0], [j, E, 0]]);
        segs.push([[-E, j, 0], [E, j, 0]]);
      }
    }
    return segments(segs);
  }

  function axes(d) {
    var E = EXT[d] + 0.5, from = [], to = [];
    for (var i = 0; i < d; i++) {
      var e = [0, 0, 0]; e[i] = E;
      from.push(mul(e, -1)); to.push(e);
    }
    return '\\operatorname{vector}\\left(' + list(from) + ',' + list(to) + '\\right)';
  }

  // One space: the standard grid, its subspace (null space or range) with
  // its basis vectors (toggled together), the basis grid, and x or Ax.
  function drawSpace(calc, d, basis, point, showSpace) {
    var ext = box(d), k = basis.length, O = [0, 0, 0];

    setLayer(calc, 'grid', standardGrid(d));
    setLayer(calc, 'axes', axes(d));

    var subPt = null, subLine = null, subFill = null, subBox = null;
    if (k === 0) {
      subPt = pt(O);
    } else if (k === 1) {
      subLine = segments([clipLine(O, basis[0], ext)].filter(Boolean));
    } else if (k === 2 && d === 2) {
      var E = EXT[2], z = -0.03;
      subFill = fill({ mid: [0, 0, z], pts: [[-E, -E, z], [E, -E, z], [E, E, z], [-E, E, z]] });
    } else if (k === 2) {
      subFill = fill(planePolygon(O, basis[0], basis[1], ext));
    } else {
      var segs = [], c = ext;
      [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(function (ax) {
        [-1, 1].forEach(function (s1) { [-1, 1].forEach(function (s2) {
          var o = ax.map(function (a, i) { return a ? -c[i] : 0; });
          var free = [0, 1, 2].filter(function (i) { return !ax[i]; });
          o[free[0]] = s1 * c[free[0]]; o[free[1]] = s2 * c[free[1]];
          segs.push([o, add(o, mul(ax, 2 * c[ax.indexOf(1)]))]);
        }); });
      });
      subBox = segments(segs);
    }
    setLayer(calc, 'sub_pt', showSpace ? subPt : null);
    setLayer(calc, 'sub_line', showSpace ? subLine : null);
    setLayer(calc, 'sub_fill', showSpace ? subFill : null);
    setLayer(calc, 'sub_box', showSpace ? subBox : null);

    // Basis grid: tick dots along a line, lattice lines on a plane. A basis
    // of all of R^3 would fill the box with a skewed lattice, so it is left out.
    var dots = null, lines = null;
    if (show.bgrid && k === 1) {
      var ps = [];
      for (var j = -60; j <= 60; j++) {
        var p = mul(basis[0], j);
        if (j !== 0 && inBox(p, ext)) { ps.push(p); }
      }
      dots = ps.length ? list(ps) : null;
    } else if (show.bgrid && k === 2) {
      lines = segments(latticeLines(O, basis[0], basis[1], ext));
    }
    setLayer(calc, 'bgrid_dots', dots);
    setLayer(calc, 'bgrid_lines', lines);

    setLayer(calc, 'basis', showSpace ? vectors(basis) : null);
    setLayer(calc, 'vec_pt', pt(point));
  }

  // x + N(A): the solutions of Ay = Ax, drawn through x as a line or a
  // (translucent) plane.
  function drawCoset(calc, d, basis, x) {
    var k = basis.length, ext = box(d), line = null, plane = null;
    if (show.coset && k === 1 && d > 1) {
      line = segments([clipLine(x, basis[0], ext)].filter(Boolean));
    } else if (show.coset && k === 2 && d === 3) {
      plane = fill(planePolygon(x, basis[0], basis[1], ext));
    }
    setLayer(calc, 'coset_line', line);
    setLayer(calc, 'coset_fill', plane);
  }

  // ── Calculation display ────────────────────────────────────────────────
  function fmt(x) {
    var s = (Math.round(x * 10) / 10).toFixed(1).replace(/\.?0+$/, '');
    return s === '-0' ? '0' : s;
  }
  // Exact values: integers as is, terminating decimals as decimals (so
  // x = 0.5 stays 0.5), everything else as a fraction.
  function fmtQ(q) {
    if (q.d === 1n) { return q.n.toString(); }
    var d = q.d, twos = 0, fives = 0;
    while (d % 2n === 0n) { d /= 2n; twos++; }
    while (d % 5n === 0n) { d /= 5n; fives++; }
    var places = Math.max(twos, fives);
    if (d === 1n && places <= 3) { return qval(q).toFixed(places); }
    return (q.n < 0n ? '-' : '') + '\\frac{' + (q.n < 0n ? -q.n : q.n).toString() + '}{' + q.d.toString() + '}';
  }
  // Matrix from columns of display strings. In any column holding a negative
  // entry, the other entries get a \phantom{-} so the digits line up.
  function bmatrix(cols) {
    var padded = cols.map(function (col) {
      var neg = col.some(function (s) { return s.charAt(0) === '-'; });
      return col.map(function (s) { return neg && s.charAt(0) !== '-' ? '\\phantom{-}' + s : s; });
    });
    var rows = padded[0].map(function (_, i) {
      return padded.map(function (col) { return col[i]; }).join(' & ');
    });
    return '\\begin{bmatrix} ' + rows.join(' \\\\ ') + ' \\end{bmatrix}';
  }
  // \color recolors the rest of its group in MathJax, so each piece gets its own.
  function colored(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }
  function spanOf(vs, hex) {
    return '\\operatorname{span}\\left\\{' + vs.map(function (v) { return colored(hex, bmatrix([v])); }).join(',\\ ') + '\\right\\}';
  }

  function typesetMath(nodes) {
    if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise = MathJax.startup.promise
        .then(function () { return MathJax.typesetPromise(nodes); })
        .catch(function (err) { console.error(err); });
    }
  }

  function writeCalc(red, nb, xq, Ax) {
    var m = S.m, k = nb.length, r = red.piv.length;
    var el = function (id) { return document.getElementById(id); };
    var rrefCols = red.R[0].map(function (_, j) { return red.R.map(function (row) { return fmtQ(row[j]); }); });

    el('ns-calc-rref').innerHTML = '\\[\\operatorname{rref}(A) = ' + bmatrix(rrefCols) + '\\]';

    el('ns-calc-null').innerHTML = '\\[\\mathcal{N}(A) = ' +
      (k ? spanOf(nb.map(function (u) { return u.map(fmtQ); }), C_NULL) : '\\{\\mathbf{0}\\}') + '\\]';

    var pivCols = red.piv.map(function (j) { return S.A.slice(0, m).map(function (row) { return fmtQ(row[j]); }); });
    el('ns-calc-range').innerHTML = '\\[\\mathcal{R}(A) = ' +
      (r ? spanOf(pivCols, C_RANGE) : '\\{\\mathbf{0}\\}') + '\\]';

    el('ns-calc-ax').innerHTML = '\\[A' + colored(C_X, '\\mathbf{x}') + ' = A' +
      colored(C_X, bmatrix([xq.map(fmtQ)])) + ' = ' + colored(C_AX, bmatrix([Ax.map(fmtQ)])) + '\\]';

    typesetMath(['ns-calc-rref', 'ns-calc-null', 'ns-calc-range', 'ns-calc-ax'].map(el));
  }

  function writeCaptions() {
    var sw = function (hex) { return '<span class="ns-swatch" style="background:' + hex + '"></span>'; };
    var el = function (id) { return document.getElementById(id); };
    el('ns-title-dom').innerHTML = 'Domain: \\(\\R^{' + S.n + '}\\)';
    el('ns-title-cod').innerHTML = 'Codomain: \\(\\R^{' + S.m + '}\\)';
    el('ns-cap-dom').innerHTML = sw(C_NULL) + '\\(\\mathcal{N}(A)\\)' + sw(C_X) + '\\(\\mathbf{x}\\)';
    el('ns-cap-cod').innerHTML = sw(C_RANGE) + '\\(\\mathcal{R}(A)\\)' + sw(C_AX) + '\\(A\\mathbf{x}\\)';
    typesetMath(['ns-title-dom', 'ns-title-cod', 'ns-cap-dom', 'ns-cap-cod'].map(el));
  }

  // ── Controls ───────────────────────────────────────────────────────────
  // The matrix is a grid of text boxes, like the game's custom screen. A box
  // that does not parse turns red and A keeps its last good value there.
  // Typing hints live in the boxes' tooltips rather than on the page.
  // x is a one-column grid of the same boxes, kept in sync with dragging.
  function boxHTML(i, j, text, what) {
    return '<input data-i="' + i + '" data-j="' + j + '" value="' + text.replace(/"/g, '&quot;') +
           '" placeholder="0" inputmode="decimal" autocomplete="off" spellcheck="false"' +
           ' title="An integer, decimal or fraction such as 3/4; arrow keys move between entries"' +
           ' aria-label="' + what + '">';
  }

  function buildMatrix() {
    var mat = document.getElementById('ns-matrix'), h = '';
    mat.style.gridTemplateColumns = 'repeat(' + S.n + ', auto)';
    for (var i = 0; i < S.m; i++) {
      for (var j = 0; j < S.n; j++) { h += boxHTML(i, j, S.text[i][j], 'Entry ' + (i + 1) + ', ' + (j + 1) + ' of A'); }
    }
    mat.innerHTML = h;
  }

  function buildX() {
    var h = '';
    for (var i = 0; i < S.n; i++) { h += boxHTML(i, 0, S.xText[i], 'Entry ' + (i + 1) + ' of x'); }
    document.getElementById('ns-xs').innerHTML = h;
  }

  // Shared wiring for a grid of boxes: parse on input (keeping the last good
  // value while a box is red), and move between boxes like a spreadsheet.
  // Left/Right only leave a box from its start/end so they still edit inside
  // one; Enter steps on.
  function wireGrid(box, rows, cols, store) {
    box.addEventListener('input', function (e) {
      var inp = e.target, i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
      var q = parseQ(inp.value);
      inp.classList.toggle('bad', !q);
      store(i, j, inp.value, q);
      if (q) { render(); }
    });
    box.addEventListener('focusin', function (e) { if (e.target.select) { e.target.select(); } });
    box.addEventListener('keydown', function (e) {
      var inp = e.target, i = +inp.getAttribute('data-i'), j = +inp.getAttribute('data-j');
      var all = inp.selectionEnd - inp.selectionStart === inp.value.length;
      var to = null;
      if (e.key === 'ArrowUp') { to = [i - 1, j]; }
      else if (e.key === 'ArrowDown') { to = [i + 1, j]; }
      else if (e.key === 'ArrowLeft' && (all || inp.selectionStart === 0)) { to = [i, j - 1]; }
      else if (e.key === 'ArrowRight' && (all || inp.selectionStart === inp.value.length)) { to = [i, j + 1]; }
      else if (e.key === 'Enter') { to = j + 1 < cols() ? [i, j + 1] : [(i + 1) % rows(), 0]; }
      var next = to && box.querySelector('input[data-i="' + to[0] + '"][data-j="' + to[1] + '"]');
      if (next) { e.preventDefault(); next.focus(); next.select(); }
    });
  }

  function wireInputs() {
    wireGrid(document.getElementById('ns-matrix'),
      function () { return S.m; }, function () { return S.n; },
      function (i, j, text, q) { S.text[i][j] = text; if (q) { S.A[i][j] = q; } });
    wireGrid(document.getElementById('ns-xs'),
      function () { return S.n; }, function () { return 1; },
      function (i, j, text, q) { S.xText[i] = text; if (q) { S.x[i] = q; } });
  }

  // ── Dragging x ─────────────────────────────────────────────────────────
  // Desmos 3D will not let a page drag its points, so the domain handles the
  // pointer itself. The camera is orthographic, so a pixel offset maps to a
  // world offset along the screen's right and up directions (read off the
  // rotation, whose rows are the world axes in (away, left, up) coordinates).
  // Desmos commits a rotation to its saved state only after a debounce, and the
  // view keeps spinning with momentum after release, so getState() lags the
  // picture. Read the live matrix (internal, same layout as the saved one) and
  // fall back to the saved state if Desmos ever moves it.
  function liveRotation(g) {
    try {
      var live = g.calc._calc.graphSettings.controller.grapher3d.controls.worldRotation3D.elements;
      if (live && live.length === 9) { return Array.prototype.slice.call(live); }
    } catch (e) { /* fall through */ }
    return g.calc.getState().graph.worldRotation3D || ANGLED;
  }

  function camera(g) {
    var b = g.calc.graphpaperBounds, mc = b.mathCoordinates, pc = b.pixelCoordinates;
    var R = g.dim === 3 ? liveRotation(g) : TOP;
    var mid = [(mc.xmin + mc.xmax) / 2, (mc.ymin + mc.ymax) / 2, (mc.zmin + mc.zmax) / 2];
    return {
      mid: mid, w: pc.width, h: pc.height, left: pc.left || 0, top: pc.top || 0,
      scale: PX_PER_UNIT * Math.min(pc.width, pc.height) / ((mc.xmax - mc.xmin) / 2),
      right: [-R[1], -R[4], -R[7]],
      up: [R[2], R[5], R[8]]
    };
  }
  function toPixels(cam, p) {
    var d = sub(p, cam.mid);
    return [cam.left + cam.w / 2 + cam.scale * dot(cam.right, d), cam.top + cam.h / 2 - cam.scale * dot(cam.up, d)];
  }
  function fromPixels(cam, px, py) {
    return add(cam.mid, add(mul(cam.right, (px - cam.left - cam.w / 2) / cam.scale),
                            mul(cam.up, (cam.top + cam.h / 2 - py) / cam.scale)));
  }

  // Set x from a world point: tenths, inside the drawn box, and the boxes
  // under "Vector x" rewritten to match.
  function moveX(p) {
    var E = G.dom.dim === 3 ? EXT[3] : EXT[2] - 1;
    for (var i = 0; i < S.n; i++) {
      var v = Math.max(-E, Math.min(E, Math.round(p[i] * 10) / 10));
      S.x[i] = Q(Math.round(v * 10), 10);
      S.xText[i] = fmt(v);
    }
    document.querySelectorAll('#ns-xs input').forEach(function (inp, i) {
      inp.value = S.xText[i];
      inp.classList.remove('bad');
    });
    render();
  }

  function wireDrag() {
    var g = G.dom, wrap = g.container.querySelector('.dnb-calc-wrap');
    var drag = null;

    function local(e) {
      var r = g.container.querySelector('.dnb-calc-wrap > div').getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }

    // Capture phase, so a press on x never reaches Desmos (which would rotate).
    wrap.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) { return; }
      var cam = camera(g), at = local(e), x = v3(S.x.slice(0, S.n).map(qval));
      if (g.dim === 3) {
        var tip = toPixels(cam, x);
        if (Math.hypot(tip[0] - at[0], tip[1] - at[1]) > 16) { return; }   // not on x: let Desmos rotate
        // Stop any leftover spin so the view holds still under the pointer.
        try { g.calc._calc.graphSettings.controller.grapher3d.controls.speed3D = 0; } catch (err) { /* ignore */ }
        drag = { cam: camera(g), from: at, x0: x };
      } else {
        if (e.target !== g.cover) { return; }    // e.g. a click in the expression list
        drag = { cam: cam, from: null };
        moveX(fromPixels(cam, at[0], at[1]));
      }
      e.preventDefault();
      e.stopPropagation();
      wrap.setPointerCapture(e.pointerId);
    }, true);

    wrap.addEventListener('pointermove', function (e) {
      if (!drag) { return; }
      var at = local(e), cam = drag.cam;
      if (!drag.from) { moveX(fromPixels(cam, at[0], at[1])); return; }
      // 3D: move x in the plane facing the screen, so it stays under the pointer.
      var dx = (at[0] - drag.from[0]) / cam.scale, dy = (drag.from[1] - at[1]) / cam.scale;
      moveX(add(drag.x0, add(mul(cam.right, dx), mul(cam.up, dy))));
      e.stopPropagation();
    }, true);

    function end(e) {
      if (!drag) { return; }
      drag = null;
      if (wrap.hasPointerCapture(e.pointerId)) { wrap.releasePointerCapture(e.pointerId); }
      e.stopPropagation();
    }
    wrap.addEventListener('pointerup', end, true);
    wrap.addEventListener('pointercancel', end, true);
  }

  function syncDials() {
    S.r = Math.min(S.r, Math.min(S.m, S.n));
    var lim = { m: [1, 3], n: [1, 3], r: [0, Math.min(S.m, S.n)] };
    ['m', 'n', 'r'].forEach(function (key) {
      document.getElementById('ns-' + key).textContent = S[key];
      document.querySelectorAll('[data-dial="' + key + '"]').forEach(function (b) {
        var dir = +b.getAttribute('data-dir');
        b.disabled = dir < 0 ? S[key] <= lim[key][0] : S[key] >= lim[key][1];
      });
    });
  }

  // A random m x n integer matrix of rank exactly r with entries in [-3, 3]:
  // a product of random m x r and r x n factors, retried until it fits.
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function randomMatrix(m, n, r) {
    for (var tries = 0; tries < 2000; tries++) {
      var B = [], Cm = [], i, j, t;
      for (i = 0; i < m; i++) { B.push([]); for (t = 0; t < r; t++) { B[i].push(randInt(-2, 2)); } }
      for (t = 0; t < r; t++) { Cm.push([]); for (j = 0; j < n; j++) { Cm[t].push(randInt(-2, 2)); } }
      var M = [], ok = true;
      for (i = 0; i < m; i++) {
        M.push([]);
        for (j = 0; j < n; j++) {
          var s = 0;
          for (t = 0; t < r; t++) { s += B[i][t] * Cm[t][j]; }
          if (Math.abs(s) > RANDOM_MAX) { ok = false; }
          M[i].push(Q(s));
        }
      }
      if (ok && rref(M, m, n).piv.length === r) { return M; }
    }
    return null;
  }

  // ── Wiring ─────────────────────────────────────────────────────────────
  var G = {};      // dom / cod: { calc, container, cover, dim }

  function syncCover(g) {
    g.cover.style.display = g.dim === 3 || g.calc.settings.expressions ? 'none' : 'block';
  }

  function setView(g, d, force) {
    if (g.dim === d && !force) { return; }
    g.dim = d;
    var s = g.calc.getState(), h = VIEW[d];
    s.graph.worldRotation3D = d === 3 ? ANGLED : TOP;
    s.graph.viewport = { xmin: -h, xmax: h, ymin: -h, ymax: h, zmin: -h, zmax: h };
    delete s.graph.__v12ViewportLatexStash;
    g.calc.setState(s, { allowUndo: false });
    syncCover(g);
  }

  var pending = false;
  function render() {
    if (pending) { return; }
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      var m = S.m, n = S.n;
      var red = rref(S.A, m, n);
      var nb = nullBasis(red, n);
      var nbF = nb.map(function (u) { return v3(u.map(qval)); });
      var rbF = red.piv.map(function (j) { return v3(S.A.slice(0, m).map(function (row) { return qval(row[j]); })); });
      var xq = S.x.slice(0, n);
      var Ax = S.A.slice(0, m).map(function (row) {
        return row.slice(0, n).reduce(function (s, a, j) { return qadd(s, qmul(a, xq[j])); }, Q(0));
      });

      setView(G.dom, n);
      setView(G.cod, m);
      drawSpace(G.dom.calc, n, nbF, v3(xq.map(qval)), show.nb);
      drawCoset(G.dom.calc, n, nbF, v3(xq.map(qval)));
      drawSpace(G.cod.calc, m, rbF, v3(Ax.map(qval)), show.rb);
      document.getElementById('ns-view').disabled = n < 3 && m < 3;
      writeCalc(red, nb, xq, Ax);
    });
  }

  function resize() {
    syncDials();
    buildMatrix();
    buildX();
    writeCaptions();
    render();
  }

  function boot() {
    if (!G.dom || !G.cod) { return; }
    [G.dom, G.cod].forEach(function (g) {
      // Orthographic camera so the top-down views look like ordinary 2D
      // graphs; translucent surfaces so a plane never hides what is behind it.
      g.calc.updateSettings({ perspectiveDistortion: 0, translucentSurfaces: true, zoomButtons: false });
      var wrap = g.container.querySelector('.dnb-calc-wrap');
      wrap.style.position = 'relative';
      g.cover = document.createElement('div');
      g.cover.className = 'ns-cover';
      g.cover.title = g === G.dom ? 'Click or drag to move x.' : 'Flat view: the camera is fixed while this space is 1D or 2D.';
      wrap.appendChild(g.cover);
      g.container.insertBefore(g.container.querySelector('.ns-graph-title'), wrap);
    });

    document.querySelectorAll('[data-dial]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-dial');
        S[key] += +b.getAttribute('data-dir');
        if (key === 'r') { syncDials(); } else { resize(); }
      });
    });

    document.getElementById('ns-random').addEventListener('click', function () {
      var M = randomMatrix(S.m, S.n, S.r);
      if (!M) { return; }
      for (var i = 0; i < S.m; i++) {
        for (var j = 0; j < S.n; j++) { S.A[i][j] = M[i][j]; S.text[i][j] = textQ(M[i][j]); }
      }
      resize();
    });

    document.getElementById('ns-reset').addEventListener('click', function () {
      reset();
      resize();
    });

    document.getElementById('ns-view').addEventListener('click', function () {
      if (G.dom.dim === 3) { setView(G.dom, 3, true); }
      if (G.cod.dim === 3) { setView(G.cod, 3, true); }
      render();
    });

    document.querySelectorAll('.ns-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-show'), on = !show[key];
        show[key] = on;
        btn.classList.toggle('site-btn--active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        render();
      });
    });

    wireInputs();
    wireDrag();

    var lower = document.getElementById('ns-lower');
    try { if (localStorage.getItem('ns-swapped') === '1') { lower.classList.add('ns-swapped'); } } catch (e) { /* no storage */ }
    document.getElementById('ns-swap').addEventListener('click', function () {
      var on = lower.classList.toggle('ns-swapped');
      try { localStorage.setItem('ns-swapped', on ? '1' : '0'); } catch (e) { /* no storage */ }
    });
    typesetMath([document.getElementById('ns-panel')]);
    resize();
  }

  window.nsDomainReady = function (calc, container) { G.dom = { calc: calc, container: container }; boot(); };
  window.nsCodomainReady = function (calc, container) { G.cod = { calc: calc, container: container }; boot(); };
})();
</script>
