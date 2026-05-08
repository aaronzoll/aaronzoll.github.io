---
layout: desmos-graph
title: "L(delta) Inexactly Smooth Construction"
title_math: '\(L(\delta)\)-Inexactly Smooth Construction'

desmos_json: "inexact_construction.json"
desmos_url: "https://www.desmos.com/calculator/kyh8g6t85a"
side_controls: true
---

<div class="ic-stack">

  <span class="ic-section-label">Nonsmooth parameters</span>

  <div class="ic-row">
    <div class="desmos-param">
      <span class="desmos-param-label">\(\beta\) = <strong id="ic-beta-val">1.00</strong></span>
      <input class="site-slider" type="range" min="0" max="5" step="0.01" value="1"
             data-expr-id="5" data-latex-prefix="\beta=" data-val-id="ic-beta-val"
             data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(q\) = <strong id="ic-q-val">1.00</strong></span>
      <input class="site-slider" type="range" min="0" max="1" step="0.01" value="1"
             data-expr-id="4" data-latex-prefix="q=" data-val-id="ic-q-val"
             data-decimals="2">
    </div>
  </div>

  <hr class="desmos-divider">

  <span class="ic-section-label">Smooth parameter</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\beta_1\) = <strong id="ic-beta1-val">0.6</strong></span>
    <input class="site-slider" type="range" min="0" max="3" step="0.1" value="0.6"
           data-expr-id="169" data-latex-prefix="\beta_{1}=" data-val-id="ic-beta1-val"
           data-decimals="1">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .ic-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ic-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ic-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {
    document.querySelectorAll('.ic-stack .site-slider').forEach(function(input) {
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
