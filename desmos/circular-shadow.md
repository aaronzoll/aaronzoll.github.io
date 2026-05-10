---
layout: desmos-graph
title: "Circular Shadows and Slices in p-norm Balls"
desmos_json: "circular_p_norm_shadow.json"
desmos_url: "https://www.desmos.com/3d/jtpsqln6wx"
graph_3d: true
side_controls: true
---

<div class="cs-stack">

  <span class="cs-section-label">Dual Norm Balls</span>
  <p class="cs-hint">(Only \(p\) is interactive,  \(q =\tfrac{p}{p-1}\) automatically)</p>

  <div class="desmos-param">
    <span class="desmos-param-label">\(p\) = <strong id="cs-p-val">1.33</strong></span>
    <input class="site-slider" type="range" min="1" max="2" step="0.01" value="1.33"
           id="cs-p-input"
           data-expr-id="3" data-latex-prefix="p=" data-val-id="cs-p-val" data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(q\) = <strong id="cs-q-val">4.00</strong></span>
    <input class="site-slider cs-readonly-slider" type="range" min="2" max="10" step="0.01" value="4"
           id="cs-q-input">
  </div>

  <hr class="desmos-divider">

  <button class="site-btn site-btn--active cs-toggle-btn" id="cs-pnorm-btn">
    p-norm ball 
  </button>

  <div id="cs-shadow-sub">
    <button class="site-btn cs-sub-btn" id="cs-shadow-btn">
      Make Circular Shadow
    </button>
  </div>

  <button class="site-btn cs-toggle-btn" id="cs-qnorm-btn">
    q-norm ball
  </button>

  <div id="cs-slice-sub" style="display:none">
    <button class="site-btn cs-sub-btn" id="cs-slice-btn">
      Make Circular Slice
    </button>
  </div>

  <hr class="desmos-divider">

  <div id="cs-pnorm-wrap">
    <span class="cs-section-label">Rotation Parameters</span>
    <div class="desmos-param">
      <span class="desmos-param-label">\(a\) = <strong id="cs-a-val">-0.26</strong></span>
      <input class="site-slider" type="range" min="-3.14" max="3.14" step="0.01" value="-0.26"
             data-expr-id="18" data-latex-prefix="a=" data-val-id="cs-a-val" data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(b\) = <strong id="cs-b-val">-0.62</strong></span>
      <input class="site-slider" type="range" min="-3.14" max="3.14" step="0.01" value="-0.62"
             data-expr-id="20" data-latex-prefix="b=" data-val-id="cs-b-val" data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(c\) = <strong id="cs-c-val">0.79</strong></span>
      <input class="site-slider" type="range" min="-3.14" max="3.14" step="0.01" value="0.79"
             data-expr-id="21" data-latex-prefix="c=" data-val-id="cs-c-val" data-decimals="2">
    </div>
  </div>

  <div id="cs-qnorm-wrap" style="display:none">
    <span class="cs-section-label">Hyperplane Parameters</span>
    <div class="desmos-param">
      <span class="desmos-param-label">\(a_1\) = <strong id="cs-a1-val">0.78</strong></span>
      <input class="site-slider" type="range" min="-3" max="3" step="0.01" value="0.78"
             data-expr-id="51" data-latex-prefix="a_{1}=" data-val-id="cs-a1-val" data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(b_1\) = <strong id="cs-b1-val">2.02</strong></span>
      <input class="site-slider" type="range" min="-3" max="3" step="0.01" value="2.02"
             data-expr-id="52" data-latex-prefix="b_{1}=" data-val-id="cs-b1-val" data-decimals="2">
    </div>
    <div class="desmos-param">
      <span class="desmos-param-label">\(c_1\) = <strong id="cs-c1-val">1.00</strong></span>
      <input class="site-slider" type="range" min="-3" max="3" step="0.01" value="1"
             data-expr-id="53" data-latex-prefix="c_{1}=" data-val-id="cs-c1-val" data-decimals="2">
    </div>
  </div>

</div>

