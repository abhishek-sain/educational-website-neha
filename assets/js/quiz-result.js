/* Rajasthan Facts — Quiz/Mock test result renderer
   Reads the result object from sessionStorage (written by quiz.js /
   mock-test.js) and renders score + review. Nothing is sent to a server. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("result-app");
    if (!root) return;
    let result = null;
    try { result = JSON.parse(sessionStorage.getItem("rf-quiz-result") || "null"); } catch (e) { /* ignore */ }

    if (!result) {
      root.innerHTML = '<div class="empty-state"><div class="icon">📊</div><p>कोई परिणाम डेटा नहीं मिला। कृपया पहले कोई क्विज़ या मॉक टेस्ट पूरा करें।</p><a href="quizzes.html" class="btn btn-primary">क्विज़ देखें</a></div>';
      return;
    }

    let correct = 0, incorrect = 0, unattempted = 0;
    result.questions.forEach(function (q, i) {
      if (!result.answers.hasOwnProperty(i)) { unattempted++; return; }
      if (result.answers[i] === q.correct) correct++;
      else incorrect++;
    });
    const total = result.total;
    const attempted = total - unattempted;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    document.getElementById("result-title").textContent = result.quizTitle;
    document.getElementById("result-pct").style.setProperty("--pct", pct);
    document.getElementById("result-pct-val").textContent = pct + "%";
    setTile("result-total", total);
    setTile("result-attempted", attempted);
    setTile("result-correct", correct);
    setTile("result-incorrect", incorrect);
    setTile("result-unattempted", unattempted);

    const reviewWrap = document.getElementById("result-review");
    reviewWrap.innerHTML = "";
    result.questions.forEach(function (q, i) {
      const has = result.answers.hasOwnProperty(i);
      const isCorrect = has && result.answers[i] === q.correct;
      const status = !has ? "skipped" : (isCorrect ? "correct" : "incorrect");
      const statusLabel = !has ? "अनुत्तरित" : (isCorrect ? "सही" : "गलत");

      const item = document.createElement("div");
      item.className = "review-item";

      const head = document.createElement("div");
      head.style.display = "flex";
      head.style.justifyContent = "space-between";
      head.style.gap = "10px";
      head.style.marginBottom = "8px";
      const qTitle = document.createElement("strong");
      qTitle.textContent = "प्रश्न " + (i + 1) + ". " + q.q;
      const statusTag = document.createElement("span");
      statusTag.className = "q-status " + status;
      statusTag.textContent = statusLabel;
      head.appendChild(qTitle);
      head.appendChild(statusTag);
      item.appendChild(head);

      const optList = document.createElement("div");
      optList.style.display = "grid";
      optList.style.gap = "6px";
      optList.style.fontSize = "0.88rem";
      q.options.forEach(function (opt, oi) {
        const row = document.createElement("div");
        row.textContent = opt;
        row.style.padding = "6px 10px";
        row.style.borderRadius = "6px";
        if (oi === q.correct) { row.style.background = "rgba(22,163,74,0.12)"; }
        if (has && oi === result.answers[i] && oi !== q.correct) { row.style.background = "rgba(220,38,38,0.12)"; }
        optList.appendChild(row);
      });
      item.appendChild(optList);

      const explain = document.createElement("p");
      explain.style.marginTop = "8px";
      explain.style.fontSize = "0.85rem";
      explain.style.color = "var(--color-text-secondary)";
      explain.textContent = "व्याख्या: " + q.explain;
      item.appendChild(explain);

      reviewWrap.appendChild(item);
    });

    document.getElementById("result-retake").addEventListener("click", function () {
      window.location.href = result.isMockTest ? "mock-tests.html" : "quizzes.html";
    });
  });

  function setTile(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
})();
