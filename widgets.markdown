---
published: false
layout: splash
title: Widgets
permalink: /widgets/
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/research_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>
  <script>
    // On touch devices, :hover can't be relied on to reveal the caption, so the
    // first tap reveals it (without navigating) and a second tap follows the link.
    (function () {
      var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
      if (!isTouch) return;

      document.querySelectorAll('.demo-picture').forEach(function (picture) {
        var link = picture.closest('a');
        if (!link) return;

        link.addEventListener('click', function (e) {
          if (!picture.classList.contains('is-revealed')) {
            e.preventDefault();
            document.querySelectorAll('.demo-picture.is-revealed').forEach(function (other) {
              other.classList.remove('is-revealed');
            });
            picture.classList.add('is-revealed');
          }
        });
      });

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.demo-picture')) {
          document.querySelectorAll('.demo-picture.is-revealed').forEach(function (other) {
            other.classList.remove('is-revealed');
          });
        }
      });
    })();
  </script>

---

<style>
  .page__content {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 0.5rem;
  }

  .bubble { padding: 1.25rem 1.5rem; }

  /* ── Demo bubble grid (mirrors the Desmos cards on the home page) ── */
  .demo-bubble-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .demo-bubble-grid > .bubble { margin-bottom: 0; }

  .demo-title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-top: 0;
    margin-bottom: 0.6rem;
  }

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
    container-type: inline-size;
  }

  .demo-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .demo-overlay {
    position: absolute;
    inset: 8px;
    background: rgba(255, 255, 255, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 0.85rem;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .demo-picture:hover .demo-overlay { opacity: 1; }
  }

  .demo-picture.is-revealed .demo-overlay { opacity: 1; }

  .demo-overlay p {
    font-size: 0.9rem;
    font-size: clamp(0.85rem, 3.4cqw, 0.95rem);
    line-height: 1.45;
    color: #2a2a2a;
    margin: 0;
    text-align: center;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .demo-bubble-grid { grid-template-columns: 1fr; }
  }
</style>

<div class="bubble">
  <h4><strong>Overview</strong></h4>
  <p>Beyond the <a href="/gallery/">Gallery</a>, I occasionally build small standalone tools that aid my research directly. I find interactive explorations construction, a conjecture, a proof technique, etc. are easier to understand when playing with something "tangible." Below are the widgets built so far.</p>
</div>

<div class="demo-bubble-grid">

  <div class="bubble demo-bubble">
    <div class="demo-title">The Polytope of Optimal Subgradient Methods</div>
    <a href="/widgets/polytope/">
      <div class="demo-picture">
        <img src="/widgets/images/polytope_img.png" alt="The Polytope of Optimal Subgradient Methods">
        <div class="demo-overlay">
          <p>Every minimax optimal subgradient method for Lipschitz, convex minimization can be described dual multipliers in a polytope. Their vertices are of particular interest, corresponding to certain arc diagrams.</p>
        </div>
      </div>
    </a>
  </div>


  <div class="bubble demo-bubble">
    <div class="demo-title">General Optimized Sofa Problem</div>
    <a href="/widgets/optimal-couch/">
      <div class="demo-picture">
        <img src="/widgets/images/couch_img.png" alt="General Optimized Sofa Problem">
        <div class="demo-overlay">
          <p>Recent work has proven Gerver's sofa to be optimal when pivoting around a 90 degree turn. Adjusting this angle alters the optimal construction. This widget displays new lower bounding theory for different regimes.</p>
        </div>
      </div>
    </a>
  </div>


</div>
