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

await page.goto('http://localhost:5173/products/scf', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const checks = {
  h1: await page.locator('h1').first().textContent(),
  badge: await page.getByText('LIVE · 3 BFSI Anchors').first().isVisible(),
  financierNeutral: await page.getByRole('heading', { name: 'Financier-neutral · multi-anchor', exact: true }).isVisible(),
  problem: await page.getByText('Why channel finance still under-serves distributors').isVisible(),
  market: await page.getByText('The market opportunity').isVisible(),
  marketStat: await page.getByText('₹20L Cr+').isVisible(),
  msme: await page.getByText('63M+').isVisible(),
  workflow: await page.getByRole('heading', { name: 'Digital onboarding' }).isVisible(),
  repayment: await page.getByRole('heading', { name: 'Repayment & closure' }).isVisible(),
  sundaram: await page.getByRole('heading', { name: 'Sundaram Finance', exact: true }).isVisible(),
  exclusive: await page.getByText('Exclusive partner').first().isVisible(),
  programmes: await page.getByText('Corporate programmes').first().isVisible(),
  icici: await page.getByRole('heading', { name: 'ICICI Bank', exact: true }).isVisible(),
  tata: await page.getByRole('heading', { name: 'TATA Capital', exact: true }).isVisible(),
  cta: await page.getByRole('heading', { name: 'Ready to scope an SCF programme?' }).isVisible(),
  noTodo: (await page.getByText('TODO — detailed content').count()) === 0,
};

await page.screenshot({ path: join(outDir, 'web4-scf-full.png'), fullPage: true });
await page.locator('#market').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web4-scf-market.png') });
await page.locator('#partners').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web4-scf-partners.png') });

console.log(JSON.stringify({ checks, errors }, null, 2));
await browser.close();
