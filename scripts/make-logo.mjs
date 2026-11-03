// Draws the site mark: a capital M traced by a two-peaked probability density,
// with the right tail (the risk region) stroked in burnt orange over a faint
// orange tint. Writes
//   src/data/logo-mark.json  path data used by the header/footer mark, OG image, touch icon
//   public/favicon.svg       heavier stroke, no tint, cropped, with a dark-scheme palette
// Run via: node scripts/make-logo.mjs
import { writeFile } from "node:fs/promises";

// Geometry in a 64x64 box. Two generalized-normal bumps (shape p) at mu,
// scaled so the peaks reach `top`; the tail starts at x = v.
const G = { mu: [21, 43], sd: 4.9, p: 1.75, v: 45.5, top: 10.5, base: 53.5, ends: [7, 57] };

const bump = (x) => G.mu.reduce((a, m) => a + Math.exp(-(Math.abs((x - m) / G.sd) ** G.p) / 2), 0);
let fmax = 0;
for (let x = G.ends[0]; x <= G.ends[1]; x += 0.01) fmax = Math.max(fmax, bump(x));
// Subtract the density at the ends so both feet land exactly on the baseline.
const fmin = Math.min(bump(G.ends[0]), bump(G.ends[1]));
const y = (x) => G.base - (G.base - G.top) * (bump(x) - fmin) / (fmax - fmin);

// Sample every ~1.4 units of arc length, always keeping the peaks and the tail start.
function sample(x0, x1, every = 1.4) {
  const keep = [...G.mu, G.v].filter((k) => k > x0 && k < x1);
  const pts = [[x0, y(x0)]];
  const dx = 0.002;
  let run = 0;
  for (let x = x0 + dx; x < x1 - dx / 2; x += dx) {
    run += Math.hypot(dx, y(x) - y(x - dx));
    const forced = keep.some((k) => Math.abs(k - x) < dx / 2);
    if (forced || run >= every) {
      pts.push([forced ? keep.find((k) => Math.abs(k - x) < dx / 2) : x, y(x)]);
      run = 0;
    }
  }
  if (x1 - pts[pts.length - 1][0] < 0.5) pts.pop();
  pts.push([x1, y(x1)]);
  return pts;
}

// Catmull-Rom through the samples, as cubic Bezier segments.
const f = (n) => (Math.round(n * 100) / 100).toString();
function curve(pts, move = true) {
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

const [x0, x1] = G.ends;
const head = sample(x0, G.v);
const tail = sample(G.v, x1);
const mark = {
  viewBox: "0 0 64 64",
  // Stroked: the body of the curve plus the baseline up to the tail.
  ink: `${curve(head)}M${f(x0)} ${f(G.base)}H${f(G.v)}`,
  // Stroked: the tail of the curve plus its stretch of baseline.
  accent: `${curve(tail)}M${f(G.v)} ${f(G.base)}H${f(x1)}`,
  // Filled at low opacity: the area under the tail.
  tail: `M${f(G.v)} ${f(G.base)}V${f(y(G.v))}${curve(tail, false)}Z`,
  tailOpacity: 0.18,
  stroke: 4.9,
};

await writeFile(new URL("../src/data/logo-mark.json", import.meta.url), JSON.stringify(mark, null, 2) + "\n");

// At 16px the tint is invisible and a thin stroke smears, so the favicon drops
// the tint, thickens the line, and crops to the mark.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="3.5 3.5 57 57">
  <style>
    .i { stroke: #16181c; } .a { stroke: #bf5700; }
    @media (prefers-color-scheme: dark) { .i { stroke: #e8eaed; } .a { stroke: #f0883e; } }
  </style>
  <g fill="none" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round">
    <path class="i" d="${mark.ink}"/>
    <path class="a" d="${mark.accent}"/>
  </g>
</svg>
`;
await writeFile(new URL("../public/favicon.svg", import.meta.url), favicon);

console.log("Wrote src/data/logo-mark.json and public/favicon.svg", `(${head.length + tail.length} samples)`);
