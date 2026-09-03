---
layout: splash
title: Gallery
permalink: /gallery/
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/desmos_gallery_background1.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>
  <script src="/widgets/src/couch/coef.js"></script>
  <script src="/widgets/src/couch/sofa-math.js"></script>
  <script src="/assets/js/couch-preview.js"></script>
  <script src="/assets/js/gallery-video-preview.js"></script>
  <script>
    // On touch devices, :hover can't be relied on to trigger the preview, so
    // the first tap reveals it (without navigating) and a second tap follows
    // the link — same mechanic as the home page's demo cards.
    (function () {
      var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
      if (!isTouch) return;

      document.querySelectorAll('.gallery-card').forEach(function (card) {
        card.addEventListener('click', function (e) {
          if (!card.classList.contains('is-revealed')) {
            e.preventDefault();
            document.querySelectorAll('.gallery-card.is-revealed').forEach(function (other) {
              other.classList.remove('is-revealed');
            });
            card.classList.add('is-revealed');
          }
        });
      });

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.gallery-card')) {
          document.querySelectorAll('.gallery-card.is-revealed').forEach(function (other) {
            other.classList.remove('is-revealed');
          });
        }
      });
    })();
  </script>

---

<style>
  .page__content {
    max-width: 1020px;
    margin-inline: auto;
    padding-inline: 0.5rem;
  }

  .bubble { padding: 1.25rem 1.5rem; }


  .gallery-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.75rem 1.5rem;
    max-width: 880px;
    margin: 0.75rem auto 0 auto;
  }

  .gallery-card {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  /* Wooden-frame square thumbnail, same treatment as the home page cards */
  .gallery-picture {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
                inset -2px -2px 6px rgba(0, 0, 0, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Every media layer in a frame — still image, gif, video, the couch's live
     canvas — shares ONE sizing rule and ONE hover transform, so the layers
     stay pixel-aligned no matter what they are. The zoom belongs to the media
     stack as a whole, never to an individual layer: if only one layer scales,
     the larger layer's edges show around the smaller one during the crossfade.
     Opacity is the only thing that may differ between layers. */
  .gallery-picture > img,
  .gallery-picture > canvas,
  .gallery-picture > video {
    position: absolute;
    inset: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  .gallery-picture canvas[hidden] { display: none; }

  /* Animated layer (gif <img> or <video>) stacks directly over the still and
     is revealed by crossfade alone — its geometry already matches. */
  .gallery-picture > .gallery-anim { opacity: 0; }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .gallery-picture > * { transform: scale(1.06); }
    .gallery-card:hover .gallery-picture > .gallery-anim { opacity: 1; }
  }

  /* Touch devices: first tap adds this (see custom_js), standing in for :hover */
  .gallery-card.is-revealed .gallery-picture > * { transform: scale(1.06); }
  .gallery-card.is-revealed .gallery-picture > .gallery-anim { opacity: 1; }

  .gallery-title {
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    margin-top: 0.6rem;
    color: #3a4f63;
  }

  .gallery-section { margin-bottom: 1.5rem; }
  .gallery-section:last-child { margin-bottom: 0; }

  @media (max-width: 600px) {
    .bubble { padding: 1rem; border-radius: 10px; }
  }
</style>


<div class="bubble gallery-section">
  <h4><strong>LADE</strong></h4>
  <div class="gallery-grid">
    <a class="gallery-card" href="/desmos/planes-in-3d" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/3d_planes.png" alt="Planes in 3D"></div>
      <span class="gallery-title">Planes in 3D</span>
    </a>
    <a class="gallery-card" href="/widgets/row-reduce/" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/gaussian_elim.png" alt="Gaussian Elimination"></div>
      <span class="gallery-title">Gaussian Elimination</span>
    </a>
  </div>
</div>

<div class="bubble gallery-section">
  <h4><strong>Research / Convex Analysis</strong></h4>
  <div class="gallery-grid">
    <a class="gallery-card" href="/desmos/interpolation-master" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/interpolation_master_poster.png" alt="Interpolation Master">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/interpolation_master_poster.png">
          <source src="/assets/desmos/gifs/interpolation_master.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Interpolation Master</span>
    </a>
    <a class="gallery-card" href="/desmos/worst-case-gd" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/huber_quad_poster.png" alt="Worst-Case Smooth Gradient Descent">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/huber_quad_poster.png">
          <source src="/assets/desmos/gifs/huber_quad.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Worst-Case Smooth Gradient Descent</span>
    </a>
    <a class="gallery-card" href="/desmos/legendre-transform" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/legendre_demo_poster.png" alt="Legendre Transform Demo">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/legendre_demo_poster.png">
          <source src="/assets/desmos/gifs/legendre_demo.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Legendre Transform Demo</span>
    </a>
    <a class="gallery-card" href="/desmos/inexact-cocoercivity" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/inexact_coco_poster.png" alt="Inexact Cocoercivity Demo">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/inexact_coco_poster.png">
          <source src="/assets/desmos/gifs/inexact_coco.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Inexact Cocoercivity Demo</span>
    </a>
    <a class="gallery-card" href="/desmos/inexact-interpolation" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/inext_interpolation_image.png" alt="Inexactly Smooth Interpolation"></div>
      <span class="gallery-title">Inexactly Smooth Interpolation</span>
    </a>
    <a class="gallery-card" href="/desmos/inexact-construction" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/inexact_construction.png" alt="Inexactly Smooth Construction"></div>
      <span class="gallery-title">Inexactly Smooth Construction</span>
    </a>
    <a class="gallery-card" href="/desmos/smooth-interpolation" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/smooth_interpolation.png" alt="L-Smooth Interpolation"></div>
      <span class="gallery-title">L-Smooth Interpolation</span>
    </a>
    <a class="gallery-card" href="/desmos/p-norm-regularization" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="https://www.desmos.com/calc_thumbs/production/gzragmnctk.png" alt="p-norm regularization"></div>
      <span class="gallery-title">p-norm regularization</span>
    </a>
    <a class="gallery-card" href="/desmos/cocoercivity-demo" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/cocoercivity.png" alt="Visualizing Cocoercivity"></div>
      <span class="gallery-title">Visualizing Cocoercivity</span>
    </a>
    <a class="gallery-card" href="/desmos/strongly-convex" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/strongly_convex.png" alt="Strongly Convex Functions"></div>
      <span class="gallery-title">Strongly Convex Functions</span>
    </a>
    <a class="gallery-card" href="/desmos/L-smooth" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/L_smooth.png" alt="L-smooth Functions"></div>
      <span class="gallery-title">L-smooth Functions</span>
    </a>
  </div>
</div>

<div class="bubble gallery-section">
  <h4><strong>Introduction to Computational Mathematics</strong></h4>
  <div class="gallery-grid">
    <a class="gallery-card" href="/desmos/runge-kutta-2" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/RK_poster.png" alt="Second Order RK Methods">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/RK_poster.png" data-playback-rate="0.35">
          <source src="/assets/desmos/gifs/RK.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Second Order RK Methods</span>
    </a>
    <a class="gallery-card" href="/desmos/finite-diff" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/finite_diff_interp.png" alt="Finite Difference Interpolation"></div>
      <span class="gallery-title">Finite Difference Interpolation</span>
    </a>
    <a class="gallery-card" href="/desmos/lagrange-hermite-interpolation" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/lagrange_hermite_interp.png" alt="Lagrange/Hermite Interpolation"></div>
      <span class="gallery-title">Lagrange/Hermite Interpolation</span>
    </a>
    <a class="gallery-card" href="/desmos/fixed-point" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="https://www.desmos.com/calc_thumbs/production/xwljuznw9j.png" alt="Fixed Point Methods"></div>
      <span class="gallery-title">Fixed Point Methods</span>
    </a>
    <a class="gallery-card" href="/desmos/taylor-series" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/taylor_series.png" alt="Taylor Series"></div>
      <span class="gallery-title">Taylor Series</span>
    </a>
  </div>
</div>

<div class="bubble gallery-section">
  <h4><strong>Directed Reading Program</strong></h4>
  <div class="gallery-grid">
    <a class="gallery-card" href="/desmos/gradient-descent" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/GD.png" alt="Gradient Descent"></div>
      <span class="gallery-title">Gradient Descent</span>
    </a>
    <a class="gallery-card" href="https://www.desmos.com/calculator/oahkt7wzj1" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="https://www.desmos.com/calc_thumbs/production/oahkt7wzj1.png" alt="Armijo Rule"></div>
      <span class="gallery-title">Armijo Rule</span>
    </a>
  </div>
</div>

<div class="bubble gallery-section">
  <h4><strong>Fun / Creative</strong></h4>
  <div class="gallery-grid">
    <a class="gallery-card" href="/desmos/voroni" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/voroni.png" alt="Voronoi Diagrams"></div>
      <span class="gallery-title">Voronoi Diagrams</span>
    </a>
    <a class="gallery-card" href="/desmos/circular-shadow" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/circular_shadow.png" alt="Circular Shadow"></div>
      <span class="gallery-title">Circular Shadow</span>
    </a>
    <a class="gallery-card" href="/desmos/modular-multiplication" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/modular_multiplication_poster.png" alt="Modular Multiplication">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/modular_multiplication_poster.png" data-playback-rate="0.35">
          <source src="/assets/desmos/gifs/Modular_Multiplication.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Modular Multiplication</span>
    </a>
    <a class="gallery-card" href="/widgets/optimal-couch/" target="_blank">
      <div class="gallery-picture" id="couch-gallery-preview">
        <img class="gallery-static" id="couch-preview-fallback" src="/widgets/images/couch_img.png" alt="General Optimized Sofa Problem">
        <canvas class="gallery-static" id="couch-preview-canvas" width="640" height="640" hidden></canvas>
      </div>
      <span class="gallery-title">General Optimized Sofa Problem</span>
    </a>
  </div>
</div>
