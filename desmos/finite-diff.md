---
layout: desmos-graph
title: "Finite Difference and Interpolation"

desmos_json: "finite_diff_interp.json"
desmos_url: "https://www.desmos.com/calculator/9qttjfsxve"
side_controls: true
---

<div class="fd-stack">

  <span class="fd-section-label">Function</span>

  <div class="fd-presets">
    <button class="site-btn fd-fn-btn" data-latex="\sin\left(2x\right)+\frac{1}{4}x">sin(2x)+x/4</button>
    <button class="site-btn fd-fn-btn" data-latex="\sin\left(x\right)">sin(x)</button>
    <button class="site-btn fd-fn-btn" data-latex="e^{x}">e<sup>x</sup></button>
    <button class="site-btn fd-fn-btn" data-latex="x^{3}-x">x³−x</button>
    <button class="site-btn fd-fn-btn" data-latex="\frac{1}{1+x^{2}}">1/(1+x²)</button>
  </div>

  <div class="fd-custom-section">
    <span class="fd-custom-label">Custom</span>
    <div class="fd-custom-row">
      <input class="fd-custom-input" id="fd-custom-fn" type="text"
             placeholder="sin(x), x^2, e^x, …" autocomplete="off" spellcheck="false">
      <button class="fd-action-btn" id="fd-apply-fn">Apply</button>
    </div>
    <span class="fd-custom-note">Use LaTeX notation (e.g. \sin(x), x^2, e^{x+1}, \ln(x)).</span>
  </div>

  <button class="fd-reset-btn" id="fd-reset-fn">Reset to default</button>

  <hr class="desmos-divider">

  <div class="fd-method">
    <button class="site-btn site-btn--active fd-toggle-btn"
            data-folder="7" data-controls="fd1-controls">
      Order-2 Central
    </button>
    <div id="fd1-controls">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_1\) = <strong id="fd-h1-val">0.273</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.273"
               data-expr-id="8" data-latex-prefix="h_{1}=" data-val-id="fd-h1-val"
               data-decimals="3">
      </div>
    </div>
  </div>

  <hr class="desmos-divider">

  <div class="fd-method">
    <button class="site-btn fd-toggle-btn"
            data-folder="13" data-controls="fd2-controls">
      Order-4 Central
    </button>
    <div id="fd2-controls" style="display:none">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_2\) = <strong id="fd-h2-val">0.710</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.71"
               data-expr-id="14" data-latex-prefix="h_{2}=" data-val-id="fd-h2-val"
               data-decimals="3">
      </div>
    </div>
  </div>

  <hr class="desmos-divider">

  <div class="fd-method">
    <button class="site-btn fd-toggle-btn"
            data-folder="41" data-controls="fd3-controls">
      General
    </button>
    <div id="fd3-controls" style="display:none">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_3\) = <strong id="fd-h3-val">0.680</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.68"
               data-expr-id="42" data-latex-prefix="h_{3}=" data-val-id="fd-h3-val"
               data-decimals="3">
      </div>
      <span class="fd-preset-label">Node presets</span>
      <div class="fd-preset-row">
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-1,\ 1,\ 2\right]">
          \(N = [-1,\ 1,\ 2]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-1,\ 0,\ 1\right]">
          \(N = [-1,\ 0,\ 1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-2,\ 0,\ 1,\ 2\right]">
          \(N = [-2,\ 0,\ 1,\ 2]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-3,\ 1\right]">
          \(N = [-3,\ 1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-3,\ -2,\ -1\right]">
          \(N = [-3,\ -2,\ -1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-0.25,\ 0.5,\ 1,\ 2\right]">
          \(N = [-0.25,\ 0.5,\ 1,\ 2]\)
        </button>
      </div>
    </div>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .fd-stack {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .fd-method {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .fd-toggle-btn {
    width: 100%;
  }

  .fd-preset-label {
    display: block;
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 0.4rem;
  }

  .fd-preset-row {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .fd-preset-row .site-btn {
    width: 100%;
    min-width: 0;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }

  .fd-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fd-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .fd-presets .site-btn {
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
    font-family: monospace;
  }

  .fd-custom-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem 0.6rem;
    border: 1px dashed #c8c8c8;
    border-radius: 4px;
    background: #fafafa;
  }

  .fd-custom-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
  }

  .fd-custom-row {
    display: flex;
    gap: 0.4rem;
  }

  .fd-custom-input {
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

  .fd-custom-input:focus {
    outline: 2px solid #a67b5b;
    outline-offset: 1px;
  }

  .fd-action-btn {
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

  .fd-action-btn:hover {
    background: #f0e0ca;
  }

  .fd-custom-note {
    font-size: 0.72rem;
    color: #888;
    font-style: italic;
  }

  .fd-reset-btn {
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

  .fd-reset-btn:hover {
    background: #ececec;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    var FD_DEFAULT_LATEX = 'f\\left(x\\right)\\ =\\ \\sin\\left(2x\\right)+\\frac{1}{4}x';

    var FD_FN_MAP = [
      ['arcsin','\\arcsin'],['arccos','\\arccos'],['arctan','\\arctan'],
      ['sinh','\\sinh'],['cosh','\\cosh'],['tanh','\\tanh'],
      ['sin','\\sin'],['cos','\\cos'],['tan','\\tan'],
      ['sec','\\sec'],['csc','\\csc'],['cot','\\cot'],
      ['ln','\\ln'],['log','\\log'],['exp','\\exp'],
    ];

    function fdToDesmos(raw) {
      var s = raw.trim();
      FD_FN_MAP.forEach(function(pair) {
        s = s.replace(new RegExp('(?<!\\\\)' + pair[0] + '\\s*\\(', 'g'),
                      pair[1] + '\\left(');
      });
      return s;
    }

    function setFdFunction(latex) {
      calc.setExpression({ id: '3', latex: 'f\\left(x\\right)=' + latex });
    }

    function setActiveFnBtn(btn) {
      document.querySelectorAll('.fd-fn-btn').forEach(function(b) {
        b.classList.remove('site-btn--active');
      });
      if (btn) btn.classList.add('site-btn--active');
    }

    document.querySelectorAll('.fd-fn-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setFdFunction(btn.getAttribute('data-latex'));
        document.getElementById('fd-custom-fn').value = '';
        setActiveFnBtn(btn);
      });
    });

    var fdCustomInput = document.getElementById('fd-custom-fn');
    document.getElementById('fd-apply-fn').addEventListener('click', function() {
      var val = fdCustomInput.value.trim();
      if (!val) return;
      setFdFunction(fdToDesmos(val));
      setActiveFnBtn(null);
    });
    fdCustomInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('fd-apply-fn').click();
    });

    document.getElementById('fd-reset-fn').addEventListener('click', function() {
      calc.setExpression({ id: '3', latex: FD_DEFAULT_LATEX });
      fdCustomInput.value = '';
      setActiveFnBtn(null);
    });

    document.querySelectorAll('.fd-stack .site-slider').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseFloat(input.value);
        var d = parseInt(input.getAttribute('data-decimals'), 10);
        var decimals = isNaN(d) ? 3 : d;
        var exprId = input.getAttribute('data-expr-id');
        var prefix = input.getAttribute('data-latex-prefix');
        var valId = input.getAttribute('data-val-id');
        var el = document.getElementById(valId);
        if (el) { el.textContent = val.toFixed(decimals); }
        calc.setExpression({ id: exprId, latex: prefix + val });
      });
    });

    calc.setExpression({ id: '7',  hidden: false });
    calc.setExpression({ id: '13', hidden: true });
    calc.setExpression({ id: '41', hidden: true });

    document.querySelectorAll('.fd-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        document.querySelectorAll('.fd-toggle-btn').forEach(function(b) {
          calc.setExpression({ id: b.getAttribute('data-folder'), hidden: true });
          b.classList.remove('site-btn--active');
          var c = document.getElementById(b.getAttribute('data-controls'));
          if (c) { c.style.display = 'none'; }
        });
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: false });
        btn.classList.add('site-btn--active');
        var controls = document.getElementById(btn.getAttribute('data-controls'));
        if (controls) { controls.style.display = ''; }
      });
    });

    document.querySelectorAll('.fd-preset-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var latex = btn.getAttribute('data-nodes');
        calc.setExpression({ id: '46', latex: latex });
        document.querySelectorAll('.fd-preset-btn').forEach(function(b) {
          b.classList.remove('site-btn--active');
        });
        btn.classList.add('site-btn--active');
      });
    });

  };
