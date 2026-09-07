---
layout: desmos-graph
title: "Linear Combinations"
desmos_json: "linear_combinations.json"
side_controls: true
---

<div class="lc-panel">

  <span class="lc-label">Coefficients</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(c_1\) = <strong id="lc-c1-val">2.00</strong></span>
    <input class="site-slider lc-slider" type="range" min="-3" max="3" step="0.25" value="2"
           data-expr-id="152" data-latex-prefix="c_{1}=" data-val-id="lc-c1-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(c_2\) = <strong id="lc-c2-val">1.00</strong></span>
    <input class="site-slider lc-slider" type="range" min="-3" max="3" step="0.25" value="1"
           data-expr-id="153" data-latex-prefix="c_{2}=" data-val-id="lc-c2-val" data-decimals="2">
  </div>

  <hr class="desmos-divider">

  <button class="site-btn" id="lc-reset-btn">Reset</button>

</div>

<style>
  .lc-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lc-panel .site-btn {
    width: 100%;
  }

  .lc-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from linear_combinations.json ────────────────────────
    var ID = { A11: '126', A12: '127', A21: '129', A22: '130' };

    document.querySelectorAll('.lc-slider').forEach(function (input) {
      input.addEventListener('input', function () {
        var val = parseFloat(input.value);
        var decimals = parseInt(input.getAttribute('data-decimals'), 10) || 2;
        var exprId = input.getAttribute('data-expr-id');
        var prefix = input.getAttribute('data-latex-prefix');
        var valEl = document.getElementById(input.getAttribute('data-val-id'));
        if (valEl) { valEl.textContent = val.toFixed(decimals); }
        calc.setExpression({ id: exprId, latex: prefix + val });
      });
    });

    // v_1 = (A_11, A_21), v_2 = (A_12, A_22)
    document.getElementById('lc-reset-btn').addEventListener('click', function () {
      calc.setExpression({ id: ID.A11, latex: 'A_{11}=-4' });
      calc.setExpression({ id: ID.A21, latex: 'A_{21}=4' });
      calc.setExpression({ id: ID.A12, latex: 'A_{12}=1' });
      calc.setExpression({ id: ID.A22, latex: 'A_{22}=4' });
    });

  };
</script>

<!--writeup-->
