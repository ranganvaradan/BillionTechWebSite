import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots');
mkdirSync(outDir, { recursive: true });

const base = 'http://localhost:5173';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto(`${base}/products/flow-p2p`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const checks = {
  h1: await page.locator('h1').first().textContent(),
  badge: await page.getByText('3 Paying Pilots').first().isVisible(),
  jobWorkHero: await page.getByText('Signature differentiator').isVisible(),
  problem: await page.getByText('Why procure-to-pay still stalls').isVisible(),
  workflow: await page.getByText('How it works').first().isVisible(),
  stepPayment: await page.getByText('Payment').nth(0).isVisible(),
  capabilities: await page.getByText('Capabilities').first().isVisible(),
  agentsHeading: await page.getByText('Six AI agents').isVisible(),
  rfqAgent: await page.getByRole('heading', { name: 'RFQ Agent' }).isVisible(),
  traceAgent: await page.getByRole('heading', { name: 'Traceability Agent' }).isVisible(),
  guardrail: await page.getByText('Human control').first().isVisible(),
  proof: await page.getByRole('heading', { name: '3 Paying P2P Pilots' }).isVisible(),
  reported: await page.getByText('reported', { exact: false }).first().isVisible(),
  compare: await page.getByText('vs. SAP Ariba, Zycus Merlin, Coupa').isVisible(),
  jobWorkRow: await page.getByRole('cell', { name: 'Job-work / sub-contractor traceability' }).isVisible(),
  cta: await page.getByText('Ready to pilot Flow P2P?').isVisible(),
  noTodo: !(await page.getByText('TODO — detailed content').count()),
};

await page.screenshot({ path: join(outDir, 'web2-p2p-full.png'), fullPage: true });
await page.locator('#ai-agents').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web2-p2p-agents.png') });
await page.locator('#compare').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web2-p2p-compare.png') });

// Other product pages still placeholder
await page.goto(`${base}/products/flow-o2c`, { waitUntil: 'networkidle' });
const o2cPlaceholder = await page.getByText('page content coming next').isVisible();

console.log(JSON.stringify({ checks, errors, o2cPlaceholder }, null, 2));
await browser.close();
