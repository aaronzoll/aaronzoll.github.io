---
layout: splash
title: LADE
permalink: /teaching/lade/
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/lade_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>
  <script src="/assets/js/gallery-video-preview.js"></script>
  <script>
    // On touch devices, :hover can't be relied on to trigger the preview, so
    // the first tap reveals it (without navigating) and a second tap follows
    // the link — same mechanic as the main gallery page.
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

  /* Top row: back link on the left, jump-to-demos on the right — same
     "Jump to write-up ↓" idiom as the individual Desmos pages. */
  .page-top-links {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem 1.2rem;
    margin-bottom: 0.6rem;
  }

  .back-link {
    display: inline-block;
    font-size: 0.82rem;
    letter-spacing: 0.03em;
    color: #6b7c8a;
  }

  .jump-link {
    font-size: 0.82rem;
    letter-spacing: 0.03em;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }

  .jump-link:hover {
    text-decoration: none;
    border-bottom-style: solid;
  }

  html { scroll-behavior: smooth; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }

  .course-meta {
    font-size: 0.85rem;
    color: #6b7c8a;
    font-style: italic;
    margin-bottom: 0.8rem;
  }

  /* Syllabus topics: dash markers with a hanging indent, not bullets */
  .syllabus-list {
    list-style: none;
    margin: 1.1rem 0 0;
    padding: 0;
  }

  .syllabus-list li {
    position: relative;
    padding-left: 1.4rem;
    margin-bottom: 0.75rem;
  }

  .syllabus-list li:last-child { margin-bottom: 0; }

  .syllabus-list li::before {
    content: "—";
    position: absolute;
    left: 0;
    color: #6b7c8a;
  }

  /* ── Lecture slide cards ──────────────────────────────────────────────
     Thumbnails live in /assets/LADE/thumbnails/, slide PDFs (or Google
     Slides links) in /assets/LADE/slides/. Until a thumbnail file exists
     the <img> removes itself on error and the lettered fallback shows. */
  /* One lecture per row — slide screenshots are unreadable at grid size */
  .lecture-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 0.75rem;
  }

  .lecture-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 700px;
    margin-inline: auto;
    text-decoration: none;
    color: inherit;
  }

  .lecture-card:hover { text-decoration: none; }

  /* Same wooden frame treatment as the research slides and gallery cards.
     No fixed aspect-ratio here: the slide captures are all slightly
     different shapes (~1.84–1.93), so the frame takes its height from the
     image itself and nothing gets cropped. */
  .lecture-thumb {
    position: relative;
    width: 100%;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
                inset -2px -2px 6px rgba(0, 0, 0, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* In flow (so it sets the frame's height) and above the fallback plate */
  .lecture-thumb img {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.25s ease;
  }

  /* Shown only when the thumbnail image is missing — the image removes
     itself on error, leaving the frame with no in-flow content to size it,
     so give the empty frame a shape of its own. */
  .lecture-thumb:not(:has(img)) { aspect-ratio: 16 / 9; }

  .lecture-thumb-fallback {
    position: absolute;
    inset: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eceff3;
    color: #8a99a7;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (hover: hover) and (pointer: fine) {
    .lecture-card:hover .lecture-thumb img { transform: scale(1.05); }
  }

  .lecture-label {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7c8a;
    margin-top: 0.6rem;
    text-align: center;
  }

  .lecture-title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    color: #3a4f63;
    margin-top: 0.1rem;
    text-align: center;
  }

  /* ── Course Desmos gallery (mirrors /gallery/) ───────────────────────── */
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

  .gallery-picture > .gallery-anim { opacity: 0; }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .gallery-picture > * { transform: scale(1.06); }
    .gallery-card:hover .gallery-picture > .gallery-anim { opacity: 1; }
  }

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

  #demos { scroll-margin-top: 1.5rem; }

  .empty-note {
    font-size: 0.88rem;
    color: #8a99a7;
    font-style: italic;
    text-align: center;
    padding: 1.2rem 0 0.4rem;
  }

  @media (max-width: 520px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .lecture-grid { gap: 1.5rem; }
  }
</style>

<div class="bubble">
  <div class="page-top-links">
    <a class="back-link" href="/teaching/">← Teaching</a>
    <a class="jump-link" href="#demos">Jump to course demos ↓</a>
  </div>
  <h4><strong>Linear Algebra and Differential Equations</strong></h4>
  <hr>
  <div class="course-meta">EN.553.291, Fall 2026</div>
  <p>This course is an introduction to the basic concepts of linear algebra, matrix theory, and
differential equations that are used widely in modern engineering and science. The discussion will be
augmented by topics from linear algebra and the use of computer software (primarily MATLAB).</p>

  <ul class="syllabus-list">
    <li><strong>Linear Algebra:</strong> systems of linear equations, matrices, Reduced Echelon Form (REF),
    consistent matrices, homogeneous matrices, matrix operations, scalar product, norm, linear independence,
    matrix inverses, determinants, null spaces, range, spanning subsets, bases, dimension and rank, orthogonal
    and orthonormal bases, Gram-Schmidt orthogonalization, linear transformations, eigenvalues and
    eigenvectors, characteristic polynomials, complex eigenvalues, diagonalization.</li>
    <li><strong>Differential Equations:</strong> basic DE terminology, separable equations, linear 1st order
    equations, integrating factors, equilibrium and stability, higher-order differential equations, homogeneous
    equations with constant coefficients, undetermined coefficients, variation of parameters, numerical
    solutions, systems of first order differential equations, Laplace transforms.</li>
    <li><strong>Programming:</strong> while this will not be our main focus, you will learn how to perform some
    basic linear algebraic operations with MATLAB, as well as how to solve some differential equations
    numerically.</li>
  </ul>
</div>

<div class="bubble">
  <h4><strong>Lecture Slides</strong></h4>
  <hr>
  <div class="lecture-grid">

    <!-- Template for a lecture card. Duplicate and fill in:
         href           → the slide deck (PDF in /assets/LADE/slides/, or a Google Slides URL)
         img src        → thumbnail PNG in /assets/LADE/thumbnails/
         lecture-label  → "Lecture N"
         lecture-title  → the topic
    -->
    <a class="lecture-card" href="https://docs.google.com/presentation/d/17AkCQE_-MEY0VPi2FgBFRQNAUykRvAZpBjrjaiGxpA8/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 1</span>
        <img src="/assets/LADE/thumbnails/Lecture_1.png" alt="Lecture 1 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 1</span>
      <span class="lecture-title">Systems of Equations</span>
    </a>

    <a class="lecture-card" href="https://docs.google.com/presentation/d/1J2ylDpsMq3ds4j40TziyaDkANi_gXZKLg_eqtFNi_tA/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 2</span>
        <img src="/assets/LADE/thumbnails/Lecture_2.png" alt="Lecture 2 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 2</span>
      <span class="lecture-title">Matrices and Row Operations</span>
    </a>

    <a class="lecture-card" href="https://docs.google.com/presentation/d/1wVbiOxRGltsdX2aqrVYwi--OC_Q3c2CyPKSghCCu4Bo/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 3</span>
        <img src="/assets/LADE/thumbnails/Lecture_3.png" alt="Lecture 3 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 3</span>
      <span class="lecture-title">Logic and Set Theory</span>
    </a>

    <a class="lecture-card" href="https://docs.google.com/presentation/d/1PtVrzlQeDsZHdqhDprHwxGfmJ0d3KcHLjF3sepFLiIo/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 4</span>
        <img src="/assets/LADE/thumbnails/Lecture_4.png" alt="Lecture 4 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 4</span>
      <span class="lecture-title">Homogeneous Systems</span>
    </a>

    <a class="lecture-card" href="https://docs.google.com/presentation/d/1a7yPQxbAvYB_UZM9f0m-eAQGWqkmwgwt3YL8SmyE0zw/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 5</span>
        <img src="/assets/LADE/thumbnails/Lecture_5.png" alt="Lecture 5 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 5</span>
      <span class="lecture-title">Norms, Dot Product, and Matrix Multiplication</span>
    </a>

    <a class="lecture-card" href="https://docs.google.com/presentation/d/1sCqQLmlRnfTkTHotH5mmVW905niC84d4RghnpQhElaQ/edit?usp=drive_link" target="_blank">
      <div class="lecture-thumb">
        <span class="lecture-thumb-fallback">Lecture 6</span>
        <img src="/assets/LADE/thumbnails/Lecture_6.png" alt="Lecture 6 slides" onerror="this.remove()">
      </div>
      <span class="lecture-label">Lecture 6</span>
      <span class="lecture-title">Properties of Matrix Operations</span>
    </a>

  </div>
</div>

<div class="bubble" id="demos">
  <h4><strong>Course Demos</strong></h4>
  <hr>
  <p style="font-size:0.9rem;margin-bottom:0;">Interactive Desmos graphs built for this course. They also appear in the main <a href="/gallery/">Gallery</a>.</p>
  <div class="gallery-grid">

    <!-- Template for a demo card. The graph page itself lives in /desmos/ and
         its JSON in /assets/desmos/json_files/, same as every other demo.

    <a class="gallery-card" href="/desmos/GRAPH-SLUG" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/images/GRAPH.png" alt="Title">
      </div>
      <span class="gallery-title">Title</span>
    </a>

    With a hover animation, add a <video> sibling (see /gallery/):

    <a class="gallery-card" href="/desmos/GRAPH-SLUG" target="_blank">
      <div class="gallery-picture">
        <img class="gallery-static" src="/assets/desmos/gifs/GRAPH_poster.png" alt="Title">
        <video class="gallery-anim" muted playsinline preload="auto" poster="/assets/desmos/gifs/GRAPH_poster.png">
          <source src="/assets/desmos/gifs/GRAPH.mp4" type="video/mp4">
        </video>
      </div>
      <span class="gallery-title">Title</span>
    </a>
    -->

  </div>
  <div class="empty-note">Demos coming soon.</div>
</div>
