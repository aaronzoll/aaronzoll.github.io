---
layout: desmos-graph
title: "Linear First Order Differential Equations"
desmos_json: "linear_first_order.json"
desmos_url: "https://www.desmos.com/calculator/qsvgevkwo0"
side_controls: true
---

<div class="lf-panel" id="lf-panel">

  <span class="lf-label">Equation</span>
  <div class="lf-presets">
    <button class="site-btn site-btn--active lf-preset" data-preset="0">\(y' - 2xy = x\)</button>
    <button class="site-btn lf-preset" data-preset="1">\(y' + y = \sin x\)</button>
    <button class="site-btn lf-preset" data-preset="2">\(y' + 2y = 4\)</button>
    <button class="site-btn lf-preset" data-preset="3">\(y' + 2xy = x\)</button>
    <button class="site-btn lf-preset" data-preset="4">\(y' - y = 0\)</button>
  </div>

  <div class="lf-custom">
    <span class="lf-custom-label">Custom</span>
    <label class="lf-field"><span>\(P(x) =\)</span>
      <input class="lf-input" id="lf-P" type="text" placeholder="x^2" autocomplete="off" spellcheck="false"></label>
    <label class="lf-field"><span>\(q(x) =\)</span>
      <input class="lf-input" id="lf-q" type="text" placeholder="\cos(x)" autocomplete="off" spellcheck="false"></label>
    <button class="lf-apply" id="lf-apply">Apply</button>
    <span class="lf-custom-note">Here, \(P\) is an antiderivative of \(p\). Use LaTeX in the variable \(x\) (e.g. x^2, \sin(x), e^{-x}). Both must be defined at \(x = 0\), for the numerics to work well.</span>
    <p class="lf-note" id="lf-error" hidden></p>
  </div>

  <hr class="desmos-divider">

  <span class="lf-label">Display</span>
  <button class="site-btn site-btn--active lf-toggle lf-wide" aria-pressed="true" data-folder="16">Family of solutions</button>
  <button class="site-btn lf-toggle lf-wide" aria-pressed="false" data-folder="18">\(y_h\) and \(y_p\)</button>

  <hr class="desmos-divider">

  <button class="site-btn lf-wide" id="lf-reset">Reset</button>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .lf-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lf-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .lf-panel .site-btn {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .lf-wide { width: 100%; }

  .lf-presets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }

  /* Same dashed box as the function entry on the Runge Kutta page. */
  .lf-custom {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem 0.6rem;
    border: 2px dashed #c8c8c8;
    border-radius: 4px;
    background: #fafafa;
  }

  .lf-custom-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
  }

  .lf-field {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .lf-input {
    flex: 1;
    width: auto;
    min-width: 0;
    margin: 0;
    padding: 0.28rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
    border: 1px solid var(--color-wood);
    border-radius: 3px;
    background: #fff;
    color: #1a1a1a;
  }

  .lf-input:focus {
    outline: 2px solid var(--color-wood);
    outline-offset: 1px;
  }

  .lf-apply {
    align-self: flex-end;
    padding: 0.28rem 0.7rem;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid var(--color-wood);
    background: var(--color-wood-bg);
    color: var(--color-wood-ink);
    border-radius: 3px;
    transition: background 0.12s;
  }

  .lf-apply:hover { background: var(--color-wood-bg-hover); }

  .lf-custom-note {
    font-size: 0.72rem;
    color: #888;
    font-style: italic;
  }

  .lf-note {
    margin: 0;
    font-size: 0.85rem;
    color: #b7472a;
  }

  /* Live calculation under the graph. */
  .lf-calc {
    margin-top: 0.75rem;
    text-align: center;
  }

  .lf-calc .lf-label {
    display: block;
    text-align: left;
  }

  .lf-calc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 3em;
  }

  /* One derivation continuing across the gap, so it sits closer together. */
  .lf-calc-row--chain { column-gap: 0.5em; }

  .lf-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .lf-calc-math mjx-container[display="true"] {
    margin: 0.5em 0;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from linear_first_order.json ──────────────────────
    var ID = { P: '3', q: '5', I: '12', x0: '7', k: '8' };
    var I_NUMERIC = '\\int_{0}^{x}m\\left(t\\right)q\\left(t\\right)dt';
    var GREEN = '#388c46', ORANGE = '#fa7e19';

    // The graph evaluates y = (I(x) + C)/m(x) for every equation. The only thing
    // a preset adds is I(x), the integral of m(x)q(x) worked out by hand with the
    // simplest antiderivative, which is exact and spares the graph the integration.
    var PRESETS = [
      { P: '-x^{2}', q: 'x', I: '-\\frac{1}{2}e^{-x^{2}}',
        eq: "y' - 2xy = x", mTex: 'e^{-x^2}', iTex: '-\\frac{1}{2}e^{-x^2}', hTex: 'e^{x^2}', pTex: '-\\frac{1}{2}' },
      { P: 'x', q: '\\sin\\left(x\\right)', I: '\\frac{1}{2}e^{x}\\left(\\sin\\left(x\\right)-\\cos\\left(x\\right)\\right)',
        eq: "y' + y = \\sin x", mTex: 'e^{x}', iTex: '\\frac{1}{2}e^{x}(\\sin x - \\cos x)', hTex: 'e^{-x}', pTex: '\\frac{\\sin x - \\cos x}{2}' },
      { P: '2x', q: '4', I: '2e^{2x}',
        eq: "y' + 2y = 4", mTex: 'e^{2x}', iTex: '2e^{2x}', hTex: 'e^{-2x}', pTex: '2' },
      { P: 'x^{2}', q: 'x', I: '\\frac{1}{2}e^{x^{2}}',
        eq: "y' + 2xy = x", mTex: 'e^{x^2}', iTex: '\\frac{1}{2}e^{x^2}', hTex: 'e^{-x^2}', pTex: '\\frac{1}{2}' },
      { P: '-x', q: '0', I: '0',
        eq: "y' - y = 0", mTex: 'e^{-x}', iTex: '0', hTex: 'e^{x}', pTex: '0' }
    ];

    var current = PRESETS[0];      // null while a custom equation is showing
    var custom = { P: '', q: '' };
    var vals = { x0: NaN, k: NaN, C: NaN, m0: NaN, I0: NaN };

    // Simplified numbers: halves and quarters as fractions, like the lecture's
    // constants; otherwise no trailing zeros, and scientific notation when two
    // decimals would hide the value (m(x_0) can be huge or tiny once x_0 moves).
    function fmt(x) {
      if (!isFinite(x)) { return '\\text{undefined}'; }
      var quarters = 4 * Math.abs(x), whole = Math.round(quarters);
      if (Math.abs(quarters - whole) < 1e-9 && whole % 4 !== 0 && Math.abs(x) < 1e5) {
        var den = whole % 2 === 0 ? 2 : 4, num = den === 2 ? whole / 2 : whole;
        return (x < 0 ? '-' : '') + '\\frac{' + num + '}{' + den + '}';
      }
      if (x !== 0 && (Math.abs(x) >= 1e5 || Math.abs(x) < 0.01)) {
        var e = x.toExponential(2).split('e');
        return e[0].replace(/\.?0+$/, '') + ' \\times 10^{' + parseInt(e[1], 10) + '}';
      }
      var s = (Math.round(x * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
      return s === '-0' ? '0' : s;
    }
    function paren(x) {          // a factor that needs parentheses when negative
      return x < 0 ? '(' + fmt(x) + ')' : fmt(x);
    }
    // c times a function: drops a coefficient of 1 and a term with coefficient 0.
    function times(c, tex) {
      var s = fmt(c);
      return s === '0' ? '0' : s === '1' ? tex : s === '-1' ? '-' + tex : s + '\\,' + tex;
    }

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // A typed sin(x) would read as s*i*n*(x) to Desmos.
    function toLatex(s) {
      return s.trim()
        .replace(/(^|[^\\a-zA-Z])(sin|cos|tan|ln|log)(?![a-zA-Z])/g, '$1\\$2')
        .replace(/\*/g, '\\cdot ');
    }

    function color(hex, tex) { return '{\\color{' + hex + '}' + tex + '}'; }

    // ── Live calculation ─────────────────────────────────────────────────
    var render = calcOnRest('lf-calc-eq', function () {
      if (isNaN(vals.x0) || isNaN(vals.k)) { return; }
      var v = vals, x0 = fmt(v.x0), k = fmt(v.k), eq, mid, yp, yh, pFinal, hUnit;

      if (current) {
        eq = current.eq;
        mid = 'm(x) = ' + current.mTex + ', \\quad I(x) = ' + current.iTex;
        yp = '\\frac{' + current.iTex + '}{' + current.mTex + '} = ' + current.pTex;
        pFinal = current.pTex;
        hUnit = current.hTex;
      } else {
        eq = "y' + p(x)y = " + custom.q + ', \\quad p(x) = \\frac{d}{dx}\\left(' + custom.P + '\\right)';
        mid = 'm(x) = e^{' + custom.P + '}, \\quad I(x) = \\int_{0}^{x} m(t)q(t)\\,dt';
        yp = 'e^{-(' + custom.P + ')}\\,I(x)';
        pFinal = yp;
        hUnit = 'e^{-(' + custom.P + ')}';
      }

      // Green and orange are the dashed curves' colors on the graph.
      var hFinal = times(v.C, hUnit);
      var sol = hFinal === '0' ? color(ORANGE, pFinal)
              : pFinal === '0' ? color(GREEN, hFinal)
              : pFinal.charAt(0) === '-' ? color(GREEN, hFinal) + ' - ' + color(ORANGE, pFinal.slice(1))
              : color(GREEN, hFinal) + ' + ' + color(ORANGE, pFinal);

      var el = function (id) { return document.getElementById(id); };
      el('lf-calc-eq').innerHTML = '\\[\\begin{cases} ' + eq + ' \\\\ y(' + x0 + ') = ' + k + ' \\end{cases}\\]';
      el('lf-calc-m').innerHTML = '\\[' + mid + '\\]';
      el('lf-calc-yp').innerHTML = '\\[' + color(ORANGE, 'y_p(x)') + ' = \\frac{I(x)}{m(x)} = ' + color(ORANGE, yp) + '\\]';
      el('lf-calc-yh').innerHTML = '\\[' + color(GREEN, 'y_h(x)') + ' = \\frac{C}{m(x)} = ' + color(GREEN, 'C\\,' + hUnit) + '\\]';
      el('lf-calc-c1').innerHTML = '\\[y(' + x0 + ') = ' + k + ' \\implies \\frac{C + I(' + x0 + ')}{m(' + x0 + ')} = ' + k + '\\]';
      el('lf-calc-c2').innerHTML = '\\[\\implies C = k\\,m(x_0) - I(x_0) = (' + k + ')(' + fmt(v.m0) + ') - ' + paren(v.I0) + ' = ' + fmt(v.C) + '\\]';
      el('lf-calc-sol').innerHTML = '\\[y(x) = ' + color(GREEN, 'y_h(x)') + ' + ' + color(ORANGE, 'y_p(x)') + ' = ' + sol + '\\]';
      typesetMath(['lf-calc-eq', 'lf-calc-m', 'lf-calc-yp', 'lf-calc-yh', 'lf-calc-c1', 'lf-calc-c2', 'lf-calc-sol'].map(el));
    });

    var hx0 = calc.HelperExpression({ latex: 'x_{0}' });
    hx0.observe('numericValue', function () { vals.x0 = hx0.numericValue; render(); });
    var hk = calc.HelperExpression({ latex: 'k' });
    hk.observe('numericValue', function () { vals.k = hk.numericValue; render(); });
    var hC = calc.HelperExpression({ latex: 'C' });
    hC.observe('numericValue', function () { vals.C = hC.numericValue; render(); });
    var hm0 = calc.HelperExpression({ latex: 'm\\left(x_{0}\\right)' });
    hm0.observe('numericValue', function () { vals.m0 = hm0.numericValue; render(); });
    var hI0 = calc.HelperExpression({ latex: 'I\\left(x_{0}\\right)' });
    hI0.observe('numericValue', function () { vals.I0 = hI0.numericValue; render(); });

    // ── Equation ─────────────────────────────────────────────────────────
    function setEquation(P, q, I) {
      calc.setExpression({ id: ID.P, latex: 'P\\left(x\\right)=' + P });
      calc.setExpression({ id: ID.q, latex: 'q\\left(x\\right)=' + q });
      calc.setExpression({ id: ID.I, latex: 'I\\left(x\\right)=' + I });
    }

    var presetBtns = document.querySelectorAll('.lf-preset');
    function markPreset(btn) {
      presetBtns.forEach(function (b) { b.classList.toggle('site-btn--active', b === btn); });
    }

    function usePreset(i) {
      current = PRESETS[i];
      setEquation(current.P, current.q, current.I);
      markPreset(presetBtns[i]);
      document.getElementById('lf-error').hidden = true;
      render();
    }

    presetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () { usePreset(+btn.getAttribute('data-preset')); });
    });

    // ── Custom equation ──────────────────────────────────────────────────
    var inP = document.getElementById('lf-P'), inq = document.getElementById('lf-q');
    function applyCustom() {
      var P = toLatex(inP.value), q = toLatex(inq.value);
      if (!P || !q) { return; }
      custom = { P: P, q: q };
      current = null;
      setEquation(P, q, I_NUMERIC);
      markPreset(null);
      render();
    }
    document.getElementById('lf-apply').addEventListener('click', applyCustom);
    [inP, inq].forEach(function (inp) {
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { applyCustom(); } });
    });

    // Desmos fires 'change' before it refreshes its analysis, and the refresh can
    // take seconds with no further event, so keep looking for a little while.
    function checkError() {
      var a = calc.expressionAnalysis, bad = (a[ID.P] && a[ID.P].isError) || (a[ID.q] && a[ID.q].isError);
      var el = document.getElementById('lf-error');
      el.hidden = !bad;
      if (bad) { el.textContent = 'That expression could not be read. Check the LaTeX and use x as the variable.'; }
    }
    var errorPoll;
    calc.observeEvent('change', function () {
      var looks = 0;
      clearInterval(errorPoll);
      errorPoll = setInterval(function () {
        checkError();
        if (++looks >= 16) { clearInterval(errorPoll); }
      }, 500);
    });

    // ── Display toggles ──────────────────────────────────────────────────
    document.querySelectorAll('.lf-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = !btn.classList.contains('site-btn--active');
        btn.classList.toggle('site-btn--active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: !on });
      });
    });

    document.getElementById('lf-reset').addEventListener('click', function () {
      calc.setExpression({ id: ID.x0, latex: 'x_{0}=0' });
      calc.setExpression({ id: ID.k, latex: 'k=1' });
      inP.value = '';
      inq.value = '';
      usePreset(0);
    });

    typesetMath([document.getElementById('lf-panel')]);
    usePreset(0);
  };
