---
layout: puzzle-set
title: "Puzzle Set 1"
permalink: /puzzles/set-1/
blurb: "Paths through a forest of rational trees, random simplices around a center, coloring arguments for tilings, and how many digit products multiplication really needs."
problems:
  - id: rational-forest
    title: "The rational forest"
  - id: random-triangles
    title: "Random triangles"
  - id: long-dominoes
    title: "Tiling with long dominoes"
  - id: multiplication
    title: "Four ways to multiply"
---

<!-- ───────────────────────────── Problem 1 ───────────────────────────── -->
<section class="pz-problem" id="rational-forest">

<div class="latex-body">
\begin{problem}[The rational forest]
A (infinitely small) tree sits at every rational point in $\R^2$. That is, there is an obstruction at every $(p,q)$ where $p, q \in \Q$. You start at the tree at $(0,0)$ and want to reach the tree at $(1,1)$ without touching any other tree.
\begin{enumerate}[a)]
  \item You may only move along straight line segments. How can you get to your destination in the fewest number of segments?
  \item Now you may only move along arcs of circles. How can you get to your destination in the fewest number of arcs?
  \item Now you live on the unit sphere $S^2 = \left\{(x,y,z) \in \R^3 : x^2+y^2+z^2 = 1\right\}$, and a tree stands at every point of $S^2 \cap \Q^3$. You start at $A = (1,0,0)$, want to reach $B = (0,1,0)$, and may only move along arcs of great circles. How can you get to your destination in the fewest number of arcs?
\end{enumerate}
\end{problem}
</div>

<div class="pz-figrow">
{% include_relative _figures/forest-diagonal.html %}
{% include_relative _figures/sphere-equator.html %}
</div>

<details class="pz-drop pz-solution" id="rational-forest-solution">
<summary><span class="pz-sum-kind">Solution</span></summary>
<div class="pz-drop-body">

<div class="latex-body">
\textbf{(a)} Two segments. We can't do it in one, since the straight shot from $(0,0)$ to $(1,1)$ runs right through the tree at $\left(\frac12,\frac12\right)$. So the real question is whether a single turn is enough. The key observation is that lines with irrational slope are very good at avoiding trees.

\begin{lemma*}
A line through a rational point $(x_0,y_0)$ with irrational slope $m$ contains no other rational point.
\end{lemma*}

\begin{proof}
Suppose $(p,q) \in \Q^2$ also lies on the line. If $p = x_0$, then $q = y_0$ and it is the same point. Otherwise $m = \frac{q-y_0}{p-x_0}$ is a ratio of rationals, and hence rational, a contradiction.
\end{proof}

So all we need is a turning point that makes the slope of both legs irrational. We look for one of the form $(c, 1-c)$ (this choice will pay off in (b) and (c)), and walk $(0,0) \to (c,1-c) \to (1,1)$. The two segments have slopes
$$\frac{1-c}{c} = \frac{1}{c} - 1 \quad \text{and} \quad \frac{1-(1-c)}{1-c} = \frac{c}{1-c}.$$
Both are irrational whenever $c$ is: if $\frac1c - 1 \in \Q$ then $c \in \Q$, and if $\frac{c}{1-c} = r \in \Q$, then solving for $c$ gives $c = \frac{r}{1+r} \in \Q$ (note $r \neq -1$). So taking, say, $c = \frac{\sqrt2}{2}$, the lemma tells us the first segment only touches the tree at $(0,0)$ and the second only the tree at $(1,1)$. The turning point $(c,1-c)$ is irrational, so it is not a tree either.

\begin{remark*}
There is nothing special about this turning point. A point is a bad place to turn only if it lies on a line through $(0,0)$ or $(1,1)$ with rational (or infinite) slope, and there are only countably many such lines. So in a sense, almost every turning point works!
\end{remark*}

