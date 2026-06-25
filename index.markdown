---
layout: splash
title: Home
feature_image: "/assets/images/banner.png"
header:
  overlay_color: "#000"
  overlay_filter: "0.35"
  overlay_image: "/assets/images/banner.png"

custom_js: |
  <script>particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="assets/js/particles.js"></script>

---

<style>
  .page__content {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 0.5rem;
  }

  .bubble {
    padding: 1.25rem 1.5rem;
  }

  .paper-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0;
  }

  .paper-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid rgba(139, 90, 43, 0.2);
  }

  .paper-row:last-child { border-bottom: none; }

  .paper-title {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .arxiv-btn {
    flex-shrink: 0;
    display: inline-block;
    padding: 0.3rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: #3a4f63;
    background: #eceff3;
    border: 1px solid #a0aebb;
    border-radius: 4px;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .arxiv-btn:hover {
    background: #dde3ea;
    border-color: #7a8fa0;
    text-decoration: none;
    color: #3a4f63;
  }

  .arxiv-btn:active {
    background: #c8d2dc;
    border-color: #556b7d;
  }

  .featured-demos {
    display: grid;
    grid-auto-rows: auto;
    row-gap: 1.5rem;
  }

  .featured-demo-row {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: 2rem;
    align-items: start;
  }

  .demo-title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
  }

  .demo-blurb {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #4a5568;
    margin: 0;
  }

  .demo-image { display: block; margin-left: auto; }

  .demo-picture {
    height: 270px;
    width: 470px;
    border-radius: 0;
    border: none;
    box-shadow: inset 2px 2px 6px rgba(255,255,255,0.6),
                inset -2px -2px 6px rgba(0,0,0,0.2),
                0 4px 8px rgba(0,0,0,0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
  }

  .demo-picture:hover {
    padding: 5.5px;
    box-shadow: inset 2px 2px 6px rgba(255,255,255,0.6),
                inset -2px -2px 6px rgba(0,0,0,0.2),
                0 4px 8px rgba(0,0,0,0.3);
  }

  .demo-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 900px) {
    .featured-demo-row {
      grid-template-columns: 1fr;
      row-gap: 1rem;
    }
  }
</style>

<div class="bubble">
  <p>I am a PhD student at <a href="https://engineering.jhu.edu/ams/" target="_blank">The Johns Hopkins University</a> in the department of Applied Math and Statistics. My work primarily focuses in optimization, under the supervision of <a href="https://www.ams.jhu.edu/~grimmer/" target="_blank">Benjamin Grimmer</a>. In particular, I work on expanding classical theory to apply universally to Lipschitz functions, functions with Lipschitz gradients, and everywhere in between. In a dual notion, my work also focuses on functions that are convex, strongly convex, and anywhere in between.</p>
  <p>More recent work has focused on the study and development of interpolation theory, performance estimation problems, and the design of optimized algorithms. These tools give rise to understanding two other dual notions: minimax optimal algorithm design and maximin hard problem instances, with families of functions and classes of algorithms playing dual roles.</p>
  <a class="arxiv-btn" href="/assets/CV 2025.pdf" download>Download CV</a>
</div>

<div class="bubble">
  <h4><strong>Selected Papers</strong></h4>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">Inexactly Smooth Performance Estimation and New Optimized Gradient Methods</span>
      <a class="arxiv-btn" href="https://arxiv.org/abs/2606.01505" target="_blank">arXiv</a>
    </div>
    <div class="paper-row">
      <span class="paper-title">A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions<br><em>(IMA Journal of Numerical Analysis)</em></span>
      <a class="arxiv-btn" href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Selected Desmos Visualizations</strong> &nbsp;<small><a href="/DesmosGallery.html">view all →</a></small></h4>
  <div class="featured-demos">

    <div class="featured-demo-row">
      <div class="demo-text">
        <div class="demo-title"><a href="/desmos/runge-kutta-2" target="_blank">Second Order Runge-Kutta Methods</a></div>
        <p class="demo-blurb">Runga Kutta Methods are efficient and practical ways to accurately model a trajectory given information about its underlying vector field. Here we demonstrate multiple classical two-step methods, as well as the general form supplying a class of provably convergent methods. Watch how increasing the number of steps (decreasing the step size) affects the stability of the iteratively built trajectory!</p>
      </div>
      <div class="demo-image">
        <a href="/desmos/runge-kutta-2" target="_blank">
          <div class="demo-picture">
            <img src="/assets/desmos/images/rk2.png" alt="Second Order Runge-Kutta Methods">
          </div>
        </a>
      </div>
    </div>

    <div class="featured-demo-row">
      <div class="demo-text">
        <div class="demo-title"><a href="/desmos/lagrange-hermite-interpolation" target="_blank">Lagrange/Hermite Interpolation</a></div>
        <p class="demo-blurb">Interpolation theory has many applications in data science, optimization, and machine learning. Here, you may explore polynomial interpolation through both Lagrange and Hermite basis functions, the former interpolating points and function values while the latter incorporates derivatives. Toggle between these methods and isolate individual basis polynomials to see how they sum to produce the full interpolant.</p>
      </div>
      <div class="demo-image">
        <a href="/desmos/lagrange-hermite-interpolation" target="_blank">
          <div class="demo-picture">
            <img src="/assets/desmos/images/lagrange_hermite_interp.png" alt="Lagrange/Hermite Interpolation">
          </div>
        </a>
      </div>
    </div>

    <div class="featured-demo-row">
      <div class="demo-text">
        <div class="demo-title"><a href="/desmos/taylor-series" target="_blank">Taylor Series</a></div>
        <p class="demo-blurb">Construct polynomials to approximate smooth functions using perhaps the most important results from calc II. As you increase the degree, you may notice the polynomial converge, but be wary that depending on the function, its radius of convergence may be finite.</p>
      </div>
      <div class="demo-image">
        <a href="/desmos/taylor-series" target="_blank">
          <div class="demo-picture">
            <img src="/assets/desmos/images/taylor_series.png" alt="Taylor Series">
          </div>
        </a>
      </div>
    </div>

    <div class="featured-demo-row">
      <div class="demo-text">
        <div class="demo-title"><a href="/desmos/finite-diff" target="_blank">Finite Difference Interpolation</a></div>
        <p class="demo-blurb">Here you may visualize how finite difference methods approximate derivatives. Compare standard central difference formulas, or interact with custom interpolation nodes to derive general finite difference rules.</p>
      </div>
      <div class="demo-image">
        <a href="/desmos/finite-diff" target="_blank">
          <div class="demo-picture">
            <img src="/assets/desmos/images/finite_diff_interp.png" alt="Finite Difference Interpolation">
          </div>
        </a>
      </div>
    </div>

  </div>
</div>
