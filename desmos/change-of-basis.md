---
layout: desmos-graph
title: "Change of Basis"
desmos_json: "change_of_basis.json"
side_controls: true
---

<div class="cb-panel" id="cb-panel">

  <span class="cb-label">Display</span>
  <div class="cb-grid2">
    <button class="site-btn site-btn--active cb-toggle" aria-pressed="true" data-folder="135">Standard grid</button>
    <button class="site-btn site-btn--active cb-toggle" aria-pressed="true" data-folder="102">\(\mathbf{e}_1, \mathbf{e}_2\)</button>
    <button class="site-btn cb-toggle" aria-pressed="false" data-folder="110">\(\beta\)-grid</button>
    <button class="site-btn cb-toggle" aria-pressed="false" data-folder="220">\(c_1\mathbf{v}_1,\ c_2\mathbf{v}_2\)</button>
  </div>
  <button class="site-btn cb-wide" id="cb-reset-btn">Reset</button>

  <hr class="desmos-divider">

  <span class="cb-label">Vector \(\mathbf{y}\)</span>

  <span class="cb-sub">Standard coordinates \(\big[\mathbf{y}\big]_{\alpha}\)</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(y_1\) = <strong id="cb-y1-val">4</strong></span>
    <input class="site-slider" id="cb-y1" type="range" min="-6" max="6" step="0.1" value="4">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(y_2\) = <strong id="cb-y2-val">4</strong></span>
    <input class="site-slider" id="cb-y2" type="range" min="-6" max="6" step="0.1" value="4">
  </div>

  <span class="cb-sub">\(\beta\)-coordinates \(\big[\mathbf{y}\big]_{\beta}\)</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(c_1\) = <strong id="cb-c1-val">2</strong></span>
    <input class="site-slider" id="cb-c1" type="range" min="-6" max="6" step="0.1" value="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(c_2\) = <strong id="cb-c2-val">1</strong></span>
    <input class="site-slider" id="cb-c2" type="range" min="-6" max="6" step="0.1" value="1">
  </div>

</div>

