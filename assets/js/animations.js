/* =========================================================
   EduSphere — Supplementary micro-interactions
   (Core reveal/counter engines live in main.js; this file
   adds optional hover/parallax polish.)
   ========================================================= */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCardTilt() {
    if (reduceMotion) return;
    document.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".hero-media img");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    document.addEventListener("mouseleave", (e) => {
      const card = e.target.closest && e.target.closest(".hero-media img");
      if (card) card.style.transform = "none";
    }, true);
  }

  function initActiveTabIndicator() {
    document.querySelectorAll(".tab-nav").forEach((nav) => {
      nav.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-tab]");
        if (!btn) return;
        nav.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const panelGroup = btn.closest(".tab-nav").parentElement;
        panelGroup.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        const panel = panelGroup.querySelector(`#${btn.dataset.tab}`);
        if (panel) panel.classList.add("active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCardTilt();
    initActiveTabIndicator();
  });
})();
