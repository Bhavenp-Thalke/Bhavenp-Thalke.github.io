# Bhaven Thalke — Cyber Security Portfolio

A cyber-themed, fully responsive portfolio website. Pure **HTML / CSS / JS** —
no build step, no frameworks, no dependencies — so it hosts for free on
**GitHub Pages**.

- **Live site:** https://bhavenp-thalke.github.io/
- **Repo:** `Bhavenp-Thalke/Bhavenp-Thalke.github.io`
- **Source of truth:** the GitHub repo (not your laptop — see
  [What if I delete it from my machine?](#-what-if-i-delete-it-from-my-machine))

---

## 📑 Table of contents

1. [Project structure](#-project-structure)
2. [The golden rule: edit `data.js`](#-the-golden-rule-edit-datajs)
3. [How to add things](#-how-to-add-things) — project · achievement · blog · cert · badge · skill · job · stats · profile
4. [Badges & the every-2-days auto-sync](#-badges--the-every-2-days-auto-sync)
5. [How to deploy a change (step by step)](#-how-to-deploy-a-change-step-by-step)
6. [What if I delete it from my machine?](#-what-if-i-delete-it-from-my-machine)
7. [First-time deploy from scratch](#-first-time-deploy-from-scratch)
8. [Preview locally](#-preview-locally)
9. [Security notes](#-security-notes)

---

## 🗂 Project structure

```
My portfolio/
├── index.html                     # page skeleton (rarely needs editing)
├── data.js                        # ★ ALL your content lives here — edit this
├── README.md                      # this file
├── assets/
│   ├── css/style.css              # the cyber theme + responsive rules
│   ├── js/
│   │   ├── main.js                # renders data.js + animations (rarely edited)
│   │   └── badges.synced.js       # AUTO-GENERATED badge list (don't edit by hand)
│   └── img/badges/                # badge images (local copies, served by the site)
├── scripts/
│   └── sync-badges.mjs            # the badge scraper (run by GitHub, not you)
└── .github/workflows/
    └── sync-badges.yml            # GitHub Action: auto-syncs badges every 2 days
```

> `Resume.docx` is intentionally **kept out of the repo** (gitignored) so your
> personal phone/email aren't published. Keep it locally only.

---

## ✅ The golden rule: edit `data.js`

99% of changes — projects, jobs, certs, skills, blog posts, stats, your bio,
contact links — are made by editing **one file: `data.js`**. You never touch the
HTML or the JS renderer. Each section is a clearly-commented array; you copy an
existing block and edit the text.

After editing, you [deploy](#-how-to-deploy-a-change-step-by-step) with 3 git
commands. That's the whole workflow.

---

## ✏️ How to add things

Open **`data.js`** and find the matching array. Copy a block, edit it, save.

### ➕ A new project
Add a block to `PROJECTS`. The `details` object powers the click-to-open
case-study popup — **remove `details` entirely** for a simple card with no popup.

```js
{
  title: "My New Project",
  description: "Short text shown on the card.",
  tags: ["SIEM", "Detection"],
  link: "https://github.com/you/repo",   // or "" for no link
  details: {                             // optional — popup case study
    overview: "What the project was.",
    highlights: ["What I did, step 1.", "What I did, step 2."],
    outcome: "The result / impact.",
    tools: ["Tool A", "Tool B"],
  },
},
```

### ➕ A new achievement (the "wins" wall)
Add a block to `ACHIEVEMENTS`. `icon` is any emoji.

```js
{
  icon: "🏆",
  title: "Won XYZ CTF",
  detail: "One or two lines about what you achieved.",
  context: "Where / who for",
},
```

### ➕ A new blog post / writeup
Add a block to `BLOGS`. Two modes:

```js
// A) External link — card opens the URL in a new tab
{
  title: "My Writeup", date: "2026-06-01", readTime: "6 min read",
  summary: "One-line teaser shown on the card.", tags: ["DFIR"],
  link: "https://medium.com/@you/my-writeup",
},

// B) Inline post — opens in the on-site reader (leave link empty, add content)
{
  title: "My Writeup", date: "2026-06-01", readTime: "6 min read",
  summary: "One-line teaser.", tags: ["DFIR"], link: "",
  content: [
    { type: "h",     text: "A heading" },
    { type: "p",     text: "A paragraph of body text." },
    { type: "list",  items: ["point one", "point two"] },
    { type: "code",  text: "some --commands\nor code" },
    { type: "quote", text: "A highlighted takeaway." },
  ],
},
```

### ➕ A new certification
Add to `CERTIFICATIONS`:

```js
{ name: "OSCP", issuer: "OffSec", link: "https://your-credential-url" },  // link "" hides "verify"
```

### ➕ A new badge (manual)
See the [Badges](#-badges--the-every-2-days-auto-sync) section — most HTB badges
sync automatically, but you can always add one by hand (this is how you add
**TryHackMe** badges, which can't be auto-fetched).

### ➕ Other bits
- **New job** → copy a block in `EXPERIENCE`.
- **New skill** → add a string to the right list in `SKILLS`.
- **Hero stats** (the big numbers) → edit `HIGHLIGHTS`.
- **A publication** → add to `PUBLICATIONS`.
- **Education** → edit `EDUCATION`.
- **Your name / roles / tagline / bio / email / LinkedIn / GitHub / location**
  → edit the `PROFILE` object at the top.

---

## 🏅 Badges & the every-2-days auto-sync

The Badges section is fed by **two** sources that the site merges automatically:

| Source | File | Who maintains it |
|---|---|---|
| **Hand-curated** badges | `BADGES` array in `data.js` | You |
| **Auto-synced** badges | `assets/js/badges.synced.js` | The GitHub Action (auto) |

If the same badge appears in both, **your hand-curated one wins** (so you can give
it a nicer name or a specific verify link).

### How the auto-sync works
- A scheduled **GitHub Action** (`.github/workflows/sync-badges.yml`) runs
  **every 2 days** on GitHub's servers.
- It runs `scripts/sync-badges.mjs`, which:
  1. fetches your public **HTB** profile (and *tries* TryHackMe),
  2. **downloads any new badge images locally** into `assets/img/badges/`
     (so the site never hotlinks remote images — keeps the strict CSP intact),
  3. regenerates `assets/js/badges.synced.js`,
  4. commits **only if something changed**, which triggers a redeploy.

This all happens in the cloud — **your machine is never involved.**

### Honest limitations (by design)
- **HTB:** only the badges shown on your profile's server-rendered area sync
  automatically. Any badge hidden behind "View all" may not appear.
- **TryHackMe:** sits behind bot-protection that blocks automated requests, so
  THM badges currently **don't** auto-sync.

### Adding a badge the auto-sync can't reach (e.g. TryHackMe)
1. Save the badge image into `assets/img/badges/` (e.g. `thm-linux.png`).
2. Add a block to the `BADGES` array in `data.js`:
   ```js
   {
     name: "Linux Fundamentals",
     issuer: "TryHackMe",
     detail: "Completed the Linux Fundamentals path.",   // optional
     image: "assets/img/badges/thm-linux.png",
     link: "https://tryhackme.com/p/thalkebhaven",        // "" hides verify
   },
   ```
3. [Deploy](#-how-to-deploy-a-change-step-by-step).

### Run / change the auto-sync manually
- **Run it now:** GitHub → **Actions** tab → **Sync badges** → **Run workflow**.
- **Change the schedule:** edit the `cron` line in
  `.github/workflows/sync-badges.yml` (`0 6 */2 * *` = every 2 days at 06:00 UTC).
- **Change which profiles it reads:** edit `HTB_PROFILE_ID` / `THM_USERNAME` in
  the same workflow file.

---

## 🚀 How to deploy a change (step by step)

Everything is deployed through git → GitHub Pages auto-rebuilds. There is no
separate build/deploy command.

1. **Edit** the file you need (almost always `data.js`) and save it.
2. **Preview locally** (optional but recommended — see below) to check it looks right.
3. **Open a terminal in the project folder:**
   ```bash
   cd "/home/hunter/tools/My portfolio"
   ```
4. **Stage your changes:**
   ```bash
   git add -A
   ```
5. **Commit** with a short message:
   ```bash
   git commit -m "Add OSCP certification"
   ```
6. **Push to GitHub:**
   ```bash
   git push
   ```
7. **Wait ~1 minute.** GitHub Pages rebuilds and your change is live at
   https://bhavenp-thalke.github.io/. Hard-refresh (**Ctrl+Shift+R**) if you
   don't see it immediately.

> **Tip:** if `git push` ever complains about a `workflow` scope, that only
> happens when you change files under `.github/workflows/`. Run
> `gh auth refresh -h github.com -s workflow` once and push again.

---

## 💻 What if I delete it from my machine?

**Your live site and the badge auto-sync keep working.** The real copy lives on
GitHub, not your laptop — your local folder is just a working copy.

| After deleting the local folder | Still works? |
|---|---|
| Live site (`bhavenp-thalke.github.io`) | ✅ Yes — served by GitHub |
| Every-2-days badge auto-sync | ✅ Yes — runs on GitHub's servers |
| New badges appearing automatically | ✅ Yes |
| Your ability to make manual edits | ❌ Not until you re-download it |

**Before deleting**, make sure nothing is unsaved:

```bash
cd "/home/hunter/tools/My portfolio"
git status        # should say "nothing to commit, working tree clean"
git push          # push anything outstanding, just in case
```

**To get it back later** (on this or any machine), re-download the latest
version — including any badges the Action added while you were away:

```bash
git clone https://github.com/Bhavenp-Thalke/Bhavenp-Thalke.github.io.git
cd Bhavenp-Thalke.github.io
```

Then edit and `git push` exactly as before.

---

## 🌐 First-time deploy from scratch

*(Already done — kept here for reference / redeploying elsewhere.)*

1. Create a **public** GitHub repo named `<username>.github.io` (this makes the
   site live at `https://<username>.github.io/`). Any other name works too — the
   URL just becomes `https://<username>.github.io/<repo>/`.
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. Live in a minute or two.

---

## 🖥 Preview locally

Open `index.html` directly in a browser, **or** serve it (so paths behave exactly
like production):

```bash
cd "/home/hunter/tools/My portfolio"
python3 -m http.server 8000
# → open http://localhost:8000
```

To test the badge scraper locally (optional):

```bash
node scripts/sync-badges.mjs   # needs Node 18+; updates badges.synced.js + images
```

---

## 🔒 Security notes

- Static site = tiny attack surface (no server, DB, or backend).
- All rendered data is HTML-escaped; the interactive console uses `textContent`
  (no XSS). No `eval`, no `document.write`.
- A strict **Content-Security-Policy** is set in `index.html`
  (`img-src 'self'` — that's why badge images are stored locally, never
  hotlinked) plus a referrer policy and a clickjacking guard.
- Keep `Resume.docx` and any PDFs out of the repo (they're gitignored) so
  personal contact details aren't published.
- Biggest residual risk is **GitHub account takeover** → enable **2FA** on your
  GitHub account.
```
