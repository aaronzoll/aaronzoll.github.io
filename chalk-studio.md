---
layout: splash      
title: "Chalk Studio"
---

<style>
  .chalk-embed-wrap { display: flex; justify-content: center; margin: 1.5rem 0 2rem; }

  /* same frame as .demo-picture in your gallery */
  .chalk-frame {
    width: 100%;
    max-width: 1000px;
    box-shadow: inset 2px 2px 6px rgba(255,255,255,0.6),
                inset -2px -2px 6px rgba(0,0,0,0.2),
                0 4px 8px rgba(0,0,0,0.3);
    background: linear-gradient(to bottom right, #5f3d02, #a67b5b);
    padding: 8px;
    outline: 5px ridge #593302;
  }

  .chalk-frame iframe {
    display: block;
    width: 100%;
    height: 640px;
    border: 0;
    background: #28302c;          /* chalkboard, so it reads as intentional pre-load */
  }

  @media (max-width: 700px) {
    .chalk-frame iframe { height: 70vh; }
  }
</style>

<div class="chalk-embed-wrap">
  <div class="chalk-frame">
    <iframe src="{{ '/assets/tools/chalk-studio.html' | relative_url }}"
            title="Chalk Studio"
            loading="lazy"
            allow="clipboard-write"></iframe>
  </div>
</div>

<!--writeup-->

<div class="latex-body">

\section{Chalk Studio}

This is the tool I use to generate chalk drawings/writing/LaTeX for my presentations. Everything exports as a transparent PNG, so it drops straight
onto a slide. Math is rendered in LaTeX form, e.g. $\R^n$, $\norm{x}$, $\frac{-b\pm\sqrt{b^2-4ac}}{2a}$. You may also adjust the size, grain, and "wobblyness" to give it a more handwriting feel. Note the handwriting is randomly generated, and is prone to look bad. 

</div>