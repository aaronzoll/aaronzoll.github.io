/* ===========================================================================
   gallery-video-preview.js — generic hover/tap-to-play wiring for any
   <video class="gallery-anim"> inside a .gallery-card on the Gallery page.
   Applies to every such video automatically (no per-card JS needed); the
   couch card is excluded since it's a live-drawn canvas with its own script.

   Plays from the start on hover/focus (desktop) or once "is-revealed" is
   toggled by the tap-to-reveal script (touch), pausing on the last frame for
   PAUSE_MS before looping instead of using the native loop attribute.

   Speed: no need to re-export the mp4 to change its pace — set
   video.playbackRate. Defaults to PLAYBACK_RATE below for every preview;
   a single card can override it with data-playback-rate="0.5" etc.

   Markup note: give each <video> preload="auto" (not "none"/"metadata").
   These clips are small (tens-hundreds of KB), and with preload="none" the
   first hover has to start fetching+decoding cold — the browser then races
   the playback clock to catch up once data arrives, which looks like a
   stall followed by the video skipping its first several frames.
   =========================================================================== */
(function () {
  "use strict";
  var PAUSE_MS = 650; // hold on the last frame before looping back
  var PLAYBACK_RATE = 1; // shared default; override per-card via data-playback-rate

  document.querySelectorAll("video.gallery-anim").forEach(function (video) {
    var link = video.closest(".gallery-card");
    if (!link) return;
    var pauseTimer = null;
    var rate = parseFloat(video.dataset.playbackRate) || PLAYBACK_RATE;

    function clearPauseTimer() {
      if (pauseTimer) { clearTimeout(pauseTimer); pauseTimer = null; }
    }

    function playFromStart() {
      clearPauseTimer();
      video.currentTime = 0;
      video.playbackRate = rate;
      video.play().catch(function () {});
    }

    function stopAndReset() {
      clearPauseTimer();
      video.pause();
      video.currentTime = 0;
    }

    video.addEventListener("ended", function () {
      pauseTimer = setTimeout(function () {
        pauseTimer = null;
        video.currentTime = 0;
        video.play().catch(function () {});
      }, PAUSE_MS);
    });

    link.addEventListener("mouseenter", playFromStart);
    link.addEventListener("mouseleave", stopAndReset);
    link.addEventListener("focus", playFromStart);
    link.addEventListener("blur", stopAndReset);

    // Touch devices: mirrors the tap-to-reveal "is-revealed" class toggled
    // by the gallery's custom_js script (no hover to trigger play/pause).
    new MutationObserver(function () {
      if (link.classList.contains("is-revealed")) playFromStart(); else stopAndReset();
    }).observe(link, { attributes: true, attributeFilter: ["class"] });
  });
})();
