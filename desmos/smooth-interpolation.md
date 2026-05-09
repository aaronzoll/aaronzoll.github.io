---
layout: desmos-graph
title: "L-smooth Interpolation"
title_math: '\(L\)-smooth Interpolation'

desmos_json: "smooth_interpolation.json"
desmos_url: "https://www.desmos.com/calculator/ya2lhvqccr"
side_controls: true
---

<div class="si-stack">

  <span class="si-section-label">Interpolation</span>

  <button class="site-btn site-btn--active si-show-btn" data-folder="281" data-sub="si-min-sub">
    Minimal Interpolation
  </button>

  <div id="si-min-sub">
    <button class="site-btn site-btn--active si-sub-btn si-precond-btn">
      Show Preconditioning
    </button>
  </div>

  <button class="site-btn si-show-btn" data-folder="286" data-sub="si-max-sub">
    Maximal Interpolation
  </button>

  <div id="si-max-sub" style="display:none">
    <button class="site-btn site-btn--active si-sub-btn si-quads-btn">
      Show Quadratics
    </button>
  </div>

  <hr class="desmos-divider">

  <span class="si-section-label">Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(L\) = <strong id="si-l-val">2.34</strong></span>
    <input class="site-slider" type="range" min="0.25" max="8" step="0.01" value="2.34"
           data-expr-id="9" data-latex-prefix="L=" data-val-id="si-l-val"
           data-decimals="2">
  </div>

  <p id="si-not-interp" class="si-warning" style="display:none">Not interpolable! All \(Q_{i,j}\) must be nonnegative, but cocoercivity from<br>\((i,j)\) = <span id="si-qij-detail"></span></p>

  <div id="si-q-latex" style="display:none"
       data-qmat="\left[F\left[i\right]-F\left[j\right]-G\left[j\right]\left(X\left[i\right]-X\left[j\right]\right)-\frac{1}{2L}\left(G\left[i\right]-G\left[j\right]\right)^{2}\operatorname{for}i=\left[1,...,N\right],j=\left[1,...,N\right]\right]"
       data-imat="\left[i\operatorname{for}i=\left[1,...,N\right],j=\left[1,...,N\right]\right]"
       data-jmat="\left[j\operatorname{for}i=\left[1,...,N\right],j=\left[1,...,N\right]\right]">
  </div>

  <hr class="desmos-divider">

  <span class="si-section-label">Gradients</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_1\) = <strong id="si-g1-val">-0.60</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="-0.6"
           data-expr-id="39" data-latex-prefix="g_{1}=" data-val-id="si-g1-val"
           data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_2\) = <strong id="si-g2-val">0.00</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="0"
           data-expr-id="40" data-latex-prefix="g_{2}=" data-val-id="si-g2-val"
           data-decimals="2">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(g_3\) = <strong id="si-g3-val">0.66</strong></span>
    <input class="site-slider" type="range" min="-2" max="2" step="0.01" value="0.66"
           data-expr-id="41" data-latex-prefix="g_{3}=" data-val-id="si-g3-val"
           data-decimals="2">
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .si-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .si-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .si-show-btn {
    width: 100%;
  }

  .si-sub-btn {
    width: 100%;
    font-size: 0.82rem;
    padding: 0.3rem 0.6rem;
  }

  .si-warning {
    margin: 0;
    font-size: 0.85rem;
    font-weight: bold;
    color: #c74440;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    calc.setExpression({ id: '281', hidden: false });
    calc.setExpression({ id: '286', hidden: true });

    var store = document.getElementById('si-q-latex');
    var qMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-qmat') });
    var iMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-imat') });
    var jMatHelper = calc.HelperExpression({ latex: store.getAttribute('data-jmat') });

    function updateInterpolable() {
      var qList = qMatHelper.listValue;
      var iList = iMatHelper.listValue;
      var jList = jMatHelper.listValue;
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
      var notInterp = document.getElementById('si-not-interp');
      var detailEl = document.getElementById('si-qij-detail');
      if (minVal < 0) {
        if (detailEl) {
          detailEl.textContent = '(' + minI + ', ' + minJ + ') is ' + minVal.toFixed(3);
        }
        if (notInterp) { notInterp.style.display = ''; }
      } else {
        if (notInterp) { notInterp.style.display = 'none'; }
      }
    }

    qMatHelper.observe('listValue', updateInterpolable);
    iMatHelper.observe('listValue', updateInterpolable);
    jMatHelper.observe('listValue', updateInterpolable);

    document.querySelectorAll('.si-stack .site-slider').forEach(function(input) {
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

    document.querySelectorAll('.si-show-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var folderId = btn.getAttribute('data-folder');
        var subId = btn.getAttribute('data-sub');
        var sub = subId ? document.getElementById(subId) : null;
        if (btn.classList.contains('site-btn--active')) {
          calc.setExpression({ id: folderId, hidden: true });
          btn.classList.remove('site-btn--active');
          if (sub) { sub.style.display = 'none'; }
        } else {
          calc.setExpression({ id: folderId, hidden: false });
          btn.classList.add('site-btn--active');
          if (sub) { sub.style.display = ''; }
        }
      });
    });

    document.querySelector('.si-precond-btn').addEventListener('click', function() {
      var btn = this;
      if (btn.classList.contains('site-btn--active')) {
        calc.setExpression({ id: '7',   hidden: true });
        calc.setExpression({ id: '310', hidden: true });
        btn.classList.remove('site-btn--active');
      } else {
        calc.setExpression({ id: '7',   hidden: false });
        calc.setExpression({ id: '310', hidden: false });
        btn.classList.add('site-btn--active');
      }
    });

    document.querySelector('.si-quads-btn').addEventListener('click', function() {
      var btn = this;
      if (btn.classList.contains('site-btn--active')) {
        calc.setExpression({ id: '288', hidden: true });
        btn.classList.remove('site-btn--active');
      } else {
        calc.setExpression({ id: '288', hidden: false });
        btn.classList.add('site-btn--active');
      }
    });

  };
</script>

<!--writeup-->

*Write-up coming soon.*