</script>

<!--below-graph-->

<details class="desmos-calc-drop lf-calc">
  <summary>Solving the equation</summary>
  <div class="lf-calc-row">
    <div class="lf-calc-math" id="lf-calc-eq"></div>
    <div class="lf-calc-math" id="lf-calc-m"></div>
  </div>
  <div class="lf-calc-row">
    <div class="lf-calc-math" id="lf-calc-yp"></div>
    <div class="lf-calc-math" id="lf-calc-yh"></div>
  </div>
  <div class="lf-calc-row lf-calc-row--chain">
    <div class="lf-calc-math" id="lf-calc-c1"></div>
    <div class="lf-calc-math" id="lf-calc-c2"></div>
  </div>
  <div class="lf-calc-math" id="lf-calc-sol"></div>
</details>

<!--writeup-->

<div class="latex-body">
A first order differential equation is \textbf{linear} if the unknown function and its derivative only appear to the first power (recall, now functions are out unknowns), with coefficients depending on $x$ alone (as $x$ is not the variable to be solved for, $y(x)$ is). Unlike most differential equations, these can always be solved by a single formula (at least up to computing an integral).

\begin{definition}
A linear first order differential equation is in \textbf{standard form} when it is of the type
$$y' + p(x)y = q(x),$$
that is, when the coefficient of $y'$ is equal to one. It is \textbf{homogeneous} if $q(x) = 0$ and \textbf{non-homogeneous} otherwise.
\end{definition}


