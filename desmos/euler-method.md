---
layout: desmos-graph
title: "Euler's Method"
desmos_json: "euler_method.json"
side_controls: true
---

<div class="eu-stack" id="eu-panel">

  <span class="eu-label">Function <span style="text-transform:none">f(x, y)</span></span>

  <div class="eu-presets">
    <button class="site-btn eu-fn-btn site-btn--active" data-latex="y\sin\left(x\right)">y sin(x)</button>
    <button class="site-btn eu-fn-btn" data-latex="\sin\left(y\right)">sin(y)</button>
    <button class="site-btn eu-fn-btn" data-latex="\sin\left(x\right)">sin(x)</button>
    <button class="site-btn eu-fn-btn" data-latex="-y">−y</button>
    <button class="site-btn eu-fn-btn" data-latex="x-y">x − y</button>
    <button class="site-btn eu-fn-btn" data-latex="y\left(2-y\right)">y(2−y)</button>
    <button class="site-btn eu-fn-btn" data-latex="y">y</button>
    <button class="site-btn eu-fn-btn" data-latex="\ln\left(1+x^{2}+y^{2}\right)">ln(1+x²+y²)</button>
  </div>

  <div class="eu-custom-section">
    <span class="eu-custom-label">Custom</span>
    <div class="eu-custom-row">
      <input class="eu-custom-input" id="eu-custom-fn" type="text"
             placeholder="\sin(x), x^2-y, …" autocomplete="off" spellcheck="false">
      <button class="eu-action-btn" id="eu-apply-fn">Apply</button>
    </div>
    <span class="eu-custom-note">Use LaTeX with variables x and y (e.g. y\sin(x), x^2+y, e^{-x}y).</span>
    <p class="eu-note" id="eu-error" hidden></p>
  </div>

  <button class="eu-reset-btn" id="eu-reset">Reset to default</button>

  <hr class="desmos-divider">

  <span class="eu-label">Step Parameters</span>

  <div class="desmos-param">
    <span class="desmos-param-label">Steps \(N\) = <strong id="eu-N-val">10</strong></span>
    <input class="site-slider" id="eu-N" type="range" min="1" max="100" step="1" value="10">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Current step \(n\) = <strong id="eu-n-val">0</strong></span>
    <input class="site-slider" id="eu-n" type="range" min="0" max="9" step="1" value="0">
  </div>

  <div class="desmos-param">
    <span class="desmos-param-label">Endpoint \(x_N\) = <strong id="eu-end-val">4.2</strong></span>
    <input class="site-slider" id="eu-end" type="range" min="-6" max="6" step="0.1" value="4.2">
  </div>

  <hr class="desmos-divider">

  <span class="eu-label">Display</span>

  <button class="site-btn eu-toggle eu-wide" aria-pressed="false" data-folder="300">True solution</button>
  <button class="site-btn site-btn--active eu-toggle eu-wide" aria-pressed="true" data-folder="61">Slope field</button>

  <hr class="desmos-divider">

  <details class="eu-drop">
    <summary class="eu-label">Visual Parameters</summary>
    <div class="eu-drop-body">

      <div class="desmos-param">
        <span class="desmos-param-label">Arrow length = <strong id="eu-arrow-val">0.40</strong></span>
        <input class="site-slider" id="eu-arrow" type="range" min="0" max="1" step="0.01" value="0.4">
      </div>

      <div class="desmos-param">
        <span class="desmos-param-label">Field opacity = <strong id="eu-opacity-val">0.33</strong></span>
        <input class="site-slider" id="eu-opacity" type="range" min="0" max="1" step="0.01" value="0.334">
      </div>

      <div class="desmos-param">
        <span class="desmos-param-label">Grid points \(N_x\) = <strong id="eu-nx-val">25</strong></span>
        <input class="site-slider" id="eu-nx" type="range" min="1" max="100" step="1" value="25">
      </div>

      <div class="desmos-param">
        <span class="desmos-param-label">Grid spacing \(d_x\) = <strong id="eu-dx-val">0.50</strong></span>
        <input class="site-slider" id="eu-dx" type="range" min="0" max="2" step="0.01" value="0.5">
      </div>

    </div>
  </details>

</div>

