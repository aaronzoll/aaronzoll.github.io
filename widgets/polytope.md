---
layout: widget
title: "The Polytope of Optimal Subgradient Methods"
widget_src: "/widgets/polytope.html"
widget_height: 860
widget_height_mobile: 680
back_url: "/DesmosGallery"
back_label: "Gallery"
---

<div class="poly-controls">
  <div class="poly-control-group">
    <span class="poly-control-label">N</span>
    <div class="poly-presets" id="poly-n-group">
      <button class="site-btn poly-n-btn" data-n="2">2</button>
      <button class="site-btn poly-n-btn" data-n="3">3</button>
      <button class="site-btn poly-n-btn" data-n="4">4</button>
      <button class="site-btn poly-n-btn" data-n="5">5</button>
      <button class="site-btn poly-n-btn" data-n="6">6</button>
    </div>
  </div>
  <div class="poly-control-group">
    <span class="poly-control-label">Rotation</span>
    <button class="site-btn poly-spin-btn" id="poly-spin-btn">Spin: On</button>
  </div>
  <div class="poly-control-group">
    <span class="poly-control-label">Speed</span>
    <input class="site-slider poly-spin-speed" type="range" min="0" max="3" step="0.1" value="1" id="poly-spin-speed">
    <span class="poly-spin-speed-val" id="poly-spin-speed-val">1.0×</span>
  </div>
</div>

<hr class="poly-divider">

Every minimax-optimal fixed-step method for Lipschitz convex minimization corresponds to a
nonnegative flow \\(\lambda\\) on the arcs \\(i \to j\\), \\(i < j\\), supplying \\(1/(N+1)\\)
at each node \\(0, \dots, N-1\\). The vertices of that flow polytope are its spanning trees into
\\(N\\) — one out-arc \\(s(j) > j\\) per node — so there are exactly \\(N!\\) of them.

Drori–Taylor sits at the path \\(s(j) = j+1\\), the averaged subgradient method at the star
\\(s(j) = N\\), and Zamani–Glineur at the barycenter of all \\(N!\\) vertices.

<style>
  .poly-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.75rem;
    padding-bottom: 1.5rem;
  }

  .poly-control-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .poly-control-label {
    font-weight: bold;
    font-size: 0.78rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .poly-presets {
    display: flex;
    gap: 0.35rem;
  }

  .poly-presets .site-btn {
    min-width: 2.4rem;
    padding: 0.3rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
  }

  .poly-spin-btn {
    min-width: 7rem;
    padding: 0.3rem 0.9rem;
    font-size: 0.82rem;
  }

  .poly-spin-speed {
    width: 7rem;
  }

  .poly-spin-speed-val {
    font-family: monospace;
    font-size: 0.82rem;
    color: #37474f;
    min-width: 2.6rem;
  }

  .poly-divider {
    border: none;
    border-top: 1px solid #d0d7de;
    margin: 0 0 1.5rem;
  }
</style>

<script>
  (function () {
    var frame = document.getElementById('widget-frame');
    if (!frame) return;

    var nBtns = document.querySelectorAll('.poly-n-btn');
    var spinBtn = document.getElementById('poly-spin-btn');
    var speedInput = document.getElementById('poly-spin-speed');
    var speedVal = document.getElementById('poly-spin-speed-val');
    var spinning = true;

    function callFrame(fn, arg) {
      try {
        var win = frame.contentWindow;
        if (win && typeof win[fn] === 'function') { win[fn](arg); }
      } catch (e) {}
    }

    nBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        nBtns.forEach(function (b) { b.classList.remove('site-btn--active'); });
        btn.classList.add('site-btn--active');
        callFrame('setN', parseInt(btn.getAttribute('data-n'), 10));
      });
      btn.classList.toggle('site-btn--active', btn.getAttribute('data-n') === '3');
    });

    spinBtn.classList.add('site-btn--active');
    spinBtn.addEventListener('click', function () {
      spinning = !spinning;
      spinBtn.textContent = 'Spin: ' + (spinning ? 'On' : 'Off');
      spinBtn.classList.toggle('site-btn--active', spinning);
      callFrame('setSpin', spinning);
    });

    speedInput.addEventListener('input', function () {
      var v = parseFloat(speedInput.value);
      speedVal.textContent = v.toFixed(1) + '×';
      callFrame('setSpinSpeed', v);
    });
  })();
</script>
