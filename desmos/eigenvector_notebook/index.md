---
layout: desmos-notebook
title: "Eigenvectors and Eigenvalues"
---

<link rel="stylesheet" href="/desmos/eigenvector_notebook/eigen.css">
<script src="/desmos/eigenvector_notebook/eigen.js"></script>

<p class="ev-credit">Following 3Blue1Brown, <a href="https://www.youtube.com/watch?v=PFDu9oVAE-g" target="_blank" rel="noopener">Essence of Linear Algebra, Chapter 14</a></p>

<div class="latex-body">
Eigenvectors are simple once the ideas before them are solid: matrices as transformations, determinants, null spaces, and change of basis. If any of those feel shaky, open the refresher below; otherwise, read on.

One matrix $A$ drives every figure on the page. Change it in any panel (type the entries, or pick an example) and every figure follows. All numbers are rounded to the nearest tenth.
</div>

<details class="ev-refresher" id="refresher">
<summary>Refresher: transformations, determinants, and change of basis</summary>

<div class="latex-body">
\textbf{Matrices are transformations.} A $2\times 2$ matrix sends each vector $\mathbf{x}$ to $A\mathbf{x}$, keeping grid lines straight, parallel, and evenly spaced. It is decided by where it sends $\mathbf{e}_1$ and $\mathbf{e}_2$, which are its columns:
$$A\mathbf{x} = x_1 A\mathbf{e}_1 + x_2 A\mathbf{e}_2.$$
In Figure 1, drag the red and blue column tips or the orange $\mathbf{x}$, and press play to watch $A$ act (see <a href="/desmos/linear-combinations">linear combinations</a> and <a href="https://docs.google.com/presentation/d/1CGEmz1QC43GrgDW2Nhf88WdZBPgStE7LgyPBRQ2pYCg/edit?usp=sharing" target="_blank" rel="noopener">Lecture 19</a>).
</div>

<div class="ev-figure" id="ev1">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--two-thirds" data-json="eigenvector_notebook/transformation.json" data-height="500" data-no-toggle="true" data-ready-fn="evFig1"></div>
    <div class="ev-panel">
      <span class="ev-label">Matrix \(A\)</span>
      <div class="ev-block" id="ev1-matrix"></div>
      <hr>
      <div class="ev-block" id="ev1-morph">
        <div class="ev-slide-head"><span>Apply \(A\)</span><strong class="ev-s-val">1</strong></div>
        <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply A"><button type="button" class="site-btn">▶ Play</button></div>
      </div>
      <button type="button" class="site-btn ev-toggle ev-wide" aria-pressed="false" data-folder="sq">Unit square</button>
    </div>
  </div>
  <p class="ev-caption">Figure 1. A matrix is a transformation, recorded by where it sends \(\mathbf{e}_1\) and \(\mathbf{e}_2\).</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev1-calc-ax"></div>
    <div class="ev-calc-math" id="ev1-calc-null"></div>
  </div>
</div>

<div class="latex-body">
\textbf{Determinants measure squishing.} Toggle on the unit square: $A$ scales every area by $|\det A|$ (see <a href="/desmos/determinant">the determinant as area</a>). When $\det A = 0$, $A$ squishes the plane onto a line, sending a whole line of vectors, the null space, to $\mathbf{0}$. Drag $A\mathbf{e}_2$ onto the line through $A\mathbf{e}_1$ to see it appear in green (see <a href="/desmos/null-space-range">Null Space and Range</a>).

\begin{theorem}\label{thm:det-null}
For an $n \times n$ matrix $A$, the equation $A\mathbf{x} = \mathbf{0}$ has a nonzero solution if and only if $\det A = 0$.
\end{theorem}

\textbf{Change of basis.} For a basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ with basis matrix $M_\beta = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$, the transformation $\mathbf{x} \mapsto A\mathbf{x}$ written in $\beta$-coordinates is $M_\beta^{-1}AM_\beta$: translate into standard coordinates, apply $A$, and translate back (see <a href="/desmos/change-of-basis">change of basis</a> and <a href="https://docs.google.com/presentation/d/16xcErMXdiKPBMy-_09Y8FJMZjyq-dxi5yL6UUPuY1kc/edit?usp=sharing" target="_blank" rel="noopener">Lecture 21</a>).
</div>
</details>

<h3 id="span">Vectors that stay on their span</h3>

<div class="latex-body">
Most vectors get knocked off their span (the line through them) by a transformation. A few special vectors stay on it, so $A$ only stretches or squishes them, as if multiplying by a scalar.

In Figure 2, drag $\mathbf{v}$: the dashed line is its span and the arrow is $A\mathbf{v}$. For the 3Blue1Brown example, $\mathbf{e}_1$ is stretched by $3$ and $(-1, 1)$ is stretched by $2$, and by linearity so is every vector on their lines. Toggle on \emph{Eigenlines} to see both, or press \emph{Snap} to move $\mathbf{v}$ onto one.

