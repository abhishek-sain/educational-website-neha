/* Rajasthan Facts — Topic details page renderer (topic-details.html?id=...) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("topic-app");
    if (!root || typeof RF_TOPICS === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || RF_TOPICS[0].id;
    const topic = RF_TOPICS.find(function (t) { return t.id === id; });

    if (!topic) {
      root.innerHTML = '<div class="empty-state"><div class="icon">❓</div><p>यह विषय नहीं मिला।</p><a href="rajasthan-gk.html" class="btn btn-primary">राजस्थान GK पर जाएँ</a></div>';
      return;
    }

    document.title = topic.title + " | Rajasthan Facts";
    setText("topic-breadcrumb-cat", topic.categoryLabel);
    setText("topic-title", topic.title);
    setText("topic-title-en", topic.titleEn);
    setText("topic-intro", topic.intro);
    setText("topic-last-updated", "अंतिम अपडेट: " + topic.lastUpdated);

    const tocList = document.getElementById("topic-toc");
    if (tocList) {
      tocList.innerHTML = "";
      topic.toc.forEach(function (t, i) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#section-" + i;
        a.textContent = t;
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }

    const sectionsWrap = document.getElementById("topic-sections");
    if (sectionsWrap) {
      sectionsWrap.innerHTML = "";
      topic.sections.forEach(function (sec, i) {
        const h2 = document.createElement("h2");
        h2.id = "section-" + i;
        h2.textContent = sec.h;
        const p = document.createElement("p");
        p.textContent = sec.body;
        sectionsWrap.appendChild(h2);
        sectionsWrap.appendChild(p);
      });
    }

    const factsWrap = document.getElementById("topic-facts");
    if (factsWrap) {
      factsWrap.innerHTML = "";
      topic.facts.forEach(function (f) {
        const li = document.createElement("li");
        li.textContent = f;
        factsWrap.appendChild(li);
      });
    }

    const mcqWrap = document.getElementById("topic-mcqs");
    if (mcqWrap) {
      mcqWrap.innerHTML = "";
      topic.mcqs.forEach(function (mcq, qi) {
        const block = document.createElement("div");
        block.className = "mcq-block";
        const qEl = document.createElement("div");
        qEl.className = "mcq-q";
        qEl.textContent = (qi + 1) + ". " + mcq.q;
        const optsEl = document.createElement("div");
        optsEl.className = "mcq-opts";
        mcq.options.forEach(function (opt, oi) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = opt;
          btn.addEventListener("click", function () {
            Array.from(optsEl.children).forEach(function (b, i2) {
              b.disabled = true;
              if (i2 === mcq.correct) b.classList.add("correct");
              else if (i2 === oi) b.classList.add("incorrect");
            });
            const exp = document.createElement("p");
            exp.style.marginTop = "10px";
            exp.style.fontSize = "0.85rem";
            exp.style.color = "var(--color-text-secondary)";
            exp.textContent = "व्याख्या: " + mcq.explain;
            block.appendChild(exp);
          });
          optsEl.appendChild(btn);
        });
        block.appendChild(qEl);
        block.appendChild(optsEl);
        mcqWrap.appendChild(block);
      });
    }

    const relatedWrap = document.getElementById("topic-related");
    if (relatedWrap) {
      relatedWrap.innerHTML = "";
      (topic.related || []).forEach(function (relId) {
        const relTopic = RF_TOPICS.find(function (t) { return t.id === relId; });
        if (!relTopic) return;
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "topic-details.html?id=" + relTopic.id;
        a.textContent = relTopic.title;
        li.appendChild(a);
        relatedWrap.appendChild(li);
      });
    }

    setText("topic-source", topic.source);

    const idx = RF_TOPICS.indexOf(topic);
    setupNav("topic-prev", RF_TOPICS[idx - 1]);
    setupNav("topic-next", RF_TOPICS[idx + 1]);

    const shareBar = document.getElementById("topic-share");
    if (shareBar) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(topic.title);
      shareBar.querySelector("[data-share='wa']").href = "https://wa.me/?text=" + text + "%20" + url;
      shareBar.querySelector("[data-share='fb']").href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
      shareBar.querySelector("[data-share='tw']").href = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
    }
  });

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setupNav(id, topic) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!topic) { el.style.display = "none"; return; }
    el.href = "topic-details.html?id=" + topic.id;
    const titleEl = el.querySelector(".nav-title");
    if (titleEl) titleEl.textContent = topic.title;
  }
})();
