---
layout: desmos-notebook
title: "Diagonalization"
---

<!-- Panels, readouts and captions reuse the eigenvector notebook's styles. -->
<link rel="stylesheet" href="/desmos/eigenvector_notebook/eigen.css">
<script src="/desmos/diagonalization_notebook/diag.js"></script>

<p class="ev-credit">Continuing the <a href="/desmos/eigenvector_notebook/">eigenvectors notebook</a> and 3Blue1Brown, <a href="https://www.youtube.com/watch?v=PFDu9oVAE-g" target="_blank" rel="noopener">Essence of Linear Algebra, Chapter 14</a></p>

<div class="latex-body">
The <a href="/desmos/eigenvector_notebook/#eigenbasis">eigenvectors notebook</a> ended on a promise: when a matrix has enough eigenvectors to form a basis, the transformation can be written with a diagonal matrix, and diagonal matrices are easy to work with. This page makes that precise. We look at one transformation from two points of view, diagonalize a concrete matrix and use it to compute a large power, and then use the same idea to find a formula for the Fibonacci numbers (see also <a href="https://docs.google.com/presentation/d/1XfT70ibIoq_wex9v_ci5ed-sGhGz4mREgcSj9K-tb30/edit?usp=sharing" target="_blank" rel="noopener">Lecture 25</a>).
</div>

<h3 id="eigenbasis">Eigenbases</h3>

<div class="latex-body">
\begin{definition}
An \textbf{eigenbasis} of an $n \times n$ matrix $A$ is a basis of $\R^n$ made up of eigenvectors of $A$. The matrix $A$ is \textbf{diagonalizable} if $A = PDP^{-1}$ for some invertible matrix $P$ and diagonal matrix $D$.
\end{definition}

These turn out to be the same thing.

\begin{theorem}\label{thm:diag}
An $n \times n$ matrix $A$ is diagonalizable if and only if it has an eigenbasis. In that case $A = PDP^{-1}$, where the columns of $P$ are the eigenbasis vectors $\mathbf{v}_1, \dots, \mathbf{v}_n$ and $D$ has the matching eigenvalues $\lambda_1, \dots, \lambda_n$ on its diagonal.
\end{theorem}

\begin{proof}
Let $P = \begin{bmatrix} \mathbf{v}_1 & \cdots & \mathbf{v}_n \end{bmatrix}$ and let $D$ be diagonal with entries $\lambda_1, \dots, \lambda_n$. Column by column, $AP = \begin{bmatrix} A\mathbf{v}_1 & \cdots & A\mathbf{v}_n \end{bmatrix}$ and $PD = \begin{bmatrix} \lambda_1\mathbf{v}_1 & \cdots & \lambda_n\mathbf{v}_n \end{bmatrix}$, so $AP = PD$ says exactly that $A\mathbf{v}_i = \lambda_i\mathbf{v}_i$ for each $i$. The matrix $P$ is invertible exactly when its columns form a basis (and then no column is $\mathbf{0}$, so each $\mathbf{v}_i$ really is an eigenvector). For invertible $P$, $AP = PD$ is the same as $A = PDP^{-1}$, and both directions follow.
\end{proof}

Not every matrix qualifies. In the eigenvectors notebook, the $90^\circ$ rotation has no real eigenvectors and the shear has only one line of them, so neither has an eigenbasis (see <a href="/desmos/eigenvector_notebook/#breaks">when the pattern breaks</a>). On the other hand, eigenvectors for different eigenvalues are always linearly independent, so an $n \times n$ matrix with $n$ distinct eigenvalues is always diagonalizable.
</div>

<h3 id="two-bases">One transformation, two bases</h3>

