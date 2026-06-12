# Bhaven Thalke — Cyber Security Portfolio

A cyber-themed, fully responsive portfolio website. Pure HTML/CSS/JS — no build
step, no dependencies — so it hosts free on **GitHub Pages**.

## 🗂 Structure

```
├── index.html          # page layout (rarely needs editing)
├── data.js             # ★ ALL content lives here — edit this file
├── assets/
│   ├── css/style.css   # cyber theme styling
│   └── js/main.js      # renders data.js + animations
└── Resume.docx
```

## ✏️ How to add a new project / achievement

Everything on the site comes from **`data.js`**. You never touch the HTML.

**New project** → copy any block in the `PROJECTS` array and edit it:

```js
{
  title: "My New Project",
  description: "Short text shown on the card.",
  tags: ["SIEM", "Detection"],
  link: "https://github.com/you/repo",   // or "" if no link
  details: {                             // powers the click-to-open case study
    overview: "What the project was.",   // (remove `details` entirely for a
    highlights: [                        //  simple card with no popup)
      "What I did, step 1.",
      "What I did, step 2.",
    ],
    outcome: "The result / impact.",
    tools: ["Tool A", "Tool B"],
  },
},
```

**New achievement** → copy a block in `ACHIEVEMENTS`:

```js
{
  icon: "🏆",
  title: "Won XYZ CTF",
  detail: "One or two lines about what you achieved.",
  context: "Where / who for",
},
```

**New certification** → add to `CERTIFICATIONS`:

```js
{ name: "OSCP", issuer: "OffSec", link: "https://credential-url" },
```

**New job** → copy a block in `EXPERIENCE`.
**New skill** → add a string to the right list in `SKILLS`.
**Stats under the hero** → edit `HIGHLIGHTS`.

Then publish the change:

```bash
git add data.js
git commit -m "Add new project"
git push
```

GitHub Pages redeploys automatically in ~1 minute.

## 🚀 First-time deploy to GitHub Pages (free)

1. Create a **public** repo on GitHub named `<your-username>.github.io`
   (this makes the site live at `https://<your-username>.github.io/` —
   any other repo name works too, the URL just becomes
   `https://<your-username>.github.io/<repo-name>/`).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Your site is live in a minute or two.

## 🖥 Preview locally

Just open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```
