// Build-time LaTeX: MathJax turns TeX into SVG paths when the site is built,
// so pages ship real TeX typesetting with no client-side script. Glyphs are
// filled with currentColor, so math follows the light/dark theme.
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// fontCache "none" inlines every glyph path, so there are no shared ids to
// collide when the same formula appears twice on a page.
const doc = mathjax.document("", {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: "none" }),
});

/** A typeset formula. Units are MathJax's: 1000 per em, baseline at y = 0. */
export type TexBox = {
  inner: string;
  minX: number;
  minY: number;
  width: number;
  height: number;
};

const cache = new Map<string, TexBox>();

export function texBox(src: string): TexBox {
  const hit = cache.get(src);
  if (hit) return hit;
  const container = doc.convert(src, { display: false });
  const svg = adaptor.firstChild(container) as Parameters<typeof adaptor.getAttribute>[0];
  const viewBox = adaptor.getAttribute(svg, "viewBox");
  const [minX, minY, width, height] = viewBox.split(/\s+/).map(Number);
  const box = { inner: adaptor.innerHTML(svg), minX, minY, width, height };
  cache.set(src, box);
  return box;
}

/** Width of a formula, in user units, when set at `size` px. */
export const texWidth = (src: string, size: number) => (texBox(src).width * size) / 1000;

const r = (n: number) => Math.round(n * 1000) / 1000;
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// TeX's x-height (0.431 em) is smaller than Source Sans 3's (~0.486 em), so
// inline math is scaled up to sit evenly with the surrounding text.
const INLINE_SCALE = 1.12;

/** Inline formula for HTML text, sized in em so it scales with the surrounding font. */
export function texInline(src: string): string {
  const b = texBox(src);
  const em = INLINE_SCALE / 1000;
  const depth = (b.minY + b.height) * em;
  return (
    `<svg class="tex-inline" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeAttr(src)}"` +
    ` viewBox="${b.minX} ${b.minY} ${b.width} ${b.height}"` +
    ` width="${r(b.width * em)}em" height="${r(b.height * em)}em"` +
    ` style="vertical-align:${r(-depth)}em">${b.inner}</svg>`
  );
}

/** Replace every $...$ in an HTML string with typeset TeX. Write a literal
    dollar sign as &#36; so it is not read as a delimiter. */
export const withTex = (html: string) => html.replace(/\$([^$]+)\$/g, (_, src: string) => texInline(src));