The method of solution hinges on a clever multiplication.

\begin{definition}
An \textbf{integrating factor} for $y' + p(x)y = q(x)$ is
$$m(x) = \exp\left\{\int p(x)\,dx\right\}.$$
\end{definition}

The antiderivative is only defined up to an additive constant, which is why this is \emph{an} integrating factor and not \emph{the} integrating factor. In problems, we just choose the simplest one, as this factor is the solution to a linear homogenous equation, so any additive constant in $\int p(x)\,dx$ becomes multiplicative after exponentiating. Linearity, and the fact that a constant-scaled solution is still a solution (to the homogeneous equation) lets us ignore our $+C$ in $m(x)$.

One thing to note, by the chain rule, $m' = mp$, and this is the only property of $m$ we need. This will let us turn our standard form, first-order, linear, non-homogeneous equation into something much more tractable, where we are just an antiderivative and a division away from a solution. 

\begin{theorem}
The general solution to $y' + p(x)y = q(x)$ is
$$y(x) = \frac{1}{m(x)}\left\{\int m(x)q(x)\,dx + C\right\},$$
where $C$ is an arbitrary constant.
\end{theorem}

\begin{proof}
As promised, we solve this by multiplying both sides by $m$. As a result, we have $$my'+mpy = mq.$$

Now this may not seem any better, but let's take a closer look at the left hand side. Here, we have $$\underbrace{e^{\int p(x)dx}}_{\color{CarnationPink} \text{function}}\underbrace{y'}_{\color{Cornflowerblue} \text{derivative}} + \underbrace{p(x)e^{\int p(x)dx}}_{\color{Cornflowerblue} \text{derivative}}\underbrace{y}_{\color{CarnationPink} \text{function}},$$
which is precise of the form $fg'+f'g$ where $f(x) = m(x)$ and $g(x) = y(x)$. That is, we have a product rule written in full. So, we can rewrite the equation as $$[my]' = mq.$$

