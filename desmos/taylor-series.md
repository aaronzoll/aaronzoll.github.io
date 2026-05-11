---
layout: desmos-graph
title: "Taylor Series"
desmos_json: "taylor_series.json"
desmos_url: "https://www.desmos.com/calculator/urd7pwhni3"
side_controls: true
---

<div class="ts-stack">

  <span class="ts-section-label">Degree</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(k\) = <strong id="ts-k-val">3</strong></span>
    <input class="site-slider" type="range" min="0" max="10" step="1" value="3"
           data-expr-id="6" data-latex-prefix="k=" data-val-id="ts-k-val" data-decimals="0">
  </div>

</div>

<style>
  .ts-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ts-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    function initSlider(exprLatex, exprId, displayId) {
      var h = calc.HelperExpression({ latex: exprLatex });
      h.observe('numericValue', function() {
        var val = h.numericValue;
        if (isNaN(val)) { return; }
        var input = document.querySelector('[data-expr-id="' + exprId + '"]');
        var display = document.getElementById(displayId);
        var d = input ? parseInt(input.getAttribute('data-decimals'), 10) : 2;
        var decimals = isNaN(d) ? 2 : d;
        if (input) { input.value = val; }
        if (display) { display.textContent = val.toFixed(decimals); }
        h.unobserve('numericValue');
      });
    }

    initSlider('k', '6', 'ts-k-val');

    document.querySelectorAll('.ts-stack .site-slider').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseFloat(input.value);
        var d = parseInt(input.getAttribute('data-decimals'), 10);
        var decimals = isNaN(d) ? 2 : d;
        var exprId = input.getAttribute('data-expr-id');
        var prefix = input.getAttribute('data-latex-prefix');
        var valId = input.getAttribute('data-val-id');
        var el = document.getElementById(valId);
        if (el) { el.textContent = val.toFixed(decimals); }
        calc.setExpression({ id: exprId, latex: prefix + val });
      });
    });

  };
</script>

<!--writeup-->

<div class="latex-body">
One tool we already used for deriving the condition number of the root finding problem is Taylor's Theorem. This tool will be used again and again throughout this course and many others. It is the most (and for some, the only) useful result to come from Calc II. There are higher dimensional generalizations that utilize generalized versions of first, second, and so on derivatives. We will just focus on the one-dimensional case as it is easiest to visualize.

The story goes like this. Suppose you have a function $f(x)$ and you want to approximate it with a $k$-degree polynomial at a point $a$. Notice that a $k$-degree polynomial admits $k$ derivatives before it becomes constant. We wish for our approximation $P_k(x)$ to match $f(x)$ at all these derivatives.

\begin{definition}[Taylor Polynomial]
    Let $f(x) : \R \to \R$ be at least $k$-times differentiable. We say $P_k(x)$ is a \textbf{$k$-degree Taylor polynomial approximation at $a$} if $$f(a) = P_k(a), \ f'(a) = P_k'(a), \ ..., \ f^{(k)}(a) = P_k^{(k)}(a)$$
\end{definition}

For a 0-degree Taylor approximation, we simply take the constant function $P_0(x) = f(a)$. It is well known that the 1-degree approximation, the "linear approximation," is $P_1(x) = f(a) + f'(a)(x-a).$ This is simply a rewrite of the classic "point-slope" form. We can derive an expression for any Taylor approximation constructively.


\begin{theorem}
    The $k$-degree Taylor polynomial approximation at $a$ for the function $f(x)$ is $$P_k(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2}(x-a)^2 + ... + \frac{f^{(k)}(a)}{k!}(x-a)^k = \sum_{n=0}^k \frac{f^{(n)}(a)}{n!}(x-a)^n$$
\end{theorem}

\begin{proof}
    We can show this completely constructively. We know that $P_k(x)$ is a $k$-degree polynomial, so we aim to just find the coefficients. Furthermore, we can "center" the polynomial at any point, and the only adjustment would be to the constant term. That is, without loss of generality, we have $$P_k(x) = c_0 + c_1(x-a) + c_2(x-a)^2 + ... + c_k(x-a)^k$$
    where if $a$ above were replaced with any other number, only $c_0$ would be changed. We can then solve for each $c_j$ by considering the requirements $$P_k^{(m)}(a) = f^{(m)}(a), \quad m = 0, 1, ..., k$$
    For $m = 0$, $P_k(a) = c_0$ as all the terms with $(x-a)^m$ go away. This forces $c_0 = f(a).$ The process is similar for any other $m$ as well. It is not hard to show that $$P_k^{(m)}(a) = m!c_m = f^{(m)}(a)$$ by the requirements of the approximation. The powers of $(x-a)^n$ with $n < m$ go away by taking the $m^{\text{th}}$ derivative. If $n > m$, then terms of $(x-a)^{n-m}$ remain, and plugging in $x=a$ vanishes them.
\end{proof}

We can note from the visual above that a higher degree polynomial will approximate a function better and better. We may ask ourselves two questions. How good is this approximation? Where do $k$-degree polynomials converge as $k \to \infty$? Note that the first question can be answered as an immediate corollary of the theorem.

\begin{corollary}
    Let $f : \R \to \R$ be a function that is $k+1$ times differentiable on an interval $I$. For any $a \in I$ it holds that $$f(x) = f(a) + f'(a)(x-a) + ... + \frac{f^{(k)}(a)}{k!}(x-a)^k + R_k(x)$$
    where $$|R_k(x)| \leq \frac{\displaystyle\max_{z \in I}|f^{(k+1)}(z)|}{(k+1)!}|x-a|^{k+1}$$
\end{corollary}

The residual between the function and approximation is then bounded by two factors. First, the distance away from the center and second, the size of the subsequent derivative nearby. If the derivatives start to blow up, it may be that no approximation gets close to convergence. If we consider the extreme case at $k \to \infty$ we no longer have a polynomial, but we may have that we get convergence on some interval.

\begin{definition}[Power Series]
    The power series of a function on an interval $I$, centered at $a \in I$, is defined by a sequence $\{c_0, c_1, ...\}$ such that $$f(x) = \sum_{n=0}^\infty c_n(x-a)^n, \quad \forall x \in I.$$
    For a given $a \in \R$, we define the \textit{radius of convergence} to be the largest distance from $a$ in which the above series converges.
\end{definition}

Finding the radius of convergence is then relatively simple if we consider all the insight above. We should expect each $c_n = f^{(n)}(a)/n!$. To converge, we certainly need $c_n$ to converge as a sequence. In fact, by considering $(x-a) = r$, it must hold that $$\sum_{n=0}^\infty c_n(x-a)^n \text{ converges } \Longleftrightarrow \sum_{n=0}^\infty c_n r^n \text{ converges}.$$

Therefore, we can do any series convergence test, like the ratio test, to determine $r$. That is, we need for the ratio of the terms in the series to converge. If $a_n = c_nr^n$ then we need $$\text{The series converges} \Longleftrightarrow \lim_{n \to \infty}\left|\frac{a_{n+1}}{a_n}\right| < 1 \Longleftrightarrow \lim_{n \to \infty}\left|\frac{c_{n+1}r}{c_n}\right| < 1$$

Solving for $r$ we get the following lemma.

\begin{lemma}
    Suppose a function admits a power series $f(x) = \sum_{n=0}^\infty c_n(x-a)^n$, then the radius of convergence is $$r = \lim_{n \to \infty} \left|\frac{c_n}{c_{n+1}}\right|$$
\end{lemma}
</div>