<style>
  .desmos-page-wrap { max-width: 1350px; }

  .eu-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .eu-label {
    font-weight: bold;
    font-size: 0.82rem;
    color: var(--color-label);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .eu-wide { width: 100%; }

  .eu-stack .eu-toggle {
    min-width: 0;
    padding: 0.45rem 0.5rem;
    font-size: 0.9rem;
  }

  .eu-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .eu-presets .site-btn {
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
    font-family: monospace;
    min-width: 0;
  }

  .eu-custom-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem 0.6rem;
    border: 2px dashed #c8c8c8;
    border-radius: 4px;
    background: #fafafa;
  }

  .eu-custom-label {
    font-size: 0.72rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
  }

  .eu-custom-row {
    display: flex;
    gap: 0.4rem;
  }

  .eu-custom-input {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 0.28rem 0.5rem;
    font-size: 0.82rem;
    font-family: monospace;
    border: 1px solid var(--color-wood);
    border-radius: 3px;
    background: #fff;
    color: #1a1a1a;
  }

  .eu-custom-input:focus {
    outline: 2px solid var(--color-wood);
    outline-offset: 1px;
  }

  .eu-action-btn {
    padding: 0.28rem 0.7rem;
    font-size: 0.8rem;
    cursor: pointer;
    border: 1px solid var(--color-wood);
    background: var(--color-wood-bg);
    color: var(--color-wood-ink);
    border-radius: 3px;
    white-space: nowrap;
    transition: background 0.12s;
  }

  .eu-action-btn:hover { background: var(--color-wood-bg-hover); }

  .eu-custom-note {
    font-size: 0.72rem;
    color: #888;
    font-style: italic;
  }

  .eu-note {
    margin: 0;
    font-size: 0.85rem;
    color: #b7472a;
  }

  /* Visual parameters stay out of the way until asked for. */
  .eu-drop > summary {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    cursor: pointer;
    list-style: none;
  }

  .eu-drop > summary::-webkit-details-marker { display: none; }

  .eu-drop > summary::before {
    content: "";
    flex-shrink: 0;
    border-left: 6px solid var(--color-label);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    transition: transform 0.2s ease;
  }

  .eu-drop[open] > summary::before { transform: rotate(90deg); }

  .eu-drop-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .eu-reset-btn {
    align-self: flex-start;
    padding: 0.22rem 0.6rem;
    font-size: 0.75rem;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #f7f7f7;
    color: #555;
    border-radius: 3px;
    transition: background 0.12s;
  }

  .eu-reset-btn:hover { background: #ececec; }

  /* Live calculation under the graph. */
  .eu-calc {
    margin-top: 0.75rem;
    text-align: center;
  }

  .eu-calc .eu-label {
    display: block;
    text-align: left;
  }

  .eu-calc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 3em;
  }

  .eu-calc-math {
    min-width: 0;
    max-width: 100%;
    color: #2d3748;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .eu-calc-math mjx-container[display="true"] {
    margin: 0.5em 0;
  }

  /* Table of steps, set like a table in a book: three horizontal rules on the
     page's own ground, with no card. The window holds exactly five rows, so
     nothing below it moves when N changes. */
  .eu-steps {
    --eu-head: 1.9rem;
    --eu-row: 1.4rem;
    margin-top: 0.9rem;
    text-align: left;
  }

  .eu-steps-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.35rem;
  }

  .eu-steps-count {
    font-size: 0.85rem;
    color: var(--color-ink-mute);
    font-variant-numeric: tabular-nums;
  }

  .eu-table-wrap {
    box-sizing: content-box;
    height: calc(var(--eu-head) + 5 * var(--eu-row));
    overflow-y: auto;
    overflow-x: auto;
    scrollbar-width: thin;
    border-top: 1.5px solid var(--color-label);
    border-bottom: 1.5px solid var(--color-label);
  }

  .eu-table-wrap:focus-visible {
    outline: 2px solid var(--color-wood);
    outline-offset: 2px;
  }

  /* The theme makes every table a block with its own scrollbar and margins. */
  .eu-table-wrap .eu-table {
    display: table;
    width: 100%;
    margin: 0;
    border: 0;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
    font-variant-numeric: lining-nums tabular-nums;
  }

  .eu-table th,
  .eu-table td {
    box-sizing: border-box;
    padding: 0 0.6rem;
    border: 0;
    line-height: 1;
    text-align: right;
    white-space: nowrap;
    color: var(--color-ink);
    background: none;
  }

  .eu-table td { height: var(--eu-row); }

  /* Pinned header: filled with the page ground so rows pass cleanly beneath. */
  .eu-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    height: var(--eu-head);
    font-weight: normal;
    color: var(--color-label);
    background: var(--color-bg-panel);
    border-bottom: 1px solid var(--color-divider);
  }

  /* n is an index, not a measurement: it recedes, and hugs the left edge so the
     numbers that follow read as one row. */
  .eu-table th:first-child,
  .eu-table td:first-child { text-align: left; }
  .eu-table td:first-child { color: var(--color-ink-mute); }

  /* The other columns are the method itself; the error is a judgment of it,
     so it alone is set off by a vertical rule. */
  .eu-table th:last-child,
  .eu-table td:last-child { border-left: 1px solid var(--color-divider); }

  /* The current row wears the same colors as its marks on the graph: y_n is the
     orange circle and y_{n+1} the red point (darkened enough to read as text). */
  .eu-table tbody tr { cursor: pointer; }
  .eu-table tbody tr:hover td { background: rgba(0, 0, 0, 0.04); }
  .eu-table .eu-row-current td,
  .eu-table tbody tr.eu-row-current:hover td { background: var(--color-wood-bg); }
  .eu-table .eu-row-current td:first-child { color: var(--color-ink); }
  .eu-table .eu-row-current td:nth-child(3) { color: #b85c0e; }
  .eu-table .eu-row-current td:nth-child(6) { color: #c74440; }

  @media (max-width: 700px) {
    .eu-table th,
    .eu-table td { padding: 0 0.3rem; }
  }
</style>

<script>
  window.onDesmosReady = function (calc) {

    // ── Expression IDs from euler_method.json ────────────────────────────
    var ID = { f: '3', x0: '11', y0: '102', end: '4', N: '119', n: '104',
               arrow: '200', opacity: '90', nx: '79', dx: '81' };
    var DEFAULT = { f: 'y\\sin\\left(x\\right)', x0: -3.7, y0: 2.5, end: 4.2, N: 10 };

    function el(id) { return document.getElementById(id); }

    function fmt(x, places) {
      if (!isFinite(x)) { return '\\text{undefined}'; }
      places = places === undefined ? 2 : places;
      var k = Math.pow(10, places);
      if (Math.abs(x) >= 1e6) { return x.toExponential(1).replace(/e\+?(-?\d+)/, '\\times 10^{$1}'); }
      var s = (Math.round(x * k) / k).toFixed(places).replace(/\.?0+$/, '');
      return s === '-0' ? '0' : s;
    }

    function typesetMath(nodes) {
      if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise = MathJax.startup.promise
          .then(function () { return MathJax.typesetPromise(nodes); })
          .catch(function (err) { console.error(err); });
      }
    }

    // A typed sin(x) would read as s*i*n*(x) to Desmos.
    function toLatex(s) {
      return s.trim()
        .replace(/(^|[^\\a-zA-Z])(sin|cos|tan|ln|log)(?![a-zA-Z])/g, '$1\\$2')
        .replace(/\*/g, '\\cdot ');
    }

    // ── Live calculation ─────────────────────────────────────────────────
    var vals = {};
    var NAMES = { n: 'n', h: 'h', xn: 'p_{1}.x', yn: 'p_{1}.y', m: 'm', xNext: 'x_{next}', yNext: 'y_{next}',
                  yTrue: 'y_{true}', x0: 'x_{0}', xEnd: 'x_{N}' };

    var pending = false;
    function render() {
      if (pending) { return; }
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        if (isNaN(vals.n) || isNaN(vals.h)) { return; }
        writeTable(Math.round(vals.n));   // the table is a control, so it never waits
        settleCalc();
      });
    }

    var settleCalc = calcOnRest('eu-calc-step', function () {
        var v = vals, n = Math.round(v.n);
        el('eu-calc-step').innerHTML = '\\[y_{' + (n + 1) + '} = y_{' + n + '} + hf(x_{' + n + '}, y_{' + n + '}) = ' +
          fmt(v.yn) + ' + (' + fmt(v.h) + ')(' + fmt(v.m) + ') = ' + fmt(v.yNext) + '\\]';
        el('eu-calc-err').innerHTML = '\\[\\text{error at } x_{' + (n + 1) + '} = ' + fmt(v.xNext) + ': \\quad ' +
          '|y_{' + (n + 1) + '} - y(x_{' + (n + 1) + '})| = ' + fmt(Math.abs(v.yNext - v.yTrue), 3) + '\\]';
        typesetMath([el('eu-calc-step'), el('eu-calc-err')]);
    });

    // ── Table of steps ───────────────────────────────────────────────────
    // Every step of the run, always. The current row moves with n, and clicking a
    // row sets n, so the table and the slider are two handles on the same step.
    // The current row is brought into view when the step changes, but dragging
    // the start point leaves the reader's scroll position alone.
    var lists = { x: [], y: [], f: [], t: [] };

    function cell(x) {
      if (!isFinite(x)) { return '—'; }
      var s = Math.abs(x) >= 1e6 ? x.toExponential(2) : x.toFixed(3);
      return s.replace(/-/g, '−');    // a true minus sign, matching the math above
    }

    var lastView = '';
    function writeTable(n) {
      var rows = '', N = lists.x.length - 1;
      for (var i = 0; i < N; i++) {
        rows += '<tr data-n="' + i + '"' + (i === n ? ' class="eu-row-current"' : '') + '><td>' + i + '</td><td>' + cell(lists.x[i]) +
                '</td><td>' + cell(lists.y[i]) + '</td><td>' + cell(vals.h) + '</td><td>' + cell(lists.f[i]) +
                '</td><td>' + cell(lists.y[i + 1]) + '</td><td>' + cell(Math.abs(lists.y[i + 1] - lists.t[i])) + '</td></tr>';
      }
      el('eu-table-body').innerHTML = rows;
      if (N > 0) { el('eu-table-count').textContent = 'Step ' + (n + 1) + ' of ' + N; }
      var view = n + '/' + N;
      if (view !== lastView) {
        lastView = view;
        showRow(n);
      }
    }

    // Scroll only if the row is out of view, past the pinned header, and then
    // center it, so a click on a visible row never moves the list under the pointer.
    function showRow(n) {
      var wrap = el('eu-table-wrap'), row = wrap.querySelector('tr[data-n="' + n + '"]');
      if (!row) { return; }
      var head = wrap.querySelector('th').offsetHeight, top = row.offsetTop, bottom = top + row.offsetHeight;
      if (top < wrap.scrollTop + head || bottom > wrap.scrollTop + wrap.clientHeight) {
        wrap.scrollTop = top - head - (wrap.clientHeight - head - row.offsetHeight) / 2;
      }
    }

    // A closed dropdown has no layout to scroll, so center the row on opening.
    el('eu-table-wrap').closest('details').addEventListener('toggle', function () {
      if (this.open) { showRow(Math.round(vals.n)); }
    });

    el('eu-table-body').addEventListener('click', function (e) {
      var row = e.target.closest('tr');
      if (row) { setStep(+row.getAttribute('data-n')); }
    });

    el('eu-table-wrap').addEventListener('keydown', function (e) {
      var step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (!step) { return; }
      e.preventDefault();
      var next = +iSlider.value + step;
      if (next >= 0 && next <= +iSlider.max) { setStep(next); }
    });

    [['x', 'E_{x}'], ['y', 'E_{y}'], ['f', 'E_{f}'], ['t', 'E_{t}']].forEach(function (pair) {
      var h = calc.HelperExpression({ latex: pair[1] });
      h.observe('listValue', function () { lists[pair[0]] = h.listValue || []; render(); });
    });

    Object.keys(NAMES).forEach(function (key) {
      vals[key] = NaN;
      var h = calc.HelperExpression({ latex: NAMES[key] });
      h.observe('numericValue', function () { vals[key] = h.numericValue; render(); keepOrdered(); });
    });

    // ── Function f(x, y) selector ────────────────────────────────────────
    function setFunction(latex) {
      calc.setExpression({ id: ID.f, latex: 'f\\left(x,y\\right)=' + latex });
    }
    function markFn(btn) {
      document.querySelectorAll('.eu-fn-btn').forEach(function (b) { b.classList.toggle('site-btn--active', b === btn); });
    }
    document.querySelectorAll('.eu-fn-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setFunction(btn.getAttribute('data-latex'));
        el('eu-custom-fn').value = '';
        markFn(btn);
      });
    });

    var input = el('eu-custom-fn');
    el('eu-apply-fn').addEventListener('click', function () {
      var val = toLatex(input.value);
      if (!val) { return; }
      setFunction(val);
      markFn(null);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { el('eu-apply-fn').click(); }
    });

    // Desmos fires 'change' before it refreshes its analysis, and the refresh can
    // take seconds with no further event, so keep looking for a little while.
    function checkError() {
      var a = calc.expressionAnalysis[ID.f], bad = !!(a && a.isError);
      var note = el('eu-error');
      note.hidden = !bad;
      if (bad) { note.textContent = 'That expression could not be read. Check the LaTeX and use x and y as the variables.'; }
    }
    var errorPoll;
    calc.observeEvent('change', function () {
      var looks = 0;
      clearInterval(errorPoll);
      errorPoll = setInterval(function () {
        checkError();
        if (++looks >= 16) { clearInterval(errorPoll); }
      }, 500);
    });

    // ── Steps ────────────────────────────────────────────────────────────
    var nSlider = el('eu-N'), iSlider = el('eu-n'), endSlider = el('eu-end');

    function setN(N) {
      el('eu-N-val').textContent = N;
      nSlider.value = N;
      calc.setExpression({ id: ID.N, latex: 'N=' + N });
      iSlider.max = N - 1;
      if (+iSlider.value > N - 1) { setStep(N - 1); }
    }
    function setStep(n) {
      iSlider.value = n;
      el('eu-n-val').textContent = n;
      calc.setExpression({ id: ID.n, latex: 'n=' + n });
    }
    function setEnd(x) {
      endSlider.value = x;
      el('eu-end-val').textContent = fmt(x, 1);
      calc.setExpression({ id: ID.end, latex: 'x_{N}=' + x });
    }

    nSlider.addEventListener('input', function () { setN(+this.value); });
    iSlider.addEventListener('input', function () { setStep(+this.value); });
    endSlider.addEventListener('input', function () {
      var x = +this.value;
      if (x <= vals.x0 + 0.1) { x = Math.round((vals.x0 + 0.1) * 10) / 10; }
      setEnd(x);
    });

    // The steps march to the right: if the start is dragged past the end,
    // the end moves ahead of it.
    function keepOrdered() {
      if (vals.x0 >= vals.xEnd) {
        var x = Math.round((vals.x0 + 1) * 10) / 10;
        vals.xEnd = x;
        setEnd(x);
      }
    }

    // ── Display toggles ──────────────────────────────────────────────────
    document.querySelectorAll('.eu-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = !btn.classList.contains('site-btn--active');
        btn.classList.toggle('site-btn--active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        calc.setExpression({ id: btn.getAttribute('data-folder'), hidden: !on });
      });
    });

    // ── Visual parameter sliders ─────────────────────────────────────────
    [
      { key: 'arrow',   prefix: 'A_{rrow}=',   decimals: 2 },
      { key: 'opacity', prefix: 'O_{pacity}=', decimals: 2 },
      { key: 'nx',      prefix: 'N_{x}=',      decimals: 0 },
      { key: 'dx',      prefix: 'd_{x}=',      decimals: 2 }
    ].forEach(function (s) {
      el('eu-' + s.key).addEventListener('input', function () {
        el('eu-' + s.key + '-val').textContent = (+this.value).toFixed(s.decimals);
        calc.setExpression({ id: ID[s.key], latex: s.prefix + this.value });
      });
    });

    el('eu-reset').addEventListener('click', function () {
      setFunction(DEFAULT.f);
      calc.setExpression({ id: ID.x0, latex: 'x_{0}=' + DEFAULT.x0 });
      calc.setExpression({ id: ID.y0, latex: 'y_{0}=' + DEFAULT.y0 });
      setEnd(DEFAULT.end);
      setN(DEFAULT.N);
      setStep(0);
      input.value = '';
      markFn(document.querySelector('.eu-fn-btn'));
    });

    typesetMath([el('eu-panel'), el('eu-table-head')]);
  };