</script>

<!--writeup-->

<div class="latex-body">

\section{Finite Differences}

Interpolation has many applications in data science, optimization, and numerical analysis. One particular use case for the latter is with finite differences. Below, we give the general form of a finite difference, but we will step back quickly to more comfortable and digestible examples. We will then explore how one could derive the coefficients used for optimal finite differences (gives a set of interpolates) and finally, we will analyze their convergence guarantees. In general, nodes need not be evenly spaced. For ease of analysis, we assume they are.

\begin{definition}
    A \textbf{finite difference formula} is a list of \textit{weights}, values $a_{-p}, ..., a_q$, such that $$f'(x) \approx \frac{1}{h}\sum_{k=-p}^q a_kf(x+kh).$$ The weights must be independent of function $f$ and node width $h$. If the approximation becomes an equality as $h \to 0$, this formula is said to be \textbf{convergent}.
\end{definition}

The general idea above is that we approximate a derivative by taking some weight combination of points nearby. A specific example is that of approximating via a secant line.

\subsection{Common Examples and Derivations}

The simplest examples are those with only two nodes. As mentioned above, these correspond to approximating a derivative via a secant line. Doing so, we can either take nodes with one on a point of interest and the other behind, the other ahead, or have both nodes on either side. We note by inspection (for now) that the central difference method appears to be far more accurate. 