\begin{definition}
A \textbf{nonzero} vector $\mathbf{v}$ is an \textbf{eigenvector} of $A$ if $A\mathbf{v} = \lambda\mathbf{v}$ for some scalar $\lambda$, its \textbf{eigenvalue}. The eigenvectors for $\lambda$, together with $\mathbf{0}$, form the \textbf{eigenspace} $E_\lambda$.
\end{definition}
</div>

<div class="ev-figure" id="ev2">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--two-thirds" data-json="eigenvector_notebook/span.json" data-height="500" data-no-toggle="true" data-ready-fn="evFig2"></div>
    <div class="ev-panel">
      <span class="ev-label">Matrix \(A\)</span>
      <div class="ev-block" id="ev2-matrix"></div>
      <hr>
      <div class="ev-block" id="ev2-morph">
        <div class="ev-slide-head"><span>Apply \(A\)</span><strong class="ev-s-val">1</strong></div>
        <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply A"><button type="button" class="site-btn">▶ Play</button></div>
      </div>
      <div class="ev-grid2">
        <button type="button" class="site-btn ev-toggle" aria-pressed="false" data-key="eig">Eigenlines</button>
        <button type="button" class="site-btn" id="ev2-snap" title="Move v onto the nearest line of eigenvectors, keeping its length">Snap \(\mathbf{v}\)</button>
      </div>
    </div>
  </div>
  <p class="ev-caption">Figure 2. Most vectors are knocked off their span. Eigenvectors stay on it.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev2-calc-v"></div>
    <div class="ev-calc-math" id="ev2-calc-status"></div>
    <div class="ev-calc-math" id="ev2-calc-lines"></div>
  </div>
</div>

<div class="latex-body">
A negative eigenvalue flips a vector but still keeps it on its line: try the \emph{Diagonal} example, where $\mathbf{e}_1$ has eigenvalue $-1$. In 3D, an eigenvector of a rotation is its axis, with eigenvalue $1$. Either way, eigenvectors describe what $A$ actually does, independent of the coordinates we chose.
</div>

<h3 id="algebra">From geometry to algebra</h3>

<div class="latex-body">
To find eigenvectors, write $\lambda\mathbf{v}$ as $\lambda I\mathbf{v}$ and move it across:
$$A\mathbf{v} = \lambda\mathbf{v} \quad\Longleftrightarrow\quad (A - \lambda I)\mathbf{v} = \mathbf{0}.$$
So $\mathbf{v}$ is a nonzero vector in the null space of $A - \lambda I$, and by \Cref{thm:det-null} one exists exactly when
$$\det(A - \lambda I) = 0.$$

Figure 3 turns $\lambda$ into a knob. The left graph is the grid under $A - \lambda I$; the right graph plots $\det(A - \lambda I)$ against $\lambda$. Drag the orange point along the axis. For the 3Blue1Brown example, at $\lambda = 2$ the grid collapses onto a line and the green null space $\mathcal{N}(A - 2I)$ appears: those are exactly the eigenvectors with eigenvalue $2$. The same happens at $\lambda = 3$.
</div>

<div class="ev-figure" id="ev3">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="eigenvector_notebook/shifted.json" data-height="420" data-no-toggle="true" data-ready-fn="evFig3Left">
      <p class="ev-graph-title">The grid under \(A - \lambda I\)</p>
    </div>
    <div class="dnb-graph" data-json="eigenvector_notebook/charpoly.json" data-height="420" data-no-toggle="true" data-ready-fn="evFig3Right">
      <p class="ev-graph-title">\(\det(A - \lambda I)\) as a function of \(\lambda\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block">
      <span class="ev-label">Matrix \(A\)</span>
      <div class="ev-block" id="ev3-matrix"></div>
    </div>
    <div class="ev-block">
      <div class="ev-slide-head"><span>\(\lambda\)</span><strong id="ev3-l-val">0</strong></div>
      <input class="site-slider" id="ev3-l" type="range" min="-2" max="7" step="0.1" value="0" aria-label="lambda">
      <span class="ev-sub">Eigenvalues</span>
      <div class="ev-snaps" id="ev3-snaps"></div>
    </div>
  </div>
  <p class="ev-caption">Figure 3. Turning \(\lambda\) until \(A - \lambda I\) squishes the plane onto a line.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev3-calc-p"></div>
    <div class="ev-calc-math" id="ev3-calc-at"></div>
  </div>
</div>

<div class="latex-body">
\begin{theorem}
$\lambda$ is an eigenvalue of $A$ if and only if $\det(A - \lambda I) = 0$, and then $E_\lambda = \mathcal{N}(A - \lambda I)$. For a $2 \times 2$ matrix, $\det(A - \lambda I) = \lambda^2 - (a + d)\lambda + (ad - bc)$, the \textbf{characteristic polynomial}.
\end{theorem}

So finding eigenvectors takes two familiar steps: find the roots of $\det(A - \lambda I)$, then row reduce $A - \lambda I$ for each root.

\begin{example}
For the 3Blue1Brown example, $\det(A - \lambda I) = (3 - \lambda)(2 - \lambda)$, so $\lambda = 2$ or $3$. Then
$$A - 2I = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} \;\Longrightarrow\; E_2 = \operatorname{span}\left\{\begin{bmatrix} -1 \\ \phantom{-}1 \end{bmatrix}\right\}, \qquad A - 3I = \begin{bmatrix} 0 & \phantom{-}1 \\ 0 & -1 \end{bmatrix} \;\Longrightarrow\; E_3 = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 0 \end{bmatrix}\right\}.$$
\end{example}
</div>

