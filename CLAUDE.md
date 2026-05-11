# TAYWIN ORIGINAL — Project Instructions

## Bootstrap
Use the `using-superpowers` skill at the start of every session.

## Project

**TAYWIN ORIGINAL** is a luxury handcrafted shoe brand based in Thailand.
This is a React + Vite e-commerce website built from a Google Stitch design.

### Stack
- React 18 + Vite
- Tailwind CSS v3 (design tokens from Google Stitch — do NOT change the color system)
- React Router v6 for navigation
- No backend — product data comes from Google Sheets CSV

### Pages
- `/` — Homepage (hero, new arrivals grid, features)
- `/product` — Product detail page (gallery, size picker, accordion)
- `/checkout` — Checkout page (shipping form, order summary)

### Key files
- `src/config/sheetConfig.js` — paste Google Sheet CSV URL here
- `src/hooks/useProducts.js` — fetches and parses the sheet, provides `useProducts()` and `useProduct()`
- `src/pages/` — one file per page
- `src/components/NavBar.jsx` + `Footer.jsx` — shared layout

## Rules

- **Never hardcode product data** — all product info (name, price, description, sizes) must come from the Google Sheet via `useProducts`
- **Never change the color system** — all colors are from the Stitch design tokens (`#081421` background, `#f0c131` primary, etc.)
- **Typography is fixed** — EB Garamond for headings, Manrope for body. Do not change fonts.
- **No new dependencies** without asking Mew first
- When adding a new page, add it to the router in `src/App.jsx` and link it from `NavBar.jsx`

## Who is Mew

Mew is the Product Owner. He is **not a developer**. Explain things simply, avoid jargon, and always tell him which file to look at and what to change. When making edits, do them for him — don't give him code to copy-paste.
