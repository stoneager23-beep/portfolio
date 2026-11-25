#!/usr/bin/env node
/**
 * Capture screenshots of project live URLs into public/projects/.
 *
 * Reads src/data/projects.js and, for every project whose `screenshot` lives under
 * `projects/`, opens its `liveUrl` in a headless browser and saves a 1280x800 JPEG to
 * public/<screenshot>. Sleeping Streamlit Community Cloud apps are woken up first
 * (the script clicks "Yes, get this app back up!" and waits for the app to render).
 *
 * Projects without a liveUrl, or whose capture fails, get a branded placeholder
 * image - but only if no image exists yet, so real screenshots are never replaced.
 *
 * Playwright is NOT a project dependency. Install it without touching package.json:
 *   npm install --no-save playwright
 *   npx playwright install chromium
 * or skip the browser download and use one you already have:
 *   npm install --no-save playwright-core
 *   PW_CHANNEL=chrome node scripts/capture-screenshots.mjs      (or msedge)
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs                    all projects/ screenshots
 *   node scripts/capture-screenshots.mjs auroragpt mediguide-ai   only these ids
 *   node scripts/capture-screenshots.mjs --placeholders     only create missing placeholders
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';

const PUBLIC_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
const VIEWPORT = { width: 1280, height: 800 };
const APP_TIMEOUT_MS = 180_000; // a sleeping Streamlit app can take a minute or two to boot
const SETTLE_MS = 3_000; // let fonts, images and animations finish after "ready"

const args = process.argv.slice(2);
const placeholdersOnly = args.includes('--placeholders');
const onlyIds = args.filter((arg) => !arg.startsWith('--'));

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
      '  npm install --no-save playwright && npx playwright install chromium\n' +
      'or use an installed browser:\n' +
      '  npm install --no-save playwright-core && PW_CHANNEL=chrome node scripts/capture-screenshots.mjs',
  );
  process.exit(1);
}

const isStreamlit = (url) => new URL(url).hostname.endsWith('.streamlit.app');

/**
 * True when a Streamlit app shows rendered text and is idle. The "Running..." status widget
 * appears only after a short delay, so callers require this to hold on consecutive checks.
 */
const streamlitIdleWithContent = (frame) =>
  frame
    .evaluate(() => {
      // the app body only (not the header toolbar), across Streamlit versions
      const main =
        document.querySelector('[data-testid="stMainBlockContainer"]') ??
        document.querySelector('[data-testid="stMain"]') ??
        document.querySelector('.block-container');
      const running = document.querySelector('[data-testid="stStatusWidget"]');
      const loading = document.querySelector('[data-testid="stSkeleton"]');
      return Boolean(main) && !running && !loading && main.innerText.trim().length > 20;
    })
    .catch(() => false);

async function waitForStreamlit(page) {
  const deadline = Date.now() + APP_TIMEOUT_MS;
  let wokeUp = false;
  let idleChecks = 0;
  while (Date.now() < deadline) {
    const wakeButton = page.locator('[data-testid="wakeup-button-viewer"]');
    if (!wokeUp && (await wakeButton.isVisible().catch(() => false))) {
      console.log('  app is asleep, waking it up (this can take a minute)...');
      await wakeButton.click().catch(() => {});
      wokeUp = true;
    }
    let idle = false;
    for (const frame of page.frames()) {
      if (await streamlitIdleWithContent(frame)) idle = true;
    }
    idleChecks = idle ? idleChecks + 1 : 0;
    if (idleChecks >= 2) return true;
    await page.waitForTimeout(2_000);
  }
  return false;
}

async function captureStreamlit(page, url, file) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  if (!(await waitForStreamlit(page))) throw new Error('app did not finish loading in time');
  // The app is awake. Load it without the Streamlit Cloud wrapper (no "Hosted with Streamlit" badges).
  await page.goto(new URL('/~/+/', url).href, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  if (!(await waitForStreamlit(page))) throw new Error('app did not render without the wrapper');
  await page.waitForTimeout(SETTLE_MS);
  await page.screenshot({ path: file, type: 'jpeg', quality: 80 });
}

async function captureSite(page, url, file) {
  await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(SETTLE_MS);
  await page.screenshot({ path: file, type: 'jpeg', quality: 80 });
}

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Dark/gold card matching the site palette (src/index.css). */
async function writePlaceholder(page, project, file) {
  await page.setContent(`<!doctype html><html><head><style>
    body { margin: 0; width: ${VIEWPORT.width}px; height: ${VIEWPORT.height}px; display: grid; place-items: center;
      font-family: 'Segoe UI', system-ui, sans-serif; color: #e5e2e3; overflow: hidden;
      background: radial-gradient(circle at 72% 0%, rgba(36,221,255,.10), transparent 32rem),
        radial-gradient(circle at 12% 90%, rgba(212,175,55,.12), transparent 30rem), #0a0a0b; }
    .grid { position: absolute; inset: 0; opacity: .5;
      background-image: linear-gradient(rgba(212,175,55,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212,175,55,.06) 1px, transparent 1px); background-size: 64px 64px; }
    .card { position: relative; text-align: center; padding: 0 80px; }
    .label { color: #f2ca50; font-size: 20px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; }
    h1 { font-size: 76px; line-height: 1.05; margin: 28px 0; font-weight: 800; }
    .tags { color: #a2e7ff; font-size: 24px; letter-spacing: .08em; }
    .note { margin-top: 48px; color: #9ca3af; font-size: 20px; letter-spacing: .2em; text-transform: uppercase; }
  </style></head><body><div class="grid"></div><div class="card">
    <div class="label">${escapeHtml(project.category)}</div>
    <h1>${escapeHtml(project.title)}</h1>
    <div class="tags">${project.tags.map(escapeHtml).join('&nbsp;&nbsp;/&nbsp;&nbsp;')}</div>
    <div class="note">Screenshot coming soon</div>
  </div></body></html>`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 85 });
}

async function main() {
  const targets = projects.filter(
    (p) => p.screenshot.startsWith('projects/') && (onlyIds.length === 0 || onlyIds.includes(p.id)),
  );
  const unknown = onlyIds.filter((id) => !projects.some((p) => p.id === id));
  if (unknown.length) console.warn(`Unknown project id(s): ${unknown.join(', ')}`);
  if (!targets.length) {
    console.log('Nothing to do: no matching projects with a screenshot under projects/.');
    return;
  }

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
  const failures = [];

  for (const project of targets) {
    const file = resolve(PUBLIC_DIR, project.screenshot);
    mkdirSync(dirname(file), { recursive: true });
    const page = await browser.newPage({ viewport: VIEWPORT });
    try {
      if (!placeholdersOnly && project.liveUrl) {
        console.log(`> ${project.id}: capturing ${project.liveUrl}`);
        try {
          await (isStreamlit(project.liveUrl) ? captureStreamlit : captureSite)(page, project.liveUrl, file);
          console.log(`  saved public/${project.screenshot}`);
          continue;
        } catch (error) {
          failures.push(project.id);
          console.warn(`  capture failed: ${error.message}`);
        }
      }
      if (existsSync(file)) {
        console.log(`> ${project.id}: keeping existing public/${project.screenshot}`);
      } else {
        await writePlaceholder(page, project, file);
        console.log(`> ${project.id}: wrote placeholder public/${project.screenshot}`);
      }
    } finally {
      await page.close();
    }
  }

  await browser.close();
  if (failures.length) {
    console.warn(`\nCould not capture: ${failures.join(', ')}. Re-run later with those ids.`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