To conclude, we just note that the product $my$ is an antiderivative of $mq$, meaning $my = \int mq\,dx + C$. Now, we cannot ignore that "$+C$" term, as we are no longer dealing with homogeneous solutions. Regardless, we finish by dividing by $m$, giving the result.
\end{proof}

For example, $y' - 2xy = x$ has $p(x) = -2x$ and $q(x) = x$, so we choose $m(x) = e^{-x^2}$. A substitution $u = x^2$ gives $\int xe^{-x^2}dx = -\tfrac{1}{2}e^{-x^2}$, and so
$$y(x) = \frac{1}{e^{-x^2}}\left\{-\frac{1}{2}e^{-x^2} + C\right\} = Ce^{x^2} - \frac{1}{2}.$$

\subsection*{Homogeneous and particular parts}

Let $I(x)$ be an antiderivative of $m(x)q(x)$. Distributing the $\tfrac{1}{m(x)}$ in the theorem splits the solution into two pieces,
$$y(x) = \underbrace{\frac{C}{m(x)}}_{y_h(x)} + \underbrace{\frac{I(x)}{m(x)}}_{y_p(x)}.$$
Here $y_h$ is the general solution to the homogeneous equation $y' + p(x)y = 0$, while $y_p$ is one particular solution to the original equation. The initial condition only decides the constant, $C = k\,m(x_0) - I(x_0)$, so dragging the red point only changes $y_h$: the orange curve representing the particular solutions (toggle with the adjacent button) stays put.

