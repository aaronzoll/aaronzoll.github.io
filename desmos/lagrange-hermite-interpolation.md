---
layout: desmos-graph
title: "Lagrange/Hermite Interpolation"
desmos_json: "lagrange_hermite_interp.json"
desmos_url: "https://www.desmos.com/calculator/6u4yq9jhxa"
side_controls: true
---

<p class="lhi-side-note">
  The <strong>full interpolations</strong> are the complete polynomials fitting all five data points.
  The <strong>basis functions</strong> are the individual pieces, where each one is controlled by a node
  index \(k\) and contributes exactly one data value (or derivative) to the sum.
</p>

<div class="lhi-stack">

  <span class="lhi-label">Full interpolation</span>

  <div class="lhi-btn-row">
    <button class="site-btn lhi-full-btn" data-type="lagrange" onclick="lhiSetFull(this, 'lagrange')">
      Full Lagrange
    </button>
  </div>
  <div class="lhi-btn-row">
    <button class="site-btn site-btn--active lhi-full-btn" data-type="hermite" onclick="lhiSetFull(this, 'hermite')">
      Full Hermite
    </button>
  </div>

  <hr class="desmos-divider">
  <span class="lhi-label">Basis functions</span>

  <div class="lhi-btn-row">
    <button class="site-btn lhi-interp-btn"
            data-folder="111" data-slider="lhi-k-wrap"
            data-expr-id="115" data-latex-prefix="k="
            data-val-id="lhi-k-val" data-default="5"
            onclick="lhiToggleInterp(this)">
      Lagrange
    </button>
    <div class="lhi-slider-wrap" id="lhi-k-wrap">
      <span class="lhi-slider-label">\(k\) = <strong id="lhi-k-val">5</strong></span>
      <input class="site-slider" type="range" min="1" max="5" step="1" value="5"
             oninput="lhiSlide(this)">
    </div>
  </div>

  <div class="lhi-btn-row">
    <button class="site-btn lhi-interp-btn"
            data-folder="127" data-slider="lhi-k1-wrap"
            data-expr-id="139" data-latex-prefix="k_{1}="
            data-val-id="lhi-k1-val" data-default="1"
            onclick="lhiToggleInterp(this)">
      Hermite F
    </button>
    <div class="lhi-slider-wrap" id="lhi-k1-wrap">
      <span class="lhi-slider-label">\(k\) = <strong id="lhi-k1-val">1</strong></span>
      <input class="site-slider" type="range" min="1" max="5" step="1" value="1"
             oninput="lhiSlide(this)">
    </div>
  </div>

  <div class="lhi-btn-row">
    <button class="site-btn lhi-interp-btn"
            data-folder="294" data-slider="lhi-k2-wrap"
            data-expr-id="275" data-latex-prefix="k_{2}="
            data-val-id="lhi-k2-val" data-default="2"
            onclick="lhiToggleInterp(this)">
      Hermite G
    </button>
    <div class="lhi-slider-wrap" id="lhi-k2-wrap">
      <span class="lhi-slider-label">\(k\) = <strong id="lhi-k2-val">2</strong></span>
      <input class="site-slider" type="range" min="1" max="5" step="1" value="2"
             oninput="lhiSlide(this)">
    </div>
  </div>

</div>

<style>
  /* Widen the page to give the side panel room */
  .desmos-page-wrap { max-width: 1350px; }

  .lhi-side-note {
    font-size: 0.88rem;
    line-height: 1.65;
    color: #4a5568;
    margin-bottom: 1rem;
  }

  .lhi-stack {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .lhi-label {
    font-weight: bold;
    font-size: 0.85rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Each row holds a button + optional inline slider */
  .lhi-btn-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Narrow buttons to fit the panel */
  .lhi-btn-row .site-btn {
    min-width: 120px;
    flex-shrink: 0;
    padding: 0.5rem 0.9rem;
    font-size: 0.92rem;
    white-space: nowrap;
  }

  .lhi-slider-wrap {
    display: none;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }

  .lhi-slider-label {
    font-size: 0.88rem;
    color: #37474f;
    min-width: 2.8rem;
  }


</style>

<script>
  function lhiSetFull(btn, type) {
    var isLagrange = (type === 'lagrange');
    window.desmosCalc.setExpression({ id: '135', hidden: !isLagrange });
    window.desmosCalc.setExpression({ id: '273', hidden:  isLagrange });
    document.querySelectorAll('.lhi-full-btn').forEach(function (b) {
      b.classList.remove('site-btn--active');
    });
    btn.classList.add('site-btn--active');
  }

  function lhiUpdateFullOpacity() {
    var anyActive = document.querySelector('.lhi-interp-btn.site-btn--active') !== null;
    var opacity = anyActive ? '0.3' : '1';
    window.desmosCalc.setExpression({ id: '124', lineOpacity: opacity });
    window.desmosCalc.setExpression({ id: '131', lineOpacity: opacity });
  }

  function lhiToggleInterp(btn) {
    var isActive  = btn.classList.contains('site-btn--active');
    var folderId  = btn.getAttribute('data-folder');
    var sliderId  = btn.getAttribute('data-slider');
    window.desmosCalc.setExpression({ id: folderId, hidden: isActive });
    btn.classList.toggle('site-btn--active');
    document.getElementById(sliderId).style.display = isActive ? 'none' : 'flex';
    lhiUpdateFullOpacity();
  }

  function lhiSlide(input) {
    var btn       = input.closest('.lhi-btn-row').querySelector('.lhi-interp-btn');
    var exprId    = btn.getAttribute('data-expr-id');
    var prefix    = btn.getAttribute('data-latex-prefix');
    var valId     = btn.getAttribute('data-val-id');
    var val       = parseInt(input.value, 10);
    document.getElementById(valId).textContent = val;
    window.desmosCalc.setExpression({ id: exprId, latex: prefix + val });
  }
</script>

<!--writeup-->

*Write-up coming soon.* (Since derivatives aren't as easy to slide around the page as points and function values, alter these data by clicking "Show Expressions" and changing manually)
