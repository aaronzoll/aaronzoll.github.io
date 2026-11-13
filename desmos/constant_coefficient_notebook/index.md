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

<h3 id="char">A vignette on exponentials</h3>     
<div class="latex-body">
    Exponentials make a consistent appearance in the study of differnetial equations, particularly when we model rates of change in proportion to a current amount. In the late seventeenth century, Jacob Bernoulli was wondering how money grows under this model, under what we call compound interest. Starting with a dollar and doubling it each year, after one year he would earn a dollar. This is 100 percent compounded interest, but applied in a sparse and discrete fashion, with a growth only once per year. Instead, he could apply 50 percent interest, twice in a year. Or 25 percent four times. He could break this up monthly, weekly, daily, all the way until we get the continuously limiting behavior. In this limit, we truly model that at any point in time, the \textit{rate of change} is proportional (in this case equal with $r = 1$) to the \textit{amount invested} $$y' = ry.$$ Solving this equation amounts to the function that models the limit below: $e^{rx}$ 
</div>

<div class="ev-figure cc-story-figure">
  <div class="dnb-graph" data-json="constant_coefficient_notebook/story.json" data-height="320" data-no-toggle="true" data-ready-fn="ccStory"></div>
  <p class="ev-caption">One dollar at 100% interest over one year, compounded \(n = 1, 2, 4, 12, 52\) times.</p>
</div>

<h3 id="char">Constant-coefficient differential equations</h3>

<div class="latex-body">
In <a href="https://docs.google.com/presentation/d/1mRZ4kvGlHGeye5UIaJJrYNFscxAnGh-0AB_BJHIYbro/edit?usp=sharing" target="_blank" rel="noopener">Lecture 30</a> we said that solutions to a linear, $n$th-order, homogeneous differential equation $L[y] = 0$ form a subspace $n$-dimensional subspace $\mathcal{N}(L) \subseteq C^0(S)$ (continuous functions over some domain $S \subseteq \R$). As with finding solutions to the homogeneous system in linear algebra $A\mathbf{x} = \mathbf{0}$, finding a basis is sufficient to finding all possible solutions. We can reduce the search from an infinite set to a finite one, as any solution is just a linear combination of our basis vectors.

For general coefficients $a_k(x)$ this is hard, often impossible. However, when the coefficients are constants,
$$a_ny^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = 0, \qquad a_n, \dots, a_1, a_0 \in \R, \quad a_n \neq 0,$$
the whole problem collapses to finding the roots of a single polynomial. We will assume that $a_n = 1$, without loss of generality, to make computations simpler.
</div>

<h3 id="char">The characteristic polynomial</h3>

<div class="latex-body">
Recall the example above about compound interest: $y' = ry$ which can equivalently be written as $y'-ry = 0$. We know the solution is the exponential $y = e^{rx}$. By linearity, and the fact the differential equation is of order one, we actually know all solution must be of the form $y = C_1e^{rx}$. Let's see if we can use this idea to guess other solutions to higher order, constant-coefficient, linear differential equations. 

Suppose we have the equation 
$$y^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = 0$$
and we think $e^{rx}$ is a solution, for some $r$. For now, $r$ is some free scalar, possible comple. Note that each derivative just adds another multipliciatve factor of $r$, i.e. $$y' = re^{rx}, \quad r'' = r^2e^{rx}, \quad ..., \quad y^{(k)} = r^ke^{rx}.$$ Following this pattern and plugging these values in our differential equation, we get
$$L[e^{rx}] = \left(r^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0\right)e^{rx} = p(r)\,e^{rx} = 0.$$
That is, $L$ acts on an exponential by simply multiplying it by the number $p(r)$. Since $e^{rx}$ is never zero, $e^{rx}$ solves $L[y] = 0$ exactly when $p(r) = 0$.


\begin{remark}
Let's think a little closer about the relationships outlined above. Here, we have $$L[e^{rx}] = p(r)e^{rx}.$$ With functions replacing vectors and linear operators (like $L$) replacing matrices, we have a way to equate the \textit{output of a linear operator} to the \textit{scaling of the input}. This is precisely an eigenvector-eigenvalue relationship, and this highlights a core technique to solving (ordinary and partial) differential equations. Note that in the simplest case, where $L[y] = y'$ is just applying the derivative, the eigenfunctions are any $e^{rx}$ with eigenvalue $r$. Since $L$ is built out of powers of $\tfrac{d}{dx}$, it is $p\left(\tfrac{d}{dx}\right)$, and so $e^{rx}$ is an eigenfunction of $L$ with eigenvalue $p(r)$. Compare with the <a href="/desmos/eigenvector_notebook/">eigenvectors notebook</a>, where $A\mathbf{v} = \lambda\mathbf{v}$ gives $A^k\mathbf{v} = \lambda^k\mathbf{v}$.
\end{remark}

