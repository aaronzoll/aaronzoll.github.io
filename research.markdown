---
layout: splash
title: Research
permalink: /research/

header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/research_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>

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

  .slides {
    display: grid;
    grid-auto-rows: auto;
    row-gap: 1.5rem;
  }

  .slide-row {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: 2rem;
    align-items: start;
  }

  /* min-width: 0 prevents grid children from overflowing their cell */
  .slide-row > * { min-width: 0; }

  /* ↓ To resize the frames: adjust max-width (width) and the aspect-ratio (height proportional) */
  .slide-picture {
    width: 100%;
    max-width: 480px;      /* ← frame width cap */
    aspect-ratio: 47 / 27; /* ← maintains original 470×270 proportions */
    border-radius: 0;
    border: none;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
                inset -2px -2px 6px rgba(0, 0, 0, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
    box-sizing: border-box;
  }

  .slide-picture:hover {
    padding: 5.5px;
    outline: 5px ridge #593302;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
                inset -2px -2px 6px rgba(0, 0, 0, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
  }

  .slide-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .desmos-gallery-image { display: block; margin-left: auto; min-width: 0; }

  /* Collapse to single column when viewport is too narrow for side-by-side */
  @media (max-width: 750px) {
    .slide-row {
      grid-template-columns: 1fr;
      row-gap: 1rem;
    }
    .desmos-gallery-image { margin-left: 0; }
  }

  /* Mobile: reduce bubble padding so frames don't clip */
  @media (max-width: 500px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .slide-picture { max-width: 100%; }
  }

  .slide-heading {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.45rem;
  }

  .venue-list { display: flex; flex-direction: column; }

  .venue-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.22rem 0.5rem;
    font-size: 0.88rem;
    line-height: 1.4;
    border-bottom: 1px solid rgba(100, 120, 140, 0.15);
  }

  .venue-item:last-child { border-bottom: none; }
  .venue-name { flex: 1; }

  .venue-date {
    flex-shrink: 0;
    font-size: 0.78rem;
    color: #6b7c8a;
    font-style: italic;
    white-space: nowrap;
  }
</style>

<div class="bubble">
  <h4><strong>Overview of My Research</strong></h4>
  <p>My current research focuses on designing, characterizing, and classifying optimal methods for convex minimization. Given an algorithm (e.g. gradient descent), one may analyze the worst-case performance among a set of problem instances (e.g. convex functions with Lipschitz gradient). Classical results give proofs of convergence guarantees. Performance estimation optimizes these proofs. Algorithm design optimizes these methods.  </p>
  <p>A recent and related interest of mine has aligned with interpolation theory: what conditions are needed for a set of observations (points, function values, gradients, etc.) to be the data of a function in some structured class? Answering these questions often yields a tractable way to analyze the performance of a given algorithm, while providing insight into the geometry of the aforementioned structure. Regardless, they make for fun <a href="/desmos/interpolation-master target=" target="_blank">interactive graphs</a>.</p>
  <p>Previously, I have worked on designing methods for function possessing varying levels of smoothness, interpolating the smoothness between Lipschitz functions and those with Lipschitz gradient. My first paper focused on <i>heterogeneous</i> compositions of such functions; each component could vary in its smoothness. Dually, each component could range in its convexity (ranging from standard convexity to strong convexity). Our main contirubutions provide universal algorithms which only take as function parameters two constants $L_{\varepsilon,r}^\mathtt{ADA}$ and $\mu_{\varepsilon}^\mathtt{ADA}$, agreggating all the upper and lower bounding curvature.</p>

</div>

<div class="bubble">
  <h4><strong>Published Papers</strong></h4>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions<br><em>(IMA Journal of Numerical Analysis)</em></span>
      <a class="arxiv-btn" href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Preprints</strong></h4>
  <div class="paper-list">
    <div class="paper-row">
      <span class="paper-title">Inexactly Smooth Performance Estimation and New Optimized Gradient Methods</span>
      <a class="arxiv-btn" href="https://arxiv.org/abs/2606.01505" target="_blank">arXiv</a>
    </div>
  </div>
</div>

<div class="bubble">
  <h4><strong>Slides</strong></h4>
  <p style="font-size:0.9rem;margin-bottom:1rem;">Feel free to use my <a href="/chalk-studio">chalk studio</a> to generate custom text, math, or images for your presentations.</p>
  <div class="slides">
    <div class="slide-row">
      <div class="bullet-points">
        <div class="slide-heading"><u>Presentations on Interpolation Theory</u></div>
        <div class="venue-list">
          <div class="venue-item">
            <span class="venue-name">Clayton High School — <i>Algebra and Number Theory</i> Guest Lecture</span>
            <span class="venue-date">Apr. 2026</span>
          </div>
          <div class="venue-item">
            <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Math and Statistics Student Seminar</a></span>
            <span class="venue-date">Mar. 2026</span>
          </div>
        </div>
      </div>
      <div class="desmos-gallery-image">
        <a href="https://docs.google.com/presentation/d/11OjqlDINoyHqIRI7ClheWBPZTmvWhorgGzZRbd6ZrUg/edit?usp=sharing">
          <div class="slide-picture">
            <img src="/assets/images/interpolation_theory_slide.png" alt="Slides">
          </div>
        </a>
      </div>
    </div>
    <div class="slide-row">
      <div class="bullet-points">
        <div class="slide-heading"><u>Presentations on Inexactly Smooth Performance Estimation</u></div>
        <div class="venue-list">
          <div class="venue-item">
            <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Math and Statistics Student Seminar</a></span>
            <span class="venue-date">Sept. 2025</span>
          </div>
          <div class="venue-item">
            <span class="venue-name"><a href="https://meetings.informs.org/wordpress/annual" target="_blank">INFORMS Annual Meeting</a></span>
            <span class="venue-date">Oct. 2025</span>
          </div>
          <div class="venue-item">
            <span class="venue-name"><a href="https://www.minds.jhu.edu/" target="_blank">Jr MINDS Seminar</a>, Johns Hopkins Mathematical Institute for Data Science</span>
            <span class="venue-date">Nov. 2025</span>
          </div>
          <div class="venue-item">
            <span class="venue-name"><a href="https://www.minds.jhu.edu/" target="_blank">Modeling and Optimization: Theory and Applications (MOPTA)</a>, Lehigh University</span>
            <span class="venue-date">Aug. 2026</span>
          </div>
        </div>
      </div>
      <div class="desmos-gallery-image">
        <a href="https://docs.google.com/presentation/d/16-uQ_1_5pgzji-R4n-FNhOw6n-XYtm5olD0_tYGngIs/edit?usp=sharing">
          <div class="slide-picture">
            <img src="/assets/images/Informs_slides.png" alt="Slides">
          </div>
        </a>
      </div>
    </div>
    <div class="slide-row">
      <div class="bullet-points">
        <div class="slide-heading"><u>Presentations on Heterogenous Compositions</u></div>
        <div class="venue-list">
          <div class="venue-item">
            <span class="venue-name">Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Math and Statistics Student Seminar</a></span>
            <span class="venue-date">Mar. 2025</span>
          </div>
          <div class="venue-item">
            <span class="venue-name"><a href="https://www.minds.jhu.edu/" target="_blank">Jr MINDS Seminar</a>, Johns Hopkins Mathematical Institute for Data Science</span>
            <span class="venue-date">Apr. 2025</span>
          </div>
          <div class="venue-item">
            <span class="venue-name">International Conference on Continuous Optimization <a href="https://sites.google.com/view/iccopt2025/home" target="_blank">(ICCOPT)</a></span>
            <span class="venue-date">Aug. 2025</span>
          </div>
        </div>
      </div>
      <div class="desmos-gallery-image">
        <a href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing" target="_blank">
          <div class="slide-picture">
            <img src="/assets/images/Heterogeneous_compositions_slide.png" alt="Slides">
          </div>
        </a>
      </div>
    </div>

  </div>
</div>
