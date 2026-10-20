---
layout: desmos-notebook
title: "Eigenvectors and Eigenvalues"
---

<link rel="stylesheet" href="/desmos/eigenvector_notebook/eigen.css">
<script src="/desmos/eigenvector_notebook/eigen.js"></script>

<p class="ev-credit">Following 3Blue1Brown, <a href="https://www.youtube.com/watch?v=PFDu9oVAE-g" target="_blank" rel="noopener">Essence of Linear Algebra, Chapter 14</a></p>

<div class="latex-body">
Eigen-things aren't actually so bad once you have a solid foundation of their prerequisites: matrices as transformations, determinants, null spaces, and change of basis. If any of those still feel shaky, open the refresher below; otherwise, read on.

Throughout the page, will we consider a $(2 \times 2)$ matrix $A$, which represents a linear transformation. You can adjust it in any panel by choosing a preset example (3b1b's choice, a diagonal matrix, a simple rotation, or a shear) or entering custom values. 
</div>

<details class="ev-refresher" id="refresher">
<summary>Refresher: transformations, determinants, and change of basis</summary>

<div class="latex-body">
\textbf{Matrices are transformations.} A $2\times 2$ matrix transforms each vector $\mathbf{x} \in \R^2$ to $A\mathbf{x} \in \R^2$. By linearity, we really only need to consider where basis vectors are sent (why?), and also by linearity, these grid lines are transformed in a way that keeps them straight, parallel, and evenly spaced. Notably, all is decided by where $\mathbf{e}_1$ and $\mathbf{e}_2$ are sent, which are denoted precisely by the columns of $A = [A\mathbf{e}_1 \ \ A\mathbf{e}_2]$. Thus, matrix-vector multiplcation looks like this:
$$A\mathbf{x} = x_1 A\mathbf{e}_1 + x_2 A\mathbf{e}_2.$$
In Figure 1, you can drag the red and blue vectors, which choice the columns of $A$, i.e. where the canonical basis vectors get sent. You may also drag the input vector $\mathbf{x}$, or press play to watch $A$ transform the entire grid (see <a href="/desmos/linear-combinations">linear combinations</a> and <a href="https://docs.google.com/presentation/d/1CGEmz1QC43GrgDW2Nhf88WdZBPgStE7LgyPBRQ2pYCg/edit?usp=sharing" target="_blank" rel="noopener">Lecture 19</a> for additional material).
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
      <button type="button" class="site-btn ev-toggle ev-wide" aria-pressed="false" data-folder="sq">Trasnformed square</button>
    </div>
  </div>
  <p class="ev-caption">Figure 1. A matrix as a transformation.</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev1-calc-ax"></div>
    <div class="ev-calc-math" id="ev1-calc-null"></div>
  </div>
</div>

<div class="latex-body">
\textbf{Determinants.} The determinant can measure how much a transformation squishes or expands the ambient space, how much the grid is deformed. You can see this by toggling the "transformed square" above. $A$ scales every area by $|\det A|$ (see <a href="/desmos/determinant">the determinant as area</a>). When $\det A = 0$, $A$ squishes the plane onto a line, sending a whole line of vectors, the null space, to $\mathbf{0}$. Drag $A\mathbf{e}_2$ onto the line parallel to $A\mathbf{e}_1$ to visualize this subspace in green (see <a href="/desmos/null-space-range">Null Space and Range</a>) and try to determine why the line slopes the way it does.

We will be particularly interested in \textit{nontrivial solutions} to the nullspace, which occur only when the matrix is singular. Equivalently, we have the following theorem. 

\begin{theorem}\label{thm:det-null}
For an $n \times n$ matrix $A$, the equation $A\mathbf{x} = \mathbf{0}$ has a nonzero solution if and only if $\det A = 0$.
\end{theorem}

\textbf{Change of basis.} For a basis $\beta = \{\mathbf{v}_1, \mathbf{v}_2\}$ with basis matrix $M_\beta = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$, the transformation $\mathbf{x} \mapsto A\mathbf{x}$ written in $\beta$-coordinates is $M_\beta^{-1}AM_\beta$: i.e. translate into standard coordinates, apply $A$ (the "standard" transformation"), and translate back (see <a href="/desmos/change-of-basis">change of basis</a> and <a href="https://docs.google.com/presentation/d/16xcErMXdiKPBMy-_09Y8FJMZjyq-dxi5yL6UUPuY1kc/edit?usp=sharing" target="_blank" rel="noopener">Lecture 21</a>). This concept with be incredibly useful in applying the elegance of eigen-stuff. Often, a basis of eigenvectors will give exactly the desired perspective to simplify computation or better understand a transformation, and a strong foundation with change of basis is imperative for further exploration.  
</div>
</details>

<h3 id="span">Vectors that stay on their span</h3>

<div class="latex-body">
Most vectors get knocked off their span by a transformation (recall projections or rotations). However, a few special vectors may remain. Here, $A$ only stretches or squeezes them, multiplying by a scalar.

In Figure 2, drag the vector $\mathbf{v}$. Included is the dashed line representing its span, and its image from the transformation, $A\mathbf{v}$. Considering the specific example from 3Blue1Brown, the basis vector $\mathbf{e}_1$ is stretched by $3$ and the vector whos standard coordinates are $(-1, 1)$ is stretched by $2$. 

Below we give a formal definition of all the eigen-stuff: eigenvalues, corresponding eigenvectors, and the subspace that constain them. Note, the zero vector $\mathbf{0}$ is \textit{not} an eigenvector, but we do place it in the eigenspace (with all solutions to $A\mathbf{x} = \lambda \mathbf{x}$).

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
  <p class="ev-caption">Figure 2. Eigenvectors and their image</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev2-calc-v"></div>
    <div class="ev-calc-math" id="ev2-calc-status"></div>
    <div class="ev-calc-math" id="ev2-calc-lines"></div>
  </div>
</div>

<div class="latex-body">

</div>

<h3 id="algebra">Finding eigenvalues and eigenvectors</h3>

<div class="latex-body">
To find eigenvectors, write $\lambda\mathbf{v}$ as the matrix-vector product $\lambda I\mathbf{v}$. We then have
$$A\mathbf{v} = \lambda\mathbf{v} \quad\Longleftrightarrow\quad (A - \lambda I)\mathbf{v} = \mathbf{0}.$$
So $\mathbf{v}$ is a nonzero vector in the null space of $A - \lambda I$. By \Cref{thm:det-null}, this exists exactly when
$$\det(A - \lambda I) = 0$$

Below, we will imagine $\lambda$ as a knob of sorts. The left graph is the grid tranformed by $A - \lambda I$; the right graph plots $\det(A - \lambda I)$ against $\lambda$ (which we have seen is a parabola in the $(2 \times 2)$ case). Drag the orange point along the axis to tune this "$\lambda$ knob". For the 3Blue1Brown example, at $\lambda = 2$ the grid collapses onto a line, as $A-2I$ is singular, and the green null space $\mathcal{N}(A - 2I)$ will appear. The nonzero vectors on that line are precisely the eigenvectors with eigenvalue $2$. The same idea holds for $\lambda = 3$ with this example. Different matrices will behave differently.
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
  <p class="ev-caption">Figure 3. Finding eigenvalues with a "$\lambda$ knob" </p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="ev3-calc-p"></div>
    <div class="ev-calc-math" id="ev3-calc-at"></div>
  </div>
</div>

<div class="latex-body">
\begin{theorem}
$\lambda$ is an eigenvalue of $A$ if and only if $\det(A - \lambda I) = 0$, and the eigenspace $E_\lambda = \mathcal{N}(A - \lambda I)$. For a $2 \times 2$ matrix, $\det(A - \lambda I) = \lambda^2 - (a + d)\lambda + (ad - bc)$, which is the \textbf{characteristic polynomial}.
\end{theorem}

To summarize, finding eigenvectors takes: find the roots of $\det(A - \lambda I)$, then row reduce $A - \lambda I$ for each root to determine its null space (or basis thereof).

\begin{example}
For the 3Blue1Brown example, $\det(A - \lambda I) = (3 - \lambda)(2 - \lambda)$, so $\lambda = 2$ or $3$. Then
$$A - 2I = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} \;\Longrightarrow\; E_2 = \operatorname{span}\left\{\begin{bmatrix} -1 \\ \phantom{-}1 \end{bmatrix}\right\}, \qquad A - 3I = \begin{bmatrix} 0 & \phantom{-}1 \\ 0 & -1 \end{bmatrix} \;\Longrightarrow\; E_3 = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 0 \end{bmatrix}\right\}.$$
\end{example}

