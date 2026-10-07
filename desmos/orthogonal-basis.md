---
layout: desmos-graph
title: "Orthogonal Bases and Projections"
desmos_json: "orthogonal_basis.json"
side_controls: true
---

<div class="ob-panel" id="ob-panel">

  <span class="ob-label">Display</span>
  <div class="ob-grid2">
    <button class="site-btn site-btn--active ob-toggle" aria-pressed="true" data-folder="135">Standard grid</button>
    <button class="site-btn ob-toggle" aria-pressed="false" data-folder="110">\(\beta\)-grid</button>
    <button class="site-btn site-btn--active ob-toggle" aria-pressed="true" data-folder="300">Projections</button>
    <button class="site-btn site-btn--active ob-toggle" aria-pressed="true" data-folder="340">Sum</button>
  </div>

  <hr class="desmos-divider">

  <span class="ob-label">Basis \(\beta\)</span>
  <button class="site-btn ob-wide" id="ob-new-orth">New orthogonal basis</button>
  <button class="site-btn ob-wide" id="ob-new-skew">New non-orthogonal basis</button>
  <button class="site-btn ob-wide" id="ob-reset-btn">Reset</button>

  <hr class="desmos-divider">

  <span class="ob-label">Vector \(\mathbf{x}\)</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(x_1\) = <strong id="ob-x1-val">2</strong></span>
    <input class="site-slider" id="ob-x1" type="range" min="-6" max="6" step="0.1" value="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(x_2\) = <strong id="ob-x2-val">4</strong></span>
    <input class="site-slider" id="ob-x2" type="range" min="-6" max="6" step="0.1" value="4">
  </div>

</div>