<div class="latex-body">
Recall from <a href="/desmos/change-of-basis">change of basis</a> (and <a href="https://docs.google.com/presentation/d/16xcErMXdiKPBMy-_09Y8FJMZjyq-dxi5yL6UUPuY1kc/edit?usp=sharing" target="_blank" rel="noopener">Lecture 21</a>) that for a basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ with $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$, the matrix $P$ converts $\beta$-coordinates into standard ones, $\mathbf{x} = P[\mathbf{x}]_\beta$, and the transformation $\mathbf{x} \mapsto A\mathbf{x}$ written in $\beta$-coordinates has matrix $P^{-1}AP$. When $\beta$ is an eigenbasis, \Cref{thm:diag} says that matrix is the diagonal $D$. So a matrix is not the transformation itself, but a description of it in one particular basis, and the eigenbasis gives the simplest description.

Figure 1 shows the transformation
$$A = \frac{1}{4}\begin{bmatrix} 6 & 2 \\ 3 & 5 \end{bmatrix}$$
twice. Both graphs are the same plane, with the same $\mathbf{x}$ and the same $A\mathbf{x}$; the only difference is the grid drawn underneath. On the left is the standard grid (black), built from $\mathbf{e}_1$ and $\mathbf{e}_2$. Under $A$ it is sheared and turned, and the matrix that records this is $A$. On the right is the grid built from the eigenbasis $\mathbf{v}_1 = (1, 1)$ and $\mathbf{v}_2 = (2, -3)$ (purple, worked out below). Under $A$ this grid only stretches: lines along $\mathbf{v}_1$ stretch by $2$, and lines along $\mathbf{v}_2$ shrink to $\frac{3}{4}$ of their length. Measured against the purple grid, $A$ doubles the $\mathbf{v}_1$-coordinate and scales the $\mathbf{v}_2$-coordinate by $\frac{3}{4}$, which is exactly what the diagonal matrix $D = \operatorname{diag}(2, \frac{3}{4})$ does to coordinates.

Drag $\mathbf{x}$ in either graph, or press play to watch $A$ act. The readout below the figure writes $\mathbf{x}$ and $A\mathbf{x}$ in both bases.
</div>

<div class="ev-figure" id="dg1">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="diagonalization_notebook/standard.json" data-height="420" data-no-toggle="true" data-ready-fn="dgFig1Std">
      <p class="ev-graph-title">Standard basis: the matrix is \(A\)</p>
    </div>
    <div class="dnb-graph" data-json="diagonalization_notebook/eigenbasis.json" data-height="420" data-no-toggle="true" data-ready-fn="dgFig1Eig">
      <p class="ev-graph-title">Eigenbasis: the matrix is \(D\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block" id="dg1-morph">
      <div class="ev-slide-head"><span>Apply \(A\)</span></div>
      <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply A"><button type="button" class="site-btn">▶ Play</button></div>
    </div>
  </div>
  <p class="ev-caption">Figure 1. One transformation against two grids: \(A\) in the standard basis, \(D = P^{-1}AP\) in the eigenbasis.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="dg1-calc-std"></div>
    <div class="ev-calc-math" id="dg1-calc-eig"></div>
  </div>
</div>

<div class="latex-body">
The two readouts describe the same vector $A\mathbf{x}$ in two coordinate systems. In symbols, $[A\mathbf{x}]_\beta = D[\mathbf{x}]_\beta$, and translating back with $\mathbf{x} = P[\mathbf{x}]_\beta$ gives $A = PDP^{-1}$.
</div>

<h3 id="example">Diagonalizing a matrix</h3>

<div class="latex-body">
Diagonalizing takes the same two steps as finding eigenvectors (see <a href="/desmos/eigenvector_notebook/#algebra">finding eigenvalues and eigenvectors</a>), followed by assembling $P$ and $D$.

\begin{example}
Let $A = \frac{1}{4}B$ be the matrix of Figure 1, where $B = \begin{bmatrix} 6 & 2 \\ 3 & 5 \end{bmatrix}$. Scaling a matrix keeps its eigenvectors and scales its eigenvalues, since $A\mathbf{v} = \lambda\mathbf{v}$ exactly when $B\mathbf{v} = 4\lambda\mathbf{v}$. So we can work with the integer matrix $B$. Its characteristic polynomial is
$$\det(B - \mu I) = (6 - \mu)(5 - \mu) - (2)(3) = \mu^2 - 11\mu + 24 = (\mu - 8)(\mu - 3),$$
so $B$ has eigenvalues $8$ and $3$, and $A$ has eigenvalues $\lambda_1 = \frac{8}{4} = 2$ and $\lambda_2 = \frac{3}{4}$. For each, row reduce $B - \mu I$:
$$B - 8I = \begin{bmatrix} -2 & \phantom{-}2 \\ \phantom{-}3 & -3 \end{bmatrix} \;\Longrightarrow\; E_2 = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 1 \end{bmatrix}\right\}, \qquad B - 3I = \begin{bmatrix} 3 & 2 \\ 3 & 2 \end{bmatrix} \;\Longrightarrow\; E_{3/4} = \operatorname{span}\left\{\begin{bmatrix} \phantom{-}2 \\ -3 \end{bmatrix}\right\},$$
where $E_2$ and $E_{3/4}$ are the eigenspaces of $A$. The eigenvalues are distinct, so $\mathbf{v}_1 = (1, 1)$ and $\mathbf{v}_2 = (2, -3)$ form an eigenbasis, and
$$P = \begin{bmatrix} 1 & \phantom{-}2 \\ 1 & -3 \end{bmatrix}, \qquad D = \begin{bmatrix} 2 & 0 \\ 0 & \tfrac{3}{4} \end{bmatrix}, \qquad P^{-1} = \frac{1}{5}\begin{bmatrix} 3 & \phantom{-}2 \\ 1 & -1 \end{bmatrix}.$$
Multiplying out confirms $PDP^{-1} = A$.
\end{example}

