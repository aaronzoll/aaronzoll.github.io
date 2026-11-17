---
layout: widget
title: "The Straw That Broke the Camel's Back"
widget_src: "/widgets/camel-straw_code.html"
widget_height: 1150
widget_height_mobile: 1300
back_url: "/teaching/data-analytics/"
back_label: "Data Analytics Workshop"
---

### The setup

The famous idiom "the straw that broke the camel's back" dates back centuries, but I am curious just how heavy that straw must have been. Suppose we place straws, each weighing anywhere from 0 to 20 pounds (I guess some are pretty heavy). And let's suppose these weights are distributed *uniformly*: each weight is equally likely. If I were to ask what we should expect the final straw to weigh, what would you guess?

The natural first guess is 10 lb. Every straw is equally likely to be anything from 0 to 20, so the average straw weighs 10 lb, and the final straw is just one more straw. Before reading on, I invite you to press **Run 1,000** a few times and look at the two averages. The average of *all* straws does settle near 10, but the average *final* straw settles near 13.3. So something about being the final straw makes a straw heavier!



### Revisualizing our straw

Instead of piling straws on a camel vertically, imagine laying them end to end on a number line, starting at 0. Let's have this number line go well beyond the threshold of 100, as now that will just be an arbitrary point. Let's have each straw cover as much of the number line as it weighs (here we are converting our thinking about total weight to total length). Below are three runs, with the last straw in red. In this new scheme, we are asking, what should we expect the length of the straw *covering the point 100* to be?

