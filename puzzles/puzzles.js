// Puzzle set pages. Load this with a plain <script> in the page body, so it runs
// before the deferred MathJax script reads its config.

// Colors for the multiplication problem, matching its app: x digits, y digits, products.
// The colors live in puzzles.css (.pz-x/.pz-y/.pz-p): a hex color written inside a
// macro body would be read as a parameter reference (#2...).
(function () {
  var macros = window.MathJax && MathJax.tex && MathJax.tex.macros;
  if (!macros) return;
  macros.xc = ['\\class{pz-x}{#1}', 1];
  macros.yc = ['\\class{pz-y}{#1}', 1];
  macros.pc = ['\\class{pz-p}{#1}', 1];
})();

// Embedded apps load only when their dropdown is first opened, then size
// themselves from the height each app reports with postMessage({embedHeight}).
document.addEventListener('DOMContentLoaded', function () {
  var frames = Array.prototype.slice.call(document.querySelectorAll('.pz-embed iframe[data-src]'));

  frames.forEach(function (frame) {
    var drop = frame.closest('details');
    function load() { if (!frame.getAttribute('src')) frame.src = frame.getAttribute('data-src'); }
    if (!drop || drop.open) load();
    else drop.addEventListener('toggle', function () { if (drop.open) load(); });
  });

  window.addEventListener('message', function (e) {
    var h = e.data && e.data.embedHeight;
    if (typeof h !== 'number' || h < 100 || h > 20000) return;
    frames.forEach(function (frame) {
      if (e.source === frame.contentWindow) frame.style.height = h + 'px';
    });
  });

  // A link to #some-id inside a closed dropdown opens it first.
  function openTarget() {
    var el = location.hash && document.getElementById(location.hash.slice(1));
    var drop = el && el.closest('details');
    if (drop && !drop.open) { drop.open = true; el.scrollIntoView(); }
  }
  window.addEventListener('hashchange', openTarget);
  openTarget();
});
