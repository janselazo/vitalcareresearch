/* ============================================================
   VITAL CARE RESEARCH — shared site script
   logo · nav · footer · network canvas · counters · reveal
   ============================================================ */
(function () {
  "use strict";

  /* ---------- LOGO ---------- */
  // Magnifying glass whose lens holds a V drawn as an EKG/heartbeat pulse.
  function logoSVG() {
    return `
      <svg class="mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="40" cy="38" r="29" stroke="currentColor" stroke-width="7"/>
        <rect x="55" y="58" width="10.5" height="34" rx="5.25" transform="rotate(-45 60 75)" fill="currentColor"/>
        <polyline class="pulse-line" points="22,17 39,53 48,33 51,39 55,18 59,30" stroke="currentColor" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }
  function logoLockup(href) {
    return `<a class="logo" href="${href || 'index.html'}" aria-label="Vital Care Research home">
      ${logoSVG()}
      <span class="word"><span class="top">ITALCARE</span><span class="sub">research</span></span>
    </a>`;
  }
  window.VCR_logoSVG = logoSVG;

  /* ---------- NAV ---------- */
  var NAV = [
    { key: "home",     label: "Home",      es: "Inicio",          href: "index.html" },
    { key: "about",    label: "About",     es: "Nosotros",        href: "about.html" },
    { key: "sponsors", label: "Sponsors",  es: "Patrocinadores",  href: "sponsors.html" },
    { key: "patients", label: "Patients",  es: "Pacientes",       href: "patients.html" },
    { key: "contact",  label: "Contact",   es: "Contacto",        href: "contact.html" }
  ];

  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = document.body.getAttribute("data-page") || "home";
    var links = NAV.map(function (n) {
      return `<li><a href="${n.href}" class="${n.key === page ? 'active' : ''}" data-es="${n.es}">${n.label}</a></li>`;
    }).join("") + `<li class="nav-menu-cta"><a href="contact.html" class="btn btn-primary no-circle" style="width:100%;justify-content:center;" data-es="Unirse a un Estudio">Join a Study</a></li>`;
    host.innerHTML = `
      <header class="site-header" id="hdr">
        <div class="wrap">
        <div class="nav">
          ${logoLockup("index.html")}
          <nav aria-label="Primary">
            <ul class="nav-links" id="navlinks">${links}</ul>
          </nav>
          <div class="nav-right">
            <a class="nav-phone" href="tel:+17862801178">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (786) 280-1178
            </a>
            <a class="btn btn-primary nav-cta" href="contact.html"><span data-es="Unirse a un Estudio">Join a Study</span><span class="circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span></a>
            <span id="lang-host"></span>
            <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
            </button>
          </div>
        </div>
        </div>
      </header>`;

    var hdr = document.getElementById("hdr");
    var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var btn = document.getElementById("menuBtn");
    var links2 = document.getElementById("navlinks");
    function closeMenu() {
      links2.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = links2.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    links2.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("click", function (e) {
      if (!links2.classList.contains("open")) return;
      if (!links2.contains(e.target) && !btn.contains(e.target)) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="wrap footer-grid">
          <div>
            ${logoLockup("index.html")}
            <p class="footer-blurb" data-es="Un centro de investigación clínica del sur de Florida que avanza la medicina mediante ensayos rigurosos y centrados en el paciente.">A South-Florida clinical research center advancing medicine through rigorous, patient-centered trials.</p>
            <div class="footer-social">
              <a href="https://facebook.com/vitalcareresearch" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>
              <a href="https://instagram.com/vitalcareresearch" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg></a>
              <a href="tel:+17862801178" aria-label="Call us"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
              <a href="mailto:info@vitalcareresearch.com" aria-label="Email us"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 6 9-6"/></svg></a>
            </div>
          </div>
          <div>
            <h4 data-es="Explorar">Explore</h4>
            <ul>
              <li><a href="about.html" data-es="Nosotros">About Us</a></li>
              <li><a href="sponsors.html" data-es="Para Patrocinadores">For Sponsors</a></li>
              <li><a href="patients.html" data-es="Para Pacientes">For Patients</a></li>
              <li><a href="contact.html" data-es="Contacto">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 data-es="Capacidades">Capabilities</h4>
            <ul>
              <li><a href="sponsors.html" data-es="Ensayos Fase I–IV">Phase I–IV Trials</a></li>
              <li><a href="patients.html" data-es="Áreas Terapéuticas">Therapeutic Areas</a></li>
              <li><a href="patients.html" data-es="Estudios Activos">Active Studies</a></li>
              <li><a href="about.html" data-es="Nuestras Instalaciones">Our Facility</a></li>
            </ul>
          </div>
          <div>
            <h4 data-es="Visítenos">Visit Us</h4>
            <ul>
              <li><a href="https://maps.google.com/?q=3399+NW+72nd+Ave+Suite+219+Miami+FL+33122" target="_blank" rel="noopener">3399 NW 72nd Ave, Suite 219<br>Miami, FL 33122</a></li>
              <li><a href="tel:+17862801178">(786) 280-1178</a></li>
              <li><a href="contact.html" data-es="Referir un paciente">Refer a patient</a></li>
            </ul>
          </div>
        </div>
        <div class="wrap footer-bottom">
          <span data-es="© ${new Date().getFullYear()} Vital Care Research. Todos los derechos reservados.">© ${new Date().getFullYear()} Vital Care Research. All rights reserved.</span>
          <span>🏝️ Miami, Florida · USA</span>
        </div>
      </footer>`;
  }

  /* ---------- NETWORK CANVAS ---------- */
  function initNetwork(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [], pulses = [], W = 0, H = 0, raf;
    var density = opts.density || 9000;     // px² per node
    var maxDist = opts.maxDist || 150;
    var speed = opts.speed || 0.16;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var count = Math.round((W * H) / density);
      count = Math.max(24, Math.min(count, 120));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.6 + 0.8,
          big: Math.random() > 0.86
        });
      }
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      var a = nodes[(Math.random() * nodes.length) | 0];
      // find a near neighbor
      var best = null, bd = maxDist;
      for (var i = 0; i < nodes.length; i++) {
        var b = nodes[i]; if (b === a) continue;
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bd) { bd = d; best = b; }
      }
      if (best) pulses.push({ a: a, b: best, t: 0, sp: 0.01 + Math.random() * 0.012 });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // edges
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            var o = (1 - d / maxDist) * 0.5;
            ctx.strokeStyle = "rgba(120,170,200," + (o * 0.5) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (var k = 0; k < nodes.length; k++) {
        var p = nodes[k];
        if (p.big) {
          ctx.fillStyle = "rgba(47,224,182,0.9)";
          ctx.shadowColor = "rgba(47,224,182,0.8)"; ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(150,190,220,0.55)";
          ctx.shadowBlur = 0;
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        ctx.shadowBlur = 0;
      }
      // pulses traveling along edges
      for (var q = pulses.length - 1; q >= 0; q--) {
        var pu = pulses[q]; pu.t += pu.sp;
        if (pu.t >= 1) { pulses.splice(q, 1); continue; }
        var x = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
        var y = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        ctx.fillStyle = "rgba(74,240,200," + (1 - Math.abs(pu.t - 0.5) * 2) + ")";
        ctx.shadowColor = "rgba(74,240,200,0.9)"; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832); ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", debounce(resize, 200));
    if (!reduced) {
      draw();
      setInterval(spawnPulse, 900);
    } else {
      // static single frame
      draw(); cancelAnimationFrame(raf);
    }
  }

  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }

  /* ---------- COUNTERS ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count"));
        var dec = (el.getAttribute("data-dec") | 0);
        var dur = 1500, start = performance.now();
        function step(now) {
          var t = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          var val = target * eased;
          el.textContent = dec ? val.toFixed(dec) : Math.round(val).toLocaleString();
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- BOOT ---------- */
  function boot() {
    buildHeader();
    buildFooter();
    initCounters();
    initReveal();
    if (window.VCR_initI18n) window.VCR_initI18n();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
