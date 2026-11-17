# Code Review Rules

## HTML

- Use semantic HTML5 elements.
- Every user-visible string carries both `data-es` and `data-en`; the Spanish text is the default
  inner text so the page is correct without JavaScript.
- `title`, `meta description` and the Open Graph/Twitter tags carry their text in
  `data-es-content` / `data-en-content`.
- Sections use `class="reveal"`; children grids use `reveal-children`.
- Vanilla only, no frameworks, no build step.

## CSS

- Use CSS custom properties from `:root`.
- Dark theme with `--accent` (#00ff88) and `--accent2` (#0088ff).
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
- Fonts load through a `<link rel="stylesheet">` in `<head>`; never `@import` in CSS.

## General

- No external JavaScript dependencies; nothing to install or build.
- Target: GitHub Pages deployment from `main`.
- After changing links or assets, check that every local `href`/`src` resolves and that no
  placeholder text (`Fecha`, `Date`, `TODO`) is published.
