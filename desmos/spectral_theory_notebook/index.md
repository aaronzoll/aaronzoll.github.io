---
layout: desmos-notebook
title: "Spectral Theory"
---

<!-- Panels, readouts and captions reuse the eigenvector notebook's styles. -->
<link rel="stylesheet" href="/desmos/eigenvector_notebook/eigen.css">
<script src="/desmos/spectral_theory_notebook/spectral.js"></script>

<p class="ev-credit">Continuing the <a href="/desmos/diagonalization_notebook/">diagonalization notebook</a></p>

<div class="latex-body">
In the last notebook about <a href="/desmos/diagonalization_notebook/">diagonalization</a>, we saw how to write the matrix of a transformation with respect to a new basis, making it diagonal. Here, we can simply stretch the entire space along a basis of eigenvectors, which lets us much more simply write out how the transformation acts on any given input. Unfortunately, there was a slight cost. For one, not every matrix is diagonalizable, so we can't always ensure this nice property. Second, even when we can diagonalize, we still have to invert a matrix when performing our change of basis. In this notebook, we look towards \textit{Spectral theory}, the study of when, and how nicely, a matrix can be diagonalized. Here we focus on one case, which happens to be the nicest one possible: \textbf{real symmetric matrices}, i.e. real matrices ($\overline{A} = A$) with $A^T = A$.

Recall the exploration at the end of the diagonalization notebook. For both of the real symmetric matrices, the eigenvectors were perpendicular, and the grid induced by the eigenbasis looked like a rotated square grid. That was no accident! We will see that every real symmetric matrix has real eigenvalues, a basis of perpendicular eigenvectors, and as a result, a diagonalization that is really just a rotation, a stretch, and a rotation back.
</div>

<h3 id="real">Real eigenvalues</h3>

<div class="latex-body">
A priori, the eigenvalues of a real matrix are roots of its characteristic polynomial, so those roots can be (and often are) complex (as they were for the rotation). Below we show that for real and \textit{symmetric} matrices, all eigenvalues are in fact real as well.

For a complex vector or matrix, we write the superscript $^*$ for the \textbf{conjugate transpose}, so that $\mathbf{x}^* = \overline{\mathbf{x}}^T$. For a scalar (equivalent to a $1 \times 1$ matrix), this is just the conjugate, and we have $\lambda^* = \overline{\lambda}$. Notably, a scalar is real exactly when $\lambda^* = \lambda$.

Similar to real vectors, we can write the norm as a row-vector times a column vector: $$\mathbf{x}^*\mathbf{x} = \overline{x_1}x_1 + \cdots + \overline{x_n}x_n = |x_1|^2 + \cdots + |x_n|^2 = \|\mathbf{x}\|^2,$$
which is strictly positive for any $\mathbf{x} \neq \mathbf{0}$. (This is why we need the conjugate. Without it, $\mathbf{x}^T\mathbf{x}$ can be zero for a nonzero complex vector: try $\mathbf{x} = (1, i)$.) Finally, if $A$ is real, conjugating does nothing, so $A^* = A^T$; and if $A$ is also symmetric, then $A^* = A^T = A$.


We proceed by showing the following lemma allowing the possibility of everything to be complex. So $\mathbf{x} \in \C^n$ and $\lambda \in \C$. However, the reals are a subset of the complex numbers (really, they form a \textit{subspace}), and we will show that given $A\mathbf{x} = \lambda \mathbf{x}$ and $A^* = A$, then both $\lambda$ is real and $\mathbf{x}$ can be real as well.

\begin{lemma}\label{lem:real}
If $A$ is a real symmetric matrix, then every eigenvalue of $A$ is real. Consequently, each eigenvalue has a real eigenvector.
\end{lemma}