\begin{example}
     Here are the explicit formulae for the two-node finite differences
     \begin{itemize}
         \item \textbf{backward difference:} $f'(x) \approx \frac{f(x)-f(x-h)}{h}$
          \item \textbf{central difference:} $f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}$
           \item \textbf{forward difference:} $f'(x) \approx \frac{f(x+h)-f(x)}{h}$
     \end{itemize}
\end{example}

These formulae above directly come from taking the secant line. For example, if $x_1$ represents the left node and $x_2$ represents the second node and we are doing a central difference, then $x_2 - x_1 = (x+h)-(x-h) = 2h$. In fact, this idea holds for any choices of nodes.

\begin{proposition}
    Let $x \in \R$ be fixed and choose $s \leq x \leq t$ where $s \ne t$. Then we can approximate $$f'(x) \approx \frac{f(t)-f(s)}{t-s}.$$
    In particular if $s = x-k_1h$ and $t = x+k_2h$ then $$f'(x) = \frac{f(x+k_2h)-f(x-k_1h)}{(k_1+k_2)h}$$
\end{proposition}

We note that the line that passes through two points $s$ and $t$ where $s \ne t$ can always be written as $$p(x) = f(s) + \frac{f(t)-f(s)}{t-s}(x-s).$$ Notably the slope of this line is precisely the value used to approximate the derivative in the proposition above. In particular, we can say that $f'(x) \approx p'(x)$.

\subsection{Generalizations and Higher Order Approximations}

In this section we approximate derivatives by building up finite differences with more nodes. We will see in the next section that this implies a higher order of convergence as well. As before, when we had two points in our toolbox, we took the line that went through them. That is, we took the 1-degree polynomial interpolation. See the interactive <a href="https://aaronzoll.github.io/desmos/lagrange-hermite-interpolation/" target="_blank">Lagrange Interpolation</a> or <a href="https://aaronzoll.github.io/desmos/interpolation-master/" target="_blank">Interpolation Master</a> graphs for more on polynomial interpolation.

For more than two points, we could try a few routes. We could take each line that goes through any pair of points and average them. We could find a line of best fit using least squares. We could also interpolate all points using Lagrange interpolation. It turns out the latter gives the best approximation. The intuition here is that the Lagrange Polynomial gives the ``best'' polynomial for interpolating points nearby, so it should approximate the slope up to the same order. For example, if we use 4 points, the interpolating polynomial is of degree 3, and will match the degree 3 Taylor polynomial of the function, up to higher order terms. Thus, the derivative will also match up to (the derivative of) the higher order terms.

