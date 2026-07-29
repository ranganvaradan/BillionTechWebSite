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

await page.goto('http://localhost:5173/products/flow-o2c', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const checks = {
  h1: await page.locator('h1').first().textContent(),
  badge: await page.getByText('LIVE · TTK Prestige').first().isVisible(),
  interactionLayer: await page.getByRole('heading', { name: 'Interaction layer', exact: true }).isVisible(),
  problem: await page.getByText('Why order-to-cash still stalls').isVisible(),
  workflow: await page.getByRole('heading', { name: 'Virtual account payment' }).isVisible(),
  sixSteps: await page.getByRole('heading', { name: 'Visibility & reporting' }).isVisible(),
  capabilities: await page.getByRole('heading', { name: 'Invoice ingestion & ERP integration' }).isVisible(),
  deductions: await page.getByRole('heading', { name: 'Credit/debit notes & deductions' }).isVisible(),
  dealer: await page.getByRole('heading', { name: 'Downstream dealer & inventory management' }).isVisible(),
  ttk: await page.getByRole('heading', { name: 'TTK Prestige', exact: true }).isVisible(),
  before: await page.getByText('Before', { exact: true }).first().isVisible(),
  after: await page.getByText('After', { exact: true }).first().isVisible(),
  fte: await page.getByText('3–4 FTEs').isVisible(),
  fiveX: await page.getByText('5× the volume').isVisible(),
  cta: await page.getByRole('heading', { name: 'Ready to pilot Flow O2C?' }).isVisible(),
  noTodo: (await page.getByText('TODO — detailed content').count()) === 0,
  noAgents: (await page.getByText('Six AI agents').count()) === 0,
  noCompare: (await page.getByText('vs. SAP Ariba').count()) === 0,
};

await page.screenshot({ path: join(outDir, 'web3-o2c-full.png'), fullPage: true });
await page.locator('#proof').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web3-o2c-ttk.png') });
await page.locator('#how-it-works').scrollIntoViewIfNeeded();
await page.screenshot({ path: join(outDir, 'web3-o2c-workflow.png') });

// P2P still intact
await page.goto('http://localhost:5173/products/flow-p2p', { waitUntil: 'networkidle' });
const p2pOk = await page.getByText('Six AI agents').isVisible();

console.log(JSON.stringify({ checks, errors, p2pOk }, null, 2));
await browser.close();