<svg class="cs-fig" viewBox="0 0 720 156" role="img" aria-label="Three runs of straws laid end to end on a number line; in each, one straw covers the point 100" style="display:block;width:100%;max-width:720px;margin:1.2em auto;font-family:inherit"><text x="32" y="29" text-anchor="end" font-size="13" fill="#6f777d">run 1</text><rect x="40.0" y="20" width="17.2" height="12" rx="2" fill="#f6b116"/><rect x="58.7" y="20" width="77.9" height="12" rx="2" fill="#e6ad24"/><rect x="138.1" y="20" width="8.9" height="12" rx="2" fill="#f4c450"/><rect x="148.5" y="20" width="56.6" height="12" rx="2" fill="#dd9c1c"/><rect x="206.7" y="20" width="5.5" height="12" rx="2" fill="#f0b43a"/><rect x="213.7" y="20" width="18.9" height="12" rx="2" fill="#e9a10f"/><rect x="234.1" y="20" width="80.9" height="12" rx="2" fill="#f8cd6a"/><rect x="316.5" y="20" width="15.8" height="12" rx="2" fill="#d99308"/><rect x="333.8" y="20" width="51.5" height="12" rx="2" fill="#f6b116"/><rect x="386.8" y="20" width="36.4" height="12" rx="2" fill="#e6ad24"/><rect x="424.6" y="20" width="35.9" height="12" rx="2" fill="#b7312c"/><text x="443.3" y="45" text-anchor="middle" font-size="12" fill="#b7312c">9.1 lb</text><rect x="462.0" y="20" width="39.3" height="12" rx="2" fill="#dd9c1c"/><rect x="502.9" y="20" width="14.4" height="12" rx="2" fill="#f0b43a"/><rect x="518.7" y="20" width="67.0" height="12" rx="2" fill="#e9a10f"/><rect x="587.2" y="20" width="5.9" height="12" rx="2" fill="#f8cd6a"/><rect x="594.6" y="20" width="17.8" height="12" rx="2" fill="#d99308"/><rect x="613.9" y="20" width="0.5" height="12" rx="2" fill="#f6b116"/><rect x="615.6" y="20" width="20.5" height="12" rx="2" fill="#e6ad24"/><rect x="637.6" y="20" width="32.1" height="12" rx="2" fill="#f4c450"/><rect x="671.2" y="20" width="27.3" height="12" rx="2" fill="#dd9c1c"/><text x="32" y="63" text-anchor="end" font-size="13" fill="#6f777d">run 2</text><rect x="40.0" y="54" width="29.8" height="12" rx="2" fill="#f6b116"/><rect x="71.3" y="54" width="7.9" height="12" rx="2" fill="#e6ad24"/><rect x="80.7" y="54" width="19.8" height="12" rx="2" fill="#f4c450"/><rect x="102.0" y="54" width="80.3" height="12" rx="2" fill="#dd9c1c"/><rect x="183.8" y="54" width="3.7" height="12" rx="2" fill="#f0b43a"/><rect x="189.0" y="54" width="49.7" height="12" rx="2" fill="#e9a10f"/><rect x="240.1" y="54" width="29.6" height="12" rx="2" fill="#f8cd6a"/><rect x="271.3" y="54" width="53.0" height="12" rx="2" fill="#d99308"/><rect x="325.8" y="54" width="26.4" height="12" rx="2" fill="#f6b116"/><rect x="353.7" y="54" width="55.5" height="12" rx="2" fill="#e6ad24"/><rect x="410.7" y="54" width="39.6" height="12" rx="2" fill="#f4c450"/><rect x="451.8" y="54" width="52.1" height="12" rx="2" fill="#b7312c"/><text x="478.6" y="79" text-anchor="middle" font-size="12" fill="#b7312c">13.0 lb</text><rect x="505.4" y="54" width="72.9" height="12" rx="2" fill="#f0b43a"/><rect x="579.8" y="54" width="46.5" height="12" rx="2" fill="#e9a10f"/><rect x="627.7" y="54" width="10.2" height="12" rx="2" fill="#f8cd6a"/><rect x="639.5" y="54" width="3.8" height="12" rx="2" fill="#d99308"/><rect x="644.8" y="54" width="53.7" height="12" rx="2" fill="#f6b116"/><text x="32" y="97" text-anchor="end" font-size="13" fill="#6f777d">run 3</text><rect x="40.0" y="88" width="38.8" height="12" rx="2" fill="#f6b116"/><rect x="80.3" y="88" width="14.5" height="12" rx="2" fill="#e6ad24"/><rect x="96.3" y="88" width="76.5" height="12" rx="2" fill="#f4c450"/><rect x="174.4" y="88" width="46.3" height="12" rx="2" fill="#dd9c1c"/><rect x="222.1" y="88" width="58.6" height="12" rx="2" fill="#f0b43a"/><rect x="282.3" y="88" width="71.2" height="12" rx="2" fill="#e9a10f"/><rect x="354.9" y="88" width="22.1" height="12" rx="2" fill="#f8cd6a"/><rect x="378.5" y="88" width="27.9" height="12" rx="2" fill="#d99308"/><rect x="407.9" y="88" width="70.9" height="12" rx="2" fill="#b7312c"/><text x="444.2" y="113" text-anchor="middle" font-size="12" fill="#b7312c">17.6 lb</text><rect x="480.4" y="88" width="9.6" height="12" rx="2" fill="#e6ad24"/><rect x="491.5" y="88" width="61.6" height="12" rx="2" fill="#f4c450"/><rect x="554.6" y="88" width="6.6" height="12" rx="2" fill="#dd9c1c"/><rect x="562.6" y="88" width="55.4" height="12" rx="2" fill="#f0b43a"/><rect x="619.6" y="88" width="56.4" height="12" rx="2" fill="#e9a10f"/><rect x="677.5" y="88" width="21.0" height="12" rx="2" fill="#f8cd6a"/><line x1="40" x2="700" y1="120" y2="120" stroke="#37474f"/><line x1="40.0" x2="40.0" y1="120" y2="125" stroke="#37474f"/><text x="40.0" y="139" text-anchor="middle" font-size="13" fill="#6f777d">0</text><line x1="122.5" x2="122.5" y1="120" y2="125" stroke="#37474f"/><text x="122.5" y="139" text-anchor="middle" font-size="13" fill="#6f777d">20</text><line x1="205.0" x2="205.0" y1="120" y2="125" stroke="#37474f"/><text x="205.0" y="139" text-anchor="middle" font-size="13" fill="#6f777d">40</text><line x1="287.5" x2="287.5" y1="120" y2="125" stroke="#37474f"/><text x="287.5" y="139" text-anchor="middle" font-size="13" fill="#6f777d">60</text><line x1="370.0" x2="370.0" y1="120" y2="125" stroke="#37474f"/><text x="370.0" y="139" text-anchor="middle" font-size="13" fill="#6f777d">80</text><line x1="452.5" x2="452.5" y1="120" y2="125" stroke="#37474f"/><text x="452.5" y="139" text-anchor="middle" font-size="13" fill="#6f777d">100</text><line x1="535.0" x2="535.0" y1="120" y2="125" stroke="#37474f"/><text x="535.0" y="139" text-anchor="middle" font-size="13" fill="#6f777d">120</text><line x1="617.5" x2="617.5" y1="120" y2="125" stroke="#37474f"/><text x="617.5" y="139" text-anchor="middle" font-size="13" fill="#6f777d">140</text><line x1="700.0" x2="700.0" y1="120" y2="125" stroke="#37474f"/><text x="700.0" y="139" text-anchor="middle" font-size="13" fill="#6f777d">160</text><line x1="452.5" x2="452.5" y1="8" y2="120" stroke="#37474f" stroke-width="1.5" stroke-dasharray="5 4"/><text x="370.0" y="154" text-anchor="middle" font-size="13" fill="#6f777d">total weight so far (lb)</text></svg>

