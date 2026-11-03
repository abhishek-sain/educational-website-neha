/* Rajasthan Facts — Quiz engine
   Runs entirely client-side. State is passed between quiz-details.html and
   quiz-result.html via sessionStorage (per-tab, cleared on close) — nothing
   is sent to or stored on any server. */
(function () {
  "use strict";

  const state = {
    quiz: null,
    current: 0,
    answers: {},     // index -> selected option index
    marked: {},       // index -> true
    timerId: null,
    secondsLeft: 0
  };

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("quiz-app");
    if (!root || typeof RF_QUIZZES === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    state.quiz = RF_QUIZZES.find(function (q) { return q.id === id; }) || RF_QUIZZES[0];
    state.secondsLeft = (state.quiz.durationMin || 10) * 60;

    document.getElementById("quiz-title-text").textContent = state.quiz.title;
    renderPalette();
    renderQuestion();
    startTimer();

    document.getElementById("quiz-prev").addEventListener("click", function () {
      if (state.current > 0) { state.current--; renderQuestion(); }
    });
    document.getElementById("quiz-next").addEventListener("click", function () {
      if (state.current < state.quiz.questions.length - 1) { state.current++; renderQuestion(); }
    });
    document.getElementById("quiz-mark").addEventListener("click", function () {
      state.marked[state.current] = !state.marked[state.current];
      renderPalette();
    });
    document.getElementById("quiz-submit").addEventListener("click", submitQuiz);
  });

  function startTimer() {
    const el = document.getElementById("quiz-timer-text");
    function tick() {
      if (state.secondsLeft <= 0) { submitQuiz(); return; }
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
    document.getElementById("quiz-qnum").textContent = "प्रश्न " + (state.current + 1) + " / " + total;
    document.getElementById("quiz-question-text").textContent = q.q;
    const bar = document.getElementById("quiz-progress-bar");
    if (bar) bar.style.width = (((state.current + 1) / total) * 100) + "%";

    const optsWrap = document.getElementById("quiz-options");
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

    document.getElementById("quiz-prev").disabled = state.current === 0;
    document.getElementById("quiz-next").disabled = state.current === total - 1;
    const markBtn = document.getElementById("quiz-mark");
    markBtn.classList.toggle("btn-accent", !!state.marked[state.current]);
  }

  function renderPalette() {
    const wrap = document.getElementById("quiz-palette");
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

  function submitQuiz() {
    clearInterval(state.timerId);
    const result = {
      quizId: state.quiz.id,
      quizTitle: state.quiz.title,
      total: state.quiz.questions.length,
      answers: state.answers,
      questions: state.quiz.questions
    };
    try {
      sessionStorage.setItem("rf-quiz-result", JSON.stringify(result));
    } catch (e) { /* storage unavailable */ }
    window.location.href = "quiz-result.html";
  }
})();
