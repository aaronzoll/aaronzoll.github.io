---
layout: desmos-graph
title: "Visualizing Gaussian Elimination"
desmos_json: "geometric_gauss.json"
graph_3d: true
side_controls: true
---

<div class="gg-panel">

  <span class="gg-label">Steps to RREF</span>
  <ol class="gg-steps" id="gg-steps"></ol>

  <hr class="desmos-divider">

  <span class="gg-label">Row Reduction</span>
  <div class="gg-stepline">
    <button class="site-btn gg-arrow" id="gg-prev-btn" title="Previous step">&#9664;</button>
    <span class="gg-stepnum" id="gg-stepnum">Step 0 of 8</span>
    <button class="site-btn gg-arrow" id="gg-next-btn" title="Next step">&#9654;</button>
  </div>
  <button class="site-btn" id="gg-start-btn">Back to start</button>
  <button class="site-btn" id="gg-rref-btn">Skip to RREF</button>

  <hr class="desmos-divider">

  <span class="gg-label">System</span>
  <button class="site-btn" id="gg-example-btn">Original example</button>
  <button class="site-btn" id="gg-random-btn">New random system</button>

  <hr class="desmos-divider">

  <span class="gg-label">Plane Shape</span>
  <button class="site-btn" id="gg-shape-btn">Shape: Circular</button>

</div>

