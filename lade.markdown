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

  /* Lectures with no deck yet: rendered as a <div>, not a link, so there is
     nothing to click. Swap in an <a> once the slides exist. */
  .lecture-card--pending { opacity: 0.5; }
  .lecture-card--pending:hover .lecture-thumb img { transform: none; }

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

  /* ── Collapsible lecture folders ──────────────────────────────────────
     Each group is a native <details>, so expand/collapse needs no JS and
     stays keyboard- and screen-reader-accessible for free. Add a group by
     copying a whole <details class="lecture-folder"> block; drop the `open`
     attribute to have it start collapsed.

     ── THEME ──
     Every colour for the folder bars and the Expand/Collapse buttons comes
     from the variables below, so re-theming either half never touches a rule
     body. The two halves are deliberately different palettes: the bars stay
     warm so they read as the same material as the wooden frames beneath them,
     while the buttons use the site's slate blue so they match .pdf-btn and
     .arxiv-btn on Teaching and Research. The alternate value for each bar
     colour is noted beside it. */
  :root {
    /* Folder bars — CREAM / WOOD */
    --lade-edge:         #a67b5b;                   /* slate alt: #7a8fa0 */
    --lade-bar-from:     #faf7f1;                   /* slate alt: #f4f6f8 */
    --lade-bar-to:       #f0e7d8;                   /* slate alt: #dde3ea */
    --lade-bar-from-hov: #f6efe2;                   /* slate alt: #e8edf2 */
    --lade-bar-to-hov:   #e5d5b8;                   /* slate alt: #c8d2dc */
    --lade-ring:         rgba(166, 123, 91, 0.35);  /* slate alt: rgba(122, 143, 160, 0.45) */
    --lade-title:        #4a3316;                   /* slate alt: #3a4f63 */
    --lade-meta:         #8a7a63;                   /* slate alt: #6b7c8a */
    --lade-chevron:      #8a6a45;                   /* slate alt: #5c7085 */

    /* Expand / Collapse buttons — SLATE, the exact .pdf-btn values */
    --lade-btn-bg:       #eceff3;
    --lade-btn-bg-hov:   #dde3ea;
    --lade-btn-bg-act:   #c8d2dc;
    --lade-btn-edge:     #a0aebb;
    --lade-btn-edge-hov: #7a8fa0;
    --lade-btn-edge-act: #556b7d;
    --lade-btn-text:     #3a4f63;
  }

  .lecture-folder {
    border: 1px solid rgba(100, 120, 140, 0.22);
    border-radius: 8px;
    overflow: hidden;
    margin-top: 0.85rem;
  }

  .folder-summary {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.7rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    list-style: none;              /* hides the default disclosure triangle */
    background: linear-gradient(to right, var(--lade-bar-from) 0%, var(--lade-bar-to) 100%);
    border-left: 4px solid var(--lade-edge);
    transition: background 0.2s ease, box-shadow 0.2s ease, padding-left 0.2s ease;
  }

  .folder-summary::-webkit-details-marker { display: none; }

  .folder-summary:hover {
    background: linear-gradient(to right, var(--lade-bar-from-hov) 0%, var(--lade-bar-to-hov) 100%);
    box-shadow: inset 0 0 0 1px var(--lade-ring);
    padding-left: 1.15rem;         /* slides right a touch on hover */
  }

  .folder-summary:focus-visible {
    outline: 2px solid var(--lade-edge);
    outline-offset: -2px;
  }

  /* Chevron points right when closed, down when open */
  .folder-chevron {
    flex-shrink: 0;
    width: 0;
    height: 0;
    border-left: 7px solid var(--lade-chevron);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    transition: transform 0.25s ease;
  }

  .lecture-folder[open] .folder-chevron { transform: rotate(90deg); }

  .folder-title {
    flex: 1;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--lade-title);
  }

  .folder-count {
    flex-shrink: 0;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--lade-meta);
  }

  /* "Linear Algebra" / "Differential Equations" dividers between folder runs */
  .lecture-section {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 1.75rem 0 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b7c8a;
  }

  .lecture-section::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(100, 120, 140, 0.28);
  }

  .lecture-section:first-of-type { margin-top: 0.9rem; }

  /* Expand all / Collapse all */
  .folder-tools {
    display: flex;
    justify-content: flex-end;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .folder-tool-btn {
    padding: 0.3rem 0.8rem;
    font-size: 0.78rem;
    font-family: inherit;
    letter-spacing: 0.03em;
    cursor: pointer;
    color: var(--lade-btn-text);
    background: var(--lade-btn-bg);
    border: 1px solid var(--lade-btn-edge);
    border-radius: 4px;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .folder-tool-btn:hover {
    background: var(--lade-btn-bg-hov);
    border-color: var(--lade-btn-edge-hov);
  }

  .folder-tool-btn:active {
    background: var(--lade-btn-bg-act);
    border-color: var(--lade-btn-edge-act);
  }

  .folder-body { padding: 0.35rem 1rem 1.15rem; }

  .lecture-folder[open] .folder-body { animation: folder-open 0.28s ease; }

  @keyframes folder-open {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .folder-summary,
    .folder-chevron { transition: none; }
    .lecture-folder[open] .folder-body { animation: none; }
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

  <div class="folder-tools">
    <button type="button" class="folder-tool-btn" data-folders="open">Expand all</button>
    <button type="button" class="folder-tool-btn" data-folders="close">Collapse all</button>
  </div>

  <!-- To add a lecture: give the card a real deck by swapping its
       <div class="lecture-card lecture-card--pending"> for
       <a class="lecture-card" href="SLIDES_URL" target="_blank">, and fill in
       the title. Thumbnails are picked up automatically from
       /assets/LADE/thumbnails/Lecture_N.png once the file exists.
       To rename a group, edit its folder-title. -->

  <div class="lecture-section">Linear Algebra</div>

  <details class="lecture-folder" open>
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Matrices and Their Operations</span>
      <span class="folder-count">Lectures 1–6</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

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
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Linear Independence and Span</span>
      <span class="folder-count">Lectures 7–12</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 7</span>
            <img src="/assets/LADE/thumbnails/Lecture_7.png" alt="Lecture 7 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 7</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 8</span>
            <img src="/assets/LADE/thumbnails/Lecture_8.png" alt="Lecture 8 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 8</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 9</span>
            <img src="/assets/LADE/thumbnails/Lecture_9.png" alt="Lecture 9 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 9</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 10</span>
            <img src="/assets/LADE/thumbnails/Lecture_10.png" alt="Lecture 10 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 10</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 11</span>
            <img src="/assets/LADE/thumbnails/Lecture_11.png" alt="Lecture 11 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 11</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 12</span>
            <img src="/assets/LADE/thumbnails/Lecture_12.png" alt="Lecture 12 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 12</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Bases and Subspaces</span>
      <span class="folder-count">Lectures 13–17</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 13</span>
            <img src="/assets/LADE/thumbnails/Lecture_13.png" alt="Lecture 13 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 13</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 14</span>
            <img src="/assets/LADE/thumbnails/Lecture_14.png" alt="Lecture 14 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 14</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 15</span>
            <img src="/assets/LADE/thumbnails/Lecture_15.png" alt="Lecture 15 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 15</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 16</span>
            <img src="/assets/LADE/thumbnails/Lecture_16.png" alt="Lecture 16 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 16</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 17</span>
            <img src="/assets/LADE/thumbnails/Lecture_17.png" alt="Lecture 17 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 17</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Orthogonality and Rotations</span>
      <span class="folder-count">Lectures 18–21</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 18</span>
            <img src="/assets/LADE/thumbnails/Lecture_18.png" alt="Lecture 18 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 18</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 19</span>
            <img src="/assets/LADE/thumbnails/Lecture_19.png" alt="Lecture 19 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 19</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 20</span>
            <img src="/assets/LADE/thumbnails/Lecture_20.png" alt="Lecture 20 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 20</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 21</span>
            <img src="/assets/LADE/thumbnails/Lecture_21.png" alt="Lecture 21 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 21</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Eigenvalues and Spectral Theory</span>
      <span class="folder-count">Lectures 22–27</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 22</span>
            <img src="/assets/LADE/thumbnails/Lecture_22.png" alt="Lecture 22 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 22</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 23</span>
            <img src="/assets/LADE/thumbnails/Lecture_23.png" alt="Lecture 23 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 23</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 24</span>
            <img src="/assets/LADE/thumbnails/Lecture_24.png" alt="Lecture 24 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 24</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 25</span>
            <img src="/assets/LADE/thumbnails/Lecture_25.png" alt="Lecture 25 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 25</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 26</span>
            <img src="/assets/LADE/thumbnails/Lecture_26.png" alt="Lecture 26 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 26</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 27</span>
            <img src="/assets/LADE/thumbnails/Lecture_27.png" alt="Lecture 27 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 27</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <div class="lecture-section">Differential Equations</div>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Linear First-Order ODEs</span>
      <span class="folder-count">Lectures 28–33</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 28</span>
            <img src="/assets/LADE/thumbnails/Lecture_28.png" alt="Lecture 28 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 28</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 29</span>
            <img src="/assets/LADE/thumbnails/Lecture_29.png" alt="Lecture 29 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 29</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 30</span>
            <img src="/assets/LADE/thumbnails/Lecture_30.png" alt="Lecture 30 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 30</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 31</span>
            <img src="/assets/LADE/thumbnails/Lecture_31.png" alt="Lecture 31 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 31</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 32</span>
            <img src="/assets/LADE/thumbnails/Lecture_32.png" alt="Lecture 32 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 32</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 33</span>
            <img src="/assets/LADE/thumbnails/Lecture_33.png" alt="Lecture 33 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 33</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Dynamical Systems and The Laplace Transform</span>
      <span class="folder-count">Lectures 34–39</span>
    </summary>
    <div class="folder-body">
      <div class="lecture-grid">

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 34</span>
            <img src="/assets/LADE/thumbnails/Lecture_34.png" alt="Lecture 34 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 34</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 35</span>
            <img src="/assets/LADE/thumbnails/Lecture_35.png" alt="Lecture 35 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 35</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 36</span>
            <img src="/assets/LADE/thumbnails/Lecture_36.png" alt="Lecture 36 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 36</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 37</span>
            <img src="/assets/LADE/thumbnails/Lecture_37.png" alt="Lecture 37 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 37</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 38</span>
            <img src="/assets/LADE/thumbnails/Lecture_38.png" alt="Lecture 38 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 38</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

        <div class="lecture-card lecture-card--pending">
          <div class="lecture-thumb">
            <span class="lecture-thumb-fallback">Lecture 39</span>
            <img src="/assets/LADE/thumbnails/Lecture_39.png" alt="Lecture 39 slides" onerror="this.remove()">
          </div>
          <span class="lecture-label">Lecture 39</span>
          <span class="lecture-title">Topic TBD</span>
        </div>

      </div>
    </div>
  </details>

  <script>
    // Sits after the buttons and folders, so everything it needs already exists.
    // Folders are queried at click time, so groups added later are picked up too.
    (function () {
      document.querySelectorAll('.folder-tool-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var shouldOpen = btn.dataset.folders === 'open';
          document.querySelectorAll('details.lecture-folder').forEach(function (folder) {
            folder.open = shouldOpen;
          });
        });
      });
    })();
  </script>
</div>

<div class="bubble" id="demos">
  <h4><strong>Course Demos</strong></h4>
  <hr>
  <p style="font-size:0.9rem;margin-bottom:0;">Interactive demos built for this course. They also appear in the main <a href="/gallery/">Gallery</a>.</p>
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

    <a class="gallery-card" href="/desmos/planes-in-3d" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/3d_planes.png" alt="Planes in 3D"></div>
      <span class="gallery-title">Planes in 3D</span>
    </a>

    <a class="gallery-card" href="/desmos/visual_gauss" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/placeholder.svg" alt="Visualizing Gaussian Elimination"></div>
      <span class="gallery-title">Visualizing Gaussian Elimination</span>
    </a>

    <a class="gallery-card" href="/widgets/row-reduce/" target="_blank">
      <div class="gallery-picture"><img class="gallery-static" src="/assets/desmos/images/gaussian_elim.png" alt="Gaussian Elimination"></div>
      <span class="gallery-title">Gaussian Elimination</span>
    </a>

  </div>
</div>
