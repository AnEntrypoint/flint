# Flint (v0)

A Tinder-style swipe app for browsing random website/UI templates. Swipe right (or press the ♥ button, or the right arrow key) to accept a template — accepting shows your own links so people can find you. Swipe left to skip to the next random template.

## How it works

- A deck of website/UI template preview cards is shuffled on load, fetched **live at runtime** directly from the [v0.dev template gallery](https://v0.app/templates/categories) (Apps & Games, Landing Pages, Dashboards, Components, Login & Sign Up, Blog & Portfolio, E-commerce, AI, Animations, Design Systems, Layouts, Website Templates, Agents) — no scraped dataset is bundled with the app.
- Swipe/drag a card right to accept, left to reject. Keyboard (arrow keys) and on-screen buttons work too.
- Accepting a template opens a summary screen showing the links you've entered (add/manage them via the 🔗 button in the header) plus a "View on v0.dev" link to the real template.
- Links and accepted-template history persist in `localStorage` for the current browser.
- Swiping through the fetched deck triggers loading more templates from another category; a reshuffle-and-refetch option appears once everything fetched so far has been swiped.

### How the live fetch works

v0.dev has no public API for listing community templates, but its template gallery pages (`https://v0.app/templates/<category>`) are server-rendered and served with `Access-Control-Allow-Origin: *`, so the app can `fetch()` them directly from the browser at runtime. `src/templates.js` fetches one category's HTML, parses it client-side with `DOMParser` to pull each template card's real name, screenshot URL, and link, and fetches more categories lazily as the user swipes through what's loaded. Nothing is scraped ahead of time or checked into the repo — every session reflects whatever is actually on v0.dev right now.

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
