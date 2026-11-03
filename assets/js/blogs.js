/* Rajasthan Facts — Blog listing (blog.html) and detail (blog-details.html) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof RF_BLOGS === "undefined") return;
    initListing();
    initDetail();
  });

  function initListing() {
    const grid = document.getElementById("blog-grid");
    if (!grid) return;

    let activeCategory = "all";
    let searchTerm = "";

    function render() {
      const filtered = RF_BLOGS.filter(function (b) {
        const matchCat = activeCategory === "all" || b.category === activeCategory;
        const matchSearch = !searchTerm || (b.title + b.excerpt).toLowerCase().indexOf(searchTerm) !== -1;
        return matchCat && matchSearch;
      });
      grid.innerHTML = "";
      if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">📰</div><p>कोई लेख नहीं मिला।</p></div>';
        return;
      }
      filtered.forEach(function (b) {
        grid.appendChild(buildCard(b));
      });
    }

    document.querySelectorAll("[data-blog-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-blog-filter]").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-blog-filter");
        render();
      });
    });

    const searchInput = document.getElementById("blog-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        searchTerm = searchInput.value.trim().toLowerCase();
        render();
      });
    }

    render();

    const featuredWrap = document.getElementById("blog-featured");
    if (featuredWrap) {
      featuredWrap.innerHTML = "";
      RF_BLOGS.filter(function (b) { return b.featured; }).forEach(function (b) {
        featuredWrap.appendChild(buildCard(b));
      });
    }
  }

  function buildCard(b) {
    const card = document.createElement("div");
    card.className = "article-card";

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.style.background = "linear-gradient(135deg, var(--color-primary), var(--color-secondary))";
    thumb.style.display = "flex";
    thumb.style.alignItems = "center";
    thumb.style.justifyContent = "center";
    thumb.style.color = "#fff";
    thumb.style.fontFamily = "var(--font-en)";
    thumb.style.fontWeight = "700";
    thumb.textContent = b.categoryLabel;

    const body = document.createElement("div");
    body.className = "body";

    const meta = document.createElement("div");
    meta.className = "article-meta";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = b.categoryLabel;
    const date = document.createElement("span");
    date.textContent = b.date + " · " + b.readingTime + " मिनट पठन";
    meta.appendChild(badge);
    meta.appendChild(date);

    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    a.href = "blog-details.html?id=" + b.id;
    a.textContent = b.title;
    a.style.color = "inherit";
    h3.appendChild(a);

    const p = document.createElement("p");
    p.textContent = b.excerpt;

    const readMore = document.createElement("a");
    readMore.href = "blog-details.html?id=" + b.id;
    readMore.className = "read-more";
    readMore.textContent = "पूरा पढ़ें →";

    body.appendChild(meta);
    body.appendChild(h3);
    body.appendChild(p);
    body.appendChild(readMore);
    card.appendChild(thumb);
    card.appendChild(body);
    return card;
  }

  function initDetail() {
    const root = document.getElementById("blog-detail-app");
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || RF_BLOGS[0].id;
    const b = RF_BLOGS.find(function (x) { return x.id === id; });
    if (!b) {
      root.innerHTML = '<div class="empty-state"><div class="icon">❓</div><p>यह लेख नहीं मिला।</p><a href="blog.html" class="btn btn-primary">सभी लेख देखें</a></div>';
      return;
    }
    document.title = b.title + " | Rajasthan Facts";
    setText("blog-detail-title", b.title);
    setText("blog-detail-meta", b.author + " · " + b.date + " · " + b.readingTime + " मिनट पठन · " + b.categoryLabel);

    const bodyWrap = document.getElementById("blog-detail-body");
    if (bodyWrap) {
      bodyWrap.innerHTML = "";
      b.body.forEach(function (para) {
        const p = document.createElement("p");
        p.textContent = para;
        bodyWrap.appendChild(p);
      });
    }

    const relatedWrap = document.getElementById("blog-detail-related");
    if (relatedWrap) {
      relatedWrap.innerHTML = "";
      (b.related || []).forEach(function (relId) {
        const rel = RF_BLOGS.find(function (x) { return x.id === relId; });
        if (!rel) return;
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "blog-details.html?id=" + rel.id;
        a.textContent = rel.title;
        li.appendChild(a);
        relatedWrap.appendChild(li);
      });
    }

    const idx = RF_BLOGS.indexOf(b);
    setupNav("blog-prev", RF_BLOGS[idx - 1]);
    setupNav("blog-next", RF_BLOGS[idx + 1]);
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setupNav(id, b) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!b) { el.style.display = "none"; return; }
    el.href = "blog-details.html?id=" + b.id;
    const titleEl = el.querySelector(".nav-title");
    if (titleEl) titleEl.textContent = b.title;
  }
})();
