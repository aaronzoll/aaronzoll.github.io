---
layout: desmos-graph
title: "Second Order Runge Kutta Methods"
desmos_json: "second_order_RK_methods.json"
desmos_url: "https://www.desmos.com/calculator/klapw9uire"
side_controls: true
---

<div class="rk2-stack">

  <span class="rk2-label">Function <span style="text-transform:none">f(t, u)</span></span>

  <div class="rk2-presets">
    <button class="site-btn rk2-fn-btn" data-latex="\sin\left(u\right)">sin(u)</button>
    <button class="site-btn rk2-fn-btn" data-latex="\sin\left(t\right)">sin(t)</button>
    <button class="site-btn rk2-fn-btn" data-latex="u">u</button>
    <button class="site-btn rk2-fn-btn" data-latex="-u">−u</button>
    <button class="site-btn rk2-fn-btn" data-latex="t-u">t − u</button>
    <button class="site-btn rk2-fn-btn" data-latex="u\left(2-u\right)">u(2−u)</button>
  </div>

  <div class="rk2-custom-section">
    <span class="rk2-custom-label">Custom</span>
    <div class="rk2-custom-row">
      <input class="rk2-custom-input" id="rk2-custom-fn" type="text"
             placeholder="\sin(t), t^2-u, …" autocomplete="off" spellcheck="false">
      <button class="rk2-action-btn" id="rk2-apply-fn">Apply</button>
    </div>
    <span class="rk2-custom-note">Use LaTeX with variables t and u (e.g. u\sin(t), t^2+u, e^{-t}u).</span>
  </div>

  <button class="rk2-reset-btn" id="rk2-reset-fn">Reset to default</button>

  <hr class="desmos-divider">

  <span class="rk2-label">Step Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(N\) = <strong id="rk2-n-val">10</strong></span>
    <input class="site-slider" id="rk2-n-slider" type="range"
           min="1" max="20" step="1" value="10"
           data-val-id="rk2-n-val" data-decimals="0">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(i\) = <strong id="rk2-i-val">0</strong></span>
    <input class="site-slider" id="rk2-i-slider" type="range"
           min="0" max="9" step="1" value="0"
           data-val-id="rk2-i-val" data-decimals="0">
  </div>

  <hr class="desmos-divider">

  <span class="rk2-label">Visual Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">Arrow length = <strong id="rk2-arrow-val">0.40</strong></span>
    <input class="site-slider" id="rk2-arrow-slider" type="range"
           min="0" max="1" step="0.01" value="0.4"
           data-val-id="rk2-arrow-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Field opacity = <strong id="rk2-opacity-val">0.33</strong></span>
    <input class="site-slider" id="rk2-opacity-slider" type="range"
           min="0" max="1" step="0.01" value="0.334"
           data-val-id="rk2-opacity-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Grid points \(N_x\) = <strong id="rk2-nx-val">25</strong></span>
    <input class="site-slider" id="rk2-nx-slider" type="range"
           min="1" max="100" step="1" value="25"
           data-val-id="rk2-nx-val" data-decimals="0">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Grid spacing \(d_x\) = <strong id="rk2-dx-val">0.50</strong></span>
    <input class="site-slider" id="rk2-dx-slider" type="range"
           min="0" max="2" step="0.01" value="0.5"
           data-val-id="rk2-dx-val" data-decimals="2">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .rk2-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rk2-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .rk2-method-btn {
    width: 100%;
  }

  #rk2-alpha-wrap {
    padding-left: 0.25rem;
  }

  .rk2-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .rk2-presets .site-btn {
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
    font-family: monospace;
    min-width: 0;
  }

  .rk2-custom-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem 0.6rem;
    border: 2px dashed #c8c8c8;
    border-radius: 4px;
    background: #fafafa;
  }

  .rk2-custom-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
  }

  .rk2-custom-row {
    display: flex;
    gap: 0.4rem;
  }

  .rk2-custom-input {
    flex: 1;
    min-width: 0;
    padding: 0.28rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
    border: 1px solid #a67b5b;
    border-radius: 3px;
    background: #fff;
    color: #1a1a1a;
  }

  .rk2-custom-input:focus {
    outline: 2px solid #a67b5b;
    outline-offset: 1px;
  }

  .rk2-action-btn {
    padding: 0.28rem 0.7rem;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid #a67b5b;
    background: #fdf6ee;
    color: #3b1f00;
    border-radius: 3px;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .rk2-action-btn:hover {
    background: #f0e0ca;
  }

  .rk2-custom-note {
    font-size: 0.72rem;
    color: #888;
    font-style: italic;
  }

  .rk2-reset-btn {
    align-self: flex-start;
    padding: 0.22rem 0.6rem;
    font-size: 0.75rem;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #f7f7f7;
    color: #555;
    border-radius: 3px;
    transition: background 0.12s;
  }

  .rk2-reset-btn:hover {
    background: #ececec;
  }
</style>

<!--below-graph-->

<div class="rk2-method-bar">

  <span class="rk2-label">Method</span>

  <div class="rk2-method-row">
    <button class="site-btn site-btn--active rk2-method-btn">Improved Euler</button>
    <button class="site-btn rk2-method-btn">Modified Euler</button>
    <button class="site-btn rk2-method-btn">Ralston Method</button>
    <button class="site-btn rk2-method-btn">General Two Step</button>
  </div>

  <div id="rk2-alpha-wrap" style="display:none">
    <div class="desmos-param" style="max-width:320px">
      <span class="desmos-param-label">\(\alpha\) = <strong id="rk2-alpha-val">0.64</strong></span>
      <input class="site-slider" id="rk2-alpha-slider" type="range"
             min="0.01" max="1" step="0.01" value="0.643"
             data-val-id="rk2-alpha-val" data-decimals="2">
    </div>
    <p class="rk2-alpha-note">\(\alpha\) represents how far along the next step the second velocity is computed.</p>
  </div>

</div>

<style>
  .rk2-method-bar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem 0 0.25rem;
  }
  .rk2-method-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .rk2-method-row .rk2-method-btn {
    flex: 1;
    width: auto;
    min-width: 130px;
  }
  .rk2-alpha-note {
    margin: 0;
    font-size: 0.8rem;
    color: #555;
    font-style: italic;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    // ── Function f(t, u) selector ─────────────────────────────────────────
    var RK2_DEFAULT_FN = 'f\\left(t,u\\right)\\ =u\\sin\\left(t\\right)';

    function setRkFunction(latex) {
      calc.setExpression({ id: '3', latex: 'f\\left(t,u\\right)=' + latex });
    }

    function setActiveFnBtn(btn) {
      document.querySelectorAll('.rk2-fn-btn').forEach(function(b) {
        b.classList.remove('site-btn--active');
      });
      if (btn) btn.classList.add('site-btn--active');
    }

    document.querySelectorAll('.rk2-fn-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setRkFunction(btn.getAttribute('data-latex'));
        document.getElementById('rk2-custom-fn').value = '';
        setActiveFnBtn(btn);
      });
    });

    var rkCustomInput = document.getElementById('rk2-custom-fn');
    document.getElementById('rk2-apply-fn').addEventListener('click', function() {
      var val = rkCustomInput.value.trim();
      if (!val) return;
      setRkFunction(val);
      setActiveFnBtn(null);
    });
    rkCustomInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('rk2-apply-fn').click();
    });

    document.getElementById('rk2-reset-fn').addEventListener('click', function() {
      calc.setExpression({ id: '3', latex: RK2_DEFAULT_FN });
      rkCustomInput.value = '';
      setActiveFnBtn(null);
    });

    // ── Expression IDs from second_order_RK_methods.json ─────────────────
    var ID = {
      N:     '119',
      i:     '104',
      alpha: '155',
      c1:    '40',
      a11:   '122',
      b1:    '123',
      b2:    '124',
      arrow:   '200',
      opacity: '90',
      nx:      '79',
      dx:      '81'
    };

    // ── Butcher tableau for each fixed method ─────────────────────────────
    var PARAMS = {
      'Improved Euler': { c1: '\\frac{1}{2}', a11: '\\frac{1}{2}', b1: '0',            b2: '1'            },
      'Modified Euler': { c1: '1',            a11: '1',            b1: '\\frac{1}{2}',  b2: '\\frac{1}{2}' },
      'Ralston Method': { c1: '\\frac{2}{3}', a11: '\\frac{2}{3}', b1: '\\frac{1}{4}', b2: '\\frac{3}{4}' }
    };

    // ── Helpers ───────────────────────────────────────────────────────────
    function applyParams(p) {
      calc.setExpression({ id: ID.c1,  latex: 'c_{1}='  + p.c1  });
      calc.setExpression({ id: ID.a11, latex: 'a_{11}=' + p.a11 });
      calc.setExpression({ id: ID.b1,  latex: 'b_{1}='  + p.b1  });
      calc.setExpression({ id: ID.b2,  latex: 'b_{2}='  + p.b2  });
    }

    function applyAlpha(alpha) {
      calc.setExpression({ id: ID.alpha, latex: '\\alpha=' + alpha });
      calc.setExpression({ id: ID.c1,   latex: 'c_{1}='    + alpha });
      calc.setExpression({ id: ID.a11,  latex: 'a_{11}='   + alpha });
      calc.setExpression({ id: ID.b1,   latex: 'b_{1}='    + (1 - 1 / (2 * alpha)) });
      calc.setExpression({ id: ID.b2,   latex: 'b_{2}='    + (1 / (2 * alpha))     });
    }

    // ── Stop the ticker (JSON has it playing by default) ──────────────────
    // We drive G_{eneralTwoStep} manually via applyAlpha, so the ticker is
    // never needed and would otherwise override fixed-method parameters.
    function stopTicker() {
      var state = calc.getState();
      if (state.expressions && state.expressions.ticker) {
        state.expressions.ticker.playing = false;
        calc.setState(state, { allowUndo: false });
      }
    }

    // ── Initialise: Improved Euler ────────────────────────────────────────
    stopTicker();
    applyParams(PARAMS['Improved Euler']);
    calc.setExpression({ id: ID.N, latex: 'N=10' });
    calc.setExpression({ id: ID.i, latex: 'i=0'  });

    // ── Method toggle buttons ─────────────────────────────────────────────
    var btns = document.querySelectorAll('.rk2-method-btn');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        btns.forEach(function(b) { b.classList.remove('site-btn--active'); });
        btn.classList.add('site-btn--active');

        var label = btn.textContent.trim();
        var alphaWrap = document.getElementById('rk2-alpha-wrap');

        if (label === 'General Two Step') {
          alphaWrap.style.display = '';
          applyAlpha(parseFloat(document.getElementById('rk2-alpha-slider').value));
        } else {
          alphaWrap.style.display = 'none';
          applyParams(PARAMS[label]);
        }
      });
    });

    // ── Alpha slider ──────────────────────────────────────────────────────
    document.getElementById('rk2-alpha-slider').addEventListener('input', function() {
      var alpha = parseFloat(this.value);
      document.getElementById('rk2-alpha-val').textContent = alpha.toFixed(2);
      applyAlpha(alpha);
    });

    // ── N slider ──────────────────────────────────────────────────────────
    var nSlider = document.getElementById('rk2-n-slider');
    var iSlider = document.getElementById('rk2-i-slider');

    nSlider.addEventListener('input', function() {
      var n = parseInt(this.value, 10);
      document.getElementById('rk2-n-val').textContent = n;
      calc.setExpression({ id: ID.N, latex: 'N=' + n });
      iSlider.max = n - 1;
      if (parseInt(iSlider.value, 10) > n - 1) {
        iSlider.value = n - 1;
        document.getElementById('rk2-i-val').textContent = n - 1;
        calc.setExpression({ id: ID.i, latex: 'i=' + (n - 1) });
      }
    });

    // ── i slider ──────────────────────────────────────────────────────────
    iSlider.addEventListener('input', function() {
      var i = parseInt(this.value, 10);
      document.getElementById('rk2-i-val').textContent = i;
      calc.setExpression({ id: ID.i, latex: 'i=' + i });
    });

    // ── Visual parameter sliders ──────────────────────────────────────────
    [
      { id: 'rk2-arrow-slider',   exprId: ID.arrow,   prefix: 'A_{rrow}=',   displayId: 'rk2-arrow-val',   decimals: 2 },
      { id: 'rk2-opacity-slider', exprId: ID.opacity, prefix: 'O_{pacity}=', displayId: 'rk2-opacity-val', decimals: 2 },
      { id: 'rk2-nx-slider',      exprId: ID.nx,      prefix: 'N_{x}=',      displayId: 'rk2-nx-val',      decimals: 0 },
      { id: 'rk2-dx-slider',      exprId: ID.dx,      prefix: 'd_{x}=',      displayId: 'rk2-dx-val',      decimals: 2 }
    ].forEach(function(s) {
      document.getElementById(s.id).addEventListener('input', function() {
        var val = s.decimals === 0 ? parseInt(this.value, 10) : parseFloat(this.value);
        document.getElementById(s.displayId).textContent = s.decimals === 0 ? val : val.toFixed(s.decimals);
        calc.setExpression({ id: s.exprId, latex: s.prefix + val });
      });
    });

  };
