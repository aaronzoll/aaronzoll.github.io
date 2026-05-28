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
- **`DesmosGallery.html`** — gallery page linking all Desmos visualizations
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

### Page Layouts

Most content pages use the `splash` layout with a hero `header` block (overlay color + image from picsum.photos). Research and teaching pages contain embedded HTML/CSS for custom grid layouts and slide presentations.

## Key Conventions

- PDFs (CV, slides, course notes) live in `assets/` subdirectories
- Images are in `assets/images/`
- New Desmos pages should be created from `desmos/_template.md` and linked from both `DesmosGallery.html` and `teaching.markdown`
- The `_site/` directory is the generated build output — do not edit files there directly
