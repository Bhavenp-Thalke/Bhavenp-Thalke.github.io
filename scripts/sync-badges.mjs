#!/usr/bin/env node
/* ============================================================
   sync-badges.mjs — best-effort badge sync for the portfolio.

   What it does:
     1. Fetches the public HTB profile page and the THM badges page.
     2. Parses out earned-badge names + image URLs.
     3. Downloads any badge image it doesn't already have into
        assets/img/badges/  (so the site stays on its strict CSP —
        no hotlinking).
     4. Regenerates assets/js/badges.synced.js with the badge list.

   Honest caveats (this is "best effort", by design):
     - HTB only server-renders a PREVIEW of badges on the profile
       page; badges behind "View all" load from a session-gated API
       and won't be picked up here.
     - TryHackMe sits behind bot-protection; automated fetches are
       usually blocked, so THM badges may not appear.
   The script never throws on a failed source — it keeps whatever it
   already had so the site never regresses to empty.

   Config via env (all optional):
     HTB_PROFILE_ID   HTB profile UUID  (default below)
     THM_USERNAME     TryHackMe username (default below)
   ============================================================ */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "assets", "img", "badges");
const OUT_FILE = path.join(ROOT, "assets", "js", "badges.synced.js");

const HTB_PROFILE_ID = process.env.HTB_PROFILE_ID || "019ec665-2ad2-7220-83ad-c9c96e77dff4";
const THM_USERNAME = process.env.THM_USERNAME || "thalkebhaven";

const HTB_PROFILE_URL = `https://profile.hackthebox.com/profile/${HTB_PROFILE_ID}`;
const THM_PROFILE_URL = `https://tryhackme.com/p/${THM_USERNAME}?tab=badges`;

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const decodeEntities = (s) =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

async function get(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/json" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/* Extract <img ...> tags whose src contains a badge image, returning
   { name, src } from the alt text + src. Works for HTB and THM markup. */
function parseBadgeImgs(html, srcMustInclude) {
  const out = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const src = (tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!src || !src.includes(srcMustInclude)) continue;
    let alt = decodeEntities((tag.match(/\balt\s*=\s*["']([^"']*)["']/i) || [])[1] || "");
    alt = alt.replace(/\s*avatar\s*$/i, "").replace(/\s*badge\s*$/i, "").trim();
    out.push({ name: alt, src });
  }
  return out;
}

async function existingImages() {
  if (!existsSync(IMG_DIR)) return new Set();
  return new Set(await readdir(IMG_DIR));
}

async function downloadImage(src, fileName) {
  const dest = path.join(IMG_DIR, fileName);
  if (existsSync(dest)) return false; // already have it
  const res = await fetch(src, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${src}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(IMG_DIR, { recursive: true });
  await writeFile(dest, buf);
  return true;
}

async function scrapeHTB() {
  const badges = [];
  try {
    const html = await get(HTB_PROFILE_URL);
    const found = parseBadgeImgs(html, "/storage/badges/");
    for (const b of found) {
      const name = b.name || "HTB Badge";
      const ext = (b.src.match(/\.(png|jpg|jpeg|svg|webp)(\?|$)/i) || [])[1] || "png";
      const fileName = `htb-${slug(name) || slug(b.src)}.${ext.toLowerCase()}`;
      badges.push({
        name,
        issuer: "Hack The Box",
        image: `assets/img/badges/${fileName}`,
        link: HTB_PROFILE_URL,
        _src: b.src,
        _file: fileName,
      });
    }
    console.log(`HTB: parsed ${badges.length} badge(s).`);
  } catch (e) {
    console.warn(`HTB: skipped (${e.message}).`);
  }
  return badges;
}

async function scrapeTHM() {
  const badges = [];
  try {
    const html = await get(THM_PROFILE_URL);
    if (/Security Checkpoint|Just a moment|challenge-platform/i.test(html)) {
      console.warn("THM: blocked by bot-protection — skipped.");
      return badges;
    }
    const found = parseBadgeImgs(html, "badge");
    for (const b of found) {
      const name = b.name || "THM Badge";
      const ext = (b.src.match(/\.(png|jpg|jpeg|svg|webp)(\?|$)/i) || [])[1] || "png";
      const fileName = `thm-${slug(name) || slug(b.src)}.${ext.toLowerCase()}`;
      badges.push({
        name,
        issuer: "TryHackMe",
        image: `assets/img/badges/${fileName}`,
        link: `https://tryhackme.com/p/${THM_USERNAME}`,
        _src: b.src,
        _file: fileName,
      });
    }
    console.log(`THM: parsed ${badges.length} badge(s).`);
  } catch (e) {
    console.warn(`THM: skipped (${e.message}).`);
  }
  return badges;
}

/* Read whatever the previous run produced so a blocked source never
   wipes badges we already have. */
async function previousBadges() {
  try {
    const txt = await readFile(OUT_FILE, "utf8");
    const m = txt.match(/BADGES_SYNCED\s*=\s*(\[[\s\S]*?\]);/);
    if (!m) return [];
    return JSON.parse(m[1]);
  } catch {
    return [];
  }
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });

  const scraped = [...(await scrapeHTB()), ...(await scrapeTHM())];

  // Download images; drop any badge whose image we couldn't fetch.
  let downloaded = 0;
  const usable = [];
  for (const b of scraped) {
    try {
      if (await downloadImage(b._src, b._file)) downloaded++;
      usable.push(b);
    } catch (e) {
      console.warn(`image skipped for "${b.name}": ${e.message}`);
    }
  }

  // Merge with previous results, keyed by issuer+name, so a temporarily
  // blocked source keeps its last-known badges.
  const have = await existingImages();
  const byKey = new Map();
  for (const b of await previousBadges()) {
    // keep only if its image file still exists locally
    const file = path.basename(b.image || "");
    if (file && have.has(file)) byKey.set(`${b.issuer}::${b.name}`, b);
  }
  for (const b of usable) {
    byKey.set(`${b.issuer}::${b.name}`, {
      name: b.name,
      issuer: b.issuer,
      image: b.image,
      link: b.link,
    });
  }

  const list = [...byKey.values()].sort(
    (a, b) => a.issuer.localeCompare(b.issuer) || a.name.localeCompare(b.name)
  );

  const banner =
    "/* AUTO-GENERATED by scripts/sync-badges.mjs — DO NOT EDIT BY HAND.\n" +
    `   Last sync: ${new Date().toISOString()}\n` +
    "   Sources: HTB + TryHackMe public profiles (best-effort).\n" +
    "   The site merges this with the hand-curated BADGES array in data.js. */\n";
  const body = `window.BADGES_SYNCED = ${JSON.stringify(list, null, 2)};\n`;
  await writeFile(OUT_FILE, banner + body);

  console.log(
    `\nDone. ${list.length} synced badge(s), ${downloaded} new image(s) downloaded.`
  );
}

main().catch((e) => {
  console.error("sync-badges failed:", e);
  process.exit(1);
});
