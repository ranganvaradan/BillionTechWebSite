import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);

// Sample button background
const ctaBg = await page.locator('a,button').filter({ hasText: 'Request a Demo' }).first().evaluate((el) => getComputedStyle(el).backgroundColor);
const logoVisible = await page.locator('img[alt="BillionTech"]').first().isVisible();
const headingFont = await page.locator('h1').first().evaluate((el) => getComputedStyle(el).fontFamily);

await page.screenshot({ path: join(outDir, 'theme-home.png'), fullPage: false });
await page.goto('http://localhost:5173/products/flow-p2p', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: join(outDir, 'theme-p2p.png'), fullPage: false });
await page.locator('#ai-agents').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'theme-p2p-agents.png') });
await page.getByRole('button', { name: 'Products' }).hover();
await page.waitForTimeout(300);
await page.screenshot({ path: join(outDir, 'theme-mega.png') });

console.log(JSON.stringify({ ctaBg, logoVisible, headingFont, errors }, null, 2));
await browser.close();
