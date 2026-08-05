# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based academic/professional portfolio site (aaronzoll.github.io) using the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) remote theme. It showcases research, teaching materials, and interactive math visualizations built with Desmos.

## Commands

```bash
# Local development server with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Install/update Ruby dependencies
bundle install
```

The site auto-deploys to GitHub Pages on push to `main`.

## Architecture

### Content Structure

- **Root-level `.markdown` files** — main site pages (index, about, research, teaching, projects, contact, CV)
- **`desmos/`** — 18 individual interactive Desmos graph pages; use `desmos/_template.md` when adding new ones
- **`gallery.markdown`** — Gallery page (permalink `/gallery/`) linking all Desmos visualizations; styled to match the rest of the site. `DesmosGallery.html` is the legacy version, kept unlinked in case of rollback.
- **`widgets/`** — standalone interactive research tools. Each is a two-file pair: a thin `*.md` page (`layout: widget`) plus the actual app in a self-contained HTML file it points at. See "Widgets" below.
- **`_config.yml`** — site config: remote theme, author profile, plugins, MathJax/spaceship settings
- **`_data/navigation.yml`** — main nav links (Home, About, Research, Teaching, Desmos Gallery)
- **`_includes/mathjax-config.html`** — MathJax 3 setup; disables jekyll-spaceship math processors to avoid conflicts

### Theming & Customization

The Minimal Mistakes theme is pulled as a remote theme — local files in `_includes/`, `_layouts/`, and `_sass/` override the remote theme's defaults.

Sass lives in `_sass/minimal-mistakes/` and is compiled from `assets/css/main.scss`. Custom per-page styles are embedded in front matter or inline `<style>` blocks within the markdown.

### Interactive Features

- **Desmos graphs**: Each page in `desmos/` embeds a Desmos calculator. The preferred method is a JSON embed (downloaded from Desmos); the template also shows an iframe fallback.
- **Particles.js**: Animated particle backgrounds on several pages — config at `assets/particles.json`, library at `assets/js/particles.js`.
- **MathJax 3**: LaTeX rendering loaded from CDN via `_includes/mathjax-config.html`. Pages must include `{% include mathjax-config.html %}` in their front matter `header` or body.

### Widgets

Standalone interactive tools live at `/widgets/<name>/` and are built from two pieces:

1. **The page** — `widgets/<name>.md` with `layout: widget` and no body markup beyond controls and the write-up. Front matter:

   ```yaml
   layout: widget
   title: "Human-readable title"
   widget_src: "/widgets/<name>_code.html"   # or /assets/tools/<name>.html
   widget_height: 860                        # desktop iframe height, px
   widget_height_mobile: 680                 # ≤700px viewport
   widget_fixed_height: true                 # only for apps that fill their frame
   back_url: "/research"
   back_label: "Research"
   ```

   `_layouts/widget.html` supplies the title row, back link, "jump to write-up" link, the **wood frame around the iframe**, and the hairline-separated write-up section. It splits page content on an `<!--writeup-->` marker: everything before it renders directly under the iframe (used for host-page controls, as in `widgets/polytope.md`), everything after is the prose write-up. Omit the marker entirely when the page is only prose. Unless `widget_fixed_height` is set, the layout listens for `postMessage({embedHeight})` from the iframe and resizes to fit.

2. **The app** — a self-contained HTML file (the iframe contents). It must **not** draw its own outer frame; the layout already provides one.

#### Widget theme

All widget apps share one look, so they read as instruments from the same shop: warm off-white ground, slate ink, hairline rules, tiny uppercase monospace labels, one slate accent, no heavy chrome. It is codified in `assets/css/themes/widget-theme.css` — link it and write only tool-specific rules:

```html
<link rel="stylesheet" href="/assets/css/themes/widget-theme.css">
```

Use its class API so themes stay swappable: `.w-plate` (container), `.w-bar` / `.w-group` / `.w-label` / `.w-val` (control bar), `.w-rule`, `.w-hint`, `.w-stage` / `.w-figure` (the framed canvas), `.w-scrim` / `.w-sheet` (modal). Buttons, sliders, and text inputs are styled by element; express toggle state with `aria-pressed="true"`.

**Alternate theme:** `assets/css/themes/widget-theme-chalk-wood.css` is Chalk Studio's original wood/cream look (cream toolbar, brown rules, ridged wood board edge, system sans), preserved as a drop-in. It imports the base file and only overrides tokens, so swapping the `<link>` href re-skins a widget with no markup changes — the route to take if the house style should move that way instead.

`widgets/polytope_code.html` and `widgets/optimal-couch_code.html` predate the shared file and still inline the same palette; they're the visual reference, but new widgets should link the stylesheet rather than copy it.

### Page Layouts

Most content pages use the `splash` layout with a hero `header` block (overlay color + image from picsum.photos). Research and teaching pages contain embedded HTML/CSS for custom grid layouts and slide presentations.

## Key Conventions

- PDFs (CV, slides, course notes) live in `assets/` subdirectories
- Images are in `assets/images/`
- New Desmos pages should be created from `desmos/_template.md` and linked from both `gallery.markdown` and `teaching.markdown`
- New widgets go in `widgets/`, use `layout: widget` and the widget theme (see "Widgets"), and are listed in `widgets.markdown` with a thumbnail in `widgets/images/`
- The `_site/` directory is the generated build output — do not edit files there directly
