---
layout: desmos-graph
title: "Gram–Schmidt Orthogonalization"
desmos_json: "GSO.json"
graph_3d: true
side_controls: true
---

<div class="gs-panel" id="gs-panel">

  <span class="gs-label">Step <strong id="gs-step-num">0</strong> of 9</span>
  <div class="gs-grid2">
    <button class="site-btn" id="gs-prev">← Back</button>
    <button class="site-btn" id="gs-next">Next →</button>
  </div>
  <input class="site-slider" id="gs-t" type="range" min="0" max="9" step="0.01" value="0" aria-label="Procedure progress T">
  <button class="site-btn gs-wide" id="gs-play">Play all</button>

  <hr class="desmos-divider">

  <span class="gs-label">Starting basis</span>
  <div class="gs-grid2">
    <button class="site-btn" id="gs-random">Random basis</button>
    <button class="site-btn" id="gs-reset">Reset</button>
  </div>
  <div class="gs-basis" id="gs-basis"></div>

  <hr class="desmos-divider">

  <span class="gs-label" id="gs-cap-title"></span>
  <div class="gs-caption" id="gs-caption"></div>

</div>

<style>
  .gs-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .gs-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Keep math in the uppercase headings as typed (else v prints as V). */
  .gs-label mjx-container {
    text-transform: none;
  }

  .gs-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }

  .gs-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .gs-wide {
    width: 100%;
  }

  .gs-basis {
    font-size: 0.85rem;
    text-align: center;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .gs-caption {
    font-size: 0.92rem;
    line-height: 1.5;
    min-height: 9rem;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .gs-caption p {
    margin: 0 0 0.5rem;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from GSO.json ─────────────────────────────────────
    // T (id 51, folder "GSO Procedure") runs 0 → 9; step k plays over k−1 < T ≤ k.
    var T_ID = '51', STEPS = 9;

    // Colors match the graph: v red, u orange, proj from v2 blue,
    // projections from v3 purple, their sum green.
    var C = { v: '#c74440', u: '#fa7e19', p2: '#2d70b3', p3: '#6042a6', s: '#388c46' };
    function c(key, tex) { return '{\\color{' + C[key] + '}' + tex + '}'; }

    // Every v is red and every u orange, wherever it appears, including
    // inside projections and in the generic v_k / u's.
    function vv(i) { return c('v', '\\mathbf{v}' + (i ? '_' + i : '')); }
    function uu(i) { return c('u', '\\mathbf{u}' + (i ? '_' + i : '')); }
    var v1 = vv(1), v2 = vv(2), v3 = vv(3), u1 = uu(1), u2 = uu(2), u3 = uu(3);

    // Notation follows the course notes: v₂∥ / v₂⊥ are the parallel and
    // perpendicular components of v₂ with respect to u₁, and v₃,₁ / v₃,₂ are the
    // components of v₃ along u₁ / u₂. Each is colored like its arrow.
    var par2 = c('p2', '\\mathbf{v}_2^{\\parallel}'), perp2 = c('u', '\\mathbf{v}_2^{\\perp}');
    var v31 = c('p3', '\\mathbf{v}_{3,1}'), v32 = c('p3', '\\mathbf{v}_{3,2}');
    var sum3 = c('s', '\\mathbf{v}_{3,1} + \\mathbf{v}_{3,2}');

    // (uᵀv / ‖u‖²) u
    function proj(u, v) {
      return '\\frac{' + u + '^{\\mathsf{T}}' + v + '}{\\|' + u + '\\|^2}\\,' + u;
    }

    // One entry per state: what the step that just played did.
    var CAPTIONS = [
      ['Step 0:',
       '<p>Begin with any basis \\(\\beta = \\{' + v1 + ',' + v2 + ',' + v3 + '\\}\\) of \\(\\mathbb{R}^3\\).</p>' +
       '<p>The goal is an <em>orthogonal</em> basis \\(\\gamma = \\{' + u1 + ',' + u2 + ',' + u3 + '\\}\\) with the same span, built one vector at a time ' +
       'by removing from each \\(' + vv('k') + '\\) its components along the \\(' + uu() + '\\)\'s already built.</p>'],
      ['Step 1:',
       '<p>We may keep the first vector (as there is nothing for it to be orthogonal to yet). So \\[' + u1 + ' = ' + v1 + '.\\]</p><p>For reference, the black line is \\(\\operatorname{span}\\{' + u1 + '\\}\\).</p>'],
      ['Step 2:',
       '<p>Project \\(' + v2 + '\\) onto \\(' + u1 + '\\). That is, drop \\(' + v2 + '\\) perpendicularly onto the line through \\(' + u1 + '\\). It lands at the parallel component of \\(' + v2 + '\\) with respect to \\(' + u1 + '\\) and is computed as</p>' +
       '\\[' + par2 + ' = ' + proj(u1, v2) + '.\\]'],
      ['Step 2.5:',
       '<p>The perpendicular component, from \\(' + par2 + '\\) up to \\(' + v2 + '\\), is orthogonal to \\(' + u1 + '\\). This will be our new basis vector:</p>' +
       '\\[' + u2 + ' = ' + perp2 + ' = ' + v2 + ' - ' + par2 + '.\\]'],
      ['Step 2.75:',
       '<p>For sake of centering our vectors at the origin, slide \\(' + u2 + '\\) back. Notably, \\(' + u1 + ' \\perp ' + u2 + '\\), and</p>' +
       '\\[\\operatorname{span}\\{' + u1 + ',' + u2 + '\\} = \\operatorname{span}\\{' + v1 + ',' + v2 + '\\}.\\]<p>These spans are equal because we have two sets of linearly independent vectors in the same plane. </p>'],
      ['Step 3: ',
       '<p>Now we project \\(' + v3 + '\\) onto the new basis vectors \\(' + u1 + '\\) and \\(' + u2 + '\\).</p>' +
       '\\[' + v31 + ' = ' + proj(u1, v3) + ',\\quad ' + v32 + ' = ' + proj(u2, v3) + '.\\]'],
      ['Step 3.25:',
       '<p>Both of these projections are parallel to the plane, the span we constructed already. In fact, because \\(' + u1 + ' \\perp ' + u2 + '\\), the sum \\(' + sum3 + '\\) is the projection of \\(' + v3 + '\\) onto that plane, ' +
       '\\(\\operatorname{span}\\{' + u1 + ',' + u2 + '\\}\\): visually, this is just the far corner of the rectangle (note, we can upgrade from parallelogram because these vectors are perpendicular).</p>'],
      ['Step 3.5:',
       '<p>What remains, from that point (the sum of the projections) up to \\(' + v3 + '\\), is orthogonal to the whole plane:</p>' +
       '\\[' + u3 + ' = ' + v3 + ' - ' + v31 + ' - ' + v32 + '.\\]'],
      ['Step 3.75:',
       '<p>Again, we will slide \\(' + u3 + '\\) back to the origin to get the orthogonal basis.</p>'],
      ['Conclusion:',
       '<p>\\(\\gamma = \\{' + u1 + ',' + u2 + ',' + u3 + '\\}\\) is an orthogonal basis with the same span as \\(\\beta = \\{' + v1 + ',' + v2 + ',' + v3 + '\\}\\). ' +
       'Divide each \\(' + uu('k') + '\\) by its length for an orthonormal basis.</p>']
    ];

    var el = {
      num: document.getElementById('gs-step-num'),
      title: document.getElementById('gs-cap-title'),
      cap: document.getElementById('gs-caption'),
      slider: document.getElementById('gs-t'),
      play: document.getElementById('gs-play')
    };

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // ── T ↔ page ─────────────────────────────────────────────────────────
    var t = 0, shown = -1;

    function setT(value) {
      t = Math.min(Math.max(value, 0), STEPS);
      calc.setExpression({ id: T_ID, latex: 'T=' + parseFloat(t.toFixed(4)) });
      render();
    }

    // The caption names the step in progress (or just finished).
    function render() {
      el.slider.value = t;
      var step = Math.min(Math.max(Math.ceil(t - 1e-6), 0), STEPS);
      if (step === shown) { return; }
      shown = step;
      el.num.textContent = step;
      el.title.innerHTML = CAPTIONS[step][0];
      el.cap.innerHTML = CAPTIONS[step][1];
      typesetMath([el.title, el.cap]);
    }

    // Follow T when it is dragged in the expression list too. Guarded in
    // case the 3D calculator lacks helper expressions; the page still works.
    try {
      var tHelper = calc.HelperExpression({ latex: 'T' });
      tHelper.observe('numericValue', function () {
        if (isNaN(tHelper.numericValue)) { return; }
        t = tHelper.numericValue;
        render();
      });
    } catch (err) { console.warn(err); }

    // ── animation ────────────────────────────────────────────────────────
    var anim = null;

    // anim holds either an animation frame or the pause timer between steps.
    function stop() {
      if (anim) { cancelAnimationFrame(anim.frame); clearTimeout(anim.timer); anim = null; }
      el.play.textContent = 'Play all';
    }

    // Ease from the current T to `target`, about `perStep` ms per unit of T.
    function animateTo(target, perStep, done) {
      stop();
      var from = t, dist = Math.abs(target - from);
      if (dist < 1e-6) { if (done) { done(); } return; }
      var dur = dist * perStep, start = null;
      anim = {};
      function frame(now) {
        if (start === null) { start = now; }
        var s = Math.min((now - start) / dur, 1);
        var e = dist > 1 ? s : s * s * (3 - 2 * s);   // smoothstep for single steps
        setT(from + (target - from) * e);
        if (s < 1) { anim.frame = requestAnimationFrame(frame); }
        else { anim = null; if (done) { done(); } }
      }
      anim.frame = requestAnimationFrame(frame);
    }

    document.getElementById('gs-next').addEventListener('click', function () {
      animateTo(Math.min(Math.floor(t + 1e-6) + 1, STEPS), 1100);
    });

    document.getElementById('gs-prev').addEventListener('click', function () {
      animateTo(Math.max(Math.ceil(t - 1e-6) - 1, 0), 500);
    });

    // Play every step in turn, pausing briefly on each completed state.
    el.play.addEventListener('click', function () {
      if (anim) { stop(); return; }
      if (t >= STEPS - 1e-6) { setT(0); }
      function next() {
        if (t >= STEPS - 1e-6) { stop(); return; }
        animateTo(Math.floor(t + 1e-6) + 1, 1400, function () {
          anim = { timer: setTimeout(function () { anim = null; next(); }, 900) };
        });
        el.play.textContent = 'Pause';
      }
      next();
    });

    el.slider.addEventListener('input', function (e) {
      stop();
      setT(parseFloat(e.target.value));
    });

    // ── starting basis ───────────────────────────────────────────────────
    // v_1, v_2, v_3 live in the "Original Vectors" folder; everything else in
    // the graph is computed from them.
    var V_IDS = ['3', '4', '5'];
    var DEFAULT = [[1, 1, 1], [1, 0, 3], [0, 1, 2]];
    var basis = DEFAULT;
    var BOUND = 2.8;   // the viewport is about [-3, 3]^3

    function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function scale(k, a) { return [k * a[0], k * a[1], k * a[2]]; }
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
    function projOnto(u, v) { return scale(dot(u, v) / dot(u, u), u); }
    function det(a, b, c) {
      return a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    }

    function bmatrix(v) { return '\\begin{bmatrix}' + v.join('\\\\') + '\\end{bmatrix}'; }

    function showBasis() {
      var box = document.getElementById('gs-basis');
      box.innerHTML = '\\[' + [v1, v2, v3].map(function (name, i) {
        return name + ' = ' + bmatrix(basis[i]);
      }).join(',\\ ') + '\\]';
      typesetMath([box]);
    }

    function setBasis(vs) {
      basis = vs;
      vs.forEach(function (v, i) {
        calc.setExpression({ id: V_IDS[i], latex: 'v_{' + (i + 1) + '}=\\left(' + v.join(',') + '\\right)' });
      });
      stop();
      setT(0);
      showBasis();
    }

    // A basis worth watching: integer entries, well spread (|det| >= 2), every
    // pair at a visibly non-right, non-parallel angle so each projection is a
    // real arrow, and the whole construction inside the viewport.
    function goodBasis(v) {
      var a = v[0], b = v[1], c = v[2];
      if (v.some(function (x) { var n = Math.sqrt(dot(x, x)); return n < 1.4 || n > BOUND; })) { return false; }
      if (Math.abs(det(a, b, c)) < 2) { return false; }
      var pairs = [[a, b], [a, c], [b, c]];
      if (pairs.some(function (p) {
        var cos = Math.abs(dot(p[0], p[1])) / Math.sqrt(dot(p[0], p[0]) * dot(p[1], p[1]));
        return cos < 0.25 || cos > 0.85;
      })) { return false; }
      var u1 = a, p21 = projOnto(u1, b), u2 = sub(b, p21);
      var p31 = projOnto(u1, c), p32 = projOnto(u2, c), s = add(p31, p32), u3 = sub(c, s);
      // v3's component along u2 should be visible too.
      if (Math.sqrt(dot(p32, p32)) < 0.4) { return false; }
      return [p21, u2, p31, p32, s, u3].every(function (x) {
        return x.every(function (xi) { return Math.abs(xi) <= BOUND; });
      });
    }

    function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
    function randVec() { return [randInt(-2, 2), randInt(-2, 2), randInt(-2, 2)]; }

    document.getElementById('gs-random').addEventListener('click', function () {
      for (var tries = 0; tries < 5000; tries++) {
        var v = [randVec(), randVec(), randVec()];
        if (goodBasis(v) && JSON.stringify(v) !== JSON.stringify(basis)) { setBasis(v); return; }
      }
    });

    document.getElementById('gs-reset').addEventListener('click', function () { setBasis(DEFAULT); });

    setT(0);
    showBasis();
  };
</script>

<!--writeup-->

<div class="latex-body">
Orthogonal bases are easy to work with: as shown on the <a href="/desmos/orthogonal-basis">Orthogonal Bases and Projections</a> page, the coordinates of a vector with respect to an orthogonal basis are just projections. The \textbf{Gram–Schmidt} orthogonalization process allows one to start from a non-orthogonal basis $\beta$ of a subspace $W$, and construct an \emph{orthogonal} basis $\gamma$ that spans the same subspace $W$. Let $\beta$ be a basis for a subspace $W \subseteq \R^n$:
$$\beta = \{\mathbf{v}_1, \ldots, \mathbf{v}_p\} \xrightarrow{\text{Gram–Schmidt}} \gamma = \{\mathbf{u}_1, \ldots, \mathbf{u}_p\}.$$
The interactive graph above runs through this process. I invite you to play around and visualize this procedure, as it is algebraically quite dense. 

Throughout, recall that the projection of $\mathbf{v}$ onto a nonzero vector $\mathbf{u}$ is computed as
$$\frac{\mathbf{u}^\mathsf{T}\mathbf{v}}{\|\mathbf{u}\|^2}\,\mathbf{u}.$$

\subsection*{1st step}

We need to start somewhere, with a vector that is orthogonal to all the rest. But "all the rest" is nothing when we only have one vector. For sake of easy, just choose
$$\boxed{\mathbf{u}_1 = \mathbf{v}_1}.$$

\subsection*{2nd step}

We now define the following two vectors:

<ul>
<li>$\mathbf{v}_2^\parallel$, called the "parallel component of $\mathbf{v}_2$ with respect to $\mathbf{u}_1$", which is just the \emph{projection} of $\mathbf{v}_2$ onto $\mathbf{u}_1$;</li>
<li>$\mathbf{v}_2^\perp$, called the "perpendicular component of $\mathbf{v}_2$ with respect to $\mathbf{u}_1$", which is the other component of $\mathbf{v}_2$, i.e. the vector such that $\mathbf{v}_2 = \mathbf{v}_2^\parallel + \mathbf{v}_2^\perp$. Notably this is perpendicular to both $\mathbf{v}_2^\parallel$ and $\mathbf{u}_1$.</li>
</ul>

Thus, we have $\mathbf{v}_2^\perp = \mathbf{v}_2 - \mathbf{v}_2^\parallel$, and $\mathbf{v}_2^\parallel$ and $\mathbf{v}_2^\perp$ are orthogonal to one another. 

We then choose $\mathbf{u}_2 = \mathbf{v}_2^\perp$. With this choice, $\operatorname{span}\{\mathbf{u}_1, \mathbf{u}_2\} = \operatorname{span}\{\mathbf{v}_1, \mathbf{v}_2\}$ (the spanned set is the plane that contains both pairs of vectors). Since $\mathbf{v}_2^\parallel$ is the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$,
$$\mathbf{v}_2 = \mathbf{v}_2^\parallel + \mathbf{v}_2^\perp \implies \mathbf{v}_2^\perp = \mathbf{v}_2 - \mathbf{v}_2^\parallel \implies \mathbf{v}_2^\perp = \mathbf{v}_2 - \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_2}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1.$$
In conclusion,
$$\boxed{\mathbf{u}_2 = \mathbf{v}_2 - \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_2}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1}.$$

