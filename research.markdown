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
My current research aims to construct and design universally optipal methods for minimizing a wide class of functions, bridging the gap between smooth and nonsmooth optimization. Previous work has dealt with compositions of Hölder smooth functions, with interpolate the smoothness between Lipschitz functions and those with Lipschitz gradient (typically denoted as "$$L$$-smooth"). Current work aims to further analyze the complexity of first-order algorithms on functions that may only attain an approximate notion of smoothness. 

#### **Papers (preprints)**<br>
- A Universally Optimal Primal-Dual Method for Minimizing Heterogeneous Compositions	<a href="https://arxiv.org/abs/2503.07566" target="_blank">arXiv</a>

##### **Slides**<br>

<style>
  .slides {
    display: flex;
    gap: 2em;
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
</style>

<div class="slides">
  <div class="bullet-points">
      <ul>
          <li>
            <div>
            Presentations on Heterogenous Compositions
            <ul>
              <li>Johns Hopkins <a href="https://sites.google.com/view/ams-grad-seminar" target="_blank">Applied Math and Statistics Student Seminar</a></li>
              <li>Jr MINDS seminar, an event hosted by <a href="https://www.minds.jhu.edu/" target="_blank">The Johns Hopkins Mathematical Institute for Data Science (MINDS)</a> encouraging grad students to share their research. </li>
            </ul>
            </div>
          </li>

      </ul>
  </div>
  <div class="desmos-gallery-image">
      <a href="https://docs.google.com/presentation/d/1tWwSVU1H9AicJsRl5ckGGWJNYubuAOYnmS248aNhD9s/edit?usp=sharing" target="_blank">
      <div class="slide-picture">
        <img src="/assets/images/Heterogeneous_compositions_slide.png" alt="Slides">
      </div>
      </a>
  </div>
</div>