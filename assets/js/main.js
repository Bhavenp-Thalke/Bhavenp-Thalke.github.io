/* Renders all sections from data.js — no content lives in this file. */

/* Clickjacking guard: refuse to be embedded in a frame on another origin.
   (Backs up the CSP frame-ancestors directive, which browsers ignore when
   CSP is delivered via a <meta> tag — the only option on a static host.) */
if (window.top !== window.self) {
  try { window.top.location = window.self.location; } catch (e) { document.documentElement.style.display = "none"; }
}

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- boot sequence (once per session) ---------- */
(function boot() {
  const el = $("boot");
  if (sessionStorage.getItem("booted")) { el.remove(); return; }
  const lines = [
    ["[ <span class='ok'>OK</span> ] Loading kernel modules", 120],
    ["[ <span class='ok'>OK</span> ] Mounting /dev/portfolio", 240],
    ["[ <span class='ok'>OK</span> ] Starting threat intelligence feeds", 420],
    ["[ <span class='ok'>OK</span> ] EDR agent online · telemetry streaming", 620],
    ["[ <span class='ok'>OK</span> ] Establishing encrypted channel (TLS 1.3)", 820],
    ["<span class='grant'>&gt;&gt; ACCESS GRANTED</span>", 1150],
  ];
  const log = $("boot-log");
  lines.forEach(([html, t]) =>
    setTimeout(() => { const p = document.createElement("p"); p.innerHTML = html; log.appendChild(p); }, t));
  const finish = () => {
    sessionStorage.setItem("booted", "1");
    el.classList.add("done");
    setTimeout(() => el.remove(), 500);
  };
  setTimeout(finish, 1900);
  el.addEventListener("click", finish);
})();

/* ---------- hero ---------- */
const heroName = $("hero-name");
heroName.textContent = PROFILE.name;
heroName.setAttribute("data-text", PROFILE.name);
$("hero-tagline").textContent = PROFILE.tagline;
$("footer-name").textContent = PROFILE.name;
$("year").textContent = new Date().getFullYear();
if (PROFILE.status) {
  $("status-pill").hidden = false;
  $("status-text").textContent = PROFILE.status;
}

