---
layout: desmos-graph
title: "Modular Multiplication"
desmos_json: "modular_multiplication.json"
desmos_url: "https://www.desmos.com/calculator/bc9877077d"
side_controls: true
---

<div id="mm-store" style="display:none" data-alpha="\alpha"></div>

<div class="mm-stack">

  <span class="mm-section-label">Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(N\) = <strong id="mm-n-val">78</strong></span>
    <input class="site-slider" type="range" min="4" max="150" step="1" value="78"
           data-expr-id="1" data-latex-prefix="N=" data-val-id="mm-n-val" data-decimals="0">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(k\) = <strong id="mm-k-val">2</strong></span>
    <input class="site-slider" type="range" min="2" max="9" step="1" value="2"
           id="mm-k-input"
           data-expr-id="6" data-latex-prefix="k=" data-val-id="mm-k-val" data-decimals="0">
  </div>

  <button class="site-btn mm-action-btn" id="mm-animate-btn">Animate k: 0 → 9</button>

  <hr class="desmos-divider">

  <span class="mm-section-label">Style</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(T\) = <strong id="mm-t-val">2.46</strong></span>
    <input class="site-slider" type="range" min="1" max="5" step="0.01" value="2.46"
           data-expr-id="63" data-latex-prefix="T=" data-val-id="mm-t-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\alpha\) = <strong id="mm-alpha-val">0.38</strong></span>
    <input class="site-slider" type="range" min="0" max="1" step="0.01" value="0.376"
           data-expr-id="19" data-latex-prefix="\alpha=" data-val-id="mm-alpha-val" data-decimals="2">
  </div>

</div>

<style>
  .mm-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mm-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mm-action-btn {
    width: 100%;
    font-size: 0.82rem;
    padding: 0.3rem 0.6rem;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    function initSlider(exprLatex, exprId, displayId) {
      var h = calc.HelperExpression({ latex: exprLatex });
      h.observe('numericValue', function() {
        var val = h.numericValue;
        if (isNaN(val)) { return; }
        var input = document.querySelector('[data-expr-id="' + exprId + '"]');
        var display = document.getElementById(displayId);
        var d = input ? parseInt(input.getAttribute('data-decimals'), 10) : 2;
        var decimals = isNaN(d) ? 2 : d;
        if (input) { input.value = val; }
        if (display) { display.textContent = val.toFixed(decimals); }
        h.unobserve('numericValue');
      });
    }

    var store = document.getElementById('mm-store');

    initSlider('N',                              '1',  'mm-n-val');
    initSlider('k',                              '6',  'mm-k-val');
    initSlider('T',                              '63', 'mm-t-val');
    initSlider(store.getAttribute('data-alpha'), '19', 'mm-alpha-val');

    document.getElementById('mm-animate-btn').addEventListener('click', function() {
      var btn = this;
      var kInput = document.getElementById('mm-k-input');
      var kDisplay = document.getElementById('mm-k-val');
      btn.disabled = true;
      if (kInput) { kInput.disabled = true; }
      var step = 0;
      var totalSteps = 180;
      var interval = setInterval(function() {
        var kVal = step * 0.05;
        calc.setExpression({ id: '6', latex: 'k=' + kVal });
        if (kDisplay) { kDisplay.textContent = Math.floor(kVal); }
        step = step + 1;
        if (step > totalSteps) {
          clearInterval(interval);
          calc.setExpression({ id: '6', latex: 'k=9' });
          if (kDisplay) { kDisplay.textContent = '9'; }
          if (kInput) { kInput.value = 9; kInput.disabled = false; }
          btn.disabled = false;
        }
      }, 75);
    });

    document.querySelectorAll('.mm-stack .site-slider').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseFloat(input.value);
        var d = parseInt(input.getAttribute('data-decimals'), 10);
        var decimals = isNaN(d) ? 2 : d;
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
*Write-up coming soon*