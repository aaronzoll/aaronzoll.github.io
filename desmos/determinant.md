---
layout: desmos-graph
title: "The Determinant as Area"
desmos_json: "determinant.json"
side_controls: true
---

<!-- Live area ledger, stacked in the side panel. Each row is one colored
     piece of the picture, drawn as a small icon; the numbers follow the graph
     as the vector tips are dragged, and hovering a row lights that piece up
     in the calculator. -->
<div class="dt-panel" id="dt-ledger">

  <span class="dt-label">Derivation</span>

  <div class="dt-row dt-chip dt-chip--green" data-pieces="23">
    <span class="dt-op"></span>
    <span class="dt-shape">
      <span class="dt-icon-line"><svg class="dt-icon" viewBox="0 0 40 26" aria-label="parallelogram"><polygon points="2,24 12,2 38,2 28,24"/></svg></span>
      <span class="dt-chip-formula">\(|ad-bc|\)</span>
    </span>
    <span class="dt-chip-val" id="dt-v-par">—</span>
  </div>

  <div class="dt-row dt-chip dt-chip--black" data-pieces="24">
    <span class="dt-op">=</span>
    <span class="dt-shape">
      <span class="dt-icon-line"><svg class="dt-icon" viewBox="0 0 40 26" aria-label="bounding rectangle"><rect x="2" y="2" width="36" height="22"/></svg></span>
      <span class="dt-chip-formula">\((a+b)(c+d)\)</span>
    </span>
    <span class="dt-chip-val" id="dt-v-rect">—</span>
  </div>

  <div class="dt-row dt-chip dt-chip--purple" data-pieces="29,30">
    <span class="dt-op">&minus;</span>
    <span class="dt-shape">
      <span class="dt-icon-line"><svg class="dt-icon" viewBox="0 0 40 26" aria-label="rectangle"><rect x="9" y="2" width="22" height="22"/></svg><span class="dt-times">&times;2</span></span>
      <span class="dt-chip-formula">\(2bc\)</span>
    </span>
    <span class="dt-chip-val" id="dt-v-pur">—</span>
  </div>

  <div class="dt-row dt-chip dt-chip--red" data-pieces="25,26">
    <span class="dt-op">&minus;</span>
    <span class="dt-shape">
      <span class="dt-icon-line"><svg class="dt-icon" viewBox="0 0 40 26" aria-label="triangle"><polygon points="2,24 38,24 38,2"/></svg><span class="dt-times">&times;2</span></span>
      <span class="dt-chip-formula">\(2\cdot\tfrac12 ac\)</span>
    </span>
    <span class="dt-chip-val" id="dt-v-red">—</span>
  </div>

  <div class="dt-row dt-chip dt-chip--blue" data-pieces="27,28">
    <span class="dt-op">&minus;</span>
    <span class="dt-shape">
      <span class="dt-icon-line"><svg class="dt-icon" viewBox="0 0 40 26" aria-label="triangle"><polygon points="2,24 2,2 38,2"/></svg><span class="dt-times">&times;2</span></span>
      <span class="dt-chip-formula">\(2\cdot\tfrac12 bd\)</span>
    </span>
    <span class="dt-chip-val" id="dt-v-blue">—</span>
  </div>

  <hr class="desmos-divider">

  <span class="dt-label">Determinant</span>
  <div class="dt-det" id="dt-det"></div>

  <p class="dt-note" id="dt-note" hidden></p>

</div>

