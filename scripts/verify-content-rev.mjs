/**
 * Content revision evidence: screenshots + route 200s.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'content-rev');
mkdirSync(outDir, { recursive: true });

const routes = [
  '/',
  '/platform/flow',
  '/platform/finance',
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
const consoleErrors = [];
const pageErrors = [];
const routeResults = [];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`${route}: ${msg.text()}`);
  });
  page.on('pageerror', (err) => pageErrors.push(`${route}: ${String(err)}`));
  const res = await page.goto(`http://localhost:5173${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(500);
  routeResults.push({ route, status: res?.status() ?? 0 });
  await page.close();
}

async function shot(route, file, fn) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:5173${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(700);
  await fn(page, join(outDir, file));
  await page.close();
}

await shot('/', 'homepage-hero.png', (p, f) => p.locator('#hero').screenshot({ path: f }));
await shot('/', 'homepage-who-we-work-with.png', (p, f) => p.locator('#trusted-by').screenshot({ path: f }));
await shot('/', 'footer-after.png', (p, f) => p.locator('footer').screenshot({ path: f }));
await shot('/platform/finance', 'finance-after-viewport.png', (p, f) => p.screenshot({ path: f, fullPage: false }));
await shot('/platform/finance', 'finance-journey.png', (p, f) => p.locator('#our-journey').screenshot({ path: f }));
await shot('/platform/finance', 'finance-after-full.png', (p, f) => p.screenshot({ path: f, fullPage: true }));
await shot('/why-billiontech', 'why-billiontech.png', (p, f) => p.screenshot({ path: f, fullPage: true }));
await shot('/proof', 'credentials.png', (p, f) => p.screenshot({ path: f, fullPage: true }));
await shot('/products/flow-p2p', 'p2p-product.png', (p, f) => p.screenshot({ path: f, fullPage: true }));

const report = {
  routeResults,
  consoleErrors,
  pageErrors,
  allRoutes200: routeResults.every((r) => r.status === 200),
  outDir,
};
writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (!report.allRoutes200 || consoleErrors.length || pageErrors.length) process.exit(1);
console.log('EVIDENCE_PASS');
