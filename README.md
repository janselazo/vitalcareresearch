# Vital Care Research — Website

Marketing website for **Vital Care Research**, a multispecialty clinical research center in Miami, FL. Static, dependency‑free, fully responsive, and bilingual (English / Spanish).

**Production:** hosted on [Cloudflare Pages](https://pages.cloudflare.com) from `vitalcareresearch/website` (see below).

---

## ✨ What's inside

- **6 pages** — Home (`index.html`), About (`about.html`), Capabilities (`capabilities.html`), For Sponsors (`sponsors.html`), For Patients (`patients.html`), Contact (`contact.html`)
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
├── capabilities.html       # On-site equipment, cold storage, clinical rooms
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
│   └── vitalcare_office_video.mp4  # Office walkthrough
├── _headers                # Cloudflare Pages cache headers
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

## Repos & deploy workflow

| Repo | Role |
|---|---|
| `janselazo/vitalcareresearch` | **Dev** — edit here in Cursor |
| `vitalcareresearch/website` | **Production** — Cloudflare Pages watches this repo |

**Flow:** push to dev `main` → GitHub Action mirrors to client repo → Cloudflare auto-deploys.

### Development

1. Clone and work in `janselazo/vitalcareresearch`.
2. Push to `main`. The workflow in `.github/workflows/mirror-to-client.yml` syncs to `vitalcareresearch/website`.
3. Requires a **deploy key** secret on the dev repo (see mirror setup below).

### Mirror setup (one-time)

The workflow pushes over SSH using a deploy key. No personal account needs write access to the client repo.

1. **Generate a key pair** (on your machine):
   ```bash
   ssh-keygen -t ed25519 -C "vcr-mirror" -f ./vcr_mirror_deploy_key -N ""
   ```

2. **Add the public key** to the production repo (`vitalcareresearch/website`):
   - **Settings → Deploy keys → Add deploy key**
   - Title: `mirror-from-dev`
   - Key: paste `vcr_mirror_deploy_key.pub`
   - Enable **Allow write access** → **Add key**

3. **Add the private key** to the dev repo (`janselazo/vitalcareresearch`):
   - **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `CLIENT_REPO_DEPLOY_KEY`
   - Value: paste the full `vcr_mirror_deploy_key` file (including BEGIN/END lines)

4. **Remove local key files** when done:
   ```bash
   rm vcr_mirror_deploy_key vcr_mirror_deploy_key.pub
   ```

5. Push to `main` or run **Actions → Mirror to client repo → Run workflow**.

The workflow only runs on **`janselazo/vitalcareresearch`**. It is copied to the client repo by the mirror but skips itself there — the client repo is deploy-only (Cloudflare watches it).

**Troubleshooting**

| Error | Fix |
|---|---|
| `CLIENT_REPO_DEPLOY_KEY secret is missing` | Complete step 3. |
| `Permission denied (publickey)` | Public key not on client repo, or private key pasted incorrectly. |
| `Permission denied` with a username | Deploy key missing **Allow write access** on the client repo. |

### Production — Cloudflare Pages (one-time setup)

1. Sign up or log in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → GitHub.
3. Grant access to the **`vitalcareresearch`** org and select repo **`vitalcareresearch/website`**.
4. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. **Save and Deploy**. Note the `*.pages.dev` URL.
6. Later: **Custom domains** in the Pages project to attach the client domain.

`_headers` sets long-cache headers for images and video. Cloudflare Pages serves clean URLs automatically (`/about` for `about.html`).

If Cloudflare cannot see the client repo during setup, go to GitHub **Settings → Applications → Cloudflare Pages** and grant access to `vitalcareresearch/website`.

---

## 📝 Notes for the team

- **Photography & video** are AI‑generated stand‑ins built to match the real facility. Swap any file in `img/` or `video/` (keep the same filename) to drop in real assets — no code changes needed.
- **Stats, partner names, and testimonials** are illustrative — replace with real figures.
- **Contact form** submits via [Web3Forms](https://web3forms.com) from `contact.html` (client-side). Confirm the access key and inbox before launch.
- **Address & phone** (3399 NW 72nd Ave, Suite 219, Miami, FL 33122 · (305) 264-1165) and the footer email are placeholders where noted — confirm before launch.

---

© Vital Care Research. All rights reserved.
