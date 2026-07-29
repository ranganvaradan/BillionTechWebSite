import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots');
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
];

const routes = ['/', '/products/flow-p2p', '/why-billiontech', '/contact', '/about'];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const report = [];

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  for (const route of routes) {
    const errors = [];
    page.removeAllListeners('pageerror');
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        overflowX: doc.scrollWidth > doc.clientWidth + 2,
      };
    });

    const h1 = await page.locator('h1').count();
    const main = await page.locator('main#main-content').count();
    const skip = await page.locator('a[href="#main-content"]').count();
    const title = await page.title();

    if (route === '/' && vp.name === '375') {
      await page.getByLabel('Open navigation menu').click();
      await page.waitForTimeout(200);
      const drawer = await page.getByLabel('Close navigation menu').isVisible();
      report.push({ vp: vp.name, route, drawer });
      await page.getByLabel('Close navigation menu').click();
    }

    if (route === '/' && vp.name === '1440') {
      await page.keyboard.press('Tab');
      const skipFocused = await page.evaluate(
        () => document.activeElement?.getAttribute('href') === '#main-content',
      );
      report.push({ vp: vp.name, route, skipFocused, title });
    }

    report.push({
      vp: vp.name,
      route,
      h1,
      main,
      skip,
      titleOk: title.includes('BillionTech'),
      overflowX: overflow.overflowX,
      errors,
    });

    if (route === '/' || route === '/products/flow-p2p') {
      await page.screenshot({
        path: join(outDir, `web7-${vp.name}${route === '/' ? '-home' : '-p2p'}.png`),
      });
    }
  }
}

// SEO check on product page
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/products/scf', { waitUntil: 'networkidle' });
const seo = {
  title: await page.title(),
  description: await page.locator('meta[name="description"]').getAttribute('content'),
  canonical: await page.locator('link[rel="canonical"]').getAttribute('href'),
  ogTitle: await page.locator('meta[property="og:title"]').getAttribute('content'),
};

console.log(JSON.stringify({ report, seo }, null, 2));
await browser.close();