\begin{proof}
Suppose $A\mathbf{x} = \lambda\mathbf{x}$ for some $\lambda \in \C$ and some $\mathbf{x} \in \C^n$ with $\mathbf{x} \neq \mathbf{0}$. Using $A^* = A$ in the middle step,
$$\lambda^*\|\mathbf{x}\|^2 = \lambda^*\mathbf{x}^*\mathbf{x} = (\lambda\mathbf{x})^*\mathbf{x} = (A\mathbf{x})^*\mathbf{x} = \mathbf{x}^*A^*\mathbf{x} = \mathbf{x}^*A\mathbf{x} = \mathbf{x}^*(\lambda\mathbf{x}) = \lambda\mathbf{x}^*\mathbf{x} = \lambda\|\mathbf{x}\|^2.$$
Since $\mathbf{x}$ is an eigenvector, $\mathbf{x} \neq \mathbf{0}$, so $\|\mathbf{x}\|^2 > 0$ and we can divide both sides by it to get $\lambda^* = \lambda$. That is, $\lambda$ is real.<br><br>
For the second claim, $\lambda$ being real means $A - \lambda I$ is a real matrix, and it is singular since $\lambda$ is an eigenvalue. Row reducing a real matrix only ever uses real arithmetic, so its null space contains a nonzero real vector, which is a real eigenvector for $\lambda$.
\end{proof}

This also explains the rotation from the eigenvectors notebook. The $90^\circ$ rotation has eigenvalues $\pm i$, and sure enough, it is not symmetric:
$$\begin{bmatrix} 0 & -1 \\ 1 & \phantom{-}0 \end{bmatrix}^T = \begin{bmatrix} \phantom{-}0 & 1 \\ -1 & 0 \end{bmatrix} \neq \begin{bmatrix} 0 & -1 \\ 1 & \phantom{-}0 \end{bmatrix}.$$
Now, the above lemma is not an "if and only if" one, so we cannot conclude that \textit{every} non symmetric matrix has complex eigenvalues. All we can say is that if $A$ is real and symmetric, all the eigenstuff is real as well. 

\begin{remark*}
The proof above is quite slick, and it is fair to wonder how anyone would come up with it. Sometimes proofs arise that way. Sometimes they are modified and cleansed until they become far from obvious. Really, the idea is the following. We want to prove something about a \textit{scalar} ($\lambda^* = \lambda$), but all we are handed is the equation $A\mathbf{x} = \lambda\mathbf{x}$, which is about vectors and a matrix, as well as $\overline{A} = A$ and $A^T = A$. So we need some way to turn vectors and a matrix into a single number. The expression
$$\mathbf{y}^*A\mathbf{x} = (\text{row vector})(\text{matrix})(\text{column vector}) = (1 \times n)(n \times n)(n \times 1) = (1 \times 1)$$
does exactly that: it combines a row vector, a matrix, and a column vector, and returns a scalar. Note that when $A = I$, we are just doing a dot product (or complex version thereof).<br><br>
Now take $\mathbf{y} = \mathbf{x}$, and evaluate the scalar $\mathbf{x}^*A\mathbf{x}$ in two ways. Letting $A$ act on the column vector to its right gives $\mathbf{x}^*(A\mathbf{x}) = \mathbf{x}^*(\lambda\mathbf{x}) = \lambda\|\mathbf{x}\|^2$. Letting $A$ act on the row vector to its left, and using $A = A^*$, gives $(\mathbf{x}^*A)\mathbf{x} = (\mathbf{x}^*A^*)\mathbf{x} = (A\mathbf{x})^*\mathbf{x} = \lambda^*\|\mathbf{x}\|^2$. Since these are the same number, we have $\lambda\|\mathbf{x}\|^2 = \lambda^*\|\mathbf{x}\|^2$, which gave us $\lambda^* = \lambda$. We will use this exact trick again in the following lemma, this time with two different eigenvectors on either side of $A$.
\end{remark*}

From here on, \Cref{lem:real} lets us stay entirely in the real world: every eigenvalue is real, and we may always pick real eigenvectors. In particular, the conjugate transpose of a real vector is just its transpose, so we go back to writing $^T$.
</div>

