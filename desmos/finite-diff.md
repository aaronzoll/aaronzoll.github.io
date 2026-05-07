---
layout: desmos-graph
title: "Finite Difference and Interpolation"

desmos_json: "finite_diff_interp.json"
desmos_url: "https://www.desmos.com/calculator/9qttjfsxve"
side_controls: true
---

<div class="fd-stack">

  <div class="fd-method">
    <button class="site-btn site-btn--active fd-toggle-btn"
            data-folder="7" data-controls="fd1-controls">
      Order-2 Central
    </button>
    <div id="fd1-controls">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_1\) = <strong id="fd-h1-val">0.273</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.273"
               data-expr-id="8" data-latex-prefix="h_{1}=" data-val-id="fd-h1-val"
               data-decimals="3">
      </div>
    </div>
  </div>

  <hr class="desmos-divider">

  <div class="fd-method">
    <button class="site-btn fd-toggle-btn"
            data-folder="13" data-controls="fd2-controls">
      Order-4 Central
    </button>
    <div id="fd2-controls" style="display:none">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_2\) = <strong id="fd-h2-val">0.710</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.71"
               data-expr-id="14" data-latex-prefix="h_{2}=" data-val-id="fd-h2-val"
               data-decimals="3">
      </div>
    </div>
  </div>

  <hr class="desmos-divider">

  <div class="fd-method">
    <button class="site-btn fd-toggle-btn"
            data-folder="41" data-controls="fd3-controls">
      General
    </button>
    <div id="fd3-controls" style="display:none">
      <div class="desmos-param">
        <span class="desmos-param-label">\(h_3\) = <strong id="fd-h3-val">0.680</strong></span>
        <input class="site-slider" type="range" min="0.001" max="2" step="0.001" value="0.68"
               data-expr-id="42" data-latex-prefix="h_{3}=" data-val-id="fd-h3-val"
               data-decimals="3">
      </div>
      <span class="fd-preset-label">Node presets</span>
      <div class="fd-preset-row">
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-1,\ 1,\ 2\right]">
          \(N = [-1,\ 1,\ 2]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-1,\ 0,\ 1\right]">
          \(N = [-1,\ 0,\ 1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-2,\ 0,\ 1,\ 2\right]">
          \(N = [-2,\ 0,\ 1,\ 2]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-3,\ 1\right]">
          \(N = [-3,\ 1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-3,\ -2,\ -1\right]">
          \(N = [-3,\ -2,\ -1]\)
        </button>
        <button class="site-btn fd-preset-btn"
                data-nodes="N_{odes}=\left[-0.25,\ 0.5,\ 1,\ 2\right]">
          \(N = [-0.25,\ 0.5,\ 1,\ 2]\)
        </button>
      </div>
    </div>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .fd-stack {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .fd-method {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .fd-toggle-btn {
    width: 100%;
  }

  .fd-preset-label {
    display: block;
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 0.4rem;
  }

  .fd-preset-row {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .fd-preset-row .site-btn {
    width: 100%;
    min-width: 0;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    document.querySelectorAll('.fd-stack .site-slider').forEach(function(input) {
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

    calc.setExpression({ id: '7',  hidden: false });
    calc.setExpression({ id: '13', hidden: true });
    calc.setExpression({ id: '41', hidden: true });

    document.querySelectorAll('.fd-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        document.querySelectorAll('.fd-toggle-btn').forEach(function(b) {
          calc.setExpression({ id: b.getAttribute('data-folder'), hidden: true });
          b.classList.remove('site-btn--active');
          var c = document.getElementById(b.getAttribute('data-controls'));
          if (c) { c.style.display = 'none'; }
        });
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: false });
        btn.classList.add('site-btn--active');
        var controls = document.getElementById(btn.getAttribute('data-controls'));
        if (controls) { controls.style.display = ''; }
      });
    });

    document.querySelectorAll('.fd-preset-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var latex = btn.getAttribute('data-nodes');
        calc.setExpression({ id: '46', latex: latex });
        document.querySelectorAll('.fd-preset-btn').forEach(function(b) {
          b.classList.remove('site-btn--active');
        });
        btn.classList.add('site-btn--active');
      });
    });

  };
</script>

<!--writeup-->

*Write-up coming soon.*
