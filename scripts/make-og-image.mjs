// Generates public/og-image.png (1200x630), the link-preview card, with the
// site mark from src/data/logo-mark.json. Run via: node scripts/make-og-image.mjs
// (after scripts/make-logo.mjs if the mark changed).
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const mark = JSON.parse(await readFile(new URL("../src/data/logo-mark.json", import.meta.url), "utf8"));
const outPath = new URL("../public/og-image.png", import.meta.url);

const INK = "#16181c";
const MUTED = "#5b626c";
const BURNT = "#bf5700";
const SANS = "'Segoe UI', 'Source Sans 3', -apple-system, Roboto, Arial, sans-serif";

const areas = ["Risk-aware learning", "Reliability and verification", "LLMs for constrained decisions", "Power systems"];

// The mark is drawn in a 64-unit box; at scale 5.2 it spans ~290px.
const markScale = 5.2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>

  <g font-family="${SANS}">
    <text x="80" y="150" font-weight="700" font-size="21" letter-spacing="3" fill="${BURNT}">UT AUSTIN · ECE</text>
    <text x="80" y="236" font-weight="600" font-size="72" fill="${INK}" letter-spacing="-1">Mohamad</text>
    <text x="80" y="318" font-weight="600" font-size="72" fill="${INK}" letter-spacing="-1">Chehade</text>
    <rect x="80" y="352" width="72" height="5" rx="2.5" fill="${BURNT}"/>
    <text x="80" y="408" font-weight="400" font-size="31" fill="#2b2f36">AI you can trust with</text>
    <text x="80" y="450" font-weight="400" font-size="31" fill="#2b2f36">consequential decisions.</text>
    <text x="80" y="510" font-weight="400" font-size="20" fill="${MUTED}">${areas.join("  ·  ")}</text>
  </g>

  <g transform="translate(${980 - 32 * markScale} ${280 - 32 * markScale}) scale(${markScale})">
    <path d="${mark.tail}" fill="${BURNT}" opacity="${mark.tailOpacity}"/>
    <g fill="none" stroke-width="${mark.stroke}" stroke-linecap="round" stroke-linejoin="round">
      <path d="${mark.ink}" stroke="${INK}"/>
      <path d="${mark.accent}" stroke="${BURNT}"/>
    </g>
  </g>

  <rect x="0" y="560" width="1200" height="70" fill="${INK}"/>
  <g font-family="${SANS}">
    <text x="80" y="604" font-weight="600" font-size="22" fill="#ffffff" letter-spacing="1">mohamadchehade.com</text>
    <text x="1120" y="604" text-anchor="end" font-weight="500" font-size="20" fill="#f0883e">Ph.D. Student</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath.pathname.replace(/^\/([A-Za-z]:)/, "$1"));

console.log("Wrote public/og-image.png");
