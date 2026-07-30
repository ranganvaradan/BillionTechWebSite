import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'finance-engagement');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => pageErrors.push(String(err)));

await page.goto('http://localhost:5173/platform/finance', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const title = await page.title();
const h1 = (await page.locator('h1').first().textContent())?.trim();

// Hero — capture via page clip (locator.screenshot scrolls into view and resets parallax)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
{
  const box = await page.locator('[data-testid="money-flow-hero"]').boundingBox();
  await page.screenshot({ path: join(outDir, 'hero-scroll-0.png'), clip: box });
}
await page.evaluate(async () => {
  for (const y of [80, 160, 240, 320, 380]) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 50));
  }
});
await page.waitForTimeout(500);
{
  const box = await page.locator('[data-testid="money-flow-hero"]').boundingBox();
  const clip = {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(box.width, 1440 - Math.max(0, box.x)),
    height: Math.min(box.height, 900 - Math.max(0, box.y)),
  };
  await page.screenshot({ path: join(outDir, 'hero-scroll-520.png'), clip });
  await page.screenshot({ path: join(outDir, 'hero-scroll-220.png'), clip });
}

// Stats — wait for count-up to finish
await page.locator('#finance-stats').scrollIntoViewIfNeeded();
await page.waitForTimeout(1400);
const statTexts = await page.locator('#finance-stats span, #finance-stats p').evaluateAll((els) =>
  els.map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 12),
);
await page.locator('#finance-stats').screenshot({ path: join(outDir, 'stats-counted.png') });

// Timeline — scroll to mid reveal
await page.locator('#our-journey').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
// Scroll so first nodes are in view mid-animation window
await page.evaluate(() => {
  const el = document.getElementById('our-journey');
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - 80);
  }
});
await page.waitForTimeout(200);
await page.screenshot({ path: join(outDir, 'timeline-partial.png'), fullPage: false });

// Fully reveal timeline by scrolling through
await page.evaluate(async () => {
  const el = document.getElementById('our-journey');
  if (!el) return;
  const start = el.getBoundingClientRect().top + window.scrollY - 100;
  const end = start + el.offsetHeight;
  for (let y = start; y < end; y += 120) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});
await page.waitForTimeout(500);
await page.locator('#our-journey').screenshot({ path: join(outDir, 'timeline-full.png') });

// Reduced motion check
const context2 = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
const page2 = await context2.newPage();
const rmErrors = [];
page2.on('pageerror', (err) => rmErrors.push(String(err)));
await page2.goto('http://localhost:5173/platform/finance', { waitUntil: 'networkidle' });
await page2.waitForTimeout(600);

// Stats should show final values immediately
await page2.locator('#finance-stats').scrollIntoViewIfNeeded();
await page2.waitForTimeout(200);
const reducedStatValues = await page2.locator('#finance-stats').innerText();

// Check no CSS animations running on flow lines (dash animation)
const animState = await page2.evaluate(() => {
  const lines = [...document.querySelectorAll('#finance-hero line')];
  return lines.map((l) => getComputedStyle(l).animationName);
});

await page2.locator('#finance-hero').screenshot({ path: join(outDir, 'reduced-motion-hero.png') });
await page2.locator('#our-journey').scrollIntoViewIfNeeded();
await page2.waitForTimeout(200);
await page2.locator('#our-journey').screenshot({ path: join(outDir, 'reduced-motion-timeline.png') });

// Confirm flow page untouched / still loads
await page.goto('http://localhost:5173/platform/flow', { waitUntil: 'networkidle' });
const flowH1 = (await page.locator('h1').first().textContent())?.trim();
const flowHasJourney = await page.locator('#our-journey').count();
const flowHasMoneyFlowCaption = await page.getByText('Illustrative money-flow path').count();

console.log(
  JSON.stringify(
    {
      title,
      h1,
      consoleErrors,
      pageErrors,
      statTexts,
      reducedStatValues: reducedStatValues.slice(0, 400),
      reducedMotionAnimNames: animState,
      rmErrors,
      flowH1,
      flowHasJourney,
      flowHasMoneyFlowCaption,
      outDir,
    },
    null,
    2,
  ),
);

await context2.close();
await browser.close();
