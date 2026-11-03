/* Rajasthan Facts — Site-wide search index & logic
   Builds a flat search index from the local datasets (topics, districts,
   quizzes, blogs, resources). Pure client-side, no network calls. */

var RF_SEARCH_INDEX = [];

(function buildIndex() {
  try {
    if (typeof RF_TOPICS !== "undefined") {
      RF_TOPICS.forEach(function (t) {
        RF_SEARCH_INDEX.push({ title: t.title + " (" + t.titleEn + ")", type: "GK विषय", url: "topic-details.html?id=" + t.id, keywords: (t.title + " " + t.titleEn + " " + t.categoryLabel).toLowerCase() });
      });
    }
    if (typeof RF_DISTRICTS !== "undefined") {
      RF_DISTRICTS.forEach(function (d) {
        RF_SEARCH_INDEX.push({ title: d.name + " जिला (" + d.nameEn + ")", type: "जिला", url: "district-details.html?id=" + d.id, keywords: (d.name + " " + d.nameEn + " " + d.famousFor).toLowerCase() });
      });
    }
    if (typeof RF_QUIZZES !== "undefined") {
      RF_QUIZZES.forEach(function (qz) {
        RF_SEARCH_INDEX.push({ title: qz.title, type: "क्विज़", url: "quiz-details.html?id=" + qz.id, keywords: (qz.title + " " + qz.description).toLowerCase() });
      });
    }
    if (typeof RF_BLOGS !== "undefined") {
      RF_BLOGS.forEach(function (b) {
        RF_SEARCH_INDEX.push({ title: b.title, type: "लेख", url: "blog-details.html?id=" + b.id, keywords: (b.title + " " + b.excerpt + " " + b.categoryLabel).toLowerCase() });
      });
    }
    if (typeof RF_RESOURCES !== "undefined") {
      RF_RESOURCES.forEach(function (r) {
        RF_SEARCH_INDEX.push({ title: r.title, type: "स्टडी मैटेरियल", url: "notes-details.html?id=" + r.id, keywords: (r.title + " " + r.description).toLowerCase() });
      });
    }
  } catch (e) {
    console.error("RF search index build failed", e);
  }
})();

function rfSearch(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return RF_SEARCH_INDEX.filter(function (item) {
    return item.keywords.indexOf(q) !== -1;
  });
}

/* Builds highlighted title into targetEl using safe DOM nodes (no innerHTML). */
function rfHighlightInto(targetEl, text, query) {
  targetEl.textContent = "";
  if (!query) { targetEl.textContent = text; return; }
  let re;
  try {
    re = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  } catch (e) {
    targetEl.textContent = text;
    return;
  }
  let lastIndex = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      targetEl.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const mark = document.createElement("mark");
    mark.textContent = match[0];
    targetEl.appendChild(mark);
    lastIndex = match.index + match[0].length;
    if (match[0].length === 0) re.lastIndex++;
  }
  if (lastIndex < text.length) {
    targetEl.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

/* Search results page renderer */
document.addEventListener("DOMContentLoaded", function () {
  const resultsEl = document.getElementById("search-results-list");
  if (!resultsEl) return;
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const inputEl = document.getElementById("search-page-input");
  const countEl = document.getElementById("search-results-count");
  if (inputEl) inputEl.value = query;

  function render(q) {
    const results = rfSearch(q);
    resultsEl.innerHTML = "";
    if (countEl) countEl.textContent = q ? (results.length + " परिणाम \"" + q + "\" के लिए") : "खोजने हेतु ऊपर टाइप करें";
    if (!results.length) {
      if (q) {
        resultsEl.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><p>कोई परिणाम नहीं मिला। कृपया अन्य कीवर्ड से खोजें।</p></div>';
      }
      return;
    }
    results.forEach(function (r) {
      const card = document.createElement("a");
      card.href = r.url;
      card.className = "article-card";
      card.style.display = "block";
      card.style.padding = "18px 20px";
      const tag = document.createElement("span");
      tag.className = "article-meta";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = r.type;
      tag.appendChild(badge);
      const h3 = document.createElement("h3");
      rfHighlightInto(h3, r.title, q);
      card.appendChild(tag);
      card.appendChild(h3);
      resultsEl.appendChild(card);
    });
  }

  render(query);

  const form = document.getElementById("search-page-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const val = inputEl.value.trim();
      const url = new URL(window.location.href);
      url.searchParams.set("q", val);
      window.history.replaceState({}, "", url);
      render(val);
    });
  }
});
