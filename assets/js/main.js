/* =========================================================
   EduSphere — Core site behavior: header/footer, nav, scroll
   effects, toasts, reveal animations, counters, accordions.
   ========================================================= */

window.EDU = window.EDU || {};

/* ---------- Shared render helpers ---------- */
EDU.starsHTML = function (rating) {
  const full = Math.round(rating);
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `<i class="fa-${i < full ? "solid" : "regular"} fa-star"></i>`;
  }
  return html;
};

EDU.formatPrice = function (course) {
  if (course.free) return `<span class="card-price free-label">Free</span>`;
  return `<span class="card-price">$${course.price.toFixed(2)}</span>`;
};

EDU.instructorById = function (id) {
  return EDU_DATA.instructors.find((i) => i.id === id);
};

EDU.courseCardHTML = function (course) {
  const instructor = EDU.instructorById(course.instructorId);
  return `
    <article class="card" data-reveal>
      <div class="card-thumb">
        <img src="${course.thumb}" alt="${course.title} course thumbnail" loading="lazy" onerror="this.src='https://via.placeholder.com/600x375/1E40AF/ffffff?text=EduSphere'">
        <span class="card-badge ${course.free ? "free" : ""}">${course.free ? "Free" : course.level}</span>
      </div>
      <div class="card-body">
        <span class="card-category">${course.category}</span>
        <h3><a href="course-details.html?id=${course.id}">${course.title}</a></h3>
        <div class="card-meta">
          <span><i class="fa-regular fa-clock"></i> ${course.duration}</span>
          <span><i class="fa-regular fa-user"></i> ${course.students.toLocaleString()} students</span>
        </div>
        <div class="card-rating">${course.rating.toFixed(1)} ${EDU.starsHTML(course.rating)} <span>(${course.reviews})</span></div>
        <div class="card-footer">
          <div class="card-instructor">
            <img src="${instructor.photo}" alt="${instructor.name}" loading="lazy">
            ${instructor.name}
          </div>
          ${EDU.formatPrice(course)}
        </div>
      </div>
    </article>`;
};

EDU.blogCardHTML = function (blog) {
  return `
    <article class="card blog-card" data-reveal>
      <div class="card-thumb">
        <img src="${blog.thumb}" alt="${blog.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/1E40AF/ffffff?text=EduSphere'">
        <span class="card-badge">${blog.category}</span>
      </div>
      <div class="card-body">
        <h3><a href="blog-details.html?id=${blog.id}">${blog.title}</a></h3>
        <p>${blog.excerpt}</p>
        <div class="blog-card-meta">
          <span><i class="fa-regular fa-user"></i> ${blog.author}</span>
          <span><i class="fa-regular fa-calendar"></i> ${EDU.formatDate(blog.date)}</span>
          <span><i class="fa-regular fa-clock"></i> ${blog.readTime}</span>
        </div>
        <a href="blog-details.html?id=${blog.id}" class="btn btn-ghost btn-sm" style="padding-left:0">Read More <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>`;
};

