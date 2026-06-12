/* Renders all sections from data.js — no content lives in this file. */

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- hero ---------- */
const heroName = $("hero-name");
heroName.textContent = PROFILE.name;
heroName.setAttribute("data-text", PROFILE.name);
$("hero-tagline").textContent = PROFILE.tagline;
$("footer-name").textContent = PROFILE.name;
$("year").textContent = new Date().getFullYear();

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

/* ---------- stats ---------- */
$("stats").innerHTML = HIGHLIGHTS.map(
  (h) => `<div class="stat reveal">
    <div class="num">${esc(h.value)}</div>
    <div class="lbl">${esc(h.label)}</div>
  </div>`
).join("");

/* ---------- about ---------- */
$("about-text").innerHTML = PROFILE.about
  .map((p) => `<p class="reveal">${esc(p)}</p>`).join("");

$("about-facts").innerHTML = [
  `location: ${PROFILE.location}`,
  `focus: Incident Response & EDR`,
  `status: open to opportunities`,
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
  (p) => `<article class="project-card reveal">
    <div class="p-head">
      <span class="p-icon">⬡</span>
      ${p.link ? `<a class="p-link" href="${esc(p.link)}" target="_blank" rel="noopener">view ↗</a>` : ""}
    </div>
    <h3 class="p-title">${esc(p.title)}</h3>
    <p class="p-desc">${esc(p.description)}</p>
    <div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
  </article>`
).join("");

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

/* ---------- contact ---------- */
$("contact-actions").innerHTML = [
  `<a class="btn btn-primary" href="mailto:${esc(PROFILE.email)}">[ send_email ]</a>`,
  `<a class="btn btn-ghost" href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">[ linkedin ]</a>`,
  PROFILE.github && PROFILE.github !== "https://github.com/"
    ? `<a class="btn btn-ghost" href="${esc(PROFILE.github)}" target="_blank" rel="noopener">[ github ]</a>`
    : "",
].join("");

/* ---------- mobile nav ---------- */
$("nav-toggle").addEventListener("click", () => $("nav-links").classList.toggle("open"));
$("nav-links").addEventListener("click", (e) => {
  if (e.target.tagName === "A") $("nav-links").classList.remove("open");
});

/* ---------- reveal on scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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
