// Inline SVG ids (patterns, clip paths) must be unique per page, and a figure
// can appear more than once on the same page.
let counter = 0;

export const uid = (prefix: string) => `${prefix}-${++counter}`;
