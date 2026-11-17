# runer0101.github.io

Personal portfolio built with vanilla HTML, CSS, and JavaScript. Bilingual (EN/ES), responsive, dark
theme, scroll animations.

**[runer0101.github.io](https://runer0101.github.io)**

## Structure

```
index.html            structure only
css/
  tokens.css          colours and radius, dark and light
  base.css            reset, typography, reveal, scrollbar
  layout.css          header, navigation, hero, sections, footer
  components.css      cards, buttons, grids
  responsive.css      media queries, reduced motion
  print.css           print
js/
  main.js             entry point
  storage.js          guarded localStorage
  i18n.js             language state and swaps
  nav.js              menu, header state, active section
  reveal.js           scroll reveal
  theme.js            dark/light control
icons/                self-hosted technology icons
certificates/         credential images and their PDFs
```

## Themes

Dark is the default and follows the operating system on a first visit; the control in the header
switches mode, remembers the choice and sets the attribute before the first paint so the page never
flashes the wrong theme. Both themes come from the same tokens in `css/tokens.css`.

## Stack

`HTML` `CSS` `JavaScript` `IntersectionObserver` `CSS Custom Properties`

## Features

- Bilingual (Spanish / English) with `localStorage` persistence; the switch also translates the
  document title, the description and the Open Graph tags
- Dark theme with green & blue accents
- Scroll-triggered reveal animations that only hide content while JavaScript runs, and that switch
  off under `prefers-reduced-motion`
- Mobile responsive with an accessible hamburger menu (`aria-expanded`, Escape to close)
- Skip-to-content link, print stylesheet
- No frameworks, no build step, no runtime JavaScript dependency

## Assets

- `icons/` — self-hosted technology icons, referenced as `icons/<name>.svg`. No CDN hotlinks.
- `certificates/` — each credential as a PNG render at 1400 px on the long edge plus its PDF.
  Every card offers two actions: **Ver certificado** opens the image, which the browser fits to the
  window whatever the page format, and **Descargar PDF** downloads the document itself for anyone
  who needs the file — a recruiter, an application form. File names are lowercase kebab-case:
  `<topic>-<issuer>.png` with `<topic>-<issuer>.pdf` beside it.
  HACK4U delivered only an image, so `arch-linux-hack4u.pdf` is that image wrapped in a PDF;
  every other PDF is the document issued by the institution.
- `og-image.png` — 1200×630 social preview.
- Fonts are the only external request: Space Mono and Syne from Google Fonts.

## Sections

- **Hero** — Introduction and CTA
- **About** — Background and current focus
- **Skills** — Technology grid
- **Projects** — Featured work with live links
- **Certificates** — Downloadable credentials, newest category first
- **Contact** — Email, GitHub and LinkedIn

## Local preview

No build step, but the scripts are ES modules: serve the folder with `python3 -m http.server` and
open the local URL. Opening `index.html` from the filesystem no longer runs the scripts.

## Publishing

GitHub Pages serves `main` from the repository root. `sitemap.xml`, `robots.txt` and the JSON-LD
`Person` block in `index.html` describe the site to crawlers.
