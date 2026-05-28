---
layout: desmos-notebook
title: "Notebook Title Here"
# Optional: LaTeX title rendered as the page heading.
# Keep title as plain text (browser tab, SEO); use title_math for the visual heading.
# title_math: '\(\mu\)-Smooth Functions'
---

Write your introduction here. Full Markdown is supported, and LaTeX via MathJax —
inline like \(f(x) = x^2\) or display:

$$\nabla f(x) = 0$$

---

## Single Full-Width Graph



<div class="latex-body">
 Taylor Series are perhaps the most (and for some, the only) useful result to come from Calc II. There are higher dimensional generalizations that utilize generalized versions of first, second, and so on derivatives. We will just focus on the one-dimensional case as it is easiest to visualize.

The story goes like this. Suppose you have a function $f(x)$ and you want to approximate it with a $k$-degree polynomial at a point $a$. Notice that a $k$-degree polynomial admits $k$ derivatives before it becomes constant. We wish for our approximation $P_k(x)$ to match $f(x)$ at all these derivatives.

\begin{definition}[Taylor Polynomial]
    Let $f(x) : \R \to \R$ be at least $k$-times differentiable. We say $P_k(x)$ is a \textbf{$k$-degree Taylor polynomial approximation at $a$} if $$f(a) = P_k(a), \ f'(a) = P_k'(a), \ ..., \ f^{(k)}(a) = P_k^{(k)}(a)$$
\end{definition}

For a 0-degree Taylor approximation, we simply take the constant function $P_0(x) = f(a)$. It is well known that the 1-degree approximation, the "linear approximation," is $P_1(x) = f(a) + f'(a)(x-a).$ This is simply a rewrite of the classic "point-slope" form. We can derive an expression for any Taylor approximation constructively.


\begin{theorem}
    The $k$-degree Taylor polynomial approximation at $a$ for the function $f(x)$ is $$P_k(x) = f(a) + f'(a)(x-a) + \frac{f^{''}(a)}{2}(x-a)^2 + ... + \frac{f^{(k)}(a)}{k!}(x-a)^k = \sum_{n=0}^k \frac{f^{(n)}(a)}{n!}(x-a)^n$$
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



<div class="dnb-graph" data-json="taylor_series.json" data-height="480">
  <p class="dnb-caption">Figure 1: Optional caption goes here.</p>
</div>

Continue writing below the graph. Markdown prose, equations, headers — all work normally.

---

## Two Graphs Side by Side

Wrap `.dnb-graph` elements in a `.dnb-row` to place them in a flex row.
Both graphs share equal width by default.

<div class="dnb-row">
  <div class="dnb-graph" data-json="left_graph.json" data-height="400">
    <p class="dnb-caption">Left: caption here.</p>
  </div>
  <div class="dnb-graph" data-json="right_graph.json" data-height="400">
    <p class="dnb-caption">Right: caption here.</p>
  </div>
</div>

For unequal widths, add `dnb-graph--two-thirds` to the wider one and
`dnb-graph--one-third` to the narrower one:

<div class="dnb-row">
  <div class="dnb-graph dnb-graph--two-thirds" data-json="main_graph.json" data-height="420">
  </div>
  <div class="dnb-graph dnb-graph--one-third" data-json="detail_graph.json" data-height="420">
  </div>
</div>

---

## Text Wrapping Around a Graph

Add `dnb-graph--float-right` (or `--float-left`) so text flows around the graph.
Always follow the wrapping section with `<div class="dnb-clearfix"></div>` to stop the float.

<div class="dnb-graph dnb-graph--float-right" data-json="your_file.json" data-height="380">
</div>

Write text here and it will wrap to the left of the floating graph. Continue for as
many paragraphs as you like — the graph stays anchored to the right. You can include
inline math like \(L\)-smooth functions or \(\mu\)-strong convexity naturally.

<div class="dnb-clearfix"></div>

---

## 3D Graphs via URL (iframe)

The Desmos 3D API differs from the 2D API. Use `data-url` (pointing at a public
Desmos 3D link) to embed via iframe instead. The Show/Hide Expressions toggle still works.

<div class="dnb-graph" data-url="https://www.desmos.com/3d/YOUR_GRAPH_ID" data-height="500">
</div>

You can also use `data-url` for any 2D graph when you only have the public URL and
not the JSON state file.

---

## Hiding the Expressions Toggle

Add `data-no-toggle="true"` to remove the "Show Expressions" button for a cleaner look.

<div class="dnb-graph" data-json="clean_graph.json" data-height="400" data-no-toggle="true">
</div>

---

## Interactive Controls (Sliders, Buttons)

Use `data-ready-fn` to name a JavaScript callback that receives the Desmos calculator
instance once its JSON is loaded. Put your slider/button HTML inside the `.dnb-graph`
div — it renders below the calculator — and wire it up in the callback.

<div class="dnb-graph" data-json="interactive_graph.json" data-height="460" data-ready-fn="myGraphReady">

  <div style="margin-top:0.75rem;">
    <span>\(a\) = <strong id="my-a-val">1.00</strong></span><br>
    <input type="range" min="0" max="3" step="0.01" value="1"
           id="my-slider-a">
  </div>

</div>

<script>
  function myGraphReady(calc, container) {
    document.getElementById('my-slider-a').addEventListener('input', function () {
      var val = parseFloat(this.value);
      document.getElementById('my-a-val').textContent = val.toFixed(2);
      calc.setExpression({ id: 'EXPR_ID', latex: 'a=' + val });
    });
  }
</script>

Replace `'EXPR_ID'` with the actual expression ID from the Desmos JSON, and adjust
the `data-latex-prefix` pattern to match your graph's variable names.

---

## Quick Reference

| Attribute | Default | What it does |
|---|---|---|
| `data-json="file.json"` | — | Load graph state from `/assets/desmos/json_files/` |
| `data-url="https://..."` | — | Embed as iframe (use when no JSON available) |
| `data-height="480"` | `480` | Calculator height in pixels |
| `data-3d="true"` | `false` | Use `Desmos.Calculator3D` instead of `Desmos.Calculator` |
| `data-no-toggle="true"` | `false` | Hide the Show/Hide Expressions button |
| `data-ready-fn="fnName"` | — | Callback `window.fnName(calc, container)` after JSON loads |

**Layout helpers:**

- `.dnb-row` — flex row container for side-by-side graphs
- `.dnb-graph--two-thirds` / `.dnb-graph--one-third` — unequal widths inside a row
- `.dnb-graph--float-left` / `.dnb-graph--float-right` — float for text wrapping (45% wide)
- `.dnb-clearfix` — end a float section
- `.dnb-caption` — styled italic caption below a graph