</script>


<!--writeup-->

<div class="latex-body">

\section{Runge Kutta methods}

Runge Kutta methods are paradoxically straightforward and mathematically complicated to derived. In a sense, they are entirely algebraic tricks that, like creating finite difference methods, rely on Taylor expansion and cleverly chosen parameters to achieve the highest order of accuracy. Unlike the finite difference methods, there isn't as simple of a trick as polynomial interpolation, and constructing these methods requires some heavy mechanical work. Regardless, the idea is similar to other numerical tasks, and the result is similar as well: more nodes, more degrees of freedom, lead to higher convergence at the cost of increasingly complex (from the human side) methods.

The following methods are all still technically one-step methods. We recall the definition below.

\begin{definition}
    A \textbf{one-step method} for an IVP is a formula of the form $$u_{i+1} = u_i + h\phi(t_i, u_i, h), \quad i = 0, ..., n-1$$
\end{definition}

Euler's method uses $\phi = f(t_i, u_i)$. While many other methods can be written in a one-step form, they often get very complicated and cluttered, so for ease of implementation, we often write them in what looks like many steps. Really, the idea is setting up many helper functions, or intermediaries, so that our single step is some weighted combination of them. This is analogous to finite difference methods in the sense of scaling and adding nodes.

Recall that for Euler's method, we set the next step $u_{i+1}$, an approximation of the true trajectory, by taking the first-order Taylor approximation at our current point $(t_i, u_i)$ with the information that the true derivative follows some model $u'(t) = f(t, u(t))$. That is $$\hat{u}(t_{i+1}) \approx u_{i+1} = u_i + \underbrace{f(t_i, u_i)(t_{i+1}-t_i)}_{\text{Euler Step}} = u_i + hf(t_i, u_i)$$ whenever our nodes are equally spaced by $h$. If instead we look at a second order Taylor expansion then $$\hat{u}(t_{i+1}) \approx \hat{u}_i + h\hat{u}'(t_i) + \frac{1}{2}h^2 \hat{u}''(t_i)$$ up to an $O(h^3)$ term. With the approximations that $u_i \approx \hat{u}(t_i)$, we can then use the replacement that $u'(t_i)=f(t_i, u_i)$ to set $$u_{i+1} = u_i + hf(t_i, u_i) + \frac{1}{2}h^2 u''(t_i).$$
The last term is simply $u'' = f'$ by definition. However, we have $$f' = \frac{\partial f(t, u(t))}{\partial t} = \frac{\partial f}{\partial t}  + \frac{\partial f}{\partial u} \frac{\partial u}{\partial t} $$
by the chain rule. But $u$ is a single variable function of $t$, and $u' = f$ by again, our IVP, so this all collapses to $$u''(t) = \frac{\partial f}{\partial t}  + f(t,u)\frac{\partial f}{\partial u} .$$