<style>
  .cb-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cb-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Keep math in the uppercase headings as typed (else \beta prints as B). */
  .cb-label mjx-container {
    text-transform: none;
  }

  .cb-sub {
    font-size: 0.85rem;
    color: var(--color-label);
    margin-top: 0.2rem;
  }

  /* Two buttons per row; the site-btn defaults are sized for a lone button. */
  .cb-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }

  .cb-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .cb-wide {
    width: 100%;
  }

  /* Live calculation under the graph: M_β and its inverse share a row
     (wrapping when narrow), with [y]_β centered beneath. */
  .cb-calc {
    margin-top: 0.75rem;
    text-align: center;
  }

  .cb-calc .cb-label {
    display: block;
    text-align: left;
  }

  .cb-calc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 3em;
  }

  .cb-calc-row .cb-calc-math mjx-container[display="true"] {
    margin: 0.6em 0;
  }

  .cb-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .cb-note {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: #b7472a;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from change_of_basis.json ─────────────────────────
    // v_1 = (A_11, A_21) [red], v_2 = (A_12, A_22) [blue], y = (Y_1, Y_2) [orange].
    var ID = { A11: '126', A12: '127', A21: '129', A22: '130', Y1: '211', Y2: '212' };
    var DEFAULT = { A11: 3, A12: -2, A21: 1.5, A22: 1, Y1: 4, Y2: 4 };   // [y]_β = (2, 1)

    var vals = { A11: NaN, A12: NaN, A21: NaN, A22: NaN, Y1: NaN, Y2: NaN };
    var EPS = 1e-3;   // below this |det| the columns are treated as parallel

    // Short numbers for display, no trailing zeros: tenths by default. The
    // determinant of a tenths matrix lives in hundredths, so it gets two.
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

    function det() { return vals.A11 * vals.A22 - vals.A12 * vals.A21; }

    function coords() {
      var D = det();
      return [
        ( vals.A22 * vals.Y1 - vals.A12 * vals.Y2) / D,
        (-vals.A21 * vals.Y1 + vals.A11 * vals.Y2) / D
      ];
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
    function bmatrix(cols) {
      var padded = cols.map(function (col) {
        var strs = col.map(fmt);
        var neg = strs.some(function (s) { return s.charAt(0) === '-'; });
        return strs.map(function (s) { return neg && s.charAt(0) !== '-' ? '\\phantom{-}' + s : s; });
      });
      var rows = padded[0].map(function (_, i) {
        return padded.map(function (col) { return col[i]; }).join(' & ');
      });
      return '\\begin{bmatrix} ' + rows.join(' \\\\ ') + ' \\end{bmatrix}';
    }

    function syncSlider(key, value) {
      var input = document.getElementById('cb-' + key);
      var label = document.getElementById('cb-' + key + '-val');
      if (isFinite(value)) {
        input.value = value;
        label.textContent = fmt(value);
      } else {
        label.textContent = '—';
      }
    }

    // ── live panel + calculation ─────────────────────────────────────────
    var pending = false;
    function render() {
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        if (Object.keys(vals).some(function (k) { return isNaN(vals[k]); })) { return; }

        var D = det();
        var singular = Math.abs(D) < EPS;
        var c = singular ? [NaN, NaN] : coords();

        syncSlider('y1', vals.Y1);
        syncSlider('y2', vals.Y2);
        syncSlider('c1', c[0]);
        syncSlider('c2', c[1]);
        document.getElementById('cb-c1').disabled = singular;
        document.getElementById('cb-c2').disabled = singular;

        // Top row: the basis matrix and its inverse (the change of coordinates
        // matrix, as 1/det times the adjugate) side by side, wrapping on narrow
        // screens. Beneath: [y]_β.
        var inv = '\\frac{1}{' + fmt(D, 2) + '}' +
                  bmatrix([[vals.A22, -vals.A21], [-vals.A12, vals.A11]]);
        var basisEl = document.getElementById('cb-calc-basis');
        var invEl = document.getElementById('cb-calc-inv');
        var coordEl = document.getElementById('cb-calc-coords');
        basisEl.innerHTML = '\\[M_\\beta = \\begin{bmatrix} \\mathbf{v}_1 & \\mathbf{v}_2 \\end{bmatrix} = ' +
          bmatrix([[vals.A11, vals.A21], [vals.A12, vals.A22]]) + '\\]';
        invEl.innerHTML = singular ? '' :
          '\\[M_{\\beta\\leftarrow\\alpha} = M_\\beta^{-1} = ' + inv + '\\]';
        coordEl.innerHTML = singular ? '' :
          '\\[\\big[\\mathbf{y}\\big]_\\beta = M_{\\beta\\leftarrow\\alpha}\\big[\\mathbf{y}\\big]_\\alpha = ' +
          inv + bmatrix([[vals.Y1, vals.Y2]]) + ' = ' + bmatrix([[c[0], c[1]]]) + '\\]';
        typesetMath([basisEl, invEl, coordEl]);

        var note = document.getElementById('cb-note');
        note.hidden = !singular;
        if (singular) {
          note.textContent = 'v₁ and v₂ are parallel, so β is not a basis: its basis matrix has no inverse ' +
                             'and most vectors y cannot be written as c₁v₁ + c₂v₂.';
        }
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
    // [y]_α sliders move y directly; [y]_β sliders move y to c_1 v_1 + c_2 v_2.
    document.getElementById('cb-y1').addEventListener('input', function (e) { set('Y1', parseFloat(e.target.value)); });
    document.getElementById('cb-y2').addEventListener('input', function (e) { set('Y2', parseFloat(e.target.value)); });

    // Keep y = c_1 v_1 + c_2 v_2 inside the ±BOUND frame: with the other
    // coefficient fixed, each coordinate of y is linear in c[which], which
    // gives an interval of allowed values to clamp into.
    var BOUND = 6;
    function clampCoord(which, value, c) {
      var v = which === 0 ? [vals.A11, vals.A21] : [vals.A12, vals.A22];
      var w = which === 0 ? [vals.A12, vals.A22] : [vals.A11, vals.A21];
      var other = c[1 - which], lo = -Infinity, hi = Infinity;
      for (var j = 0; j < 2; j++) {
        var base = other * w[j];
        if (Math.abs(v[j]) < 1e-9) { continue; }
        var a = (-BOUND - base) / v[j], b = (BOUND - base) / v[j];
        lo = Math.max(lo, Math.min(a, b));
        hi = Math.min(hi, Math.max(a, b));
      }
      return Math.min(hi, Math.max(lo, value));
    }

    function fromCoords(which, value) {
      if (Math.abs(det()) < EPS) { return; }
      var c = coords();
      c[which] = clampCoord(which, value, c);
      set('Y1', c[0] * vals.A11 + c[1] * vals.A12);
      set('Y2', c[0] * vals.A21 + c[1] * vals.A22);
    }
    document.getElementById('cb-c1').addEventListener('input', function (e) { fromCoords(0, parseFloat(e.target.value)); });
    document.getElementById('cb-c2').addEventListener('input', function (e) { fromCoords(1, parseFloat(e.target.value)); });

    // ── show / hide folders ──────────────────────────────────────────────
    document.querySelectorAll('.cb-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = !btn.classList.contains('site-btn--active');
        btn.classList.toggle('site-btn--active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: !on });
      });
    });

    document.getElementById('cb-reset-btn').addEventListener('click', function () {
      Object.keys(DEFAULT).forEach(function (k) { set(k, DEFAULT[k]); });
    });

    typesetMath([document.getElementById('cb-panel')]);
  };
