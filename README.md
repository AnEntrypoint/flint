# Flint (v0)

A Tinder-style swipe app for browsing random website/UI templates. Swipe right (or press the ♥ button, or the right arrow key) to accept a template — accepting shows your own links so people can find you. Swipe left to skip to the next random template.

## How it works

- A deck of website/UI template preview cards is shuffled on load.
- Swipe/drag a card right to accept, left to reject. Keyboard (arrow keys) and on-screen buttons work too.
- Accepting a template opens a summary screen showing the links you've entered (add/manage them via the 🔗 button in the header).
- Links and accepted-template history persist in `localStorage` for the current browser.

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
