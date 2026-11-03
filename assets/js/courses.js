/* =========================================================
   EduSphere — Courses listing + course details rendering
   ========================================================= */

(function () {
  const PAGE_SIZE = 6;
  let state = {
    search: "",
    category: "All",
    level: "All",
    price: "All",
    sort: "popular",
    page: 1,
  };

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function filteredCourses() {
    let list = EDU_DATA.courses.slice();

    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (state.category !== "All") list = list.filter((c) => c.category === state.category);
    if (state.level !== "All") list = list.filter((c) => c.level === state.level);
    if (state.price === "Free") list = list.filter((c) => c.free);
    if (state.price === "Paid") list = list.filter((c) => !c.free);

    switch (state.sort) {
      case "popular":
        list.sort((a, b) => b.popular - a.popular);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.newDate) - new Date(a.newDate));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
    }
    return list;
  }

  function renderResultCount(total) {
    const el = document.getElementById("resultCount");
    if (el) el.textContent = `${total} course${total !== 1 ? "s" : ""} found`;
  }

  function renderCourseGrid() {
    const grid = document.getElementById("courseGrid");
    if (!grid) return;
    const all = filteredCourses();
    renderResultCount(all.length);

    const visible = all.slice(0, state.page * PAGE_SIZE);
    if (!visible.length) {
      grid.innerHTML = `<div class="text-center" style="grid-column:1/-1;padding:3rem 0;">
        <i class="fa-regular fa-face-frown" style="font-size:2.2rem;color:var(--color-text-muted);"></i>
        <p>No courses match your filters. Try adjusting your search.</p>
      </div>`;
    } else {
      grid.innerHTML = visible.map(EDU.courseCardHTML).join("");
    }

    const loadMoreWrap = document.getElementById("loadMoreWrap");
    if (loadMoreWrap) loadMoreWrap.style.display = visible.length < all.length ? "block" : "none";

    initScrollRevealRefresh();
  }

  function initScrollRevealRefresh() {
    document.querySelectorAll("#courseGrid [data-reveal]").forEach((el) => el.classList.add("in-view"));
  }

  function buildCategoryFilters() {
    const wrap = document.getElementById("categoryFilters");
    if (!wrap) return;
    const categories = ["All", ...new Set(EDU_DATA.courses.map((c) => c.category))];
    wrap.innerHTML = categories
      .map((cat) => `<button class="filter-pill ${cat === state.category ? "active" : ""}" data-category="${cat}">${cat}</button>`)
      .join("");
  }

  function initCoursesPage() {
    const grid = document.getElementById("courseGrid");
    if (!grid) return;

    const initialCategory = getParam("category");
    if (initialCategory) state.category = initialCategory;

    buildCategoryFilters();
    renderCourseGrid();

    const searchInput = document.getElementById("courseSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.search = e.target.value;
        state.page = 1;
        renderCourseGrid();
      });
    }

    document.getElementById("categoryFilters")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill");
      if (!btn) return;
      state.category = btn.dataset.category;
      state.page = 1;
      document.querySelectorAll("#categoryFilters .filter-pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      renderCourseGrid();
    });

    document.querySelectorAll("input[name='levelFilter']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        state.level = e.target.value;
        state.page = 1;
        renderCourseGrid();
      });
    });

    document.querySelectorAll("input[name='priceFilter']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        state.price = e.target.value;
        state.page = 1;
        renderCourseGrid();
      });
    });

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        renderCourseGrid();
      });
    }

    document.getElementById("loadMoreBtn")?.addEventListener("click", () => {
      state.page++;
      renderCourseGrid();
    });
  }

  /* ---------- Course details page ---------- */
  function initCourseDetailsPage() {
    const root = document.getElementById("courseDetailRoot");
    if (!root) return;

    const id = getParam("id") || EDU_DATA.courses[0].id;
    const course = EDU_DATA.courses.find((c) => c.id === id) || EDU_DATA.courses[0];
    const instructor = EDU.instructorById(course.instructorId);
    const curriculum = EDU_DATA.curriculumFor(course);
    const reviews = EDU_DATA.reviewsFor();

    document.title = `${course.title} | EduSphere`;

    document.getElementById("breadcrumbTitle").textContent = course.title;
    document.getElementById("courseTitle").textContent = course.title;
    document.getElementById("courseCategoryBadge").textContent = course.category;
    document.getElementById("courseLevelBadge").textContent = course.level;
    document.getElementById("courseDescription").textContent = course.description;
    document.getElementById("courseRatingText").innerHTML = `${EDU.starsHTML(course.rating)} <strong>${course.rating.toFixed(1)}</strong> (${course.reviews} reviews) · ${course.students.toLocaleString()} students`;
    document.getElementById("courseThumb").src = course.thumb;
    document.getElementById("courseThumb").alt = course.title;

    document.getElementById("instructorCard").innerHTML = `
      <img src="${instructor.photo}" alt="${instructor.name}" loading="lazy">
      <div><strong>${instructor.name}</strong><br><span>${instructor.title}</span></div>`;

    document.getElementById("priceTag").innerHTML = course.free ? "Free" : `$${course.price.toFixed(2)}`;
    document.getElementById("sidebarList").innerHTML = `
      <li><span><i class="fa-regular fa-clock"></i> Duration</span><strong>${course.duration}</strong></li>
      <li><span><i class="fa-solid fa-signal"></i> Level</span><strong>${course.level}</strong></li>
      <li><span><i class="fa-regular fa-user"></i> Students</span><strong>${course.students.toLocaleString()}</strong></li>
      <li><span><i class="fa-solid fa-infinity"></i> Access</span><strong>Lifetime</strong></li>
      <li><span><i class="fa-solid fa-certificate"></i> Certificate</span><strong>Yes</strong></li>`;

    document.getElementById("outcomesList").innerHTML = course.tags
      .concat(["Build a real-world project", "Debug confidently"])
      .map((t) => `<li><i class="fa-solid fa-circle-check"></i> Understand and apply ${t}</li>`)
      .join("");

    document.getElementById("requirementsList").innerHTML = `
      <li><i class="fa-solid fa-circle-check"></i> A computer with internet access</li>
      <li><i class="fa-solid fa-circle-check"></i> No paid software required</li>
      <li><i class="fa-solid fa-circle-check"></i> Willingness to practice consistently</li>`;

    document.getElementById("curriculumList").innerHTML = curriculum
      .map(
        (mod, i) => `
      <div class="curriculum-module ${i === 0 ? "open" : ""}">
        <button class="curriculum-module-header">
          <span>${mod.title}</span>
          <span><i class="fa-solid fa-chevron-down"></i> ${mod.lessons.length} lessons</span>
        </button>
        <ul class="curriculum-lessons" style="${i === 0 ? "max-height:300px;" : ""}">
          ${mod.lessons.map((l) => `<li><i class="fa-regular fa-circle-play"></i> ${l}</li>`).join("")}
        </ul>
      </div>`
      )
      .join("");

    document.getElementById("reviewsList").innerHTML = reviews
      .map(
        (r) => `
      <div class="review-item">
        <img src="${r.photo}" alt="${r.name}" loading="lazy">
        <div>
          <strong>${r.name}</strong> <span style="color:var(--color-text-muted);font-size:0.82rem;">· ${EDU.formatDate(r.date)}</span>
          <div class="testimonial-stars">${EDU.starsHTML(r.rating)}</div>
          <p>${r.text}</p>
        </div>
      </div>`
      )
      .join("");

    const related = EDU_DATA.courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);
    document.getElementById("relatedCourses").innerHTML = related.map(EDU.courseCardHTML).join("");

    document.getElementById("curriculumList").addEventListener("click", (e) => {
      const header = e.target.closest(".curriculum-module-header");
      if (!header) return;
      const mod = header.closest(".curriculum-module");
      const list = mod.querySelector(".curriculum-lessons");
      const isOpen = mod.classList.toggle("open");
      list.style.maxHeight = isOpen ? list.scrollHeight + "px" : null;
    });

    document.getElementById("enrollBtn")?.addEventListener("click", () => {
      EDU.showToast(`Enrolled in "${course.title}" (demo only).`, "success");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCoursesPage();
    initCourseDetailsPage();
  });
})();