\textbf{(b)} One arc. Curved paths give us more freedom, and it turns out we don't need to turn at all. Any circle through $(0,0)$ and $(1,1)$ has its center on the perpendicular bisector $x + y = 1$, say at $(c,1-c)$, with squared radius $c^2 + (1-c)^2$. Expanding its equation,
\begin{align*}
(x-c)^2 + (y-1+c)^2 &= c^2 + (1-c)^2 \\
x^2 + y^2 - 2cx - 2(1-c)y &= 0 \\
x^2 + y^2 - 2y &= 2c(x-y).
\end{align*}
Now suppose a tree $(p,q)$ sits on this circle. If $p \neq q$, we can solve for $c$,
$$c = \frac{p^2+q^2-2q}{2(p-q)} \in \Q,$$
so $c$ would have to be rational. If instead $p = q$, the equation reads $2p^2 - 2p = 0$, so the tree is one of our endpoints $(0,0)$ or $(1,1)$. That is, as long as $c$ is irrational, the only trees on the entire circle are the two endpoints, and either arc between them gets us home. Notice that with the same $c$ as in (a), the turning point from before is exactly the center of this circle.
</div>

<div class="pz-figrow">
{% include_relative _figures/forest-segments.html %}
{% include_relative _figures/forest-arc.html %}
</div>

<div class="latex-body">
\textbf{(c)} Two arcs. The sphere looks like a different problem, but we can actually reduce it to (a). The trick is a central projection, which turns great circles into straight lines.

\textbf{Central projection.} For a point $s = (x,y,z) \in S^2$ with $x + y + z > 0$, let $\pi(s) = \frac{s}{x + y + z}$, i.e. the point where the ray from the origin through $s$ meets the plane $x + y + z = 1$. Every point of that plane can be written uniquely as $(1-u, v, u-v)$, which gives it coordinates $(u,v)$ with $A$ at $(0,0)$ and $B$ at $(1,1)$. The map $\pi$ is a bijection from the open hemisphere $x + y + z > 0$ onto this plane, with inverse
$$(1-u, v, u-v) \mapsto \frac{(1-u, v, u-v)}{\left|(1-u, v, u-v)\right|}.$$
We need two properties of $\pi$.
\begin{itemize}
  \item A great circle is $S^2$ intersected with a plane through the origin, so $\pi$ sends it to the intersection of two planes, which is a line. Hence great-circle arcs in the hemisphere correspond to line segments.
  \item If $s \in \Q^3$, then $\pi(s) \in \Q^3$, so $u = 1 - \frac{x}{x+y+z}$ and $v = \frac{y}{x+y+z}$ are rational. Hence every tree on the sphere lands on a point of $\Q^2$.
\end{itemize}
Notably, the converse of the second property fails: a rational point $(u,v)$ comes from a tree only when the length of $(1-u,v,u-v)$ is rational. So the sphere actually has \textit{fewer} obstacles than the plane, and any path from (a) carries over to the sphere. The two problems are not quite the same, but (c) is no harder than (a).

\textbf{One arc is not enough.} Since $A \neq \pm B$, the only great circle through $A$ and $B$ is the equator $z = 0$. One arc from $A$ to $B$ passes through the tree $\left(\frac35,\frac45,0\right)$, and the other through the tree $-A$. This is the same obstruction we saw in (a): in the plane, the first arc is the diagonal from $(0,0)$ to $(1,1)$, and $\pi\left(\frac35,\frac45,0\right) = \left(\frac37,\frac47,0\right)$ is its point $\left(\frac47,\frac47\right)$, just as $\left(\frac12,\frac12\right)$ blocked the diagonal before.