</script>

<!--below-graph-->

<div class="cb-calc">
  <span class="cb-label">Change of coordinates</span>
  <div class="cb-calc-row">
    <div class="cb-calc-math" id="cb-calc-basis"></div>
    <div class="cb-calc-math" id="cb-calc-inv"></div>
  </div>
  <div class="cb-calc-math" id="cb-calc-coords"></div>
  <p class="cb-note" id="cb-note" hidden></p>
</div>

<!--writeup-->

<div class="latex-body">
We usually describe a vector in $\R^2$ by its two components (or entries),
$$\mathbf{y} = \begin{bmatrix} y_1 \\ y_2 \end{bmatrix}.$$
Those entries are really \emph{coordinates}, in the standard basis: they say how far to walk along $\mathbf{e}_1$ (the ``x direction'') and how far to walk along $\mathbf{e}_2$ (the ``y direction''). The choice of basis being $\mathbf{e}_1$ and $\mathbf{e}_2$ is standard, but not required. Any basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ suffices to give unique coordinates (as noted in the theorem below). This page is about computing those new coordinates when we know the standard ones. Coupling these ideas and composing operations lets us convert between any two bases.

In the graph, the red vector is $\mathbf{v}_1$, the blue vector is $\mathbf{v}_2$ (drag either tip to change the basis), and the orange vector is $\mathbf{y}$ (drag it, or use the sliders). The faint black grid is the standard grid, built from $\mathbf{e}_1$ and $\mathbf{e}_2$. Toggle on the \emph{$\beta$-grid} to see the grid built from $\mathbf{v}_1$ and $\mathbf{v}_2$ instead. Notably, the vector $\mathbf{y}$ may have different coordinates in different bases, thus sitting along different grid points. 

\subsection*{Coordinates with respect to a basis}

\begin{theorem}
If $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ is a basis of $\R^2$, then every $\mathbf{y} \in \R^2$ can be written as a linear combination $\mathbf{y} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2$ in a \emph{unique} way.
\end{theorem}

\begin{definition}
Let $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ be a basis of $\R^2$ and let $\mathbf{y} \in \R^2$. The unique scalars $c_1, c_2$ with $\mathbf{y} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2$ are the \textbf{coordinates} of $\mathbf{y}$ with respect to $\beta$, and the vector
$$\big[\mathbf{y}\big]_\beta = \begin{bmatrix} c_1 \\ c_2 \end{bmatrix} \in \R^2$$
is the \textbf{coordinate vector} of $\mathbf{y}$ with respect to $\beta$.
\end{definition}

Toggle on $c_1\mathbf{v}_1,\ c_2\mathbf{v}_2$ to see this in the graph: the dashed red and blue arrows are the scaled vectors $c_1\mathbf{v}_1$ and $c_2\mathbf{v}_2$, and the dotted lines complete the parallelogram whose far corner is their sum, $\mathbf{y}$. The coordinate vector, $\big[\mathbf{y}\big]_\beta$ simply tells use how to traverse the $\beta$-grid to arrive at $\mathbf{y}$.

\begin{remark}
A set has no order, so $\{\mathbf{v}_1, \mathbf{v}_2\} = \{\mathbf{v}_2, \mathbf{v}_1\}$. For coordinates, however, we have to fix an ordering of the basis, since the ordering decides which entry of $\big[\mathbf{y}\big]_\beta$ is which. Listing the basis as $\{\mathbf{v}_2, \mathbf{v}_1\}$ instead would give the same grid, but the two entries of $\big[\mathbf{y}\big]_\beta$ would trade places.
\end{remark}