\begin{definition}
The \textbf{characteristic polynomial} of the differential equation above is
$$p(r) = r^n + a_{n-1}r^{n-1} + \cdots + a_1r + a_0,$$
the polynomial with the same coefficients, where the $k$th derivative $y^{(k)}$ is replaced by the power $r^k$.
\end{definition}



Since $p$ has degree $n$, it has exactly $n$ roots, possibly repeated, possibly complex. Because the coefficients are real, the complex roots come in conjugate pairs, so the roots are always symmetric about the real axis. This is why, in the figure below, only one root of each complex pair can be dragged: its conjugate is forced to follow.
</div>

</details>

<h3 id="char">Exploring the characteristic polynomial</h3>

<div class="latex-body">
Considering some constant-coefficient linear differential operator and its associated characteristic polynomial $$L[y] = y^{n}+a_{n-1}y^{n-1}+ \dots + a_1y'+a_0y \quad \longleftrightarrow \quad p(r) = r^n + a_{n-1}r^{n-1} + \dots + a_1r + a_0.$$
Below we graph the polynomial (on the right) and its roots (on the left, in the complex plane). We show repeated roots with concentric circles to match lecture notes. 
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
Polynomials are a bit finnicky. While roots and coefficients are related continuously (changing one slightly changes the other slightly), it isn't clear \textit{how} they affect each other. It is worth playing around a bit to see how they interact. Note that whatever polynomial is picked with govern the differential equation and the basis of its null space below. 
</div>

<h3 id="basis">A basis of solutions</h3>

<div class="latex-body">
We can actually immediately move on to classifying all solutions to $L[y] = 0$. The roots of $p$, together with their multiplicities, give us everything we will need, and the following theorem outlines how to form a basis for $\mathcal{N}(L)$. 

\begin{theorem}\label{thm:basis}
Let $r_1, \dots, r_p$ be the distinct roots of $p(r)$, with multiplicities $n_1, \dots, n_p$. Each root contributes solutions to $L[y] = 0$ as follows.
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

\textbf{Case (2)} needs one more trick. The identity $L[e^{rx}] = p(r)e^{rx}$ holds for \textit{every} $r$, not just the roots. When $p(r) = 0$, then we get $L[e^{rx}] = 0$ as desired. However, watch what happens when we differentiate both sides with respect to $r$. The operator only depends on $y= y(x)$ and its derivatives, also only dependent on $x$, so we just differneitate the inside term, which is $\tfrac{\partial}{\partial r}e^{rx} = xe^{rx}$. On the right we use the product rule. Thus,
$$L[xe^{rx}] = p'(r)e^{rx} + p(r)xe^{rx}.$$
If $r$ is a double root, then $p(r) = 0$ \textit{and} $p'(r) = 0$, so the right-hand side vanishes and $xe^{rx}$ is a second solution! Differentiating again gives $x^2e^{rx}$ as a solution whenever $p''(r) = 0$ as well, and so on. A root of multiplicity $m$ is exactly one where $p, p', \dots, p^{(m-1)}$ all vanish, which gives $e^{rx}, \dots, x^{m-1}e^{rx}$. \textbf{Case (4)} is Cases (2) and (3) at once.

As a sanity check on the count: a real root of multiplicity $m$ gives $m$ functions, and a complex pair of multiplicity $m$ accounts for $2m$ roots and gives $2m$ functions. So the total number of roots always sums to $n$, which is $\dim \mathcal{N}(L)$, just as it must be for a basis.

\begin{example}
Consider $y^{(4)} = y$ (Example 2 of Lecture 31), i.e. functions equal to their own fourth derivative. Here $p(r) = r^4 - 1 = (r - 1)(r + 1)(r^2 + 1)$, with the simple real roots $\pm 1$ (Case (1)) and the simple pair $\pm i$ (Case (3)). So
$$\beta = \left\{e^x, e^{-x}, \cos x, \sin x\right\}, \qquad y(x) = c_1e^x + c_2e^{-x} + c_3\cos x + c_4\sin x.$$
For Example 4 of Lecture 31, $p(r) = r^4 + 4r^3 + 8r^2 + 8r + 4 = (r^2 + 2r + 2)^2$ has the pair $-1 \pm i$ with multiplicity two (Case (4)), so $\beta = \left\{e^{-x}\cos x, e^{-x}\sin x, xe^{-x}\cos x, xe^{-x}\sin x\right\}$. Both are presets in the figures.
\end{example}

