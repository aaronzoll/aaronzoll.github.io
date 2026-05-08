---
layout: desmos-graph
title: "mu-Strongly Convex Functions"
title_math: '\(\mu\)-Strongly Convex Functions'

desmos_json: "strongly_convex.json"
desmos_url: "https://www.desmos.com/calculator/ruomgzw6r9"
side_controls: true
---

<div class="sc-stack">

  <button class="site-btn sc-toggle-btn" data-folder="2">
    \(-\ln(x)+x^2\)
  </button>

  <button class="site-btn sc-toggle-btn" data-folder="27">
    \(\tfrac{1}{2}(\lvert x\rvert+x^2+\sqrt{1+x^2})\)
  </button>

  <button class="site-btn site-btn--active sc-toggle-btn" data-folder="33">
    \(\cos(x)+\tfrac{2}{3}x^2\)
  </button>

  <button class="site-btn sc-toggle-btn" id="sc-max-btn" data-folder="6">
    \(\max + k\|\cdot\|^2\)
  </button>

  <div id="sc-k-wrap" style="display:none">
    <hr class="desmos-divider">
    <div class="desmos-param">
      <span class="desmos-param-label">\(k\) = <strong id="sc-k-val">0.24</strong></span>
      <input class="site-slider" type="range" min="0" max="4" step="0.01" value="0.24"
             data-expr-id="25" data-latex-prefix="k=" data-val-id="sc-k-val"
             data-decimals="2">
    </div>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .sc-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sc-toggle-btn {
    width: 100%;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    calc.setExpression({ id: '2',  hidden: true });
    calc.setExpression({ id: '27', hidden: true });
    calc.setExpression({ id: '33', hidden: false });
    calc.setExpression({ id: '6',  hidden: true });
    calc.setExpression({ id: '25', hidden: true });

    var kInput = document.querySelector('#sc-k-wrap .site-slider');
    if (kInput) {
      kInput.addEventListener('input', function() {
        var val = parseFloat(kInput.value);
        var el = document.getElementById('sc-k-val');
        if (el) { el.textContent = val.toFixed(2); }
        calc.setExpression({ id: '25', latex: 'k=' + val });
      });
    }

    document.querySelectorAll('.sc-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        document.querySelectorAll('.sc-toggle-btn').forEach(function(b) {
          calc.setExpression({ id: b.getAttribute('data-folder'), hidden: true });
          b.classList.remove('site-btn--active');
        });
        var kWrap = document.getElementById('sc-k-wrap');
        if (kWrap) { kWrap.style.display = 'none'; }
        calc.setExpression({ id: '25', hidden: true });
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: false });
        btn.classList.add('site-btn--active');
        if (btn.id === 'sc-max-btn') {
          if (kWrap) { kWrap.style.display = ''; }
          calc.setExpression({ id: '25', hidden: false });
        }
      });
    });

  };
</script>

<!--writeup-->

*Write-up coming soon.*