<h3 id="breaks">When the pattern breaks</h3>

<div class="latex-body">
Not every transformation has eigenvectors, or enough of them. Figure 4 applies two fixed matrices to a ring of vectors; the ones that stay on their span are green. A rotation by $90^\circ$ knocks every vector off its span, and indeed $\det(A - \lambda I) = \lambda^2 + 1$ has no real roots. A shear has the single root $\lambda = 1$, and only the horizontal vectors stay put.
</div>

<div class="ev-figure" id="ev4">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="eigenvector_notebook/breaks_rotation.json" data-height="380" data-no-toggle="true" data-ready-fn="evFig4Rot">
      <p class="ev-graph-title">Rotation by \(90^\circ\): no real eigenvectors</p>
    </div>
    <div class="dnb-graph" data-json="eigenvector_notebook/breaks_shear.json" data-height="380" data-no-toggle="true" data-ready-fn="evFig4Shear">
      <p class="ev-graph-title">Shear: one line of eigenvectors</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block" id="ev4-morph">
      <div class="ev-slide-head"><span>Apply the transformations</span><strong class="ev-s-val">1</strong></div>
      <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply"><button type="button" class="site-btn">▶ Play</button></div>
    </div>
  </div>
  <p class="ev-caption">Figure 4. Green vectors stay on their span; orange ones are knocked off.</p>
</div>

<h3 id="eigenbasis">Eigenbases and diagonalization</h3>

<div class="latex-body">
If the basis vectors are themselves eigenvectors, the matrix is \textbf{diagonal}, with the eigenvalues on the diagonal (this is the \emph{Diagonal} example). Diagonal matrices are easy to work with: applying one $n$ times just raises each eigenvalue to the $n$<sup>th</sup> power. When $A$ has enough eigenvectors to span the plane, we can change coordinates so that they become the basis.

\begin{theorem}
If $\mathbf{v}_1, \mathbf{v}_2$ are eigenvectors of $A$ forming a basis (an \textbf{eigenbasis}), with eigenvalues $\lambda_1, \lambda_2$, and $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$, then
$$P^{-1}AP = D = \begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix} \qquad\text{and}\qquad A^n = PD^nP^{-1}.$$
\end{theorem}

\begin{proof}
$AP = \begin{bmatrix} \lambda_1\mathbf{v}_1 & \lambda_2\mathbf{v}_2 \end{bmatrix} = PD$, and $P$ is invertible since its columns form a basis. In $A^n = (PDP^{-1})\cdots(PDP^{-1})$, each inner $P^{-1}P$ cancels.
\end{proof}

In Figure 5, the green and purple lines are the grid built from the eigenbasis; under $A$ each grid line only stretches along itself. Toggle on \emph{β-coordinates} to see the same transformation as $D$ acting on a square grid. The \emph{Powers} slider plots $\mathbf{x}, A\mathbf{x}, A^2\mathbf{x}, \dots$, which swing toward the line of the larger eigenvalue. Try the \emph{Rotation} or \emph{Shear} example to see a matrix with no eigenbasis.
</div>

<div class="ev-figure" id="ev5">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--two-thirds" data-json="eigenvector_notebook/eigenbasis.json" data-height="520" data-no-toggle="true" data-ready-fn="evFig5"></div>
    <div class="ev-panel">
      <span class="ev-label">Matrix \(A\)</span>
      <div class="ev-block" id="ev5-matrix"></div>
      <hr>
      <div class="ev-block" id="ev5-morph">
        <div class="ev-slide-head"><span>Apply \(A\)</span><strong class="ev-s-val">1</strong></div>
        <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply A"><button type="button" class="site-btn">▶ Play</button></div>
      </div>
      <div class="ev-block">
        <div class="ev-slide-head"><span>Powers</span><strong>\(n =\) <span id="ev5-n-val">3</span></strong></div>
        <input class="site-slider" id="ev5-n" type="range" min="0" max="10" step="1" value="3" aria-label="Number of powers">
      </div>
      <button type="button" class="site-btn ev-toggle ev-wide" aria-pressed="false" data-key="eigview">\(\beta\)-coordinates</button>
      <p class="ev-note" id="ev5-note" hidden></p>
    </div>
  </div>
  <p class="ev-caption">Figure 5. In an eigenbasis, a transformation only stretches along the basis directions.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev5-calc-d"></div>
    <div class="ev-calc-math" id="ev5-calc-n"></div>
  </div>
</div>

<div class="latex-body">
Eigenvalues return in the differential equations half of the course, where an eigenbasis splits a system $\mathbf{x}' = A\mathbf{x}$ into independent pieces. Slides are on the <a href="/teaching/lade/">LADE page</a>.
</div>
