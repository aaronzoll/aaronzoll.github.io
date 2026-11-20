---
layout: splash
title: Data Analytics Workshop
permalink: /teaching/data-analytics/
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/teaching_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>

---

<style>
  .page__content {
    max-width: 1020px;
    margin-inline: auto;
    padding-inline: 0.5rem;
  }

  .bubble { padding: 1.25rem 1.5rem; }

  /* Top row: back link on the left, jump links on the right (same idiom as /teaching/lade/) */
  .page-top-links {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem 1.2rem;
    margin-bottom: 0.6rem;
  }

  .jump-links { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; }

  .back-link {
    display: inline-block;
    font-size: 0.82rem;
    letter-spacing: 0.03em;
    color: var(--color-slate-mute);
  }

  .jump-link {
    font-size: 0.82rem;
    letter-spacing: 0.03em;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }

  .jump-link:hover { text-decoration: none; border-bottom-style: solid; }

  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

  #notes, #discussions, #simulations { scroll-margin-top: 1.5rem; }

  .course-meta {
    font-size: 0.85rem;
    color: var(--color-slate-mute);
    font-style: italic;
    margin-bottom: 0.8rem;
  }

  /* Syllabus topics: dash markers with a hanging indent, not bullets */
  .syllabus-list { list-style: none; margin: 1.1rem 0 0; padding: 0; }
  .syllabus-list li { position: relative; padding-left: 1.4rem; margin-bottom: 0.75rem; }
  .syllabus-list li:last-child { margin-bottom: 0; }
  .syllabus-list li::before {
    content: "—";
    position: absolute;
    left: 0;
    color: var(--color-slate-mute);
  }

  .section-intro { font-size: 0.9rem; margin-bottom: 0; }

  .notes-group { margin-top: 1.4rem; }
  .notes-heading { font-weight: 600; font-size: 0.95rem; margin-bottom: 0.45rem; }

  /* ── Collapsible week folders (same look as /teaching/lade/) ─────────── */
  :root {
    --da-edge:         var(--color-wood);
    --da-bar-from:     #faf7f1;
    --da-bar-to:       #f0e7d8;
    --da-bar-from-hov: #f6efe2;
    --da-bar-to-hov:   #e5d5b8;
    --da-ring:         rgba(var(--color-wood-rgb), 0.35);
    --da-title:        #4a3316;
    --da-meta:         #8a7a63;
    --da-chevron:      #8a6a45;
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
    list-style: none;
    background: linear-gradient(to right, var(--da-bar-from) 0%, var(--da-bar-to) 100%);
    border-left: 4px solid var(--da-edge);
    transition: background 0.2s ease, box-shadow 0.2s ease, padding-left 0.2s ease;
  }

  .folder-summary::-webkit-details-marker { display: none; }

  .folder-summary:hover {
    background: linear-gradient(to right, var(--da-bar-from-hov) 0%, var(--da-bar-to-hov) 100%);
    box-shadow: inset 0 0 0 1px var(--da-ring);
    padding-left: 1.15rem;
  }

  .folder-summary:focus-visible { outline: 2px solid var(--da-edge); outline-offset: -2px; }

  .folder-chevron {
    flex-shrink: 0;
    width: 0;
    height: 0;
    border-left: 7px solid var(--da-chevron);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    transition: transform 0.25s ease;
  }

  .lecture-folder[open] .folder-chevron { transform: rotate(90deg); }

  .folder-title { flex: 1; font-weight: 600; font-size: 0.95rem; color: var(--da-title); }
  .folder-count { flex-shrink: 0; font-size: 0.78rem; letter-spacing: 0.04em; color: var(--da-meta); }

  .folder-body { padding: 0.5rem 1rem 0.9rem; }
  .lecture-folder[open] .folder-body { animation: folder-open 0.28s ease; }

  @keyframes folder-open {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .folder-summary, .folder-chevron { transition: none; }
    .lecture-folder[open] .folder-body { animation: none; }
  }

  /* ── Note / discussion rows (same as the lecture-notes rows on /teaching/) ── */
  .note-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 1px solid rgba(100, 120, 140, 0.15);
  }

  .note-row:last-child { border-bottom: none; }
  .note-name { flex: 1; }

  .note-day {
    display: inline-block;
    min-width: 3.6rem;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: var(--color-slate-mute);
  }

  .note-blurb {
    display: block;
    font-size: 0.82rem;
    color: var(--color-slate-mute);
    margin-top: 0.15rem;
  }

  .note-btns { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.4rem; flex-shrink: 0; }

  .pdf-btn {
    flex-shrink: 0;
    display: inline-block;
    padding: 0.3rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--color-slate);
    background: var(--color-slate-btn-bg);
    border: 1px solid var(--color-slate-btn-border);
    border-radius: 4px;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .pdf-btn:hover {
    background: var(--color-slate-btn-bg-hover);
    border-color: var(--color-slate-btn-border-hover);
    text-decoration: none;
    color: var(--color-slate);
  }

  .pdf-btn:active {
    background: var(--color-slate-btn-bg-active);
    border-color: var(--color-slate-btn-border-active);
  }

  /* Notes not posted yet: a <span>, not a link, so there is nothing to click.
     Swap it for <a class="pdf-btn" href="..."> once the file exists. */
  .pdf-btn--pending { opacity: 0.45; cursor: default; }
  .pdf-btn--pending:hover {
    background: var(--color-slate-btn-bg);
    border-color: var(--color-slate-btn-border);
  }

  /* ── Simulation cards (mirrors /gallery/ and the LADE demos) ─────────── */
  .gallery-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.75rem 1.5rem;
    max-width: 880px;
    margin: 1rem auto 0 auto;
  }

  .gallery-card {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .gallery-card:hover { text-decoration: none; }

  .gallery-picture {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    box-shadow: inset 2px 2px 6px rgba(255, 255, 255, 0.6),
                inset -2px -2px 6px rgba(0, 0, 0, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, var(--color-wood-gradient), var(--color-wood));
    padding: 8px;
    outline: 5px ridge var(--color-wood-deep);
    box-sizing: border-box;
    overflow: hidden;
  }

  .gallery-picture > img {
    position: absolute;
    inset: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease;
  }

  .gallery-picture--pixel > img { image-rendering: pixelated; }

  @media (hover: hover) and (pointer: fine) {
    .gallery-card:hover .gallery-picture > img { transform: scale(1.06); }
  }

  .gallery-title {
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    margin-top: 0.6rem;
    color: var(--color-slate);
  }

  .gallery-sub {
    font-size: 0.78rem;
    color: var(--color-slate-mute);
    font-style: italic;
    text-align: center;
  }

  .subhead {
    font-weight: 600;
    font-size: 0.95rem;
    margin: 1.8rem 0 0.35rem;
  }

  @media (max-width: 560px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .note-row { flex-direction: column; align-items: flex-start; gap: 0.45rem; }
    .note-btns { justify-content: flex-start; }
  }
</style>

<div class="bubble">
  <div class="page-top-links">
    <a class="back-link" href="/teaching/">← Teaching</a>
    <span class="jump-links">
      <a class="jump-link" href="#notes">Lecture notes ↓</a>
      <a class="jump-link" href="#discussions">Discussions ↓</a>
      <a class="jump-link" href="#simulations">Simulations ↓</a>
    </span>
  </div>
  <h4><strong>Data Analytics Workshop</strong></h4>
  <hr>
  <div class="course-meta">AS.110.100, Johns Hopkins pre-college program. Developed Spring 2023; taught Summers 2023–2026</div>
  <p>A two-week, fully online and asynchronous course for high school students. Working in small groups,
  students choose a real data set of their own (around a thousand rows or more), then clean,
  hypothesize, visualize it, and finish by presenting what they found. Along the way we will discuss the mathematics underneath: summary statistics, probability, distributions, and the basics of
  hypothesis testing and regression. All of the hands-on work happens in Microsoft Excel, and no background
  beyond some algebra is assumed.</p>

  <ul class="syllabus-list">
    <li><strong>Describing data:</strong> sets, functions, and modeling; sigma notation; mean, median, mode,
    quartiles, variance, standard deviation, and the standard error of the mean; outliers and cleaning a data set.</li>
    <li><strong>Randomness and distributions:</strong> data as random variables, sampling, discrete and continuous
    distributions, the uniform and normal distributions, independence, conditional probability, and expected value.</li>
    <li><strong>Asking questions of data:</strong> forming meaningful hypotheses, correlation versus causation,
    choosing the right visual, regression, and the ethics and misuse of statistics.</li>
    <li><strong>Excel:</strong> formatting and formulas, sampling, histograms, bar charts with error bars, and
    scatterplots, practiced in four guided worksheets and used throughout the group project.</li>
  </ul>
</div>

<div class="bubble" id="notes">
  <h4><strong>Lecture Notes</strong></h4>
  <hr>
  <p class="section-intro">Typed notes for each day's lectures. </p>

  <!-- To add a day: copy a note-row into its week's folder-body and point it at assets/Data_Analytics_Workshop/notes/day_N.pdf/.zip.
       Anything under assets/Data_Analytics_Workshop/admin/ is git-ignored, so keep public files out of it. -->

  <details class="lecture-folder" open>
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Week 1: Data, Distributions, and Questions</span>
      <span class="folder-count">Days 1–5</span>
    </summary>
    <div class="folder-body">
    <div class="note-row">
      <span class="note-name">Day 1 - Sets, Functions, and Sigma Notation</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_1.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_1.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 2 - Data, Sampling, and Statistics</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_2.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_2.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 3 - Distributions and Outliers</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_3.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_3.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 4 - Center, Spread, and Standard Error</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_4.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_4.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 5 - Questions, Hypotheses, and Correlation</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_5.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_5.zip" target="_blank">.zip</a>
      </div>
    </div>
    </div>
  </details>

  <details class="lecture-folder">
    <summary class="folder-summary">
      <span class="folder-chevron" aria-hidden="true"></span>
      <span class="folder-title">Week 2: Probability, Visuals, and Expected Value</span>
      <span class="folder-count">Days 6–8</span>
    </summary>
    <div class="folder-body">
    <div class="note-row">
      <span class="note-name">Day 6 - Probability and Conditional Probability</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_6.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_6.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 7 - Visualizing Results</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_7.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_7.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Day 8 - Expected Value</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_8.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/day_8.zip" target="_blank">.zip</a>
      </div>
    </div>
    </div>
  </details>

  <div class="notes-group">
    <div class="notes-heading">Collected Notes</div>
    <div class="note-row">
      <span class="note-name">All Lecture Notes (Days 1–8)</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/lecture_notes_all.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/lecture_notes_all.zip" target="_blank">.zip</a>
      </div>
    </div>
    <div class="note-row">
      <span class="note-name">Excel Notes</span>
      <div class="note-btns">
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/excel_notes.pdf" target="_blank">.pdf</a>
        <a class="pdf-btn" href="/assets/Data_Analytics_Workshop/notes/excel_notes.zip" target="_blank">.zip</a>
      </div>
    </div>
  </div>
</div>

<div class="bubble" id="discussions">
  <h4><strong>Discussions</strong></h4>
  <hr>
  <p class="section-intro">Discussion boards run alongside the project. Each asks for an initial post and replies to classmates a day later.</p>

  <div style="margin-top:0.75rem;">
    <!-- Hidden while the Pixel Explorer is broken; uncomment to restore.
    <div class="note-row">
      <span class="note-name"><span class="note-day">Day 2</span> <strong>Data Visualization</strong>
        <span class="note-blurb">A photo is a grid of red, green, and blue values. Histograms, bar charts, and scatter plots of those pixel values introduce what each kind of chart is good for.</span>
      </span>
      <div class="note-btns">
        <a class="pdf-btn" href="/widgets/pixel-explorer/">Pixel Explorer</a>
      </div>
    </div>
    -->

    <div class="note-row">
      <span class="note-name"><span class="note-day">Day 8</span> <strong>Back-Breaking Straws and Expected Value</strong>
        <span class="note-blurb">Straws weighing 0 to 20 lb go on a camel until the load passes 100 lb. How much does the final straw weigh on average?</span>
      </span>
      <div class="note-btns">
        <a class="pdf-btn" href="/widgets/camel-straw/">Simulator</a>
      </div>
    </div>
  </div>
</div>

<div class="bubble" id="simulations">
  <h4><strong>Simulations</strong></h4>
  <hr>
  <p class="section-intro">Interactive tools built for the course's discussions. They run in the browser; nothing to install.</p>

  <div class="gallery-grid">

    <!-- Template for a new simulation card. The app itself is a widget
         (widgets/<name>.md + widgets/<name>_code.html, see CLAUDE.md);
         a square thumbnail goes in widgets/images/.

    <a class="gallery-card" href="/widgets/NAME/">
      <div class="gallery-picture"><img src="/widgets/images/NAME_img.png" alt="Title"></div>
      <span class="gallery-title">Title</span>
      <span class="gallery-sub">Discussion N</span>
    </a>
    -->

    <a class="gallery-card" href="/widgets/camel-straw/">
      <div class="gallery-picture gallery-picture--pixel"><img src="/widgets/images/camel_straw_img.png" alt="Pixel-art camel"></div>
      <span class="gallery-title">The Straw That Broke the Camel's Back</span>
      <span class="gallery-sub">Expected value · Discussion 5</span>
    </a>

    <!-- Hidden while the Pixel Explorer is broken; uncomment to restore.
    <a class="gallery-card" href="/widgets/pixel-explorer/">
      <div class="gallery-picture"><img src="/widgets/images/pixel_explorer_img.jpg" alt="Fireworks photo"></div>
      <span class="gallery-title">Pixel Data Explorer</span>
      <span class="gallery-sub">Data visualization · Discussion 2</span>
    </a>
    -->

  </div>
</div>
