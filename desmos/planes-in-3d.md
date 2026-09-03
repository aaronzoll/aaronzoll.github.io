---
layout: desmos-graph
title: "Planes in 3D"
desmos_json: "planes_in_3d.json"
graph_3d: true
side_controls: true
---

<div class="pl-panel">

  <span class="pl-label">Plane Shape</span>
  <button class="site-btn" id="pl-shape-btn">Shape: Circular</button>

  <hr class="desmos-divider">

  <span class="pl-label">Generate a System</span>
  <button class="site-btn" id="pl-random-btn">Random (unique solution)</button>
  <button class="site-btn" id="pl-random-line-btn">Random (line of solutions)</button>
  <button class="site-btn" id="pl-no-solution-btn">No solution</button>
  <button class="site-btn" id="pl-reset-btn">Reset</button>

</div>

<style>
  .pl-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pl-panel .site-btn {
    width: 100%;
  }

  .pl-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
</style>

<!--below-graph-->

<div class="pl-linsys" id="pl-linsys">

  <div class="pl-block">
    <span class="pl-block-label">System of Equations</span>
    <div class="pl-eq" id="pl-equations"></div>
  </div>

  <div class="pl-block">
    <span class="pl-block-label">Augmented Matrix</span>
    <div class="pl-eq" id="pl-augmented"></div>
  </div>

  <div class="pl-block">
    <span class="pl-block-label">RREF</span>
    <div class="pl-eq" id="pl-rref"></div>
  </div>

  <div class="pl-block pl-block--solution">
    <span class="pl-block-label">Solution Set</span>
    <div class="pl-eq" id="pl-solution"></div>
  </div>

</div>

