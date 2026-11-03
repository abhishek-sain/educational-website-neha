/* =========================================================
   EduSphere — Blog listing + blog details rendering
   ========================================================= */

(function () {
  let state = { search: "", category: "All" };

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function filteredBlogs() {
    let list = EDU_DATA.blogs.slice();
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    if (state.category !== "All") list = list.filter((b) => b.category === state.category);
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function buildCategoryFilters() {
    const wrap = document.getElementById("blogCategoryFilters");
    if (!wrap) return;
    const categories = ["All", ...new Set(EDU_DATA.blogs.map((b) => b.category))];
    wrap.innerHTML = categories
      .map((cat) => `<button class="filter-pill ${cat === state.category ? "active" : ""}" data-category="${cat}">${cat}</button>`)
      .join("");
  }

  function renderBlogGrid() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;
    const list = filteredBlogs();
    const featured = list[0];
    const rest = list.slice(1);

    const featuredEl = document.getElementById("featuredBlog");
    if (featuredEl && featured) {
      featuredEl.innerHTML = `
        <div class="card-thumb" style="aspect-ratio:16/7;">
          <img src="${featured.thumb}" alt="${featured.title}" loading="lazy">
          <span class="card-badge">${featured.category}</span>
        </div>
        <div class="card-body">
          <h2 style="margin-top:0.5rem;"><a href="blog-details.html?id=${featured.id}">${featured.title}</a></h2>
          <p>${featured.excerpt}</p>
          <div class="blog-card-meta">
            <span><i class="fa-regular fa-user"></i> ${featured.author}</span>
            <span><i class="fa-regular fa-calendar"></i> ${EDU.formatDate(featured.date)}</span>
            <span><i class="fa-regular fa-clock"></i> ${featured.readTime}</span>
          </div>
          <a href="blog-details.html?id=${featured.id}" class="btn btn-primary" style="margin-top:0.5rem;">Read Full Article</a>
        </div>`;
      featuredEl.style.display = "grid";
    } else if (featuredEl) {
      featuredEl.style.display = "none";
    }

    grid.innerHTML = rest.length
      ? rest.map(EDU.blogCardHTML).join("")
      : `<p class="text-center" style="grid-column:1/-1;">No articles match your search.</p>`;
  }

  function initBlogListPage() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    buildCategoryFilters();
    renderBlogGrid();

    document.getElementById("blogSearch")?.addEventListener("input", (e) => {
      state.search = e.target.value;
      renderBlogGrid();
    });

    document.getElementById("blogCategoryFilters")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      state.category = btn.dataset.category;
      document.querySelectorAll("#blogCategoryFilters .filter-pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      renderBlogGrid();
    });

    const popularList = document.getElementById("popularArticles");
    if (popularList) {
      popularList.innerHTML = EDU_DATA.blogs.slice(0, 4).map(
        (b) => `<li style="display:flex;gap:0.7rem;margin-bottom:0.9rem;">
          <img src="${b.thumb}" alt="${b.title}" style="width:64px;height:64px;object-fit:cover;border-radius:8px;flex-shrink:0;" loading="lazy">
          <a href="blog-details.html?id=${b.id}" style="font-size:0.9rem;font-weight:600;">${b.title}</a>
        </li>`
      ).join("");
    }
  }

  /* ---------- Blog details page ---------- */
  function initBlogDetailsPage() {
    const root = document.getElementById("articleRoot");
    if (!root) return;

    const id = getParam("id") || EDU_DATA.blogs[0].id;
    const blogs = EDU_DATA.blogs;
    const index = blogs.findIndex((b) => b.id === id);
    const blog = blogs[index] || blogs[0];
    const prev = blogs[index - 1];
    const next = blogs[index + 1];

    document.title = `${blog.title} | EduSphere Blog`;
    document.getElementById("articleCategory").textContent = blog.category;
    document.getElementById("articleTitle").textContent = blog.title;
    document.getElementById("articleAuthor").textContent = blog.author;
    document.getElementById("articleDate").textContent = EDU.formatDate(blog.date);
    document.getElementById("articleReadTime").textContent = blog.readTime;
    document.getElementById("articleImage").src = blog.thumb;
    document.getElementById("articleImage").alt = blog.title;
    document.getElementById("articleContent").innerHTML = blog.content;

    const headings = [...document.getElementById("articleContent").querySelectorAll("h2")];
    headings.forEach((h, i) => (h.id = `section-${i}`));
    const toc = document.getElementById("tableOfContents");
    if (toc) {
      toc.innerHTML = headings.map((h) => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join("");
    }

    const navWrap = document.getElementById("articleNav");
    if (navWrap) {
      navWrap.innerHTML = `
        ${prev ? `<a href="blog-details.html?id=${prev.id}"><span class="label"><i class="fa-solid fa-arrow-left"></i> Previous</span>${prev.title}</a>` : "<span></span>"}
        ${next ? `<a href="blog-details.html?id=${next.id}" style="text-align:right;"><span class="label">Next <i class="fa-solid fa-arrow-right"></i></span>${next.title}</a>` : "<span></span>"}`;
    }

    const related = blogs.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 3);
    const relatedWrap = document.getElementById("relatedArticles");
    if (relatedWrap) relatedWrap.innerHTML = (related.length ? related : blogs.filter(b=>b.id!==blog.id).slice(0,3)).map(EDU.blogCardHTML).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBlogListPage();
    initBlogDetailsPage();
  });
})();
