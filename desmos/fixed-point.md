---
layout: desmos-graph
title: "Fixed Point Methods"
desmos_json: "fixed_point.json"
desmos_url: "https://www.desmos.com/calculator/xwljuznw9j"
---

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
      <button class="fp-btn" data-idx="0" onclick="fpSetFunc(this)">
        <span class="fp-btn-math">\(\sin(x) + x\)</span>
      </button>
      <button class="fp-btn" data-idx="1" onclick="fpSetFunc(this)">
        <span class="fp-btn-math">\(\dfrac{x^2}{(x-3)(x+1)}\)</span>
      </button>
      <button class="fp-btn" data-idx="2" onclick="fpSetFunc(this)">
        <span class="fp-btn-math">\(e^{-x^2/2} + 3\)</span>
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

  .fp-btn {
    min-width: 160px;
    padding: 0.65rem 1.4rem;
    border: 1px solid #b0bec5;
    border-radius: 4px;
    background: #f4f6f8;
    color: #37474f;
    font-size: 1.05rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    text-align: center;
  }

  .fp-btn:hover:not(.fp-btn--active) {
    background: #e8edf2;
    border-color: #90a4ae;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .fp-btn.fp-btn--active {
    background: #546e7a;
    border-color: #37474f;
    color: white;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2),
                0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .fp-btn-math {
    display: block;
    pointer-events: none;
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
    document.querySelectorAll('.fp-btn').forEach(function (b) {
      b.classList.remove('fp-btn--active');
    });
    btn.classList.add('fp-btn--active');
  }

  window.onDesmosReady = function (calc) {
    fpApply(calc, 0);
    document.querySelector('.fp-btn[data-idx="0"]').classList.add('fp-btn--active');
  };
</script>