\begin{definition}[Lagrange Polynomial]
    Given a set of points $X = \{x_1, ..., x_n\}$ with function values $Y = \{y_1, ..., y_n\}$. Denote each Lagrange Interpolant as $$L_i(x) = \prod_{j \ne i} \frac{x-x_j}{x_i-x_j}, \quad i = 1, ..., n.$$
    Then the Lagrange Interpolation is the full polynomial $$L(x) = \sum_{i=1}^n y_i L_i(x).$$
\end{definition}

\begin{remark}
    Using the definition above, note that $L_i(x)$ is of degree $n-1$ and $L_i(x_j) = 0$ for $i \ne j$, and $L_i(x_i) = 1$. Therefore, $$L(x_j) = \sum_{i=1}^n y_i L_i(x_j) = y_jL_j(x_j) = y_j$$ by noting that most of the terms in the sum evaluate to zero. Therefore, the polynomial is an interpolation.
\end{remark}

Lagrange interpolation will be the key to constructing finite difference formula. The idea is to fix a set of nodes, ``centered'' (not necessarily symmetrically) around a point. Then, we construct the interpolation of those points and the idea is that the derivative of the function should approximately match the derivative of the interpolation.

\begin{theorem}
    Let $X= \{a+x_1, ..., a+x_n\}$ be a set of nodes (here $x_i$ are allowed to be negative) to construct a finite difference method. Let $L_\mathtt{nodes}(x)$ be the Lagrange interpolation of the nodes with their function values. Then $$f'(a) \approx L_\mathtt{nodes}'(a) = \sum_{i=1}^n f(a+x_i)L_i'(a)$$
\end{theorem}

\begin{remark}
    One further simplification going forward is we can note that these finite difference methods should not depend on where we are evaluating. Therefore, we can without loss of generality let $a = 0$. Equivalently, we can imagine making the change of variables $x \mapsto x-a$ when interpolating.
\end{remark}

The following corollary tells us exactly what we should expect from a finite difference method. The weights on the function values to approximate the derivative are independent of the function, the center, and only depend on the nodes. What isn't fully displayed by this corollary is that if the nodes are equally spaced, then the node width is also independent of the weights. This comes from algebraic manipulation of the Lagrangian interpolation and is left as an exercise to the reader.

\begin{corollary}
    Let $a \in \R$ be a center for which we try to approximate a derivative and $X = \{a+x_1, ..., a+x_n\}$. Let $L_\mathtt{diff}'(x)$ interpolate the points $\{x_1, ..., x_n\}$. Then $$f'(a) \approx L_{\mathtt{diff}}'(0) = \sum_{i=1}^n f(a+x_i) L_i'(0).$$
    That is, the \textbf{weights} on $f(a+x_i)$ are simply the derivative of each Lagrange Interpolant (constructed just on the \textbf{differences}) at zero.
\end{corollary}

The generality of the above statements can be quite difficult to digest, so it may be useful to see a particular example. \textbf{Note that the weights defined here will have an extra factor of $1/h$, so we just need to be careful!}

\begin{example}
    Suppose we wish to find an approximation for $f'(a)$ by considering nodes $$X = \{a-2h, a-h, a+h, a+2h\}.$$
    We find the Lagrange interpolation to fit the data $$\{-2h, -h, h, 2h\}\text{ and }\{f(a-2h), f(a-h), f(a+h), f(a+2h)\}.$$
    The Lagrange Interpolants look like
    \begin{align*}
        L_{-2}(x) &= \frac{(x-(-h))(x-h)(x-2h)}{(-2h-(-h))(-2h-h)(-2h-2h)} = -\frac{x^3-2hx^2-h^2x+2h^3}{12h^3}\\
        L_{-1}(x) &= \frac{(x-(-2h))(x-h)(x-2h)}{(-h-(-2h))(-h-h)(-h-2h)} = \frac{x^3-hx^2-4h^2x+4h^3}{6h^3}\\
        L_{+1}(x) &= \frac{(x-(-2h))(x-(-h))(x-2h)}{(h-(-2h))(h-(-h))(h-2h)} = -\frac{x^3+hx^2-4h^2x-4h^3}{6h^3}\\
        L_{+2}(x) &= \frac{(x-(-2h))(x-(-h))(x-h)}{(2h-(-2h))(2h-(-h))(2h-h)} = \frac{x^3+2hx^2-h^2x-2h^3}{12h^3}
    \end{align*}
    Using our corollary, noting that $f'(a) \approx L'(0) = \sum_{k \in \{-2, \, -1,\, 1,\, 2\}} f(a+kh)L_k'(0)$ which directly implies the weight on $f(a+kh)$ is precisely $L_k'(0)$. Computing these
    \begin{align*}
        L_{-2}'(0) &= -\frac{3x^2-4hx-h^2}{12h^3}\bigg|_0 = \frac{1}{12h}\\
        L_{-1}'(0) &= \frac{3x^2-2hx-4h^2}{6h^3}\bigg|_0 = \frac{-2}{3h}\\
        L_{+1}'(0) &= -\frac{3x^2+2hx-4h^2}{6h^3}\bigg|_0 = \frac{2}{3h}\\
        L_{+2}'(0) &= \frac{3x^2+4hx-h^2}{12h^3}\bigg|_0 = \frac{-1}{12h}
    \end{align*}
    Therefore, we can write out explicitly that for any differentiable function $$f'(a) \approx \frac{1}{12h}f(a-2h) - \frac{2}{3h}f(a-h)+\frac{2}{3h}f(a+h) - \frac{1}{12h}f(a+2h)$$
    which exactly matches the formula in <a href="https://fncbook.com/finitediffs/" target="_blank">the textbook</a>.
