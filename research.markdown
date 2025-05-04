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
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>

---

#### **Current Projects**<br>
I am currently working on researching universally optimal methods for composite minimization. Specifically, we want to allow for heterogeneous components that vary in their level of smoothness (from standard $$L$$-smooth functions with Lipschitz gradients to nonsmooth Lipschitz functions themselves). We further look for where we can benefit from heterogeneous levels of uniform convexity in the components. Future work entails characterizing these dual notions and applying them to novel research on interpolation theorems and performance estimation. 

#### **Papers (preprints)**<br>
- A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions	<a href="https://arxiv.org/abs/2503.07566">arXiv</a>

#### **Slides**<br>

<style>
  .slides {
      display: flex;
      gap: 5em;
  }

  .desmos-gallery-image {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
  }

  .bullet-points {
    display: flex;
    flex-direction: column;
  }

  .first-bullet {
    list-style: none;
    margin: 0;
  }

  .slide {
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

  .slide:hover {
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
</style>

<div class="slides">
  <div class="bullet-points">
      <ul>
          <li>
            <div>
            Presentations on Heterogenous Compositions
            <ul>
                <li>I presented our work for minimizing heterogenous compositions at the Jr MINDS seminar, an event hosted by The Johns Hopkins Mathematical Institute for Data Science (MINDS) encouraging grad students to share their research. Attached are the updated slides I will use for future talks, as well as the original used in the seminar (created using only Tikz!)</li>
            </ul>
            </div>
          </li>
          <li><a href="">Original Jr MINDS slides</a></li>
          <li><a href="">View updated presentation on Google Slides</a></li>
      </ul>
  </div>
  <div class="desmos-gallery-image">
      <a href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing">
      <div class="slide">
        <img src="/assets/images/Heterogeneous_compositions_slide.png" alt="Slides">
      </div>
      </a>
  </div>
</div>