---
layout: splash
title: Research
permalink: /research/

feature_image: "/assets/images/banner.png"
feature_text: |
  # Research
header:
  overlay_color: "#000"         # Dark overlay to improve text visibility
  overlay_filter: "0.35"         # Opacity of overlay
  overlay_image: "/assets/images/banner.png"  # Path to your background image
  # caption: "Photo by [Unsplash](https://unsplash.com)"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>

---

#### **Current Projects**<br>
My current research aims to construct and design universally optimal methods for minimizing a wide class of functions, bridging the gap between smooth and nonsmooth optimization. 

Previous work has dealt with compositions of Hölder smooth functions, which interpolate the smoothness between Lipschitz functions and those with Lipschitz gradient (typically denoted as "$L$-smooth"). We performed further analysis to incorpate uniform convexity (ranging from plain convexity to strong convexity) into the components as well. Our main contirubutions included a universal sliding method for heterogeneous compositions, as well as two propsoed constants the capture the "aggregate dualized approximate" upper and lower curvature: $L_{\varepsilon,r}^\mathtt{ADA}$ and $\mu_{\varepsilon}^\mathtt{ADA}$.  

Current work aims to further analyze the complexity of first-order algorithms on functions that may only attain an approximate notion of smoothness. Future work will propse new optimized gradient methods, one which is uniformly optimized and paramater free. More to follow in the upcoming months!

#### **Published Papers**<br>

<style>
  .paper-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .paper-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid rgba(139, 90, 43, 0.2);
  }

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
</style>

<div class="paper-list">
  <div class="paper-row">
    <span class="paper-title">A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions<br><em>(IMA Journal of Numerical Analysis)</em></span>
    <a class="arxiv-btn" href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>
  </div>
</div>

#### **Preprints**<br>

<div class="paper-list">
  <div class="paper-row">
    <span class="paper-title">Inexactly Smooth Performance Estimation and New Optimized Gradient Methods</span>
    <a class="arxiv-btn" href="https://arxiv.org/abs/2606.01505" target="_blank">arXiv</a>
  </div>
</div>

##### **Slides**<br>
<style>
  /* Two-column rows: left = bullets, right = image */
  .slides {
    display: grid;
    grid-auto-rows: auto;
    row-gap: 2rem;
  }

  .slide-row {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: 2rem;
    align-items: start; /* top-align image with its bullets */
  }

  .bullet-points {
    display: block; /* no flex needed when using grid rows */
  }

  .desmos-gallery-image {
    display: block;
    margin-left: auto;
  }

  /* Keep your original image card look exactly the same */
  .slide-picture {
    height: 270px;
    width: 470px;
    border-radius: 0;
    border: none;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
  }

  .slide-picture:hover {
    height: 270px;
    width: 470px;
    border-radius: 0;
    border: none;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 5.5px;
    outline: 5px ridge #593302;
  }

  /* Responsive: stack on narrow screens */
  @media (max-width: 900px) {
    .slide-row {
      grid-template-columns: 1fr;
      row-gap: 1rem;
    }
  }

  .slide-heading {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.45rem;
  }

  .venue-list {
    display: flex;
    flex-direction: column;
  }

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

  .venue-item:last-child {
    border-bottom: none;
  }

  .venue-name {
    flex: 1;
  }

  .venue-date {
    flex-shrink: 0;
    font-size: 0.78rem;
    color: #6b7c8a;
    font-style: italic;
    white-space: nowrap;
  }
</style>

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
