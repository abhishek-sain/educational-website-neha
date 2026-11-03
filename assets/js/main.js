/* Rajasthan Facts — Global site behaviors:
   FAQ accordion, back-to-top, toasts, scroll reveal, reading progress. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initFaq();
    initBackToTop();
    initReveal();
    initReadingProgress();
    initDailyGkWidget();
  });

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      const btn = item.querySelector(".faq-question");
      if (!btn) return;
      btn.addEventListener("click", function () {
        const wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("open"); });
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  }

  function initReadingProgress() {
    const bar = document.querySelector(".reading-progress");
    const article = document.querySelector(".content-body");
    if (!bar || !article) return;
    window.addEventListener("scroll", function () {
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - article.offsetTop + 200;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      bar.style.width = pct + "%";
    }, { passive: true });
  }

  function initDailyGkWidget() {
    const widget = document.querySelector("[data-daily-gk]");
    if (!widget || typeof RF_DAILY_GK === "undefined") return;
    let index = RF_DAILY_GK.length - 1; // latest by default
    renderDaily(widget, index);

    widget.addEventListener("click", function (e) {
      const optBtn = e.target.closest(".option-btn");
      if (optBtn) {
        const options = widget.querySelectorAll(".option-btn");
        const selectedIdx = Array.from(options).indexOf(optBtn);
        const item = RF_DAILY_GK[index];
        options.forEach(function (o, i) {
          o.classList.add("disabled");
          if (i === item.correct) o.classList.add("correct");
          else if (i === selectedIdx) o.classList.add("incorrect");
        });
        const exp = widget.querySelector(".explanation-box");
        if (exp) exp.classList.add("show");
        return;
      }
      const prevBtn = e.target.closest("[data-daily-prev]");
      const nextBtn = e.target.closest("[data-daily-next]");
      if (prevBtn && index > 0) { index--; renderDaily(widget, index); }
      if (nextBtn && index < RF_DAILY_GK.length - 1) { index++; renderDaily(widget, index); }
    });
  }

  function renderDaily(widget, index) {
    const item = RF_DAILY_GK[index];
    const dateTag = widget.querySelector(".date-tag");
    const qEl = widget.querySelector(".daily-q");
    const optsEl = widget.querySelector(".options");
    const exp = widget.querySelector(".explanation-box");
    if (dateTag) dateTag.textContent = "प्रश्न तिथि: " + item.date + " · स्थिर डेमो प्रश्न सेट";
    if (qEl) qEl.textContent = item.q;
    if (exp) { exp.classList.remove("show"); exp.textContent = "व्याख्या: " + item.explain; }
    if (optsEl) {
      optsEl.innerHTML = "";
      item.options.forEach(function (opt) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        btn.textContent = opt;
        optsEl.appendChild(btn);
      });
    }
    const prevBtn = widget.querySelector("[data-daily-prev]");
    const nextBtn = widget.querySelector("[data-daily-next]");
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === RF_DAILY_GK.length - 1;
  }

  window.rfToast = function (message, type) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast " + (type || "info");
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s";
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  };
})();