To reiterate: $\mathbf{u}_2$ is obtained by subtracting from $\mathbf{v}_2$ its parallel component to $\mathbf{u}_1$. The subsequent steps keep this pattern going. 

\subsection*{3rd step}

At this point, $\mathbf{u}_1$ and $\mathbf{u}_2$ are known. How do we "straighten" $\mathbf{v}_3$ so that (i) it becomes a vector $\mathbf{u}_3$ orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$, and (ii) $\operatorname{span}\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\} = \operatorname{span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$? Similarly to the 2nd step, we define the parallel components of $\mathbf{v}_3$ with respect to $\mathbf{u}_1$ and $\mathbf{u}_2$, i.e. its projections onto each:
$$\mathbf{v}_{3,1} = \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_3}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1, \qquad \mathbf{v}_{3,2} = \frac{\mathbf{u}_2^\mathsf{T}\mathbf{v}_3}{\|\mathbf{u}_2\|^2}\,\mathbf{u}_2.$$


The vector $\mathbf{u}_3$, simply by how projections work, is such that $\mathbf{u}_3 + \mathbf{v}_{3,1} + \mathbf{v}_{3,2} = \mathbf{v}_3$, so it is obtained by subtracting from $\mathbf{v}_3$ its components with respect to both $\mathbf{u}_1$ and $\mathbf{u}_2$:
$$\boxed{\mathbf{u}_3 = \mathbf{v}_3 - \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_3}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1 - \frac{\mathbf{u}_2^\mathsf{T}\mathbf{v}_3}{\|\mathbf{u}_2\|^2}\,\mathbf{u}_2}.$$
It is easy to verify that $\mathbf{u}_3^\mathsf{T}\mathbf{u}_1 = 0$ and $\mathbf{u}_3^\mathsf{T}\mathbf{u}_2 = 0$, so $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ is an orthogonal set.