\end{example}

Below we show that the order 4 finite difference method constructed above is shockingly accurate even for drastically large node width and relatively oscillatory functions.

\section{Convergence Guarantees for Finite Differences}

So far, we have discussed ways of constructing finite difference methods. Now we can analyze their convergence guarantees.

\subsection{Order of Accuracy}

This section is quick, and should just be meant as a review of order of accuracy.
\begin{definition}[informal]
    We say a convergence rate is of ``\textbf{Big-O}'' complexity if the error goes to zero faster than that complexity.
\end{definition}

When we see that a rate is of $O(h^3)$, what this should mean is that as $h \to 0$, the error converges to zero faster than $O(h^3)$ would, up to universal constants. That is to say, the rate of convergence need not be less than $f(h) = h^3$ everywhere, or even at all, but just that there needs to be some positive constant such that $[\text{error}(h)] \leq C h^3$.

When we say a function is of the order of another, we typically write $f(x) = O(g(x))$. Sometimes we may see ``little-o'' notation as in $f(x) = o(g(x))$. The subtle difference is just related to the tightness of these bounds. That is, the analog of big-O to little-o is the same as greater than \textit{or equal to}, or strictly greater than.

\begin{example}
Here are some examples
\begin{itemize}
    \item $h^n = O(h^m)$ iff $n \geq m$
    \item $h^n = o(h^m)$ iff $n > m$
    \item $|\sin(h) - h| = o(h^2)$
    \item $e^{-1/h} = o(h^m)$ for all $m$
    \item $h^2\ln(1/h) = o(h)$
\end{itemize}
\end{example}

There are more formal ways of describing these notations with limits, but the idea remains the same.

\subsection{Truncation Error}

With error in mind, we can define the truncation error for a specific finite difference method. Going forward, for simplicity, we shall only consider methods with equally spaced nodes. Furthermore, we consider only approximating derivatives at $0$.
\begin{definition}[Truncation error of a finite-difference formula]
    For a finite difference method with weights $a_{-p}, ..., a_q$, the \textbf{truncation error} is $$\tau_f(h) = f'(0) - \frac{1}{h}\sum_{k=-p}^q a_kf(kh).$$
    If $\tau_f(h) \to 0$ as $h \to 0$, the method is said to be convergent.
\end{definition}

Note that simply by construction all finite difference methods constructed from above will be convergent. The intuition is that we are interpolating with some polynomial that perfectly fits through the nodes. As the nodes get closer, this polynomial gets closer to fitting through our center, and in conjunction with the tools of Taylor series, we can show that the derivative must converge as well.

Regardless, some methods outperform others. Some converge faster, and some converge slower. We really just care about the rate of convergence, which typically ignores constants. Therefore, big (or small)-O notation is the perfect setting.

\begin{definition}
    If the truncation error of a method $\tau_f(h) = O(h^m)$ for a positive integer $m$, then we say the \textbf{order of accuracy} is $m$.
\end{definition}