To gain even more intuition, note that a straw of length 20 covers twice as much of the number line as a straw of length 10, so it should be twice as likely to land on 100. Similarly, a straw of length 15 should be three times as likely as a straw of length 5, and half as likely as a straw of length 30 (if straws could be that long). That is, the chance that a straw of weight \\(w\\) (in this scheme, length \\(w\\)) covers the point 100, and so is the final straw, is proportional to its length. We call this a linear relationship: the chance for a weight \\(w\\) straw to be the back-breaking one is a constant times that weight, which represents a line through 0.

Consequently, we should expect the histogram of final straws to look linear, especially in the long run. Run a few thousand camels and see for yourself. 

### Calculating the expected value

Since heavy straws are favored, the average final straw should be above 10. Recall that the variance \\(\sigma^2\\) measures how spread out the straw weights are, and let \\(\mu\\) be the average straw weight (over all straws, not just the final one). When the camel can hold many straws, the average final straw works out to be very close to

$$\mu + \frac{\sigma^2}{\mu}.$$

Showing this precisely is out of the scope of the course, but we can still make sense of it. For weights spread evenly from 0 to 20, \\(\mu = 10\\) and \\(\sigma^2 = \frac{100}{3}\\), so the average final straw is about

$$10 + \frac{100/3}{10} = 10 + \frac{10}{3} = \frac{40}{3} \approx 13.33,$$

which matches the simulation. As a sanity check, if every straw weighed exactly 10 lb, there would be no spread (\\(\sigma^2 = 0\\)) and the final straw would weigh 10 lb as well. The more the straw weights spread out (say, sampling from 0 to 40 instead of 0 to 20), the more the long straws get favored, and the further the final straw's average climbs above the average \\(\mu\\).

Nothing here was special about the camel, by the way. The same thing happens whenever we pick a member of a group *because* it covers some point. If we show up at a bus stop at a random time, the gap between buses we land in tends to be longer than the average gap. This is called the *inspection paradox*.



<details class="desmos-calc-drop cs-drop" id="explore">
<summary>Other straws, other camels: change the straw weights and the breaking weight</summary>

<div class="latex-body">
Suppose instead that each straw weighs anywhere from $a$ to $b$ pounds, each weight equally likely. Let's also have the back break once the total goes over $T$ pounds. We can consider the weight of a given straw to be the variable $X$. The weights are spread evenly, so the average straw weight is right in the middle, and
$$\mu = \mathbb{E}(X) = \frac{a+b}{2}, \qquad \sigma^2 = \frac{(b-a)^2}{12},$$
which are known formulas for the expected value and variance of a uniform distribution.

Putting these into the formula we saw earlier, but with different values, the average final straw is about
$$\mathbb{E}(X) + \frac{\sigma^2}{\mathbb{E}(X)} = \frac{a+b}{2} + \frac{(b-a)^2}{6(a+b)}.$$

