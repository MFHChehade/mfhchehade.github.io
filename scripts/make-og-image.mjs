// Generates public/og-image.png (1200x630) from a hand-built SVG matching the
// site's burnt-orange palette. Run via: node scripts/make-og-image.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "og-image.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffaf2"/>
      <stop offset="100%" stop-color="#f3efe7"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e2701a"/>
      <stop offset="100%" stop-color="#9a4709"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c25e10"/>
      <stop offset="100%" stop-color="#c25e1000"/>
    </linearGradient>
    <radialGradient id="aura" cx="0.85" cy="0.15" r="0.7">
      <stop offset="0%" stop-color="#c25e1022"/>
      <stop offset="100%" stop-color="#c25e1000"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#aura)"/>

  <!-- Left column: brand + name -->
  <g transform="translate(80, 110)">
    <rect x="0" y="0" width="148" height="148" rx="28" fill="url(#mark)"/>
    <text x="74" y="100" text-anchor="middle"
          font-family="Inter, -apple-system, 'Segoe UI', system-ui, sans-serif"
          font-weight="800" font-size="78" fill="#ffffff" letter-spacing="-2">MC</text>

    <text x="0" y="232"
          font-family="Inter, -apple-system, 'Segoe UI', system-ui, sans-serif"
          font-weight="700" font-size="22" fill="#9a4709" letter-spacing="3">
      UT AUSTIN ECE
    </text>
    <text x="0" y="312"
          font-family="Georgia, 'Times New Roman', serif"
          font-weight="700" font-size="86" fill="#1b1f24" letter-spacing="-1.5">
      Mohamad Chehade
    </text>
    <rect x="0" y="346" width="280" height="6" fill="url(#rule)" rx="3"/>
    <text x="0" y="408"
          font-family="Georgia, 'Times New Roman', serif"
          font-weight="500" font-size="34" fill="#2b333d">
      Reliable machine learning
    </text>
    <text x="0" y="454"
          font-family="Georgia, 'Times New Roman', serif"
          font-weight="500" font-size="34" fill="#2b333d">
      for risk, constraints, and decisions.
    </text>
  </g>

  <!-- Right column: research chips -->
  <g transform="translate(720, 110)" font-family="Inter, -apple-system, 'Segoe UI', system-ui, sans-serif">
    <text x="0" y="0" font-weight="700" font-size="20" fill="#5c6773" letter-spacing="2">
      RESEARCH AREAS
    </text>

    <g transform="translate(0, 40)">
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#ffffff" stroke="#e6e1d7" stroke-width="1.5"/>
      <text x="24" y="38" font-weight="600" font-size="22" fill="#1b1f24">Risk-aware learning</text>
    </g>

    <g transform="translate(0, 116)">
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#ffffff" stroke="#e6e1d7" stroke-width="1.5"/>
      <text x="24" y="38" font-weight="600" font-size="22" fill="#1b1f24">LLM alignment</text>
    </g>

    <g transform="translate(0, 192)">
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#ffffff" stroke="#e6e1d7" stroke-width="1.5"/>
      <text x="24" y="38" font-weight="600" font-size="22" fill="#1b1f24">Neural network verification</text>
    </g>

    <g transform="translate(0, 268)">
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#ffffff" stroke="#e6e1d7" stroke-width="1.5"/>
      <text x="24" y="38" font-weight="600" font-size="22" fill="#1b1f24">Power systems</text>
    </g>
  </g>

  <!-- Bottom URL bar -->
  <g transform="translate(0, 560)">
    <rect x="0" y="0" width="1200" height="70" fill="#1b1f24"/>
    <text x="80" y="45" font-family="Inter, -apple-system, 'Segoe UI', system-ui, sans-serif"
          font-weight="600" font-size="22" fill="#ffffff" letter-spacing="1.5">
      mohamadchehade.com
    </text>
    <text x="1120" y="45" text-anchor="end"
          font-family="Inter, -apple-system, 'Segoe UI', system-ui, sans-serif"
          font-weight="500" font-size="20" fill="#c25e10">
      PhD Student · 2026
    </text>
  </g>
</svg>`;

await writeFile(new URL("../public/og-image-source.svg", import.meta.url), svg, "utf8").catch(() => {});

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("Wrote", outPath);