The payoff is in powers. Computing $A^8$ directly takes seven matrix products. Instead,
$$A^8 = (PDP^{-1})(PDP^{-1})\cdots(PDP^{-1}) = PD^8P^{-1},$$
since each inner $P^{-1}P$ cancels, and $D^8$ just raises each diagonal entry to the eighth power.

\begin{example}
With $P$, $D$ and $P^{-1}$ from the example above, $2^8 = 256$ and $\mu = \left(\frac{3}{4}\right)^8 = \frac{6561}{65536} \approx 0.1001$,
$$A^8 = \begin{bmatrix} 1 & \phantom{-}2 \\ 1 & -3 \end{bmatrix}\begin{bmatrix} 256 & 0 \\ 0 & \mu \end{bmatrix}\frac{1}{5}\begin{bmatrix} 3 & \phantom{-}2 \\ 1 & -1 \end{bmatrix} = \frac{1}{5}\begin{bmatrix} 768 + 2\mu & 512 - 2\mu \\ 768 - 3\mu & 512 + 3\mu \end{bmatrix} \approx \begin{bmatrix} 153.64 & 102.36 \\ 153.54 & 102.46 \end{bmatrix}.$$
Nothing about $8$ was special. The same computation gives every power at once:
$$A^n = PD^nP^{-1} = \frac{1}{5}\begin{bmatrix} 3 \cdot 2^n + 2\left(\frac{3}{4}\right)^n & 2 \cdot 2^n - 2\left(\frac{3}{4}\right)^n \\ 3 \cdot 2^n - 3\left(\frac{3}{4}\right)^n & 2 \cdot 2^n + 3\left(\frac{3}{4}\right)^n \end{bmatrix}.$$
\end{example}

As $n$ grows, the $\left(\frac{3}{4}\right)^n$ terms die out, and both columns of $A^n$ point more and more along $\mathbf{v}_1 = (1, 1)$. The right graph of Figure 1 shows why: each application of $A$ doubles the $\mathbf{v}_1$-coordinate and shrinks the $\mathbf{v}_2$-coordinate, so repeated application pulls every vector toward the line through $\mathbf{v}_1$. The same effect drives the Fibonacci numbers below.
</div>

<h3 id="fibonacci">Fibonacci numbers</h3>