\begin{remark}
    It is worth the few minutes to go back and make sure you understand everything we did above. It is a decent amount of calculus and notational movement, but we did nothing more than Taylor expansion and applying some chain rule and substitutions. Notably we have
    \begin{itemize}
        \item $\hat{u}(t_{i+1}) \approx u_i + hu'(t_i) + \frac{1}{2}h^2 u''(t_i)$
        \item $u'(t_i) = f(t_i, u_i)$
        \item $u''(t_i) = \frac{\partial f}{\partial t} + f(t_i, u_i)\frac{\partial f}{\partial u}$
    \end{itemize}
    All this together lets us define a decent approximation (with some notational abuse) $$u_{i+1} = u_i + h\left[f(t_i, u_i) + \frac{h}{2}\frac{\partial f(t_i, u_i)}{\partial t}+\frac{h}{2}f(t_i, u_i)\frac{\partial f(t_i, u_i)}{\partial u}\right].$$
    We pull out the $h$ to get this in the form of a one-step method.
\end{remark}

Notably, that term in brackets also looks like a Taylor expansion (this time around the function $f$ with respect to both variables. We are not doing the same thing as the chain rule on $u''(t)$ above). We simply need to find what to center, and where to move from that center, that leads to a term that has the bracketed value as a decent approximation. That is, we wish to find $\alpha$ and $\beta$ such that $$f(t_i+\alpha, u_i +\beta) \approx f(t_i, u_i) + \alpha \frac{\partial f(t_i, u_i)}{\partial t}+\beta \frac{\partial f(t_i, u_i)}{\partial u}.$$
If we pattern match with the bracketed term, we need to choose $$\alpha = \frac{h}{2}, \quad \beta = \frac{h}{2}f(t_i, u_i).$$
Making this final substitution, we get $$u_{i+1} = u_i + hf\left(t_i + \frac{h}{2}, u_i + \frac{h}{2}f(t_i, u_i)\right).$$
This is notably a bit of a weird method. We have this nested iteration of our function $f$. Regardless, it is technically a one-step method, but we can implement it easily as one that saves a few intermediaries. This is called a \textit{multistage method}.

