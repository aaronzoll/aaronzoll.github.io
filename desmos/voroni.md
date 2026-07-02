---
layout: desmos-graph
title: "Voroni Diagrams"

desmos_json: "voroni.json"
desmos_url: "https://www.desmos.com/calculator/hxwd5y0opp"
side_controls: true
---

<div class="vor-stack">

  <span class="vor-section-label">Distance parameter</span>

  <span class="vor-subtle-label vor-subtle-label--case-normal">preset \(p\) - norms</span>

  <div class="vor-presets">
    <button class="site-btn vor-preset-btn vor-preset-btn--frac" data-p="0.5">
      <span class="site-btn-math">\(\tfrac{1}{2}\)</span>
    </button>
    <button class="site-btn vor-preset-btn" data-p="1">1</button>
    <button class="site-btn vor-preset-btn" data-p="1.5">
      <span class="site-btn-math">\(\tfrac{3}{2}\)</span>
    </button>
    <button class="site-btn vor-preset-btn" data-p="2">2</button>
    <button class="site-btn vor-preset-btn" data-p="5">5</button>
    <button class="site-btn vor-preset-btn" data-p="20">20</button>
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">\(p\) = <strong id="vor-p-val">2.00</strong></span>
    <input class="site-slider" type="range" min="1" max="20" step="0.01" value="2"
           id="vor-p-input">
  </div>

  <hr class="desmos-divider">

  <span class="vor-section-label">Number of points</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(k\) = <strong id="vor-k-val">5</strong></span>
    <input class="site-slider" type="range" min="1" max="9" step="1" value="5"
           id="vor-k-input" data-expr-id="101" data-latex-prefix="k=" data-val-id="vor-k-val"
           data-decimals="0">
  </div>

  <hr class="desmos-divider">

  <span class="vor-section-label">Region size</span>

  <div class="desmos-param">
    <span class="desmos-param-label">\(R\) = <strong id="vor-r-val">30.00</strong></span>
    <input class="site-slider" type="range" min="0" max="30" step="0.1" value="30"
           id="vor-r-input">
  </div>

  <span class="vor-subtle-label">Animate</span>

  <div class="vor-speed-group">
    <button class="site-btn vor-speed-btn" data-steps="400">Slow</button>
    <button class="site-btn vor-speed-btn" data-steps="80">Fast</button>
  </div>

  <hr class="desmos-divider">

  <span class="vor-section-label">Delaunay Triangulation</span>
  <span class="vor-subtle-label vor-subtle-label--case-normal">requires \(p = 2\)</span>

  <div class="vor-delaunay-group">
    <button class="site-btn vor-delaunay-btn" data-folder="171">Triangulation</button>
    <button class="site-btn vor-delaunay-btn" data-folder="190">Circumcircle Centers</button>
    <button class="site-btn vor-delaunay-btn" data-folder="193">Circumcircles</button>
  </div>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .vor-stack {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .vor-section-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .vor-subtle-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
    margin-top: -0.2rem;
  }

  .vor-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .vor-presets .site-btn {
    padding: 0.3rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
    min-width: 2.6rem;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
  }

  .vor-presets .site-btn-math {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* p = 1/2 is a special case (a "distance" that isn't a true metric),
     so mark it out with a dotted border without over-contrasting. */
  .vor-preset-btn--frac {
    border-style: dotted;
    border-width: 2px;
  }

  .vor-speed-group {
    display: flex;
    gap: 0.35rem;
  }

  .vor-speed-group .site-btn {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.82rem;
    padding: 0.35rem 0.6rem;
  }

  .vor-subtle-label--case-normal {
    text-transform: none;
  }

  .vor-delaunay-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .vor-delaunay-btn {
    width: 100%;
    min-width: 0;
  }

  .site-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .site-slider:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>

<script>
  window.onDesmosReady = function(calc) {

    /* ---- distance parameter p (slider + presets) ---- */
    var pInput = document.getElementById('vor-p-input');
    var pVal = document.getElementById('vor-p-val');
    var presetBtns = document.querySelectorAll('.vor-preset-btn');

    function setP(val) {
      calc.setExpression({ id: '59', latex: 'p=' + val });
      if (pVal) { pVal.textContent = Number(val).toFixed(2); }
      if (pInput) { pInput.value = val; }
      presetBtns.forEach(function(b) {
        var match = parseFloat(b.getAttribute('data-p')) === parseFloat(val);
        b.classList.toggle('site-btn--active', match);
      });
    }

    presetBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setP(parseFloat(btn.getAttribute('data-p')));
      });
    });

    pInput.addEventListener('input', function() {
      setP(parseFloat(pInput.value));
    });

    /* highlight a preset if the initial value matches one */
    setP(parseFloat(pInput.value));

    /* ---- number of points k (generic slider) ---- */
    document.querySelectorAll('#vor-k-input').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseFloat(input.value);
        var d = parseInt(input.getAttribute('data-decimals'), 10);
        var decimals = isNaN(d) ? 0 : d;
        var el = document.getElementById(input.getAttribute('data-val-id'));
        if (el) { el.textContent = val.toFixed(decimals); }
        calc.setExpression({
          id: input.getAttribute('data-expr-id'),
          latex: input.getAttribute('data-latex-prefix') + val
        });
      });
    });

    /* ---- region size R (endpoints hidden) ---- */
    var rInput = document.getElementById('vor-r-input');
    var rVal = document.getElementById('vor-r-val');

    function setR(val) {
      calc.setExpression({ id: '80', latex: 'R=' + val });
      if (rVal) { rVal.textContent = Number(val).toFixed(2); }
      if (rInput) { rInput.value = val; }
    }

    rInput.addEventListener('input', function() {
      setR(parseFloat(rInput.value));
    });

    setR(parseFloat(rInput.value));

    /* ---- animate R from 0 to 30, speed set by mutually exclusive buttons ---- */
    var speedBtns = document.querySelectorAll('.vor-speed-btn');
    var animateInterval = null;
    var ANIMATE_TARGET = 30;

    function animateR(totalSteps) {
      if (animateInterval) { clearInterval(animateInterval); }
      rInput.disabled = true;
      setR(0);
      var step = 0;
      animateInterval = setInterval(function() {
        step = step + 1;
        setR((step / totalSteps) * ANIMATE_TARGET);
        if (step >= totalSteps) {
          clearInterval(animateInterval);
          animateInterval = null;
          setR(ANIMATE_TARGET);
          rInput.disabled = false;
        }
      }, 25);
    }

    speedBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        speedBtns.forEach(function(b) { b.classList.remove('site-btn--active'); });
        btn.classList.add('site-btn--active');
        animateR(parseInt(btn.getAttribute('data-steps'), 10));
      });
    });

    /* ---- Delaunay triangulation toggles (independent, force p=2 while any active) ---- */
    var delaunayBtns = document.querySelectorAll('.vor-delaunay-btn');

    function updateDelaunayLock() {
      var anyActive = false;
      delaunayBtns.forEach(function(b) {
        if (b.classList.contains('site-btn--active')) { anyActive = true; }
      });
      pInput.disabled = anyActive;
      presetBtns.forEach(function(b) { b.disabled = anyActive; });
      if (anyActive) { setP(2); }
    }

    delaunayBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var active = btn.classList.toggle('site-btn--active');
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: !active });
        updateDelaunayLock();
      });
    });

  };
</script>

<!--writeup-->
*Write-up coming soon.*