\begin{remark}
The theorem asks for \emph{some} antiderivative $I(x)$, and this freedom gives an analytical advantage: when a clean integral exists, we can choose the cleanest choice. For $y' - 2xy = x$, taking $I(x) = -\tfrac{1}{2}e^{-x^2}$ gives the constant particular solution $y_p = -\tfrac{1}{2}$, whereas taking $I(x) = \int_0^x te^{-t^2}dt = \tfrac{1}{2} - \tfrac{1}{2}e^{-x^2}$ gives $y_p = \tfrac{1}{2}e^{x^2} - \tfrac{1}{2}$. Both are correct: they differ by a multiple of $\tfrac{1}{m(x)}$, which only changes the value of $C$.
\end{remark}

\begin{remark}
This is the same structure as a linear system. The differential equation can be written $L[y] = q$, where $L[y] = y' + py$ is a linear operator, so that $L[f + g] = L[f] + L[g]$ and $L[cf] = cL[f]$. If $y_p$ is one solution and $y$ is any other, then $L[y - y_p] = q - q = 0$, so $y - y_p$ solves the homogeneous equation. That is, the full set of solutions is
$$y_p + \{\text{solutions of } L[y] = 0\},$$
in exact analogy with the solutions of $A\mathbf{x} = \mathbf{b}$ being $\mathbf{x}_p + \mathcal{N}(A)$, as on the <a href="/desmos/null-space-range">Null Space and Range</a> page. Just as with $\mathbf{x}_p$, any one solution can play the role of $y_p$, which is exactly the freedom in the remark above.
\end{remark}


</div>
