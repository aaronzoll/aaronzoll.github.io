---
layout: widget
title: "The Eigenvector Clock"
permalink: /prints/eigen-clock/
print_project: true
blurb: "A geared clock that draws a 2×2 matrix. Turn the crank and the purple hand sweeps a unit vector x while the red arrow follows Ax; when the two line up, x is an eigenvector. Three swappable matrix sets."
thumb: "/prints/images/eigen-clock.png"
widget_src: "/prints/apps/eigen-clock.html"
widget_height: 700
widget_height_mobile: 960
widget_fixed_height: true
back_url: "/prints/"
back_label: "3D Prints"
---

<!--writeup-->

<div class="latex-body">
\section*{What the clock shows}

The purple hand is a unit vector $\mathbf{x}$, and as we turn the crank it sweeps once around the circle. The red arrow rides along a black hand and always points to $s\,A\mathbf{x}$, for the matrix $A$ printed on the face (and a fixed scale $s$, so that the arrow stays on the dial). For most directions the two hands disagree, since $A$ both stretches and turns $\mathbf{x}$. But a few times per turn the red arrow lands exactly on the line of the purple hand. At those moments $A\mathbf{x} = \lambda\mathbf{x}$, so $\mathbf{x}$ is an eigenvector, and the white line it sits on is labelled with its eigenvalue $\lambda$. I invite you to turn the crank in the model above and watch for these moments (with "Pause at eigenvectors" on, the model stops at each one).

The clock comes with three matrix sets, each five lettered pieces that swap in without re-timing any gears:
\begin{itemize}
\item \textbf{D}, the diagonal matrix with rows $(2, 0)$ and $(0, -1)$, whose eigenvectors are the axes themselves;
\item \textbf{S}, the symmetric matrix with rows $(1, 2)$ and $(2, 1)$, whose eigenvectors are perpendicular, at $45^\circ$ and $135^\circ$;
\item \textbf{N}, the non-symmetric matrix with rows $(2, 1)$ and $(0, -1)$, whose eigenvectors are not perpendicular.
\end{itemize}
Notably, as $\mathbf{x}$ goes around the circle, $A\mathbf{x}$ traces an ellipse, and the slot cut in each face is exactly that ellipse. When a negative eigenvalue comes up, the red arrow points directly opposite the purple hand. That is still the same line, so it is still an eigenvector!

\section*{How a gear train computes Ax}

The trick is to think of the plane as the complex numbers, with $\mathbf{x} = z = e^{i\theta}$. Any real $2 \times 2$ matrix can then be written as
$$A\mathbf{x} \;\longleftrightarrow\; p\,z + q\,\bar{z}, \qquad p = \frac{(a + d) + i(c - b)}{2}, \quad q = \frac{(a - d) + i(c + b)}{2},$$
where $A$ has rows $(a, b)$ and $(c, d)$. As a sanity check, for the identity we get $p = 1$ and $q = 0$. The first piece, $p\,z$, is a rotation and scaling of $z$, so it turns \textit{with} $\mathbf{x}$. The second piece, $q\,\bar{z}$, is a reflection, so it turns \textit{against} $\mathbf{x}$, at the same speed.

So the mechanism adds two rotating arms. The carrier plate turns backwards at the same rate as the shaft, carrying the planet around a circle of fixed radius, and this is the $q\,\bar{z}$ term. On the planet sits the arm, whose length is proportional to $|p|$, and the planetary gearing turns it forwards, giving the $p\,z$ term. The pin at the tip of the arm is the sum, and so it sits at $s\,A\mathbf{x}$, with $s = 42\,\text{mm} / |q|$. The black hand just follows the pin around, and the red arrow slides along it to wherever the pin is. Switching the matrix only changes the arm (its length and angle), the face, and where the purple hand points, which is why a set swap needs only five pieces.

\begin{remark*}
There is no defective matrix set, and not for lack of trying. The arm has length $42\,|p| / |q|$ mm, and it only clears the stack of gears in the centre when $|p| < |q|$. A short computation shows $|q|^2 - |p|^2 = -\det A$, so this happens exactly when $\det A < 0$. A defective $2 \times 2$ matrix has a repeated real eigenvalue $\lambda$, so $\det A = \lambda^2 \geq 0$, and it can never be built on this gear train. For instance, the matrix with rows $(2, 1)$ and $(0, 2)$ would need an arm about $4$ times the carrier radius, sweeping straight through the centre.
\end{remark*}

\section*{Print your own}

All the parts print without supports, in four colours (black, white, purple and red). The <a href="/assets/eigen_clock_v3/eigen_clock_v3/assembly_guide.pdf">assembly guide</a> walks through the same sixteen steps as the "Build" panel above, plus a page on swapping sets. Print the gears first and check that the train turns smoothly before printing the faces.
\begin{itemize}
\item <a href="/assets/eigen_clock_v3.zip">Everything (zip)</a>: STLs, the Bambu Studio project, the guide, and the Python source that generates the parts.
\item <a href="/assets/eigen_clock_v3/eigen_clock_v3/eigen_clock_v2.3mf">Bambu Studio project (3MF)</a>, with the parts already laid out on six plates.
\item <a href="/assets/eigen_clock_v3/eigen_clock_v3/assembly_guide.pdf">Assembly guide (PDF)</a>.
\end{itemize}
</div>
