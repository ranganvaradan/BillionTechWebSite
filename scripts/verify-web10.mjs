import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'web10');
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
  await page.waitForTimeout(350);
  routeResults.push({
    route,
    status: response?.status() ?? 0,
    title: await page.title(),
    h1: (await page.locator('h1').first().textContent().catch(() => null))?.trim() ?? null,
    consoleErrors,
    pageErrors,
  });

  page.off('console', onConsole);
  page.off('pageerror', onPageError);
}

// Screenshots
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.locator('#hero').screenshot({ path: join(outDir, 'd1440-hero-grouped.png') });
await page.locator('#products').screenshot({ path: join(outDir, 'd1440-home-platforms.png') });

await page.getByRole('button', { name: 'Products' }).hover();
await page.waitForTimeout(300);
await page.locator('[role="menu"]').screenshot({ path: join(outDir, 'd1440-mega-menu.png') });

// a11y smoke: Escape still closes
await page.mouse.move(0, 0);
await page.getByRole('button', { name: 'Products' }).focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(200);
const megaOpen = await page.getByRole('menu').isVisible();
const megaItems = await page.getByRole('menuitem').count();
await page.keyboard.press('Escape');
await page.getByRole('menu').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => null);
const megaClosed = !(await page.getByRole('menu').isVisible().catch(() => false));

await page.goto('http://localhost:5173/platform/flow', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: join(outDir, 'd1440-platform-flow.png'), fullPage: true });

await page.goto('http://localhost:5173/platform/finance', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: join(outDir, 'd1440-platform-finance.png'), fullPage: true });

console.log(
  JSON.stringify(
    {
      routeResults,
      megaOpen,
      megaItems,
      megaClosed,
      outDir,
    },
    null,
    2,
  ),
);

await browser.close();
