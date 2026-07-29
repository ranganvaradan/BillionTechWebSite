import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Products' }).hover();
await page.waitForTimeout(500);
const items = await page.locator('text=Flow P2P').count();
const badges = await page.getByText('LIVE · TTK Prestige').count();
const footer = await page.getByText('View All Products').isVisible();
await page.screenshot({ path: join(outDir, 'mega-menu-open.png') });
console.log(JSON.stringify({ items, badges, footer }, null, 2));
await browser.close();