\begin{problem}
Let $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ be a basis of $\R^2$, and let $\beta' = \{\mathbf{v}_2, \mathbf{v}_1\}$ be the same basis listed in the opposite order. Prove that for every $\mathbf{y} \in \R^2$,
$$\big[\mathbf{y}\big]_\beta = \begin{bmatrix} c_1 \\ c_2 \end{bmatrix} \quad\Longrightarrow\quad \big[\mathbf{y}\big]_{\beta'} = \begin{bmatrix} c_2 \\ c_1 \end{bmatrix}.$$
\end{problem}

\begin{proof}
This can be shown in two ways.
<br><br>
\textbf{By uniqueness.} We have $\mathbf{y} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 = c_2\mathbf{v}_2 + c_1\mathbf{v}_1$, so $\mathbf{y}$ has coefficients $c_2, c_1$ on the ordered list $\mathbf{v}_2, \mathbf{v}_1$. Coordinates are unique (the Theorem above), so these are the $\beta'$-coordinates.
<br><br>
\textbf{Algebraically.} Writing a linear combination as a matrix-vector product, $\big[\mathbf{y}\big]_\beta$ is the unique solution of $\begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}\mathbf{c} = \mathbf{y}.$ The swap matrix
$$P = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$
satisfies $\begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}P = \begin{bmatrix} \mathbf{v}_2 & \mathbf{v}_1 \end{bmatrix}$ and $P^2 = I$, so by associativity
$$\begin{bmatrix} \mathbf{v}_2 & \mathbf{v}_1 \end{bmatrix}\Big(P\big[\mathbf{y}\big]_\beta\Big)
= \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}P^2\big[\mathbf{y}\big]_\beta
= \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}\big[\mathbf{y}\big]_\beta = \mathbf{y}.$$
Hence $P\big[\mathbf{y}\big]_\beta$ solves the coordinate equation for $\beta'$ and
$$\big[\mathbf{y}\big]_{\beta'} = P\,\big[\mathbf{y}\big]_\beta = \begin{bmatrix} c_2 \\ c_1 \end{bmatrix}.$$
\end{proof}

\begin{example}
Let $\alpha = \{\mathbf{e}_1, \mathbf{e}_2\}$ be the standard (canonical) basis of $\R^2$. For any $\mathbf{y}$,
$$\mathbf{y} = \begin{bmatrix} y_1 \\ y_2 \end{bmatrix} = y_1\begin{bmatrix} 1 \\ 0 \end{bmatrix} + y_2\begin{bmatrix} 0 \\ 1 \end{bmatrix} = y_1\mathbf{e}_1 + y_2\mathbf{e}_2,$$
so the coordinates of $\mathbf{y}$ with respect to $\alpha$ are just its entries: $\big[\mathbf{y}\big]_\alpha = \mathbf{y}$. 
\end{example}

\subsection*{Computing the new coordinates}

Given $\mathbf{y} = \big[\mathbf{y}\big]_\alpha$, how do we find $\big[\mathbf{y}\big]_\beta$? By definition we want $c_1, c_2$ with $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 = \mathbf{y}$. This is a linear system, which we can write as
$$\begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}\begin{bmatrix} c_1 \\ c_2 \end{bmatrix} = \mathbf{y}.$$

\begin{definition}
For a basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ of $\R^2$, the \textbf{basis matrix} is the $2\times 2$ matrix $M_\beta = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$ whose columns are the basis vectors. Its inverse
$$M_{\beta\leftarrow\alpha} = M_\beta^{-1}$$
is called the \textbf{change of coordinates matrix} from the standard basis $\alpha$ to the basis $\beta$.
\end{definition}

With this notation, the system above reads $M_\beta\big[\mathbf{y}\big]_\beta = \big[\mathbf{y}\big]_\alpha$. Since $\mathbf{v}_1, \mathbf{v}_2$ are linearly independent, $M_\beta$ is invertible, and multiplying both sides by $M_\beta^{-1}$ gives the main result.

\begin{theorem}
Let $\alpha$ be the standard basis of $\R^2$ and $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ any basis of $\R^2$. For every $\mathbf{y} \in \R^2$,
$$\big[\mathbf{y}\big]_\beta = M_{\beta\leftarrow\alpha}\big[\mathbf{y}\big]_\alpha = M_\beta^{-1}\,\mathbf{y}.$$
\end{theorem}

