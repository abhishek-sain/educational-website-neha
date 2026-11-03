/* Rajasthan Facts — Listing pages: districts, rajasthan-gk hub, quizzes,
   mock tests, study material, previous year questions, notes detail. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initDistrictsList();
    initGkHub();
    initQuizzesList();
    initMockTestsList();
    initStudyMaterial();
    initPyq();
    initNotesDetail();
  });

  /* ---------- Districts listing ---------- */
  function initDistrictsList() {
    const grid = document.getElementById("districts-grid");
    if (!grid || typeof RF_DISTRICTS === "undefined") return;
    let searchTerm = "";
    let letter = "all";

    function render() {
      const filtered = RF_DISTRICTS.filter(function (d) {
        const matchSearch = !searchTerm || d.name.toLowerCase().indexOf(searchTerm) !== -1 || d.nameEn.toLowerCase().indexOf(searchTerm) !== -1;
        const matchLetter = letter === "all" || d.nameEn.charAt(0).toUpperCase() === letter;
        return matchSearch && matchLetter;
      }).sort(function (a, b) { return a.nameEn.localeCompare(b.nameEn); });

      grid.innerHTML = "";
      if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">🗺️</div><p>कोई जिला नहीं मिला।</p></div>';
        return;
      }
      filtered.forEach(function (d) {
        const card = document.createElement("a");
        card.href = "district-details.html?id=" + d.id;
        card.className = "district-card";
        card.style.display = "block";
        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.textContent = d.nameEn.charAt(0);
        const body = document.createElement("div");
        body.className = "body";
        const h3 = document.createElement("h3");
        h3.textContent = d.name;
        h3.style.color = "var(--color-text)";
        const meta = document.createElement("div");
        meta.className = "meta-row";
        meta.innerHTML = "";
        const span1 = document.createElement("span");
        span1.textContent = "संभाग: " + d.division;
        meta.appendChild(span1);
        const p = document.createElement("p");
        p.style.fontSize = "0.85rem";
        p.style.color = "var(--color-text-secondary)";
        p.textContent = d.famousFor;
        body.appendChild(h3);
        body.appendChild(meta);
        body.appendChild(p);
        card.appendChild(thumb);
        card.appendChild(body);
        grid.appendChild(card);
      });
    }

    const searchInput = document.getElementById("district-search-input");
    if (searchInput) searchInput.addEventListener("input", function () { searchTerm = searchInput.value.trim().toLowerCase(); render(); });

    const alphaWrap = document.getElementById("district-alpha-filter");
    if (alphaWrap) {
      alphaWrap.innerHTML = "";
      const allBtn = document.createElement("button");
      allBtn.textContent = "सभी";
      allBtn.className = "active";
      allBtn.addEventListener("click", function () { setActive(allBtn); letter = "all"; render(); });
      alphaWrap.appendChild(allBtn);
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (ch) {
        const btn = document.createElement("button");
        btn.textContent = ch;
        btn.addEventListener("click", function () { setActive(btn); letter = ch; render(); });
        alphaWrap.appendChild(btn);
      });
      function setActive(target) {
        Array.from(alphaWrap.children).forEach(function (b) { b.classList.remove("active"); });
        target.classList.add("active");
      }
    }

    render();
  }

  /* ---------- Rajasthan GK hub ---------- */
  function initGkHub() {
    const grid = document.getElementById("gk-topics-grid");
    if (!grid || typeof RF_TOPICS === "undefined") return;
    let activeCat = "all";

    function render() {
      const filtered = RF_TOPICS.filter(function (t) { return activeCat === "all" || t.category === activeCat; });
      grid.innerHTML = "";
      filtered.forEach(function (t) {
        const card = document.createElement("a");
        card.href = "topic-details.html?id=" + t.id;
        card.className = "cat-card";
        card.style.display = "block";
        const icon = document.createElement("div");
        icon.className = "cat-icon";
        icon.textContent = t.categoryLabel.charAt(0);
        const h3 = document.createElement("h3");
        h3.textContent = t.title;
        const p = document.createElement("p");
        p.textContent = t.intro.slice(0, 110) + "...";
        const link = document.createElement("span");
        link.className = "cat-link";
        link.textContent = "पढ़ें →";
        card.appendChild(icon);
        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(link);
        grid.appendChild(card);
      });
    }

    document.querySelectorAll("[data-gk-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-gk-filter]").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-gk-filter");
        render();
      });
    });

    render();
  }

  /* ---------- Quizzes listing ---------- */
  function initQuizzesList() {
    const grid = document.getElementById("quizzes-grid");
    if (!grid || typeof RF_QUIZZES === "undefined") return;
    grid.innerHTML = "";
    RF_QUIZZES.forEach(function (q) {
      const card = document.createElement("div");
      card.className = "exam-card";
      const badge = document.createElement("div");
      badge.className = "exam-badge";
      badge.textContent = q.questions.length;
      const h3 = document.createElement("h3");
      h3.textContent = q.title;
      const p = document.createElement("p");
      p.style.fontSize = "0.85rem";
      p.style.color = "var(--color-text-secondary)";
      p.textContent = q.description;
      const meta = document.createElement("p");
      meta.style.fontSize = "0.78rem";
      meta.textContent = q.durationMin + " मिनट · " + q.questions.length + " प्रश्न";
      const btn = document.createElement("a");
      btn.href = "quiz-details.html?id=" + q.id;
      btn.className = "btn btn-primary btn-sm btn-block";
      btn.textContent = "क्विज़ शुरू करें";
      card.appendChild(badge);
      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(meta);
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }

  /* ---------- Mock tests listing ---------- */
  function initMockTestsList() {
    const grid = document.getElementById("mock-tests-grid");
    if (!grid || typeof RF_MOCK_TESTS === "undefined") return;
    grid.innerHTML = "";
    RF_MOCK_TESTS.forEach(function (t) {
      const card = document.createElement("div");
      card.className = "exam-card";
      const badge = document.createElement("div");
      badge.className = "exam-badge";
      badge.textContent = t.exam;
      const h3 = document.createElement("h3");
      h3.textContent = t.title;
      const meta = document.createElement("p");
      meta.style.fontSize = "0.78rem";
      meta.textContent = t.durationMin + " मिनट · " + t.totalMarks + " अंक";
      const btn = document.createElement("a");
      btn.href = "mock-test-details.html?id=" + t.id;
      btn.className = "btn btn-primary btn-sm btn-block";
      btn.textContent = "टेस्ट शुरू करें";
      card.appendChild(badge);
      card.appendChild(h3);
      card.appendChild(meta);
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }

  /* ---------- Study material ---------- */
  function initStudyMaterial() {
    const grid = document.getElementById("resources-grid");
    if (!grid || typeof RF_RESOURCES === "undefined") return;
    let activeCat = "all";
    let searchTerm = "";

    function render() {
      const filtered = RF_RESOURCES.filter(function (r) {
        const matchCat = activeCat === "all" || r.category === activeCat;
        const matchSearch = !searchTerm || (r.title + r.description).toLowerCase().indexOf(searchTerm) !== -1;
        return matchCat && matchSearch;
      });
      grid.innerHTML = "";
      if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">📚</div><p>कोई संसाधन नहीं मिला।</p></div>';
        return;
      }
      filtered.forEach(function (r) {
        const card = document.createElement("div");
        card.className = "resource-card";
        const icon = document.createElement("div");
        icon.className = "res-icon";
        icon.textContent = r.type === "pdf" ? "📄" : "📝";
        const body = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.style.fontSize = "1rem";
        h3.style.marginBottom = "4px";
        h3.textContent = r.title;
        const p = document.createElement("p");
        p.style.fontSize = "0.85rem";
        p.style.color = "var(--color-text-secondary)";
        p.style.margin = "0 0 6px";
        p.textContent = r.description;
        const upd = document.createElement("p");
        upd.className = "last-updated";
        upd.textContent = "अंतिम अपडेट: " + r.lastUpdated;
        const actions = document.createElement("div");
        actions.className = "res-actions";
        const viewBtn = document.createElement("a");
        viewBtn.href = "notes-details.html?id=" + r.id;
        viewBtn.className = "btn btn-ghost btn-sm";
        viewBtn.textContent = "विवरण देखें";
        const dlBtn = document.createElement("a");
        dlBtn.href = r.file;
        dlBtn.className = "btn btn-accent btn-sm";
        dlBtn.textContent = "डाउनलोड (डेमो)";
        dlBtn.setAttribute("download", "");
        actions.appendChild(viewBtn);
        actions.appendChild(dlBtn);
        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(upd);
        body.appendChild(actions);
        card.appendChild(icon);
        card.appendChild(body);
        grid.appendChild(card);
      });
    }

    document.querySelectorAll("[data-res-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-res-filter]").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-res-filter");
        render();
      });
    });
    const searchInput = document.getElementById("resource-search-input");
    if (searchInput) searchInput.addEventListener("input", function () { searchTerm = searchInput.value.trim().toLowerCase(); render(); });

    render();
  }

  function initNotesDetail() {
    const root = document.getElementById("notes-detail-app");
    if (!root || typeof RF_RESOURCES === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || RF_RESOURCES[0].id;
    const r = RF_RESOURCES.find(function (x) { return x.id === id; });
    if (!r) {
      root.innerHTML = '<div class="empty-state"><div class="icon">❓</div><p>यह संसाधन नहीं मिला।</p><a href="study-material.html" class="btn btn-primary">सभी संसाधन देखें</a></div>';
      return;
    }
    document.title = r.title + " | Rajasthan Facts";
    setText("notes-title", r.title);
    setText("notes-description", r.description);
    setText("notes-updated", "अंतिम अपडेट: " + r.lastUpdated);
    const dl = document.getElementById("notes-download-btn");
    if (dl) dl.href = r.file;
  }

  /* ---------- Previous year questions ---------- */
  function initPyq() {
    const grid = document.getElementById("pyq-grid");
    if (!grid || typeof RF_PYQ === "undefined") return;
    let examFilter = "all";
    let subjectFilter = "all";
    let searchTerm = "";

    function render() {
      const filtered = RF_PYQ.filter(function (p) {
        const matchExam = examFilter === "all" || p.exam === examFilter;
        const matchSubject = subjectFilter === "all" || p.subject === subjectFilter;
        const matchSearch = !searchTerm || p.q.toLowerCase().indexOf(searchTerm) !== -1;
        return matchExam && matchSubject && matchSearch;
      });
      grid.innerHTML = "";
      if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">📋</div><p>कोई प्रश्न नहीं मिला।</p></div>';
        return;
      }
      filtered.forEach(function (p, idx) {
        const block = document.createElement("div");
        block.className = "mcq-block";
        const tag = document.createElement("div");
        tag.className = "article-meta";
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = p.exam + " · " + p.year;
        const note = document.createElement("span");
        note.className = "demo-badge";
        note.textContent = p.note;
        tag.appendChild(badge);
        tag.appendChild(note);
        const qEl = document.createElement("div");
        qEl.className = "mcq-q";
        qEl.textContent = (idx + 1) + ". " + p.q;
        const optsEl = document.createElement("div");
        optsEl.className = "mcq-opts";
        p.options.forEach(function (opt, oi) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = opt;
          btn.addEventListener("click", function () {
            Array.from(optsEl.children).forEach(function (b, i2) {
              b.disabled = true;
              if (i2 === p.correct) b.classList.add("correct");
              else if (i2 === oi) b.classList.add("incorrect");
            });
            const exp = document.createElement("p");
            exp.style.marginTop = "10px";
            exp.style.fontSize = "0.85rem";
            exp.style.color = "var(--color-text-secondary)";
            exp.textContent = "व्याख्या: " + p.explain;
            block.appendChild(exp);
          });
          optsEl.appendChild(btn);
        });
        block.appendChild(tag);
        block.appendChild(qEl);
        block.appendChild(optsEl);
        grid.appendChild(block);
      });
    }

    const examSelect = document.getElementById("pyq-exam-filter");
    if (examSelect) examSelect.addEventListener("change", function () { examFilter = examSelect.value; render(); });
    const subjectSelect = document.getElementById("pyq-subject-filter");
    if (subjectSelect) subjectSelect.addEventListener("change", function () { subjectFilter = subjectSelect.value; render(); });
    const searchInput = document.getElementById("pyq-search-input");
    if (searchInput) searchInput.addEventListener("input", function () { searchTerm = searchInput.value.trim().toLowerCase(); render(); });

    render();
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
})();
