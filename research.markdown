---
layout: splash
title: Research
permalink: /research/

feature_image: "https://picsum.photos/1300/400?image=989"
feature_text: |
  # Research
header:
  overlay_color: "#000"         # Dark overlay to improve text visibility
  overlay_filter: "0.5"         # Opacity of overlay
  overlay_image: "https://picsum.photos/1300/400?image=989"  # Path to your background image
  # caption: "Photo by [Unsplash](https://unsplash.com)"

---

#### **Current Projects**<br>
I am currently working on researching universally optimal methods for composite minimization. Specifically, we want to allow for heterogeneous components that vary in their level of smoothness (from standard $$L$$-smooth functions with Lipschitz gradients to nonsmooth Lipschitz functions themselves). We further look for where we can benefit from heterogeneous levels of uniform convexity in the components. Future work entails characterizing these dual notions and applying them to novel research on interpolation theorems and performance estimation. 

#### **Papers (preprints)**<br>
- A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions	<a href="https://arxiv.org/abs/2503.07566">arXiv</a>

#### **Slides**<br>

- Presentations on Heterogenous Compositions
<style>
  .desmos-gallery {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1300px;
    margin: 0 auto;
    padding: 1rem 3rem;
  }

  .desmos-gallery-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .desmos-gallery-text {
    flex: 1;
    min-width: 280px;
    max-width: 600px;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .desmos-gallery-text ul {
    padding-left: 0;
  }

  .desmos-gallery-image {
    flex: 1;
    min-width: 280px;
    display: flex;
    justify-content: center;
  }

  .desmos-gallery-image img {
    height: 270px;
    width: 480px;
    border-radius: 0;
    border: none;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
  }


  .desmos-gallery-text a {
    text-decoration: underline;
    color: rgba(94,143,163,255);
  }

  .desmos-gallery-text a:hover {
    color: rgba(54,103,123,255);
  }
</style>

<div class="desmos-gallery">

  <div class="desmos-gallery-item">
    <div class="desmos-gallery-text">
      <p>
        I presented our work for minimizing heterogenous compositions at the Jr MINDS seminar, an event hosted by <a href="https://www.minds.jhu.edu/">The Johns Hopkins Mathematical Institute for Data Science (MINDS)</a> encouraging grad students to share their research. Attached are the updated slides I will use for future talks, as well as the original used in the seminar (created using only Tikz!)
      </p>
      <ul>
         <li><a href="/assets/Jr_MINDS_Presentation_3_8.pdf">Original Jr MINDS slides</a></li>
        <li><a href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing">View updated presentation on Google Slides</a></li>
      </ul>
    </div>
    <div class="desmos-gallery-image">
      <a href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing">
        <img src="/assets/images/Heterogeneous_compositions_slide.png" alt="Slides">
      </a>
    </div>
  </div>

  <!-- Future entries just copy this .desmos-gallery-item structure -->
</div>