\begin{remark}
Because the inverse is an involution (the inverse of the inverse is the original matrix), given the $\beta$-coordinates, the standard ones are $\big[\mathbf{y}\big]_\alpha = M_\beta\big[\mathbf{y}\big]_\beta$, which is just $c_1\mathbf{v}_1 + c_2\mathbf{v}_2$. So $M_\beta$ is itself a change of coordinates matrix, $M_{\alpha\leftarrow\beta} = M_\beta$, and the two directions are inverses of each other:
$$\mathbf{y} = \big[\mathbf{y}\big]_\alpha
\;\;\mathrel{\begin{array}{c}
\xrightarrow{\quad \textstyle M_{\beta\leftarrow\alpha} \,=\, M_\beta^{-1} \quad} \\[-2pt]
\xleftarrow[\quad \textstyle M_{\alpha\leftarrow\beta} \,=\, M_\beta \quad]{}
\end{array}}\;\;
\big[\mathbf{y}\big]_\beta.$$
\end{remark}

\begin{remark}
The above object is called a \textit{commutative diagram} and is read as follows. The arrows define the mapping from the input object (at the tail) to the output object (at the tip). Furthermore, you can navigate through any path (or around and around). We say the diagram \textit{commutes} because any path that starts and ends at the same points leads to the same result. This is illustrated more clearly in the next section.  
\end{remark}

For a $2\times 2$ matrix the inverse is explicit: whenever $ad - bc \neq 0$,
$$M_\beta = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \quad\Longrightarrow\quad M_\beta^{-1} = \frac{1}{ad-bc}\begin{bmatrix} \phantom{-}d & -b \\ -c & \phantom{-}a \end{bmatrix}.$$
This is exactly the computation shown live under the graph.

\begin{example}
Take
$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \qquad \mathbf{v}_2 = \begin{bmatrix} -2 \\ \phantom{-}1 \end{bmatrix}, \qquad \mathbf{y} = \begin{bmatrix} -2 \\ \phantom{-}4 \end{bmatrix}.$$
The basis matrix is
$$M_\beta = \begin{bmatrix} 1 & -2 \\ 1 & \phantom{-}1 \end{bmatrix}, \qquad \det M_\beta = 1\cdot 1 - (-2)\cdot 1 = 3,$$
so
$$M_{\beta\leftarrow\alpha} = M_\beta^{-1} = \frac{1}{3}\begin{bmatrix} \phantom{-}1 & 2 \\ -1 & 1 \end{bmatrix}
\qquad\text{and}\qquad
\big[\mathbf{y}\big]_\beta = \frac{1}{3}\begin{bmatrix} \phantom{-}1 & 2 \\ -1 & 1 \end{bmatrix}\begin{bmatrix} -2 \\ \phantom{-}4 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} 6 \\ 6 \end{bmatrix} = \begin{bmatrix} 2 \\ 2 \end{bmatrix}.$$
We can check this directly:
$$2\mathbf{v}_1 + 2\mathbf{v}_2 = \begin{bmatrix} 2 \\ 2 \end{bmatrix} + \begin{bmatrix} -4 \\ \phantom{-}2 \end{bmatrix} = \begin{bmatrix} -2 \\ \phantom{-}4 \end{bmatrix} = \mathbf{y}.$$
\end{example}

\subsection*{Going between any two bases}

