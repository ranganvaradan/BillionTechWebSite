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

await page.goto('http://localhost:5173/products/billiontech-lend', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const checks = {
  h1: await page.locator('h1').first().textContent(),
  badge: await page.getByText('RBI DLD 2025 Compliant').first().isVisible(),
  heroCallout: await page.getByRole('heading', { name: 'Your portfolio. Your model. Your advantage.' }).isVisible(),
  problem: await page.getByText('Why digital lending still stalls').isVisible(),
  layers: await page.getByText('Two layers, one product').isVisible(),
  los: await page.getByRole('heading', { name: 'LOS', exact: true }).isVisible(),
  aiLos: await page.getByRole('heading', { name: 'AI-LOS', exact: true }).isVisible(),
  foundation: await page.getByText('Foundation layer').isVisible(),
  intelligence: await page.getByText('Intelligence layer').first().isVisible(),
  riskTitle: await page.getByRole('heading', { name: 'AI-LOS risk score' }).isVisible(),
  score: await page.getByText('0.72', { exact: true }).isVisible(),
  refer: await page.getByText('Refer', { exact: true }).first().isVisible(),
  approve: await page.getByText('Approve', { exact: true }).first().isVisible(),
  decline: await page.getByText('Decline', { exact: true }).first().isVisible(),
  guardrail: await page.getByText('Human control').first().isVisible(),
  guardrailText: await page.getByText('AI-LOS analyses, scores, and drafts').isVisible(),
  kyc: await page.getByText('Aadhaar OTP, PAN, GSTIN').first().isVisible(),
  cta: await page.getByRole('heading', { name: 'Ready to pilot BillionTech Lend?' }).isVisible(),
  noTodo: (await page.getByText('TODO — detailed content').count()) === 0,
};

await page.screenshot({ path: join(outDir, 'web5-lend-full.png'), fullPage: true });
await page.locator('#layers').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web5-lend-layers.png') });
await page.locator('#risk-score').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web5-lend-risk.png') });

console.log(JSON.stringify({ checks, errors }, null, 2));
await browser.close();
