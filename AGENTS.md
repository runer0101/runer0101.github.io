# Code Review Rules

## Files

HTML carries structure only. CSS is split by responsibility and loaded in this order, which is the
cascade order:

- `css/tokens.css` — every colour, radius and shadow as a custom property, including the
  `[data-theme="light"]` overrides. A component never names a colour directly; if a value needs to
  change with the theme it becomes a token first.
- `css/base.css` — reset, typography, reveal animation, scrollbar.
- `css/layout.css` — header, navigation, hero, section shells, footer.
- `css/components.css` — cards, buttons, grids, certificate actions.
- `css/responsive.css` — media queries and `prefers-reduced-motion`, loaded last.
- `css/print.css` — print only.

JavaScript is ES modules with one concern each, behind `js/main.js`:

- `js/storage.js` — guarded `localStorage`.
- `js/i18n.js` — language state, every `data-es`/`data-en` swap, emits changes.
- `js/nav.js` — menu, header scroll state, active section.
- `js/reveal.js` — scroll reveal.
- `js/theme.js` — dark/light control; the attribute itself is set before first paint by the inline
  script in `<head>`.
- `js/main.js` — entry point.

Because these are modules, the site must be served over HTTP (`python3 -m http.server`); opening the
file directly no longer runs the scripts.

## HTML

- Use semantic HTML5 elements.
- Strings that differ between Spanish and English carry both `data-es` and `data-en`; strings that are
  identical in both (proper nouns, brand names, technology names) are not violations. The Spanish
  text is the default inner text so the page is correct without JavaScript.
- `title`, `meta description` and the Open Graph/Twitter tags carry their text in
  `data-es-content` / `data-en-content`.
- Sections use `class="reveal"`; children grids use `reveal-children`.
- Vanilla only, no frameworks, no build step.

## CSS

- Use CSS custom properties from `:root`.
- Two themes from the same tokens: dark (`--accent` #00ff88) and light (`--accent` #00804a). Any
  new colour is added to both blocks of `css/tokens.css`.
- Mobile-first responsive design; prefer `rem` units for typography.
- Content must stay readable without JavaScript: hiding for the reveal animation is scoped to
  `.js .reveal`, never to `.reveal` alone.
- Honour `prefers-reduced-motion: reduce`.

## JavaScript

- `"use strict"` inside an IIFE; no globals.
- ES5-style syntax (`var`, function expressions) with modern DOM APIs: `IntersectionObserver` and
  `NodeList.forEach` are required, so the target is current evergreen browsers.
- Wrap `localStorage` access in `try/catch`; the page must work when storage is blocked.
- Persist preferences in `localStorage`; use `IntersectionObserver` for scroll effects.

## Assets

- Technology icons are self-hosted under `icons/` and referenced as `icons/<name>.svg`. Add a new
  file there instead of hotlinking a CDN.
- Certificate files use lowercase kebab-case names that describe the document:
  `<topic>-<issuer>.<ext>`. No spaces, UUIDs or personal email in a file name.
- A card is a container with two explicit actions, never a single wrapping link (an `<a>` inside
  an `<a>` is invalid): "Ver certificado" opens the PNG render, "Descargar PDF" downloads the
  document with the `download` attribute. Page formats differ (A4 portrait, letter landscape,
  930×630), so the PDF is never the thing that opens in the browser.
- Render with `pdftoppm -png -scale-to 1400 <src>.pdf <name>` and keep the PDF beside the render:
  every card must have both files.
- Fonts load through a `<link rel="stylesheet">` in `<head>`; never `@import` in CSS.

## General

- No external JavaScript dependencies; nothing to install or build.
- Target: GitHub Pages deployment from `main`.
- After changing links or assets, check that every local `href`/`src` resolves and that no
  placeholder text (`Fecha`, `Date`, `TODO`) is published.
