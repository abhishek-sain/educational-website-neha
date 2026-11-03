/* Rajasthan Facts — Header navigation, mobile drawer, search overlay, theme */
(function () {
  "use strict";

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSearchOverlay();
    initStickyHeaderShadow();
    initTheme();
  });

  function initMobileNav() {
    const toggle = qs(".menu-toggle");
    const drawer = qs(".mobile-nav");
    const closeBtn = qs(".mobile-nav .close-btn");
    if (!toggle || !drawer) return;
    toggle.addEventListener("click", function () {
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    function close() {
      drawer.classList.remove("open");
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", close);
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function initSearchOverlay() {
    const overlay = qs(".search-overlay");
    const openBtns = qsa("[data-open-search]");
    const closeBtn = qs(".search-overlay .close-btn");
    const input = qs(".search-overlay input[type='search']");
    if (!overlay) return;

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        if (input) setTimeout(function () { input.focus(); }, 50);
      });
    });
    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    if (input && typeof RF_SEARCH_INDEX !== "undefined") {
      input.addEventListener("input", function () {
        renderSuggestions(input.value);
      });
    }

    const form = qs(".search-overlay-box form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const val = input ? input.value.trim() : "";
        if (val) window.location.href = "search.html?q=" + encodeURIComponent(val);
      });
    }
  }

  function renderSuggestions(query) {
    const box = qs(".search-suggest");
    if (!box) return;
    const q = query.trim().toLowerCase();
    box.innerHTML = "";
    if (!q) return;
    const results = (typeof rfSearch === "function" ? rfSearch(q) : []).slice(0, 8);
    if (!results.length) {
      box.innerHTML = '<p style="padding:10px;color:var(--color-text-secondary);font-size:0.85rem;">कोई परिणाम नहीं मिला।</p>';
      return;
    }
    results.forEach(function (r) {
      const a = document.createElement("a");
      a.href = r.url;
      const titleSpan = document.createElement("span");
      titleSpan.textContent = r.title;
      const tagSpan = document.createElement("span");
      tagSpan.className = "tag";
      tagSpan.textContent = r.type;
      a.appendChild(titleSpan);
      a.appendChild(tagSpan);
      box.appendChild(a);
    });
  }

  function initStickyHeaderShadow() {
    const header = qs(".site-header");
    if (!header) return;
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 10 ? "var(--shadow-sm)" : "none";
    }, { passive: true });
  }

  function initTheme() {
    const toggle = qs("[data-theme-toggle]");
    if (!toggle) return;
    try {
      const saved = localStorage.getItem("rf-theme");
      if (saved) document.documentElement.setAttribute("data-theme", saved);
    } catch (e) { /* storage unavailable */ }
    toggle.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("rf-theme", next); } catch (e) { /* ignore */ }
    });
  }
})();
