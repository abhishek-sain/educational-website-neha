/* =========================================================
   EduSphere — Form validation module
   Handles: contact, login, register, password UX.
   (Newsletter form in the footer is wired in main.js)
   ========================================================= */

(function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[0-9+\-() \s]{7,16}$/;

  function setError(input, message) {
    const group = input.closest(".form-group");
    const errorEl = group ? group.querySelector(".field-error") : null;
    input.classList.toggle("invalid", !!message);
    if (errorEl) errorEl.textContent = message || "";
  }

  function validateField(input) {
    const rule = input.dataset.rule;
    const value = input.value.trim();

    if (input.required && !value) return "This field is required.";
    if (!value) return "";

    switch (rule) {
      case "email":
        return EMAIL_RE.test(value) ? "" : "Enter a valid email address.";
      case "phone":
        return PHONE_RE.test(value) ? "" : "Enter a valid phone number.";
      case "name":
        return value.length >= 2 ? "" : "Please enter at least 2 characters.";
      case "password":
        return value.length >= 8 ? "" : "Password must be at least 8 characters.";
      case "confirm-password": {
        const original = document.getElementById(input.dataset.matches);
        return original && original.value === value ? "" : "Passwords do not match.";
      }
      case "message":
        return value.length >= 10 ? "" : "Please enter at least 10 characters.";
      case "checkbox":
        return input.checked ? "" : "You must accept this to continue.";
      default:
        return "";
    }
  }

  function wireLiveValidation(form) {
    form.querySelectorAll("[data-rule]").forEach((input) => {
      const evt = input.type === "checkbox" ? "change" : "input";
      input.addEventListener(evt, () => {
        if (input.type === "checkbox") {
            setError(input, validateField(input));
        } else if (input.classList.contains("invalid")) {
          setError(input, validateField(input));
        }
      });
      input.addEventListener("blur", () => setError(input, validateField(input)));
    });
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll("[data-rule]").forEach((input) => {
      const error = validateField(input);
      setError(input, error);
      if (error) valid = false;
    });
    return valid;
  }

  /* ---------- Password visibility toggle ---------- */
  function initPasswordToggles() {
    document.querySelectorAll(".password-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        if (!input) return;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.innerHTML = `<i class="fa-regular fa-eye${isHidden ? "-slash" : ""}"></i>`;
      });
    });
  }

  /* ---------- Password strength indicator ---------- */
  function passwordStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (score <= 1) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  }

  function initPasswordStrength() {
    const input = document.getElementById("registerPassword");
    const meter = document.getElementById("passwordStrengthMeter");
    if (!input || !meter) return;
    input.addEventListener("input", () => {
      const level = input.value ? passwordStrength(input.value) : "";
      meter.className = "password-strength " + level;
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    wireLiveValidation(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = document.getElementById("contactFormFeedback");
      if (!validateForm(form)) {
        feedback.textContent = "Please fix the errors above before submitting.";
        feedback.className = "form-feedback error";
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        feedback.textContent = "This is a static demo — your message was not sent to a server, but here's what submission looks like!";
        feedback.className = "form-feedback success";
        EDU.showToast("Message submitted (demo only).", "success");
        form.reset();
      }, 900);
    });
  }

  /* ---------- Login form ---------- */
  function initLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    wireLiveValidation(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = document.getElementById("loginFormFeedback");
      if (!validateForm(form)) {
        feedback.textContent = "Please correct the highlighted fields.";
        feedback.className = "form-feedback error";
        return;
      }
      feedback.textContent = "Demo login successful — no real account was accessed.";
      feedback.className = "form-feedback success";
      EDU.showToast("Logged in (demo only).", "success");
    });
  }

  /* ---------- Register form ---------- */
  function initRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    wireLiveValidation(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const feedback = document.getElementById("registerFormFeedback");
      if (!validateForm(form)) {
        feedback.textContent = "Please correct the highlighted fields.";
        feedback.className = "form-feedback error";
        return;
      }
      feedback.textContent = "Demo registration complete — no real account was created.";
      feedback.className = "form-feedback success";
      EDU.showToast("Registration submitted (demo only).", "success");
      form.reset();
      const meter = document.getElementById("passwordStrengthMeter");
      if (meter) meter.className = "password-strength";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initPasswordToggles();
    initPasswordStrength();
    initContactForm();
    initLoginForm();
    initRegisterForm();
  });
})();