Here are a few things you can try with the simulator below, one that gives you a bit more freedom to explore. Begin with $a = 0$, so the formula is just $\frac{b}{2} + \frac{b}{6} = \frac{2b}{3}$, two-thirds of the heaviest possible. Then start trying different values. Try values that are far apart or close together. Try having the range go all the way up to the threshold (e.g., $a=0$, $b=100 = T$). In this case, the famous number $e$ makes an appearance (but it isn't clear where, how, or why). There is more on this in the next section, but it is also outside the scope of this course. 

Notice also that $T$ does not appear in the formula above. Really, this is because the formula is an approximation, one that assumes $T$ is much larger than $b$. The number line argument quietly uses this: it needs the point $T$ to be far from 0, where the straws have had time to settle into an even pattern. For the original camel the approximation is very slight, but if you set $T$ close to $b$ (or below it), you can see how far (or not far) the simulation drifts from the prediction.
</div>

<div class="cs-embed"><iframe data-src="/widgets/camel-straw_code.html?explore" title="Camel straw simulator with adjustable weights" style="height:1250px"></iframe></div>

</details>

<details class="desmos-calc-drop cs-drop" id="calculus">
<summary>Further analysis and calculus: the exact answer for any threshold</summary>

<div class="latex-body">
This part goes beyond the course and uses Calculus 1 and 2: integrals, integration by parts, and the Taylor series for $e^x$. It also uses more advanced notions of probability, like densities and expected values of continuous variables. Throughout, take $a = 0$, so each straw weighs anywhere from 0 to $b$, and recall the back breaks once the total goes over some threshold $T$.

This problem doesn't depend on the units we measure in (if we measured in kg instead of lb, the numbers would change, but the proportions wouldn't), so measure every weight in units of $b$. That is, divide everything by $b$: each straw is then uniform from 0 to 1, and the back breaks once the total goes over
$r = \frac{T}{b}$. So the average final straw in the original setting is just $b \cdot m(r)$, where $m(r)$ is the average final straw for straws from 0 to 1 and threshold $r$. This is the new problem we will look at.

We will also see that the answer $\frac{2}{3}b$ from before is really the limit $m(r) \to \frac{2}{3}$ as $r \to \infty$. It is only exact in the limit, and how close we are depends on $r$, not on $T$ or $b$ separately. The main simulator has $r = 100/20 = 5$, which happens to actually be sufficiently large to get $m(r)$ really close to $\frac{2}{3}$.

In order to find $m(r)$ exactly, we track the weight on the camel's back as it grows. After each straw we record the \textbf{running total}, the total weight on the back so far: 0 before any straws, then the first straw's weight, then the first two together, and so on. On the number line, these are exactly the points where one straw ends and the next begins. The question we ask is: how many of these running totals should we expect to be at most a given weight $s$?

\begin{definition}
Let $S_0 = 0$ and let $S_n$ be the running total after $n$ straws, the total weight of the first $n$ straws. The \textbf{renewal function} is
$$U(s) = \sum_{n \ge 0} \mathbb{P}(S_n \le s),$$
the expected number of running totals $S_0, S_1, S_2, \ldots$ that are at most $s$. We set $U(s) = 0$ for $s < 0$.
\end{definition}

Note that $s$ is a weight, but $U(s)$ is a count: it is the number of running totals at most $s$, not their weight. The sum works because an expected count is the sum of the chances that each item is counted: the running total $S_n$ adds 1 to the count with probability $\mathbb{P}(S_n \le s)$. Note also that whenever the running total is at most $r$, the back is still holding, so one more straw gets placed. Hence $U(r)$ is also the expected number of straws on the camel when its back breaks.

\begin{proposition}\label{prop:final}
The final straw has density $g_r(x) = U(r) - U(r-x)$ for $0 \le x \le 1$, so
$$m(r) = \int_0^1 x\left[U(r) - U(r-x)\right] dx.$$
\end{proposition}

