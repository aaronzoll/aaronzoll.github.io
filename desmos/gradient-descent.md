---
layout: desmos-graph
title: "Gradient Descent"

desmos_json: "GD.json"

desmos_url: "https://www.desmos.com/calculator/c68dbf5bf0"

side_controls: true

---

<div class="gd-stack">

  <span class="gd-section-label">Function</span>

  <div class="gd-presets">
    <button class="site-btn gd-fn-btn" data-latex="\frac{\left(x-5\right)^{2}}{20}">x²</button>
    <button class="site-btn gd-fn-btn" data-latex="0.7\sqrt{1+\left(x-5\right)^{2}}">√(1+x²)</button>
    <button class="site-btn gd-fn-btn" data-latex="-3\cos\left(x\right)+2">-cos(x)</button>
    <button class="site-btn gd-fn-btn" data-latex="\left|x-5\right|">|x|</button>
    <button class="site-btn gd-fn-btn" data-latex="\frac{10}{1+e^{-\left(x-7\right)}}-2">1/(1+e<sup>-x</sup>)</button>
  </div>


  <div class="gd-custom-section">
    <span class="gd-custom-label">Custom</span>
    <div class="gd-custom-row">
      <input class="gd-custom-input" id="gd-custom-fn" type="text"
             placeholder="sin(x), x^2, e^x, …" autocomplete="off" spellcheck="false">
      <button class="gd-action-btn" id="gd-apply-fn">Apply</button>
    </div>
    <span class="gd-custom-note">Use LaTeX notation (e.g. \sin(x), x^2, e^{x+1}, \ln(x)).</span>
  </div>

  <button class="gd-reset-btn" id="gd-reset-fn">Reset to default</button>

  <hr class="desmos-divider">

  <span class="gd-section-label">Initial Guess</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(x_0\) = <strong id="gd-x0-val">7.00</strong></span>
    <input class="site-slider" type="range" min="-3" max="15" step="0.1" value="7"
           data-expr-id="89" data-latex-prefix="x_{0}=" data-val-id="gd-x0-val"
           data-decimals="2" data-trigger-reset="1">
  </div>

  <hr class="desmos-divider">

  <span class="gd-section-label">Step Size</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(\alpha\) = <strong id="gd-alpha-val">1.000</strong></span>
    <input class="site-slider" type="range" min="0" max="2" step="0.001" value="1"
           data-expr-id="5" data-latex-prefix="a=" data-val-id="gd-alpha-val"
           data-decimals="3">
  </div>


  <hr class="desmos-divider">

  <span class="gd-section-label">Iterate</span>

  <div class="gd-iterate-row">
    <button class="site-btn gd-iterate-btn" id="gd-step-btn">Step</button>
    <button class="site-btn gd-iterate-btn" id="gd-iter-reset-btn">Reset</button>
  </div>  <span class="gd-custom-note">Step advances \(\color[RGB]{45,112,179}{x_k} \to \color[RGB]{199,68,64}{x_k - \frac{\alpha}{L} g_k}\). Guaranteed descent when function is \(L\)-smooth and \(\alpha \in (0,2)\). Reset returns to \(x_0\).</span>


  <hr class="desmos-divider">

  <span class="gd-section-label">History</span>

  <button class="site-btn" id="gd-history-toggle" data-folder="81">Show History</button>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .gd-stack {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .gd-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .gd-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .gd-presets .site-btn {
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
    font-family: monospace;
    min-width: 0;
  }

  .gd-custom-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem 0.6rem;
    border: 2px dashed #c8c8c8;
    border-radius: 4px;
    background: #fafafa;
  }

  .gd-custom-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
  }

  .gd-custom-row {
    display: flex;
    gap: 0.4rem;
  }

  .gd-custom-input {
    flex: 1;
    min-width: 0;
    padding: 0.28rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
    border: 1px solid #a67b5b;
    border-radius: 3px;
    background: #fff;
    color: #1a1a1a;
  }

  .gd-custom-input:focus {
    outline: 2px solid #a67b5b;
    outline-offset: 1px;
  }

  .gd-action-btn {
    padding: 0.28rem 0.7rem;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid #a67b5b;
    background: #fdf6ee;
    color: #3b1f00;
    border-radius: 3px;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .gd-action-btn:hover {
    background: #f0e0ca;
  }

  .gd-custom-note {
    font-size: 0.72rem;
    color: #888;
    font-style: italic;
  }

  .gd-reset-btn {
    align-self: flex-start;
    padding: 0.22rem 0.6rem;
    font-size: 0.75rem;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #f7f7f7;
    color: #555;
    border-radius: 3px;
    transition: background 0.12s;
  }

  .gd-reset-btn:hover {
    background: #ececec;
  }

  .gd-iterate-row {
    display: flex;
    gap: 0.5rem;
  }

  .gd-iterate-btn {
    flex: 1;
    min-width: 0;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    var GD_DEFAULT_LATEX = 'f\\left(x\\right)=\\frac{\\sqrt{x^{2}+1}+4\\sin\\left(x\\right)}{2}';

    var GD_FN_MAP = [
      ['arcsin','\\arcsin'],['arccos','\\arccos'],['arctan','\\arctan'],
      ['sinh','\\sinh'],['cosh','\\cosh'],['tanh','\\tanh'],
      ['sin','\\sin'],['cos','\\cos'],['tan','\\tan'],
      ['sec','\\sec'],['csc','\\csc'],['cot','\\cot'],
      ['ln','\\ln'],['log','\\log'],['exp','\\exp'],
    ];

    function gdToDesmos(raw) {
      var s = raw.trim();
      GD_FN_MAP.forEach(function(pair) {
        s = s.replace(new RegExp('(?<!\\\\)' + pair[0] + '\\s*\\(', 'g'),
                      pair[1] + '\\left(');
      });
      return s;
    }

    function setGdFunction(latex) {
      calc.setExpression({ id: '1', latex: 'f\\left(x\\right)=' + latex });
    }

    function triggerAction(id) {
      calc.controller.dispatch({ type: 'action-single-step', id: id });
    }

    function setActiveFnBtn(btn) {
      document.querySelectorAll('.gd-fn-btn').forEach(function(b) {
        b.classList.remove('site-btn--active');
      });
      if (btn) btn.classList.add('site-btn--active');
    }

    document.querySelectorAll('.gd-fn-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setGdFunction(btn.getAttribute('data-latex'));
        document.getElementById('gd-custom-fn').value = '';
        setActiveFnBtn(btn);
        triggerAction('18');
      });
    });

    var gdCustomInput = document.getElementById('gd-custom-fn');
    document.getElementById('gd-apply-fn').addEventListener('click', function() {
      var val = gdCustomInput.value.trim();
      if (!val) return;
      setGdFunction(gdToDesmos(val));
      setActiveFnBtn(null);
      triggerAction('18');
    });
    gdCustomInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('gd-apply-fn').click();
    });

    document.getElementById('gd-reset-fn').addEventListener('click', function() {
      calc.setExpression({ id: '1', latex: GD_DEFAULT_LATEX });
      gdCustomInput.value = '';
      setActiveFnBtn(null);
      triggerAction('18');
    });

    document.getElementById('gd-step-btn').addEventListener('click', function() {
      triggerAction('6');
    });

    document.getElementById('gd-iter-reset-btn').addEventListener('click', function() {
      triggerAction('18');
    });

    document.querySelectorAll('.gd-stack .site-slider').forEach(function(input) {
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
        if (input.getAttribute('data-trigger-reset')) { triggerAction('18'); }
      });
    });

    var historyBtn = document.getElementById('gd-history-toggle');
    calc.setExpression({ id: '81', hidden: true });
    historyBtn.addEventListener('click', function() {
      var showing = historyBtn.classList.toggle('site-btn--active');
      calc.setExpression({ id: '81', hidden: !showing });
      historyBtn.textContent = showing ? 'Hide History' : 'Show History';
    });

  };
</script>

<!--writeup-->

<!-- Optional write-up below. Supports full Markdown + LaTeX via MathJax. -->
