---
# Unlisted rather than unpublished: puzzles/ also holds the set pages and apps, so with
# published: false `jekyll serve` shows a bare directory listing at /puzzles/.
# Add a "Puzzles" entry to _data/navigation.yml when it should go public.
layout: splash
title: Puzzles
permalink: /puzzles/
header:
  overlay_color: "#fff"
  overlay_filter: "rgba(0, 0, 0, 0.15)"
  overlay_image: "/assets/images/research_banner.png"
custom_js: |
  <script>particlesJS.load('particles-js', '/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });</script>
  <script src="/assets/js/particles.js"></script>
---

<style>
  .page__content {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 0.5rem;
  }

  .bubble { padding: 1.25rem 1.5rem; }

  .puzzle-set-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .puzzle-set-grid > .bubble { margin-bottom: 0; }

  .puzzle-set-title {
    font-weight: 600;
    font-size: 1.05rem;
    margin: 0 0 0.4rem;
  }

  .puzzle-set-title a { text-decoration: none; }

  .puzzle-set-blurb {
    font-size: 0.92rem;
    margin: 0 0 0.6rem;
  }

  .puzzle-set-list {
    font-size: 0.92rem;
    margin: 0;
    padding-left: 1.3rem;
  }

  .puzzle-set-list li { margin: 0.15rem 0; }

  @media (max-width: 600px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .puzzle-set-grid { grid-template-columns: 1fr; }
  }
</style>

<div class="bubble">
  <h4><strong>Overview</strong></h4>
  <p>Sometimes we just want extra math to think about, and I particularly enjoy puzzles that have interesting geometric or visual ways to think about them. Below I have started to document different puzzles I find fun, as well as various widgets to accompany them in hope to gain intuition or understanding. </p>
</div>

<!-- One card per page with `layout: puzzle-set`, built from its title, blurb, and problems. -->
{% assign puzzle_sets = site.pages | where: "layout", "puzzle-set" | sort: "url" %}
<div class="puzzle-set-grid">
{%- for s in puzzle_sets %}
<div class="bubble">
<div class="puzzle-set-title"><a href="{{ s.url }}">{{ s.title }}</a></div>
<p class="puzzle-set-blurb">{{ s.blurb }}</p>
<ol class="puzzle-set-list">
{%- for p in s.problems %}
<li><a href="{{ s.url }}#{{ p.id }}">{{ p.title }}</a></li>
{%- endfor %}
</ol>
</div>
{%- endfor %}
</div>