<h3 id="orthogonal">Orthogonal eigenvectors</h3>

<div class="latex-body">
\begin{lemma}\label{lem:orth}
Let $A$ be a real symmetric matrix with $A\mathbf{x} = \lambda\mathbf{x}$ and $A\mathbf{y} = \mu\mathbf{y}$, where $\mathbf{x}, \mathbf{y}$ are real eigenvectors and $\lambda \neq \mu$. Then $\mathbf{y}^T\mathbf{x} = 0$, i.e. $\mathbf{x}$ and $\mathbf{y}$ are orthogonal.
\end{lemma}

\begin{proof}
As in the remark above, evaluate the scalar $\mathbf{y}^TA\mathbf{x}$ in two ways. Letting $A$ act to the right,
$$\mathbf{y}^TA\mathbf{x} = \mathbf{y}^T(\lambda\mathbf{x}) = \lambda\,\mathbf{y}^T\mathbf{x}.$$
Letting $A$ act to the left, and using $A = A^T$,
$$\mathbf{y}^TA\mathbf{x} = \mathbf{y}^TA^T\mathbf{x} = (A\mathbf{y})^T\mathbf{x} = (\mu\mathbf{y})^T\mathbf{x} = \mu\,\mathbf{y}^T\mathbf{x}.$$
Subtracting the two, $(\lambda - \mu)\,\mathbf{y}^T\mathbf{x} = 0$. Since $\lambda \neq \mu$, we can divide by $\lambda - \mu$, leaving $\mathbf{y}^T\mathbf{x} = 0$.
\end{proof}

In a sense, both lemmas say the same thing: a symmetric matrix can be moved from one side of a dot product to the other, $(A\mathbf{y}) \cdot \mathbf{x} = \mathbf{y} \cdot (A\mathbf{x})$. As I have said before, math rewards symmetry, and here the gift is real numbers.
</div>

<h3 id="spectral">The spectral theorem</h3>

<div class="latex-body">
After scaling our eigenvectors to have norm $1$, we can get an orthonormal basis of eigenvectors, which can be augmented together to form a nice matrix (see <a href="/desmos/orthogonal-basis">orthogonal bases</a> and <a href="/desmos/gram-schmidt">Gram–Schmidt</a>). The last part is subtle because if the geometric multiplicity of an eigenspace is more than 1, then the chosen eigenvectors themselves (with respect to the same eigenvalue) may not be perpendicular; however, Gram–Schmidt can fix this, while keeping them orthogonal to everything else. 

\begin{definition}
A real $n \times n$ matrix $Q$ is \textbf{orthogonal} if $Q^TQ = I$, i.e. its columns $\mathbf{q}_1, \dots, \mathbf{q}_n$ form an orthonormal basis of $\R^n$.
\end{definition}

The two descriptions agree since the $(i, j)$ entry of $Q^TQ$ is $\mathbf{q}_i^T\mathbf{q}_j$, which is $1$ on the diagonal (unit length) and $0$ off of it (perpendicular). The important consequence here is that
$$Q^{-1} = Q^T.$$
That is, inverting an orthogonal matrix costs nearly nothing. We don't have to row reduce, or find a determinant. We simply transpose to compute it. We also have that orthogonal matrices preserve lengths, since $\|Q\mathbf{x}\|^2 = (Q\mathbf{x})^T(Q\mathbf{x}) = \mathbf{x}^TQ^TQ\mathbf{x} = \mathbf{x}^T\mathbf{x} = \|\mathbf{x}\|^2$, and (by the same computation with two vectors) angles. In $\R^2$, this means an orthogonal matrix is a rotation or a reflection, and in a diagonalization we can always make it a rotation by flipping the sign of one eigenvector.

\begin{theorem}[Spectral theorem]\label{thm:spectral}
A real $n \times n$ matrix $A$ is symmetric if and only if
$$A = PDP^T, \qquad \text{equivalently} \qquad D = P^TAP,$$
for some orthogonal matrix $P$ and real diagonal matrix $D$. The columns of $P$ are an orthonormal eigenbasis of $A$, and $D$ has the corresponding eigenvalues on its diagonal.
\end{theorem}