\textbf{Two arcs work.} We pull back the path of (a) with $c = \frac{\sqrt2}{2}$. Its turning point $(c, 1-c)$ is the plane point
$$(1-c, 1-c, 2c-1) = \left(\frac{2-\sqrt2}{2}, \frac{2-\sqrt2}{2}, \sqrt2-1\right),$$
whose squared length is
$$\frac{(2-\sqrt2)^2}{2} + (\sqrt2-1)^2 = (3 - 2\sqrt2) + (3 - 2\sqrt2) = (2-\sqrt2)^2.$$
Since $\sqrt2 - 1 = \frac{2-\sqrt2}{\sqrt2}$, dividing by $2 - \sqrt2$ gives the turning point on the sphere,
$$Q = \left(\frac12, \frac12, \frac{\sqrt2}{2}\right).$$
The segments of (a) contain no rational points besides their endpoints, so the arcs from $A$ to $Q$ and from $Q$ to $B$ contain no trees besides $A$ and $B$. As a sanity check, we can also see this directly. The first arc lies on the great circle in the plane $z = \sqrt2 y$ and the second in $z = \sqrt2 x$. A rational point on either plane must have $y = z = 0$ (respectively $x = z = 0$), so the only trees on these great circles are $\pm A$ and $\pm B$.
</div>

<div class="pz-figrow">
{% include_relative _figures/sphere-two-arcs.html %}
</div>

</div>
</details>

</section>

<!-- ───────────────────────────── Problem 2 ───────────────────────────── -->
<section class="pz-problem" id="random-triangles">

<div class="latex-body">
\begin{problem}[Random triangles]
Here we will look at two similar problems. These are quite challenging (especially the second one), so if you want to see the magic that makes it work, you can view a clever solution in <a href="https://www.youtube.com/watch?v=OkmNXy7er84&t=1s" target="_blank" rel="noopener">3Blue1Brown's video</a>.
\begin{enumerate}[a)]
  \item Three points are chosen independently and uniformly on a circle. What is the probability that the triangle they form contains the center of the circle?
  \item Four points are chosen independently and uniformly on a sphere. What is the probability that the tetrahedron they form contains the center of the sphere? (Putnam 1992, A6)
\end{enumerate}
\end{problem}
</div>

<details class="pz-drop pz-try">
<summary><span class="pz-sum-kind">Try it:</span> generate random triangles and tetrahedrons</summary>
<div class="pz-drop-body">
  <a class="pz-open-full" href="/puzzles/random-triangles/">Open full page ↗</a>
  <div class="pz-embed"><iframe data-src="/puzzles/apps/random-triangles.html" title="Generating Triangles and Tetrahedrons" style="height:1150px"></iframe></div>
</div>
</details>

<details class="pz-drop pz-solution" id="random-triangles-solution">
<summary><span class="pz-sum-kind">Solution</span></summary>
<div class="pz-drop-body">

<div class="latex-body">
The answers are $\frac14$ and $\frac18$ (which you can check against the tally in the app above). Computing these directly is a mess, so the trick is to change how we sample the points. See <a href="https://www.youtube.com/watch?v=OkmNXy7er84&t=1s" target="_blank" rel="noopener">3Blue1Brown's video</a> for a great walkthrough of this idea.

\textbf{Resampling.} Choosing a point uniformly on the sphere is the same as first choosing a uniformly random line through the center, and then flipping a fair coin to decide which of its two endpoints to take. So rather than picking all four points at once, we first choose $P_4$ and the lines through $P_1$, $P_2$, $P_3$, and only afterwards flip three coins to pick the endpoints. Once $P_4$ and the lines are fixed, each of the eight choices $\left(\pm P_1, \pm P_2, \pm P_3, P_4\right)$ is equally likely. We show below that exactly one of them gives a tetrahedron containing the center, so the probability is $\frac18$.

The circle works the same way, but with only two diameters and four choices $\left(\pm P_1, \pm P_2, P_3\right)$, giving $\frac14$. In the figure, the diameters through $P_1$ and $P_2$ and the point $P_3$ are fixed, and exactly one of the four triangles contains the center.
</div>

<div class="pz-figrow">
{% include_relative _figures/circle-four-triangles.html %}
</div>

