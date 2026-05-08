---
layout: desmos-graph
title: "L(delta) Inexactly Smooth Interpolation"
title_math: '\(L(\delta)\)-Inexactly Smooth Interpolation'

desmos_json: "L_delta_interpolation.json"
desmos_url: "https://www.desmos.com/calculator/GRAPH_ID"
side_controls: true
---

<div class="ild-stack">

  <span class="ild-section-label">Nonsmooth parameters</span>

  <div class="ild-row">
    <div class="desmos-param">
      <span class="desmos-param-label">\(\beta\) = <strong id="ild-beta-val">1.60</strong></span>
      <input class="site-slider" type="range" min="0" max="5" step="0.01" value="1.6"
             data-expr-id="2" data-latex-prefix="\beta=" data-val-id="ild-beta-val"
             data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(q\) = <strong id="ild-q-val">0.38</strong></span>
      <input class="site-slider" type="range" min="0" max="1" step="0.01" value="0.38"
             data-expr-id="29" data-latex-prefix="q=" data-val-id="ild-q-val"
             data-decimals="2">
    </div>
  </div>

  <hr class="desmos-divider">

  <span class="ild-section-label">Smooth parameter</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\beta_1\) = <strong id="ild-beta1-val">1.0</strong></span>
    <input class="site-slider" type="range" min="0" max="4" step="0.1" value="1"
           data-expr-id="86" data-latex-prefix="\beta_{1}=" data-val-id="ild-beta1-val"
           data-decimals="1">
  </div>

  <hr class="desmos-divider">

  <span class="ild-section-label">Observed gradients</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_1\) = <strong id="ild-g1-val">-1.0</strong></span>
    <input class="site-slider" type="range" min="-5" max="5" step="0.1" value="-1"
           data-expr-id="220" data-latex-prefix="g_{1}=" data-val-id="ild-g1-val"
           data-decimals="1">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_2\) = <strong id="ild-g2-val">0.0</strong></span>
    <input class="site-slider" type="range" min="-5" max="5" step="0.1" value="0"
           data-expr-id="221" data-latex-prefix="g_{2}=" data-val-id="ild-g2-val"
           data-decimals="1">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_3\) = <strong id="ild-g3-val">1.0</strong></span>
    <input class="site-slider" type="range" min="-5" max="5" step="0.1" value="1"
           data-expr-id="222" data-latex-prefix="g_{3}=" data-val-id="ild-g3-val"
           data-decimals="1">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .ild-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ild-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .ild-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .coco-wrap {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  .coco-table {
    display: table;
    width: fit-content;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .coco-table th, .coco-table td {
    border: 1px solid #d0d7de;
    padding: 0.4rem 0.9rem;
    text-align: center;
  }

  .coco-table th {
    background: #f4f6f8;
  }

  .coco-ok   { color: #2e7d32; font-weight: bold; }
  .coco-fail { color: #c62828; font-weight: bold; }
</style>

<script>
  window.onDesmosReady = function(calc) {
    document.querySelectorAll('.ild-stack .site-slider').forEach(function(input) {
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

    var pairs = [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
    pairs.forEach(function(pair) {
      var i = pair[0], j = pair[1];
      var latex = 'f_{' + i + '}-f_{' + j + '}-g_{' + j +
                  '}\\left(x_{' + i + '}-x_{' + j +
                  '}\\right)-t_{star}\\left(g_{' + i + '}-g_{' + j + '}\\right)';
      var helper = calc.HelperExpression({ latex: latex });
      var cellId = 'coco-' + i + '-' + j;
      helper.observe('numericValue', (function(cid, h) {
        return function() {
          var el = document.getElementById(cid);
          if (!el) { return; }
          var v = h.numericValue;
          if (isNaN(v)) {
            el.textContent = '—';
            el.className = '';
          } else {
            el.textContent = v.toFixed(3);
            el.className = v >= -0.001 ? 'coco-ok' : 'coco-fail';
          }
        };
      })(cellId, helper));
    });
  };
</script>

<!--writeup-->

<p>Each cell shows \(f_i - f_j - g_j(x_i - x_j) - \theta^*(g_i - g_j)\). All values must be \(\geq 0\) for the data to be \(L(\delta)\)-inexactly smooth interpolable.</p>

<div class="coco-wrap">
<table class="coco-table">
  <thead>
    <tr>
      <th></th>
      <th>\\(\boldsymbol{j=1}\\)</th>
      <th>\\(\boldsymbol{j=2}\\)</th>
      <th>\\(\boldsymbol{j=3}\\)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>\\(\boldsymbol{i=1}\\)</th>
      <td id="coco-1-1">—</td>
      <td id="coco-1-2">—</td>
      <td id="coco-1-3">—</td>
    </tr>
    <tr>
      <th>\\(\boldsymbol{i=2}\\)</th>
      <td id="coco-2-1">—</td>
      <td id="coco-2-2">—</td>
      <td id="coco-2-3">—</td>
    </tr>
    <tr>
      <th>\\(\boldsymbol{i=3}\\)</th>
      <td id="coco-3-1">—</td>
      <td id="coco-3-2">—</td>
      <td id="coco-3-3">—</td>
    </tr>
  </tbody>
</table>
</div>