We will not prove this in its entirety, but it is worth seeing how much of it we already have. One direction, that an orthonormal eigenbasis forces $A$ to be symmetric, is Problem 10.18 on Homework 10, and everything being real forces $A$ to be real as well. For the other, suppose $A$ is symmetric with $n$ distinct eigenvalues. By \Cref{lem:real} they are all real with real eigenvectors, by \Cref{lem:orth} those eigenvectors are pairwise orthogonal, and dividing each by its length makes them orthonormal. So the matrix $P$ of these unit eigenvectors is orthogonal, and the <a href="/desmos/diagonalization_notebook/#latex-label-thm-diag">diagonalization theorem</a> gives $A = PDP^{-1} = PDP^T$. The genuinely hard part is a repeated eigenvalue: there, the theorem promises that a symmetric matrix still has "enough" eigenvectors (an eigenvalue repeated $k$ times has a $k$-dimensional eigenspace). However, once that is shown, applying Gram–Schmidt inside each eigenspace makes them orthonormal.

To reiterate the payoff: for a general diagonalizable matrix, $D = P^{-1}AP$ needs the inverse of $P$. For a symmetric matrix, $D = P^TAP$ only needs a transpose.

\begin{example}
Consider the symmetric matrix
$$A = \frac{1}{8}\begin{bmatrix} 11 & 5 \\ 5 & 11 \end{bmatrix}.$$
As in the diagonalization notebook, clear the fraction first. The characteristic polynomial of $8A$ is $(11 - \mu)^2 - 25 = (\mu - 16)(\mu - 6)$, so $A$ has eigenvalues $\lambda_1 = \frac{16}{8} = 2$ and $\lambda_2 = \frac{6}{8} = \frac{3}{4}$, exactly the same as the matrix in Figure 1 there. Row reducing,
$$8A - 16I = \begin{bmatrix} -5 & \phantom{-}5 \\ \phantom{-}5 & -5 \end{bmatrix} \;\Longrightarrow\; E_2 = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 1 \end{bmatrix}\right\}, \qquad 8A - 6I = \begin{bmatrix} 5 & 5 \\ 5 & 5 \end{bmatrix} \;\Longrightarrow\; E_{3/4} = \operatorname{span}\left\{\begin{bmatrix} -1 \\ \phantom{-}1 \end{bmatrix}\right\}.$$
As promised by <a class="latex-ref" href="#latex-label-lem-orth">Lemma 2</a>, $(1, 1) \cdot (-1, 1) = 0$. Both have length $\sqrt{2}$, so the unit eigenvectors are $\mathbf{u}_1 = \frac{1}{\sqrt{2}}(1, 1)$ and $\mathbf{u}_2 = \frac{1}{\sqrt{2}}(-1, 1)$, and
$$P = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 & -1 \\ 1 & \phantom{-}1 \end{bmatrix} = \begin{bmatrix} \cos 45^\circ & -\sin 45^\circ \\ \sin 45^\circ & \phantom{-}\cos 45^\circ \end{bmatrix}, \qquad D = \begin{bmatrix} 2 & 0 \\ 0 & \tfrac{3}{4} \end{bmatrix}, \qquad P^T = \frac{1}{\sqrt{2}}\begin{bmatrix} \phantom{-}1 & 1 \\ -1 & 1 \end{bmatrix}.$$
So $P$ is the rotation by $45^\circ$, and $P^T$ is the rotation back by $-45^\circ$. Multiplying out confirms $PDP^T = A$.
\end{example}