EDU.formatDate = function (iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ---------- Header / Footer templates ---------- */
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About Us" },
  { href: "courses.html", label: "Courses" },
  { href: "programs.html", label: "Programs" },
  { href: "resources.html", label: "Study Resources" },
  { href: "blog.html", label: "Blog" },
  { href: "contact.html", label: "Contact" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function buildHeader() {
  const active = currentPage();
  const links = NAV_LINKS.map(
    (l) => `<li><a class="nav-link ${l.href === active ? "active" : ""}" href="${l.href}">${l.label}</a></li>`
  ).join("");
  return `
  <div class="announcement-bar">
    🎓 New Cohort Enrolling Now — <a href="courses.html">Browse Courses</a> and save 20% this month.
  </div>
  <header class="site-header" id="siteHeader">
    <nav class="navbar">
      <a href="index.html" class="logo"><i class="fa-solid fa-graduation-cap"></i> EduSphere</a>
      <ul class="nav-menu" id="navMenu">
        ${links}
        <li class="nav-actions-mobile">
          <a href="login.html" class="btn btn-outline btn-block">Login</a>
          <a href="courses.html" class="btn btn-primary btn-block">Get Started</a>
        </li>
      </ul>
      <div class="nav-actions">
        <a href="login.html" class="btn-ghost">Login</a>
        <a href="courses.html" class="btn btn-primary">Get Started</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>
  <div class="nav-overlay" id="navOverlay"></div>`;
}

function buildFooter() {
  const year = new Date().getFullYear();
  return `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo"><i class="fa-solid fa-graduation-cap"></i> EduSphere</a>
        <p>Premium online education platform helping learners worldwide build real, career-ready skills through expert-led courses and programs.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="courses.html">Courses</a></li>
          <li><a href="programs.html">Programs</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Categories</h4>
        <ul>
          <li><a href="courses.html?category=Web%20Development">Web Development</a></li>
          <li><a href="courses.html?category=Data%20Science">Data Science</a></li>
          <li><a href="courses.html?category=Artificial%20Intelligence">Artificial Intelligence</a></li>
          <li><a href="courses.html?category=Business%20%26%20Management">Business & Management</a></li>
          <li><a href="courses.html?category=Mathematics">Mathematics</a></li>
        </ul>
      </div>
      <div class="footer-col footer-newsletter">
        <h4>Stay Updated</h4>
        <p>Subscribe for new courses, resources, and learning tips.</p>
        <form id="footerNewsletterForm" novalidate>
          <input type="email" required placeholder="Your email address" aria-label="Email for newsletter">
          <button type="submit" class="btn btn-accent"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <p class="form-feedback" id="footerNewsletterFeedback"></p>
        <p style="margin-top:0.8rem;color:#AEB9D4;font-size:0.85rem;"><i class="fa-regular fa-envelope"></i> hello@edusphere.example &nbsp; <i class="fa-regular fa-phone"></i> +1 (555) 012-3456</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} EduSphere. All rights reserved.</span>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="404.html">Sitemap</a>
      </div>
    </div>
  </div>`;
}

function mountHeaderFooter() {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = buildHeader();
  if (footerEl) footerEl.innerHTML = buildFooter();
}

/* ---------- Navigation behavior ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const overlay = document.getElementById("navOverlay");
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove("active");
    menu.classList.remove("open");
    overlay.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    toggle.classList.add("active");
    menu.classList.add("open");
    overlay.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });
  overlay.addEventListener("click", closeMenu);

  menu.addEventListener("click", (e) => {
    const link = e.target.closest(".nav-link");
    if (link && window.innerWidth <= 767) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) closeMenu();
  });
}

function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  });
}

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.id = "backToTop";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const run = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (el.dataset.suffix || "");
    }
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => observer.observe(c));
}

/* ---------- Toast notifications ---------- */
(function initToastContainer() {
  if (document.getElementById("toastContainer")) return;
  const container = document.createElement("div");
  container.className = "toast-container";
  container.id = "toastContainer";
  document.body.appendChild(container);
})();

EDU.showToast = function (message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 3600);
};

/* ---------- Generic accordion (FAQ + curriculum reuse) ---------- */
EDU.initAccordion = function (containerSelector, itemSelector, triggerSelector, panelSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.addEventListener("click", (e) => {
    const trigger = e.target.closest(triggerSelector);
    if (!trigger) return;
    const item = trigger.closest(itemSelector);
    const panel = item.querySelector(panelSelector);
    const isOpen = item.classList.contains("open");

    item.parentElement.querySelectorAll(itemSelector).forEach((other) => {
      other.classList.remove("open");
      const p = other.querySelector(panelSelector);
      if (p) p.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + 40 + "px";
    }
  });
};

/* ---------- Boot sequence ---------- */
document.addEventListener("DOMContentLoaded", () => {
  mountHeaderFooter();
  initNav();
  initStickyHeader();
  initSmoothScroll();
  initBackToTop();
  initScrollReveal();
  initCounters();
  EDU.initAccordion(".faq-list", ".accordion-item", ".accordion-trigger", ".accordion-panel");

  const footerForm = document.getElementById("footerNewsletterForm");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = footerForm.querySelector("input");
      const feedback = document.getElementById("footerNewsletterFeedback");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.className = "form-feedback error";
        return;
      }
      feedback.textContent = "Subscribed! Check your inbox for a welcome email.";
      feedback.className = "form-feedback success";
      EDU.showToast("Thanks for subscribing to EduSphere!", "success");
      footerForm.reset();
    });
  }

  document.dispatchEvent(new CustomEvent("edu:ready"));
});
