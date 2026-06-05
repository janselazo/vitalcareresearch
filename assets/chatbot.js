/* ============================================================
   VITAL CARE RESEARCH — FAQ chatbot widget
   ============================================================ */
(function () {
  "use strict";

  var PHONE = "(786) 280-1178";
  var PHONE_TEL = "tel:+17862801178";
  var EMAIL = "vitalcareresearch@gmail.com";
  var ADDRESS = "3399 NW 72nd Ave, Suite 219, Miami, FL 33122";

  var KNOWLEDGE = [
    {
      keywords: ["safe", "safety", "risk", "irb", "segur", "riesgo", "seguro"],
      en: "Every trial follows a strict protocol reviewed by an Institutional Review Board (IRB) and overseen by experienced medical staff. Your safety is monitored at every visit, and you'll receive detailed information about risks and benefits before you decide to join.",
      es: "Cada ensayo sigue un protocolo estricto revisado por una Junta de Revisión Institucional (IRB) y supervisado por personal médico experimentado. Su seguridad se monitorea en cada visita y recibirá información detallada sobre riesgos y beneficios antes de decidir participar."
    },
    {
      keywords: ["cost", "pay", "free", "compensat", "money", "precio", "cuesta", "gratis", "compens"],
      en: "In most studies, visits, assessments, and the investigational treatment are provided at no cost. Many studies also offer compensation for your time and travel. Specifics are explained during screening.",
      es: "En la mayoría de los estudios, las visitas, evaluaciones y el tratamiento en investigación se brindan sin costo. Muchos estudios también ofrecen compensación por su tiempo y traslado. Los detalles se explican durante la selección."
    },
    {
      keywords: ["spanish", "español", "bilingual", "bilingü", "habla", "idioma", "language"],
      en: "Absolutely. Our team is bilingual, and consent materials and study visits can be conducted in English or Spanish. Hablamos español.",
      es: "Por supuesto. Nuestro equipo es bilingüe, y los materiales de consentimiento y las visitas del estudio pueden realizarse en inglés o español. Hablamos español."
    },
    {
      keywords: ["eligib", "qualify", "who can", "take part", "participat", "join", "elegib", "participar", "unirse", "calific"],
      en: "Each study has its own eligibility criteria based on age, diagnosis, and medical history. A short, confidential screening determines whether a study is a good fit for you — with no obligation.",
      es: "Cada estudio tiene sus propios criterios de elegibilidad según la edad, el diagnóstico y el historial médico. Una breve evaluación confidencial determina si un estudio es adecuado para usted — sin compromiso."
    },
    {
      keywords: ["screen", "selecci", "evaluaci"],
      en: "A coordinator reviews your medical history and the study requirements, answers your questions, and performs eligibility assessments. There's no obligation — screening simply helps determine whether a study is a good fit for you.",
      es: "Un coordinador revisa su historial médico y los requisitos del estudio, responde sus preguntas y realiza evaluaciones de elegibilidad. No hay ninguna obligación: la selección simplemente ayuda a determinar si un estudio es adecuado para usted."
    },
    {
      keywords: ["leave", "withdraw", "quit", "stop", "abandon", "salir", "retir", "dejar"],
      en: "Yes. Participation is entirely voluntary and you may withdraw at any time, for any reason, without affecting your regular medical care.",
      es: "Sí. La participación es completamente voluntaria y puede retirarse en cualquier momento, por cualquier motivo, sin que afecte su atención médica habitual."
    },
    {
      keywords: ["sponsor", "cro", "protocol", "feasib", "patrocin", "viabil"],
      en: "We manage the full trial lifecycle — feasibility, start-up, recruitment, conduct, and close-out — with rapid activation and clean, audit-ready data. Visit our Sponsors page or contact us with your protocol synopsis to get started.",
      es: "Gestionamos todo el ciclo del ensayo — viabilidad, puesta en marcha, reclutamiento, conducción y cierre — con inicios rápidos y datos listos para auditoría. Visite nuestra página de Patrocinadores o contáctenos con la sinopsis de su protocolo."
    },
    {
      keywords: ["enroll", "recruit", "inscrip", "reclut"],
      en: "Pre-qualified registries and community outreach help us hit recruitment targets ahead of schedule. We pair operational discipline with a deeply engaged Miami patient community.",
      es: "Los registros precalificados y el alcance comunitario nos permiten alcanzar las metas de reclutamiento antes de lo previsto. Combinamos disciplina operativa con una comunidad de pacientes profundamente comprometida en Miami."
    },
    {
      keywords: ["phase", "fase", "i-iv", "i–iv"],
      en: "Vital Care Research conducts Phase I–IV clinical trials across multiple therapeutic areas from our Miami-Dade facility.",
      es: "Vital Care Research realiza ensayos clínicos de Fase I–IV en múltiples áreas terapéuticas desde nuestra sede en Miami-Dade."
    },
    {
      keywords: ["therap", "condition", "diabetes", "cardio", "obes", "vacun", "área", "area", "tratam"],
      en: "We conduct trials across cardiology, diabetes, obesity, endocrinology, nephrology, vaccines, women's health, neurology, NASH, respiratory, dermatology, and more. Visit our Patients page for active studies.",
      es: "Realizamos ensayos en cardiología, diabetes, obesidad, endocrinología, nefrología, vacunas, salud de la mujer, neurología, NASH, respiratorio, dermatología y más. Visite nuestra página de Pacientes para estudios activos."
    },
    {
      keywords: ["where", "location", "address", "map", "miami", "ubicad", "direcci", "dónde", "donde"],
      en: "We're at " + ADDRESS + " — minutes from anywhere in Miami-Dade. Call us at " + PHONE + " or <a href=\"contact.html\">contact us</a> to schedule a visit.",
      es: "Estamos en " + ADDRESS + " — a minutos de toda Miami-Dade. Llámenos al " + PHONE + " o <a href=\"contact.html\">contáctenos</a> para programar una visita."
    },
    {
      keywords: ["phone", "call", "teléfono", "telefono", "llamar", "llam"],
      en: "You can reach us at <a href=\"" + PHONE_TEL + "\">" + PHONE + "</a>. Our team is happy to answer questions about studies, referrals, or sponsor partnerships.",
      es: "Puede comunicarse al <a href=\"" + PHONE_TEL + "\">" + PHONE + "</a>. Nuestro equipo está disponible para responder preguntas sobre estudios, referencias o alianzas con patrocinadores."
    },
    {
      keywords: ["email", "mail", "correo"],
      en: "Email us at <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> or use our <a href=\"contact.html\">contact form</a>.",
      es: "Escríbanos a <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> o use nuestro <a href=\"contact.html\">formulario de contacto</a>."
    },
    {
      keywords: ["hour", "open", "schedule", "horario", "abiert"],
      en: "For office hours and appointment scheduling, please call " + PHONE + " or submit our contact form — we'll get back to you promptly.",
      es: "Para horarios y citas, llame al " + PHONE + " o envíe nuestro formulario de contacto — le responderemos pronto."
    },
    {
      keywords: ["about", "who are", "facility", "team", "nosotros", "quiénes", "quienes", "instalac", "equipo"],
      en: "Vital Care Research is a multispecialty Phase I–IV clinical research center in Miami. Our bilingual team manages every phase of the trial lifecycle with regulatory rigor and patient-centered care. <a href=\"about.html\">Learn more about us</a>.",
      es: "Vital Care Research es un centro de investigación clínica multiespecialidad de Fase I–IV en Miami. Nuestro equipo bilingüe gestiona cada fase del ensayo con rigor regulatorio y atención centrada en el paciente. <a href=\"about.html\">Conozca más sobre nosotros</a>."
    },
    {
      keywords: ["refer", "patient", "doctor", "physician", "referir", "médico", "medico"],
      en: "Physicians can refer patients through our <a href=\"contact.html\">contact page</a> or by calling " + PHONE + ". We'll follow up to discuss study options.",
      es: "Los médicos pueden referir pacientes a través de nuestra <a href=\"contact.html\">página de contacto</a> o llamando al " + PHONE + ". Le contactaremos para hablar sobre opciones de estudios."
    },
    {
      keywords: ["study", "studies", "trial", "active", "estudio", "ensayo"],
      en: "We run active Phase I–IV studies across many therapeutic areas. Visit <a href=\"patients.html\">For Patients</a> to learn more, or <a href=\"contact.html\">join a study</a> and we'll match you with eligible trials.",
      es: "Realizamos estudios activos de Fase I–IV en muchas áreas terapéuticas. Visite <a href=\"patients.html\">Para Pacientes</a> para más información, o <a href=\"contact.html\">únase a un estudio</a> y le ayudaremos a encontrar ensayos elegibles."
    },
    {
      keywords: ["contact", "reach", "touch", "contac", "comunic"],
      en: "Reach us at " + PHONE + ", <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>, or through our <a href=\"contact.html\">contact form</a>.",
      es: "Comuníquese al " + PHONE + ", <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a>, o mediante nuestro <a href=\"contact.html\">formulario de contacto</a>."
    }
  ];

  var COPY = {
    en: {
      role: "Research Assistant · Online",
      today: "Today",
      greet: "Hi, I'm Vera, Vital Care Research's assistant. Before we chat, what's your name?",
      greetBack: "Nice to meet you, {name}! Ask me about clinical trials, our Miami facility, sponsors, or how to join a study.",
      placeholder: "Ask about trials, eligibility, location, or sponsors…",
      fallback: "I'm not sure about that one. Try asking about study eligibility, costs, our location, sponsors, or call us at " + PHONE + ".",
      thanks: "You're welcome! Let me know if you have other questions about Vital Care Research.",
      hello: "Hello! How can I help you today?",
      footer: "Or call " + PHONE + " — <a href=\"contact.html\">Join a Study</a>",
      toggle: "Open chat"
    },
    es: {
      role: "Asistente de Investigación · En línea",
      today: "Hoy",
      greet: "Hola, soy Vera, la asistente de Vital Care Research. Antes de conversar, ¿cuál es su nombre?",
      greetBack: "¡Un placer, {name}! Pregúnteme sobre ensayos clínicos, nuestras instalaciones en Miami, patrocinadores o cómo unirse a un estudio.",
      placeholder: "Pregunte sobre ensayos, elegibilidad, ubicación o patrocinadores…",
      fallback: "No estoy segura sobre eso. Intente preguntar sobre elegibilidad, costos, ubicación, patrocinadores, o llámenos al " + PHONE + ".",
      thanks: "¡De nada! Avíseme si tiene otras preguntas sobre Vital Care Research.",
      hello: "¡Hola! ¿En qué puedo ayudarle hoy?",
      footer: "O llame al " + PHONE + " — <a href=\"contact.html\">Unirse a un Estudio</a>",
      toggle: "Abrir chat"
    }
  };

  var state = { open: false, name: "", greeted: false };

  function lang() {
    return document.documentElement.getAttribute("lang") === "es" ? "es" : "en";
  }

  function t(key) { return COPY[lang()][key]; }

  function stripAccents(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function findAnswer(msg) {
    var normalized = stripAccents(msg.toLowerCase());
    var best = null, bestScore = 0;

    if (/^(hi|hello|hey|hola|buenas|buenos)\b/.test(normalized)) return t("hello");
    if (/^(thanks|thank you|gracias)\b/.test(normalized)) return t("thanks");

    KNOWLEDGE.forEach(function (entry) {
      var score = 0;
      entry.keywords.forEach(function (kw) {
        if (normalized.indexOf(stripAccents(kw)) !== -1) score += kw.length > 4 ? 3 : 2;
      });
      if (score > bestScore) { bestScore = score; best = entry; }
    });

    if (best && bestScore >= 2) return best[lang()];
    return t("fallback");
  }

  function avatarSVG() {
    if (window.VCR_logoSVG) {
      return '<span class="chat-avatar-mark">' + window.VCR_logoSVG() + "</span>";
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  }

  function nowTime() {
    return new Date().toLocaleTimeString(lang() === "es" ? "es-US" : "en-US", { hour: "numeric", minute: "2-digit" });
  }

  function buildWidget() {
    var root = document.createElement("div");
    root.className = "chat-widget";
    root.id = "vcrChat";
    root.innerHTML =
      '<button class="chat-toggle" id="chatToggle" aria-label="' + t("toggle") + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      "</button>" +
      '<div class="chat-panel" id="chatPanel" role="dialog" aria-label="Vital Care Research chat" hidden>' +
        '<div class="chat-header">' +
          '<div class="chat-identity">' +
            '<div class="chat-avatar">' + avatarSVG() + '</div>' +
            '<div><div class="chat-name">Vera</div><div class="chat-role" id="chatRole">' + t("role") + "</div></div>" +
          "</div>" +
          '<div class="chat-header-actions">' +
            '<a href="' + PHONE_TEL + '" class="chat-icon-btn" aria-label="Call"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>' +
            '<button type="button" class="chat-icon-btn" id="chatClose" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          "</div>" +
        "</div>" +
        '<div class="chat-body" id="chatBody">' +
          '<div class="chat-day" id="chatDay">' + t("today") + "</div>" +
          '<div class="chat-messages" id="chatMessages"></div>' +
        "</div>" +
        '<form class="chat-input-row" id="chatForm">' +
          '<input type="text" id="chatInput" autocomplete="off" placeholder="' + t("placeholder") + '">' +
          '<button type="submit" class="chat-send" aria-label="Send"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>' +
        "</form>" +
        '<div class="chat-footer" id="chatFooter">' + t("footer") + "</div>" +
      "</div>";
    document.body.appendChild(root);
    return root;
  }

  function addMessage(text, who, time) {
    var box = document.getElementById("chatMessages");
    if (!box) return;
    var el = document.createElement("div");
    el.className = "chat-msg chat-msg--" + who;
    el.innerHTML =
      '<div class="chat-bubble">' + text + "</div>" +
      (time ? '<div class="chat-time">' + time + "</div>" : "");
    box.appendChild(el);
    var body = document.getElementById("chatBody");
    if (body) body.scrollTop = body.scrollHeight;
  }

  function refreshLabels() {
    var role = document.getElementById("chatRole");
    var day = document.getElementById("chatDay");
    var input = document.getElementById("chatInput");
    var footer = document.getElementById("chatFooter");
    var toggle = document.getElementById("chatToggle");
    if (role) role.textContent = t("role");
    if (day) day.textContent = t("today");
    if (input) input.placeholder = t("placeholder");
    if (footer) footer.innerHTML = t("footer");
    if (toggle) toggle.setAttribute("aria-label", t("toggle"));
  }

  function openChat() {
    state.open = true;
    var panel = document.getElementById("chatPanel");
    var toggle = document.getElementById("chatToggle");
    if (panel) { panel.hidden = false; }
    if (toggle) toggle.classList.add("is-open");
    var msgs = document.getElementById("chatMessages");
    if (msgs && !msgs.children.length) {
      addMessage(t("greet"), "bot", nowTime());
    }
    var input = document.getElementById("chatInput");
    if (input) setTimeout(function () { input.focus(); }, 120);
  }

  function closeChat() {
    state.open = false;
    var panel = document.getElementById("chatPanel");
    var toggle = document.getElementById("chatToggle");
    if (panel) panel.hidden = true;
    if (toggle) toggle.classList.remove("is-open");
  }

  function handleUserMessage(text) {
    addMessage(text, "user", nowTime());

    if (!state.name) {
      state.name = text.trim();
      setTimeout(function () {
        addMessage(t("greetBack").replace("{name}", state.name), "bot", nowTime());
      }, 500);
      return;
    }

    setTimeout(function () {
      addMessage(findAnswer(text), "bot", nowTime());
    }, 450);
  }

  function init() {
    if (document.getElementById("vcrChat")) return;
    buildWidget();

    document.getElementById("chatToggle").addEventListener("click", function () {
      if (state.open) closeChat(); else openChat();
    });
    document.getElementById("chatClose").addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeChat();
    });
    document.getElementById("chatForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("chatInput");
      var val = (input.value || "").trim();
      if (!val) return;
      input.value = "";
      handleUserMessage(val);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.open) closeChat();
    });

    var langObs = new MutationObserver(refreshLabels);
    langObs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  window.VCR_initChatbot = init;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
