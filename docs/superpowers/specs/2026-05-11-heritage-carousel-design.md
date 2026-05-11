# Heritage Page Carousel Design

## Goal

Replace the static 3-column product grid in the "Curated Essentials" section of the Heritage page with an auto-scrolling marquee carousel that shows all products from the Google Sheet.

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Motion style | Auto-scroll loop (marquee) | Continuous motion feels editorial and ambient — no user interaction required |
| Pause behaviour | Pauses on hover | Lets users read name/price and click through without fighting the animation |
| Products shown | All products from sheet | A marquee benefits from more content; `slice(0,3)` was a static-grid limitation |
| Implementation | Pure CSS `@keyframes` + React `useState` for hover | No new dependencies; straightforward and performant |
| Card info | Image, name, series, price | Same as the existing grid — no information lost |

---

## Architecture

### New file

**`src/components/ProductCarousel.jsx`**

A reusable component that accepts a `products` array prop and renders the full-width auto-scrolling track. Responsibilities:
- Doubles the `products` array internally to create a seamless loop (once the track reaches `-50%` translation it resets invisibly)
- Manages a `paused` boolean via `useState` toggled by `onMouseEnter` / `onMouseLeave` on the track container
- Applies `animationPlayState: paused` inline when `paused === true`
- Renders each card as a `<Link to={/product/${item.sku}}>` with product image (`resolveImageUrl`), name, series, and price
- The outer wrapper clips overflow (`overflow-hidden`, full width, no horizontal padding) so cards bleed edge to edge

### Modified file

**`src/pages/HeritagePage.jsx`**

Two changes inside the "Curated Essentials" section (currently lines 117–139):
1. Remove `const curated = products.slice(0, 3)` — pass the full `products` array to the carousel
2. Replace the `<div className="grid grid-cols-1 md:grid-cols-3 gap-8">` block with `<ProductCarousel products={products} />`

The section header (`<div className="flex justify-between ...">` with "From the Collection", "Curated Essentials", and "View All") is unchanged.

---

## Component Interface

```jsx
<ProductCarousel products={products} />
```

`products` is the array returned by `useProducts()` — each item has `{ sku, name, series, price, imageUrl }`.

---

## Behaviour Details

### Seamless loop
- The component renders `[...products, ...products]` — two copies of the full list
- The CSS animation translates the track from `0` to `-50%` of its total width
- At `-50%`, the second copy is in the same position the first copy started — so the `animation: linear infinite` reset is invisible

### Scroll speed
- Animation duration: `${products.length * 6}s` — scales with product count so speed stays consistent regardless of how many products are in the sheet (e.g. 3 products → 18s, 6 products → 36s)

### Card dimensions
- Width: `240px` fixed, shrink-0
- Image area: `aspect-[4/5]` (same as current grid)
- Gap between cards: `24px`

### Hover pause
- `onMouseEnter` on the track wrapper → `setPaused(true)`
- `onMouseLeave` → `setPaused(false)`
- Applied as `style={{ animationPlayState: paused ? 'paused' : 'running' }}`

### Click behaviour
- Each card is a `<Link to={/product/${item.sku}}>` — navigates to the product page
- No `stopPropagation` needed; the card is entirely the link target

---

## Tailwind Animation Setup

The `@keyframes scroll` animation and the `animate-marquee` utility class do not exist yet. They must be added to `tailwind.config.js` under `theme.extend`:

```js
keyframes: {
  marquee: {
    '0%':   { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }
  },
},
animation: {
  marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
},
```

The `--marquee-duration` CSS custom property is set inline on the track element (e.g. `style={{ '--marquee-duration': `${products.length * 6}s` }}`), so the speed scales with product count without hardcoding a duration in the config.

The `paused` state sets `[animation-play-state:paused]` on the track via a Tailwind arbitrary class or an inline style.

---

## What Is NOT in Scope

- Drag / swipe support
- Prev/next arrow buttons
- Dot indicators
- Touch events
- Reduced-motion media query (can be added later)