<style>
  .ob-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ob-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Keep math in the uppercase headings as typed (else \beta prints as B). */
  .ob-label mjx-container {
    text-transform: none;
  }

  /* Two buttons per row; the site-btn defaults are sized for a lone button. */
  .ob-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }

  .ob-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .ob-wide {
    width: 100%;
  }

  /* Live calculation under the graph: the two projections share a row
     (wrapping when narrow), then their sum, then the true coordinates. */
  .ob-calc {
    margin-top: 0.75rem;
    text-align: center;
  }

  .ob-calc .ob-label {
    display: block;
    text-align: left;
  }

  .ob-calc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 1.25em;
    font-size: 0.92em;
  }

  /* Don't let flex squeeze a piece below its natural width; wrap instead.
     The padding gives the closing bracket room, which otherwise overhangs
     by a pixel and triggers a needless scrollbar. */
  .ob-calc-row .ob-calc-math {
    flex: 0 0 auto;
    padding: 0 0.2em;
  }

  .ob-calc-row .ob-calc-math mjx-container[display="true"] {
    margin: 0.6em 0;
  }

  /* Hairline between the projections and the coefficient/coordinate comparison. */
  .ob-calc-divider {
    width: 60%;
    margin: 0.5rem auto;
  }

  .ob-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from orthogonal_basis.json ────────────────────────
    // v_1 = (A_11, A_21) [red], v_2 = (A_12, A_22) [blue], x = (X_1, X_2) [orange].
    var ID = { A11: '126', A12: '127', A21: '129', A22: '130', X1: '211', X2: '212' };
    var DEFAULT = { A11: 2, A12: -1.5, A21: 1, A22: 3, X1: 2, X2: 4 };   // orthogonal; [x]_β = (1.6, 0.8)

    var vals = { A11: NaN, A12: NaN, A21: NaN, A22: NaN, X1: NaN, X2: NaN };
    var EPS = 1e-3;     // below this |det| the columns are treated as parallel
    var ORTH = 5e-3;    // entries are tenths, so v_1·v_2 lives in hundredths
    var BOUND = 6;      // the drawn frame is [-6, 6]^2

    // Short numbers for display, no trailing zeros: tenths by default.
    function fmt(x, places) {
      places = places || 1;
      var k = Math.pow(10, places);
      var s = (Math.round(x * k) / k).toFixed(places).replace(/\.?0+$/, '');
      return s === '-0' ? '0' : s;
    }
    function num(x) { return parseFloat(x.toFixed(4)); }

    function set(name, value) {
      calc.setExpression({ id: ID[name], latex: name.charAt(0) + '_{' + name.slice(1) + '}=' + num(value) });
    }

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // Matrix from columns. In any column holding a negative entry, the other
    // entries get a \phantom{-} so the digits line up.
    function bmatrix(cols, places) {
      var padded = cols.map(function (col) {
        var strs = col.map(function (x) { return fmt(x, places); });
        var neg = strs.some(function (s) { return s.charAt(0) === '-'; });
        return strs.map(function (s) { return neg && s.charAt(0) !== '-' ? '\\phantom{-}' + s : s; });
      });
      var rows = padded[0].map(function (_, i) {
        return padded.map(function (col) { return col[i]; }).join(' & ');
      });
      return '\\begin{bmatrix} ' + rows.join(' \\\\ ') + ' \\end{bmatrix}';
    }

    function dot(u, v) { return u[0] * v[0] + u[1] * v[1]; }
    function scale(a, v) { return [a * v[0], a * v[1]]; }
    function add(u, v) { return [u[0] + v[0], u[1] + v[1]]; }
    function norm(v) { return Math.sqrt(dot(v, v)); }

    function current() {
      return {
        v1: [vals.A11, vals.A21],
        v2: [vals.A12, vals.A22],
        x:  [vals.X1, vals.X2]
      };
    }

    function syncSlider(key, value) {
      document.getElementById('ob-' + key).value = value;
      document.getElementById('ob-' + key + '-val').textContent = fmt(value);
    }

    // One projection: P_v x = (vᵀx / ‖v‖²) v = w.
    function projTeX(i, v, x) {
      var w = scale(dot(v, x) / dot(v, v), v);
      var name = '\\mathbf{v}_' + i;
      return '\\[P_{' + name + '}\\mathbf{x} = \\frac{' + name + '^{\\mathsf{T}}\\mathbf{x}}{\\|' + name + '\\|^2}\\,' + name +
             ' = ' + bmatrix([w], 2) + '\\]';
    }

    // ── live calculation ─────────────────────────────────────────────────
    var pending = false;
    function render() {
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        if (Object.keys(vals).some(function (k) { return isNaN(vals[k]); })) { return; }

        var s = current();
        syncSlider('x1', s.x[0]);
        syncSlider('x2', s.x[1]);

        var D = s.v1[0] * s.v2[1] - s.v2[0] * s.v1[1];
        var singular = Math.abs(D) < EPS;
        var d12 = dot(s.v1, s.v2);
        var orth = !singular && Math.abs(d12) < ORTH;

        var a = [dot(s.v1, s.x) / dot(s.v1, s.v1), dot(s.v2, s.x) / dot(s.v2, s.v2)];
        var w1 = scale(a[0], s.v1), w2 = scale(a[1], s.v2), sum = add(w1, w2);
        var hits = norm([sum[0] - s.x[0], sum[1] - s.x[1]]) < 0.01;
        var c = singular ? [NaN, NaN] : [(s.v2[1] * s.x[0] - s.v2[0] * s.x[1]) / D,
                                         (-s.v1[1] * s.x[0] + s.v1[0] * s.x[1]) / D];

        var el = {
          dot: document.getElementById('ob-calc-dot'),
          p1: document.getElementById('ob-calc-p1'),
          p2: document.getElementById('ob-calc-p2'),
          sum: document.getElementById('ob-calc-sum'),
          coeffs: document.getElementById('ob-calc-coeffs'),
          coords: document.getElementById('ob-calc-coords')
        };

        // Verdict colors match the site's note palette: green when orthogonal, red otherwise.
        el.dot.innerHTML = '\\[\\mathbf{v}_1^{\\mathsf{T}}\\mathbf{v}_2 = ' + fmt(d12, 2) +
                           (orth ? '' : ' \\neq 0') + '\\quad\\Longrightarrow\\quad ' +
                           (orth ? '{\\color{#3f7a4f}\\text{orthogonal}}' : '{\\color{#b7472a}\\text{not orthogonal}}') + '\\]';
        el.p1.innerHTML = projTeX(1, s.v1, s.x);
        el.p2.innerHTML = projTeX(2, s.v2, s.x);
        el.sum.innerHTML = '\\[P_{\\mathbf{v}_1}\\mathbf{x} + P_{\\mathbf{v}_2}\\mathbf{x} = ' + bmatrix([sum], 2) +
                           (hits ? ' = ' : ' \\neq ') + bmatrix([s.x]) + ' = \\mathbf{x}\\]';
        el.coeffs.innerHTML = '\\[\\text{projection coefficients: }\\begin{bmatrix} ' +
          '\\mathbf{v}_1^{\\mathsf{T}}\\mathbf{x} / \\|\\mathbf{v}_1\\|^2 \\\\ ' +
          '\\mathbf{v}_2^{\\mathsf{T}}\\mathbf{x} / \\|\\mathbf{v}_2\\|^2 \\end{bmatrix} = ' + bmatrix([a], 2) + '\\]';
        el.coords.innerHTML = singular ? '' :
          '\\[\\text{coordinates: }\\big[\\mathbf{x}\\big]_\\beta = M_\\beta^{-1}\\mathbf{x} = ' + bmatrix([c], 2) + '\\]';

        typesetMath([el.dot, el.p1, el.p2, el.sum, el.coeffs, el.coords]);
      });
    }

    Object.keys(vals).forEach(function (name) {
      var h = calc.HelperExpression({ latex: name.charAt(0) + '_{' + name.slice(1) + '}' });
      h.observe('numericValue', function () {
        vals[name] = h.numericValue;
        render();
      });
    });

    // ── sliders ──────────────────────────────────────────────────────────
    document.getElementById('ob-x1').addEventListener('input', function (e) { set('X1', parseFloat(e.target.value)); });
    document.getElementById('ob-x2').addEventListener('input', function (e) { set('X2', parseFloat(e.target.value)); });

    // ── random bases ─────────────────────────────────────────────────────
    // Entries are multiples of 0.5 and lengths stay in [1.5, 4.5], so the
    // vectors are tame and the arithmetic below the graph stays short.
    function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
    function randVec() {
      while (true) {
        var v = [randInt(-8, 8) / 2, randInt(-8, 8) / 2], n = norm(v);
        if (n >= 1.5 && n <= 4.5) { return v; }
      }
    }
    function tame(v) {
      var n = norm(v);
      return n >= 1.5 && n <= 4.5 && Math.abs(v[0]) <= 5 && Math.abs(v[1]) <= 5;
    }
    function angleDeg(u, v) { return Math.acos(dot(u, v) / (norm(u) * norm(v))) * 180 / Math.PI; }

    // Prefer bases whose projection picture stays inside the frame for the current x.
    function fits(v1, v2) {
      var x = current().x;
      var w1 = scale(dot(v1, x) / dot(v1, v1), v1), w2 = scale(dot(v2, x) / dot(v2, v2), v2), s = add(w1, w2);
      return [w1, w2, s].every(function (p) { return Math.abs(p[0]) <= BOUND && Math.abs(p[1]) <= BOUND; });
    }

    function same(v1, v2) {
      var s = current();
      return v1[0] === s.v1[0] && v1[1] === s.v1[1] && v2[0] === s.v2[0] && v2[1] === s.v2[1];
    }

    function pick(make) {
      var best = null;
      for (var tries = 0; tries < 2000; tries++) {
        var b = make();
        if (!b || same(b[0], b[1])) { continue; }
        best = b;
        if (fits(b[0], b[1])) { break; }
      }
      if (!best) { return; }
      set('A11', best[0][0]); set('A21', best[0][1]);
      set('A12', best[1][0]); set('A22', best[1][1]);
    }

    // v_2 = k·(−b, a) with k a multiple of 0.2: still on the tenths grid.
    function makeOrthogonal() {
      var v1 = randVec(), k = randInt(3, 10) * 0.2 * (Math.random() < 0.5 ? -1 : 1);
      var v2 = [num(-k * v1[1]), num(k * v1[0])];
      return tame(v2) ? [v1, v2] : null;
    }

    // Angle between 20° and 160°, and at least 15° away from a right angle.
    function makeSkew() {
      var v1 = randVec(), v2 = randVec(), t = angleDeg(v1, v2);
      return (t >= 20 && t <= 160 && Math.abs(t - 90) >= 15) ? [v1, v2] : null;
    }

    document.getElementById('ob-new-orth').addEventListener('click', function () { pick(makeOrthogonal); });
    document.getElementById('ob-new-skew').addEventListener('click', function () { pick(makeSkew); });

    // ── show / hide folders ──────────────────────────────────────────────
    document.querySelectorAll('.ob-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = !btn.classList.contains('site-btn--active');
        btn.classList.toggle('site-btn--active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: !on });
      });
    });

    document.getElementById('ob-reset-btn').addEventListener('click', function () {
      Object.keys(DEFAULT).forEach(function (k) { set(k, DEFAULT[k]); });
    });

    typesetMath([document.getElementById('ob-panel')]);
  };
