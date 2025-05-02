---
layout: splash
title: About Me
permalink: /about/

feature_image: "https://picsum.photos/1300/400?image=989"
feature_text: |
  # About Me
header:
  overlay_color: "#000"         # Dark overlay to improve text visibility
  overlay_filter: "0.5"         # Opacity of overlay
  overlay_image: "https://picsum.photos/1300/400?image=989"  # Path to your background image
  # caption: "Photo by [Unsplash](https://unsplash.com)"
  actions:
    - label: "CV"
      url: "/CV/"
custom_js: |
  <script>
    window.addEventListener('DOMContentLoaded', function () {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    });
  </script>

---

I am a PhD student at <a href="https://engineering.jhu.edu/ams/">The Johns Hopkins University</a> in the department of Applied Math and Statistics. My work primarily focuses in optimization, under the supervision of  <a href="https://www.ams.jhu.edu/~grimmer/">Benjamin Grimmer</a>. In particular, I work on expanding classical theory to apply universally to Lipschitz functions, functions with Lipschitz gradients, and everywhere in between. In a dual notion, my work also focuses on functions that are convex, strongly convex, and anywhere in between. 

