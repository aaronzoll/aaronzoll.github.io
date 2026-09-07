---
layout: desmos-graph
title: "Parallelogram Law"
desmos_json: "parallelogram_law.json"
graph_3d: true
side_controls: true
---

<div class="pl2-panel">

  <span class="pl2-label" style="color:#c74440;">Vector u</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(u_1\) = <strong id="pl2-u1-val">3.20</strong></span>
    <input class="site-slider pl2-slider pl2-slider--u" type="range" min="-5" max="5" step="0.01" value="3.2"
           data-expr-id="4" data-latex-prefix="u_{1}=" data-val-id="pl2-u1-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(u_2\) = <strong id="pl2-u2-val">0.40</strong></span>
    <input class="site-slider pl2-slider pl2-slider--u" type="range" min="-5" max="5" step="0.01" value="0.4"
           data-expr-id="5" data-latex-prefix="u_{2}=" data-val-id="pl2-u2-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(u_3\) = <strong id="pl2-u3-val">0.00</strong></span>
    <input class="site-slider pl2-slider pl2-slider--u" type="range" min="-5" max="5" step="0.01" value="0"
           data-expr-id="7" data-latex-prefix="u_{3}=" data-val-id="pl2-u3-val" data-decimals="2">
  </div>

  <hr class="desmos-divider">

  <span class="pl2-label" style="color:#2d70b3;">Vector v</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(v_1\) = <strong id="pl2-v1-val">0.70</strong></span>
    <input class="site-slider pl2-slider pl2-slider--v" type="range" min="-5" max="5" step="0.01" value="0.7"
           data-expr-id="9" data-latex-prefix="v_{1}=" data-val-id="pl2-v1-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(v_2\) = <strong id="pl2-v2-val">1.66</strong></span>
    <input class="site-slider pl2-slider pl2-slider--v" type="range" min="-5" max="5" step="0.01" value="1.66"
           data-expr-id="10" data-latex-prefix="v_{2}=" data-val-id="pl2-v2-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(v_3\) = <strong id="pl2-v3-val">0.00</strong></span>
    <input class="site-slider pl2-slider pl2-slider--v" type="range" min="-5" max="5" step="0.01" value="0"
           data-expr-id="11" data-latex-prefix="v_{3}=" data-val-id="pl2-v3-val" data-decimals="2">
  </div>

</div>

<style>
  .pl2-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pl2-label {
    font-weight: bold;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Desmos' own standard palette reds/blues, matching u/v in the graph itself */
  .pl2-panel .pl2-slider--u { accent-color: #c74440; }
  .pl2-panel .pl2-slider--v { accent-color: #2d70b3; }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from parallelogram_law.json ──────────────────────────
    // u = (u_1, u_2, u_3) [red], v = (v_1, v_2, v_3) [blue]
    document.querySelectorAll('.pl2-slider').forEach(function (input) {
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

  };
</script>

<!--writeup-->

<div class="latex-body">
Rotate the graph and you can watch the parallelogram with sides constructed by $u$ and $v$ take shape in three dimensions, with the sum $w = u + v$ drawing the diagonal (and $u-v$ drawing the other one). This is completely analogous to the two-dimensional picture, just embedded in 3-D, showing this image exists in higher dimensions.

\begin{remark}
This geometric picture has a clean algebraic counterpart, written entirely in terms of norms. Herein, we prove a geometric fact completely algebraically. The diagonals of the parallelogram are $u+v$ and $u-v$, and adding their squared lengths gives the \textbf{parallelogram law}
$$\|u+v\|^2 + \|u-v\|^2 = 2\|u\|^2 + 2\|v\|^2.$$
This holds in $\R^n$ for any $n$, and the cross terms $\langle u,v\rangle$ and $-\langle u,v\rangle$ appearing when you expand $\|u+v\|^2$ and $\|u-v\|^2$ cancel exactly. 
\end{remark}
</div>