</script>

<!--below-graph-->

<div class="ob-calc">
  <span class="ob-label">Computation</span>
  <div class="ob-calc-math" id="ob-calc-dot"></div>
  <div class="ob-calc-row">
    <div class="ob-calc-math" id="ob-calc-p1"></div>
    <div class="ob-calc-math" id="ob-calc-p2"></div>
  </div>
  <div class="ob-calc-math" id="ob-calc-sum"></div>
  <hr class="desmos-divider ob-calc-divider">
  <div class="ob-calc-row">
    <div class="ob-calc-math" id="ob-calc-coeffs"></div>
    <div class="ob-calc-math" id="ob-calc-coords"></div>
  </div>
</div>

<!--writeup-->

<div class="latex-body">
Finding the coordinates of a vector with respect to a basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ normally means solving a linear system or inverting the basis matrix $M_\beta$ (see the <a href="/desmos/change-of-basis">Change of Basis</a> page). However, when the basis vectors are pairwise orthogonal, there is a much quicker way: the coordinates are simply (orthognal) projections, which provide significant computational efficeincy. 


\subsection*{Orthogonal sets and bases}

Recall that $\mathbf{u}, \mathbf{v} \in \R^n$ are \textbf{orthogonal} if $\mathbf{u}^\mathsf{T}\mathbf{v} = 0$, and that the norm $\|\mathbf{u}\| = \sqrt{\mathbf{u}^\mathsf{T}\mathbf{u}}$.

