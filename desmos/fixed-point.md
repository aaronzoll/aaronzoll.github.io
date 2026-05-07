---
layout: desmos-graph
title: "Fixed Point Methods"
desmos_json: "fixed_point.json"
desmos_url: "https://www.desmos.com/calculator/xwljuznw9j"
---

*Write-up coming soon.*


<div class="fp-section">

  <p class="fp-description">
    A <strong>fixed point</strong> of \(g\) is a value \(x^*\) where \(g(x^*) = x^*\).
    The iteration \(x_{k+1} = g(x_k)\) either converges to a fixed point or diverges,
    depending on the function and starting value.
    Use the <strong>Step</strong> and <strong>Reset</strong> buttons inside the graph to advance or restart the iteration.
    Switch the iteration function below.
  </p>

  <div class="fp-selector">
    <span class="fp-selector-label">Iteration function \(g(x)\):</span>
    <div class="fp-buttons">
      <button class="site-btn" data-idx="0" onclick="fpSetFunc(this)">
        <span class="site-btn-math">\(\sin(x) + x\)</span>
      </button>
      <button class="site-btn" data-idx="1" onclick="fpSetFunc(this)">
        <span class="site-btn-math">\(\dfrac{x^2}{(x-3)(x+1)}\)</span>
      </button>
      <button class="site-btn" data-idx="2" onclick="fpSetFunc(this)">
        <span class="site-btn-math">\(e^{-x^2/2} + 3\)</span>
      </button>
    </div>
  </div>

</div>

<style>
  .fp-section {
    margin-top: 1.5rem;
  }

  .fp-description {
    margin-bottom: 1.25rem;
    line-height: 1.7;
  }

  .fp-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  .fp-selector-label {
    font-weight: bold;
    font-size: 0.95rem;
    color: #4a5568;
    text-align: center;
  }

  .fp-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
</style>

<script>
  var FP_FUNCTIONS = [
    'g\\left(x\\right)=\\sin\\left(x\\right)+x',
    'g\\left(x\\right)=\\frac{x^{2}}{\\left(x-3\\right)\\left(x+1\\right)}',
    'g\\left(x\\right)=e^{-\\frac{x^{2}}{2}}+3'
  ];

  function fpApply(calc, idx) {
    calc.setExpression({ id: '1', latex: FP_FUNCTIONS[idx] });
    calc.setExpression({ id: '6', latex: 'x_{k}=1' });
    calc.setExpression({ id: '43', latex: 'H_{istory}=\\left[1\\right]' });
  }

  function fpSetFunc(btn) {
    var idx = parseInt(btn.getAttribute('data-idx'), 10);
    fpApply(window.desmosCalc, idx);
    document.querySelectorAll('.site-btn').forEach(function (b) {
      b.classList.remove('site-btn--active');
    });
    btn.classList.add('site-btn--active');
  }

  window.onDesmosReady = function (calc) {
    fpApply(calc, 0);
    document.querySelector('.site-btn[data-idx="0"]').classList.add('site-btn--active');
  };
</script>
