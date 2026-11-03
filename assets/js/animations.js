/* Rajasthan Facts — Small supplemental animation helpers (counters etc.) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initCounters();
  });

  function initCounters() {
    const counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { obs.observe(el); });
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
})();