<div class="latex-body">
\textbf{Exactly one choice works.} Place the center at the origin. With probability $1$, the points $P_1, P_2, P_3$ are linearly independent, so we can write
$$-P_4 = c_1 P_1 + c_2 P_2 + c_3 P_3$$
for unique $c_1, c_2, c_3$, all nonzero. We claim the tetrahedron contains the origin exactly when $c_1, c_2, c_3 > 0$.
\begin{itemize}
  \item If each $c_i > 0$, then $c_1 P_1 + c_2 P_2 + c_3 P_3 + P_4 = 0$, and dividing by $1 + c_1 + c_2 + c_3$ writes the origin as a convex combination of the $P_i$.
  \item Conversely, if $\sum_{i=1}^4 \lambda_i P_i = 0$ with $\lambda_i \geq 0$ and $\sum_{i=1}^4 \lambda_i = 1$, then $\lambda_4 > 0$ (otherwise $P_1, P_2, P_3$ are dependent), so $-P_4 = \sum_{i=1}^3 \frac{\lambda_i}{\lambda_4} P_i$, and uniqueness gives $c_i = \frac{\lambda_i}{\lambda_4} > 0$.
\end{itemize}
Now notice that replacing $P_i$ by $-P_i$ flips the sign of $c_i$ and leaves the others alone. So among the eight sign choices, exactly one makes all three coefficients positive.

\begin{remark*}
Nothing here depends on being in three dimensions. The same argument shows that $n+1$ points chosen uniformly on the sphere in $\R^n$ contain the center with probability $\frac{1}{2^n}$, which recovers $\frac14$ for $n = 2$ and $\frac18$ for $n = 3$.
\end{remark*}
</div>

</div>
</details>

</section>

<!-- ───────────────────────────── Problem 3 ───────────────────────────── -->
<section class="pz-problem" id="long-dominoes">

<div class="latex-body">
\begin{problem}[Tiling with long dominoes]
Here we ask how and when it is possible to tile a grid with dominoes.
\begin{enumerate}[a)]
  \item Can a $10 \times 10$ board be tiled by $1 \times 4$ tiles (placed horizontally or vertically)?
  \item More generally, for which $n$ and $L$ can an $n \times n$ board be tiled by $1 \times L$ tiles?
\end{enumerate}
\end{problem}
</div>

<details class="pz-drop pz-try">
<summary><span class="pz-sum-kind">Try it:</span> place long dominoes on an \(n \times n\) board</summary>
<div class="pz-drop-body">
  <a class="pz-open-full" href="/puzzles/long-dominoes/">Open full page ↗</a>
  <div class="pz-embed"><iframe data-src="/puzzles/apps/long-dominoes.html" title="Tiling with Long Dominoes" style="height:1050px"></iframe></div>
</div>
</details>

<details class="pz-drop pz-solution" id="long-dominoes-solution">
<summary><span class="pz-sum-kind">Solution</span></summary>
<div class="pz-drop-body">

<div class="latex-body">
\textbf{(a)} No. If you played around with the app above, you probably found yourself stuck with a few cells left over no matter what you tried. When the answer to a tiling question is no, the usual tool is a coloring argument: color the board so that every tile covers the same colors no matter where we put it, and then show the board itself is unbalanced.

Here, color the cell in row $i$ and column $j$ (counting from $0$, so the top-left cell has color $0$) by $(i + j) \bmod 4$. A horizontal tile covers the cells $(i,j), (i,j+1), (i,j+2), (i,j+3)$, whose colors are the residues of four consecutive integers. That is, it covers exactly one cell of each color, and the same holds for a vertical tile. A tiling of the $100$ cells uses $25$ tiles, so it would cover exactly $25$ cells of each color. Counting, however, gives
$$\#\left\{0\right\} = 25, \quad \#\left\{1\right\} = 26, \quad \#\left\{2\right\} = 25, \quad \#\left\{3\right\} = 24,$$
so no tiling exists. You can see this coloring in the app: open the hint and press "Color the board."

