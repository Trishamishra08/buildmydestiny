import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/** Convert these (used assets) to WebP, then remove originals */
const CONVERT = [
  // Website banners
  'frontend/public/website/banner_1.jpg',
  'frontend/public/website/banner_1_m.jpg',
  'frontend/public/website/banner_2.jpg',
  'frontend/public/website/banner_2_m.jpg',
  'frontend/public/website/banner_3.jpg',
  'frontend/public/website/banner_3_m.jpg',
  'frontend/public/website/promise-worker.jpg',
  'frontend/public/website/promise-worker-m.jpg',
  'frontend/public/website/why-worker-sunset.jpg',
  'frontend/public/website/dealer-worker.jpg',
  'frontend/public/website/audience-homeowners.jpg',
  'frontend/public/website/audience-contractors.jpg',
  'frontend/public/website/audience-builders.jpg',
  'frontend/public/website/audience-construction.jpg',
  'frontend/public/website/cement.jpg',
  'frontend/public/website/material-cement.jpg',
  // Cutouts (transparent PNGs)
  'frontend/public/website/cutout-bricks.png',
  'frontend/public/website/cutout-blocks.png',
  'frontend/public/website/cutout-cement.png',
  'frontend/public/website/cutout-steel.png',
  'frontend/public/website/cutout-sand.png',
  'frontend/public/website/cutout-pavers.png',
  'frontend/public/website/cutout-precast.png',
  'frontend/public/website/cutout-aggregates.png',
  'frontend/public/website/cutout-audience-homeowners.png',
  'frontend/public/website/cutout-audience-contractors.png',
  'frontend/public/website/cutout-audience-builders.png',
  'frontend/public/website/cutout-audience-construction.png',
];

/** Unused / duplicate large files — delete from disk */
const DELETE = [
  'frontend/public/website/material-steel.jpg',
  'frontend/public/website/steel.jpg',
  'frontend/public/website/blocks.jpg',
  'frontend/public/website/material-blocks.jpg',
  'frontend/public/website/bricks.jpg',
  'frontend/public/website/material-bricks.jpg',
  'frontend/public/website/hero-banner-main.jpg',
  'frontend/public/website/hero-banner-cement.jpg',
  'frontend/public/website/hero-banner-bricks.jpg',
  'frontend/public/website/hero-banner-steel.jpg',
  'frontend/public/website/hero-site.jpg',
  'frontend/public/website/hero-banner-design.jpg',
  'frontend/public/website/banner_design_sunset.jpg',
  'frontend/public/website/banner_2_ref.png',
  'frontend/public/website/banner_3_clean.jpg',
  'frontend/public/website/hero-reference.png',
  'frontend/public/website/promise-worker.png',
  'frontend/src/assets/images/banner2.png',
  'frontend/src/assets/images/banner3.png',
  'frontend/src/assets/images/ChatGPT Image May 28, 2026, 01_01_35 AM.png',
  'frontend/src/assets/images/ChatGPT Image May 28, 2026, 01_03_22 AM.png',
];

function fmt(n) {
  return `${(n / 1024).toFixed(0)} KB`;
}

async function convertOne(rel) {
  const input = path.join(root, rel);
  if (!fs.existsSync(input)) {
    console.log(`skip missing: ${rel}`);
    return { before: 0, after: 0 };
  }
  const before = fs.statSync(input).size;
  const out = input.replace(/\.(jpe?g|png)$/i, '.webp');
  const ext = path.extname(input).toLowerCase();
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).rotate();

  // Cap very large photos; keep cutouts sharper but smaller
  const isCutout = /cutout-/i.test(rel);
  const maxW = isCutout ? 900 : 1600;
  if (meta.width && meta.width > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  await pipeline
    .webp({
      quality: isCutout ? 82 : 75,
      alphaQuality: 90,
      effort: 4,
    })
    .toFile(out);

  const after = fs.statSync(out).size;
  fs.unlinkSync(input);
  console.log(`OK  ${rel}  ${fmt(before)} -> ${path.basename(out)} ${fmt(after)}`);
  return { before, after };
}

async function main() {
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const rel of CONVERT) {
    const r = await convertOne(rel);
    beforeTotal += r.before;
    afterTotal += r.after;
  }

  let deleted = 0;
  for (const rel of DELETE) {
    const p = path.join(root, rel);
    if (fs.existsSync(p)) {
      deleted += fs.statSync(p).size;
      fs.unlinkSync(p);
      console.log(`DEL ${rel}`);
    }
  }

  console.log('---');
  console.log(`Converted: ${fmt(beforeTotal)} -> ${fmt(afterTotal)} (saved ${fmt(beforeTotal - afterTotal)})`);
  console.log(`Deleted unused: ${fmt(deleted)}`);
  console.log(`Total freed (approx): ${fmt(beforeTotal - afterTotal + deleted)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