<style>
  .dt-panel {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .dt-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: #4a5568;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.2rem;
  }

  /* One row per colored piece: operator, icon with its formula beneath,
     then the row's full contribution in a fixed-width column behind a
     faint bar, so the five numbers line up as a sum. */
  .dt-row {
    display: grid;
    grid-template-columns: 1.2rem minmax(0, 1fr) 5.6rem;
    align-items: stretch;
    column-gap: 0.4rem;
    padding: 0.35rem 0.5rem 0.35rem 0.4rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #fff;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  }
  .dt-chip:hover:not(.dt-chip--lit) {
    background: #f1f4f7;
    border-color: #b0bec5;
  }
  /* A pinned row takes the site's light slate-blue so it is unmistakable. */
  .dt-chip.dt-chip--lit {
    background: #dde3ea;
    border-color: #7a8fa0;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  .dt-op {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.15rem;
    color: #3a4f63;
  }

  .dt-shape {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    min-width: 0;
  }

  .dt-icon-line {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .dt-times {
    font-size: 0.85rem;
    color: #4a5568;
  }

  /* Icons use the same Desmos colors as the pieces in the graph. */
  .dt-icon {
    width: 2.6rem;
    height: 1.7rem;
    stroke-width: 1.5;
    stroke-linejoin: round;
  }
  .dt-chip--green  .dt-icon { fill: rgba(56, 140, 70, 0.35);  stroke: #388c46; }
  .dt-chip--black  .dt-icon { fill: none;                     stroke: #000;    stroke-width: 2; }
  .dt-chip--purple .dt-icon { fill: rgba(96, 66, 166, 0.4);   stroke: #6042a6; stroke-dasharray: 2 2; }
  .dt-chip--red    .dt-icon { fill: rgba(199, 68, 64, 0.4);   stroke: #c74440; stroke-dasharray: 2 2; }
  .dt-chip--blue   .dt-icon { fill: rgba(45, 112, 179, 0.4);  stroke: #2d70b3; stroke-dasharray: 2 2; }

  .dt-chip-val {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 0.5rem;
  }

  .dt-chip-formula {
    font-size: 0.85rem;
    color: #4a5568;
    line-height: 1.1;
    white-space: nowrap;
  }

  .dt-det {
    text-align: center;
    font-size: 0.95rem;
    color: #2d3748;
    overflow-x: auto;
  }

  .dt-note {
    margin: 0.2rem 0 0;
    font-size: 0.85rem;
    color: #b7472a;
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from determinant.json ─────────────────────────────
    // A_1 = (a, c) [red] and A_2 = (b, d) [blue] are the columns of the
    // matrix; the "Areas" folder tiles the bounding rectangle with the pieces.
    var PIECES = {
      '23': { fillOpacity: '0.25', fill: true  },   // green parallelogram
      '24': { fillOpacity: '0.4',  fill: false },   // black bounding rectangle (outline only)
      '25': { fillOpacity: '0.4',  fill: true  },   // red triangles
      '26': { fillOpacity: '0.4',  fill: true  },
      '27': { fillOpacity: '0.4',  fill: true  },   // blue triangles
      '28': { fillOpacity: '0.4',  fill: true  },
      '29': { fillOpacity: '0.4',  fill: true  },   // purple rectangles
      '30': { fillOpacity: '0.4',  fill: true  }
    };

    // ── live values ──────────────────────────────────────────────────────
    // Helper expressions track a, b, c, d as the points are dragged, so the
    // ledger follows the graph rather than the other way round.
    var vals = { a: NaN, b: NaN, c: NaN, d: NaN };

    function fmt(x) {
      var s = x.toFixed(2);
      return s === '-0.00' ? '0.00' : s;
    }

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    function render() {
      var a = vals.a, b = vals.b, c = vals.c, d = vals.d;
      if ([a, b, c, d].some(isNaN)) { return; }

      var det   = a * d - b * c;
      var rect  = (a + b) * (c + d);
      // Each row carries its full contribution (both copies of the piece), so
      // the column reads as parallelogram = rectangle − pur − red − blue.
      var pur   = 2 * b * c;
      var red   = a * c;      // 2 · ½ac
      var blue  = b * d;      // 2 · ½bd

      document.getElementById('dt-v-par').textContent  = fmt(Math.abs(det));
      document.getElementById('dt-v-rect').textContent = fmt(rect);
      document.getElementById('dt-v-pur').textContent  = fmt(pur);
      document.getElementById('dt-v-red').textContent  = fmt(red);
      document.getElementById('dt-v-blue').textContent = fmt(blue);

      // det [a b; c d] = ad − bc with the current numbers substituted in
      var ad = a * d, bc = b * c;
      var detEl = document.getElementById('dt-det');
      detEl.innerHTML =
        '\\[\\begin{aligned}\\det\\begin{bmatrix} ' + fmt(a) + ' & ' + fmt(b) + ' \\\\ ' + fmt(c) + ' & ' + fmt(d) + ' \\end{bmatrix}' +
        ' &= ad - bc \\\\ &= ' + fmt(ad) + ' - ' + fmt(bc) + ' \\\\ &= ' + fmt(det) + '\\end{aligned}\\]';
      typesetMath([detEl]);

      // The tiling is honest only while every entry is positive and A_1 sits
      // clockwise of A_2; otherwise pieces overlap or leave the rectangle,
      // though the algebra keeps working with the sign tracking orientation.
      var note = document.getElementById('dt-note');
      var positive = a > 0 && b > 0 && c > 0 && d > 0;
      if (positive && det > 0) {
        note.hidden = true;
      } else if (positive) {
        note.hidden = false;
        note.textContent = 'The determinant is negative: the blue vector is now clockwise of the red one, so the pieces overlap. ' +
                           'The area is still |ad − bc|; the sign just records orientation.';
      } else {
        note.hidden = false;
        note.textContent = 'With a negative entry the pieces no longer form a clean rectangle, but ad − bc is still the signed area.';
      }
    }

    ['a', 'b', 'c', 'd'].forEach(function (name) {
      var h = calc.HelperExpression({ latex: name });
      h.observe('numericValue', function () {
        vals[name] = h.numericValue;
        render();
      });
    });

    // ── hover to highlight a piece in the graph ──────────────────────────
    function setPieces(litIds) {
      Object.keys(PIECES).forEach(function (id) {
        var base = PIECES[id];
        if (!litIds) {
          calc.setExpression({ id: id, fill: base.fill, fillOpacity: base.fillOpacity });
        } else if (litIds.indexOf(id) >= 0) {
          calc.setExpression({ id: id, fill: true, fillOpacity: id === '24' ? '0.18' : '0.75' });
        } else {
          calc.setExpression({ id: id, fill: base.fill, fillOpacity: '0.06' });
        }
      });
    }

    var pinned = null;  // a tapped chip stays lit until tapped again (touch)

    document.querySelectorAll('.dt-chip').forEach(function (chip) {
      var ids = chip.getAttribute('data-pieces').split(',');
      chip.addEventListener('mouseenter', function () { setPieces(ids); });
      chip.addEventListener('mouseleave', function () { setPieces(pinned ? pinned.ids : null); });
      chip.addEventListener('click', function () {
        if (pinned && pinned.chip === chip) {
          chip.classList.remove('dt-chip--lit');
          pinned = null;
          setPieces(null);
        } else {
          if (pinned) { pinned.chip.classList.remove('dt-chip--lit'); }
          pinned = { chip: chip, ids: ids };
          chip.classList.add('dt-chip--lit');
          setPieces(ids);
        }
      });
    });

    typesetMath([document.getElementById('dt-ledger')]);
  };
</script>

<!--writeup-->

<div class="latex-body">
Write the two vectors as the columns of a matrix,
$$A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}, \qquad A_1 = \begin{bmatrix} a \\ c \end{bmatrix}, \quad A_2 = \begin{bmatrix} b \\ d \end{bmatrix}.$$
The green region is the parallelogram with sides formed by $A_1$ and $A_2$, and its vertices are $0$, $A_1$, $A_2$, and $A_1 + A_2 = (a+b,\, c+d)$. The claim is that its area is exactly $|ad - bc|$, the absolute value of the determinant of $A$. The proof just relies on basic geometry (no fancy trig or linear algebra needed). We make some mild assumptions for ease of proof and omission of cases. 

\begin{proposition}
If $a, b, c, d > 0$ and $A_1$ is clockwise of $A_2$, then the parallelogram with sides formed by $A_1$ and $A_2$ has area $ad - bc$.
\end{proposition}

\begin{proof}
Consider the outlined rectangle (in black), stretching from $0$ to $(a+b, c+d)$. This shape has area $(a+b)(c+d)$. Everything in the rectangle that is not green comes in pairs:
\begin{itemize}
  \item two purple $b \times c$ rectangles in the top-left and bottom-right corners, each with area $bc$;
  \item two red right triangles with legs $a$ and $c$, each with area $\tfrac12 ac$;
  \item two blue right triangles with legs $b$ and $d$, each with area $\tfrac12 bd$.
\end{itemize}
Removing all six pieces from the rectangle leaves the parallelogram, and subtracting all the areas from the total $(a+b)(c+d)$ resulting in the parallelogram's area. Algebraically, this looks like
\begin{align*}
\text{Area of parallelogram} &= (a+b)(c+d) - 2bc - 2\cdot\tfrac12 ac - 2\cdot\tfrac12 bd \\
&= ac + ad + bc + bd - 2bc - ac - bd \\
&= ad - bc.
\end{align*}

\end{proof}

\begin{remark}
Notably, we can make a stronger statement, that the area (which is always nonnegative) is the absolute value of the determinant. This requires considering more cases and being careful about orientation, so we leave this generalization as an exercise. So the determinant is really a \textbf{signed} area. Moreover, this is why swapping two columns flips the sign of the determinant, and why $\det A = 0$ exactly when $A_1$ and $A_2$ are parallel (the parallelogram collapses to a segment of zero area). The same story holds in $\R^3$, where $|\det A|$ is the volume of the parallelepiped formed by the three columns, with an analogous proof. 
\end{remark}
</div>
