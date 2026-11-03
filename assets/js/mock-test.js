/* Rajasthan Facts — Mock test engine (exam-style wrapper around quiz data) */
(function () {
  "use strict";

  const state = { test: null, quiz: null, current: 0, answers: {}, marked: {}, timerId: null, secondsLeft: 0, started: false };

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("mock-app");
    if (!root || typeof RF_MOCK_TESTS === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    state.test = RF_MOCK_TESTS.find(function (t) { return t.id === id; }) || RF_MOCK_TESTS[0];
    state.quiz = RF_QUIZZES.find(function (q) { return q.id === state.test.quizRef; });
    state.secondsLeft = (state.test.durationMin || 20) * 60;

    document.getElementById("mock-title-text").textContent = state.test.title;
    const instrList = document.getElementById("mock-instructions-list");
    instrList.innerHTML = "";
    state.test.instructions.forEach(function (line) {
      const li = document.createElement("li");
      li.textContent = line;
      instrList.appendChild(li);
    });

    document.getElementById("mock-start-btn").addEventListener("click", function () {
      state.started = true;
      document.getElementById("mock-instructions-screen").style.display = "none";
      document.getElementById("mock-test-screen").style.display = "grid";
      renderPalette();
      renderQuestion();
      startTimer();
    });

    document.getElementById("mock-prev").addEventListener("click", function () {
      if (state.current > 0) { state.current--; renderQuestion(); }
    });
    document.getElementById("mock-next").addEventListener("click", function () {
      if (state.current < state.quiz.questions.length - 1) { state.current++; renderQuestion(); }
    });
    document.getElementById("mock-mark").addEventListener("click", function () {
      state.marked[state.current] = !state.marked[state.current];
      renderPalette();
    });
    document.getElementById("mock-clear").addEventListener("click", function () {
      delete state.answers[state.current];
      renderQuestion();
      renderPalette();
    });
    document.getElementById("mock-submit").addEventListener("click", submitTest);
  });

  function startTimer() {
    const el = document.getElementById("mock-timer-text");
    function tick() {
      if (state.secondsLeft <= 0) { submitTest(); return; }
      state.secondsLeft--;
      const m = Math.floor(state.secondsLeft / 60);
      const s = state.secondsLeft % 60;
      if (el) el.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    }
    tick();
    state.timerId = setInterval(tick, 1000);
  }

  function renderQuestion() {
    const q = state.quiz.questions[state.current];
    const total = state.quiz.questions.length;
    document.getElementById("mock-qnum").textContent = "प्रश्न " + (state.current + 1) + " / " + total;
    document.getElementById("mock-question-text").textContent = q.q;
    const bar = document.getElementById("mock-progress-bar");
    if (bar) bar.style.width = (((state.current + 1) / total) * 100) + "%";

    const optsWrap = document.getElementById("mock-options");
    optsWrap.innerHTML = "";
    const letters = ["अ", "ब", "स", "द"];
    q.options.forEach(function (opt, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option" + (state.answers[state.current] === i ? " selected" : "");
      const letterSpan = document.createElement("span");
      letterSpan.className = "opt-letter";
      letterSpan.textContent = letters[i] || (i + 1);
      const textSpan = document.createElement("span");
      textSpan.textContent = opt;
      btn.appendChild(letterSpan);
      btn.appendChild(textSpan);
      btn.addEventListener("click", function () {
        state.answers[state.current] = i;
        renderQuestion();
        renderPalette();
      });
      optsWrap.appendChild(btn);
    });

    document.getElementById("mock-prev").disabled = state.current === 0;
    document.getElementById("mock-next").disabled = state.current === total - 1;
  }

  function renderPalette() {
    const wrap = document.getElementById("mock-palette");
    if (!wrap) return;
    wrap.innerHTML = "";
    state.quiz.questions.forEach(function (_, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = i + 1;
      let cls = "unanswered";
      if (state.marked[i]) cls = "review";
      else if (state.answers.hasOwnProperty(i)) cls = "answered";
      btn.className = cls + (i === state.current ? " current" : "");
      btn.addEventListener("click", function () { state.current = i; renderQuestion(); renderPalette(); });
      wrap.appendChild(btn);
    });
  }

  function submitTest() {
    clearInterval(state.timerId);
    const result = {
      quizId: state.quiz.id,
      quizTitle: state.test.title,
      total: state.quiz.questions.length,
      answers: state.answers,
      questions: state.quiz.questions,
      isMockTest: true,
      examName: state.test.exam
    };
    try { sessionStorage.setItem("rf-quiz-result", JSON.stringify(result)); } catch (e) { /* ignore */ }
    window.location.href = "quiz-result.html";
  }
})();