So far we have only gone from the standard basis $\alpha$ to a new basis $\beta$. To go between two general bases $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ and $\beta' = \{\mathbf{w}_1, \mathbf{w}_2\}$, we simply apply two transformations (stopping at the standard basis along the way). Multiplying by $M_\beta$ takes $\beta$-coordinates to standard coordinates (since $M_\beta\big[\mathbf{y}\big]_\beta = \mathbf{y}$), and multiplying by $M_{\beta'}^{-1}$ takes standard coordinates to $\beta'$-coordinates:
$$\begin{CD}
\big[\mathbf{y}\big]_\beta @>{\qquad \textstyle M_{\beta'\leftarrow\beta} \qquad}>> \big[\mathbf{y}\big]_{\beta'} \\
@V{\textstyle M_\beta}VV @AA{\textstyle M_{\beta'}^{-1}}A \\
\mathbf{y} @= \mathbf{y}
\end{CD}$$
As mentioned in an earlier remark, we say this diagram \textit{commutes} as going down, across, and up is the same as going straight across the top. In other words, we may compose our operations (equivalently multiplying the matrices), which gives $M_{\beta'\leftarrow\beta}$.

\begin{theorem}
Let $\beta$ and $\beta'$ be bases of $\R^2$. For every $\mathbf{y} \in \R^2$,
$$\big[\mathbf{y}\big]_{\beta'} = M_{\beta'\leftarrow\beta}\big[\mathbf{y}\big]_\beta, \qquad \text{where } M_{\beta'\leftarrow\beta} = M_{\beta'}^{-1}M_\beta,$$
and in the other direction,
$$\big[\mathbf{y}\big]_\beta = M_{\beta\leftarrow\beta'}\big[\mathbf{y}\big]_{\beta'}, \qquad \text{where } M_{\beta\leftarrow\beta'} = M_\beta^{-1}M_{\beta'} = \big(M_{\beta'\leftarrow\beta}\big)^{-1}.$$
\end{theorem}

\begin{proof}
Both coordinate vectors describe the same $\mathbf{y}$, so $M_{\beta'}\big[\mathbf{y}\big]_{\beta'} = \mathbf{y} = M_\beta\big[\mathbf{y}\big]_\beta$. Multiplying on the left by $M_{\beta'}^{-1}$ gives the first formula, and by $M_\beta^{-1}$ gives the second.
\end{proof}


\begin{remark}
None of the theory so far required $\R^2.$ All the results generalize to $\R^n$ by just bulding similar $(n \times n)$ \textbf{basis matrices} and inverting as necessary. 
\end{remark}

Let's conclude with a final example, going between two bases. 

\begin{example}
Keep $\beta$ and $\mathbf{y}$ from the previous example, where we found $\big[\mathbf{y}\big]_\beta$ has entries $2, 2$, and let $\beta' = \{\mathbf{w}_1, \mathbf{w}_2\}$ with
$$\mathbf{w}_1 = \begin{bmatrix} \phantom{-}1 \\ -1 \end{bmatrix}, \qquad \mathbf{w}_2 = \begin{bmatrix} -4 \\ \phantom{-}6 \end{bmatrix}, \qquad M_{\beta'} = \begin{bmatrix} \phantom{-}1 & -4 \\ -1 & \phantom{-}6 \end{bmatrix}, \qquad M_{\beta'}^{-1} = \frac{1}{2}\begin{bmatrix} 6 & 4 \\ 1 & 1 \end{bmatrix}.$$
Then
$$M_{\beta'\leftarrow\beta} = M_{\beta'}^{-1}M_\beta = \frac{1}{2}\begin{bmatrix} 6 & 4 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} 1 & -2 \\ 1 & \phantom{-}1 \end{bmatrix} = \frac{1}{2}\begin{bmatrix} 10 & -8 \\ 2 & -1 \end{bmatrix},
\qquad
\big[\mathbf{y}\big]_{\beta'} = \frac{1}{2}\begin{bmatrix} 10 & -8 \\ 2 & -1 \end{bmatrix}\begin{bmatrix} 2 \\ 2 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}.$$
We never had to compute $\mathbf{y}$ itself, but we can check against it:
$$2\mathbf{w}_1 + \mathbf{w}_2 = \begin{bmatrix} \phantom{-}2 \\ -2 \end{bmatrix} + \begin{bmatrix} -4 \\ \phantom{-}6 \end{bmatrix} = \begin{bmatrix} -2 \\ \phantom{-}4 \end{bmatrix} = \mathbf{y}.$$
Going back the other way,
$$M_{\beta\leftarrow\beta'} = M_\beta^{-1}M_{\beta'} = \frac{1}{3}\begin{bmatrix} \phantom{-}1 & 2 \\ -1 & 1 \end{bmatrix}\begin{bmatrix} \phantom{-}1 & -4 \\ -1 & \phantom{-}6 \end{bmatrix} = \frac{1}{3}\begin{bmatrix} -1 & 8 \\ -2 & 10 \end{bmatrix},
\qquad
\frac{1}{3}\begin{bmatrix} -1 & 8 \\ -2 & 10 \end{bmatrix}\begin{bmatrix} 2 \\ 1 \end{bmatrix} = \begin{bmatrix} 2 \\ 2 \end{bmatrix} = \big[\mathbf{y}\big]_\beta,$$
as expected.
\end{example}


</div>