\begin{definition}
A set $S = \{\mathbf{v}_1, \ldots, \mathbf{v}_p\} \subset \R^n$ is an \textbf{orthogonal set} if its vectors are pairwise orthogonal, $\mathbf{v}_i^\mathsf{T}\mathbf{v}_j = 0$ for $i \neq j$. It is an \textbf{orthonormal set} if, in addition, $\|\mathbf{v}_i\| = 1$ for all $i$. A basis of a subspace $W$ that is also an orthogonal (orthonormal) set is called an \textbf{orthogonal basis} (\textbf{orthonormal basis}) of $W$.
\end{definition}

Orthogonality is a stronger requirement than linear independence: if the vectors of $S$ are nonzero and pairwise orthogonal, then $S$ is linearly independent. (The proof uses the same trick as the theorem below.) So in $\R^2$, any two nonzero orthogonal vectors form an orthogonal basis (resp. in $\R^m$, any $m$ nonzero orthogonal vectors form one too).

\subsection*{Coordinates by projection}

Recall that the projection of $\mathbf{x}$ onto a nonzero vector $\mathbf{v}$ is
$$P_\mathbf{v}\mathbf{x} = \frac{\mathbf{v}^\mathsf{T}\mathbf{x}}{\|\mathbf{v}\|^2}\,\mathbf{v}.$$