<style>
  .cs-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cs-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .cs-toggle-btn {
    width: 100%;
  }

  .cs-sub-btn {
    width: 100%;
    font-size: 0.82rem;
    padding: 0.3rem 0.6rem;
  }

  .cs-readonly-slider {
    pointer-events: none;
  }

  .cs-hint {
    margin: 0;
    font-size: 0.78rem;
    color: #718096;
    font-style: italic;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    calc.setExpression({ id: '6',  hidden: false });
    calc.setExpression({ id: '11', hidden: true });

    function initSlider(exprLatex, exprId, displayId) {
      var h = calc.HelperExpression({ latex: exprLatex });
      h.observe('numericValue', function() {
        var val = h.numericValue;
        if (isNaN(val)) { return; }
        var input = document.querySelector('[data-expr-id="' + exprId + '"]');
        var display = document.getElementById(displayId);
        if (input) { input.value = val; }
        if (display) { display.textContent = val.toFixed(2); }
        h.unobserve('numericValue');
      });
    }

    initSlider('p',     '3',  'cs-p-val');
    initSlider('a',     '18', 'cs-a-val');
    initSlider('b',     '20', 'cs-b-val');
    initSlider('c',     '21', 'cs-c-val');
    initSlider('a_{1}', '51', 'cs-a1-val');
    initSlider('b_{1}', '52', 'cs-b1-val');
    initSlider('c_{1}', '53', 'cs-c1-val');

    var qHelper = calc.HelperExpression({ latex: 'q' });
    qHelper.observe('numericValue', function() {
      var qVal = qHelper.numericValue;
      if (isNaN(qVal)) { return; }
      var display = document.getElementById('cs-q-val');
      var qInput = document.getElementById('cs-q-input');
      var finite = isFinite(qVal);
      if (display) { display.textContent = finite ? qVal.toFixed(2) : '∞'; }
      if (qInput) { qInput.value = finite ? Math.min(qVal, 10) : 10; }
    });

    document.querySelectorAll('.cs-stack .site-slider').forEach(function(input) {
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

    document.getElementById('cs-pnorm-btn').addEventListener('click', function() {
      if (this.classList.contains('site-btn--active')) { return; }
      calc.setExpression({ id: '11', hidden: true });
      calc.setExpression({ id: '6',  hidden: false });
      document.getElementById('cs-qnorm-wrap').style.display = 'none';
      document.getElementById('cs-pnorm-wrap').style.display = '';
      document.getElementById('cs-slice-sub').style.display = 'none';
      document.getElementById('cs-shadow-sub').style.display = '';
      document.getElementById('cs-qnorm-btn').classList.remove('site-btn--active');
      this.classList.add('site-btn--active');
    });

    document.getElementById('cs-qnorm-btn').addEventListener('click', function() {
      if (this.classList.contains('site-btn--active')) { return; }
      calc.setExpression({ id: '6',  hidden: true });
      calc.setExpression({ id: '11', hidden: false });
      document.getElementById('cs-pnorm-wrap').style.display = 'none';
      document.getElementById('cs-qnorm-wrap').style.display = '';
      document.getElementById('cs-shadow-sub').style.display = 'none';
      document.getElementById('cs-slice-sub').style.display = '';
      document.getElementById('cs-pnorm-btn').classList.remove('site-btn--active');
      this.classList.add('site-btn--active');
    });

    function setPTo4over3() {
      var pVal = 4 / 3;
      calc.setExpression({ id: '3', latex: 'p=' + pVal });
      var pInput = document.getElementById('cs-p-input');
      if (pInput) { pInput.value = pVal; document.getElementById('cs-p-val').textContent = pVal.toFixed(2); }
    }

    document.getElementById('cs-shadow-btn').addEventListener('click', function() {
      setPTo4over3();
      var aVal = -Math.PI / 12;
      var bVal = -Math.asin(1 / Math.sqrt(3));
      var cVal = Math.PI / 4;
      calc.setExpression({ id: '18', latex: 'a=' + aVal });
      calc.setExpression({ id: '20', latex: 'b=' + bVal });
      calc.setExpression({ id: '21', latex: 'c=' + cVal });
      var aInput = document.querySelector('[data-expr-id="18"]');
      var bInput = document.querySelector('[data-expr-id="20"]');
      var cInput = document.querySelector('[data-expr-id="21"]');
      if (aInput) { aInput.value = aVal.toFixed(2); document.getElementById('cs-a-val').textContent = aVal.toFixed(2); }
      if (bInput) { bInput.value = bVal.toFixed(2); document.getElementById('cs-b-val').textContent = bVal.toFixed(2); }
      if (cInput) { cInput.value = cVal.toFixed(2); document.getElementById('cs-c-val').textContent = cVal.toFixed(2); }
    });

    document.getElementById('cs-slice-btn').addEventListener('click', function() {
      setPTo4over3();
      calc.setExpression({ id: '51', latex: 'a_{1}=1' });
      calc.setExpression({ id: '52', latex: 'b_{1}=1' });
      calc.setExpression({ id: '53', latex: 'c_{1}=1' });
      var a1Input = document.querySelector('[data-expr-id="51"]');
      var b1Input = document.querySelector('[data-expr-id="52"]');
      var c1Input = document.querySelector('[data-expr-id="53"]');
      if (a1Input) { a1Input.value = '1'; document.getElementById('cs-a1-val').textContent = '1.00'; }
      if (b1Input) { b1Input.value = '1'; document.getElementById('cs-b1-val').textContent = '1.00'; }
      if (c1Input) { c1Input.value = '1'; document.getElementById('cs-c1-val').textContent = '1.00'; }
    });

  };
</script>

<!--writeup-->