<div class="latex-body">
The Fibonacci numbers $0, 1, 1, 2, 3, 5, 8, \dots$ are defined by $f_0 = 0$, $f_1 = 1$ and $f_{n+1} = f_n + f_{n-1}$. Each step only needs the previous two numbers, so we can track them together as a vector:
$$F = \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}, \qquad F\begin{bmatrix} f_{n-1} \\ f_n \end{bmatrix} = \begin{bmatrix} f_n \\ f_{n-1} + f_n \end{bmatrix} = \begin{bmatrix} f_n \\ f_{n+1} \end{bmatrix}.$$
Starting from $\mathbf{x} = (f_0, f_1) = (0, 1)$ and applying $F$ over and over,
$$\mathbf{x} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad F\mathbf{x} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \quad F^2\mathbf{x} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}, \quad F^3\mathbf{x} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}, \quad F^4\mathbf{x} = \begin{bmatrix} 3 \\ 5 \end{bmatrix}, \quad \dots, \quad F^n\mathbf{x} = \begin{bmatrix} f_n \\ f_{n+1} \end{bmatrix}.$$
So computing $f_n$ amounts to computing $F^n$, which is what diagonalization is for.

\begin{example}
The characteristic polynomial is $\det(F - \lambda I) = \lambda^2 - \lambda - 1$, with roots
$$\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618 \qquad \text{and} \qquad \psi = \frac{1 - \sqrt{5}}{2} = -\frac{1}{\phi} \approx -0.618,$$
where $\phi$ is the golden ratio. For either root, the first row of $F - \lambda I$ reads $-\lambda v_1 + v_2 = 0$, so $v_2 = \lambda v_1$ and the eigenvectors are
$$\mathbf{v}_\phi = \begin{bmatrix} 1 \\ \phi \end{bmatrix}, \qquad \mathbf{v}_\psi = \begin{bmatrix} 1 \\ \psi \end{bmatrix}, \qquad P = \begin{bmatrix} 1 & 1 \\ \phi & \psi \end{bmatrix}, \qquad D = \begin{bmatrix} \phi & 0 \\ 0 & \psi \end{bmatrix}.$$
To write $\mathbf{x}$ in this eigenbasis, solve $c_1\mathbf{v}_\phi + c_2\mathbf{v}_\psi = (0, 1)$: the first entry gives $c_2 = -c_1$, and the second then gives $c_1(\phi - \psi) = 1$, with $\phi - \psi = \sqrt{5}$. So
$$\mathbf{x} = \frac{1}{\sqrt{5}}\left(\mathbf{v}_\phi - \mathbf{v}_\psi\right), \qquad\text{i.e.}\qquad [\mathbf{x}]_\beta = P^{-1}\mathbf{x} = \frac{1}{\sqrt{5}}\begin{bmatrix} \phantom{-}1 \\ -1 \end{bmatrix}.$$
Now $F^n = PD^nP^{-1}$ scales each eigenvector by its eigenvalue to the $n^{th}$ power:
$$F^n\mathbf{x} = \frac{1}{\sqrt{5}}\left(\phi^n\mathbf{v}_\phi - \psi^n\mathbf{v}_\psi\right) = \frac{1}{\sqrt{5}}\begin{bmatrix} \phi^n - \psi^n \\ \phi^{n+1} - \psi^{n+1} \end{bmatrix}.$$
Reading off the first entry gives Binet's formula,
$$f_n = \frac{\phi^n - \psi^n}{\sqrt{5}} = \frac{1}{\sqrt{5}}\left[\left(\frac{1 + \sqrt{5}}{2}\right)^n - \left(\frac{1 - \sqrt{5}}{2}\right)^n\right].$$
\end{example}

Since $|\psi| < 1$, the term $\psi^n\mathbf{v}_\psi$ shrinks to $\mathbf{0}$ while $\phi^n\mathbf{v}_\phi$ grows, so $F^n\mathbf{x}$ lines up with the green eigenline $E_\phi$, the line $y = \phi x$ through $(1, \phi)$. In particular, the ratios $f_{n+1}/f_n$ approach the golden ratio. Because $\psi$ is negative, the small term flips sign at every step, so the iterates land alternately just above and just below the line (compare Figure 5 of the <a href="/desmos/eigenvector_notebook/#eigenbasis">eigenvectors notebook</a>).

