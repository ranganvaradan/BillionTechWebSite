/**
 * WEB-12B evidence: Flow persona tabs + homepage trusted-by band.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'flow-engagement');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => pageErrors.push(String(err)));

// ---- Homepage ----
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const homeTitle = await page.title();
await page.locator('#trusted-by').screenshot({ path: join(outDir, 'homepage-trusted-by.png') });
const trustedNames = await page.locator('#trusted-by').innerText();

// ---- Flow platform ----
await page.goto('http://localhost:5173/platform/flow', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const flowH1 = (await page.locator('h1').first().textContent())?.trim();
await page.locator('#by-persona').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);

const tabLabels = await page.locator('#persona-views [role="tab"]').allTextContents();

for (const [i, name] of ['procurement', 'finance', 'distributor-ops'].entries()) {
  await page.locator('#persona-views [role="tab"]').nth(i).click();
  await page.waitForTimeout(350);
  await page.locator('#by-persona').screenshot({
    path: join(outDir, `persona-tab-${name}.png`),
  });
}

// Mockup caption legibility — capture RFQ frame caption on procurement tab
await page.locator('#persona-views [role="tab"]').first().click();
await page.waitForTimeout(300);
const captions = await page.locator('#by-persona').evaluate((el) => {
  const texts = [...el.querySelectorAll('p, span, div')].map((n) => n.textContent?.trim() ?? '');
  return [...new Set(texts.filter((t) => /Illustrative interface|Conceptual view/i.test(t)))];
});
const captionEl = page.getByText('Illustrative interface', { exact: true }).first();
await captionEl.scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
// Capture parent mockup frame
const mockupBox = await captionEl.evaluateHandle((el) => el.closest('[class]')?.parentElement ?? el.parentElement);
const handle = mockupBox.asElement();
if (handle) {
  await handle.screenshot({ path: join(outDir, 'mockup-illustrative-label.png') });
} else {
  await page.locator('#by-persona').screenshot({ path: join(outDir, 'mockup-illustrative-label.png') });
}

const report = {
  homeTitle,
  trustedNames: trustedNames.replace(/\s+/g, ' ').trim(),
  flowH1,
  tabLabels,
  captions,
  consoleErrors,
  pageErrors,
  outDir,
  pass: {
    hasTrustedBand: trustedNames.includes('TTK Prestige') && trustedNames.includes('TATA Capital'),
    threeTabs: tabLabels.length === 3,
    hasIllustrativeLabel: captions.some((c) => /Illustrative interface/i.test(c)),
    noConsoleErrors: consoleErrors.length === 0,
    noPageErrors: pageErrors.length === 0,
  },
};

writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();

const failed = Object.entries(report.pass).filter(([, v]) => !v);
if (failed.length) {
  console.error('EVIDENCE_FAIL', failed.map(([k]) => k));
  process.exit(1);
}
console.log('EVIDENCE_PASS');