\subsection*{$k$<sup>th</sup> step}

In general, once $\mathbf{u}_1, \ldots, \mathbf{u}_{k-1}$ are known, the vector $\mathbf{u}_k$ is obtained by subtracting from $\mathbf{v}_k$ its components in the directions of $\mathbf{u}_1, \ldots, \mathbf{u}_{k-1}$:
$$\mathbf{u}_k = \mathbf{v}_k - \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_k}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1 - \frac{\mathbf{u}_2^\mathsf{T}\mathbf{v}_k}{\|\mathbf{u}_2\|^2}\,\mathbf{u}_2 - \cdots - \frac{\mathbf{u}_{k-1}^\mathsf{T}\mathbf{v}_k}{\|\mathbf{u}_{k-1}\|^2}\,\mathbf{u}_{k-1},$$
or, in a more compact form,
$$\boxed{\mathbf{u}_k = \mathbf{v}_k - \sum_{i=1}^{k-1} \frac{\mathbf{u}_i^\mathsf{T}\mathbf{v}_k}{\|\mathbf{u}_i\|^2}\,\mathbf{u}_i}.$$

\begin{remark}
Once you have computed an orthogonal basis $\gamma = \{\mathbf{u}_1, \ldots, \mathbf{u}_p\}$, you can make it orthonormal by dividing each vector by its own length:
$$\delta = \left\{ \frac{\mathbf{u}_1}{\|\mathbf{u}_1\|}, \frac{\mathbf{u}_2}{\|\mathbf{u}_2\|}, \ldots, \frac{\mathbf{u}_p}{\|\mathbf{u}_p\|} \right\}$$
is an orthonormal basis of $W$.
\end{remark}