The figure below shares its roots with Figure 1, so changes made in either one carry over to the other. On the right are the basis functions, each in the color of the root it came from: solid for $e^{rx}$ or $e^{ax}\cos(bx)$, and dashed for $e^{ax}\sin(bx)$. For a repeated root, the extra copies $xe^{rx}, x^2e^{rx}, \dots$ fade out as the power of $x$ grows. The black curve is the combination $y_c = c_1y_1 + \cdots + c_ny_n$, and the sliders $c_k$ are its coordinates with respect to $\beta$ (recall <a href="/desmos/change-of-basis">coordinates</a> from Lecture 14). Changing the $c_k$ moves through all of $\mathcal{N}(L)$.
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
  <p class="ev-caption">Figure 2. Each root contributes basis functions according to its case; the black curve is a general element of \(\mathcal{N}(L)\).</p>
  <details class="desmos-calc-drop ev-calc" open>
    <summary>Computation</summary>
    <div class="ev-calc-math" id="cc2-calc-table"></div>
    <div class="ev-calc-math" id="cc2-calc-beta"></div>
    <div class="ev-calc-math" id="cc2-calc-yc"></div>
  </details>
</div>

<div class="latex-body">
The location of a root tells us how its functions behave. The real part $a$ is the rate of growth or decay of $e^{ax}$, and the imaginary part $b$ is the frequency of oscillation. So if every root lies in the left half-plane, every solution decays to zero, no matter the $c_k$ (try dragging all the roots to the left). Roots on the imaginary axis give oscillations that neither grow nor decay, and a single root in the right half-plane is enough for most solutions to blow up.

\begin{remark}
Try dragging a complex pair down onto the real axis. As $b \to 0$, the oscillations slow down, and the pair lands as a double real root. The extra $x$ in Case (2) is not as arbitrary as it looks. The function $e^{ax}\tfrac{\sin(bx)}{b}$ also solves the equation for the pair $a \pm ib$, and since $\tfrac{\sin(bx)}{b} \to x$ as $b \to 0$, it becomes exactly $xe^{ax}$ in the limit.
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
exactly like $\mathbf{x}_p + \mathcal{N}(A)$ on the <a href="/desmos/null-space-range">null space and range</a> page (and as we saw for <a href="/desmos/linear-first-order">first order equations</a>). We already know how to find $y_c$, so what is left is to find a \textit{single} particular solution $y_p$. For constant coefficients and the right kind of $b(x)$, the same identity $L[e^{sx}] = p(s)e^{sx}$ does the work.

The key observation is this: if $b(x) = e^{sx}$ and $p(s) \neq 0$, then
$$L\left[\frac{e^{sx}}{p(s)}\right] = \frac{p(s)e^{sx}}{p(s)} = e^{sx}, \qquad \text{so} \qquad y_p = \frac{e^{sx}}{p(s)}.$$
Just one division! For a non-homogeneous term like $e^{\alpha x}\cos(\beta x)$, we take $s = \alpha + i\beta$, solve with $e^{sx}$, and keep the real part, since (as in Case (3)) $L$ with real coefficients keeps real and imaginary parts apart. For $\sin(\beta x)$ we keep the imaginary part instead.

\begin{example}
For $y'' + y = \cos(2x)$, we have $p(r) = r^2 + 1$ and $s = 2i$, so $p(2i) = -4 + 1 = -3$. Then $y_p = \operatorname{Re}\left(\tfrac{e^{2ix}}{-3}\right) = -\tfrac{1}{3}\cos(2x)$, and the general solution is $y = c_1\cos x + c_2\sin x - \tfrac{1}{3}\cos(2x)$.
\end{example}

The method of \textbf{undetermined coefficients} is this idea, extended to polynomials times exponentials times sines and cosines. Rather than dividing, we guess the form of $y_p$ with unknown constants, plug it in, and match coefficients.

\begin{theorem}\label{thm:uc}
Let $b(x) = P(x)e^{\alpha x}\cos(\beta x)$ or $b(x) = P(x)e^{\alpha x}\sin(\beta x)$, where $P$ is a polynomial of degree $m$. Set $s = \alpha + i\beta$, and let $k$ be the multiplicity of $s$ as a root of $p$ (with $k = 0$ if $p(s) \neq 0$). Then $L[y] = b(x)$ has a particular solution of the form
$$y_p(x) = x^ke^{\alpha x}\left[\left(A_0 + A_1x + \cdots + A_mx^m\right)\cos(\beta x) + \left(B_0 + B_1x + \cdots + B_mx^m\right)\sin(\beta x)\right].$$
When $\beta = 0$ there is no sine or cosine, and the guess is just $x^ke^{\alpha x}\left(A_0 + \cdots + A_mx^m\right)$.
\end{theorem}