\begin{remark*}
This is the four-color version of a classic puzzle. Remove two opposite corners from an $8 \times 8$ chessboard and try to tile the remaining $62$ squares with $1 \times 2$ dominoes. The chessboard coloring is exactly the coloring by $(i + j) \bmod 2$, and each domino covers one black and one white square, so a tiling needs as many black squares as white. But the two removed corners $(0,0)$ and $(7,7)$ have the same color, leaving $32$ squares of one color and $30$ of the other. Our $1 \times 4$ tiles just call for four colors instead of two.
\end{remark*}
</div>

<div class="pz-figrow">
{% include_relative _figures/mutilated-chessboard.html %}
</div>

<div class="latex-body">
\textbf{(b)} Exactly when $L$ divides $n$. One direction is easy: if $n = qL$, each row splits into $q$ horizontal tiles. For the other direction, we generalize the coloring from (a). Suppose $L$ does not divide $n$, and write $n = qL + r$ with $0 < r < L$. Color the board by $(i + j) \bmod L$ as before. Every tile still covers one cell of each color, so a tiling would need exactly $\frac{n^2}{L}$ cells of each color.

To count the colors, cut the board into three pieces as in the figure below: the top $qL$ rows, the bottom-left $r \times qL$ block, and the bottom-right $r \times r$ corner. The first two pieces each have a side whose length is a multiple of $L$, and along that side every run of $L$ consecutive cells contains each color once. So together they contain each color equally often, namely
$$\frac{n^2 - r^2}{L}$$
times. All the imbalance then lives in the corner. Write $i = qL + i'$ and $j = qL + j'$ with $0 \leq i', j' \leq r - 1$. Since $2qL \equiv 0 \pmod L$, the cell has color $(i' + j') \bmod L$, where $i' + j'$ ranges from $0$ to $2r - 2$. The value $i' + j' = r - 1$ occurs in exactly $r$ cells (the antidiagonal of the corner), and no other value in $[0, 2r - 2]$ is congruent to $r - 1$ modulo $L$, because $r - 1 - L < 0$ and $r - 1 + L > 2r - 2$. So the color $(r - 1) \bmod L$ occurs
$$\frac{n^2 - r^2}{L} + r$$
times. A tiling would need this to equal $\frac{n^2}{L}$, i.e. $r = \frac{r^2}{L}$, which forces $r = L$, a contradiction. As a sanity check, $n = 10$ and $L = 4$ gives $q = 2$ and $r = 2$, and the color $1$ shows up $24 + 2 = 26$ times, exactly what we counted in (a).
</div>

<div class="pz-figrow">
{% include_relative _figures/board-blocks.html %}
</div>

</div>
</details>

</section>

<!-- ───────────────────────────── Problem 4 ───────────────────────────── -->
<section class="pz-problem" id="multiplication">

