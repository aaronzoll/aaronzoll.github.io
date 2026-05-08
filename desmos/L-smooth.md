---
layout: desmos-graph
title: '\(L\)-smooth Functions'

desmos_json: "L_smooth.json"
desmos_url: "https://www.desmos.com/calculator/hrk514df9m"
side_controls: true
---

<div class="ls-stack">

  <button class="site-btn ls-toggle-btn" data-folder="9">
    \(\sqrt{1+x^2}\)
  </button>

  <button class="site-btn site-btn--active ls-toggle-btn" data-folder="13">
    \(\ln(\cosh(x))\)
  </button>

  <button class="site-btn ls-toggle-btn" data-folder="23">
    \(3\!\left(\cos\!\left(\tfrac{x}{4}\right)+\sin(x)\right)\)
  </button>

  <button class="site-btn ls-toggle-btn" id="ls-softmax-btn" data-folder="30">
    \(\text{soft-max}\)
  </button>

  <div id="ls-k-wrap" style="display:none">
    <hr class="desmos-divider">
    <div class="desmos-param">
      <span class="desmos-param-label">\(k\) = <strong id="ls-k-val">1.07</strong></span>
      <input class="site-slider" type="range" min="0.02" max="4" step="0.01" value="1.07"
             data-expr-id="33" data-latex-prefix="k=" data-val-id="ls-k-val"
             data-decimals="2">
    </div>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .ls-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ls-toggle-btn {
    width: 100%;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    calc.setExpression({ id: '9',  hidden: true });
    calc.setExpression({ id: '13', hidden: false });
    calc.setExpression({ id: '23', hidden: true });
    calc.setExpression({ id: '30', hidden: true });
    calc.setExpression({ id: '33', hidden: true });

    var kInput = document.querySelector('#ls-k-wrap .site-slider');
    if (kInput) {
      kInput.addEventListener('input', function() {
        var val = parseFloat(kInput.value);
        var el = document.getElementById('ls-k-val');
        if (el) { el.textContent = val.toFixed(2); }
        calc.setExpression({ id: '33', latex: 'k=' + val });
      });
    }

    document.querySelectorAll('.ls-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        document.querySelectorAll('.ls-toggle-btn').forEach(function(b) {
          calc.setExpression({ id: b.getAttribute('data-folder'), hidden: true });
          b.classList.remove('site-btn--active');
        });
        var kWrap = document.getElementById('ls-k-wrap');
        if (kWrap) { kWrap.style.display = 'none'; }
        calc.setExpression({ id: '33', hidden: true });
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: false });
        btn.classList.add('site-btn--active');
        if (btn.id === 'ls-softmax-btn') {
          if (kWrap) { kWrap.style.display = ''; }
          calc.setExpression({ id: '33', hidden: false });
        }
      });
    });

  };
</script>

<!--writeup-->

*Write-up coming soon.*
