---
layout: desmos-graph
title: "Initial and Boundary Value Problems"
desmos_json: "ivp_bvp.json"
desmos_url: "https://www.desmos.com/calculator/ktnpilxf5c"
side_controls: true
---

<div class="ib-panel" id="ib-panel">

  <span class="ib-label">Problem</span>
  <button class="site-btn site-btn--active ib-mode ib-wide" data-s="1" aria-pressed="true">First order IVP</button>
  <button class="site-btn ib-mode ib-wide" data-s="2" aria-pressed="false">Second order IVP</button>
  <button class="site-btn ib-mode ib-wide" data-s="3" aria-pressed="false">Second order BVP</button>
  <p class="ib-hint" id="ib-hint"></p>

  <hr class="desmos-divider">

  <span class="ib-label">Display</span>
  <button class="site-btn site-btn--active ib-wide" id="ib-family" aria-pressed="true">Show family of solutions</button>
  <p class="ib-hint" id="ib-family-hint"></p>

  <div id="ib-cases" hidden>
    <hr class="desmos-divider">
    <span class="ib-label">Cases</span>
    <div class="ib-cases">
      <button class="site-btn ib-wide ib-case" data-x1="pi/2" data-k1="2" data-k2="1">One solution</button>
      <button class="site-btn ib-wide ib-case" data-x1="2pi" data-k1="2" data-k2="3">No solution</button>
      <button class="site-btn ib-wide ib-case" data-x1="2pi" data-k1="2" data-k2="2">Infinitely many</button>
    </div>
  </div>

  <hr class="desmos-divider">

  <button class="site-btn ib-wide" id="ib-reset">Reset</button>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .ib-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ib-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ib-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .ib-wide { width: 100%; }

  .ib-cases {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .ib-hint {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.35;
    color: var(--color-label);
  }

  /* Live calculation under the graph: problem, equations for the constants,
     and solution share a row, wrapping when narrow. */
  .ib-calc {
    margin-top: 0.75rem;
    text-align: center;
  }

  .ib-calc .ib-label {
    display: block;
    text-align: left;
  }

  .ib-calc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 3em;
  }

  .ib-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .ib-calc-math mjx-container[display="true"] {
    margin: 0.5em 0;
  }

  .ib-note {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: #b7472a;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from ivp_bvp.json ─────────────────────────────────
    var ID = { s: '3', x0: '6', k1: '7', x1: '8', y1: '9', family: '19', handle: '32' };
    var DEFAULT = { x0: 0, k1: 2, x1: Math.PI / 2, y1: 1 };
    var NAMES = { x0: 'x_{0}', k1: 'k_{1}', x1: 'x_{1}', y1: 'y_{1}' };

    var vals = { x0: NaN, k1: NaN, x1: NaN, y1: NaN, k2: NaN, C: NaN, Q: NaN, C1: NaN, C2: NaN };
    var mode = 1;

    var HINT = {
      1: 'Drag the red point to set the initial condition \\(y(x_0) = k\\).',
      2: 'Drag the red and orange points to set initial condition \\(y(x_0) = k_1\\) and initial slope slope \\(y\'(x_0) = k_2\\).',
      3: 'Drag the red and orange points to set boundary condition  \\(y(x_0) = k_1\\) \\(y(x_1) = k_2\\).'
    };
    var FAMILY_HINT = {
      1: '',
      2: '',
      3: ''
    };

    // ── Formatting ───────────────────────────────────────────────────────
    function fmt(x) {
      var s = (Math.round(x * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
      return s === '-0' ? '0' : s;
    }
    function gcd(a, b) { return b ? gcd(b, a % b) : a; }
    // x as a multiple of π/12 when it is one, which is where the points snap.
    function fmtX(x) {
      var t = 12 * x / Math.PI, n = Math.round(t);
      if (Math.abs(t - n) > 1e-6 || n === 0) { return fmt(x); }
      var g = gcd(Math.abs(n), 12), p = Math.abs(n) / g, q = 12 / g;
      var head = (n < 0 ? '-' : '') + (p === 1 ? '' : p) + '\\pi';
      return q === 1 ? head : (n < 0 ? '-' : '') + '\\frac{' + (p === 1 ? '' : p) + '\\pi}{' + q + '}';
    }
    // c_1 t_1 + c_2 t_2 + ... with zero terms dropped and signs folded in.
    function combo(terms) {
      var out = '';
      terms.forEach(function (t) {
        var v = fmt(t[0]);
        if (v === '0') { return; }
        var neg = v.charAt(0) === '-', a = neg ? v.slice(1) : v;
        if (a === '1') { a = ''; }
        out += (neg ? (out ? ' - ' : '-') : (out ? ' + ' : '')) + a + ' ' + t[1];
      });
      return out || '0';
    }
    function shift(name, x0) {       // x - x_0, or plain x when x_0 = 0
      if (Math.abs(x0) < 1e-9) { return name + ' x'; }
      return name + '(x ' + (x0 > 0 ? '- ' + fmtX(x0) : '+ ' + fmtX(-x0)) + ')';
    }
    // [[a, b], [c, d]] [C_1, C_2] = [r, s], with the numbers plugged in.
    function systemTex(a, b, c, d, r, s) {
      return '\\begin{bmatrix} ' + fmt(a) + ' & ' + fmt(b) + ' \\\\ ' + fmt(c) + ' & ' + fmt(d) + ' \\end{bmatrix}' +
             '\\begin{bmatrix} C_1 \\\\ C_2 \\end{bmatrix} = ' +
             '\\begin{bmatrix} ' + fmt(r) + ' \\\\ ' + fmt(s) + ' \\end{bmatrix}';
    }

    function constants() {
      return ' \\implies C_1 = ' + fmt(vals.C1) + ', \\ \\ C_2 = ' + fmt(vals.C2);
    }

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // ── Live calculation ─────────────────────────────────────────────────
    function writeCalc() {
      var v = vals, x0 = fmtX(v.x0), x1 = fmtX(v.x1), k1 = fmt(v.k1), k2 = fmt(v.k2);
      var note = '', prob, sub, step = '', sol;
      var c0 = Math.cos(v.x0), s0 = Math.sin(v.x0), c1 = Math.cos(v.x1), s1 = Math.sin(v.x1);
      var general = 'y(x) = C_1\\cos x + C_2\\sin x';

      if (mode === 1) {
        prob = '\\begin{cases} y\' = y \\\\ y(' + x0 + ') = ' + k1 + ' \\end{cases}';
        sub = 'y(x) = Ce^{x}';
        step = 'y(' + x0 + ') = Ce^{' + x0 + '} = ' + k1 + ' \\implies C = ' + fmt(v.C);
        sol = 'y(x) = ' + combo([[v.C, 'e^{x}']]);
      } else if (mode === 2) {
        var sameX = Math.abs(v.x1 - v.x0) < 1e-9;
        prob = '\\begin{cases} y\'\' = -y \\\\ y(' + x0 + ') = ' + k1 + ' \\\\ y\'(' + x0 + ') = ' + (sameX ? '?' : k2) + ' \\end{cases}';
        sub = general;
        sol = sameX ? '' : 'y(x) = ' + combo([[v.C1, '\\cos x'], [v.C2, '\\sin x']]);
        if (sameX) { note = 'The orange point sets the slope, so it needs to sit to the left or right of the red point.'; }
        else {
          sub += ' \\implies \\begin{cases} C_1\\cos(' + x0 + ') + C_2\\sin(' + x0 + ') = ' + k1 +
                 ' \\\\ -C_1\\sin(' + x0 + ') + C_2\\cos(' + x0 + ') = ' + k2 + ' \\end{cases}';
          step = systemTex(c0, s0, -s0, c0, v.k1, v.k2) + constants();
        }
      } else {
        prob = '\\begin{cases} y\'\' = -y \\\\ y(' + x0 + ') = ' + k1 + ' \\\\ y(' + x1 + ') = ' + k2 + ' \\end{cases}';
        sub = general + ' \\implies \\begin{cases} C_1\\cos(' + x0 + ') + C_2\\sin(' + x0 + ') = ' + k1 +
              ' \\\\ C_1\\cos(' + x1 + ') + C_2\\sin(' + x1 + ') = ' + k2 + ' \\end{cases}';
        step = systemTex(c0, s0, c1, s1, v.k1, v.k2);
        if (v.Q === 1) {
          step += constants();
          sol = 'y(x) = ' + combo([[v.C1, '\\cos x'], [v.C2, '\\sin x']]);
        } else if (v.Q === 0) {
          sol = '\\text{No solution exists}';
          note = 'Every solution with y(x₀) = k₁ takes the same value at x₁, and the orange point is not there.';
        } else {
          sol = '\\text{Infinitely many solutions: } \\ y(x) = ' + combo([[v.k1, shift('\\cos', v.x0)], [1, 'c\\,' + shift('\\sin', v.x0)]]) + ', \\ c \\in \\R';
        }
      }

      var el = function (id) { return document.getElementById(id); };
      el('ib-calc-prob').innerHTML = '\\[' + prob + '\\]';
      el('ib-calc-sub').innerHTML = '\\[' + sub + '\\]';
      el('ib-calc-step').innerHTML = step ? '\\[' + step + '\\]' : '';
      el('ib-calc-sol').innerHTML = sol ? '\\[' + sol + '\\]' : '';
      el('ib-note').hidden = !note;
      el('ib-note').textContent = note;
      typesetMath([el('ib-calc-prob'), el('ib-calc-sub'), el('ib-calc-step'), el('ib-calc-sol')]);
    }

    var render = calcOnRest('ib-calc-prob', function () {
      if (['x0', 'k1', 'x1', 'y1'].some(function (k) { return isNaN(vals[k]); })) { return; }
      writeCalc();
    });

    [['x0', 'x_{0}'], ['k1', 'k_{1}'], ['x1', 'x_{1}'], ['y1', 'y_{1}'], ['k2', 'k_{2}'],
     ['C', 'C'], ['Q', 'Q'], ['C1', 'C_{1}'], ['C2', 'C_{2}']].forEach(function (pair) {
      var h = calc.HelperExpression({ latex: pair[1] });
      h.observe('numericValue', function () { vals[pair[0]] = h.numericValue; render(); });
    });

    // ── Mode ─────────────────────────────────────────────────────────────
    function setMode(s) {
      mode = s;
      calc.setExpression({ id: ID.s, latex: 's=' + s });
      // A hidden point can't be dragged, but its label stays unless turned off too.
      calc.setExpression({ id: ID.handle, hidden: s === 1, showLabel: s === 3 });

      document.querySelectorAll('.ib-mode').forEach(function (b) {
        var on = +b.getAttribute('data-s') === s;
        b.classList.toggle('site-btn--active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      document.getElementById('ib-cases').hidden = s !== 3;
      var hint = document.getElementById('ib-hint'), fam = document.getElementById('ib-family-hint');
      hint.innerHTML = HINT[s];
      fam.innerHTML = FAMILY_HINT[s];
      typesetMath([hint, fam]);
      render();
    }

    // Setting x to a number like pi/2 makes Desmos drop the slider's step, and the
    // point would then stop snapping to multiples of pi/12, so restate the bounds.
    var X_BOUNDS = { min: '-2\\pi', max: '2\\pi', step: '\\frac{\\pi}{12}' };
    function setVal(key, value) {
      var expr = { id: ID[key], latex: NAMES[key] + '=' + value };
      if (key === 'x0' || key === 'x1') { expr.sliderBounds = X_BOUNDS; }
      calc.setExpression(expr);
    }

    document.querySelectorAll('.ib-mode').forEach(function (b) {
      b.addEventListener('click', function () { setMode(+b.getAttribute('data-s')); });
    });

    document.getElementById('ib-family').addEventListener('click', function () {
      var on = !this.classList.contains('site-btn--active');
      this.classList.toggle('site-btn--active', on);
      this.setAttribute('aria-pressed', on ? 'true' : 'false');
      calc.setExpression({ id: ID.family, hidden: !on });
    });

    // The lecture's three cases. Plain numbers rather than \pi: Desmos only
    // lets a point drag a variable that is set to a number.
    var X1 = { 'pi/2': Math.PI / 2, '2pi': 2 * Math.PI };
    document.querySelectorAll('.ib-case').forEach(function (b) {
      b.addEventListener('click', function () {
        setVal('x0', 0);
        setVal('k1', b.getAttribute('data-k1'));
        setVal('x1', X1[b.getAttribute('data-x1')]);
        setVal('y1', b.getAttribute('data-k2'));
      });
    });

    document.getElementById('ib-reset').addEventListener('click', function () {
      Object.keys(DEFAULT).forEach(function (k) { setVal(k, DEFAULT[k]); });
      setMode(1);
    });

    setMode(1);
  };
</script>

<!--below-graph-->

<details class="desmos-calc-drop ib-calc">
  <summary>Solving for the constants</summary>
  <div class="ib-calc-row">
    <div class="ib-calc-math" id="ib-calc-prob"></div>
    <div class="ib-calc-math" id="ib-calc-sub"></div>
  </div>
  <div class="ib-calc-math" id="ib-calc-step"></div>
  <div class="ib-calc-math" id="ib-calc-sol"></div>
  <p class="ib-note" id="ib-note" hidden></p>
</details>

<!--writeup-->

<div class="latex-body">
An $n^{\text{th}}$ differential equation usually has infinitely many solutions, parameterized by $n$ different values (consequentially, the set of solutions can be viewed as a subset of $\R^n$). For examples, the equation $y' = y$ is solved by $y(x) = Ce^x$ for every constant $C$, and the equation $y'' = -y$ is solved by $y(x) = C_1\cos x + C_2\sin x$ for every pair of constants $C_1, C_2$. These sets of all solutions are the \textbf{general solutions}. To single out a \textbf{particular solution}, we (often) need $n$ extra conditions. 

In the graph, the blue curve is \text{the} solution, satisfying both the underlying DE and the conditions in place. The faint curves are the other members of the family it was picked from. Notably, the red and orange points will give us those initial or boundary conditions which single out a particular solution. 

\begin{definition}
An \textbf{initial value problem (IVP)} is a differential equation together with conditions on the solution and its derivatives, all at a single initial point $x_0$. For a second order equation, we may have
$$\begin{cases} y'' = -y \\ y(x_0) = k_1 \\ y'(x_0) = k_2. \end{cases}$$
\end{definition}

So the initial conditions specify the \emph{value} of the solution at $x_0$ and its \emph{slope} at $x_0$. In the first order case, there is just one constant to determine, and so just one condition needed: e.g. $y' = y$, $y(0) = 2$ gives $C = 2$, and the solution is $y(x) = 2e^x$.

\begin{definition}
A \textbf{boundary value problem (BVP)} is a differential equation together with value conditions at two different points, such as
$$\begin{cases} y'' = -y \\ y(x_0) = k_1 \\ y(x_1) = k_2. \end{cases}$$
\end{definition}

Because we are constraining two different values at two different points of the \textit{same equation}, we note a drastic change in behavior. In the former problem, choosing an initial value and initial slope always gave a unique solution. However, in the latter boundary problem, we may not have this luxury. Not surprisingly, this comes down to linear algebra (and really the linear independence or dependence, as funcitons, of $y(x)$ and $y'(x)$, or in the BVP $y(x)$ and $y(x)$). Imposing the boundary conditions on $y(x) = C_1\cos x + C_2\sin x$ gives a system of two linear equations in the unknowns $C_1, C_2$, and everything we know about solving $A\mathbf{x} = \mathbf{b}$ applies.

\begin{proposition}
For $y'' = -y$, the initial value problem above has exactly one solution for all $x_0, k_1, k_2$. The boundary value problem has
\begin{itemize}
  \item exactly one solution, if $x_1 - x_0$ is not an integer multiple of $\pi$;
  \item otherwise, with $x_1 - x_0 = n\pi$, infinitely many solutions if $k_2 = (-1)^n k_1$, and no solutions if not.
\end{itemize}
\end{proposition}

\begin{proof}
Using $y'(x) = -C_1\sin x + C_2\cos x$, the two problems ask us to solve
$$\underbrace{\begin{bmatrix} \cos x_0 & \sin x_0 \\ -\sin x_0 & \cos x_0 \end{bmatrix}}_{\text{IVP}} \begin{bmatrix} C_1 \\ C_2 \end{bmatrix} = \begin{bmatrix} k_1 \\ k_2 \end{bmatrix},$$
$$\underbrace{\begin{bmatrix} \cos x_0 & \sin x_0 \\ \cos x_1 & \sin x_1 \end{bmatrix}}_{\text{BVP}} \begin{bmatrix} C_1 \\ C_2 \end{bmatrix} = \begin{bmatrix} k_1 \\ k_2 \end{bmatrix}.$$
The IVP matrix has determinant $\cos^2 x_0 + \sin^2 x_0 = 1$, so it is always nonsingular and there is always exactly one solution. The BVP matrix has determinant
$$\cos x_0 \sin x_1 - \sin x_0 \cos x_1 = \sin(x_1 - x_0),$$
which is nonzero unless $x_1 - x_0 = n\pi$. In that case, $\cos x_1 = (-1)^n\cos x_0$ and $\sin x_1 = (-1)^n\sin x_0$, so the second row of the matrix is $(-1)^n$ times the first. The system is then consistent exactly when $k_2 = (-1)^n k_1$. If so, there is a free variable and so infinitely many solutions. If not, there are none.
\end{proof}

</div>
