# Flint (v0)

A Tinder-style swipe app for browsing random website/UI templates. Swipe right (or press the ♥ button, or the right arrow key) to accept a template — accepting shows your own links so people can find you. Swipe left to skip to the next random template.

## How it works

- A deck of website/UI template preview cards is shuffled on load, drawn from `src/templates-data.json` — 1194 real community templates harvested from all 13 categories of the [v0.dev template gallery](https://v0.app/templates/categories) (Apps & Games, Landing Pages, Dashboards, Components, Login & Sign Up, Blog & Portfolio, E-commerce, AI, Animations, Design Systems, Layouts, Website Templates, Agents).
- Swipe/drag a card right to accept, left to reject. Keyboard (arrow keys) and on-screen buttons work too.
- Accepting a template opens a summary screen showing the links you've entered (add/manage them via the 🔗 button in the header) plus a "View on v0.dev" link to the real template.
- Links and accepted-template history persist in `localStorage` for the current browser.
- Swiping through the entire deck shows a reshuffle option.

### Refreshing the template dataset

`src/templates-data.json` is a point-in-time snapshot — v0.dev has no public API for listing community templates, so it was harvested by scripting the `browser` verb (real Chrome via CDP) to visit each category page at `https://v0.app/templates/<category>`, click "Load More" repeatedly, and extract each card's real name, category, screenshot URL, and template link from the DOM. To refresh: repeat that harvest per category, merge + dedupe by template slug, and overwrite `src/templates-data.json` with the result (shape: `[{id, name, category, previewImageUrl, v0Url}, ...]`).

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` build the app and deploy it to GitHub Pages via `.github/workflows/deploy.yml`. Ensure the repo's **Settings → Pages → Source** is set to "GitHub Actions".