\begin{proof}
We find the CDF $G_r(x) = \mathbb{P}(\text{final straw} \le x)$ and then differentiate. Straw $n+1$ is the final straw and weighs at most $x$ exactly when the back is still holding before it, it pushes the running total over $r$, and its weight $y$ is at most $x$. For a given weight $y$, the first two conditions say the running total before it is in the window $r - y < S_n \le r$. The new straw is uniform from 0 to 1 and doesn't depend on the straws already placed, so averaging over its weight $y$,
$$\mathbb{P}(\text{straw } n+1 \text{ is final and weighs at most } x) = \int_0^x \mathbb{P}(r - y < S_n \le r)\, dy.$$
Only one straw can be the final one, so the chance that the final straw (whichever $n+1$ it is) weighs at most $x$ is the sum of these chances over all $n$. Swapping the sum and the integral,
$$G_r(x) = \int_0^x \sum_{n \ge 0} \mathbb{P}(r - y < S_n \le r)\, dy = \int_0^x \left[U(r) - U(r - y)\right] dy.$$
By the Fundamental Theorem of Calculus, the density is $g_r(x) = G_r'(x) = U(r) - U(r - x)$, and then $m(r) = \int_0^1 x\, g_r(x)\, dx$. (For straws that are not uniform, the density $f(y)$ of a single straw would multiply the integrand, and stay in $g_r$.)
\end{proof}

We continue by considering two cases: one where we get a nice closed form, and one where the answer remains a finite sum.

\textbf{Small thresholds, $r \le 1$.} Here the threshold is at most the heaviest straw, which turns out to be enough to give us a closed form solution. 

\begin{lemma}\label{lem:exp}
For $0 \le s \le 1$, $U(s) = e^s$.
\end{lemma}

\begin{proof}
For $s \le 1$, the chance that $n$ straws total at most $s$ is the volume $V_n(s)$ of the region where $x_1, \ldots, x_n \ge 0$ and $x_1 + \cdots + x_n \le s$ (no straw can go over 1 here). We have $V_0 = 1$, and by induction
$$V_n(s) = \int_0^s V_{n-1}(s - x)\, dx = \int_0^s \frac{(s-x)^{n-1}}{(n-1)!}\, dx = \frac{s^n}{n!}.$$
Summing the series, $U(s) = \sum_{n \ge 0} \frac{s^n}{n!} = e^s$.
\end{proof}

So on average it takes $U(1) = e$ straws from 0 to 1 to push the running total over 1, which is already a pretty cool fact: on average, it takes $e$ numbers drawn uniformly from $0$ to $1$ for their sum to exceed $1$.

\begin{corollary}\label{cor:small}
For $0 \le r \le 1$, $m(r) = 1 + r - \frac{e^r}{2}$.
\end{corollary}

\begin{proof}
By the lemma, $U(r - x) = e^{r-x}$ when $x \le r$ and $0$ when $x > r$, so the integral in the proposition above gives
$$m(r) = \int_0^1 x e^r\, dx - \int_0^r x e^{r-x}\, dx = \frac{e^r}{2} - \left(e^r - 1 - r\right) = 1 + r - \frac{e^r}{2}.$$
\end{proof}

We immediately get a few more facts from this corollary. 

\begin{itemize}
\item As $r \to 0$, $m(r) \to \frac{1}{2}$. The first straw always breaks the back, so the expected weight is just the average straw weight.
\item Since $m'(r) = 1 - \frac{e^r}{2}$, the largest value is at $r = \ln 2$, where $m(\ln 2) = \ln 2 \approx 0.693$. That is \textit{above} $\frac{2}{3}$.
\item At $r = 1$, meaning $b = T$, we get $m(1) = 2 - \frac{e}{2} \approx 0.6409$, \textit{below} $\frac{2}{3}$. The density there is $e\left(1 - e^{-x}\right)$, which bends a bit instead of being a line. Try $a = 0$ and $b = T = 100$ in the simulator above: the final straw averages about 64.1 lb, not 66.7.
\end{itemize}

