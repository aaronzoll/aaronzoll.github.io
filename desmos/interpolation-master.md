---
layout: desmos-graph
title: "Interpolation Master File"

desmos_json: "interpolation_master.json"
desmos_url: "https://www.desmos.com/calculator/xepjlyuovb"
side_controls: true
---

<div class="im-stack">

  <span class="im-section-label">Data</span>

  <div class="desmos-param">
    <span class="desmos-param-label">Random data points: <strong id="im-nrand-val">0</strong></span>
    <input class="site-slider" type="range" min="0" max="5" step="1" value="0"
           id="im-nrand-input"
           data-expr-id="10" data-latex-prefix="n_{rand}=" data-val-id="im-nrand-val"
           data-decimals="0">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Seed: <strong id="im-seed-val">0.55</strong></span>
    <input class="site-slider" type="range" min="-1" max="1" step="0.05" value="0.55"
           data-expr-id="11" data-latex-prefix="s_{eed}=" data-val-id="im-seed-val"
           data-decimals="2">
  </div>

  <button class="site-btn" id="im-reset-btn">Reset</button>

  <hr class="desmos-divider">

  <span class="im-section-label">Method</span>

  <button class="site-btn site-btn--active im-toggle-btn"
          data-folder="48" data-gradients="0">
    Piecewise linear
  </button>

  <button class="site-btn im-toggle-btn"
          data-folder="70" data-gradients="0" data-slider="im-k-wrap">
    \(k\)-degree polynomial
    <span class="im-btn-sub">(function values only)</span>
  </button>

  <div id="im-k-wrap" style="display:none">
    <div class="desmos-param">
      <span class="desmos-param-label">\(k\) = <strong id="im-k-val">2</strong></span>
      <input class="site-slider" type="range" min="1" max="10" step="1" value="2"
             id="im-k-input"
             data-expr-id="74" data-latex-prefix="k=" data-val-id="im-k-val"
             data-decimals="0">
    </div>
  </div>

  <button class="site-btn im-toggle-btn"
          data-folder="90" data-gradients="1" data-slider="im-d-wrap">
    \((2d-1)\)-degree polynomial
    <span class="im-btn-sub">(with derivatives)</span>
  </button>

  <div id="im-d-wrap" style="display:none">
    <div class="desmos-param">
      <span class="desmos-param-label">\(d\) = <strong id="im-d-val">4</strong></span>
      <input class="site-slider" type="range" min="1" max="10" step="1" value="4"
             id="im-d-input"
             data-expr-id="95" data-latex-prefix="d=" data-val-id="im-d-val"
             data-decimals="0">
    </div>
  </div>

  <button class="site-btn im-toggle-btn"
          data-folder="101" data-gradients="1">
    Piecewise cubic
  </button>

  <button class="site-btn im-toggle-btn"
          data-folder="214" data-gradients="0" data-slider="im-i6-wrap">
    Convex
    <span class="im-btn-sub">(function values only)</span>
  </button>

  <div id="im-i6-wrap" style="display:none">
    <div class="desmos-param">
      <span class="desmos-param-label">Cutting plane: <strong id="im-i6-val">2</strong></span>
      <input class="site-slider" type="range" min="1" max="10" step="1" value="2"
             id="im-i6-input"
             data-expr-id="218" data-latex-prefix="i_{6}=" data-val-id="im-i6-val"
             data-decimals="0">
    </div>
  </div>

  <button class="site-btn im-toggle-btn" id="im-lsmooth-btn"
          data-folder="230" data-gradients="1" data-slider="im-l-wrap">
    \(L\)-smooth convex
  </button>

  <div id="im-l-wrap" style="display:none">
    <div class="desmos-param">
      <span class="desmos-param-label">\(L\) = <strong id="im-l-val">1.90</strong></span>
      <input class="site-slider" type="range" min="0.25" max="8" step="0.01" value="1.9"
             data-expr-id="232" data-latex-prefix="L=" data-val-id="im-l-val"
             data-decimals="2">
    </div>
    <p id="im-not-interp" class="im-warning" style="display:none">Not interpolable! All \(Q_{i,j}\) must be nonnegative, but cocoercivity for<br>\((i,j)\) = <span id="im-qij-detail"></span></p>
  </div>

  <div id="im-q-latex" style="display:none"
       data-open="\("
       data-close="\)"
       data-qmat="\left[F\left[i\right]-F\left[j\right]-G\left[j\right]\left(X\left[i\right]-X\left[j\right]\right)-\frac{1}{2L}\left(G\left[i\right]-G\left[j\right]\right)^{2}\operatorname{for}i=\left[1,...,m\right],j=\left[1,...,m\right]\right]"
       data-imat="\left[i\operatorname{for}i=\left[1,...,m\right],j=\left[1,...,m\right]\right]"
       data-jmat="\left[j\operatorname{for}i=\left[1,...,m\right],j=\left[1,...,m\right]\right]">
  </div>

  <hr class="desmos-divider">

  <span class="im-section-label">Gradients</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_1\) = <strong id="im-g1-val">-1.30</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="-1.3"
           data-expr-id="264" data-latex-prefix="g_{1}=" data-val-id="im-g1-val"
           data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_2\) = <strong id="im-g2-val">-0.10</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="-0.1"
           data-expr-id="265" data-latex-prefix="g_{2}=" data-val-id="im-g2-val"
           data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_3\) = <strong id="im-g3-val">2.00</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="2"
           data-expr-id="266" data-latex-prefix="g_{3}=" data-val-id="im-g3-val"
           data-decimals="2">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .im-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .im-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .im-toggle-btn {
    width: 100%;
    line-height: 1.3;
  }

  .im-btn-sub {
    display: block;
    font-size: 0.8em;
    opacity: 0.8;
  }

  .im-warning {
    margin: 0;
    font-size: 0.85rem;
    font-weight: bold;
    color: #c74440;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    calc.setExpression({ id: '48',  hidden: false });
    calc.setExpression({ id: '70',  hidden: true });
    calc.setExpression({ id: '90',  hidden: true });
    calc.setExpression({ id: '101', hidden: true });
    calc.setExpression({ id: '214', hidden: true });
    calc.setExpression({ id: '230', hidden: true });
    calc.setExpression({ id: '56',  latex: 'S_{howGradients}=0' });

    var mHelper = calc.HelperExpression({ latex: 'm' });
    mHelper.observe('numericValue', function() {
      var mVal = mHelper.numericValue;
      if (isNaN(mVal)) { return; }
      var kInput = document.getElementById('im-k-input');
      var dInput = document.getElementById('im-d-input');
      var i6Input = document.getElementById('im-i6-input');
      if (kInput)  { kInput.max  = mVal - 1; }
      if (dInput)  { dInput.max  = mVal; }
      if (i6Input) { i6Input.max = mVal - 1; }
    });

    var qMatHelper = null;
    var iMatHelper = null;
    var jMatHelper = null;
    var interpIds = ['241', '245', '252', '253'];

    function setInterpOpacity(opacity) {
      interpIds.forEach(function(id) {
        calc.setExpression({ id: id, lineOpacity: opacity });
      });
    }

    function updateInterpolable() {
      var qList = qMatHelper ? qMatHelper.listValue : null;
      var iList = iMatHelper ? iMatHelper.listValue : null;
      var jList = jMatHelper ? jMatHelper.listValue : null;
      if (qList === null) { return; }
      if (iList === null) { return; }
      if (jList === null) { return; }
      if (qList.length === 0) { return; }
      var minVal = Infinity;
      var minI = 1;
      var minJ = 1;
      for (var idx = 0; idx < qList.length; idx++) {
        if (qList[idx] < minVal) {
          minVal = qList[idx];
          minI = Math.round(iList[idx]);
          minJ = Math.round(jList[idx]);
        }
      }
      var notInterp = document.getElementById('im-not-interp');
      var detailEl = document.getElementById('im-qij-detail');
      if (minVal < 0) {
        if (detailEl) {
          detailEl.textContent = '(' + minI + ', ' + minJ + ') is ' + minVal.toFixed(3);
        }
        setInterpOpacity('0.1');
        if (notInterp) { notInterp.style.display = ''; }
      } else {
        setInterpOpacity('1');
        if (notInterp) { notInterp.style.display = 'none'; }
      }
    }

    function deactivateLsmooth() {
      if (qMatHelper) { qMatHelper.unobserve('listValue'); qMatHelper = null; }
      if (iMatHelper) { iMatHelper.unobserve('listValue'); iMatHelper = null; }
      if (jMatHelper) { jMatHelper.unobserve('listValue'); jMatHelper = null; }
      setInterpOpacity('1');
      var el = document.getElementById('im-not-interp');
      if (el) { el.style.display = 'none'; }
    }

    var sliderWraps = ['im-k-wrap', 'im-d-wrap', 'im-i6-wrap', 'im-l-wrap'];

    document.querySelectorAll('.im-stack .site-slider').forEach(function(input) {
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

    document.querySelectorAll('.im-toggle-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('site-btn--active')) { return; }
        var prevActive = document.querySelector('.im-toggle-btn.site-btn--active');
        if (prevActive && prevActive.id === 'im-lsmooth-btn') {
          deactivateLsmooth();
        }
        document.querySelectorAll('.im-toggle-btn').forEach(function(b) {
          calc.setExpression({ id: b.getAttribute('data-folder'), hidden: true });
          b.classList.remove('site-btn--active');
        });
        sliderWraps.forEach(function(id) {
          var el = document.getElementById(id);
          if (el) { el.style.display = 'none'; }
        });
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: false });
        btn.classList.add('site-btn--active');
        var g = btn.getAttribute('data-gradients');
        calc.setExpression({ id: '56', latex: 'S_{howGradients}=' + g });
        var sliderWrapId = btn.getAttribute('data-slider');
        if (sliderWrapId) {
          var wrap = document.getElementById(sliderWrapId);
          if (wrap) { wrap.style.display = ''; }
        }
        if (btn.id === 'im-lsmooth-btn') {
          var store = document.getElementById('im-q-latex');
          qMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-qmat') });
          iMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-imat') });
          jMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-jmat') });
          qMatHelper.observe('listValue', updateInterpolable);
          iMatHelper.observe('listValue', updateInterpolable);
          jMatHelper.observe('listValue', updateInterpolable);
        }
      });
    });

    document.getElementById('im-reset-btn').addEventListener('click', function() {
      calc.setExpression({ id: '10',  latex: 'n_{rand}=0' });
      calc.setExpression({ id: '258', latex: 'x_{1}=-4' });
      calc.setExpression({ id: '259', latex: 'x_{2}=-1' });
      calc.setExpression({ id: '260', latex: 'x_{3}=3.8' });
      calc.setExpression({ id: '261', latex: 'f_{1}=2.4' });
      calc.setExpression({ id: '262', latex: 'f_{2}=-0.8' });
      calc.setExpression({ id: '263', latex: 'f_{3}=1' });
      calc.setExpression({ id: '264', latex: 'g_{1}=-1.3' });
      calc.setExpression({ id: '265', latex: 'g_{2}=-0.1' });
      calc.setExpression({ id: '266', latex: 'g_{3}=2' });
      var nEl = document.getElementById('im-nrand-val');
      if (nEl) { nEl.textContent = '0'; }
      var nInput = document.getElementById('im-nrand-input');
      if (nInput) { nInput.value = '0'; }
    });

  };
</script>

<!--writeup-->

*Write-up coming soon.*