<style>
  .pl-linsys {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem 2rem;
    margin-top: 0.75rem;
    padding: 1rem 1.25rem;
    background: #fdf6ee;
    border: 1px solid #a67b5b;
    border-radius: 6px;
  }

  .pl-block-label {
    display: block;
    font-weight: bold;
    font-size: 0.78rem;
    color: #6b7c8a;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.35rem;
  }

  .pl-eq {
    font-size: 1rem;
    overflow-x: auto;
  }

  .pl-block--solution {
    grid-column: 1 / -1;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(166, 123, 91, 0.4);
  }

  .pl-sol-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.15rem 0.55rem;
    border-radius: 3px;
    margin-bottom: 0.5rem;
  }

  .pl-sol-point { background: rgba(45, 112, 179, 0.12); color: #2d70b3; }
  .pl-sol-line  { background: rgba(96, 66, 166, 0.12);  color: #6042a6; }
  .pl-sol-none  { background: rgba(199, 68, 64, 0.12);  color: #c74440; }

  .pl-sol-note {
    margin: 0.3rem 0 0;
    font-size: 0.85rem;
    color: #555;
  }

  @media (max-width: 700px) {
    .pl-linsys { grid-template-columns: 1fr; }
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from planes_in_3d.json ──────────────────────────────
    var ID = {
      a1: '4',  b1: '5',  c1: '6',  d1: '7',
      a2: '11', b2: '12', c2: '13', d2: '14',
      a3: '19', b3: '20', c3: '21', d3: '22',
      R:  '38',
      x0: '90', y0: '91', z0: '92',
      solutionPoint: '37'
    };

    var LATEX_SYM = {
      a1: 'a_{1}', b1: 'b_{1}', c1: 'c_{1}', d1: 'd_{1}',
      a2: 'a_{2}', b2: 'b_{2}', c2: 'c_{2}', d2: 'd_{2}',
      a3: 'a_{3}', b3: 'b_{3}', c3: 'c_{3}', d3: 'd_{3}'
    };

    var coeffs = {};
    var currentCenter = [0, 0, 0];

    function pushCoeffsToDesmos() {
      Object.keys(LATEX_SYM).forEach(function (key) {
        calc.setExpression({ id: ID[key], latex: LATEX_SYM[key] + '=' + coeffs[key] });
      });
    }

    // ── Number / LaTeX formatting ────────────────────────────────────────
    // General display values (RREF, solution vectors): rounded to 1 decimal.
    function fmtNum(x) {
      if (Math.abs(x) < 1e-9) { x = 0; }
      var r = Math.round(x * 10) / 10;
      if (Object.is(r, -0)) { r = 0; }
      var s = r.toFixed(1).replace(/\.0$/, '');
      return s === '' || s === '-' ? '0' : s;
    }

    // Raw system / augmented matrix: round each entry to 1 decimal, then
    // scale the row by 10 — an equivalent system (scaling an equation by a
    // nonzero constant doesn't change its solutions) with integer entries,
    // which is much easier to read than the underlying decimal coefficients.
    // Then divide the whole row by the GCD of its (now-integer) entries, so
    // e.g. 10x+20y+10z=40 reduces to x+2y+z=4 instead of staying inflated.
    function scaleInt(x) {
      var r1 = Math.round(x * 10) / 10;
      var v = Math.round(r1 * 10);
      return Object.is(v, -0) ? 0 : v;
    }

    function gcd2(a, b) {
      a = Math.abs(a); b = Math.abs(b);
      while (b) { var t = b; b = a % b; a = t; }
      return a;
    }

    function reduceRow(row) {
      var g = 0;
      row.forEach(function (v) { g = gcd2(g, v); });
      return g > 1 ? row.map(function (v) { return v / g; }) : row;
    }

    function toIntRow(row) {
      return reduceRow(row.map(scaleInt));
    }

    function rowEquationParts(row) {
      var r = toIntRow(row);
      var terms = [];
      [[r[0], 'x'], [r[1], 'y'], [r[2], 'z']].forEach(function (pair) {
        var coef = pair[0], sym = pair[1];
        if (coef === 0) { return; }
        var mag = Math.abs(coef);
        var magStr = mag === 1 ? '' : String(mag);
        terms.push({ neg: coef < 0, text: magStr + sym });
      });
      var lhs = '';
      if (!terms.length) {
        lhs = '0';
      } else {
        terms.forEach(function (t, i) {
          lhs += i === 0 ? (t.neg ? '-' : '') + t.text : (t.neg ? ' - ' : ' + ') + t.text;
        });
      }
      return { lhs: lhs, rhs: String(r[3]) };
    }

    function buildEquationsLatex(co) {
      var rows = [
        rowEquationParts([co.a1, co.b1, co.c1, co.d1]),
        rowEquationParts([co.a2, co.b2, co.c2, co.d2]),
        rowEquationParts([co.a3, co.b3, co.c3, co.d3])
      ];
      var body = rows.map(function (r) { return r.lhs + ' &= ' + r.rhs; }).join(' \\\\ ');
      return '\\[\\begin{aligned}' + body + '\\end{aligned}\\]';
    }

    function augmentedMatrixLatex(co) {
      var rows = [
        toIntRow([co.a1, co.b1, co.c1, co.d1]),
        toIntRow([co.a2, co.b2, co.c2, co.d2]),
        toIntRow([co.a3, co.b3, co.c3, co.d3])
      ].map(function (row) { return row.join(' & '); });
      return '\\[\\left[\\begin{array}{ccc|c}' + rows.join(' \\\\ ') + '\\end{array}\\right]\\]';
    }

    function matrixLatex(M) {
      var rows = M.map(function (row) { return row.map(fmtNum).join(' & '); });
      return '\\[\\left[\\begin{array}{ccc|c}' + rows.join(' \\\\ ') + '\\end{array}\\right]\\]';
    }

    function vecLatex(v) {
      return '\\begin{bmatrix}' + v.map(fmtNum).join('\\\\') + '\\end{bmatrix}';
    }

    // ── Row reduction ────────────────────────────────────────────────────
    function computeRREF(A) {
      var tol = 1e-9;
      var m = A.map(function (row) { return row.slice(); });
      var rows = m.length, cols = m[0].length;
      var pivotCols = [];
      var row = 0;
      for (var col = 0; col < cols - 1 && row < rows; col++) {
        var pivot = row, maxAbs = Math.abs(m[row][col]);
        for (var i = row + 1; i < rows; i++) {
          if (Math.abs(m[i][col]) > maxAbs) { maxAbs = Math.abs(m[i][col]); pivot = i; }
        }
        if (maxAbs < tol) { continue; }
        var tmp = m[row]; m[row] = m[pivot]; m[pivot] = tmp;
        var pv = m[row][col];
        for (var c = 0; c < cols; c++) { m[row][c] /= pv; }
        for (var r2 = 0; r2 < rows; r2++) {
          if (r2 === row) { continue; }
          var f = m[r2][col];
          if (Math.abs(f) > tol) {
            for (var c2 = 0; c2 < cols; c2++) { m[r2][c2] -= f * m[row][c2]; }
          }
        }
        pivotCols.push(col);
        row++;
      }
      return { m: m, pivotCols: pivotCols, rank: row };
    }

    function classifySolution(co) {
      var A = [
        [co.a1, co.b1, co.c1, co.d1],
        [co.a2, co.b2, co.c2, co.d2],
        [co.a3, co.b3, co.c3, co.d3]
      ];
      var red = computeRREF(A);
      var m = red.m, pivotCols = red.pivotCols, rank = red.rank;
      var tol = 1e-7;

      for (var r = 0; r < 3; r++) {
        if (Math.abs(m[r][0]) < tol && Math.abs(m[r][1]) < tol &&
            Math.abs(m[r][2]) < tol && Math.abs(m[r][3]) > tol) {
          return { type: 'none', rref: m };
        }
      }

      var freeCols = [0, 1, 2].filter(function (c) { return pivotCols.indexOf(c) === -1; });

      if (rank === 3) {
        return { type: 'point', point: [m[0][3], m[1][3], m[2][3]], rref: m };
      }

      if (rank === 2) {
        var free = freeCols[0];
        var point2 = [0, 0, 0], dir = [0, 0, 0];
        dir[free] = 1;
        pivotCols.forEach(function (pc, i2) {
          point2[pc] = m[i2][3];
          dir[pc] = -m[i2][free];
        });
        return { type: 'line', point: point2, dir: dir, rref: m };
      }

      if (rank === 1) {
        var f1 = freeCols[0], f2 = freeCols[1];
        var point3 = [0, 0, 0], dir1 = [0, 0, 0], dir2 = [0, 0, 0];
        dir1[f1] = 1; dir2[f2] = 1;
        var pc0 = pivotCols[0];
        point3[pc0] = m[0][3];
        dir1[pc0] = -m[0][f1];
        dir2[pc0] = -m[0][f2];
        return { type: 'plane', point: point3, dir1: dir1, dir2: dir2, rref: m };
      }

      return { type: 'all', rref: m };
    }

    // ── MathJax (queued on the startup promise so it's safe before/after load) ──
    function typesetMath(node) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise([node]); })
          .catch(function (err) { console.error(err); });
      }
    }

    function renderSolution(result) {
      var el = document.getElementById('pl-solution');
      var html;
      if (result.type === 'none') {
        html = '<span class="pl-sol-tag pl-sol-none">No solution</span>' +
               '<p class="pl-sol-note">The three planes share no common point — the system is inconsistent.</p>';
      } else if (result.type === 'point') {
        html = '<span class="pl-sol-tag pl-sol-point">Unique solution</span>' +
               '\\[' + '\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix} = ' + vecLatex(result.point) + '\\]';
      } else if (result.type === 'line') {
        html = '<span class="pl-sol-tag pl-sol-line">Line of solutions</span>' +
               '\\[' + '\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix} = ' + vecLatex(result.point) +
               ' + t' + vecLatex(result.dir) + ',\\quad t \\in \\mathbb{R}' + '\\]';
      } else if (result.type === 'plane') {
        html = '<span class="pl-sol-tag pl-sol-line">Plane of solutions</span>' +
               '\\[' + '\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix} = ' + vecLatex(result.point) +
               ' + t' + vecLatex(result.dir1) + ' + s' + vecLatex(result.dir2) +
               ',\\quad t, s \\in \\mathbb{R}' + '\\]';
      } else {
        html = '<span class="pl-sol-tag pl-sol-line">All of space</span>' +
               '<p class="pl-sol-note">Every point in \\(\\mathbb{R}^3\\) satisfies all three (trivial) equations.</p>';
      }
      el.innerHTML = html;
    }

    function updateDisplay() {
      var result = classifySolution(coeffs);
      document.getElementById('pl-equations').innerHTML = buildEquationsLatex(coeffs);
      document.getElementById('pl-augmented').innerHTML = augmentedMatrixLatex(coeffs);
      document.getElementById('pl-rref').innerHTML = matrixLatex(result.rref);
      renderSolution(result);
      // The graph's intersection-point marker (1/D · (D1,D2,D3)) has no
      // built-in gate: when D→0 (line/no-solution/plane cases) it can blow
      // up to some huge-but-finite point instead of cleanly disappearing, so
      // it has to be shown/hidden explicitly based on the actual solution type.
      calc.setExpression({ id: ID.solutionPoint, hidden: result.type !== 'point' });
      typesetMath(document.getElementById('pl-linsys'));
      return result;
    }

    // ── Recenter the planes' bounding regions and the viewport on a point ──
    // The viewport's half-width is kept FIXED (not scaled with R): the
    // circular/square toggle only works because R=25's ball edge is pushed
    // outside a fixed-size viewport, so scaling the viewport with R would
    // just re-reveal that round edge and defeat the "square" look.
    var VIEW_HALF_WIDTH = 8.55;

    function applyViewport() {
      var state = calc.getState();
      var bounds = {
        xmin: currentCenter[0] - VIEW_HALF_WIDTH, xmax: currentCenter[0] + VIEW_HALF_WIDTH,
        ymin: currentCenter[1] - VIEW_HALF_WIDTH, ymax: currentCenter[1] + VIEW_HALF_WIDTH,
        zmin: currentCenter[2] - VIEW_HALF_WIDTH, zmax: currentCenter[2] + VIEW_HALF_WIDTH
      };
      Object.assign(state.graph.viewport, bounds);
      // Exported 3D states also carry a "__v12ViewportLatexStash" — the same
      // six bounds duplicated as LaTeX-parseable strings for schema-version
      // migration. If Desmos re-derives the live viewport from that stash on
      // load/setState, editing only the numeric viewport fields above is a
      // no-op — so keep both copies in sync.
      if (state.graph.__v12ViewportLatexStash) {
        Object.keys(bounds).forEach(function (k) {
          state.graph.__v12ViewportLatexStash[k] = String(bounds[k]);
        });
      }
      calc.setState(state, { allowUndo: false });
    }

    function setCenter(point) {
      currentCenter = point;
      calc.setExpression({ id: ID.x0, latex: 'x_{0}=' + point[0] });
      calc.setExpression({ id: ID.y0, latex: 'y_{0}=' + point[1] });
      calc.setExpression({ id: ID.z0, latex: 'z_{0}=' + point[2] });
      applyViewport();
    }

    // ── Command generators (mirror the graph's F_ixedSolution / R_andom /
    //    N_oSolution / R_andomLine+R_andomLineSet actions) ──────────────────
    function applyFixedSolution() {
      coeffs = { a1: 1, b1: 2, c1: 4, d1: 7, a2: 2, b2: -1, c2: 1, d2: 2, a3: 1, b3: 2, c3: 2, d3: 5 };
      pushCoeffsToDesmos();
      var result = updateDisplay();
      setCenter(result.type === 'point' ? result.point : [0, 0, 0]);
    }

    function applyRandomUnique() {
      function r() { return Math.random() - 0.5; }
      coeffs = {
        a1: r(), b1: r(), c1: r(), d1: r(),
        a2: r(), b2: r(), c2: r(), d2: r(),
        a3: r(), b3: r(), c3: r(), d3: r()
      };
      pushCoeffsToDesmos();
      var result = updateDisplay();
      setCenter(result.type === 'point' ? result.point : [0, 0, 0]);
    }

    // A random point + random unit direction, then 3 random planes whose
    // normals are constrained to be orthogonal to that direction (so the
    // direction is forced into the null space of the coefficient matrix)
    // and which all pass through the point (so the system stays consistent).
    // This is what actually randomizes the LINE itself, not just which three
    // planes happen to cross it — the graph's own R_andomLine/R_andomLineSet
    // actions fix c_i = a_i+b_i, d_i = 2(a_i+b_i), which pins every normal to
    // the same span{(1,0,1),(0,1,1)} and every plane through the same point
    // (0,0,2) — so that pair always reproduces the identical line.
    function randomUnitVector3() {
      var v, norm;
      do {
        v = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
        norm = Math.hypot(v[0], v[1], v[2]);
      } while (norm < 1e-6);
      return [v[0] / norm, v[1] / norm, v[2] / norm];
    }

    function orthonormalBasisPerp(d) {
      var ref = Math.abs(d[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
      var dot = ref[0] * d[0] + ref[1] * d[1] + ref[2] * d[2];
      var u = [ref[0] - dot * d[0], ref[1] - dot * d[1], ref[2] - dot * d[2]];
      var un = Math.hypot(u[0], u[1], u[2]);
      u = [u[0] / un, u[1] / un, u[2] / un];
      var v = [
        d[1] * u[2] - d[2] * u[1],
        d[2] * u[0] - d[0] * u[2],
        d[0] * u[1] - d[1] * u[0]
      ];
      return [u, v];
    }

    function applyRandomLine() {
      function r() { return Math.random() - 0.5; }
      var p = [r() * 3, r() * 3, r() * 3];
      var dir = randomUnitVector3();
      var basis = orthonormalBasisPerp(dir);
      var u = basis[0], v = basis[1];

      var planes = [];
      for (var i = 0; i < 3; i++) {
        var s1 = r() * 2, s2 = r() * 2;
        var n = [
          s1 * u[0] + s2 * v[0],
          s1 * u[1] + s2 * v[1],
          s1 * u[2] + s2 * v[2]
        ];
        var d = n[0] * p[0] + n[1] * p[1] + n[2] * p[2];
        planes.push({ a: n[0], b: n[1], c: n[2], d: d });
      }

      coeffs = {
        a1: planes[0].a, b1: planes[0].b, c1: planes[0].c, d1: planes[0].d,
        a2: planes[1].a, b2: planes[1].b, c2: planes[1].c, d2: planes[1].d,
        a3: planes[2].a, b3: planes[2].b, c3: planes[2].c, d3: planes[2].d
      };
      pushCoeffsToDesmos();
      // p lies exactly on the generated line, so centering there keeps the
      // whole line visually anchored in view rather than off to one side.
      setCenter(p);
      updateDisplay();
    }

    function applyNoSolution() {
      coeffs = { a1: 0, b1: 0, c1: 1, d1: 2, a2: 1, b2: 1, c2: 1, d2: 1, a3: 1, b3: 1, c3: -1, d3: 1 };
      pushCoeffsToDesmos();
      setCenter([0, 0, 0]);
      updateDisplay();
    }

    document.getElementById('pl-reset-btn').addEventListener('click', applyFixedSolution);
    document.getElementById('pl-random-btn').addEventListener('click', applyRandomUnique);
    document.getElementById('pl-random-line-btn').addEventListener('click', applyRandomLine);
    document.getElementById('pl-no-solution-btn').addEventListener('click', applyNoSolution);

    // ── Circular / square plane bound toggle ────────────────────────────────
    var isSquare = false;
    document.getElementById('pl-shape-btn').addEventListener('click', function () {
      isSquare = !isSquare;
      var newR = isSquare ? 25 : 5;
      calc.setExpression({
        id: ID.R,
        latex: 'R=' + newR,
        slider: { hardMin: true, hardMax: true, min: '2', max: '25' }
      });
      this.textContent = 'Shape: ' + (isSquare ? 'Square' : 'Circular');
    });

    // ── Initial state: circular bound, fixed (unique-solution) system ──────
    calc.setExpression({ id: ID.R, latex: 'R=5', slider: { hardMin: true, hardMax: true, min: '2', max: '25' } });
    applyFixedSolution();
  };
</script>

<!--writeup-->
