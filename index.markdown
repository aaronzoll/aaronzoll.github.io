---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

# bundle exec jekyll serve to run locally
layout: splash
title: Home 
feature_image: "https://picsum.photos/1300/400?image=989"
feature_text: |
  ## Aaron Zoll Personal Website
header:
  overlay_color: "#000"         # Dark overlay to improve text visibility
  overlay_filter: "0.5"         # Opacity of overlay
  overlay_image: "https://picsum.photos/1300/400?image=989"  # Path to your background image
  actions:
    - label: "About Me"
      url: "/about/"
    - label: "Projects"
      url: "/projects/"
    - label: "Contact"
      url: "/contact/"
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



I am a PhD student at <a href="https://engineering.jhu.edu/ams/">The Johns Hopkins University</a> in the department of applied math and statistics. My work primarily focuses in optimization, under the supervision of  <a href="https://www.ams.jhu.edu/~grimmer/">Benjamin Grimmer</a>. 