\begin{remark}
If you start from a different ordering of the vectors of $\beta$, you get a different orthogonal basis. In other words, the result of the Gram–Schmidt process depends on the initial ordering of the vectors in $\beta$. (In the graph, $\mathbf{u}_1$ always lies along $\mathbf{v}_1$, whichever basis you start from.)
\end{remark}

\begin{example}
Take the default basis in the graph, $\beta = \{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\} \subseteq \R^3$ with
$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}, \qquad \mathbf{v}_2 = \begin{bmatrix} 1 \\ 0 \\ 3 \end{bmatrix}, \qquad \mathbf{v}_3 = \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}.$$
First,
$$\mathbf{u}_1 = \mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}.$$
To compute $\mathbf{u}_2$, we subtract from $\mathbf{v}_2$ its projection onto $\mathbf{u}_1$. Since $\mathbf{u}_1^\mathsf{T}\mathbf{v}_2 = 1 + 0 + 3 = 4$ and $\|\mathbf{u}_1\|^2 = 3$,
$$\mathbf{u}_2 = \mathbf{v}_2 - \frac{\mathbf{u}_1^\mathsf{T}\mathbf{v}_2}{\|\mathbf{u}_1\|^2}\,\mathbf{u}_1 = \begin{bmatrix} 1 \\ 0 \\ 3 \end{bmatrix} - \frac{4}{3}\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} -1/3 \\ -4/3 \\ \phantom{-}5/3 \end{bmatrix}.$$
To compute $\mathbf{u}_3$, we subtract from $\mathbf{v}_3$ its projections onto $\mathbf{u}_1$ and $\mathbf{u}_2$. We have $\mathbf{u}_1^\mathsf{T}\mathbf{v}_3 = 0 + 1 + 2 = 3$, $\mathbf{u}_2^\mathsf{T}\mathbf{v}_3 = 0 - \frac{4}{3} + \frac{10}{3} = 2$, and $\|\mathbf{u}_2\|^2 = \frac{1}{9} + \frac{16}{9} + \frac{25}{9} = \frac{14}{3}$, so
$$\mathbf{u}_3 = \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix} - \frac{3}{3}\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} - \frac{2}{14/3}\begin{bmatrix} -1/3 \\ -4/3 \\ \phantom{-}5/3 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix} - \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} - \begin{bmatrix} -1/7 \\ -4/7 \\ \phantom{-}5/7 \end{bmatrix} = \begin{bmatrix} -6/7 \\ \phantom{-}4/7 \\ \phantom{-}2/7 \end{bmatrix}.$$
As a check, $\mathbf{u}_3^\mathsf{T}\mathbf{u}_1 = \frac{-6 + 4 + 2}{7} = 0$ and $\mathbf{u}_3^\mathsf{T}\mathbf{u}_2 = \frac{6 - 16 + 10}{21} = 0$. In conclusion, the resulting orthogonal basis $\gamma = \{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$ is comprised of the vectors
$$\boxed{\mathbf{u}_1 = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}, \quad \mathbf{u}_2 = \begin{bmatrix} -1/3 \\ -4/3 \\ \phantom{-}5/3 \end{bmatrix}, \quad \mathbf{u}_3 = \begin{bmatrix} -6/7 \\ \phantom{-}4/7 \\ \phantom{-}2/7 \end{bmatrix}}.$$
\end{example}
</div>
