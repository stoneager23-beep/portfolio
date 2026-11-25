#!/usr/bin/env node
/**
 * Build both resume PDFs from resume/resume-data.js:
 *   public/Husnain_Faisal_Resume_ATS.pdf     plain single-column, ATS-first
 *   public/Husnain_Faisal_Resume_Design.pdf  branded, still single-column and ATS-parseable
 *
 * ATS-safety rules baked into both templates:
 * - single reading order (no side-by-side columns), standard section headings
 * - real, selectable text; icons are inline SVG paths, so they add no characters
 * - ligatures off, so "fi"/"fl" never turn into special glyphs that break keyword matching
 * - only light letter-spacing, so headings aren't extracted as "S K I L L S"
 *
 * Playwright is NOT a project dependency (same as scripts/capture-screenshots.mjs):
 *   npm install --no-save playwright-core
 *   PW_CHANNEL=chrome node scripts/build-resume.mjs        (or msedge, or omit with full `playwright`)
 * Pass --html to also write the rendered HTML next to the PDFs for debugging.
 */
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Award,
  Briefcase,
  Code,
  FolderGit2,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  Link as LinkIcon,
} from 'lucide-react';
import resume from '../resume/resume-data.js';

const PUBLIC_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const OUTPUTS = {
  ats: 'Husnain_Faisal_Resume_ATS.pdf',
  design: 'Husnain_Faisal_Resume_Design.pdf',
};

// ------------------------------------------------------------------ helpers
const esc = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const svg = (Icon, size = 11) =>
  renderToStaticMarkup(createElement(Icon, { size, strokeWidth: 2, 'aria-hidden': 'true', focusable: 'false' }));

const CONTACT_ICONS = { location: MapPin, phone: Phone, email: Mail, website: Globe, github: Github, linkedin: Linkedin };

const contactItem = ({ type, label, href }, size) => {
  const inner = `${svg(CONTACT_ICONS[type], size)}<span>${esc(label)}</span>`;
  return href ? `<a class="contact-item" href="${esc(href)}">${inner}</a>` : `<span class="contact-item">${inner}</span>`;
};

const bullets = (items) => `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`;

/** Contact details in two balanced rows: personal details, then web profiles. */
const contactRows = (contact, size) => {
  const isWeb = (c) => ['website', 'github', 'linkedin'].includes(c.type);
  return [contact.filter((c) => !isWeb(c)), contact.filter(isWeb)]
    .map((row) => `<div class="contact">${row.map((c) => contactItem(c, size)).join('')}</div>`)
    .join('');
};

const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0, "dlig" 0; }
  a { color: inherit; text-decoration: none; }
  /* Native list markers, not positioned ::before bullets: positioned elements are drawn after
     everything else, so parsers that read the PDF in drawing order would detach bullets from their job. */
  ul { list-style: disc outside; padding-left: 11pt; }
  li { padding-left: 1pt; }
  .entry, .skill-row, li { break-inside: avoid; }
  h2 { break-after: avoid; }
  svg { flex-shrink: 0; }
  .contact + .contact { margin-top: 2pt; }
`;

// ------------------------------------------------------------------ ATS template
function atsHtml(r) {
  const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(r.name)} - Resume (ATS)</title>
<style>
  ${BASE_CSS}
  @page { size: A4; margin: 10mm 12mm; }
  body { font-family: Calibri, Carlito, Arial, Helvetica, sans-serif; font-size: 9.6pt; line-height: 1.24; color: #1b1b1b; }
  h1 { font-size: 20pt; line-height: 1.1; color: #102a3a; }
  .headline { margin-top: 1.5pt; font-size: 10.8pt; font-weight: 700; color: #1f5f78; }
  .contact { display: flex; flex-wrap: wrap; gap: 2pt 7.5pt; margin-top: 4pt; font-size: 8.5pt; }
  .contact-item { display: inline-flex; align-items: center; gap: 3pt; }
  .contact-item svg { color: #1f5f78; }
  h2 { margin: 6pt 0 2.5pt; padding-bottom: 1.2pt; border-bottom: 0.9pt solid #8fa3ad; font-size: 10.2pt;
       text-transform: uppercase; letter-spacing: 0.03em; color: #102a3a; }
  .skill-row { margin: 0.8pt 0; }
  .skill-row b { color: #102a3a; }
  .entry { margin-top: 3.5pt; }
  .entry:first-of-type { margin-top: 0; }
  .entry-head { display: flex; justify-content: space-between; gap: 10pt; }
  .entry-title { font-weight: 700; color: #102a3a; }
  .entry-dates { white-space: nowrap; font-weight: 700; color: #1f5f78; }
  .entry-link { white-space: nowrap; color: #1f5f78; font-size: 9pt; }
  .entry-sub { color: #444; font-size: 9.1pt; }
  .entry ul { margin-top: 0.8pt; }
  li { margin: 0.6pt 0; }
  li::marker { color: #1f5f78; }
  .inline-list { margin-top: 1pt; }
</style></head><body>
<header>
  <h1>${esc(r.name)}</h1>
  <p class="headline">${esc(r.headline)}</p>
  ${contactRows(r.contact, 9)}
</header>
${section('Professional Summary', `<p>${esc(r.summary)}</p>`)}
${section(
  'Technical Skills',
  r.skills.map((s) => `<p class="skill-row"><b>${esc(s.label)}:</b> ${esc(s.items.join(', '))}</p>`).join(''),
)}
${section(
  'Professional Experience',
  r.experience
    .map(
      (e) => `<div class="entry">
        <div class="entry-head"><span><span class="entry-title">${esc(e.title)} | ${esc(e.company)}</span> | ${esc(e.location)}</span><span class="entry-dates">${esc(e.dates)}</span></div>
        ${bullets(e.bullets)}</div>`,
    )
    .join(''),
)}
${section(
  'Projects',
  r.projects
    .map(
      (p) => `<div class="entry">
        <div class="entry-head"><span><span class="entry-title">${esc(p.name)}</span> | ${esc(p.tech.join(', '))}</span>${
          p.link ? `<a class="entry-link" href="${esc(p.link.href)}">${esc(p.link.label)}</a>` : ''
        }</div>
        ${bullets(p.bullets)}</div>`,
    )
    .join(''),
)}
${section(
  'Education',
  r.education
    .map(
      (e) => `<div class="entry">
        <div class="entry-head"><span class="entry-title">${esc(e.degree)} | ${esc(e.school)}</span><span class="entry-dates">${esc(e.dates)}</span></div>
        <div class="entry-sub">${esc(e.location)} | ${esc(e.details)}</div></div>`,
    )
    .join(''),
)}
${section('Additional Information', bullets([...r.achievements, `Languages: ${r.languages.join(', ')}`]))}
</body></html>`;
}

