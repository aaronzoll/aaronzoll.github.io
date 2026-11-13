---
# Unlisted rather than unpublished: prints/ also holds the project pages and apps, so with
# published: false `jekyll serve` shows a bare directory listing at /prints/.
# Add a "3D Prints" entry to _data/navigation.yml when it should go public.
layout: splash
title: 3D Prints
permalink: /prints/
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

  .print-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .print-grid > .bubble { margin-bottom: 0; }

  .print-card { display: flex; gap: 1rem; align-items: flex-start; }

  /* Thumbnails are renders on a transparent background, so no frame. */
  .print-thumb { flex: 0 0 170px; }

  .print-thumb img { display: block; width: 100%; height: auto; transition: transform 0.25s ease; }
  .print-card:hover .print-thumb img { transform: scale(1.05); }

  .print-title { font-weight: 600; font-size: 1.05rem; margin: 0 0 0.4rem; }
  .print-title a { text-decoration: none; }
  .print-blurb { font-size: 0.92rem; margin: 0; }

  @media (max-width: 600px) {
    .bubble { padding: 1rem; border-radius: 10px; }
    .print-grid { grid-template-columns: 1fr; }
    .print-thumb { flex-basis: 100px; }
  }
</style>

<div class="bubble">
  <h4><strong>Overview</strong></h4>
  <p>Some ideas are easier to hold in your hands. These are 3D-printed models I have designed to make a piece of mathematics physical, each with an interactive 3D model you can turn, take apart and run in the browser, along with the files to print your own.</p>
</div>

<!-- One card per page with `print_project: true`, built from its title, blurb, and thumb. -->
{% assign prints = site.pages | where: "print_project", true | sort: "url" %}
<div class="print-grid">
{%- for p in prints %}
<div class="bubble print-card">
{%- if p.thumb %}<a class="print-thumb" href="{{ p.url }}"><img src="{{ p.thumb }}" alt="{{ p.title }}"></a>{% endif %}
<div>
<div class="print-title"><a href="{{ p.url }}">{{ p.title }}</a></div>
<p class="print-blurb">{{ p.blurb }}</p>
</div>
</div>
{%- endfor %}
</div>
