# Portfolio cleanup: credential truth, no-JS resilience, metadata

Static portfolio (GitHub Pages) audited against its own PDF certificates. This document is the
specification for the cleanup: every credential title, issuer and date must be provable from the
file it links to, and the page must stay readable without JavaScript.

## Specs

- **S1** — «integra un nuevo sertificado que es de la nasa». The untracked
  `certificates/NASA Space Apps Challenge.pdf` must be published with its own card, under the
  issuer and date printed on the PDF (NASA Space Apps Challenge, November 14–15, 2026).
- **S2** — «lee cada pdf y cambia los nombres de los pdf si en necesario». Every certificate file
  name must describe the credential it actually contains, in lowercase kebab-case, with no
  personal email, UUID or spaces.
- **S3** — «corrige todas las ambiguedades». No card may show a placeholder or an unproven value:
  the literal strings `Fecha` and `Date` used as a stand-in date, and the placeholder title
  `THM Challenge`, must be replaced by the value printed on the PDF.
- **S4** — Cards must match the PDF: title, issuer and month/year. A card that names another
  issuer than the certificate does is a defect (for example a Cisco credential attributed to
  OpenIT Academy).
- **S5** — «lo que esta mal»: content must not become invisible when JavaScript does not run, and
  the page must honour `prefers-reduced-motion: reduce`.
- **S6** — Commit history: «has los commit sin coautor». No `Co-Authored-By` trailer, no
  generated-with footer.
- **S7** — «el push»: the work is published to `origin/main` after the commits.

## Tasks

- T1 — Rename certificate files by content, update every `href`. (S2)
- T2 — Rewrite the certificates section from PDF evidence and add the NASA card. (S1, S3, S4)
- T3 — Move Projects above Certificates; keep navigation order consistent. (S4, S5)
- T4 — Make reveal content visible without JS and honour reduced motion. (S5)
- T5 — Translate title/description/Open Graph with the language switch; guard storage access;
  expose menu state to assistive technology. (S5)
- T6 — Add `og:image`, JSON-LD, `sitemap.xml`, `robots.txt`. (S5)
- T7 — Self-host skill icons; drop the third-party hotlink and the unpinned CDN tag. (S5)
- T8 — Fix `404.html` typeface and bring README/AGENTS.md in line with the code. (S5)

## Log

- **L1** (verbatim request): «corrige todoas las ambiguedades y lo que esta mal y integra un nuevo
  sertificado que es de la nasa, tambien hay nombre de los propios pdf que puede que no cocuerden
  con su contenido a si que lee cada pdf y cambia los nombres de los pdf si en necesario, luego de
  esos has los commit sin coautor y el push»
- **L2** (evidence): PDF text extracted with `pdftotext -layout`; `Linux-con-IA-OpenIT.pdf` and
  `Arch-Linux-Configuracion-HACK4U.jpg` carry no extractable text and were read as images. Real
  values differ from the page in five cards: "Conceptos básicos de redes" (Cisco, Oct 2026) was
  attributed to OpenIT Academy with a `Fecha` placeholder; "Pre Security Learning Path"
  (TryHackMe, Apr 2026) appeared as `THM Challenge`; "Curso de Arch Linux" (HACK4U, Jun 2026)
  appeared as "Arch Linux: Configuración"; "Introducción a la Ciberseguridad" (Cisco, Feb 2026)
  kept its English title in both languages; "Aprende Linux con el poder de la IA" (OpenIT,
  May 2026) lost its verb and lowercase.
- **L3** (decision): PDF text is authoritative over the card. Where the certificate itself
  contains a typo (Cisco prints "Cesa Camacho Duran"), the card keeps the correct name and the
  discrepancy is reported to the maintainer, not reproduced.
- **L4** (verbatim correction): «puse el mismo certificcado pero en png lo vi fejor de como se ve el otro en pdf»
  Decision: the NASA credential is published as
  `certificates/nasa-space-apps-challenge-2026.png`; the PDF added in the previous
  commit is removed rather than kept as a second copy of the same credential.
- **L5** (verbatim correction): «abre cada pdf si es necesario pero que se vean todos bien para que el que lo vea lo vea bien»
  Decision: `#zoom=100` fixed the percentage but the underlying problem was the PDF viewer
  itself — page formats differ, so a fixed zoom leaves a portrait A4 cropped and a 1200 pt wide
  page spilling sideways. Every card now links a PNG render (1400 px long edge, 1200 for the two
  OpenIT scans so they are not invented) and the browser fits it to the window. The original PDFs
  stay in `certificates/` as the source of the render.
- **L6** (verbatim request): «me gusta, pero colaque al lado una opcion para que lo descargue en pdf si es que lo desecita o para los reclutadores»
  Decision: each card became a container with two explicit actions — "Ver certificado" (PNG
  render, fitted to the window) and "Descargar PDF" (`download` attribute) — because an `<a>`
  inside a card-level `<a>` would be invalid HTML. The NASA PDF is restored and HACK4U's image is
  wrapped in a PDF, so all 19 credentials offer both files.