Two things are worth noting. First, we need both the $\cos$ and the $\sin$ in the guess even when $b$ only has one of them, since derivatives turn one into the other. Second, the factor $x^k$ is there because of the homogeneous solutions. If $s$ is a root of $p$, then $e^{sx}$ is already in $\mathcal{N}(L)$, so $L$ sends it (and any multiple of it) to zero, and no such guess can ever produce $b$. This is the same ladder as in Case (2): the first function up the ladder that $L$ does not kill is $x^ke^{sx}$, where $k$ is the multiplicity. Precisely, the derivative trick from before gives $L\left[x^ke^{sx}\right] = p^{(k)}(s)e^{sx}$ when $p(s) = \cdots = p^{(k-1)}(s) = 0$, so for $b = e^{sx}$,
$$y_p = \frac{x^ke^{sx}}{p^{(k)}(s)},$$
which is the formula $\tfrac{e^{sx}}{p(s)}$ with $p(s)$ replaced by the first derivative that does not vanish.

\begin{example}
For $y'' + y = \cos x$, now $s = i$ \textit{is} a simple root of $p(r) = r^2 + 1$, so $k = 1$. With $p'(r) = 2r$,
$$y_p = \operatorname{Re}\left(\frac{xe^{ix}}{2i}\right) = \operatorname{Re}\left(-\frac{i}{2}x\left(\cos x + i\sin x\right)\right) = \frac{1}{2}x\sin x.$$
This is \textbf{resonance}: pushing a spring at its natural frequency, the amplitude grows linearly in $x$, rather than staying bounded.
\end{example}

In the figure below, the non-homogeneous term is $b(x) = x^me^{\alpha x}\cos(\beta x)$ or $x^me^{\alpha x}\sin(\beta x)$, set with the sliders for $m$, $\alpha$, $\beta$ and the $\cos$/$\sin$ toggle. The orange point is $s = \alpha + i\beta$ (with its conjugate, faded), and dragging it moves $\alpha$ and $\beta$ as well. On the right, $b(x)$ is the dashed curve and $y_p$ is the orange curve. When dragged, $s$ snaps onto a root of $p$ when it gets close, and the guess picks up its factor $x^k$. The roots can be dragged here as well. Starting from $y'' + y = \cos(2x)$, try lowering $\beta$ toward $1$ and watch $\left|\tfrac{1}{p(s)}\right|$ in the computation. As $s$ approaches the root $i$, the amplitude of $y_p$ blows up, and once it lands, the bounded solution is replaced by the growing $\tfrac{1}{2}x\sin x$. For $y''' - y''$, try $\alpha = \beta = 0$ (a constant $b$): $0$ is a double root, so $k = 2$ and the guess starts at $x^2$.
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
      <span class="ev-hint">\(b(x) = x^me^{\alpha x}\cos(\beta x)\) or \(x^me^{\alpha x}\sin(\beta x)\). Dragging \(s\) on the left also sets \(\alpha\) and \(\beta\).</span>
    </div>
  </div>
  <p class="ev-caption">Figure 3. Undetermined coefficients: the guess depends on whether \(s\) is a root of \(p\), and with what multiplicity.</p>
  <details class="desmos-calc-drop ev-calc" open>
    <summary>Computation</summary>
    <div class="ev-calc-math" id="cc3-calc-eq"></div>
    <div class="ev-calc-math" id="cc3-calc-k"></div>
    <div class="ev-calc-math" id="cc3-calc-guess"></div>
    <div class="ev-calc-math" id="cc3-calc-yp"></div>
  </details>
</div>

<div class="latex-body">
\begin{remark}
When $b$ is a sum of such terms, say $b = b_1 + b_2$, we find a particular solution for each piece separately and add them, since $L[y_1 + y_2] = L[y_1] + L[y_2] = b_1 + b_2$ by linearity. For example, $y'' + y = \cos x + e^x$ has $y_p = \tfrac{1}{2}x\sin x + \tfrac{1}{2}e^x$, where the second piece is $\tfrac{e^{x}}{p(1)}$ with $p(1) = 2$.
\end{remark}

To reiterate, the full recipe for $L[y] = b(x)$ with constant coefficients:
\begin{itemize}
\item find the roots of $p(r)$ and their multiplicities, which give the basis $\beta$ and $y_c = c_1y_1 + \cdots + c_ny_n$;
\item find one particular solution $y_p$, by guessing its form from $s$ and $k$ and matching coefficients;
\item write $y = y_c + y_p$, and if there are initial conditions, solve for $c_1, \dots, c_n$ \textit{last}, using $y$ and not $y_c$ alone.
\end{itemize}
The last step is a linear system for the $c_k$ (an $n \times n$ one for $n$ initial conditions), so we end up back in linear algebra once more.
</div>

</details>