\textbf{Algorithm (Improved Euler Method).} Given the initial value problem $u' = f(t,u)$ for $a \leq t \leq b$, initial value $u_0$, and stepsize $h > 0$, for $i = 0, 1, 2, \dots$
\begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + \tfrac{1}{2}h, u_i + \tfrac{1}{2}k_1)\\
    u_{i+1} &= u_i + k_2
\end{align*}

Note that another way we can write the last line, to incorporate a true ``summing and weighting the previous steps'' is to say $$u_{i+1} = u_i + \underbrace{0k_1+1k_2}_{\text{forward step}}.$$
In fact, we can abstract away all the specific constants and write this out as
\begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + c_1h, u_i + a_{11}k_1)\\
    u_{i+1} &= u_i + \underbrace{b_1k_1+b_2k_2}_{\text{forward step}}
\end{align*}
where our first stage analyzes the slope at our current point, the second stage analyzes the slope at some future spot (not necessarily on the trajectory) and then the final step does some type of weighting of the two.

\begin{remark}
    The final iteration in these methods is the ``forward step,'' where we move from our current point onward. This forward step is a weighted sum of the previous stages, but it is not necessarily an average. We do in general want $b_1 + b_2 = 1$ or for higher order methods, $\sum_i b_i = 1$, so there is some notion of consistency, but notably we do not need $b_i \geq 0$. In fact, we can have methods that subtract some amount of $k_i$, while still being efficient and convergent.