<style>
  .gg-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .gg-panel .site-btn {
    width: 100%;
  }

  .gg-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .gg-stepline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .gg-panel .gg-arrow {
    width: auto;
    flex: none;
    min-width: 0;
    padding: 0.45rem 0.9rem;
  }

  .gg-stepnum {
    flex: 1;
    text-align: center;
    font-size: 0.92rem;
    color: #4a5568;
    white-space: nowrap;
  }

  /* The step list rides alongside the graph so it can be read while stepping,
     which needs a little more room than the layout's default panel width. */
  .desmos-side-panel { width: 340px; }

  /* Fixed height, not auto: a random reduction is 3 bundled steps and the
     worked example is 8 single ones, so letting the list size itself would
     shift every control below it each time the system changes — and move the
     "New random system" button out from under the cursor mid-click. Anything
     taller than the reserved space scrolls inside the list instead. */
  .gg-steps {
    margin: 0.15rem 0 0;
    padding-left: 1.4rem;
    font-size: 0.88rem;
    height: 18rem;
    overflow-y: auto;
  }

  .gg-steps li {
    padding: 0.2rem 0;
    color: #98a6b3;
    cursor: pointer;
  }

  .gg-steps li:hover { color: #2d70b3; }
  .gg-steps li.gg-done { color: #444; }

  .gg-steps li.gg-cur {
    color: #2d70b3;
    font-weight: 600;
  }

  /* One elementary operation per line: a single pivot step in the generic
     track bundles a swap, a scaling and two eliminations. */
  .gg-op { display: block; }

  @media (max-width: 700px) {
    .desmos-side-panel { width: 100%; }
  }
</style>

<!--below-graph-->

<div class="gg-linsys" id="gg-linsys">

  <div class="gg-block">
    <span class="gg-block-label">System of Equations <span class="gg-at" id="gg-at-sys"></span></span>
    <div class="gg-eq" id="gg-equations"></div>
  </div>

  <div class="gg-block">
    <span class="gg-block-label">Augmented Matrix <span class="gg-at" id="gg-at-mtx"></span></span>
    <div class="gg-eq" id="gg-augmented"></div>
  </div>

  <!-- Hidden until the reduction reaches RREF — the whole point is that the
       solution is only readable once each plane is perpendicular to an axis. -->
  <div class="gg-block gg-block--solution" id="gg-solution-block" hidden>
    <span class="gg-block-label">Solution</span>
    <div class="gg-eq" id="gg-solution"></div>
  </div>

</div>

<style>
  .gg-linsys {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem 2rem;
    margin-top: 0.75rem;
    padding: 1rem 1.25rem;
    background: #fdf6ee;
    border: 1px solid #a67b5b;
    border-radius: 6px;
  }

  .gg-block-label {
    display: block;
    font-weight: bold;
    font-size: 0.78rem;
    color: #6b7c8a;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.35rem;
  }

  /* "after step 3" tag riding along with the block label, so it is always
     clear which frame of the reduction the equations/matrix belong to */
  .gg-at {
    font-weight: normal;
    text-transform: none;
    letter-spacing: 0;
    color: #8a9aa8;
  }

  .gg-eq {
    font-size: 1rem;
    overflow-x: auto;
  }

  .gg-block--solution {
    grid-column: 1 / -1;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(166, 123, 91, 0.4);
  }

  .gg-sol-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.15rem 0.55rem;
    border-radius: 3px;
    margin-bottom: 0.5rem;
    background: rgba(45, 112, 179, 0.12);
    color: #2d70b3;
  }

  .gg-sol-note {
    margin: 0.3rem 0 0;
    font-size: 0.85rem;
    color: #555;
  }

  @media (max-width: 700px) {
    .gg-linsys { grid-template-columns: 1fr; }
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from geometric_gauss.json ──────────────────────────
    // Two parallel tracks live in the graph: the hand-worked "RREF Example"
    // (A_0 … A_8, stepped by i) and the "Auto RREF" pivot algorithm applied
    // to a generic matrix (B_0 … B_3, stepped by j). Only one track's planes
    // and solution point are shown at a time.
    var ID = {
      i: '166', j: '188',
      A0: '147', B0: '186',
      planesA: ['165', '170', '171'], pointA: '167',
      planesB: ['185', '189', '190'], pointB: '191',
      cx: '196', cy: '197', cz: '198', M: '199', rad: '168'
    };

    // ── exact rationals ──────────────────────────────────────────────────
    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
    function F(n, d) {
      if (d === undefined) { d = 1; }
      if (d === 0) { return { n: 0, d: 1 }; }
      if (d < 0) { n = -n; d = -d; }
      var g = gcd(n, d);
      return { n: n / g, d: d / g };
    }
    function fAdd(x, y) { return F(x.n * y.d + y.n * x.d, x.d * y.d); }
    function fMul(x, y) { return F(x.n * y.n, x.d * y.d); }
    function fDiv(x, y) { return F(x.n * y.d, x.d * y.n); }
    function fNeg(x) { return F(-x.n, x.d); }
    function fIsZero(x) { return x.n === 0; }
    function fAbsCmp(x, y) { return Math.abs(x.n / x.d) - Math.abs(y.n / y.d); }

    // LaTeX for a rational, sign pulled outside the fraction bar
    function tex(x) {
      if (x.d === 1) { return String(x.n); }
      var body = '\\frac{' + Math.abs(x.n) + '}{' + x.d + '}';
      return x.n < 0 ? '-' + body : body;
    }
    // Same, but as a coefficient: 1 and -1 collapse to nothing / a bare sign
    function texCoef(x) {
      if (x.d === 1 && Math.abs(x.n) === 1) { return x.n < 0 ? '-' : ''; }
      return tex(x);
    }

    function cloneMat(M) { return M.map(function (row) { return row.slice(); }); }

    // ── the two step sequences ───────────────────────────────────────────
    // Elementary operations, matching the graph's T / S / R helpers:
    //   swap  R_i <-> R_j        scale R_i -> m R_i        add R_i -> R_i + m R_j
    function applyOp(M, op) {
      var N = cloneMat(M), a = op.i - 1;
      if (op.kind === 'swap') {
        var b = op.j - 1, t = N[a]; N[a] = N[b]; N[b] = t;
      } else if (op.kind === 'scale') {
        N[a] = N[a].map(function (v) { return fMul(v, op.m); });
      } else {
        var c = op.j - 1;
        N[a] = N[a].map(function (v, k) { return fAdd(v, fMul(op.m, N[c][k])); });
      }
      return N;
    }

    function opLatex(op) {
      var R = function (k) { return 'R_{' + k + '}'; };
      if (op.kind === 'swap') { return R(op.i) + ' \\leftrightarrow ' + R(op.j); }
      if (op.kind === 'scale') { return R(op.i) + ' \\to ' + texCoef(op.m) + R(op.i); }
      var m = op.m, sign = m.n < 0 ? ' - ' : ' + ';
      return R(op.i) + ' \\to ' + R(op.i) + sign + texCoef(m.n < 0 ? fNeg(m) : m) + R(op.j);
    }

    // The worked example: the same eight operations the graph performs to get
    // from A_0 to A_8, so the labels and the plotted planes stay in lockstep.
    var EXAMPLE_A0 = [[3, 5, -5, 1], [1, 2, -1, 1], [0, 2, 1, -2]];
    var EXAMPLE_OPS = [
      { kind: 'swap',  i: 1, j: 2 },
      { kind: 'add',   i: 2, j: 1, m: F(-3) },
      { kind: 'scale', i: 2, m: F(-1) },
      { kind: 'add',   i: 3, j: 2, m: F(-2) },
      { kind: 'scale', i: 3, m: F(-1, 3) },
      { kind: 'add',   i: 2, j: 3, m: F(-2) },
      { kind: 'add',   i: 1, j: 3, m: F(1) },
      { kind: 'add',   i: 1, j: 2, m: F(-2) }
    ];

    function buildExample() {
      var frames = [EXAMPLE_A0.map(function (r) { return r.map(function (v) { return F(v); }); })];
      var labels = [];
      EXAMPLE_OPS.forEach(function (op) {
        frames.push(applyOp(frames[frames.length - 1], op));
        labels.push([opLatex(op)]);
      });
      return { frames: frames, labels: labels };
    }

    // The generic track: one S_tep(A,k) per column — partial pivot (largest
    // magnitude in the column, lowest row index on a tie), scale that row to a
    // leading 1, then clear column k both above and below. One graph step
    // bundles all three, so one list entry does too.
    function buildGeneric(A0) {
      var frames = [A0.map(function (r) { return r.map(function (v) { return F(v); }); })];
      var labels = [];
      var M = frames[0];
      for (var k = 1; k <= 3; k++) {
        var parts = [];
        var p = k;
        for (var r = k + 1; r <= 3; r++) {
          if (fAbsCmp(M[r - 1][k - 1], M[p - 1][k - 1]) > 0) { p = r; }
        }
        if (p !== k) {
          M = applyOp(M, { kind: 'swap', i: k, j: p });
          parts.push(opLatex({ kind: 'swap', i: k, j: p }));
        }
        var pivot = M[k - 1][k - 1];
        if (fIsZero(pivot)) { return null; }
        var c = fDiv(F(1), pivot);
        if (!(c.n === 1 && c.d === 1)) {
          M = applyOp(M, { kind: 'scale', i: k, m: c });
          parts.push(opLatex({ kind: 'scale', i: k, m: c }));
        }
        for (var r2 = 1; r2 <= 3; r2++) {
          if (r2 === k) { continue; }
          var f = M[r2 - 1][k - 1];
          if (fIsZero(f)) { continue; }
          var op = { kind: 'add', i: r2, j: k, m: fNeg(f) };
          M = applyOp(M, op);
          parts.push(opLatex(op));
        }
        frames.push(M);
        labels.push(parts);
      }
      return { frames: frames, labels: labels };
    }

    // ── random system with a unique integer solution ─────────────────────
    function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

    function randomSystem() {
      for (var attempt = 0; attempt < 500; attempt++) {
        var A = [];
        for (var r = 0; r < 3; r++) {
          A.push([randInt(-3, 3), randInt(-3, 3), randInt(-3, 3)]);
        }
        var det = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
                - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
                + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
        // |det| >= 2 keeps the three planes comfortably away from being
        // near-parallel, which otherwise makes the picture unreadable
        if (Math.abs(det) < 2) { continue; }
        var x = [randInt(-3, 3), randInt(-3, 3), randInt(-3, 3)];
        return A.map(function (row) {
          return row.concat([row[0] * x[0] + row[1] * x[1] + row[2] * x[2]]);
        });
      }
      return [[1, 2, 3, 4], [2, -1, 4, 3], [5, 2, 1, -2]];
    }

    // ── rendering ────────────────────────────────────────────────────────
    function equationsLatex(M) {
      var lines = M.map(function (row) {
        var terms = [], syms = ['x', 'y', 'z'];
        row.slice(0, 3).forEach(function (v, k) {
          if (fIsZero(v)) { return; }
          terms.push({ neg: v.n < 0, text: texCoef(v.n < 0 ? fNeg(v) : v) + syms[k] });
        });
        var lhs = '';
        if (!terms.length) {
          lhs = '0';
        } else {
          terms.forEach(function (t, k) {
            lhs += k === 0 ? (t.neg ? '-' : '') + t.text : (t.neg ? ' - ' : ' + ') + t.text;
          });
        }
        return lhs + ' &= ' + tex(row[3]);
      });
      return '\\[\\begin{aligned}' + lines.join(' \\\\ ') + '\\end{aligned}\\]';
    }

    function matrixLatex(M) {
      var rows = M.map(function (row) {
        return row.map(tex).join(' & ');
      });
      return '\\[\\left[\\begin{array}{ccc|c}' + rows.join(' \\\\ ') + '\\end{array}\\right]\\]';
    }

    function vecLatex(v) {
      return '\\begin{bmatrix}' + v.map(tex).join('\\\\') + '\\end{bmatrix}';
    }

    // MathJax is queued on its startup promise so this is safe whether or not
    // the library has finished loading when a step is first rendered.
    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // ── state ────────────────────────────────────────────────────────────
    var mode = 'example';   // 'example' | 'generic'
    var track = null;       // { frames, labels } for the active mode
    var step = 0;

    function stepVarId() { return mode === 'example' ? ID.i : ID.j; }

    function pushStep() {
      calc.setExpression({
        id: stepVarId(),
        latex: (mode === 'example' ? 'i' : 'j') + '=' + step,
        slider: {
          hardMin: true, hardMax: true, step: '1',
          min: '0', max: String(track.frames.length - 1)
        }
      });
    }

    function renderSteps() {
      var ol = document.getElementById('gg-steps');
      ol.innerHTML = track.labels.map(function (parts, k) {
        var cls = k + 1 < step ? 'gg-done' : (k + 1 === step ? 'gg-cur' : '');
        var body = parts.map(function (p) {
          return '<span class="gg-op">\\(' + p + '\\)</span>';
        }).join('');
        return '<li class="' + cls + '" data-step="' + (k + 1) + '">' + body + '</li>';
      }).join('');
    }

    function render() {
      var M = track.frames[step];
      var last = track.frames.length - 1;
      var at = step === 0 ? '(start)' : (step === last ? '(RREF)' : '(after step ' + step + ')');

      document.getElementById('gg-at-sys').textContent = at;
      document.getElementById('gg-at-mtx').textContent = at;
      document.getElementById('gg-equations').innerHTML = equationsLatex(M);
      document.getElementById('gg-augmented').innerHTML = matrixLatex(M);
      renderSteps();

      var atRREF = step === last;
      document.getElementById('gg-solution-block').hidden = !atRREF;
      if (atRREF) {
        var sol = track.frames[last].map(function (row) { return row[3]; });
        document.getElementById('gg-solution').innerHTML =
          '<span class="gg-sol-tag">Unique solution</span>' +
          '\\[\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix} = ' + vecLatex(sol) + '\\]' +
          '<p class="gg-sol-note">Every row operation preservewd this solution,' +
          'and each row operation can be viewed as either swapping planes, doing nothing (i.e scaling the whole equation),' +
          'or titling planes. Once we title all the planes to be parallel to each axis' +
          'our solution is trivial to deduce and the matrix is in RREF.</p>';
      }

      document.getElementById('gg-stepnum').textContent = 'Step ' + step + ' of ' + last;
      document.getElementById('gg-prev-btn').disabled = step === 0;
      document.getElementById('gg-next-btn').disabled = step === last;
      document.getElementById('gg-start-btn').disabled = step === 0;
      document.getElementById('gg-rref-btn').disabled = step === last;

      // The step list lives in the side panel, outside #gg-linsys, so both
      // regions have to be handed to MathJax.
      typesetMath([
        document.getElementById('gg-linsys'),
        document.getElementById('gg-steps')
      ]);
      pushStep();
    }

    function setStep(k) {
      var last = track.frames.length - 1;
      step = Math.max(0, Math.min(last, k));
      render();
    }

    // ── mode switching ───────────────────────────────────────────────────
    // Only one track's planes and solution point belong on screen at a time.
    function showTrack() {
      var example = mode === 'example';
      ID.planesA.concat([ID.pointA]).forEach(function (id) {
        calc.setExpression({ id: id, hidden: !example });
      });
      ID.planesB.concat([ID.pointB]).forEach(function (id) {
        calc.setExpression({ id: id, hidden: example });
      });
      document.getElementById('gg-example-btn').classList.toggle('site-btn--active', example);
      document.getElementById('gg-random-btn').classList.toggle('site-btn--active', !example);
    }

    // Half-width of the viewport box around the solution — the graph's M.
    var VIEW_HALF = 5;

    function solutionPoint() {
      return track.frames[track.frames.length - 1].map(function (row) {
        return row[3].n / row[3].d;
      });
    }

    // Writing the bounds onto the state directly, rather than trusting the
    // symbolic ones below to be re-evaluated. Zooming the browser resizes the
    // calculator, and Desmos recomputes the viewport when that happens —
    // replacing the LaTeX bounds with plain numbers. After that the c_x/c_y/c_z
    // assignments no longer move anything, which is why recentring silently
    // stopped working once the page had been zoomed.
    function applyViewport(c) {
      var state = calc.getState();
      var bounds = {
        xmin: c[0] - VIEW_HALF, xmax: c[0] + VIEW_HALF,
        ymin: c[1] - VIEW_HALF, ymax: c[1] + VIEW_HALF,
        zmin: c[2] - VIEW_HALF, zmax: c[2] + VIEW_HALF
      };
      Object.assign(state.graph.viewport, bounds);
      // 3D states carry the same six bounds a second time as LaTeX-parseable
      // strings. Whichever copy Desmos reads on setState, both now agree.
      if (state.graph.__v12ViewportLatexStash) {
        Object.keys(bounds).forEach(function (k) {
          state.graph.__v12ViewportLatexStash[k] = String(bounds[k]);
        });
      }
      calc.setState(state, { allowUndo: false });
    }

    // This is the E_xample / G_enSol pair from the graph's "Axes" folder: the
    // centre variables point at whichever solution vector is live, so the graph
    // stays self-consistent if it is ever opened in Desmos itself. The viewport
    // is then set explicitly rather than left to follow from them.
    function centerOnSolution() {
      var sol = mode === 'example' ? 'S_{ol}' : 'S_{olGen}';
      calc.setExpression({ id: ID.cx, latex: 'c_{x}=' + sol + '\\left[1\\right]' });
      calc.setExpression({ id: ID.cy, latex: 'c_{y}=' + sol + '\\left[2\\right]' });
      calc.setExpression({ id: ID.cz, latex: 'c_{z}=' + sol + '\\left[3\\right]' });
      calc.setExpression({ id: ID.M, latex: 'M=' + VIEW_HALF });
      applyViewport(solutionPoint());
    }

    function flatten(M) {
      var flat = [];
      M.forEach(function (row) { row.forEach(function (v) { flat.push(v); }); });
      // The graph's matrix library stores a flat list with the dimensions
      // appended, so a 3x4 augmented matrix is 12 entries followed by 3, 4.
      return flat.concat([3, 4]);
    }

    function loadExample() {
      mode = 'example';
      track = buildExample();
      calc.setExpression({ id: ID.A0, latex: 'A_{0}=\\left[' + flatten(EXAMPLE_A0).join(',') + '\\right]' });
      showTrack();
      centerOnSolution();
      setStep(0);
    }

    function loadRandom() {
      var A0 = randomSystem();
      var built = buildGeneric(A0);
      if (!built) { return loadRandom(); }
      mode = 'generic';
      track = built;
      calc.setExpression({ id: ID.B0, latex: 'B_{0}=\\left[' + flatten(A0).join(',') + '\\right]' });
      showTrack();
      centerOnSolution();
      setStep(0);
    }

    // ── circular / square plane bound ────────────────────────────────────
    // Same mechanic as the Planes in 3D graph: the planes are clipped to a
    // ball of radius r_ad centred on the solution, and the viewport is a fixed
    // ±M box around that same point. Pull r_ad inside the box and its round
    // edge shows; push it well outside and the box does the clipping instead,
    // leaving square plates.
    var isSquare = false;

    function applyShape() {
      calc.setExpression({
        id: ID.rad,
        latex: 'r_{ad}=' + (isSquare ? 15 : 5),
        slider: { hardMin: true, hardMax: true, min: '0', max: '15' }
      });
      document.getElementById('gg-shape-btn').textContent =
        'Shape: ' + (isSquare ? 'Square' : 'Circular');
    }

    // ── wiring ───────────────────────────────────────────────────────────
    document.getElementById('gg-shape-btn').addEventListener('click', function () {
      isSquare = !isSquare;
      applyShape();
    });

    document.getElementById('gg-example-btn').addEventListener('click', loadExample);
    document.getElementById('gg-random-btn').addEventListener('click', loadRandom);
    document.getElementById('gg-prev-btn').addEventListener('click', function () { setStep(step - 1); });
    document.getElementById('gg-next-btn').addEventListener('click', function () { setStep(step + 1); });
    document.getElementById('gg-start-btn').addEventListener('click', function () { setStep(0); });
    document.getElementById('gg-rref-btn').addEventListener('click', function () { setStep(track.frames.length - 1); });

    document.getElementById('gg-steps').addEventListener('click', function (e) {
      var li = e.target.closest('li[data-step]');
      if (li) { setStep(+li.getAttribute('data-step')); }
    });

    applyShape();
    loadExample();
  };
</script>

<!--writeup-->

Each equation in a \\(3 \times 3\\) linear system is a plane in \\(\mathbb{R}^3\\), and a solution
of the system is a point lying on all three planes simultaneously. Row reducing the augmented matrix replaces
the system with a new one, but each row operation preserves the solution, with perhaps "simple planes." Geometrically, this is viewed as rotation the planes (or swapping two of them) around the common point. When there is a unique solution, we can get all three planes orthogonal (and hence, each one parallel to a single axis). This is precisely a RREF with the main diagonal all ones, which let's us "read off" the solution. 

