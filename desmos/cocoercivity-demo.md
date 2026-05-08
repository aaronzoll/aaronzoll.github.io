---
layout: desmos-graph
title: "Visualizing Cocoercivity"

desmos_json: "cocoercivity.json"
desmos_url: "https://www.desmos.com/calculator/ahe9rjacu0"
side_controls: true
---

<div class="coco-stack">

  <span class="coco-section-label">Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(L\) = <strong id="coco-L-val">1.92</strong></span>
    <input class="site-slider" type="range" min="0.5" max="5" step="0.01" value="1.92"
           data-expr-id="2" data-latex-prefix="L=" data-val-id="coco-L-val"
           data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(k\) = <strong id="coco-k-val">0.833</strong></span>
    <input class="site-slider" type="range" min="0" max="1" step="0.01" value="0.833"
           data-expr-id="28" data-latex-prefix="k=" data-val-id="coco-k-val"
           data-decimals="3">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .coco-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .coco-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {
    document.querySelectorAll('.coco-stack .site-slider').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseFloat(input.value);
        var d = parseInt(input.getAttribute('data-decimals'), 10);
        var decimals = isNaN(d) ? 3 : d;
        var exprId = input.getAttribute('data-expr-id');
        var prefix = input.getAttribute('data-latex-prefix');
        var valId = input.getAttribute('data-val-id');
        var el = document.getElementById(valId);
        if (el) { el.textContent = val.toFixed(decimals); }
        calc.setExpression({ id: exprId, latex: prefix + val });
      });
    });
  };
</script>

<!--writeup-->

The **cocoercive bound** is arguably the most useful inequality in smooth, convex optimization. Unlike the quadratic upper bound alone, which gives a clean visual picture of \\(L\\)-smoothness, cocoercivity provides a *necessary and sufficient* condition for a function to be both smooth and convex. Below we derive it geometrically in the 1-dimensional setting, but this can easily be generalized to any dimension using the gradient instead of the derivative and inner products instead of multiplication. 

For a convex, \\(L\\)-smooth function \\(f\\), two key bounds hold simultaneously. From smoothness, the **quadratic upper bound** (in orange) for any \\(y\\) and \\(z\\) has

<div>
\[f(z) \;\leq\; f(y) + f'(y)(z-y) + \frac{L}{2}(z-y)^2\]
</div>

which we write as 
<div>
\[q(z,\, y) \;=\;  f(y) + f'(y)(z-y) + \frac{L}{2}(z-y)^2 - f(z) \;\geq\; 0.\]
</div>
This represents the distance from the upper bounding quadratic (at \\(y\\)) to the function itself (at \\(z\\)). 


From convexity, the **linear lower bound** (in blue) has for any \\(z\\) and \\(x\\)
<div>
\[f(z) \;\geq\; f(x) + f'(x)(z-x),\]
</div>
which we write as
<div>
\[l(z,\, x) \;=\; f(z) - f(x) - f'(x)(z - x) \;\geq\; 0.\]
</div>

Adding these two inequalities, the gap for fixed \\(x\\) and \\(y\\) from the linear lower bound to the quadratic upper bound

<div>
\[d_{x,y}(z) \;=\; q(z,\, y) + l(z,\, x) \;\geq\; 0\]
</div>

is nonnegative everywhere. Minimizing \\(d_{x,y}\\) over \\(z\\) by setting \\(d_{x,y}'(z) = 0\\) yields the minimizer \\(z^\star \;=\; y - \frac{1}{L}\bigl(f'(y) - f'(x)\bigr)\\).  Evaluating \\(d(z^\star) \geq 0\\) and simplifying gives the **cocoercive bound**:

<div>
\[c_{\mathrm{oco}}(y,\,x) \;:=\; f(y) - f(x) - f'(x)(y-x) - \frac{1}{2L}\bigl(f'(y)-f'(x)\bigr)^2 \;\geq\; 0.\]
</div>
In the above graph this minimimum distance between the quadratic and linear bounds is highlighted in green. Finally, since \\(x\\) and \\(y\\) were chosen arbitrarily, we can this as 
<div>
\[f(y) \geq f(x) + f'(x)(y-x) + \frac{1}{2L}(f'(x)-f'(y))^2, \quad \forall \, x,y.\]
</div>
