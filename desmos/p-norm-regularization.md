---
layout: desmos-graph
title: "p-norm Regularization"

desmos_json: "p_norm_regularization.json"
desmos_url: "https://www.desmos.com/calculator/i0wwf8vn6f"
side_controls: true
---

<div class="pnr-stack">

  <span class="pnr-section-label">Constraint set</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(p\) = <strong id="pnr-p-val">1.355</strong></span>
    <input class="site-slider" type="range" min="1" max="6" step="0.005" value="1.355"
           data-expr-id="19" data-latex-prefix="p=" data-val-id="pnr-p-val"
           data-decimals="3">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(R\) = <strong id="pnr-c-val">2.25</strong></span>
    <input class="site-slider" type="range" min="0" max="3" step="0.05" value="2.25"
           data-expr-id="20" data-latex-prefix="C=" data-val-id="pnr-c-val"
           data-decimals="2">
  </div>

  <hr class="desmos-divider">

  <span class="pnr-section-label">Ellipse Parameters</span>

  <div class="pnr-row">
    <div class="desmos-param">
      <span class="desmos-param-label">\(a\) = <strong id="pnr-a-val">0.440</strong></span>
      <input class="site-slider" type="range" min="-1" max="3" step="0.001" value="0.44"
             data-expr-id="30" data-latex-prefix="a=" data-val-id="pnr-a-val"
             data-decimals="3">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(b\) = <strong id="pnr-b-val">0.723</strong></span>
      <input class="site-slider" type="range" min="-1" max="3" step="0.001" value="0.723"
             data-expr-id="32" data-latex-prefix="b=" data-val-id="pnr-b-val"
             data-decimals="3">
    </div>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .pnr-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .pnr-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .pnr-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {
    document.querySelectorAll('.pnr-stack .site-slider').forEach(function(input) {
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
*Write-up coming soon.*

We aim to solve the following problem 
<div>
\[p_\star = \begin{cases} \min & \dfrac{a}{2}(x-x_0)^2+\dfrac{b}{2}(y-y_0)^2\\[6pt] \mathrm{s.t.} & \lvert x\rvert^p+\lvert y\rvert^p \leq C^p \end{cases}.\]
</div>

The optimal solution always lies on the boundary \\(\lvert x\rvert^p+\lvert y\rvert^p = C^p\\) whenever the unconstrained minimizer \\((x_0, y_0)\\) lies outside the feasible set. The shape of the constraint set changes significantly with \\(p\\): as \\(p\to 1\\) the ball becomes a diamond and solutions tend to concentrate on corners, while as \\(p\to\infty\\) it becomes a square aligned with the axes. The curvatures \\(a\\) and \\(b\\) control the eccentricity of the objective's level ellipses, which in turn determines where on the boundary the optimum falls.