<div class="latex-body">
\begin{problem}[Four ways to multiply]
Let $x$ and $y$ be $n$-digit positive integers. We compare four methods for computing $xy$ by counting \emph{digit multiplications} (products of two single digits). Here, we ignore the complexity additions add, as they are computationally much cheaper. Each method is illustrated on $x = \xc{47}$ and $y = \yc{26}$, with the digits of $x$ in $\xc{\text{blue}}$, the digits of $y$ in $\yc{\text{orange}}$, and products in $\pc{\text{green}}$.
<div class="pz-method">
<div class="pz-method-text">\textbf{1. Long multiplication.} For each digit of $y$, multiply $x$ by that digit from right to left, adding the carry from the previous step, to form a row, and shift the row left by the position of the digit. Then add the rows column by column, carrying as usual.</div>
{% include_relative _figures/mult-long.html %}
</div>
<div class="pz-method">
<div class="pz-method-text">\textbf{2. Lattice multiplication.} Draw an $n \times n$ grid with the digits of $x$ across the top and the digits of $y$ down the right side. Split each cell by a diagonal and write the two-digit product of its column and row digits, tens above the diagonal and units below. Then sum along each diagonal band (shaded alternately), starting from the bottom right, carrying into the next band. The answer is read down the left side and along the bottom.</div>
{% include_relative _figures/mult-lattice.html %}
</div>
<div class="pz-method">
<div class="pz-method-text">\textbf{3. Divide and conquer.} Take $n = 2^m$ and split each number into its top and bottom halves, $x = \xc{x_1} 10^{n/2} + \xc{x_0}$ and $y = \yc{y_1} 10^{n/2} + \yc{y_0}$, where $\xc{x_0}, \xc{x_1}, \yc{y_0}, \yc{y_1}$ have $n/2$ digits. Expanding,
$$xy = \pc{x_1 y_1} 10^n + \left(\pc{x_1 y_0} + \pc{x_0 y_1}\right) 10^{n/2} + \pc{x_0 y_0}.$$
Picture $xy$ as the area of a rectangle with sides split into $\xc{x_1}, \xc{x_0}$ and $\yc{y_1}, \yc{y_0}$: one product of $n$-digit numbers becomes four products of $n/2$-digit numbers, one per block. Each block is computed the same way, splitting again until the factors are single digits. In the example,
$$xy = \pc{8} \cdot 100 + \left(\pc{24} + \pc{14}\right) \cdot 10 + \pc{42} = 1222.$$</div>
{% include_relative _figures/mult-split.html %}
</div>
<div class="pz-method">
<div class="pz-method-text">\textbf{4. Karatsuba's algorithm.} The two middle blocks are only needed through their sum. The whole rectangle has area $\pc{(x_1 + x_0)(y_1 + y_0)}$, so removing the two corner blocks leaves the middle:
$$\pc{x_1 y_0} + \pc{x_0 y_1} = \pc{(x_1 + x_0)(y_1 + y_0)} - \pc{x_1 y_1} - \pc{x_0 y_0}.$$
So after computing the corners $\pc{x_1 y_1}$ and $\pc{x_0 y_0}$, a single further product gives the middle, and three products of roughly half the size replace four. Each is again computed the same way. In the example,
\begin{align*}
\pc{(x_1 + x_0)(y_1 + y_0)} &= \xc{11} \cdot \yc{8} = \pc{88} \\
\pc{x_1 y_0} + \pc{x_0 y_1} &= \pc{88} - \pc{8} - \pc{42} = 38 \\
xy &= 800 + 380 + 42 = 1222.
\end{align*}</div>
{% include_relative _figures/mult-karatsuba.html %}
</div>
\begin{enumerate}[a)]
  \item Show that long multiplication uses $n^2$ digit multiplications.
  \item Show that lattice multiplication uses the same number. How are the two methods related?
  \item Show that divide and conquer also uses $n^2$ digit multiplications.
  \item Show that Karatsuba's algorithm uses $n^{\log_2 3}$ digit multiplications.
\end{enumerate}
\end{problem}
</div>

<details class="pz-drop pz-try">
<summary><span class="pz-sum-kind">Try it:</span> run the four methods on your own numbers</summary>
<div class="pz-drop-body">
  <a class="pz-open-full" href="/puzzles/multiplication/">Open full page ↗</a>
  <div class="pz-embed"><iframe data-src="/puzzles/apps/multiplication.html" title="Four Ways to Multiply" style="height:980px"></iframe></div>
</div>
</details>

<details class="pz-drop pz-solution" id="multiplication-solution">
<summary><span class="pz-sum-kind">Solution</span></summary>
<div class="pz-drop-body">

