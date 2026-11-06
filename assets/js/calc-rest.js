// Live math under a Desmos graph waits for the reader to pause. Numbers changing
// mid-drag can't be read anyway, and rewriting centered math on every frame makes
// it shake. While things move, the last numbers stay in place, dimmed (see
// .is-calc-moving in main.scss); they update once movement has stopped.
(function () {
  var REST_MS = 250;

  function dropOf(el) {
    return el.closest('details') || el;
  }

  // Returns a function to call on every change. fn runs once, after a pause.
  // anchorId is any element inside the readout, which is what gets dimmed.
  window.calcOnRest = function (anchorId, fn) {
    var timer;
    return function () {
      var drop = dropOf(document.getElementById(anchorId));
      drop.classList.add('is-calc-moving');
      clearTimeout(timer);
      timer = setTimeout(function () {
        drop.classList.remove('is-calc-moving');
        fn();
      }, REST_MS);
    };
  };

  // For pages that write [id, tex] pairs, several readouts at a time. Pairs for
  // elements with "-calc-" in their id wait, per readout; others apply right away.
  var waiting = new Map();
  window.calcOnRestPairs = function (pairs, apply) {
    var now = pairs.filter(function (p) { return p[0].indexOf('-calc-') < 0; });
    if (now.length) { apply(now); }

    pairs.forEach(function (p) {
      if (p[0].indexOf('-calc-') < 0) { return; }
      var el = document.getElementById(p[0]);
      if (!el) { return; }
      var drop = dropOf(el), w = waiting.get(drop);
      if (!w) { w = { pairs: {} }; waiting.set(drop, w); }
      w.pairs[p[0]] = p[1];
      drop.classList.add('is-calc-moving');
      clearTimeout(w.timer);
      w.timer = setTimeout(function () {
        drop.classList.remove('is-calc-moving');
        var ready = Object.keys(w.pairs).map(function (id) { return [id, w.pairs[id]]; });
        w.pairs = {};
        apply(ready);
      }, REST_MS);
    });
  };
})();