/* typing animation cycling through roles */
(function typeRoles() {
  const el = $("typed-role");
  let role = 0, char = 0, deleting = false;
  function tick() {
    const word = PROFILE.roles[role];
    el.textContent = word.slice(0, char);
    let delay = deleting ? 35 : 75;
    if (!deleting && char === word.length) { delay = 1800; deleting = true; }
    else if (deleting && char === 0) {
      deleting = false;
      role = (role + 1) % PROFILE.roles.length;
      delay = 400;
    } else { char += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ---------- stats (with count-up animation) ---------- */
$("stats").innerHTML = HIGHLIGHTS.map(
  (h) => `<div class="stat reveal">
    <div class="num" data-val="${esc(h.value)}">0</div>
    <div class="lbl">${esc(h.label)}</div>
  </div>`
).join("");

function countUp(el) {
  const raw = el.dataset.val;
  const num = parseInt(raw, 10);
  if (isNaN(num)) { el.textContent = raw; return; }
  const suffix = raw.replace(/^[0-9]+/, "");
  const dur = 900, t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(num * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- about ---------- */
$("about-text").innerHTML = PROFILE.about
  .map((p) => `<p class="reveal">${esc(p)}</p>`).join("");

$("about-facts").innerHTML = [
  `location: ${PROFILE.location}`,
  `focus: Incident Response & EDR`,
  `status: ${(PROFILE.status || "online").toLowerCase()}`,
].map((f) => `<li>${esc(f)}</li>`).join("");

$("education-list").innerHTML = EDUCATION.map(
  (e) => `<li>${esc(e.degree)} — ${esc(e.institution)} (${esc(e.detail)})</li>`
).join("");

/* ---------- experience timeline ---------- */
$("timeline").innerHTML = EXPERIENCE.map(
  (job) => `<div class="t-item reveal">
    <span class="t-period">${esc(job.period)}</span>
    <h3 class="t-role">${esc(job.role)}</h3>
    <p class="t-company">@ ${esc(job.company)}${job.client ? " · " + esc(job.client) : ""}</p>
    <ul class="t-points">${job.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
  </div>`
).join("");

/* ---------- projects ---------- */
$("projects-grid").innerHTML = PROJECTS.map(
  (p, i) => `<button class="project-card reveal tilt" data-idx="${i}">
    <div class="p-head">
      <span class="p-icon">⬡</span>
      <span class="p-open">${p.details ? "open_case_study ↗" : p.link ? "view ↗" : ""}</span>
    </div>
    <h3 class="p-title">${esc(p.title)}</h3>
    <p class="p-desc">${esc(p.description)}</p>
    <div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
  </button>`
).join("");

/* ---------- project modal ---------- */
const overlay = $("modal-overlay");

function openProject(p) {
  if (!p.details && p.link) { window.open(p.link, "_blank", "noopener"); return; }
  if (!p.details) return;
  const d = p.details;
  $("modal-path").textContent =
    "~/projects/" + p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  $("modal-body").innerHTML = `
    <h3>${esc(p.title)}</h3>
    <div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    <span class="m-label">## OVERVIEW</span>
    <p>${esc(d.overview)}</p>
    <span class="m-label">## WHAT I DID</span>
    <ul>${d.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
    <span class="m-label">## OUTCOME</span>
    <p class="m-outcome">${esc(d.outcome)}</p>
    ${d.tools && d.tools.length
      ? `<span class="m-label">## STACK</span>
         <div class="p-tags">${d.tools.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`
      : ""}
    ${p.link ? `<a class="btn btn-ghost m-link" href="${esc(p.link)}" target="_blank" rel="noopener">[ view_link ↗ ]</a>` : ""}`;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
}
$("projects-grid").addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (card) openProject(PROJECTS[card.dataset.idx]);
});
$("modal-close").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) closeModal(); });

/* ---------- achievements ---------- */
$("ach-grid").innerHTML = ACHIEVEMENTS.map(
  (a) => `<div class="ach-card reveal">
    <span class="ach-icon">${a.icon}</span>
    <h3 class="ach-title">${esc(a.title)}</h3>
    <p class="ach-detail">${esc(a.detail)}</p>
    ${a.context ? `<span class="ach-context">${esc(a.context)}</span>` : ""}
  </div>`
).join("");

/* ---------- blog / writeups ---------- */
const fmtDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

$("blog-grid").innerHTML = BLOGS.map(
  (b, i) => `<button class="blog-card reveal tilt" data-idx="${i}">
    <div class="blog-meta">
      <span class="blog-date">▸ ${esc(fmtDate(b.date))}</span>
      ${b.readTime ? `<span class="blog-read">${esc(b.readTime)}</span>` : ""}
    </div>
    <h3 class="blog-title">${esc(b.title)}</h3>
    <p class="blog-summary">${esc(b.summary)}</p>
    <div class="p-tags">${(b.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    <span class="blog-open">${b.link ? "read on the web ↗" : "read_post ↗"}</span>
  </button>`
).join("");

/* render a block-based writeup body into safe HTML */
function renderBlocks(blocks) {
  return (blocks || []).map((blk) => {
    switch (blk.type) {
      case "h": return `<h4 class="m-h">${esc(blk.text)}</h4>`;
      case "list": return `<ul>${(blk.items || []).map((it) => `<li>${esc(it)}</li>`).join("")}</ul>`;
      case "code": return `<pre class="m-code">${esc(blk.text)}</pre>`;
      case "quote": return `<p class="m-outcome">${esc(blk.text)}</p>`;
      case "p":
      default: return `<p>${esc(blk.text)}</p>`;
    }
  }).join("");
}

function openBlog(b) {
  if (b.link) { window.open(b.link, "_blank", "noopener"); return; }
  $("modal-path").textContent =
    "~/blog/" + b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md";
  $("modal-body").innerHTML = `
    <h3>${esc(b.title)}</h3>
    <p class="blog-meta-line">${esc(fmtDate(b.date))}${b.readTime ? " · " + esc(b.readTime) : ""}</p>
    <div class="p-tags">${(b.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    <div class="blog-article">${renderBlocks(b.content)}</div>`;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

$("blog-grid").addEventListener("click", (e) => {
  const card = e.target.closest(".blog-card");
  if (card) openBlog(BLOGS[card.dataset.idx]);
});

/* ---------- skills ---------- */
$("skills-grid").innerHTML = SKILLS.map(
  (g) => `<div class="skill-group reveal">
    <h3>&gt; ${esc(g.group)}</h3>
    <div class="skill-chips">${g.items.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
  </div>`
).join("");

/* ---------- certifications & publications ---------- */
$("certs-grid").innerHTML = CERTIFICATIONS.map(
  (c) => `<div class="cert-card reveal">
    <span class="cert-badge">🏅</span>
    <div>
      <div class="cert-name">${esc(c.name)}</div>
      <div class="cert-issuer">issued by: ${esc(c.issuer)}
        ${c.link ? ` · <a class="cert-link" href="${esc(c.link)}" target="_blank" rel="noopener">verify ↗</a>` : ""}
      </div>
    </div>
  </div>`
).join("");

$("pubs").innerHTML = PUBLICATIONS.map(
  (p) => `<div class="pub-card reveal">
    <span class="pub-type">📄 ${esc(p.type)}</span>
    <h3 class="pub-title">${esc(p.title)}</h3>
    <p class="pub-desc">${esc(p.description)}</p>
    ${p.link ? `<a class="p-link" href="${esc(p.link)}" target="_blank" rel="noopener">read ↗</a>` : ""}
  </div>`
).join("");

/* ---------- badges ---------- */
/* Merge hand-curated BADGES (data.js) with auto-synced ones
   (assets/js/badges.synced.js, regenerated by the GitHub Action).
   Manual entries win on a name clash. */
const ALL_BADGES = (() => {
  const synced = Array.isArray(window.BADGES_SYNCED) ? window.BADGES_SYNCED : [];
  const key = (b) => (b.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const seen = new Set(BADGES.map(key));
  return [...BADGES, ...synced.filter((b) => !seen.has(key(b)))];
})();

$("badges-grid").innerHTML = ALL_BADGES.map((b) => {
  const inner = `<img class="badge-img" src="${esc(b.image)}" alt="${esc(b.name)} badge" loading="lazy" />
    <h3 class="badge-name">${esc(b.name)}</h3>
    <span class="badge-issuer">${esc(b.issuer)}</span>
    ${b.detail ? `<p class="badge-detail">${esc(b.detail)}</p>` : ""}
    ${b.link ? `<span class="badge-verify">verify ↗</span>` : ""}`;
  return b.link
    ? `<a class="badge-card reveal tilt" href="${esc(b.link)}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="badge-card reveal tilt">${inner}</div>`;
}).join("");

/* ---------- contact ---------- */
$("contact-actions").innerHTML = [
  `<a class="btn btn-primary" href="mailto:${esc(PROFILE.email)}">[ send_email ]</a>`,
  `<a class="btn btn-ghost" href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">[ linkedin ]</a>`,
  PROFILE.github ? `<a class="btn btn-ghost" href="${esc(PROFILE.github)}" target="_blank" rel="noopener">[ github ]</a>` : "",
].join("");

/* ---------- interactive console ---------- */
(function consoleWidget() {
  const out = $("console-out");
  const input = $("console-in");
  if (!out || !input) return;

  const print = (text, cls = "c-out") => {
    const p = document.createElement("p");
    p.className = cls;
    p.textContent = text;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  };

  const COMMANDS = {
    help: () => {
      print("available commands:", "c-cyan");
      print("  whoami      — who is this guy?");
      print("  skills      — list security domains & tools");
      print("  projects    — list project directory");
      print("  blog        — list writeups");
      print("  certs       — list certifications");
      print("  contact     — how to reach me");
      print("  clear       — wipe the screen");
      print("  hack        — try your luck");
    },
    whoami: () => {
      print(PROFILE.name + " — " + PROFILE.roles[0], "c-ok");
      print(PROFILE.tagline);
      print("location: " + PROFILE.location);
    },
    skills: () => SKILLS.forEach((g) => {
      print("> " + g.group, "c-cyan");
      print("  " + g.items.join(", "));
    }),
    projects: () => {
      print("~/projects/", "c-cyan");
      PROJECTS.forEach((p) => print("  drwxr-x---  " + p.title));
      print("(click the project cards above for full case studies)", "c-ok");
    },
    blog: () => {
      print("~/blog/", "c-cyan");
      BLOGS.forEach((b) => print("  -rw-r--r--  " + b.title + "  (" + b.date + ")"));
      print("(click the cards in the blog section above to read)", "c-ok");
    },
    certs: () => CERTIFICATIONS.forEach((c) => print("  🏅 " + c.name + " — " + c.issuer)),
    contact: () => {
      print("email:    " + PROFILE.email, "c-ok");
      print("linkedin: " + PROFILE.linkedin);
      if (PROFILE.github) print("github:   " + PROFILE.github);
    },
    clear: () => { out.innerHTML = ""; },
    sudo: () => print("guest is not in the sudoers file. This incident will be reported. 🚨", "c-err"),
    hack: () => {
      print("initiating exploit...", "c-cyan");
      setTimeout(() => print("bypassing firewall... [██████----] 60%"), 400);
      setTimeout(() => print("ACCESS DENIED — intrusion logged & reported to SOC 😉", "c-err"), 1100);
      setTimeout(() => print("(nice try though. let's talk: " + PROFILE.email + ")", "c-ok"), 1700);
    },
    exit: () => print("there is no escape. 🔒", "c-err"),
    ls: () => print("about/  experience/  projects/  achievements/  skills/  certs/  contact/"),
  };

  print("Welcome to the interactive console.", "c-ok");
  print("Type 'help' to see available commands.");

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.value.trim().toLowerCase();
    input.value = "";
    if (!cmd) return;
    print("guest@portfolio:~$ " + cmd, "c-cmd");
    const fn = COMMANDS[cmd] || COMMANDS[cmd.split(" ")[0]];
    if (fn) fn();
    else print("command not found: " + cmd + " — try 'help'", "c-err");
  });
})();

/* ---------- mobile nav ---------- */
$("nav-toggle").addEventListener("click", () => $("nav-links").classList.toggle("open"));
$("nav-links").addEventListener("click", (e) => {
  if (e.target.tagName === "A") $("nav-links").classList.remove("open");
});

/* ---------- active nav link on scroll ---------- */
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }),
  { rootMargin: "-40% 0px -55% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ---------- reveal on scroll (+ stat count-up) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("visible");
    const num = en.target.querySelector(".num[data-val]");
    if (num) countUp(num);
    revealObserver.unobserve(en.target);
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- scroll progress bar ---------- */
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  $("scroll-progress").style.width = pct + "%";
}, { passive: true });

/* ---------- cursor glow ---------- */
window.addEventListener("mousemove", (e) => {
  const g = $("cursor-glow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
}, { passive: true });

/* ---------- tilt effect on cards (desktop only) ---------- */
if (matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".tilt");
    document.querySelectorAll(".tilt").forEach((el) => {
      if (el !== card) el.style.transform = "";
    });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  }, { passive: true });
  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest(".tilt");
    if (card) card.style.transform = "";
  });
}

/* ---------- matrix rain ---------- */
(function matrixRain() {
  const canvas = $("matrix-bg");
  const ctx = canvas.getContext("2d");
  const chars = "01アカサタナハマヤラ$#&%@!?<>{}[]";
  let cols, drops, fontSize = 14;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize));
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(6, 10, 16, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff9c";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 55);
})();