\begin{example}
Eigenvalues can repeat, and a repeated eigenvalue can come with more than a line of eigenvectors. Consider the $(3 \times 3)$ matrix
$$A = \begin{bmatrix} 2 & 1 & 1 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}.$$
Since $A - \lambda I$ is upper triangular, its determinant is the product of its diagonal entries, $\det(A - \lambda I) = (2 - \lambda)(1 - \lambda)^2$. The eigenvalues are then $\lambda = 2$, and $\lambda = 1$ as a double root (it has algebraic multiplicity $2$). For $\lambda = 2$,
$$A - 2I = \begin{bmatrix} 0 & \phantom{-}1 & \phantom{-}1 \\ 0 & -1 & \phantom{-}0 \\ 0 & \phantom{-}0 & -1 \end{bmatrix} \;\Longrightarrow\; v_2 = v_3 = 0 \;\Longrightarrow\; E_2 = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}\right\}.$$
For $\lambda = 1$, the matrix $A - I$ is already in reduced row echelon form, with $v_2$ and $v_3$ free:
$$A - I = \begin{bmatrix} 1 & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} \;\Longrightarrow\; v_1 = -v_2 - v_3 \;\Longrightarrow\; E_1 = \operatorname{span}\left\{\begin{bmatrix} -1 \\ \phantom{-}1 \\ \phantom{-}0 \end{bmatrix}, \begin{bmatrix} -1 \\ \phantom{-}0 \\ \phantom{-}1 \end{bmatrix}\right\}.$$
Note that here, the eigenvalue with multiplicity 1 gave an eigenspace with dimension 1. And the eigenvalue with multiplicity 2 gave an eigenspace with dimension 2. Unfortunately, this is not always the case (matching multiplicity and dimension of eigenspace), as is seen in the example of the shear below. 
\end{example}
</div>