<div class="latex-body">
Throughout, write $x = \sum_{i=0}^{n-1} a_i 10^i$ and $y = \sum_{j=0}^{n-1} b_j 10^j$ with digits $a_i, b_j$, and let $M(n)$ be the number of digit multiplications used on $n$-digit inputs. For more on this whole topic, see <a href="https://www.youtube.com/watch?v=AMl6EJHfUWo&t=1151s" target="_blank" rel="noopener">this video</a>.

\textbf{(a)} Each row multiplies all $n$ digits of $x$ by a single digit of $y$, so each row costs $n$ digit multiplications (the carries and the final column sums are only additions). With $n$ rows, $M(n) = n^2$.

\textbf{(b)} Each of the $n^2$ cells holds exactly one digit product, so again $M(n) = n^2$. In fact, the two methods are really the same algorithm in disguise. Both compute
$$xy = \sum_{i=0}^{n-1} \sum_{j=0}^{n-1} a_i b_j 10^{i+j}$$
from the same $n^2$ products $a_i b_j$. The product $a_i b_j$ has place value $10^{i+j}$, so in the lattice its units digit lands in band $i+j$ and its tens digit in band $i+j+1$. That is, the diagonal bands are just the columns of long multiplication, tilted. The only real difference is when we carry: long multiplication carries along each row as it goes, while the lattice writes down both digits of every product and carries once, at the end.

\textbf{(c)} Splitting turns one product of $n$-digit numbers into four products of $n/2$-digit numbers, so
$$M(n) = 4M\left(\frac{n}{2}\right), \quad M(1) = 1.$$
Unwinding the recursion,
$$M\left(2^m\right) = 4M\left(2^{m-1}\right) = 4^2 M\left(2^{m-2}\right) = \cdots = 4^m M(1) = 4^m = \left(2^m\right)^2 = n^2.$$
So splitting alone gains us nothing! Carried all the way down to single digits, the blocks are exactly the $n^2$ products $a_i b_j$ from long multiplication, just grouped into quadrants.

\textbf{(d)} Karatsuba's whole improvement is making three recursive calls instead of four, so now
$$M(n) = 3M\left(\frac{n}{2}\right), \quad M(1) = 1,$$
and unwinding as in (c),
$$M\left(2^m\right) = 3^m = \left(2^m\right)^{\log_2 3} = n^{\log_2 3} \approx n^{1.585}.$$
The table below shows where the savings come from (the Divide and conquer and Karatsuba tabs in the app draw the full recursion trees, which I invite you to expand). At depth $k$ every problem has size $\frac{n}{2^k}$; divide and conquer has $4^k$ of them and Karatsuba has $3^k$.
$$\begin{array}{c|c|c}
\text{size} & \text{D\&C} & \text{Karatsuba} \\ \hline
n & 1 & 1 \\
\frac{n}{2} & 4 & 3 \\
\frac{n}{4} & 16 & 9 \\
\vdots & \vdots & \vdots \\
1 & 4^m = n^2 & 3^m = n^{\log_2 3}
\end{array}$$
Saving one product out of four at every level compounds to a factor of $\left(\frac43\right)^m$ at the bottom. For $n = 1024$, Karatsuba uses $3^{10} = 59{,}049$ digit multiplications against $4^{10} = 1{,}048{,}576$.

\begin{remark*}
There is one detail we glossed over: $x_1 + x_0$ can have $n/2 + 1$ digits (in the example, $4 + 7 = 11$). Write $x_1 + x_0 = s 10^{n/2} + x'$ and $y_1 + y_0 = t 10^{n/2} + y'$ with $s, t \in \left\{0,1\right\}$ and $x', y'$ of $n/2$ digits. Then
$$(x_1 + x_0)(y_1 + y_0) = st 10^n + \left(s y' + t x'\right) 10^{n/2} + x' y',$$
and multiplying by $s, t \in \left\{0,1\right\}$ only keeps or discards a number. So the only digit multiplications are in $x' y'$, a product of $n/2$-digit numbers, and the recursion above is exact.
\end{remark*}
</div>

</div>
</details>

</section>