For comparison, recall the matrix from Figure 1 of the diagonalization notebook, which has the same eigenvalues and even shares the eigenline through $(1, 1)$. We call it $B$ here, and write its basis matrix as $M = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 \end{bmatrix}$ to keep it apart from the orthogonal $P$:
$$B = \frac{1}{4}\begin{bmatrix} 6 & 2 \\ 3 & 5 \end{bmatrix} = MDM^{-1}, \qquad M = \begin{bmatrix} 1 & -2 \\ 1 & \phantom{-}3 \end{bmatrix}, \qquad M^{-1} = \frac{1}{5}\begin{bmatrix} \phantom{-}3 & 2 \\ -1 & 1 \end{bmatrix}.$$
(We flipped the sign of $\mathbf{v}_2 = (2, -3)$, which is still an eigenvector, so that $M$, like $P$, does not reflect the plane.) Notice that $M^{-1}$ took real work to find, and $M^T$ is nowhere close to it.
</div>

<h3 id="rotate">Rotate, stretch, rotate back</h3>

<div class="latex-body">
The factorization $A\mathbf{x} = P(D(P^T\mathbf{x}))$ reads right to left as three steps.
\begin{itemize}
\item $P^T$ rotates by $-45^\circ$, carrying $\mathbf{u}_1, \mathbf{u}_2$ onto $\mathbf{e}_1, \mathbf{e}_2$. In terms of coordinates, $P^T\mathbf{x} = [\mathbf{x}]_\beta$, the coordinates of $\mathbf{x}$ in the eigenbasis.
\item $D$ stretches by $2$ along the first axis and by $\frac{3}{4}$ along the second.
\item $P$ rotates by $45^\circ$, putting the stretched axes back along $\mathbf{u}_1, \mathbf{u}_2$.
\end{itemize}
The same reading of $B\mathbf{x} = M(D(M^{-1}\mathbf{x}))$ also has three steps, and the middle one is identical. The difference is the first and last steps. The eigenvectors $\mathbf{v}_1, \mathbf{v}_2$ are neither perpendicular nor of length one, so $M^{-1}$ cannot simply turn them onto $\mathbf{e}_1, \mathbf{e}_2$. It has to shear and squash the whole plane to get them there, and $M$ has to undo all of it at the end.

The figure below runs both side by side, with one slider for both. I invite you to step through it slowly, and to drag $\mathbf{x}$ around.
</div>

<div class="ev-figure" id="sp1">
  <div class="dnb-row">
    <div class="dnb-graph" data-json="spectral_theory_notebook/orthogonal.json" data-height="420" data-no-toggle="true" data-ready-fn="spFig1Sym">
      <p class="ev-graph-title">Symmetric: \(A = PDP^T\)</p>
    </div>
    <div class="dnb-graph" data-json="spectral_theory_notebook/general.json" data-height="420" data-no-toggle="true" data-ready-fn="spFig1Gen">
      <p class="ev-graph-title">Not symmetric: \(B = MDM^{-1}\)</p>
    </div>
  </div>
  <div class="ev-panel ev-panel--wide">
    <div class="ev-block" id="sp1-steps">
      <div class="ev-slide"><input class="site-slider" type="range" min="0" max="3" step="0.001" value="0" aria-label="Steps applied"><button type="button" class="site-btn" id="sp1-play">▶ Play</button></div>
      <div class="ev-snaps">
        <button type="button" class="site-btn" data-step="0" aria-pressed="true">Start</button>
        <button type="button" class="site-btn" data-step="1" aria-pressed="false">1. \(P^T\), \(M^{-1}\)</button>
        <button type="button" class="site-btn" data-step="2" aria-pressed="false">2. \(D\)</button>
        <button type="button" class="site-btn" data-step="3" aria-pressed="false">3. \(P\), \(M\)</button>
      </div>
      <p class="ev-hint" id="sp1-step"></p>
    </div>
  </div>
  <p class="ev-caption">Figure 1. The same stretch \(D\), reached two ways: by a rotation (left) or by a change of basis that distorts the plane (right).</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="sp1-calc-sym"></div>
    <div class="ev-calc-math" id="sp1-calc-gen"></div>
  </div>
