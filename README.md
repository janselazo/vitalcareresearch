# Vital Care Research — Website

Marketing website for **Vital Care Research**, a multispecialty clinical research center in Miami, FL. Static, dependency‑free, fully responsive, and bilingual (English / Spanish).

**Live preview:** deploy to Vercel (see below).

---

## ✨ What's inside

- **5 pages** — Home (`index.html`), About (`about.html`), For Sponsors (`sponsors.html`), For Patients (`patients.html`), Contact (`contact.html`)
- **Bilingual** EN/ES toggle (flag switch in the nav) — persists across pages via `localStorage`
- **Cinematic video hero** (animated DNA background) + a real **office‑tour video**
- **Animated medical icons**, scroll‑reveal sections, animated stat counters
- **Real facility photography**, room gallery, embedded Google Map
- **Mobile‑optimized** down to 360px, with an accessible hamburger menu
- **Zero build step** — plain HTML/CSS/JS. No framework, no npm install required.

---

## 📁 Project structure

```
.
├── index.html              # Home (video hero, gallery, tour, map, FAQ)
├── about.html              # About, values, facility, team, credentials
├── sponsors.html           # Capabilities, performance, process
├── patients.html           # Why participate, active studies, FAQ
├── contact.html            # Validated join‑a‑study form + map
├── assets/
│   ├── styles.css          # Design system + all component styles
│   ├── site.js             # Nav, footer, counters, scroll‑reveal (builds header/footer)
│   └── i18n.js             # English/Spanish translation engine
├── img/                    # Photography, posters, generated backgrounds
├── video/
│   ├── hero.mp4            # DNA hero background loop
│   └── office-tour.mp4     # Office walkthrough
├── vercel.json             # Static hosting config (clean URLs, cache headers)
└── .gitignore
```

### How the pages are wired
- Each page sets `<body data-page="…">` and includes two empty mount points: `<div id="site-header"></div>` and `<div id="site-footer"></div>`.
- `assets/site.js` builds the **header (logo, nav, language toggle, CTA)** and **footer** into those mounts, so navigation/footer are edited in **one place**.
- `assets/i18n.js` swaps any element carrying a `data-es` attribute (and `data-es-ph` for placeholders) when the user toggles language.

---

## 🚀 Run locally

It's a static site — no install needed. Either:

**Option A — open directly**
Open `index.html` in a browser. (Video autoplay + the Google Map work best over a server.)

**Option B — any static server (recommended)**
```bash
# Python 3
python3 -m http.server 5173
# then visit http://localhost:5173

# …or Node
npx serve .
```

---

## 🧑‍💻 Develop in Cursor

```bash
git clone https://github.com/janselazo/vitalcareresearch.git
cd vitalcareresearch
cursor .
```

Helpful tips:
- Install the **Live Server** extension and "Open with Live Server" on `index.html` for hot reload.
- **Edit content** directly in the `.html` files. To change nav links, the logo, footer, or the header CTA, edit `assets/site.js`.
- **Edit colors / spacing / type** in `assets/styles.css` — the design tokens live in `:root` at the top (e.g. `--blue`, `--green`, `--ink`, radii, shadows).
- **Translations:** add `data-es="…"` to any new text element; the toggle handles the rest.

---

## ▲ Deploy to Vercel

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** `janselazo/vitalcareresearch`.
3. Framework preset: **Other** · Build command: **(none)** · Output directory: **`./`** (root).
4. Click **Deploy**. Every push to `main` auto‑deploys.

`vercel.json` already enables clean URLs (`/about` instead of `/about.html`) and long‑cache headers for images/video.

---

## 📝 Notes for the team

- **Photography & video** are AI‑generated stand‑ins built to match the real facility. Swap any file in `img/` or `video/` (keep the same filename) to drop in real assets — no code changes needed.
- **Stats, partner names, and testimonials** are illustrative — replace with real figures.
- **Contact form** is front‑end only (validates + shows a success state). Wire the submit handler in `contact.html` to your email service / CRM (e.g. Formspree, a serverless function, or your backend) to receive submissions.
- **Address & phone** (3399 NW 72nd Ave, Suite 219, Miami, FL 33122 · (786) 280‑1178) and the footer email are placeholders where noted — confirm before launch.

---

© Vital Care Research. All rights reserved.
