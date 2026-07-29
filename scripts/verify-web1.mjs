import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots');
mkdirSync(outDir, { recursive: true });

const base = process.env.BASE_URL || 'http://localhost:5173';
const routes = [
  { path: '/', name: 'home' },
  { path: '/products/flow-p2p', name: 'product-flow-p2p' },
  { path: '/products/flow-o2c', name: 'product-flow-o2c' },
  { path: '/products/scf', name: 'product-scf' },
  { path: '/products/billiontech-lend', name: 'product-lend' },
  { path: '/why-billiontech', name: 'why' },
  { path: '/who-we-serve', name: 'who' },
  { path: '/proof', name: 'proof' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const results = [];

for (const route of routes) {
  const url = `${base}${route.path}`;
  const errors = [];
  page.removeAllListeners('pageerror');
  page.on('pageerror', (err) => errors.push(String(err)));

  const response = await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const status = response?.status() ?? 0;
  const title = await page.title();
  const h1 = await page.locator('h1').first().textContent().catch(() => null);
  const hasHeader = await page.locator('header, .MuiAppBar-root').count();
  const hasFooter = await page.locator('footer').count();

  const shotPath = join(outDir, `${route.name}.png`);
  await page.screenshot({ path: shotPath, fullPage: route.name === 'home' || route.name === 'product-flow-p2p' });

  results.push({
    route: route.path,
    status,
    title,
    h1: h1?.trim(),
    hasHeader: hasHeader > 0,
    hasFooter: hasFooter > 0,
    pageErrors: errors,
    screenshot: shotPath,
  });
}

// Mega menu interaction on homepage
await page.goto(`${base}/`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Products' }).click();
await page.waitForTimeout(300);
const megaVisible = await page.getByText('Explore the complete BillionTech platform').isVisible();
await page.screenshot({ path: join(outDir, 'mega-menu.png') });

// Mobile drawer
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${base}/`, { waitUntil: 'networkidle' });
await page.getByLabel('Open navigation menu').click();
await page.waitForTimeout(300);
const drawerVisible = await page.getByLabel('Close navigation menu').isVisible();
await page.screenshot({ path: join(outDir, 'mobile-drawer.png') });

await browser.close();

console.log(JSON.stringify({ results, megaVisible, drawerVisible }, null, 2));
