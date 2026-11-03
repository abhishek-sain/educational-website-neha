/* Rajasthan Facts — District details page renderer (district-details.html?id=...) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("district-app");
    if (!root || typeof RF_DISTRICTS === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || RF_DISTRICTS[0].id;
    const d = RF_DISTRICTS.find(function (x) { return x.id === id; });

    if (!d) {
      root.innerHTML = '<div class="empty-state"><div class="icon">❓</div><p>यह जिला नहीं मिला।</p><a href="districts.html" class="btn btn-primary">सभी जिले देखें</a></div>';
      return;
    }

    document.title = d.name + " जिला | Rajasthan Facts";
    setText("district-name", d.name + " जिला");
    setText("district-name-en", d.nameEn + " District");
    setText("district-division", "संभाग: " + d.division);
    setText("district-intro", d.intro);
    setText("district-founder", d.founder);
    setText("district-famous", d.famousFor);

    const hlWrap = document.getElementById("district-highlights");
    if (hlWrap) {
      hlWrap.innerHTML = "";
      d.highlights.forEach(function (h) {
        const li = document.createElement("li");
        li.textContent = h;
        hlWrap.appendChild(li);
      });
    }

    const otherWrap = document.getElementById("district-others");
    if (otherWrap) {
      otherWrap.innerHTML = "";
      RF_DISTRICTS.filter(function (x) { return x.division === d.division && x.id !== d.id; }).slice(0, 6).forEach(function (x) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "district-details.html?id=" + x.id;
        a.textContent = x.name;
        li.appendChild(a);
        otherWrap.appendChild(li);
      });
    }

    const idx = RF_DISTRICTS.indexOf(d);
    setupNav("district-prev", RF_DISTRICTS[idx - 1]);
    setupNav("district-next", RF_DISTRICTS[idx + 1]);
  });

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setupNav(id, d) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!d) { el.style.display = "none"; return; }
    el.href = "district-details.html?id=" + d.id;
    const titleEl = el.querySelector(".nav-title");
    if (titleEl) titleEl.textContent = d.name;
  }
})();
