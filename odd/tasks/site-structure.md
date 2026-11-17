# Site structure: order, themes, file layout and any-screen fit

Second pass over the portfolio: the content order changes, a light theme joins the dark one, the
single stylesheet and script are split into parts with one responsibility each, and the header and
grids have to hold on every screen size.

## Specs

- **S1** — «primero que este lo sobre mi luego los sertificados luego proyectos luego tecnologia y al
  ultimo contacto». Section order: Sobre mí → Certificados → Proyectos → Tecnología → Contacto, and
  the navigation lists them in that same order.
- **S2** — «que hay modo oscuro modo claro para ser mas consistente». A visible control switches
  between dark and light. The choice survives a reload, a first visit follows the operating system
  preference, and the page never flashes the wrong theme before the script runs. Light is a real
  theme, not an inversion: every token is chosen for contrast on a light background.
- **S3** — «has un estructura como ingeniero de sistema ... con diferentes partes separadas una
  estructura bien hecha que no se separa html css javascript». HTML carries structure only, CSS is
  split into files by responsibility (tokens, base, layout, components, responsive, print), and the
  JavaScript is split into modules with one concern each. No build step, no dependency.
- **S4** — «para ensanchar en celular el header no esta optimizado». The header must stay ordered and
  usable on narrow screens with the new theme control added: logo, theme, language and menu without
  overlap, overflow or a lost button.
- **S5** — «asegurate que este acomodado bien la web entera para cualquier tipo de pantalla». Every
  section holds from 320 px to a wide desktop: no horizontal scroll, no clipped text, no card
  narrower than its content.

## Tasks

- T1 — Split `css/style.css` into tokens, base, layout, components, responsive and print, with
  rendering parity before and after. (S3)
- T2 — Split `js/main.js` into modules (theme, i18n, navigation, reveal) behind one entry point.
  (S3)
- T3 — Add the light theme: tokens, toggle control, persistence, system default, no flash. (S2)
- T4 — Reorder sections and navigation to Sobre mí → Certificados → Proyectos → Tecnología →
  Contacto. (S1)
- T5 — Rework the header for narrow screens with four controls. (S4)
- T6 — Audit every section from 320 px up, in both themes. (S5)
- T7 — Update README, AGENTS.md and this document. (S3)

## Log

- **L1** (verbatim request): «esta bien pero hay muchas mejoras que hacer primero orgranicemos bien
  hay que hacer una reorganizacion primero que este lo sobre mi luego los sertificados luego
  proyectos luego tecnologia y al ultimo contacto, tambien que hay modo oscuro modo claro para ser
  mas consistente, has un estructura como ingeniero de sistema para ahora este mas avanzado con
  diferenter parte separadas una estructura bien hecha que no se separa html css javascrip y para
  ensar en celular el header no esta obtimisado asegurate que este acomodado bien la web entera para
  cualquier tipo de pantalla»
- **L2** (constraint): the light theme cannot reuse `--accent` (#00ff88) for text — on white it is
  unreadable — so the light palette defines its own accent values while keeping the identity.
- **L3** (constraint): splitting the stylesheet changes cascade order. Rendering parity is verified
  by pixel comparison at two widths before the split is accepted.
- **L4** (decision): the restructure lands as one work unit. The theme tokens live inside the new
  stylesheet files and the section order inside the page, so any smaller split would leave an
  intermediate tree that does not render. The order of work was verified instead: the stylesheet
  split was accepted only at pixel parity against the previous single file (AE=0 at 1280 and 390 on
  the hero and certificate views), and the module split at behaviour parity (AE=0 for the default
  page, the open menu and English).
- **L5** (evidence): the light palette was chosen against the dark accents, which are unreadable on
  white (L2). Header controls were grouped into `.nav-actions` after the theme button drifted away
  from the language button under `space-between`. Widths checked: 320, 360, 390, 768, 1024, 1280.