</script>

<!--below-graph-->

<details class="desmos-calc-drop eu-calc">
  <summary>Computation</summary>
  <div class="eu-calc-row">
    <div class="eu-calc-math" id="eu-calc-step"></div>
    <div class="eu-calc-math" id="eu-calc-err"></div>
  </div>

  <div class="eu-steps">
    <div class="eu-steps-top">
      <span class="eu-label">All steps</span>
      <span class="eu-steps-count" id="eu-table-count"></span>
    </div>
    <div class="eu-table-wrap" id="eu-table-wrap" tabindex="0" role="group"
         aria-label="Table of steps. Click a row, or use the up and down arrow keys, to change the current step.">
      <table class="eu-table">
        <thead id="eu-table-head">
          <tr><th>\(n\)</th><th>\(x_n\)</th><th>\(y_n\)</th><th>\(h\)</th><th>\(f(x_n, y_n)\)</th><th>\(y_{n+1}\)</th><th>error</th></tr>
        </thead>
        <tbody id="eu-table-body"></tbody>
      </table>
    </div>
  </div>
</details>

<!--writeup-->

<div class="latex-body">
Many first order differential equations can't be solved by hand. For example, the Existence and Uniqueness Theorem guarantees that $y' = \ln(1 + x^2 + y^2)$ with $y(x_0) = y_0$ has a unique solution, but that solution can't be written in terms of simple functions. Similarly, $y' = e^{-x^2}$ is solved by an antiderivative of $e^{-x^2}$, which has no elementary formula. We know the solution exists, so how do we compute it? The simplest answer is \textbf{Euler's method}, which you may recognize from its mention in "The Imitation Game."

The idea starts with the \textbf{slope field}. If a solution of $y' = f(x, y)$ passes through a point $(x_1, y_1)$, then its slope there is exactly $f(x_1, y_1)$. So even with no formula for the solution, the differential equation tells us which direction the solution is heading at every point of the plane. These are the faint line segments in the background of the graph.

\begin{algorithm}[Euler's Method]
Given the initial value problem $y' = f(x, y)$, $y(x_0) = y_0$ and a step size $h > 0$, let $x_n = x_0 + nh$ and for $n = 0, 1, 2, \dots$ set
$$y_{n+1} = y_n + hf(x_n, y_n).$$
Then $y_n \approx y(x_n)$, the true solution at $x_n$.
\end{algorithm}

Where does this come from? For small $h$, the definition of the derivative gives
$$y'(x) \approx \frac{y(x+h) - y(x)}{h},$$
and solving for $y(x+h)$,
$$y(x+h) \approx y(x) + hy'(x) = y(x) + hf(x, y(x)),$$
using that $y$ solves the differential equation. We then replace the unknown $y(x_n)$ with our best guess so far, $y_n$.

Geometrically, we are simply marching along the slope field. From the current point $(x_n, y_n)$ we follow the line with slope $f(x_n, y_n)$ for a horizontal distance $h$, which is a vertical distance $hf(x_n, y_n)$. Then we stop, read a new slope, and repeat. In the graph, the orange circle is $(x_n, y_n)$, the red line is the slope there, and the dotted legs show the horizontal distance $h$ and vertical distance $hf(x_n, y_n)$ leading to the next point. Move the slider for $n$, or click a row of the table in the \emph{Computation} dropdown under the graph, to march along the blue path, and drag the black starting point to change the initial condition.

\begin{remark}
Toggle on \emph{True solution} to see it as the green curve (to good accuracy, as it is computed by a much more careful numerical method). Euler's path leaves it for two reasons. First, we follow a straight line for the whole step, while the true solution curves away. Second, after the first step, we read the slope at $(x_n, y_n)$ rather than on the true solution, so we follow slightly the wrong direction, and these errors accumulate from step to step.
\end{remark}

To reduce the error, reduce the step size, so that we correct course more often. Increase $N$ in the graph, which sets $h = (x_N - x_0)/N$, and watch the blue path close in on the true solution. Doubling $N$ roughly halves the error, once $h$ is small: the error at a fixed $x$ is proportional to $h$. This makes Euler's method a \textit{first order} method, and is why more careful methods, such as the <a href="/desmos/runge-kutta-2">second order Runge Kutta methods</a>, are used in practice.

\begin{remark}
Two choices of $f$ are worth exploring, as here we can write the iterates exactly.
\begin{itemize}
  \item For $y' = y$, Euler's method gives $y_{n+1} = (1 + h)y_n$, so $y_n = (1+h)^n y_0$. Starting from $y(0) = 1$ with $N$ steps to $x_N = 1$, this approximates $y(1) = e$ by $\left(1 + \tfrac{1}{N}\right)^N$.
  \item For $y' = -y$, Euler's method gives $y_n = (1-h)^n y_0$. The true solution decays, but when $h > 2$ we have $|1 - h| > 1$ and the iterates oscillate and grow. Try $N = 2$ or $N = 3$. A convergent method can still behave badly when the step is too large.
\end{itemize}
\end{remark}
</div>
