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

const results = {};

await page.goto('http://localhost:5173/why-billiontech', { waitUntil: 'networkidle' });
results.why = {
  h1: await page.locator('h1').textContent(),
  unplug: await page.getByText('The Unplug Test').first().isVisible(),
  ariba: await page.getByText('1/10th the cost of SAP Ariba').first().isVisible(),
  toggle: await page.getByRole('button', { name: /AI on/i }).isVisible(),
};
await page.getByRole('button', { name: /AI on/i }).click();
results.why.off = await page.getByRole('button', { name: /AI off/i }).isVisible();
await page.screenshot({ path: join(outDir, 'web6-why.png'), fullPage: true });

await page.goto('http://localhost:5173/who-we-serve', { waitUntil: 'networkidle' });
results.who = {
  h1: await page.locator('h1').textContent(),
  fmcg: await page.getByRole('heading', { name: 'FMCG & Manufacturers' }).isVisible(),
  nbfc: await page.getByRole('heading', { name: 'NBFCs & Banks' }).isVisible(),
  anchors: await page.getByRole('heading', { name: 'Corporate Anchors' }).isVisible(),
};
await page.screenshot({ path: join(outDir, 'web6-who.png'), fullPage: true });

await page.goto('http://localhost:5173/proof', { waitUntil: 'networkidle' });
results.proof = {
  h1: await page.locator('h1').textContent(),
  scale: await page.getByText('₹5,785 Cr').isVisible(),
  ttk: await page.getByRole('heading', { name: 'TTK Prestige', exact: true }).isVisible(),
  sundaram: await page.getByRole('heading', { name: 'Sundaram Finance', exact: true }).isVisible(),
};
await page.screenshot({ path: join(outDir, 'web6-proof.png'), fullPage: true });

await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
results.about = {
  h1: await page.locator('h1').textContent(),
  rangan: await page.getByRole('heading', { name: 'Rangan V', exact: true }).isVisible(),
  bala: await page.getByRole('heading', { name: 'Bala KV', exact: true }).isVisible(),
  soc2: await page.getByText('SOC 2 — certification in progress').isVisible(),
  email: await page.getByText('rangan@billiontech.ai').first().isVisible(),
};
await page.screenshot({ path: join(outDir, 'web6-about.png'), fullPage: true });

await page.goto('http://localhost:5173/contact?intent=demo', { waitUntil: 'networkidle' });
results.contact = {
  h1: await page.locator('h1').textContent(),
  formTitle: await page.getByRole('heading', { name: 'Request a Demo' }).isVisible(),
  nameField: await page.getByRole('textbox', { name: 'Name' }).isVisible(),
};
await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
await page.getByRole('textbox', { name: 'Company' }).fill('Acme');
await page.getByRole('textbox', { name: 'Business email' }).fill('test@acme.com');
await page.getByRole('textbox', { name: 'Phone' }).fill('+91 99999 99999');
await page.getByRole('combobox', { name: 'Product interest' }).click();
await page.getByRole('option', { name: 'Flow O2C' }).click();
await page.getByRole('combobox', { name: 'Company type' }).click();
await page.getByRole('option', { name: 'Manufacturer' }).click();
await page.getByRole('button', { name: 'Submit' }).click();
results.contact.success = await page.getByText('Thank you — we received your details.').isVisible();
await page.screenshot({ path: join(outDir, 'web6-contact.png'), fullPage: true });

console.log(JSON.stringify({ results, errors }, null, 2));
await browser.close();