\end{remark}

Recall that for Euler's method, we simply march along in the direction of our vector field. Improved Euler, and any two-phase method, behaves slightly differently. Instead, we track first our velocity at our current point, but instead of moving in that direction, we set up a hypothetical movement. We save an intermediary position that moves in that direction and mark the velocity at that new point. These two velocities are then saved as $k_1$ and $k_2$ respectively. Finally, we move in a direction that is some combination of these velocities. Improved Euler puts all the weight on the second, intermediary direction, but other methods create more nontrivial combinations.

\textbf{Algorithm (Modified Euler Method).} Given the initial value problem $u' = f(t,u)$ for $a \leq t \leq b$, initial value $u_0$, and stepsize $h > 0$, for $i = 0, 1, 2, \dots$
\begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + h, u_i + k_1)\\
    u_{i+1} &= u_i + \tfrac{1}{2}k_1 + \tfrac{1}{2}k_2
\end{align*}

This second method marches to an intermediary that is a full time step away, measures a velocity there and then averages the two for the true forward step.

This third method does a more complex averaging. Note that more of the weight is on the forward intermediary, so this lies somewhere in between the two previous methods. That is, the forward step looks like it lies more in the intermediary's direction than the original. Regardless, all three methods have the same order of convergence, and all perform better than the basic Euler's method.

