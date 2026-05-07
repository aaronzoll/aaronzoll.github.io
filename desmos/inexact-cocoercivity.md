---
layout: desmos-graph
title: "Inexact Cocoercivity Demo"

desmos_json: "inexact_coco.json"
desmos_url: "https://www.desmos.com/calculator/2rrfzfzuwc"
side_controls: true
---

<div class="ico-stack">

  <span class="ico-section-label">Scaling and smoothing parameters</span>

  <div class="ico-row">
    <div class="desmos-param">
      <span class="desmos-param-label">\(\beta_0\) = <strong id="ico-beta0-val">0.280</strong></span>
      <input class="site-slider" type="range" min="0.001" max="5" step="0.001" value="0.28"
             data-expr-id="18" data-latex-prefix="\beta_{0}=" data-val-id="ico-beta0-val"
             data-decimals="3">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(p_0\) = <strong id="ico-p0-val">0.00</strong></span>
      <input class="site-slider" type="range" min="0" max="1" step="0.01" value="0"
             data-expr-id="19" data-latex-prefix="p_{0}=" data-val-id="ico-p0-val"
             data-decimals="2">
    </div>
  </div>

  <div class="ico-row">
    <div class="desmos-param">
      <span class="desmos-param-label">\(\beta_1\) = <strong id="ico-beta1-val">0.230</strong></span>
      <input class="site-slider" type="range" min="0.001" max="5" step="0.001" value="0.23"
             data-expr-id="20" data-latex-prefix="\beta_{1}=" data-val-id="ico-beta1-val"
             data-decimals="3">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(p_1\) = <strong id="ico-p1-val">0.62</strong></span>
      <input class="site-slider" type="range" min="0" max="1" step="0.01" value="0.62"
             data-expr-id="21" data-latex-prefix="p_{1}=" data-val-id="ico-p1-val"
             data-decimals="2">
    </div>
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\beta_2\) = <strong id="ico-beta2-val">1.000</strong></span>
    <input class="site-slider" type="range" min="0.001" max="5" step="0.001" value="1"
           data-expr-id="28" data-latex-prefix="\beta_{2}=" data-val-id="ico-beta2-val"
           data-decimals="3">
  </div>

  <hr class="desmos-divider">

  <span class="ico-section-label">Tolerance</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\delta\) = <strong id="ico-delta-val">1.115</strong></span>
    <input class="site-slider" type="range" min="0.0001" max="3" step="any" value="1.115"
           data-expr-id="156" data-latex-prefix="d_{elta}=" data-val-id="ico-delta-val"
           data-decimals="3">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .ico-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ico-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ico-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .ico-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .ico-seed-panel {
    width: 220px;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    document.querySelectorAll('.ico-stack .site-slider').forEach(function(input) {
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

    var seedInput = document.getElementById('ico-seed-input');
    if (seedInput) {
      seedInput.addEventListener('input', function() {
        var val = parseFloat(seedInput.value);
        var el = document.getElementById('ico-seed-val');
        if (el) { el.textContent = val.toFixed(3); }
        calc.setExpression({ id: '100', latex: 's_{eed}=' + val });
      });
    }

    var demoBtn = document.getElementById('ico-demo-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', function() {
        var isActive = demoBtn.classList.contains('site-btn--active');
        calc.setExpression({ id: '87', hidden: isActive });
        calc.setExpression({ id: '89', hidden: isActive });
        calc.setExpression({ id: '153', hidden: !isActive });
        calc.setExpression({ id: '162', hidden: !isActive });
        demoBtn.classList.toggle('site-btn--active');
        var wrap = document.getElementById('ico-seed-wrap');
        if (wrap) { wrap.style.display = isActive ? 'none' : 'block'; }
      });
    }

  };
</script>

<!--writeup-->
*Write-up coming soon*

<div class="ico-demo">
  <button class="site-btn" id="ico-demo-btn">Run Full Demo</button>
  <div id="ico-seed-wrap" style="display:none">
    <div class="desmos-param ico-seed-panel">
      <span class="desmos-param-label">seed = <strong id="ico-seed-val">0.000</strong></span>
      <input class="site-slider" id="ico-seed-input" type="range"
             min="0" max="15" step="1" value="0">
    </div>
  </div>
</div>