// ------------------------------------------------------------------ Design template
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700' +
  '&family=Playfair+Display:ital,wght@1,700&display=block';

/**
 * Chrome can't embed *variable* fonts in a PDF; it falls back to Type3 glyph drawings, which some
 * ATS parsers read poorly. Google Fonts serves one static file per weight to browsers without
 * WOFF2 support, so fetch the CSS with such a user agent and inline it.
 */
async function staticFontCss() {
  try {
    const response = await fetch(FONTS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return `<style>${await response.text()}</style>`;
  } catch (error) {
    console.warn(`Could not fetch static fonts (${error.message}); falling back to variable fonts (Type3 in the PDF).`);
    return `<link href="${FONTS_URL}" rel="stylesheet">`;
  }
}

function designHtml(r, fontCss) {
  const section = (Icon, title, body) =>
    `<section><h2><span class="h2-icon">${svg(Icon, 12)}</span><span>${esc(title)}</span></h2>${body}</section>`;
  const [first, ...rest] = r.name.split(' ');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(r.name)} - Resume</title>
${fontCss}
<style>
  ${BASE_CSS}
  @page { size: A4; margin: 10mm 0 11mm; }
  @page :first { margin-top: 0; }
  :root { --ink: #17171a; --muted: #555a63; --gold: #8c6a0b; --gold-bright: #d4af37; --line: #e6e1d3; --tint: #faf7ee; }
  body { font-family: Inter, 'Segoe UI', Arial, sans-serif; font-size: 8.6pt; line-height: 1.3; color: var(--ink); }
  .page-pad { padding: 0 12mm; }

  /* no position/overflow here: positioned blocks are drawn last, which would put the name and
     contact details at the end of the PDF's text for parsers that read in drawing order */
  /* opaque gradient stops only: semi-transparent gradients get rasterized into page-sized images */
  .masthead { padding: 8mm 12mm 6mm; color: #ece8e0;
    background: linear-gradient(90deg, #d4af37, #f2ca50 40%, #0f0f11) bottom / 100% 2.2pt no-repeat,
                radial-gradient(circle at 90% 0%, #10343d 0%, #0f1a1e 30%, #0f0f11 55%) top right / 60% 100% no-repeat,
                linear-gradient(100deg, #1f1a0c 0%, #0f0f11 38%); }
  h1 { font-family: 'Space Grotesk', Inter, sans-serif; font-size: 23pt; font-weight: 700; line-height: 1.05; color: #fff; }
  h1 em { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 700; color: #f2ca50; }
  .headline { margin-top: 3pt; font-family: 'Space Grotesk', Inter, sans-serif; font-size: 10pt; font-weight: 600; color: #f2ca50; }
  .contact { display: flex; flex-wrap: wrap; gap: 3pt 8pt; margin-top: 6pt; font-size: 7.6pt; color: #d9d4ca; }
  .contact-item { display: inline-flex; align-items: center; gap: 3pt; }
  .contact-item svg { color: #f2ca50; }

  section { margin-top: 5.5pt; }
  h2 { display: flex; align-items: center; gap: 6pt; margin-bottom: 3pt; font-family: 'Space Grotesk', Inter, sans-serif;
       font-size: 10.4pt; font-weight: 700; letter-spacing: 0.01em; color: var(--ink); }
  h2::after { content: ""; flex: 1; height: 0.8pt; background: var(--line); }
  .h2-icon { display: inline-flex; align-items: center; justify-content: center; width: 15pt; height: 15pt; border-radius: 4pt;
             background: var(--tint); border: 0.8pt solid #ead9a6; color: var(--gold); }

  .summary { color: #2b2b30; }
  .skill-row { display: flex; gap: 8pt; padding: 1.4pt 0; border-bottom: 0.6pt dashed var(--line); }
  .skill-row:last-child { border-bottom: 0; }
  .skill-row b { flex: 0 0 100pt; font-weight: 600; color: var(--gold); }

  .entry { margin-top: 4pt; }
  .entry:first-of-type { margin-top: 0; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .entry-title { font-weight: 700; font-size: 9.2pt; }
  .pill { white-space: nowrap; font-size: 7.5pt; font-weight: 600; color: var(--gold); background: var(--tint);
          border: 0.7pt solid #ead9a6; border-radius: 99pt; padding: 0.4pt 6pt; }
  .link { display: inline-flex; align-items: center; gap: 2.5pt; white-space: nowrap; font-size: 7.8pt; font-weight: 500; color: var(--gold); }
  .entry-sub { display: flex; flex-wrap: wrap; align-items: center; gap: 2pt 10pt; margin-top: 0.4pt; font-size: 8pt; color: var(--muted); }
  .entry-sub .meta { display: inline-flex; align-items: center; gap: 3pt; }
  .entry-sub svg { color: var(--gold); }
  .tech { color: #3d4f63; font-weight: 500; }
  .entry ul { margin-top: 1pt; }
  li { margin: 0.5pt 0; color: #2b2b30; }
  li::marker { color: var(--gold-bright); }
  .inline-list { color: #2b2b30; }
</style></head><body>
<header class="masthead">
  <h1>${esc(first)} <em>${esc(rest.join(' '))}</em></h1>
  <p class="headline">${esc(r.headline)}</p>
  ${contactRows(r.contact, 9)}
</header>
<main class="page-pad">
${section(User, 'Professional Summary', `<p class="summary">${esc(r.summary)}</p>`)}
${section(
  Code,
  'Technical Skills',
  r.skills.map((s) => `<p class="skill-row"><b>${esc(s.label)}</b><span>${esc(s.items.join(', '))}</span></p>`).join(''),
)}
${section(
  Briefcase,
  'Professional Experience',
  r.experience
    .map(
      (e) => `<div class="entry">
        <div class="entry-head"><span><span class="entry-title">${esc(e.title)} | ${esc(e.company)}</span> <span class="tech">| ${esc(e.location)}</span></span><span class="pill">${esc(e.dates)}</span></div>
        ${bullets(e.bullets)}</div>`,
    )
    .join(''),
)}
${section(
  FolderGit2,
  'Projects',
  r.projects
    .map(
      (p) => `<div class="entry">
        <div class="entry-head"><span><span class="entry-title">${esc(p.name)}</span> <span class="tech">| ${esc(p.tech.join(', '))}</span></span>${
          p.link ? `<a class="link" href="${esc(p.link.href)}">${svg(LinkIcon, 8)}${esc(p.link.label)}</a>` : ''
        }</div>
        ${bullets(p.bullets)}</div>`,
    )
    .join(''),
)}
${section(
  GraduationCap,
  'Education',
  r.education
    .map(
      (e) => `<div class="entry">
        <div class="entry-head"><span class="entry-title">${esc(e.degree)} | ${esc(e.school)}</span><span class="pill">${esc(e.dates)}</span></div>
        <div class="entry-sub"><span class="meta">${svg(MapPin, 8)}${esc(e.location)}</span><span class="meta">${svg(Award, 8)}${esc(e.details)}</span></div></div>`,
    )
    .join(''),
)}
${section(Award, 'Additional Information', bullets([...r.achievements, `Languages: ${r.languages.join(', ')}`]))}
</main>
</body></html>`;
}

// ------------------------------------------------------------------ build
function loadPlaywright() {
  const require = createRequire(import.meta.url);
  for (const name of ['playwright', 'playwright-core']) {
    try {
      return require(name);
    } catch {
      // try the next package name
    }
  }
  console.error(
    'Playwright is not installed. Install it without touching package.json:\n' +
      '  npm install --no-save playwright-core && PW_CHANNEL=chrome node scripts/build-resume.mjs',
  );
  process.exit(1);
}

async function main() {
  const writeHtml = process.argv.includes('--html');
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});

  const fontCss = await staticFontCss();

  for (const [kind, html] of [
    ['ats', atsHtml(resume)],
    ['design', designHtml(resume, fontCss)],
  ]) {
    const file = resolve(PUBLIC_DIR, OUTPUTS[kind]);
    if (writeHtml) writeFileSync(file.replace(/\.pdf$/, '.html'), html);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: file, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
    await page.close();
    console.log(`saved public/${OUTPUTS[kind]}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
