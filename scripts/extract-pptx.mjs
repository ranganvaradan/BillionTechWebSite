import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pptxPath = path.join(__dirname, '..', 'docs', 'BillionTech_BigBasket_Proposal_v2.pptx');
const outPath = path.join(__dirname, '..', 'docs', '_extracted_bigbasket.txt');

const buf = fs.readFileSync(pptxPath);
const zip = await JSZip.loadAsync(buf);
const slideNames = Object.keys(zip.files)
  .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
  .sort((a, b) => Number(a.match(/slide(\d+)/)[1]) - Number(b.match(/slide(\d+)/)[1]));

const chunks = [];
for (const name of slideNames) {
  const xml = await zip.files[name].async('string');
  const texts = [...xml.matchAll(/<a:t[^>]*>([^<]*)<\/a:t>/g)].map((m) => m[1]).filter(Boolean);
  chunks.push(`=== ${name} ===\n${texts.join('\n')}`);
}
fs.writeFileSync(outPath, chunks.join('\n\n'), 'utf8');
console.log(`Wrote ${outPath} (${slideNames.length} slides)`);