</div>

<div class="latex-body">
Some things to look for:
\begin{itemize}
\item After step 1, both purple grids land exactly on the faint standard grid. That is, both $P^T$ and $M^{-1}$ convert to eigenbasis coordinates. On the left the grid simply turns; on the right it gets sheared into place.
\item The green circle stays a circle through step 1 on the left, since a rotation preserves lengths. On the right it is already squashed into an ellipse before $D$ has done anything.
\item Step 2 is the same stretch on both sides.
\item At the end, the circle has become an ellipse on both sides. On the left, the axes of the ellipse are exactly the eigenvectors, with half-lengths $2 \cdot 2 = 4$ and $2 \cdot \frac{3}{4} = \frac{3}{2}$. On the right, the axes of the ellipse do not line up with the eigenvectors at all.
\end{itemize}
To reiterate: every diagonalization is a change of basis, a stretch, and a change back. What being symmetric buys us is that the change of basis is a rotation, so it keeps the geometry intact (lengths and right angles), and undoing it is only a transpose.
</div>

<h3 id="decomposition">Spectral decomposition</h3>

<div class="latex-body">
There is a second, equally geometric way to read $A = PDP^T$. Writing $\mathbf{u}_1, \dots, \mathbf{u}_n$ for the orthonormal eigenvectors (the columns of $P$) and $\lambda_1, \dots, \lambda_n$ for their eigenvalues, the product can be rewritten as a sum,
$$A = \lambda_1\mathbf{u}_1\mathbf{u}_1^T + \lambda_2\mathbf{u}_2\mathbf{u}_2^T + \cdots + \lambda_n\mathbf{u}_n\mathbf{u}_n^T,$$
which is called the \textbf{spectral decomposition} of $A$ (this is Problem 10.19 on Homework 10). The set of eigenvalues $\{\lambda_1, \dots, \lambda_n\}$ is often called the \textit{spectrum} of $A$, which is where the name spectral theory comes from.

Notably, each $\mathbf{u}_i\mathbf{u}_i^T$ is an $n \times n$ matrix, and since $\|\mathbf{u}_i\| = 1$, it is exactly the projection matrix onto the line through $\mathbf{u}_i$ (recall <a href="/desmos/orthogonal-basis">orthogonal bases and projections</a>):
$$P_{\mathbf{u}_i} = \frac{\mathbf{u}_i\mathbf{u}_i^T}{\|\mathbf{u}_i\|^2} = \mathbf{u}_i\mathbf{u}_i^T, \qquad P_{\mathbf{u}_i}\mathbf{x} = (\mathbf{u}_i^T\mathbf{x})\,\mathbf{u}_i.$$
(Each of these has rank one, by Problem 10.1.) So the spectral decomposition says
$$A\mathbf{x} = \lambda_1P_{\mathbf{u}_1}\mathbf{x} + \lambda_2P_{\mathbf{u}_2}\mathbf{x} + \cdots + \lambda_nP_{\mathbf{u}_n}\mathbf{x},$$
and we can read the action of $A$ on $\mathbf{x}$ in three steps:
\begin{itemize}
\item Project $\mathbf{x}$ onto each eigenline, i.e. drop a perpendicular from $\mathbf{x}$ onto the line through each $\mathbf{u}_i$. These pieces $P_{\mathbf{u}_i}\mathbf{x}$ add back up to $\mathbf{x}$.
\item Each piece $P_{\mathbf{u}_i}\mathbf{x}$ lies in the eigenspace $E_{\lambda_i}$, so $A$ simply scales it by $\lambda_i$.
\item Add the scaled pieces back together, which gives $A\mathbf{x}$.
\end{itemize}
In a sense, this is the same story as rotate, stretch, rotate back, just told in different words. The numbers $\mathbf{u}_i^T\mathbf{x}$ are exactly the entries of $P^T\mathbf{x}$ (the coordinates of $\mathbf{x}$ in the eigenbasis), multiplying by $\lambda_i$ is $D$, and putting $\lambda_i(\mathbf{u}_i^T\mathbf{x})\,\mathbf{u}_i$ back together is $P$.

