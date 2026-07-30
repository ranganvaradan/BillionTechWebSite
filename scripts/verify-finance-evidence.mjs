/**
 * Capture hero/timeline evidence with stepped scroll + settle delays,
 * then exact pixel-diff the pairs. Exits 1 unless diffs are meaningful.
 *
 * CRITICAL: do not use locator.screenshot() for the hero while scrolled —
 * Playwright scrolls the element into view first, which resets parallax.
 * Use page.screenshot({ clip }) of the in-viewport bounding box instead.
 */
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', '.screenshots', 'finance-engagement');
mkdirSync(outDir, { recursive: true });

/** Exact RGBA pixel difference % via in-page canvas decode. */
async function exactPixelDiff(page, pathA, pathB) {
  const bufA = readFileSync(pathA);
  const bufB = readFileSync(pathB);
  const hashA = createHash('sha256').update(bufA).digest('hex');
  const hashB = createHash('sha256').update(bufB).digest('hex');
  if (hashA === hashB) {
    return {
      identical: true,
      percentDiff: 0,
      differingPixels: 0,
      totalPixels: 0,
      hashA,
      hashB,
      bytesA: bufA.length,
      bytesB: bufB.length,
    };
  }

  const result = await page.evaluate(
    async ({ a, b }) => {
      const load = (b64) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = `data:image/png;base64,${b64}`;
        });
      const imgA = await load(a);
      const imgB = await load(b);
      const w = Math.max(imgA.width, imgB.width);
      const h = Math.max(imgA.height, imgB.height);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(imgA, 0, 0);
      const dataA = ctx.getImageData(0, 0, w, h).data;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(imgB, 0, 0);
      const dataB = ctx.getImageData(0, 0, w, h).data;

      let differingPixels = 0;
      const totalPixels = w * h;
      for (let i = 0; i < dataA.length; i += 4) {
        if (
          dataA[i] !== dataB[i] ||
          dataA[i + 1] !== dataB[i + 1] ||
          dataA[i + 2] !== dataB[i + 2] ||
          dataA[i + 3] !== dataB[i + 3]
        ) {
          differingPixels++;
        }
      }
      return {
        percentDiff: Number(((differingPixels / totalPixels) * 100).toFixed(3)),
        differingPixels,
        totalPixels,
        width: w,
        height: h,
        sizeA: { w: imgA.width, h: imgA.height },
        sizeB: { w: imgB.width, h: imgB.height },
      };
    },
    { a: bufA.toString('base64'), b: bufB.toString('base64') },
  );

  return {
    identical: false,
    hashA,
    hashB,
    bytesA: bufA.length,
    bytesB: bufB.length,
    ...result,
  };
}

async function readParallaxTransforms(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-parallax-layer]')].map((el) => ({
      layer: el.getAttribute('data-parallax-layer'),
      transform: getComputedStyle(el).transform,
    })),
  );
}

async function readMilestoneOpacities(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-testid^="journey-milestone-"]')].map((el, i) => ({
      i,
      opacity: Number(getComputedStyle(el).opacity),
      y: el.getBoundingClientRect().top,
    })),
  );
}

/** Step scroll with settle so Framer Motion useScroll updates. */
async function scrollToY(page, y, { steps = 8, settleMs = 500 } = {}) {
  const current = await page.evaluate(() => window.scrollY);
  const delta = y - current;
  if (Math.abs(delta) < 1) {
    await page.waitForTimeout(settleMs);
    return;
  }
  for (let i = 1; i <= steps; i++) {
    const next = current + (delta * i) / steps;
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), next);
    await page.waitForTimeout(40);
  }
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await page.waitForTimeout(settleMs);
}

/**
 * Capture the money-flow hero WITHOUT scrolling it into view
 * (locator.screenshot would reset parallax). Requires the element to be
 * fully inside the viewport so before/after frames share identical dimensions.
 */
