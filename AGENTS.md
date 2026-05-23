# Code Review Rules

## HTML
- Use semantic HTML5 elements
- Bilingual support via data-es / data-en attributes
- Vanilla only, no frameworks

## CSS
- Use CSS custom properties from :root
- Dark theme with --accent (#00ff88) and --accent2 (#0088ff)
- Mobile-first responsive design
- Prefer rem units for typography

## JavaScript
- Use strict mode
- ES5 compatibility (var, no arrow functions in top-level)
- IIFE wrapper to avoid global scope pollution
- localStorage for persistence
- IntersectionObserver for scroll-based effects

## General
- No external dependencies
- Pure HTML/CSS/JS vanilla stack
- Target: GitHub Pages deployment
