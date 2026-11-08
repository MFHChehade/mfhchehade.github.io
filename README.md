# Mohamad Chehade Personal Website

Astro source for [www.mohamadchehade.com](https://www.mohamadchehade.com) (GitHub Pages, custom domain in `public/CNAME`).

Publications, their figures and BibTeX live in `src/data/research.ts`; each paper's `cite` record feeds the BibTeX block and the Google Scholar meta tags on its page.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The site deploys to GitHub Pages through `.github/workflows/deploy.yml` when changes land on `main`.
