// Generates public/apple-touch-icon.png (180x180) from public/favicon.svg.
// Run via: node scripts/make-apple-touch-icon.mjs
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, "..", "public", "favicon.svg");
const outPath = join(__dirname, "..", "public", "apple-touch-icon.png");

const svg = await readFile(svgPath, "utf8");

await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("Wrote", outPath);