async function captureHeroInPlace(page, path) {
  const box = await page.locator('[data-testid="money-flow-hero"]').boundingBox();
  if (!box) throw new Error('money-flow-hero not found');
  const vw = 1440;
  const vh = 900;
  const eps = 1;
  if (box.x < -eps || box.y < -eps || box.x + box.width > vw + eps || box.y + box.height > vh + eps) {
    throw new Error(
      `Hero not fully in viewport for fair pixel compare: ${JSON.stringify(box)}`,
    );
  }
  const clip = {
    x: Math.floor(box.x),
    y: Math.floor(box.y),
    width: Math.floor(box.width),
    height: Math.floor(box.height),
  };
  if (clip.width < 80 || clip.height < 80) {
    throw new Error(`Hero clip too small: ${JSON.stringify(clip)}`);
  }
  await page.screenshot({ path, clip });
  return clip;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.goto('http://localhost:5173/platform/finance', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-testid="money-flow-hero"]');
await page.waitForTimeout(700);

// Freeze dash animation so pixel diffs reflect parallax, not stroke phase
await page.addStyleTag({
  content: `
    [data-testid="money-flow-hero"] * { animation: none !important; }
  `,
});

// ---- HERO: scroll 0 vs ~480 (sticky keeps diagram fully framed) ----
await scrollToY(page, 0, { settleMs: 500 });
const transformsAt0 = await readParallaxTransforms(page);
const hero0 = join(outDir, 'hero-scroll-0.png');
const clip0 = await captureHeroInPlace(page, hero0);

const heroScrollY = 480;
await scrollToY(page, heroScrollY, { steps: 14, settleMs: 650 });
const transformsAtScroll = await readParallaxTransforms(page);
const scrollYAtCapture = await page.evaluate(() => window.scrollY);
const heroScrolled = join(outDir, 'hero-scroll-520.png');
const clipScrolled = await captureHeroInPlace(page, heroScrolled);
await captureHeroInPlace(page, join(outDir, 'hero-scroll-220.png'));

// Same crop dimensions required for an honest pixel %
if (clip0.width !== clipScrolled.width || clip0.height !== clipScrolled.height) {
  throw new Error(
    `Hero clip size mismatch (not a fair compare): ${JSON.stringify({ clip0, clipScrolled })}`,
  );
}

// ---- TIMELINE: mid-reveal then full (same crop: #our-journey) ----
await page.goto('http://localhost:5173/platform/finance', { waitUntil: 'networkidle' });
await page.waitForSelector('#our-journey');
await page.waitForTimeout(500);
await scrollToY(page, 0, { settleMs: 300 });

const journeyMetrics = await page.evaluate(() => {
  const el = document.getElementById('our-journey');
  const milestones = [...document.querySelectorAll('[data-testid^="journey-milestone-"]')];
  return {
    top: el ? el.getBoundingClientRect().top + window.scrollY : 0,
    height: el?.offsetHeight ?? 0,
    milestoneOffsets: milestones.map((m) => {
      const r = m.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    }),
  };
});

const midScrollY = Math.max(0, journeyMetrics.top + 40);
await scrollToY(page, midScrollY, { steps: 10, settleMs: 800 });

let opacitiesPartial = await readMilestoneOpacities(page);
let visibleCount = opacitiesPartial.filter((o) => o.opacity > 0.5).length;

// Aim for 2–3 revealed milestones (not 0–1 and not all 5)
if (visibleCount < 2) {
  await scrollToY(page, midScrollY + 160, { steps: 6, settleMs: 700 });
  opacitiesPartial = await readMilestoneOpacities(page);
  visibleCount = opacitiesPartial.filter((o) => o.opacity > 0.5).length;
}
if (visibleCount >= 4) {
  await scrollToY(page, Math.max(0, midScrollY - 40), { steps: 6, settleMs: 700 });
  opacitiesPartial = await readMilestoneOpacities(page);
}

const timelinePartial = join(outDir, 'timeline-partial.png');
await page.locator('#our-journey').screenshot({ path: timelinePartial });

const endY = journeyMetrics.top + journeyMetrics.height - 200;
for (let y = midScrollY; y <= endY; y += 140) {
  await scrollToY(page, y, { steps: 3, settleMs: 180 });
}
await scrollToY(page, endY, { steps: 4, settleMs: 700 });

const opacitiesFull = await readMilestoneOpacities(page);
const timelineFull = join(outDir, 'timeline-full.png');
await page.locator('#our-journey').screenshot({ path: timelineFull });

const heroDiff = await exactPixelDiff(page, hero0, heroScrolled);
const timelineDiff = await exactPixelDiff(page, timelinePartial, timelineFull);

const parseTy = (t) => {
  if (!t || t === 'none') return 0;
  const m = t.match(/matrix\(([^)]+)\)/);
  if (!m) return 0;
  const parts = m[1].split(',').map((x) => Number(x.trim()));
  return parts[5] ?? 0;
};

const ty0 = Object.fromEntries(transformsAt0.map((t) => [t.layer, parseTy(t.transform)]));
const tyS = Object.fromEntries(transformsAtScroll.map((t) => [t.layer, parseTy(t.transform)]));
const layerDeltas = Object.fromEntries(
  Object.keys(ty0).map((k) => [k, Number((tyS[k] - ty0[k]).toFixed(2))]),
);

const report = {
  scrollYAtHeroCapture: scrollYAtCapture,
  heroScrollTarget: heroScrollY,
  clip0,
  clipScrolled,
  journeyMetrics,
  transformsAt0,
  transformsAtScroll,
  layerDeltas,
  opacitiesPartial,
  opacitiesFull,
  heroDiff,
  timelineDiff,
  outDir,
  pass: {
    heroTransformsDiffer: JSON.stringify(transformsAt0) !== JSON.stringify(transformsAtScroll),
    heroLayersMovedMeaningfully:
      Math.abs(layerDeltas.bg ?? 0) >= 40 && Math.abs(layerDeltas.marker ?? 0) >= 30,
    heroPixelDiffMeaningful: !heroDiff.identical && heroDiff.percentDiff >= 1,
    timelineNotByteIdentical: !timelineDiff.identical,
    timelinePixelDiffMeaningful: !timelineDiff.identical && timelineDiff.percentDiff >= 1,
    timelinePartialHasHiddenNodes: opacitiesPartial.some((o) => o.opacity < 0.5),
    timelinePartialNotAllVisible: opacitiesPartial.filter((o) => o.opacity > 0.5).length <= 3,
    timelineFullAllVisible: opacitiesFull.every((o) => o.opacity > 0.9),
  },
};

writeFileSync(join(outDir, 'diff-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();

const failed = Object.entries(report.pass).filter(([, v]) => !v);
if (failed.length) {
  console.error('EVIDENCE_FAIL', failed.map(([k]) => k));
  process.exit(1);
}
console.log('EVIDENCE_PASS');
