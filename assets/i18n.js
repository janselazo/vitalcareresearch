/* ============================================================
   VITAL CARE RESEARCH — i18n (English / Spanish)
   Co-located translations: any element with a [data-es]
   attribute swaps its innerHTML; [data-es-ph] swaps a
   placeholder; [data-es-html] holds rich markup.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "vcr_lang";

  function getLang() {
    try { return localStorage.getItem(KEY) || "en"; } catch (e) { return "en"; }
  }
  function saveLang(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  function flagUS() {
    return '<span class="flag" aria-hidden="true"><svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice"><rect width="60" height="60" fill="#fff"/><g fill="#b22234"><rect width="60" height="4.6" y="0"/><rect width="60" height="4.6" y="9.2"/><rect width="60" height="4.6" y="18.4"/><rect width="60" height="4.6" y="27.6"/><rect width="60" height="4.6" y="36.8"/><rect width="60" height="4.6" y="46"/><rect width="60" height="4.6" y="55.2"/></g><rect width="30" height="32.2" fill="#3c3b6e"/></svg></span>';
  }
  function flagES() {
    return '<span class="flag" aria-hidden="true"><svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice"><rect width="60" height="60" fill="#c60b1e"/><rect width="60" height="30" y="15" fill="#ffc400"/></svg></span>';
  }

  function buildToggle() {
    var host = document.getElementById("lang-host");
    if (!host) return;
    host.innerHTML =
      '<div class="lang-toggle" role="group" aria-label="Language">' +
        '<button class="lang-btn" data-lang="en" title="English" aria-label="English">' + flagUS() + '</button>' +
        '<button class="lang-btn" data-lang="es" title="Espa\u00f1ol" aria-label="Espa\u00f1ol">' + flagES() + '</button>' +
      '</div>';
    host.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  function apply(lang) {
    // text / html content
    document.querySelectorAll("[data-es]").forEach(function (el) {
      if (el.getAttribute("data-en") === null) el.setAttribute("data-en", el.innerHTML);
      el.innerHTML = lang === "es" ? el.getAttribute("data-es") : el.getAttribute("data-en");
    });
    // placeholders
    document.querySelectorAll("[data-es-ph]").forEach(function (el) {
      if (el.getAttribute("data-en-ph") === null) el.setAttribute("data-en-ph", el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", lang === "es" ? el.getAttribute("data-es-ph") : el.getAttribute("data-en-ph"));
    });
    // image-slot placeholder attribute
    document.querySelectorAll("[data-es-slot]").forEach(function (el) {
      if (el.getAttribute("data-en-slot") === null) el.setAttribute("data-en-slot", el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", lang === "es" ? el.getAttribute("data-es-slot") : el.getAttribute("data-en-slot"));
    });

    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }

  function setLang(lang) { saveLang(lang); apply(lang); }

  window.VCR_initI18n = function () {
    buildToggle();
    apply(getLang());
  };
  window.VCR_setLang = setLang;
})();