<h3 id="breaks">When the pattern breaks</h3>

<div class="latex-body">
Not every transformation has real eigenvectors/eigenvalues, or as many as we would expects (even consisdering repeated roots). Figure 4 applies two fixed matrices to a ring of vectors, a rotation and a "shear". A rotation by $90^\circ$ knocks every vector off its span, and indeed $\det(A - \lambda I) = \lambda^2 + 1$ has no real roots. A shear has the single (repeated) root $\lambda = 1$, and only the horizontal vectors stay put.
</div>

<div class="ev-figure" id="ev4">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="eigenvector_notebook/breaks_rotation.json" data-height="380" data-no-toggle="true" data-ready-fn="evFig4Rot">
      <p class="ev-graph-title">Rotation by \(90^\circ\): no real eigenvectors</p>
    </div>
    <div class="dnb-graph" data-json="eigenvector_notebook/breaks_shear.json" data-height="380" data-no-toggle="true" data-ready-fn="evFig4Shear">
      <p class="ev-graph-title">Shear: only one line of eigenvectors</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block" id="ev4-morph">
      <div class="ev-slide-head"><span>Apply the transformations</span><strong class="ev-s-val">1</strong></div>
      <div class="ev-slide"><input class="site-slider" type="range" min="0" max="1" step="0.01" value="1" aria-label="Apply"><button type="button" class="site-btn">▶ Play</button></div>
    </div>
  </div>
  <p class="ev-caption">Figure 4. Trasnformations without a "full set" of eigenvectors</p>
</div>

<h3 id="eigenbasis">Eigenbases and diagonalization</h3>

<div class="latex-body">
If there exists a \textit{basis} of eigenvectors, the matrix is \textbf{diagonalizable}, with the eigenvalues on the diagonal (when the matrix of the transformation is written with respect to this basis of eigenvectors). Diagonal matrices are easy to work with: multiplying by one $n$ times, i.e. taking its $n^{th}$ power, just raises each diagonal to the $n^{th}$ power. By our previous theory, if $A$ has enough eigenvectors to span the space, these eigenvectors form a basis, and we can change coordinates so that we can represent the transformation diagonally. We show this theorem below for $(2 \times 2)$ matrices, but this holds in general. 


\begin{theorem}
If $\mathbf{v}_1, \mathbf{v}_2$ are eigenvectors of $A$ forming a basis (an \textbf{eigenbasis}), with eigenvalues $\lambda_1, \lambda_2$, and $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$, then
$$P^{-1}AP = D = \begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix} \qquad\text{and}\qquad A^n = PD^nP^{-1}.$$
\end{theorem}

\begin{proof}
$AP = \begin{bmatrix} \lambda_1\mathbf{v}_1 & \lambda_2\mathbf{v}_2 \end{bmatrix} = PD$, and $P$ is invertible since its columns form a basis. In $A^n = (PDP^{-1})(PDP^{-1})\cdots(PDP^{-1})$, each inner $P^{-1}P$ cancels.
\end{proof}

In Figure 5, the green and purple lines are the grid built from the eigenbasis (when it exists). Since any point on these lines are eigenvectors, $A$ stretches each line along itself. The \textbf{Powers} slider plots $\mathbf{x}, A\mathbf{x}, A^2\mathbf{x}, \dots$, which swing toward the line of the larger eigenvalue (try to evaluate why this holds by considering $A^n \mathbf{x} = PD^nP^{-1}\mathbf{x}$ and which terms start to dominate). 
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
