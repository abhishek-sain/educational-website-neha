/* Rajasthan Facts — Frontend form validation (newsletter, contact)
   NOTE: This is a static website with no backend. Submissions are validated
   client-side only and are NOT sent anywhere or stored. */
(function () {
  "use strict";

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNewsletter();
    initContactForm();
  });

  function initNewsletter() {
    const forms = document.querySelectorAll(".newsletter-form");
    forms.forEach(function (form) {
      const msg = form.parentElement.querySelector(".form-msg") || form.querySelector(".form-msg");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        const val = input ? input.value.trim() : "";
        if (!isValidEmail(val)) {
          setMsg(msg, "कृपया एक मान्य ईमेल पता दर्ज करें।", "error");
          return;
        }
        setMsg(msg, "सब्सक्राइब करने हेतु धन्यवाद! (डेमो — यह फॉर्म किसी सर्वर पर डेटा नहीं भेजता)", "success");
        if (window.rfToast) window.rfToast("सब्सक्रिप्शन सफल (डेमो मोड)", "success");
        form.reset();
      });
    });
  }

  function setMsg(el, text, cls) {
    if (!el) return;
    el.textContent = text;
    el.className = "form-msg " + cls;
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector("#cf-name");
      const email = form.querySelector("#cf-email");
      const subject = form.querySelector("#cf-subject");
      const message = form.querySelector("#cf-message");

      valid = validateField(name, name.value.trim().length >= 2) && valid;
      valid = validateField(email, isValidEmail(email.value.trim())) && valid;
      valid = validateField(subject, subject.value.trim().length >= 3) && valid;
      valid = validateField(message, message.value.trim().length >= 10) && valid;

      const statusEl = document.getElementById("contact-form-status");
      if (!valid) {
        if (statusEl) { statusEl.textContent = "कृपया नीचे दिए गए त्रुटि संदेशों को ठीक करें।"; statusEl.className = "form-msg error"; }
        return;
      }
      if (statusEl) {
        statusEl.textContent = "आपका संदेश तैयार है। यह एक स्टैटिक वेबसाइट है — बैकएंड इंटीग्रेशन के बिना संदेश वास्तव में भेजा नहीं जाता।";
        statusEl.className = "form-msg success";
      }
      if (window.rfToast) window.rfToast("फॉर्म मान्य है (डेमो — संदेश नहीं भेजा गया)", "success");
      form.reset();
    });
  }

  function validateField(input, isValid) {
    if (!input) return true;
    const field = input.closest(".form-field");
    if (field) field.classList.toggle("invalid", !isValid);
    return isValid;
  }
})();