We can then compute the order of accuracy explicitly. The standard way to do so is to simply take a Taylor expansion and see what cancels. We will see shortly that we can similarly construct these finite difference methods to be with the weights that will cause the highest terms in a Taylor expansion to cancel. In this framework, we can both construct methods and determine their order of convergence at the same time!

\begin{lemma}
    The finite difference method $$f'(x) \approx \frac{f(x+h)-f(x)}{h}$$ has order 1. That is $\tau_f(h) = O(h)$.

    \medskip

    The finite difference method $$f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}$$ has order 2. That is $\tau_f(h) = O(h^2)$.
\end{lemma}
\begin{proof}
    The proofs for both of these come from just looking at the Taylor expansion. See <a href="https://fncbook.com/fd-converge/" target="_blank">examples 5.5.1 and 5.5.2</a> in the textbook.
\end{proof}

We can, however, constructively show that the best choice of weights for the central difference method \textit{must} be $\frac{1}{2}$ and $-\frac{1}{2}$ respectively.
\begin{example}
    Suppose we wish to approximate $f'(x)$ with nodes $f(x-h)$, $f(x)$ and $f(x+h)$. What values of $a, b, c \in \R$ maximize the order of accuracy?

    Without loss of generality, let us take $x = 0$, so we wish to maximize the order of accuracy of $$\frac{af(-h)+bf(0)+cf(h)}{h}.$$
    Taylor expanding around $x = 0$ we get
    \begin{align*}
        f(-h) &= f(0) + f'(0)(-h) + \frac{f''(0)}{2}(-h)^2 + \frac{f'''(0)}{6}(-h)^3 + O(h^4)\\
        f(0) &= f(0) + f'(0)(0) + \frac{f''(0)}{2}0^2 + \frac{f'''(0)}{6}0^3 + O(h^4)\\
        f(h) &= f(0) + f'(0)(h) + \frac{f''(0)}{2}(h)^2 + \frac{f'''(0)}{6}(h)^3 + O(h^4)
    \end{align*}
    With some rearrangement our approximation $\frac{af(-h)+bf(0)+cf(h)}{h}$ equals
    $$ \frac{(a+b+c)f(0)+(-a+0b+c)f'(0)h+\frac{1}{2}(a+0b+c)f''(0)h^2+\frac{1}{6}(-a+0b+c)f'''(0)h^3 + O(h^4)}{h}.$$
    Notably, we want no zero order terms (i.e. $f(0)$), we want a single first order term (i.e. $f'(0)$) and to vanish as many subsequent terms as possible. We only have three variables to play with though so we aim for
    \begin{align*}
         \frac{a + b + c}{h} &= 0\\
         -a + c &= 1\\
         (a+c)h &= 0
    \end{align*}
    which gives us $(a,b,c) = (-1/2, 0, 1/2)$ as expected. Furthermore, this tells us that $$\frac{f(h)-f(-h)}{2h} = \frac{f'''(0)}{6}h^2 + O(h^3)$$
    after dividing by $h$, and since that $h^2$ term remained, the finite difference method is $O(h^2)$.
\end{example}

\subsection{Stability, Round off Error, and Optimal Node Spacing}

Since the finite difference methods are all of order $O(h^m)$ it would be expected that smaller $h$ means better approximation. However, this is not always the case. At least, when dealing with computational math on computers, we always have to worry about round off errors and stability. In fact, since we are taking differences of numbers that are typically not zero (i.e. $f(x+h)$ and $f(x)$), this is a recipe for bad subtraction.

\begin{example}
    Suppose the method we are using is the simple case of forward difference $$f'(x) \approx \frac{f(x+h)-f(x)}{h}.$$ We wish to analyze the total error, from both truncation (the approximation of the finite difference method) and the round off error (from the approximation the computer makes). That is, suppose $$\delta(h) = \frac{f(x+h)-f(x)}{h}$$ is the true approximation of the derivative. However, we can estimate exactly how off the computer will be. First we do this nasty subtraction $f(x+h)-f(x)$ which has condition number $$\kappa(h) = \frac{\max\{|f(x+h)|, |f(x)|\}}{|f(x+h)-f(x)|}.$$
    Since the relative error is of size $\kappa(h) \eps_{\mathtt{mach}}$ we can compute the numerical value calculated by the computer to be
    \begin{align*}
        \bar{\delta}(h) &= \delta(h) (1+\text{ relative error})\\
        &=\delta(h) (1+\kappa(h)\eps_{\mathtt{mach}})\\
        &= \delta(h) + \frac{f(x+h)-f(x)}{h}\frac{\max\{|f(x+h)|, |f(x)|\}}{|f(x+h)-f(x)|}\eps_{\mathtt{mach}}\\
        &\sim \frac{|f(x)|}{h}\eps_\mathtt{mach}
    \end{align*}
    Finally, utilizing the triangle inequality, we get that the error between the true derivative and the one the computer spits out is
    \begin{align*}
        |f'(x)-\bar{\delta}(h)| &\leq \underbrace{|f'(x)-\delta(h)|}_{\text{truncation error}}+\underbrace{|\delta(h)-\bar{\delta}(h)|}_{\text{round off error}}\\
        &\sim |\tau_f(h)| + \frac{|f(x)|}{h}\eps_{\mathtt{mach}}
    \end{align*}
    So, this true difference has this ``push-pull'' factor as $h \to 0$. The truncation error goes down, but the round off error goes up. Therefore, there is some ideal ``middle ground''. In particular we solve $$\min_h |\tau_f(h)| + \frac{|f(x)|}{h}\eps_{\mathtt{mach}}$$
    If $\tau_f(h) = O(h^m)$ we can say (with some hand waviness) that $\tau_f(h) = Kh^m$ and therefore, this problem is solved via some basic calculus. We take the derivative of $$Kh^m + |f(x)|\eps_\mathtt{mach}h^{-1}$$ and set it to zero and solve. Therefore $$h_{\mathtt{opt}} \sim \eps_{\mathtt{mach}}^{\frac{1}{m+1}}$$
\end{example}

The really interesting aspect of the above problem is we can actually see this in practice! If we take some arbitrary function, in this example it is just $f(x) = \sin(x)$. We know the derivative $f'(x_0) = \cos(x_0)$. We can then, in the computer, plot the error it calculates between the true value and its approximation via some finite difference method as a function of $h$.

We can then see that for a first order method, the $h$ that minimizes the true error is around $10^{-8} \approx \sqrt{\eps_\mathtt{mach}}$ and the error that minimizes the second order method is around $10^{-6} \approx \sqrt[3]{\eps_\mathtt{mach}}$. A lot of noise gets introduced, but we can still get a visual of what is happening.

\section{Examples and Practice}

\begin{problem}
As seen earlier \texttt{(i.e., Section #2)}, consider
$$ f(x) = \log(\exp(x) + \exp(-x)). $$
Evaluating this function directly can be unstable. This time, let's evaluate its derivatives.
\begin{enumerate}
\item The derivative of $f$ is given by $$f'(x) = \frac{\exp(x) - \exp(-x)}{\exp(x) + \exp(-x)}$$
Is $f'$ reasonably well-conditioned at $x = 1.23$? You can answer this by directly finding the condition number of $f'$ at $x=1.23$.
\item Consider numerically approximating $f'(1.23)$ for a given stepsize $h>0$ via the formula
$$ \frac{f(1.23 + h) - f(1.23)}{h}. $$
If implemented in standard floating point arithmetic, what value of $h$ would you recommend using to minimize the difference from the true answer $f'(1.23)$?
\item What values of $a,b,c\in\mathbb{R}$ maximize the order of accuracy for approximating $f'(0)$ below?
$$ \frac{a f(-h) + bf(0) + cf(2h)}{h} $$
\end{enumerate}
\end{problem}

\textbf{Solution.}

\begin{enumerate}
    \item Yes, the only issue could be in the numerator and $e^x \approx 3.42$ and $e^{-x} \approx 0.29$. These are not close together and so the subtraction is stable.
    \item This method is a first-order method, so we choose $h \approx 10^{-8}$. Implementing this on a computer gives $$f'(1.23) \approx \frac{f(1.23+h)-f(1.23)}{h} = 0.365927543822$$ up to fifteen digits. The most accurate answer for the derivative I can calculate up to fifteen digits is $f'(1.23) \approx 0.365927551699$.
    \item Here is the more interesting question. We can solve this in two ways. One involves an interpolation and taking derivatives, the other involves Taylor expansion. Pick your poison.
\end{enumerate}

\textit{Method 1 (Lagrange interpolation).} We begin by constructing the degree-2 Lagrange interpolant through the nodes $x_0 = -h,\; x_1 = 0,\; x_2 = 2h$ and differentiate at $x=0$.

\begin{align*}
L_0(x) &= \frac{(x-0)(x-2h)}{(-h-0)(-h-2h)} = \frac{x(x-2h)}{3h^2}, \\[6pt]
L_1(x) &= \frac{(x+h)(x-2h)}{(0+h)(0-2h)} = \frac{(x+h)(x-2h)}{-2h^2}, \\[6pt]
L_2(x) &= \frac{(x+h)(x-0)}{(2h+h)(2h-0)} = \frac{x(x+h)}{6h^2}.
\end{align*}

Then we take the derivatives to get
\begin{align*}
L_0'(x) &= \frac{(2x-2h)}{3h^2} \;\Longrightarrow\; L_0'(0) = \frac{-2h}{3h^2} = -\frac{2}{3h}, \\[4pt]
L_1'(x) &= \frac{(2x-h)}{-2h^2} \;\Longrightarrow\; L_1'(0) = \frac{-h}{-2h^2} = \frac{1}{2h}, \\[4pt]
L_2'(x) &= \frac{(2x+h)}{6h^2} \;\Longrightarrow\; L_2'(0) = \frac{h}{6h^2} = \frac{1}{6h}.
\end{align*}

The interpolants give $f'(0)\approx L_0'(0)f(-h)+L_1'(0)f(0)+L_2'(0)f(2h)$, so matching the form $\frac{1}{h}\left[af(-h)+bf(0)+cf(2h)\right]$:
$$ \boxed{a = -\tfrac{2}{3},\quad b = \tfrac{1}{2},\quad c = \tfrac{1}{6}.} $$
Because the interpolation is the unique degree-2 polynomial through three nodes, differentiation introduces an $O(h^2)$ error, giving a \textit{second-order} accurate approximation.

\textit{Method 2 (Taylor expansion).} If we instead wish to Taylor expand about $x=0$:
\begin{align*}
f(-h) &= f(0) - hf'(0) + \tfrac{h^2}{2}f''(0) - \tfrac{h^3}{6}f'''(0) + \cdots, \\
f(0)  &= f(0), \\
f(2h) &= f(0) + 2hf'(0) + 2h^2f''(0) + \tfrac{4h^3}{3}f'''(0) + \cdots.
\end{align*}

Forming the linear combination and dividing by $h$:
\begin{align*}
\frac{af(-h)+bf(0)+cf(2h)}{h}
  &= \frac{(a+b+c)}{h}f(0) \\
  &\quad + (-a+2c)\,f'(0) \\
  &\quad + \left(\frac{a}{2}+2c\right)h\,f''(0) \\
  &\quad + \left(-\frac{a}{6}+\frac{4c}{3}\right)h^2\,f'''(0) + \cdots
\end{align*}

To maximize the accuracy, we require the coefficient of $f'(0)$ to equal $1$ and eliminate as many lower- and higher-order terms as possible.

\begin{align}
a + b + c &= 0 \tag{C1}\\
-a + 2c   &= 1 \tag{C2}\\
\frac{a}{2} + 2c &= 0 \tag{C3}
\end{align}

We have three equations and three unknowns, so we can simply solve this system. From (C3): $a = -4c$. Substituting into (C2): $4c+2c = 1 \Rightarrow c = \tfrac{1}{6}$, so $a = -\tfrac{2}{3}$. From (C1): $b = -a-c = \tfrac{2}{3}-\tfrac{1}{6} = \tfrac{1}{2}$.

$$ \boxed{a = -\tfrac{2}{3},\quad b = \tfrac{1}{2},\quad c = \tfrac{1}{6}.} $$

The leading error term is then
$$ \left(-\frac{a}{6}+\frac{4c}{3}\right)h^2 f'''(0) = \left(\frac{1}{9}+\frac{2}{9}\right)h^2 f'''(0) = \frac{h^2}{3}f'''(0), $$
confirming the formula is \textit{second-order accurate}.

</div>