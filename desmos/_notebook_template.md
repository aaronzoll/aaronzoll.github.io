---
layout: desmos-notebook
title: "Notebook Title Here"
# Optional: LaTeX title rendered as the page heading.
# Keep title as plain text (browser tab, SEO); use title_math for the visual heading.
# title_math: '\(\mu\)-Smooth Functions'
---

Write your introduction here. Full Markdown is supported, and LaTeX via MathJax —
inline like \(f(x) = x^2\) or display:

$$\nabla f(x) = 0$$

---

## Single Full-Width Graph

Point `data-json` at a file in `/assets/desmos/json_files/`.
Use `data-height` to set the height in pixels (default: 480).
Any HTML children of the `.dnb-graph` div appear below the calculator (good for captions).

<div class="dnb-graph" data-json="your_file.json" data-height="480">
  <p class="dnb-caption">Figure 1: Optional caption goes here.</p>
</div>

Continue writing below the graph. Markdown prose, equations, headers — all work normally.

---

## Two Graphs Side by Side

Wrap `.dnb-graph` elements in a `.dnb-row` to place them in a flex row.
Both graphs share equal width by default.

<div class="dnb-row">
  <div class="dnb-graph" data-json="left_graph.json" data-height="400">
    <p class="dnb-caption">Left: caption here.</p>
  </div>
  <div class="dnb-graph" data-json="right_graph.json" data-height="400">
    <p class="dnb-caption">Right: caption here.</p>
  </div>
</div>

For unequal widths, add `dnb-graph--two-thirds` to the wider one and
`dnb-graph--one-third` to the narrower one:

<div class="dnb-row">
  <div class="dnb-graph dnb-graph--two-thirds" data-json="main_graph.json" data-height="420">
  </div>
  <div class="dnb-graph dnb-graph--one-third" data-json="detail_graph.json" data-height="420">
  </div>
</div>

---

## Text Wrapping Around a Graph

Add `dnb-graph--float-right` (or `--float-left`) so text flows around the graph.
Always follow the wrapping section with `<div class="dnb-clearfix"></div>` to stop the float.

<div class="dnb-graph dnb-graph--float-right" data-json="your_file.json" data-height="380">
</div>

Write text here and it will wrap to the left of the floating graph. Continue for as
many paragraphs as you like — the graph stays anchored to the right. You can include
inline math like \(L\)-smooth functions or \(\mu\)-strong convexity naturally.

<div class="dnb-clearfix"></div>

---

## 3D Graphs via URL (iframe)

The Desmos 3D API differs from the 2D API. Use `data-url` (pointing at a public
Desmos 3D link) to embed via iframe instead. The Show/Hide Expressions toggle still works.

<div class="dnb-graph" data-url="https://www.desmos.com/3d/YOUR_GRAPH_ID" data-height="500">
</div>

You can also use `data-url` for any 2D graph when you only have the public URL and
not the JSON state file.

---

## Hiding the Expressions Toggle

Add `data-no-toggle="true"` to remove the "Show Expressions" button for a cleaner look.

<div class="dnb-graph" data-json="clean_graph.json" data-height="400" data-no-toggle="true">
</div>

---

## Interactive Controls (Sliders, Buttons)

Use `data-ready-fn` to name a JavaScript callback that receives the Desmos calculator
instance once its JSON is loaded. Put your slider/button HTML inside the `.dnb-graph`
div — it renders below the calculator — and wire it up in the callback.

<div class="dnb-graph" data-json="interactive_graph.json" data-height="460" data-ready-fn="myGraphReady">

  <div style="margin-top:0.75rem;">
    <span>\(a\) = <strong id="my-a-val">1.00</strong></span><br>
    <input type="range" min="0" max="3" step="0.01" value="1"
           id="my-slider-a">
  </div>

</div>

<script>
  function myGraphReady(calc, container) {
    document.getElementById('my-slider-a').addEventListener('input', function () {
      var val = parseFloat(this.value);
      document.getElementById('my-a-val').textContent = val.toFixed(2);
      calc.setExpression({ id: 'EXPR_ID', latex: 'a=' + val });
    });
  }
</script>

Replace `'EXPR_ID'` with the actual expression ID from the Desmos JSON, and adjust
the `data-latex-prefix` pattern to match your graph's variable names.

---

## Quick Reference

| Attribute | Default | What it does |
|---|---|---|
| `data-json="file.json"` | — | Load graph state from `/assets/desmos/json_files/` |
| `data-url="https://..."` | — | Embed as iframe (use when no JSON available) |
| `data-height="480"` | `480` | Calculator height in pixels |
| `data-3d="true"` | `false` | Use `Desmos.Calculator3D` instead of `Desmos.Calculator` |
| `data-no-toggle="true"` | `false` | Hide the Show/Hide Expressions button |
| `data-ready-fn="fnName"` | — | Callback `window.fnName(calc, container)` after JSON loads |

**Layout helpers:**

- `.dnb-row` — flex row container for side-by-side graphs
- `.dnb-graph--two-thirds` / `.dnb-graph--one-third` — unequal widths inside a row
- `.dnb-graph--float-left` / `.dnb-graph--float-right` — float for text wrapping (45% wide)
- `.dnb-clearfix` — end a float section
- `.dnb-caption` — styled italic caption below a graph