In Figure 2, step $n$ forward or press play. The view zooms out to keep up, since the iterates grow like $\phi^n$. To see the convergence without the growth, toggle "Rescale by $\phi^{-k}$", which plots
$$\phi^{-k}F^k\mathbf{x} = \frac{1}{\sqrt{5}}\left(\mathbf{v}_\phi - \left(\frac{\psi}{\phi}\right)^k\mathbf{v}_\psi\right)$$
instead. Since $\psi/\phi \approx -0.38$, these points zig-zag into the single point $\frac{1}{\sqrt{5}}\mathbf{v}_\phi$ on the eigenline.
</div>

<div class="ev-figure" id="dg2">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--two-thirds" data-json="diagonalization_notebook/fibonacci.json" data-height="500" data-no-toggle="true" data-ready-fn="dgFig2"></div>
    <div class="ev-panel">
      <span class="ev-label">Matrix \(F\)</span>
      <div class="ev-block">\[F = \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}, \qquad \mathbf{x} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}\]</div>
      <hr>
      <div class="ev-block">
        <div class="ev-slide-head"><span>Powers</span><strong>\(n =\) <span id="dg2-n-val">6</span></strong></div>
        <div class="ev-slide"><input class="site-slider" id="dg2-n" type="range" min="0" max="20" step="1" value="6" aria-label="Number of powers"><button type="button" class="site-btn" id="dg2-play">▶ Play</button></div>
      </div>
      <div class="ev-grid2">
        <button type="button" class="site-btn ev-toggle site-btn--active" id="dg2-eig" aria-pressed="true">Eigenlines</button>
        <button type="button" class="site-btn ev-toggle" id="dg2-scale" aria-pressed="false">Rescale by \(\phi^{-k}\)</button>
      </div>
    </div>
  </div>
  <p class="ev-caption">Figure 2. The iterates \(F^k\mathbf{x} = (f_k, f_{k+1})\) turn toward the eigenline of the golden ratio.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="dg2-calc-n"></div>
    <div class="ev-calc-math" id="dg2-calc-lim"></div>
  </div>
</div>

<h3 id="explore">Exploration</h3>

<div class="latex-body">
Figure 3 repeats Figure 1 for four simple matrices. Pick one, press play, and compare the two grids. Some things to look for:
\begin{itemize}
\item For the diagonal matrix, the eigenvectors are $\mathbf{e}_1$ and $\mathbf{e}_2$, so both grids are the same and $A = D$.
\item For the two symmetric matrices, the eigenvectors are perpendicular, so the eigenbasis grid is a square grid turned on its side. Their eigenvectors point in different directions, so the two grids are turned by different angles, and they stretch by different amounts ($ for the first, $ for the second).
\item For the matrix that is not symmetric, the eigenvectors are not perpendicular and the eigenbasis grid is slanted, but it still only stretches.
\end{itemize}
The readout shows the factorization $A = PDP^{-1}$ for each example.
</div>

<div class="ev-figure" id="dg3">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="diagonalization_notebook/standard.json" data-height="420" data-no-toggle="true" data-ready-fn="dgFig3Std">
      <p class="ev-graph-title">Standard basis: the matrix is \(A\)</p>
    </div>
    <div class="dnb-graph" data-json="diagonalization_notebook/eigenbasis.json" data-height="420" data-no-toggle="true" data-ready-fn="dgFig3Eig">
      <p class="ev-graph-title">Eigenbasis: the matrix is \(D\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block">
      <span class="ev-label">Matrix \(A\)</span>
      <div class="ev-grid2" id="dg3-presets"></div>
    </div>
    <div class="ev-block" id="dg3-morph">
      <div class="ev-slide-head"><span>Apply \(A\)</span></div>
      <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply A"><button type="button" class="site-btn">▶ Play</button></div>
    </div>
  </div>
  <p class="ev-caption">Figure 3. Four examples, each against the standard grid and its eigenbasis grid.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="dg3-calc-fact"></div>
    <div class="ev-calc-math" id="dg3-calc-std"></div>
    <div class="ev-calc-math" id="dg3-calc-eig"></div>
  </div>
</div>
