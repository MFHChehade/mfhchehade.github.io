// Generates public/apple-touch-icon.png (180x180): the site mark on an opaque
// white square, since iOS home-screen icons cannot be transparent.
// Run via: node scripts/make-apple-touch-icon.mjs (after scripts/make-logo.mjs).
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const mark = JSON.parse(await readFile(new URL("../src/data/logo-mark.json", import.meta.url), "utf8"));
const outPath = new URL("../public/apple-touch-icon.png", import.meta.url);

// The mark's ink spans about 55 of its 64 units; leave ~20% margin each side.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="-12 -12 88 88">
  <rect x="-12" y="-12" width="88" height="88" fill="#ffffff"/>
  <path d="${mark.tail}" fill="#bf5700" opacity="${mark.tailOpacity}"/>
  <g fill="none" stroke-width="${mark.stroke + 0.4}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${mark.ink}" stroke="#16181c"/>
    <path d="${mark.accent}" stroke="#bf5700"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath.pathname.replace(/^\/([A-Za-z]:)/, "$1"));

console.log("Wrote public/apple-touch-icon.png");