It is worth comparing with the not symmetric $B$. There we can still write $\mathbf{x} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2$ and get $B\mathbf{x} = \lambda_1c_1\mathbf{v}_1 + \lambda_2c_2\mathbf{v}_2$ (see <a href="/desmos/diagonalization_notebook/#eigenbasis">eigenbases</a> in the diagonalization notebook). However, since $\mathbf{v}_1$ and $\mathbf{v}_2$ are not perpendicular, the pieces $c_1\mathbf{v}_1$ and $c_2\mathbf{v}_2$ are not found by dropping perpendiculars. We have to solve for $c_1, c_2$, which is exactly the work that $M^{-1}$ does.

The figure below builds a symmetric $2 \times 2$ matrix from its spectrum: choose the direction of $\mathbf{u}_1$ (and $\mathbf{u}_2$ is perpendicular to it) and the two eigenvalues, then drag $\mathbf{x}$ around. The defaults give the matrix $A$ from the example above.
</div>

<div class="ev-figure" id="sp2">
  <div class="dnb-row">
    <div class="dnb-graph dnb-graph--two-thirds" data-json="spectral_theory_notebook/decomposition.json" data-height="480" data-no-toggle="true" data-ready-fn="spFig2"></div>
    <div class="ev-panel">
      <span class="ev-label">Spectrum</span>
      <div class="ev-block">
        <div class="ev-slide-head"><span>Angle of \(\mathbf{u}_1\)</span><strong id="sp2-th-val">45°</strong></div>
        <div class="ev-slide"><input class="site-slider" id="sp2-th" type="range" min="0" max="180" step="1" value="45" aria-label="Angle of u1"></div>
      </div>
      <div class="ev-block">
        <div class="ev-slide-head"><span>\(\lambda_1\)</span><strong id="sp2-l1-val">2</strong></div>
        <div class="ev-slide"><input class="site-slider" id="sp2-l1" type="range" min="-3" max="3" step="0.05" value="2" aria-label="lambda 1"></div>
      </div>
      <div class="ev-block">
        <div class="ev-slide-head"><span>\(\lambda_2\)</span><strong id="sp2-l2-val">0.75</strong></div>
        <div class="ev-slide"><input class="site-slider" id="sp2-l2" type="range" min="-3" max="3" step="0.05" value="0.75" aria-label="lambda 2"></div>
      </div>
      <p class="ev-hint">Drag \(\mathbf{x}\) in the graph.</p>
    </div>
  </div>
  <p class="ev-caption">Figure 2. Project \(\mathbf{x}\) onto each eigenline, scale each piece by its eigenvalue, and add: the result is \(A\mathbf{x}\).</p>
  <div class="ev-calc">
    <div class="ev-calc-math" id="sp2-calc-a"></div>
    <div class="ev-calc-math" id="sp2-calc-x"></div>
  </div>
</div>

<div class="latex-body">
I invite you to try the following:
\begin{itemize}
\item Make $\lambda_2$ negative. The scaled piece $\lambda_2P_{\mathbf{u}_2}\mathbf{x}$ flips to the other side of the origin, and $A\mathbf{x}$ follows it.
\item Set $\lambda_2 = 0$. Now $A\mathbf{x}$ always lands on the line through $\mathbf{u}_1$, no matter where $\mathbf{x}$ is, and $A = \lambda_1\mathbf{u}_1\mathbf{u}_1^T$ has rank one. The end of Homework 10 asks how the rank of $A$ relates to its eigenvalues in general, and this picture is a good place to start.
\item Set $\lambda_1 = \lambda_2$. The matrix stops depending on the angle at all (why?).
\item Turn $\mathbf{u}_1$ while keeping the eigenvalues fixed. The matrix changes, but it stays symmetric.
\end{itemize}
</div>