\textbf{Algorithm (Heun's/Ralston's Method).} Given the initial value problem $u' = f(t,u)$ for $a \leq t \leq b$, initial value $u_0$, and stepsize $h > 0$, for $i = 0, 1, 2, \dots$
\begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + \tfrac{2}{3}h, u_i + \tfrac{2}{3}k_1)\\
    u_{i+1} &= u_i + \tfrac{1}{4}k_1 + \tfrac{3}{4}k_2
\end{align*}

The existence of these three methods that all look similar, but with different parameters leads us to question if more exist. Further, since Heun's method looks as if it lies somewhere in between Improved and Modified Euler, we may seek some type of parameterization. Not too surprisingly, one exists, and its derivation once again comes from some Taylor expansion.

\textbf{Algorithm (General Two-Phase Method).} Given the initial value problem $u' = f(t,u)$ for $a \leq t \leq b$, initial value $u_0$, and stepsize $h > 0$, for $i = 0, 1, 2, \dots$
\begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + \alpha h, u_i + \alpha k_1)\\
    u_{i+1} &= u_i + \left(1-\tfrac{1}{2\alpha}\right)k_1 + \tfrac{1}{2\alpha}k_2
\end{align*}
where $\alpha \in (0,1]$.

Notably, when $\alpha = \tfrac{1}{2}$, we recover Improved Euler, when $\alpha = 1$, we recover Modified Euler, and when $\alpha = \tfrac{2}{3}$, we recover Heun's/Ralston's Method.

\begin{remark}
    Note: there seems to be some contradiction on the naming of these methods in various literature, so the more important aspect is understanding how they work and why.
\end{remark}

\subsection{General $s$-stage Runge–Kutta Methods}

A generic $s$-stage Runge–Kutta method will take the following form.

\begin{definition}
Given real numbers $c_1, ..., c_{s-1}$, $a_{i,j}$ for $1 \leq j \leq i \leq s-1$ and $b_1, ..., b_s$, an $s$-stage method follows
    \begin{align*}
    k_1 &= hf(t_i, u_i)\\
    k_2 &= hf(t_i + c_1h, u_i + a_{11}k_1)\\
    k_3 &= hf(t_i + c_2h, u_i + a_{21}k_1+a_{22}k_2)\\
     &\;\;\vdots\\
     k_s &= hf(t_i + c_{s-1}h, u_i + a_{s-1, 1}k_1 + \dots + a_{s-1,s-1}k_{s-1})\\
     u_{i+1} &= u_i + b_1k_1 + \dots + b_sk_s
\end{align*}
\end{definition}

We can interpret the method as one where each phase analyzes a velocity at some future time with some value perturbed by the previous phases. Then, our forward step is some weighted combination of all the velocities witnessed. Since these methods are so constrained to the recipe of ingredients being the values of $a_{i,j}, b_i, c_i$ we often write the method in a more compact form.

$$
\begin{array}{c|cccc}
  0         &           &           &           &           \\
  c_1       & a_{11}    &           &           &           \\
  c_2       & a_{21}    & a_{22}    &           &           \\
  c_3       & a_{31}    & a_{32}    & a_{33}    &           \\
  \vdots    & \vdots    &           & \ddots    &           \\
  c_{s-1}   & a_{s-1, 1} & a_{s-1, 2} & \dots    & a_{s-1, s-1}\\
  \hline
            & b_1       & b_2       & \dots     & b_s       \\
\end{array}
$$

This \textit{Butcher's Tableau} completely defines the method and we can write out the algorithms above in these nice, compact forms.

For the general two-step methods above, we have for any $\alpha \in (0,1]$, the Butcher's Tableau is 


$$
\begin{array}{c|cc}
  0         &           &              \\
  \alpha       & \alpha    &                 \\
  \hline
            & 1-\frac{1}{2\alpha}       &  \frac{1}{2\alpha}.    \\
\end{array}
$$
where we reiterate that the choices of $\alpha = \tfrac{1}{2}$ recovers Improved Euler, $\alpha = 1$, recovers Modified Euler, and $\alpha = \tfrac{2}{3}$ recovers Heun's/Ralston's Method.

</div>