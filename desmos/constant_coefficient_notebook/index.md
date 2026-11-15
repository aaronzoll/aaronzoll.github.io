---
layout: desmos-notebook
title: "Constant-Coefficient Differential Equations"
---

<!-- Panels, readouts and captions reuse the eigenvector notebook's styles. -->
<link rel="stylesheet" href="/desmos/eigenvector_notebook/eigen.css">
<link rel="stylesheet" href="/desmos/constant_coefficient_notebook/cc.css">
<script src="/desmos/constant_coefficient_notebook/cc.js"></script>



<p class="ev-credit">Continuing <a href="/desmos/linear-first-order">linear first order differential equations</a></p>


<blockquote class="cc-quote">
  <p>“We summarize with this, the most remarkable formula in mathematics: \(e^{i\theta} = \cos\theta + i\sin\theta\). This is our jewel.”</p>
  <footer>Richard Feynman</footer>
</blockquote>



<!-- Bernoulli's story sets up the graph below it. mathjax_ignore keeps MathJax
     from reading the dollar signs. For a portrait, add as the first child of .cc-story:
     <img class="cc-story-portrait" src="/assets/desmos/images/bernoulli.jpg" alt="Jacob Bernoulli"> -->
<!-- The introduction starts closed so the page opens on the figures. cc.js
     resizes the story graph when this opens (Desmos can't size itself while hidden). -->
<details class="desmos-calc-drop cc-intro" id="cc-intro">
<summary>Introduction: exponentials, constant coefficients, and the characteristic polynomial</summary>

<h3 id="vignette">A vignette on exponentials</h3>
<div class="latex-body">
    Exponentials make a consistent appearance in the study of differential equations, particularly when we model rates of change in proportion to a current amount. In the late seventeenth century, Jacob Bernoulli was wondering how money grows under this model, under what we call compound interest. Starting with a dollar and doubling it each year, after one year he would earn a dollar. This is 100 percent compounded interest, but applied in a sparse and discrete fashion, growing only once per year. Instead, he could apply 50 percent interest twice in a year, or 25 percent four times. He could break this up monthly, weekly, daily, all the way to the continuous limit. In this limit, we truly model that at any point in time, the \textit{rate of change} is proportional (in this case equal, with $r = 1$) to the \textit{amount invested}, $$y' = ry.$$ The solution to this equation, $y = e^{rx}$, is exactly the limit in the graph below.
</div>

<div class="ev-figure cc-story-figure">
  <div class="dnb-graph" data-json="constant_coefficient_notebook/story.json" data-height="320" data-no-toggle="true" data-ready-fn="ccStory"></div>
  <p class="ev-caption">One dollar at 100% interest over one year, compounded \(n = 1, 2, 4, 12, 52\) times.</p>
</div>

<h3 id="cc-eqs">Constant-coefficient differential equations</h3>

<div class="latex-body">
In <a href="https://docs.google.com/presentation/d/1mRZ4kvGlHGeye5UIaJJrYNFscxAnGh-0AB_BJHIYbro/edit?usp=sharing" target="_blank" rel="noopener">Lecture 30</a> we said that solutions to a linear, $n$th-order, homogeneous differential equation $L[y] = 0$ form an $n$-dimensional subspace $\mathcal{N}(L) \subseteq C^0(S)$ (continuous functions over some domain $S \subseteq \R$). As with finding solutions to the homogeneous system $A\mathbf{x} = \mathbf{0}$ in linear algebra, finding a basis is sufficient for finding all possible solutions. We can reduce the search from an infinite set to a finite one, as any solution is just a linear combination of our basis vectors.

For general coefficients $a_k(x)$ this is hard, often impossible. However, when the coefficients are constants,
$$a_ny^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = 0, \qquad a_n, \dots, a_1, a_0 \in \R, \quad a_n \neq 0,$$
the whole problem collapses to finding the roots of a single polynomial. We will assume that $a_n = 1$, without loss of generality, to make computations simpler.
</div>

<h3 id="char">The characteristic polynomial</h3>

<div class="latex-body">
Recall the example above about compound interest: $y' = ry$, which can equivalently be written as $y' - ry = 0$. We know the solution is the exponential $y = e^{rx}$. By linearity, and the fact that the differential equation is of order one, we actually know all solutions must be of the form $y = C_1e^{rx}$. Let's see if we can use this idea to guess other solutions to higher order, constant-coefficient, linear differential equations. 

Suppose we have the equation 
$$y^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = 0$$
and we think $e^{rx}$ is a solution, for some $r$. For now, $r$ is some free scalar, possibly complex. Note that each derivative just adds another multiplicative factor of $r$, i.e. $$y' = re^{rx}, \quad y'' = r^2e^{rx}, \quad \dots, \quad y^{(k)} = r^ke^{rx}.$$ Following this pattern and plugging these values in our differential equation, we get
$$L[e^{rx}] = \left(r^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0\right)e^{rx} = p(r)\,e^{rx} = 0.$$
That is, $L$ acts on an exponential by simply multiplying it by the number $p(r)$. Since $e^{rx}$ is never zero, $e^{rx}$ solves $L[y] = 0$ exactly when $p(r) = 0$.


\begin{remark}
Let's think a little more closely about the relationships outlined above. Here, we have $$L[e^{rx}] = p(r)e^{rx}.$$ With functions replacing vectors and linear operators (like $L$) replacing matrices, we have a way to equate the \textit{output of a linear operator} to the \textit{scaling of the input}. This is precisely an eigenvector-eigenvalue relationship, and this highlights a core technique for solving (ordinary and partial) differential equations. Note that in the simplest case, where $L[y] = y'$ is just applying the derivative, the eigenfunctions are any $e^{rx}$ with eigenvalue $r$. Since $L$ is built out of powers of $\tfrac{d}{dx}$, it is $p\left(\tfrac{d}{dx}\right)$, and so $e^{rx}$ is an eigenfunction of $L$ with eigenvalue $p(r)$. Compare with the <a href="/desmos/eigenvector_notebook/">eigenvectors notebook</a>, where $A\mathbf{v} = \lambda\mathbf{v}$ gives $A^k\mathbf{v} = \lambda^k\mathbf{v}$.
\end{remark}

\begin{definition}
The \textbf{characteristic polynomial} of the differential equation above is
$$p(r) = r^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0,$$
the polynomial with the same coefficients, where the $k$th derivative $y^{(k)}$ is replaced by the power $r^k$.
\end{definition}



Since $p$ has degree $n$, it has exactly $n$ roots, possibly repeated, possibly complex. Because the coefficients are real, the complex roots come in conjugate pairs, so the roots are always symmetric about the real axis. This is why, in the figure below, only one root of each complex pair can be dragged: its conjugate is forced to follow.
</div>

</details>

<h3 id="explore">Exploring the characteristic polynomial</h3>

<div class="latex-body">
Consider a constant-coefficient linear differential operator and its associated characteristic polynomial, $$L[y] = y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_1y' + a_0y \quad \longleftrightarrow \quad p(r) = r^n + a_{n-1}r^{n-1} + \dots + a_1r + a_0.$$
Below we graph the polynomial (on the left) and its roots (on the right, in the complex plane). We show repeated roots with concentric circles, to match the lecture notes.
</div>

<div class="ev-figure" id="cc1">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="constant_coefficient_notebook/poly.json" data-height="420" data-no-toggle="true" data-ready-fn="ccFig1Poly">
      <p class="ev-graph-title">The graph of \(p(r)\) for real \(r\)</p>
    </div>
    <div class="dnb-graph" data-json="constant_coefficient_notebook/plane.json" data-height="420" data-no-toggle="true" data-ready-fn="ccFig1Plane">
      <p class="ev-graph-title">The roots of \(p\) in the complex plane</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block cc-wide">
      <span class="ev-label">Equation</span>
      <div class="ev-grid2 cc-presets" id="cc1-presets"></div>
    </div>
    <div class="ev-block">
      <span class="ev-label">Coefficients of \(p(r)\)</span>
      <div class="cc-coefs" id="cc1-coefs"></div>
      <div class="cc-grid3" id="cc1-add">
        <button type="button" class="site-btn" data-add="real">+ Real root</button>
        <button type="button" class="site-btn" data-add="pair">+ Complex pair</button>
        <button type="button" class="site-btn" data-add="drop">− Last root</button>
      </div>
    </div>
  </div>
  <p class="ev-caption">Figure 1. The characteristic polynomial on the real line (left) and its roots in the complex plane (right).</p>
  <details class="desmos-calc-drop ev-calc" open>
    <summary>Computation</summary>
    <div class="ev-calc-math" id="cc1-calc-p"></div>
    <div class="ev-calc-math" id="cc1-calc-f"></div>
    <div class="ev-calc-math" id="cc1-calc-r"></div>
  </details>
</div>

<div class="latex-body">
Polynomials are a bit finicky. While roots and coefficients are related continuously (changing one slightly changes the other slightly), it isn't clear \textit{how} they affect each other. It is worth playing around a bit to see how they interact. Note that whatever polynomial is picked will govern the differential equation and the basis of its null space below.
</div>

<h3 id="basis">A basis of solutions</h3>

<div class="latex-body">
We can actually immediately move on to classifying all solutions to $L[y] = 0$. The roots of $p$, together with their multiplicities, give us everything we will need, and the following theorem outlines how to form a basis for $\mathcal{N}(L)$. 

\begin{theorem}\label{thm:basis}
Let $r_1, \dots, r_\ell$ be the distinct roots of $p(r)$, with multiplicities $n_1, \dots, n_\ell$. Each root contributes solutions to $L[y] = 0$ as follows.
<br>(1) A simple real root $r$ contributes $e^{rx}$.
<br>(2) A real root $r$ of multiplicity $m$ contributes $e^{rx}, xe^{rx}, \dots, x^{m-1}e^{rx}$.
<br>(3) A simple complex-conjugate pair $a \pm ib$, with $b \neq 0$, contributes $e^{ax}\cos(bx)$ and $e^{ax}\sin(bx)$.
<br>(4) A complex-conjugate pair $a \pm ib$ of multiplicity $m$ contributes $x^je^{ax}\cos(bx)$ and $x^je^{ax}\sin(bx)$ for $j = 0, 1, \dots, m - 1$.
<br>Altogether these are $n$ linearly independent functions, i.e. a basis $\beta$ of $\mathcal{N}(L)$.
\end{theorem}

We won't prove the linear independence, but it is worth seeing where each case comes from, since it is the same idea every time.

\textbf{Case (1)} is the computation above, in which $e^{rx}$ is a solution if and only if $p(r) = 0$. \textbf{Case (3)} is the same computation with a complex $r = a + ib$, along with Euler's formula, the jewel Feynman remarks upon: 
$$e^{(a + ib)x} = e^{ax}\left(\cos(bx) + i\sin(bx)\right).$$
This is a complex-valued solution and $L$ has real coefficients, so we have to treat the real and imaginary parts separately: $0 = L[u + iv] = L[u] + iL[v]$ forces both $L[u] = 0$ and $L[v] = 0$. So the real and imaginary parts, $e^{ax}\cos(bx)$ and $e^{ax}\sin(bx)$, are two real solutions. The conjugate root $a - ib$ gives back the same two functions (up to a sign), which is why a pair contributes two functions and not four.

\textbf{Case (2)} needs one more trick. The identity $L[e^{rx}] = p(r)e^{rx}$ holds for \textit{every} $r$, not just the roots. When $p(r) = 0$, then we get $L[e^{rx}] = 0$ as desired. However, watch what happens when we differentiate both sides with respect to $r$. The operator $L$ only takes derivatives in $x$, so on the left the derivative in $r$ passes through $L$ and lands on $e^{rx}$ alone, giving $\tfrac{\partial}{\partial r}e^{rx} = xe^{rx}$. On the right we use the product rule. Thus,
$$L[xe^{rx}] = p'(r)e^{rx} + p(r)xe^{rx}.$$
If $r$ is a double root, then $p(r) = 0$ \textit{and} $p'(r) = 0$, so the right-hand side vanishes and $xe^{rx}$ is a second solution! Differentiating again gives $x^2e^{rx}$ as a solution whenever $p''(r) = 0$ as well, and so on. A root of multiplicity $m$ is exactly one where $p, p', \dots, p^{(m-1)}$ all vanish, which gives $e^{rx}, \dots, x^{m-1}e^{rx}$. \textbf{Case (4)} is Cases (2) and (3) at once.

As a sanity check on the count: a real root of multiplicity $m$ gives $m$ functions, and a complex pair of multiplicity $m$ accounts for $2m$ roots and gives $2m$ functions. So the number of basis functions always equals the number of roots counted with multiplicity, which is $n = \dim \mathcal{N}(L)$, just as expected.

\begin{example}
Consider $y^{(4)} = y$ (Example 2 of Lecture 31), i.e. functions equal to their own fourth derivative. Here $p(r) = r^4 - 1 = (r - 1)(r + 1)(r^2 + 1)$, with the simple real roots $\pm 1$ (Case (1)) and the simple pair $\pm i$ (Case (3)). So
$$\beta = \left\{e^x, e^{-x}, \cos x, \sin x\right\}, \qquad y(x) = c_1e^x + c_2e^{-x} + c_3\cos x + c_4\sin x.$$
For Example 4 of Lecture 31, $p(r) = r^4 + 4r^3 + 8r^2 + 8r + 4 = (r^2 + 2r + 2)^2$ has the pair $-1 \pm i$ with multiplicity two (Case (4)), so $\beta = \left\{e^{-x}\cos x, e^{-x}\sin x, xe^{-x}\cos x, xe^{-x}\sin x\right\}$. Both are presets in the figures.
\end{example}

The figure below shares its roots with Figure 1, so changes made in either one carry over to the other. On the right are the basis functions. For a repeated root, the extra copies (e.g. $xe^{rx}, x^2e^{rx}, \dots$) fade out. When toggled on, a complementary solution will appear, the combination $y_c = c_1y_1 + \cdots + c_ny_n$.
</div>

<div class="ev-figure" id="cc2">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--one-third" data-json="constant_coefficient_notebook/plane.json" data-height="440" data-no-toggle="true" data-ready-fn="ccFig2Plane">
      <p class="ev-graph-title">Roots of \(p\)</p>
    </div>
    <div class="dnb-graph dnb-graph--two-thirds" data-json="constant_coefficient_notebook/basis.json" data-height="440" data-no-toggle="true" data-ready-fn="ccFig2Basis">
      <p class="ev-graph-title">The basis \(\beta\) and the combination \(y_c\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block">
      <span class="ev-label">Display</span>
      <div class="ev-grid2">
        <button type="button" class="site-btn ev-toggle site-btn--active" id="cc2-basis" aria-pressed="true">Basis functions</button>
        <button type="button" class="site-btn ev-toggle" id="cc2-comb" aria-pressed="false">Combination \(y_c\)</button>
      </div>
    </div>
    <!-- Shown only while "Combination" is on. -->
    <div class="ev-block" id="cc2-coords-block" style="display:none">
      <span class="ev-label">Coordinates of \(y_c\)</span>
      <div class="cc-coefs" id="cc2-coords"></div>
    </div>
  </div>
  <p class="ev-caption">Figure 2. Roots of the characteristic polynomial and their associated basis functions.</p>
  <details class="desmos-calc-drop ev-calc" open>
    <summary>Computation</summary>
    <div class="ev-calc-math" id="cc2-calc-table"></div>
    <div class="ev-calc-math" id="cc2-calc-beta"></div>
    <div class="ev-calc-math" id="cc2-calc-yc"></div>
  </details>
</div>

<div class="latex-body">
All that is needed to construct a basis for the set of solutions to the homogeneous equation (of a linear, constant-coefficient differential equation) is knowledge of the roots and their multiplicities. Specifically, for a root $r_i = a+bi$, the real part $a$ is the rate of growth or decay, i.e. the factor $e^{ax}$, and the imaginary part $b$ is the frequency of oscillation, i.e. $\cos(bx)$ or $\sin(bx)$. Then, repeated roots simply tack on additional powers of $x$.

\begin{remark}
Something interesting regarding this extra multiplicative factor of $x$ for repeated roots: try dragging a complex pair $a \pm bi$ down onto the real axis. Note that as $b \to 0$, the oscillations slow down, and the pair converges to a real root of multiplicity two. Thus, we should expect solutions $e^{ax}$ and $xe^{ax}$ to appear. That extra $x$ term is not as arbitrary as it looks, nor is it just a convenient coincidence. By linearity, scaling by $1/b$, we have that $e^{ax}\tfrac{\sin(bx)}{b}$ also solves the homogeneous equation when $a \pm ib$ are roots. Then, since $\tfrac{\sin(bx)}{b} \to x$ as $b \to 0$, we have the limiting term $xe^{ax}$ as a solution as well.

Of course, we have to be careful in this argument, as the relationship between differential equations and their solutions is not always continuous. Small changes in things like coefficients may actually cause wildly different solutions. However, in the case above, the argument is justified.
\end{remark}
</div>

<!-- Particular solutions are covered in separate lectures, so this part starts
     closed too. cc.js redraws Figure 3's graphs when it opens. -->
<details class="desmos-calc-drop cc-intro" id="cc-particular">
<summary>Particular solutions: non-homogeneous equations and undetermined coefficients</summary>

<h3 id="particular">Particular solutions</h3>

<div class="latex-body">
Recall from the end of Lecture 31 that the non-homogeneous equation $L[y] = b(x)$ has the same structure as a linear system $A\mathbf{x} = \mathbf{b}$. If $y_p$ is any one solution, then the general solution is
$$y(x) = y_c(x) + y_p(x), \qquad y_c \in \mathcal{N}(L),$$
exactly like $\mathbf{x}_p + \mathcal{N}(A)$ on the <a href="/desmos/null-space-range">null space and range</a> page (and as we saw for <a href="/desmos/linear-first-order">first order equations</a>). We already know how to find the family of functions that make up $y_c$, so what is left is to find a \textit{single} particular solution $y_p$. For constant coefficients and the right kind of $b(x)$, the same (eigen-like) identity $L[e^{sx}] = p(s)e^{sx}$ will do most of the work for us.

In particular, if $b(x) = e^{sx}$ (possibly complex $s$) and $p(s) \neq 0$, then
$$L\left[\frac{e^{sx}}{p(s)}\right] = \frac{p(s)e^{sx}}{p(s)} = e^{sx} = b(x), \qquad \text{so} \qquad y_p = \frac{e^{sx}}{p(s)}.$$
Similarly, for a non-homogeneous term like $e^{\alpha x}\cos(\beta x)$, we just take $s = \alpha + i\beta$, and keep the real part, since (as in Case (3)) $L$ with real coefficients keeps real and imaginary parts apart. That is, the solution is $\operatorname{Re}\left(\tfrac{e^{sx}}{p(s)}\right)$. If $b$ has $\sin(\beta x)$ instead, we keep the imaginary part.

\begin{example}
For $y'' + y = \cos(2x)$, we have $p(r) = r^2 + 1$ and $s = 2i$, so $p(2i) = -4 + 1 = -3$. Then $y_p = \operatorname{Re}\left(\tfrac{e^{2ix}}{-3}\right) = -\tfrac{1}{3}\cos(2x)$, and the general solution is $y = c_1\cos x + c_2\sin x - \tfrac{1}{3}\cos(2x)$.
\end{example}

The method of \textbf{undetermined coefficients} continues this idea, extended to polynomials times exponentials times sines and cosines. However, rather than dividing by $p(s)$, we guess the form of $y_p$ with unknown constants, plug it into $L[y]$, and match coefficients. Note, this will require taking some derivatives and applying lots of product (and chain) rule!

\begin{theorem}\label{thm:uc}
Let $b(x) = P(x)e^{\alpha x}\cos(\beta x)$ or $b(x) = P(x)e^{\alpha x}\sin(\beta x)$, where $P$ is a polynomial of degree $m$ (we only consider a single trigonometric term here). Set $s = \alpha + i\beta$, and let $k$ be the multiplicity of $s$ as a root of $p$ (with $k = 0$ if $p(s) \neq 0$). Then $L[y] = b(x)$ has a particular solution of the form
$$y_p(x) = x^ke^{\alpha x}\left[\left(A_0 + A_1x + \cdots + A_mx^m\right)\cos(\beta x) + \left(B_0 + B_1x + \cdots + B_mx^m\right)\sin(\beta x)\right].$$
When $\beta = 0$ there is no sine or cosine, and the guess is just $x^ke^{\alpha x}\left(A_0 + \cdots + A_mx^m\right)$.
\end{theorem}

Two things are worth noting. First, we need both the $\cos$ and the $\sin$ in the guess even when $b$ only has one of them, since derivatives turn one into the other. Second, the factor $x^k$ is there because of the homogeneous solutions. If $s$ is a root of $p$, then $e^{sx}$ is already in $\mathcal{N}(L)$, so $L$ sends it (and any multiple of it) to zero, and we could never produce $b$. 

The same derivative trick from before (essentially just the product rule) gives $L\left[x^ke^{sx}\right] = p^{(k)}(s)e^{sx}$ when $p(s) = \cdots = p^{(k-1)}(s) = 0$, so for $b = e^{sx}$,
$$y_p = \frac{x^ke^{sx}}{p^{(k)}(s)},$$
which is the formula $\tfrac{e^{sx}}{p(s)}$ with $p(s)$ replaced by the first non-vanishing derivative. If $p(s) \ne 0$, i.e. it is not a root, then it is exactly what we saw before. More examples will be seen in homework, and unfortunately, these computations can be quite tedious and it is easy to make errors, so tread slowly.

\begin{example}
For $y'' + y = \cos x$, now $s = i$ \textit{is} a simple root of $p(r) = r^2 + 1$, so $k = 1$. With $p'(r) = 2r$,
$$y_p = \operatorname{Re}\left(\frac{xe^{ix}}{2i}\right) = \operatorname{Re}\left(-\frac{i}{2}x\left(\cos x + i\sin x\right)\right) = \frac{1}{2}x\sin x.$$


This is an example of \textbf{resonance}. The left-hand side, $L[y]$, is our spring-type differential equation. Its solutions are sines and cosines, with some frequency. The right-hand side is saying that there is some external force, which matches the underlying frequency. Notably, the resulting solution, that is, what would happen to the system over time, still oscillates, but with increasing magnitude, indefinitely. Many real-world systems follow the same structure, so we need to be wary of external forces matching their resonant frequency (otherwise things like bridges can collapse or glass can break).
\end{example}

In the figure below, the non-homogeneous term is $b(x) = x^me^{\alpha x}\cos(\beta x)$ or $x^me^{\alpha x}\sin(\beta x)$, set with the sliders for $m$, $\alpha$, $\beta$ and the $\cos$/$\sin$ toggle. Starting from $y'' + y = \cos(2x)$, try lowering $\beta$ toward $1$ and watch $\left|\tfrac{1}{p(s)}\right|$ in the computation. As $s$ approaches the root $i$, the amplitude of $y_p$ blows up, and once $s$ lands on it, the bounded solution is replaced by the growing $\tfrac{1}{2}x\sin x$.
</div>

<div class="ev-figure" id="cc3">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--one-third" data-json="constant_coefficient_notebook/plane.json" data-height="440" data-no-toggle="true" data-ready-fn="ccFig3Plane">
      <p class="ev-graph-title">Roots of \(p\) and \(s = \alpha + i\beta\)</p>
    </div>
    <div class="dnb-graph dnb-graph--two-thirds" data-json="constant_coefficient_notebook/particular.json" data-height="440" data-no-toggle="true" data-ready-fn="ccFig3Graph">
      <p class="ev-graph-title">The non-homogeneous term \(b(x)\) and a particular solution \(y_p\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block cc-wide">
      <span class="ev-label">Left-hand side \(L[y]\)</span>
      <div class="cc-grid3 cc-presets" id="cc3-presets"></div>
    </div>
    <div class="ev-block">
      <span class="ev-label">Non-homogeneous term</span>
      <div class="cc-bx" id="cc3-b"></div>
      <div class="cc-coefs" id="cc3-sliders"></div>
      <div class="ev-grid2" id="cc3-trig"></div>
      <span class="ev-hint">\(b(x) = x^me^{\alpha x}\cos(\beta x)\) or \(x^me^{\alpha x}\sin(\beta x)\). </span>
    </div>
  </div>
  <p class="ev-caption">Figure 3. Undetermined coefficients.</p>
  <details class="desmos-calc-drop ev-calc" open>
    <summary>Computation</summary>
    <div class="ev-calc-math" id="cc3-calc-eq"></div>
    <div class="ev-calc-math" id="cc3-calc-k"></div>
    <div class="ev-calc-math" id="cc3-calc-guess"></div>
    <div class="ev-calc-math" id="cc3-calc-yp"></div>
  </details>
</div>

<div class="latex-body">



To reiterate, the full recipe for $L[y] = b(x)$ with constant coefficients:
\begin{itemize}
\item find the roots of $p(r)$ and their multiplicities, which give the basis $\beta$ and $y_c = c_1y_1 + \cdots + c_ny_n$;
\item find one particular solution $y_p$, by guessing its form from $s$ and $k$ and matching coefficients;
\item write $y = y_c + y_p$, and if there are initial conditions, solve for $c_1, \dots, c_n$ \textit{last}, using the entire function $y$, not just $y_c$.
\end{itemize}
Note that the last step is a linear system to solve for the unknown $c_i$ variables.

Let's work through two examples in full, matching coefficients by hand: one where $s$ is not a root, and one where it is a repeated root.

\begin{example}
Consider $y''' - 5y'' + 6y' = xe^{3x}\cos x$. Here $p(r) = r^3 - 5r^2 + 6r = r(r - 2)(r - 3)$, so $y_c = c_1 + c_2e^{2x} + c_3e^{3x}$. The non-homogeneous term has $P(x) = x$ (so $m = 1$), $\alpha = 3$ and $\beta = 1$, so $s = 3 + i$. This is not a root of $p$ (only $3$ is), so $k = 0$, and the guess is
$$y_p = e^{3x}u, \qquad u = (A_0 + A_1x)\cos x + (B_0 + B_1x)\sin x.$$
Rather than carrying the $e^{3x}$ through every derivative (\textbf{this is a useful trick}), note that the product rule gives $(e^{3x}u)' = e^{3x}(u' + 3u)$. Repeating this,
$$y' = e^{3x}(u' + 3u), \quad y'' = e^{3x}(u'' + 6u' + 9u), \quad y''' = e^{3x}(u''' + 9u'' + 27u' + 27u).$$
Plugging these in, the $e^{3x}$ factors out of every term, and
$$y''' - 5y'' + 6y' = e^{3x}\left(u''' + 4u'' + 3u'\right),$$
so we need $u''' + 4u'' + 3u' = x\cos x$ (canceling the exponential term since it is never $0$). Also note that the $u$ terms cancel exactly because $p(3) = 0$. Next, let's compute the derivatives of $u$, grouped by $\cos x$ and $\sin x$. Again, it is useful to defer calculations as longas possible in case things cancel early.
$$\begin{aligned} u' &= (A_1 + B_0 + B_1x)\cos x + (B_1 - A_0 - A_1x)\sin x, \\ u'' &= (2B_1 - A_0 - A_1x)\cos x - (2A_1 + B_0 + B_1x)\sin x, \\ u''' &= -(3A_1 + B_0 + B_1x)\cos x + (A_0 - 3B_1 + A_1x)\sin x. \end{aligned}$$
Adding up $u''' + 4u'' + 3u'$ and collecting terms, we get
$$\left[(2B_1 - 4A_1)x + (8B_1 + 2B_0 - 4A_0)\right]\cos x - \left[(2A_1 + 4B_1)x + (2A_0 + 8A_1 + 4B_0)\right]\sin x = x\cos x.$$
Matching the coefficients of $x\cos x$, $\cos x$, $x\sin x$ and $\sin x$ on both sides gives four equations (for the four unknowns!):
$$\begin{aligned} -4A_1 + 2B_1 &= 1, &\qquad -4A_0 + 2B_0 + 8B_1 &= 0, \\ -2A_1 - 4B_1 &= 0, &\qquad -2A_0 - 8A_1 - 4B_0 &= 0. \end{aligned}$$
The left pair only involves the leading coefficients, so we solve it first: $A_1 = -2B_1$, so $10B_1 = 1$, giving $B_1 = \tfrac{1}{10}$ and $A_1 = -\tfrac{1}{5}$. Substituting these into the right pair leaves $2A_0 - B_0 = \tfrac{2}{5}$ and $A_0 + 2B_0 = \tfrac{4}{5}$, so $A_0 = \tfrac{8}{25}$ and $B_0 = \tfrac{6}{25}$. Altogether,
$$y_p = e^{3x}\left[\left(\frac{8}{25} - \frac{1}{5}x\right)\cos x + \left(\frac{6}{25} + \frac{1}{10}x\right)\sin x\right].$$
As a sanity check, the original shortcut we introduced this method with agrees on the leading terms: $p(3 + i) = (3 + i)(1 + i)i = -4 + 2i$, and $\operatorname{Re}\left(\tfrac{xe^{(3 + i)x}}{-4 + 2i}\right) = e^{3x}\left(-\tfrac{1}{5}x\cos x + \tfrac{1}{10}x\sin x\right)$. Unfortunately, we missed some of the other terms, so the complete method above was needed. 
\end{example}

\begin{example}
Now one with a repeated root: $y''' - 3y' + 2y = xe^x$. Here $p(r) = r^3 - 3r + 2 = (r - 1)^2(r + 2)$, so $y_c = c_1e^x + c_2xe^x + c_3e^{-2x}$. This time $s = 1$ \textit{is} a root, of multiplicity $k = 2$, and $P(x) = x$ has degree $m = 1$, so the guess is
$$y_p = x^2e^x(A_0 + A_1x) = e^xu, \qquad u = A_0x^2 + A_1x^3.$$
Without the factor $x^2$, the guess $(A_0 + A_1x)e^x$ would lie entirely in $\mathcal{N}(L)$, and $L$ would send it to zero no matter the constants. Continuing on and using the same application of product rule as before,
$$y' = e^x(u' + u), \quad y'' = e^x(u'' + 2u' + u), \quad y''' = e^x(u''' + 3u'' + 3u' + u),$$
so
$$y''' - 3y' + 2y = e^x\left(u''' + 3u''\right).$$
This time both the $u$ and $u'$ terms cancel, since $p(1) = p'(1) = 0$ at the double root. With $u'' = 2A_0 + 6A_1x$ and $u''' = 6A_1$, we need
$$u''' + 3u'' = (6A_0 + 6A_1) + 18A_1x = x.$$
Matching the coefficients of the $x$ term and the constant $1$ term gives $18A_1 = 1$ and $6A_0 + 6A_1 = 0$, so $A_1 = \tfrac{1}{18}$ and $A_0 = -\tfrac{1}{18}$. Therefore
$$y_p = \frac{1}{18}\left(x^3 - x^2\right)e^x, \qquad y = c_1e^x + c_2xe^x + c_3e^{-2x} + \frac{1}{18}\left(x^3 - x^2\right)e^x.$$
\end{example}

\begin{remark}
When $b$ is a sum of such terms, say $b = b_1 + b_2$, we find a particular solution for each piece separately and add them, since $L[y_1 + y_2] = L[y_1] + L[y_2] = b_1 + b_2$ by linearity. For example, $y'' + y = \cos x + e^x$ has $y_p = \tfrac{1}{2}x\sin x + \tfrac{1}{2}e^x$. This is also known as \textbf{superposition}.
\end{remark}

</div>

</details>