\begin{theorem}
Let $\beta = \{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$ be an orthogonal basis of $W$ and $\mathbf{x} \in W$. Then the coordinates of $\mathbf{x}$ with respect to $\beta$ are
$$c_i = \frac{\mathbf{v}_i^\mathsf{T}\mathbf{x}}{\|\mathbf{v}_i\|^2}, \qquad i = 1, \ldots, p.$$
\end{theorem}

\begin{proof}
Write $\mathbf{x} = c_1\mathbf{v}_1 + \cdots + c_p\mathbf{v}_p$ and multiply on the left by $\mathbf{v}_1^\mathsf{T}$. By orthogonality every cross term $\mathbf{v}_1^\mathsf{T}\mathbf{v}_j$ with $j \neq 1$ vanishes, leaving
$$\mathbf{v}_1^\mathsf{T}\mathbf{x} = c_1\,\mathbf{v}_1^\mathsf{T}\mathbf{v}_1 = c_1\|\mathbf{v}_1\|^2.$$
Since $\mathbf{v}_1 \neq \mathbf{0}$ (it belongs to a basis, so it needs to be linearly independent with the rest of the vectors), we may divide by $\|\mathbf{v}_1\|^2$. The same argument holds with $\mathbf{v}_i^\mathsf{T}$, giving each $c_i$.
\end{proof}

Each term $c_i\mathbf{v}_i$ is exactly the projection of $\mathbf{x}$ onto $\mathbf{v}_i$. In other words, for an orthogonal basis,
$$\mathbf{x} = P_{\mathbf{v}_1}\mathbf{x} + P_{\mathbf{v}_2}\mathbf{x} + \cdots + P_{\mathbf{v}_p}\mathbf{x}.$$
This is the purple arrow in the graph landing on $\mathbf{x}$ (when the basis is, in fact, orthogonal).

\begin{remark}
If $\beta$ is orthonormal, then $\|\mathbf{v}_i\| = 1$ and the formula simplifies even further: $c_i = \mathbf{v}_i^\mathsf{T}\mathbf{x}$. 
\end{remark}

\begin{example}
Let
$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \qquad \mathbf{v}_2 = \begin{bmatrix} -1 \\ \phantom{-}1 \end{bmatrix}, \qquad \mathbf{x} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}.$$
Since $\mathbf{v}_1^\mathsf{T}\mathbf{v}_2 = -1 + 1 = 0$, $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ is an orthogonal basis of $\R^2$, with $\|\mathbf{v}_1\|^2 = \|\mathbf{v}_2\|^2 = 2$. We can tehn directly calculate
$$c_1 = \frac{\mathbf{v}_1^\mathsf{T}\mathbf{x}}{\|\mathbf{v}_1\|^2} = \frac{3}{2}, \qquad c_2 = \frac{\mathbf{v}_2^\mathsf{T}\mathbf{x}}{\|\mathbf{v}_2\|^2} = -\frac{1}{2}.$$
As is good practice, we should verify with simple vector scaling and addition
$$\frac{3}{2}\begin{bmatrix} 1 \\ 1 \end{bmatrix} - \frac{1}{2}\begin{bmatrix} -1 \\ \phantom{-}1 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix} = \mathbf{x}.$$
\end{example}

\subsection*{Without orthogonality}

When $\mathbf{v}_1^\mathsf{T}\mathbf{v}_2 \neq 0$, the cross terms in the proof no longer vanish, and the projections do not sum to $\mathbf{x}$.

\begin{example}
Let
$$\mathbf{z}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \qquad \mathbf{z}_2 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \qquad \mathbf{x} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}.$$
These form a basis of $\R^2$, but $\mathbf{z}_1^\mathsf{T}\mathbf{z}_2 = 1 \neq 0$. The true coordinates are $c_1 = c_2 = 1$, since $\mathbf{z}_1 + \mathbf{z}_2 = \mathbf{x}$. The projections, however, are
$$P_{\mathbf{z}_1}\mathbf{x} = \frac{2}{1}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 2 \\ 0 \end{bmatrix}, \qquad P_{\mathbf{z}_2}\mathbf{x} = \frac{3}{2}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 3/2 \\ 3/2 \end{bmatrix},$$
and their sum is
$$\begin{bmatrix} 7/2 \\ 3/2 \end{bmatrix} \neq \mathbf{x}.$$
\end{example}
</div>
