import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'precommit');
mkdirSync(outDir, { recursive: true });

const routes = [
  '/',
  '/products/flow-p2p',
  '/products/flow-o2c',
  '/products/scf',
  '/products/billiontech-lend',
  '/why-billiontech',
  '/who-we-serve',
  '/proof',
  '/about',
  '/contact',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const routeResults = [];
for (const route of routes) {
  const consoleErrors = [];
  const pageErrors = [];
  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  };
  const onPageError = (err) => pageErrors.push(String(err));
  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  const response = await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const status = response?.status() ?? 0;
  const title = await page.title();
  const h1 = (await page.locator('h1').first().textContent().catch(() => null))?.trim() ?? null;

  routeResults.push({
    route,
    status,
    title,
    h1,
    consoleErrors,
    pageErrors,
  });

  page.off('console', onConsole);
  page.off('pageerror', onPageError);
}

// Desktop screenshots — homepage sections
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.locator('#hero').screenshot({ path: join(outDir, 'd1440-home-hero.png') });
await page.locator('#hero').screenshot({ path: join(outDir, 'd1440-home-hero-fixed.png') });
await page.locator('#proof-strip').screenshot({ path: join(outDir, 'd1440-home-proof-strip.png') });
await page.locator('#products').screenshot({ path: join(outDir, 'd1440-home-products.png') });
await page.locator('#why').screenshot({ path: join(outDir, 'd1440-home-why.png') });
await page.locator('#proof').screenshot({ path: join(outDir, 'd1440-home-live-deployments.png') });

// P2P full + agents + workflow
await page.goto('http://localhost:5173/products/flow-p2p', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: join(outDir, 'd1440-p2p-full.png'), fullPage: true });
await page.locator('#ai-agents').screenshot({ path: join(outDir, 'd1440-p2p-agents.png') });
await page.locator('#how-it-works').screenshot({ path: join(outDir, 'd1440-p2p-workflow.png') });

// Mobile homepage + drawer + product page
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: join(outDir, 'm375-home.png'), fullPage: true });
await page.getByLabel('Open navigation menu').click();
await page.waitForTimeout(300);
await page.screenshot({ path: join(outDir, 'm375-home-drawer.png') });
await page.getByLabel('Close navigation menu').click();

await page.goto('http://localhost:5173/products/flow-o2c', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const overflow = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
}));
await page.screenshot({ path: join(outDir, 'm375-o2c-full.png'), fullPage: true });
await page.locator('#capabilities').screenshot({ path: join(outDir, 'm375-o2c-capabilities.png') });

// A11y keyboard / focus / orange body-text sweep
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(200);

const focusTrace = [];
for (let i = 0; i < 12; i++) {
  await page.keyboard.press('Tab');
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').slice(0, 80),
      href: el.getAttribute('href'),
      outline: cs.outline,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      outlineColor: cs.outlineColor,
      role: el.getAttribute('role'),
    };
  });
  focusTrace.push(info);
}

// Open mega menu via keyboard: find Products button and Enter
await page.getByRole('button', { name: 'Products' }).focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(200);
const megaOpen = await page.getByRole('menu').isVisible();
const megaItems = await page.getByRole('menuitem').count();
// Move pointer away so hover-open cannot immediately re-open after Escape
await page.mouse.move(0, 0);
await page.keyboard.press('Escape');
await page.getByRole('menu').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => null);
await page.waitForTimeout(100);
const megaClosed = !(await page.getByRole('menu').isVisible().catch(() => false));
const focusAfterEscape = await page.evaluate(() => {
  const el = document.activeElement;
  return el ? (el.innerText || el.getAttribute('aria-label') || '').slice(0, 40) : null;
});

// Orange-on-white small body text sweep
const orangeBodyHits = await page.evaluate(() => {
  const orangeLike = (c) => {
    const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return false;
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
    // approx #f97316 / #ea6c0a
    return r > 200 && g > 80 && g < 160 && b < 80;
  };
  const hits = [];
  document.querySelectorAll('p, span, li, a, button, h1, h2, h3, h4, h5, h6, label, div').forEach((el) => {
    const cs = getComputedStyle(el);
    const color = cs.color;
    if (!orangeLike(color)) return;
    const fontSize = parseFloat(cs.fontSize);
    const fontWeight = parseInt(cs.fontWeight, 10) || 400;
    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || '').trim().slice(0, 60);
    if (!text) return;
    hits.push({
      tag,
      fontSize,
      fontWeight,
      color,
      text,
      isSmallBody: fontSize < 14 && !['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a'].includes(tag),
    });
  });
  return hits.slice(0, 40);
});

console.log(
  JSON.stringify(
    {
      routeResults,
      overflow375O2C: overflow,
      focusTrace,
      megaOpen,
      megaItems,
      megaClosed,
      focusAfterEscape,
      orangeBodyHits,
      outDir,
    },
    null,
    2,
  ),
);

await browser.close();