\textbf{Larger thresholds.} Once $s > 1$, the condition that no straw weighs more than 1 starts to matter. Counting the regions where some straws go over 1 and correcting with inclusion and exclusion gives
$$\mathbb{P}(S_n \le s) = \frac{1}{n!}\sum_{k=0}^{\lfloor s \rfloor} (-1)^k \binom{n}{k} (s-k)^n,
\qquad\text{and summing over } n, \qquad
U(s) = \sum_{k=0}^{\lfloor s \rfloor} \frac{(k - s)^k \, e^{s-k}}{k!}.$$
For $s \le 1$ only the $k = 0$ term is left, which is $e^s$ again. Thus, the formula of \Cref{cor:small} still applies, and can be viewed as a corollary of the theorem below.

The proof of that theorem rests on an equation that $U$ satisfies with itself.

\begin{lemma}[renewal equation]\label{lem:renewal}
For every $s \ge 0$,
$$U(s) = 1 + \int_{s-1}^{s} U(y)\, dy.$$
\end{lemma}

\begin{proof}
The idea is to write $U$ in terms of itself, like a recurrence. Notably, splitting off the first straw leaves a smaller copy of the same counting problem. Let $N(s)$ be the number of running totals $S_0, S_1, S_2, \ldots$ that are at most $s$, so that $U(s) = \mathbb{E}(N(s))$. Recall that $S_0 = 0$ always counts, which add 1 to the equation. Every later running total includes the first straw $X_1$:
$$S_n = X_1 + \underbrace{(X_2 + \cdots + X_n)}_{S'_{n-1}},$$
where $S'_0 = 0, S'_1, S'_2, \ldots$ are the running totals of the pile that starts after the first straw. So $S_n \le s$ exactly when $S'_{n-1} \le s - X_1$, and therefore
$$N(s) = 1 + N'(s - X_1),$$
where $N'$ counts the running totals of that second pile (everything after straw 1) in the same way. Given $X_1 = x$, the expected value of $N'(s - x)$ is then $U(s - x)$ (because it has the same distrubtion as $N$, it is counting the same thing). Finally, if $x > s$, no later running total is at most $s$, and indeed $U(s - x) = 0$.
<br><br>
Now we apply conditional expectation: the expected value of $N'(s - X_1)$ is the average of $U(s - x)$ over the possible first straws $x$. The first straw is uniform from 0 to 1, so substituting $y = s - x$,
$$U(s) = 1 + \int_0^1 U(s - x)\, dx = 1 + \int_{s-1}^{s} U(y)\, dy.$$
\end{proof}

\begin{example*}
Take straws weighing $0.3, 0.4, 0.2, 0.6$ and $s = 1$. The running totals are $0, 0.3, 0.7, 0.9, 1.5$, and four of them are at most 1, so $N(1) = 4$. The second pile has running totals $0, 0.4, 0.6, 1.2$, and three of them are at most $1 - 0.3 = 0.7$. Indeed, $N(1) = 1 + 3$.
\end{example*}

\begin{theorem}\label{thm:closed}
For every $r \ge 0$, $m(r) = 1 + r - \frac{U(r)}{2}$.
\end{theorem}

\begin{proof}
Let $W(s) = \int_0^s U(y)\, dy$, so that $W' = U$. Since $U$ is 0 for negative inputs, $W(s) = 0$ for $s \le 0$ as well. Recall from the above proposition,

$$m(r) = \int_0^1 x\left[U(r) - U(r-x)\right] dx = U(r)\int_0^1 x\, dx - \int_0^1 x\, U(r - x)\, dx = \frac{U(r)}{2} - I,$$

where $I = \int_0^1 x\, U(r-x)\, dx$. So it is enough to show $I = U(r) - 1 - r$. To do so, we start by integrating by parts with $u = x$ and $dv = U(r - x)\, dx$. Therefore, $du = dx$ and $v = -W(r - x)$ (check: $\frac{d}{dx}\left[-W(r-x)\right] = U(r-x)$ by the chain rule). Then
$$I = \Big[-x\, W(r - x)\Big]_0^1 + \int_0^1 W(r - x)\, dx = -W(r-1) + \int_{r-1}^{r} W(y)\, dy,$$
substituting $y = r - x$ in the last integral.

In terms of $W$, the renewal equation (the lemma above) says $U(s) = 1 + W(s) - W(s - 1)$. Integrating both sides from 0 to $r$, the left side gives $W(r)$, so
$$W(r) = r + \int_0^r W(s)\, ds - \int_0^r W(s - 1)\, ds.$$
In the last integral, substitute $u = s - 1$, then split at 0, using that $W = 0$ for negative inputs:
$$\int_0^r W(s - 1)\, ds = \int_{-1}^{r-1} W(u)\, du = \underbrace{\int_{-1}^{0} W(u)\, du}_{=\,0} + \int_0^{r-1} W(u)\, du = \int_0^{r-1} W(u)\, du.$$
Putting this back in,
$$W(r) = r + \int_0^r W(s)\, ds - \int_0^{r-1} W(s)\, ds = r + \int_{r-1}^{r} W(s)\, ds,$$
so $\int_{r-1}^{r} W(y)\, dy = W(r) - r$. Using this in our expression for $I$, and then the renewal equation once more in the form $W(r) - W(r-1) = U(r) - 1$,
$$I = -W(r - 1) + W(r) - r = \left(U(r) - 1\right) - r.$$
Therefore $m(r) = \frac{U(r)}{2} - \left(U(r) - 1 - r\right) = 1 + r - \frac{U(r)}{2}$.

\end{proof}

We may also ask ourselves how big does $r$ need to be for $m(r)$ to be close to the idealized $\frac{2}{3}$. And how close is it anyway? Writing $U(r) = 2r + \frac{2}{3} + \varepsilon(r)$, \Cref{thm:closed} gives $m(r) = \frac{2}{3} - \frac{\varepsilon(r)}{2}$. The error $\varepsilon(r)$ shrinks like $e^{-2.089 r}$ (which will not be shown as this relies on some knowledge of differential equations and Euler's formula), but what this means is that are $r$ grows, the error shrink at around the rate $e^{-2r}$. Here are some exact numerics.

$$\begin{array}{c|c|c}
r = T/b & m(r) & m(r) - \tfrac{2}{3} \\ \hline
0.5 & 0.675639 & +9.0 \times 10^{-3} \\
1 & 0.640859 & -2.6 \times 10^{-2} \\
2 & 0.664613 & -2.1 \times 10^{-3} \\
3 & 0.666717 & +5.1 \times 10^{-5} \\
5 & 0.666669 & +2.3 \times 10^{-6} \\
10 & 0.666667 & +9.2 \times 10^{-11}
\end{array}$$
For the original camel, $r = 5$, and the exact answer is $20\, m(5) = 13.33338\ldots$, only about $0.00005$ above $\frac{40}{3}$. At this threshold the histogram is already indistinguishable from the straight line. 

On more result: The final straw plus the total weight that broke the back averages exactly the threshold plus the heaviest possible straw.

\begin{corollary}
$\mathbb{E}(\text{final straw}) + \mathbb{E}(\text{total weight when the back breaks}) = T + b.$
\end{corollary}

\begin{proof}
The expected total weight when the back breaks is the average straw times the expected number of straws, $\frac{b}{2}\, U(r)$. By the theorem above, $b\, m(r) = b + T - \frac{b}{2} U(r)$, and adding the two gives $T + b$.
\end{proof}


</div>

</details>

<style>
  .cs-drop { margin: 1.2rem 0; }
  .cs-drop > .latex-body { margin-bottom: 1rem; }
  .cs-embed { border: 2px solid var(--color-wood); outline: 4px ridge var(--color-wood-deep); margin: 4px 4px 1rem; }
  .cs-embed iframe { display: block; width: 100%; border: none; transition: height 0.15s; }
</style>

<script>
  // the explore simulator loads when its dropdown is first opened, then sizes itself from the height it reports
  (function () {
    var drop = document.getElementById('explore'), frame = drop && drop.querySelector('iframe');
    if (!frame) return;
    drop.addEventListener('toggle', function () { if (drop.open && !frame.getAttribute('src')) frame.src = frame.getAttribute('data-src'); });
    window.addEventListener('message', function (e) {
      var h = e.data && e.data.embedHeight;
      if (e.source === frame.contentWindow && typeof h === 'number' && h > 100 && h < 20000) frame.style.height = h + 'px';
    });
  })();
</script>
