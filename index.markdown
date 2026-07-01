---
layout: splash
title: Aaron Zoll
feature_image: "/assets/images/banner.png"
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/about_banner.png"

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

  .bubble { padding: 1.25rem 1.5rem; }

  /* ── Intro: circular photo + about text ─────────────────── */
  .intro-inner {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .profile-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.18);
    border: 3px solid rgba(139, 90, 43, 0.25);
  }

  .intro-text h4 { margin-top: 0; }

  /* ── Papers ─────────────────────────────────────────────── */
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

  /* ── Desmos section label ───────────────────────────────── */
  .desmos-section-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
    padding: 0 0.25rem;
  }

  .desmos-section-label h4 { margin: 0; }

  /* ── Demo bubble grid ──────────────────────────────────────── */
  .demo-bubble-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .demo-bubble-grid > .bubble { margin-bottom: 0; }

  /* ── Demo card internals ────────────────────────────────── */
  .demo-title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-top: 0;
    margin-bottom: 0.6rem;
  }

  /* Frame + hover overlay container */
  .demo-picture {
    position: relative;
    width: 100%;
    margin-top: 0.9rem;
    aspect-ratio: 47 / 27;
    box-shadow: inset 2px 2px 6px rgba(255,255,255,0.6),
                inset -2px -2px 6px rgba(0,0,0,0.2),
                0 4px 8px rgba(0,0,0,0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
    box-sizing: border-box;
    overflow: hidden;
  }

  .demo-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .demo-overlay {
    position: absolute;
    inset: 8px; /* sits inside the frame padding, over the image */
    background: rgba(255, 255, 255, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 0.85rem;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  .demo-picture:hover .demo-overlay { opacity: 1; }

  .demo-overlay p {
    font-size: 0.8rem;
    line-height: 1.45;
    color: #2a2a2a;
    margin: 0;
    text-align: center;
    overflow: hidden;
  }

  .cv-button-holder {
    display: flex;
    justify-content: left;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── Responsive ─────────────────────────────────────────── */
  @media (max-width: 600px) {
    .intro-inner { flex-direction: column; align-items: center; text-align: center; }
    .profile-photo { width: 160px; height: 160px; }
    .bubble { padding: 1rem; border-radius: 10px; }
.demo-bubble-grid { grid-template-columns: 1fr; }
  }
</style>

<div class="bubble">
  <div class="intro-inner">
    <img class="profile-photo" src="/assets/images/about_image.jpg" alt="Aaron Zoll">
    <div class="intro-text">
      <h4><strong>About Me</strong></h4>
      <p>I am a PhD student at <a href="https://engineering.jhu.edu/ams/" target="_blank">The Johns Hopkins University</a> in the department of Applied Math and Statistics. My work primarily focuses in optimization, under the supervision of <a href="https://www.ams.jhu.edu/~grimmer/" target="_blank">Benjamin Grimmer</a>. My work primarily focuses on the algorithm design and analysis. In particular, I work on expanding classical optimization theory to apply universally to Lipschitz functions, functions with Lipschitz gradient, and everywhere in between. Dually, my work sometimes considers functions exhibiting strong convexity, simple convexity, or anywhere in between.</p>
      <p>Below are a few selected papers, unifying calculus results and algorithm design for a wide range of function classes. Further below, I give selections from my Desmos Gallery, a series of interactive graphs. Feel free to experiment and play; I hope these are as fun to interact with as they were to create.</p>
      <div class="cv-button-holder">
        <a class="arxiv-btn" href="/cv" target = "_blank">Curriculum Vitae</a>
        <a class="arxiv-btn" href="https://www.linkedin.com/in/aaron-zoll/" target = "_blank">LinkedIn</a>
        <a class="arxiv-btn" href="/DesmosGallery.html" target = "_blank">Desmos Gallery</a>
        <a class="arxiv-btn" href="mailto:azoll1@jh.edu">Email</a>
      </div>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Selected Papers</strong></h4>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">Inexactly Smooth Performance Estimation and New Optimized Gradient Methods</span>
      <div style="display:flex;gap:0.4rem;flex-shrink:0;">
        <a class="arxiv-btn" href="https://docs.google.com/presentation/d/16-uQ_1_5pgzji-R4n-FNhOw6n-XYtm5olD0_tYGngIs/edit?usp=sharing" target="_blank">slides</a>
        <a class="arxiv-btn" href="https://arxiv.org/abs/2606.01505" target="_blank">arXiv</a>
      </div>
    </div>
    <div class="paper-row">
      <span class="paper-title">A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions<br><em>(IMA Journal of Numerical Analysis)</em></span>
      <div style="display:flex;gap:0.4rem;flex-shrink:0;">
        <a class="arxiv-btn" href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing" target="_blank">slides</a>
        <a class="arxiv-btn" href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>
      </div>
    </div>
  </div>
</div>



<div class="demo-bubble-grid">

  <div class="bubble demo-bubble">
    <div class="demo-title">Second Order Runge-Kutta Methods</div>
    <a href="/desmos/runge-kutta-2" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/rk2.png" alt="Second Order Runge-Kutta Methods">
        <div class="demo-overlay">
          <p>Runga Kutta Methods efficiently and accurately model a trajectory given information about its underlying vector field. Here we demonstrate multiple two-step methods. Watch how decreasing the step size affects the stability of the iteratively built trajectory.</p>
        </div>
      </div>
    </a>
  </div>




  <div class="bubble demo-bubble">
    <div class="demo-title">Finite Difference Interpolation</div>
    <a href="/desmos/finite-diff" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/finite_diff_interp.png" alt="Finite Difference Interpolation">
        <div class="demo-overlay">
          <p>Here you may visualize how finite difference methods approximate derivatives. Compare standard central difference formulas, or interact with custom interpolation nodes to derive general finite difference rules.</p>
        </div>
      </div>
    </a>
  </div>



  <div class="bubble demo-bubble">
    <div class="demo-title">Lagrange/Hermite Interpolation</div>
    <a href="/desmos/lagrange-hermite-interpolation" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/lagrange_hermite_interp.png" alt="Lagrange/Hermite Interpolation">
        <div class="demo-overlay">
          <p>Here, you may explore polynomial interpolation through both Lagrange and Hermite basis functions, the former interpolating points and function values while the latter incorporates derivatives. Toggle these methods and isolate individual basis polynomials to see how they sum to produce the full interpolant.</p>
        </div>
      </div>
    </a>
  </div>

  <div class="bubble demo-bubble">
    <div class="demo-title">Voronoi Diagrams</div>
    <a href="/desmos/voroni" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/voroni.png" alt="Voronoi Diagrams">
        <div class="demo-overlay">
          <p>Given a set of points, we may partition the plane by considering which sections are closest to each node. Changing our metric alters these partitions. Watch these regions grow and morph into a beautiful partition.</p>
        </div>
      </div>
    </a>
  </div>


  <div class="bubble demo-bubble">
    <div class="demo-title">Taylor Series</div>
    <a href="/desmos/taylor-series" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/taylor_series.png" alt="Taylor Series">
        <div class="demo-overlay">
          <p>Construct polynomials to approximate smooth functions using perhaps the most important results from calc II. As you increase the degree, you may notice the polynomial converge, but be wary that depending on the function, its radius of convergence may be finite.</p>
        </div>
      </div>
    </a>
  </div>



  <div class="bubble demo-bubble">
    <div class="demo-title">Circular Shadows and Slices in p-norm Balls</div>
    <a href="/desmos/circular-shadow" target="_blank">
      <div class="demo-picture">
        <img src="/assets/desmos/images/circular_shadow.png" alt="Circular Shadows">
        <div class="demo-overlay">
          <p>The shadow of a Euclidean ball is always circular. However, in a different metric, this projection may differ. Surprisingly, there exists another \(p\)-norm ball with circular projection. Dually, there exists another \(q\)-norm ball with a circular cross section.</p>
        </div>
      </div>
    </a>
  </div>

</div>

<div class="desmos-section-label">
  <h4></h4>
  <small><a href="/DesmosGallery.html">view all →</a></small>
</div>