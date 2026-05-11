# Heritage Page Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 3-column product grid in the Heritage page "Curated Essentials" section with a full-width auto-scrolling marquee carousel showing all products.

**Architecture:** A new `ProductCarousel` component renders a doubled product list inside an `overflow-hidden` wrapper, driven by a CSS `@keyframes marquee` animation defined in `index.css`. `HeritagePage` drops the `slice(0,3)` and swaps the grid for `<ProductCarousel products={products} />`. No new dependencies.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, CSS `@keyframes`

---

## Files

| File | Action | Purpose |
|---|---|---|
| `src/index.css` | **Modify** | Add `@keyframes marquee` animation rule |
| `src/components/ProductCarousel.jsx` | **Create** | Auto-scrolling marquee carousel component |
| `src/pages/HeritagePage.jsx` | **Modify** | Swap static grid for `<ProductCarousel>` |

---

### Task 1: Add `@keyframes marquee` to global CSS

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Read the current file**

Read `src/index.css` to find the end of the file so you know where to append.

- [ ] **Step 2: Append the keyframe rule**

Add this block at the very end of `src/index.css`:

```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/kittipos/Desktop/WebShowcase/taywin-original && npm run build
```

Expected: `✓ built` with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add marquee keyframe animation to global CSS"
```

---

### Task 2: Create ProductCarousel component

**Files:**
- Create: `src/components/ProductCarousel.jsx`

- [ ] **Step 1: Create the file**

Write `/Users/kittipos/Desktop/WebShowcase/taywin-original/src/components/ProductCarousel.jsx` with this exact content:

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveImageUrl } from '../config/images'

export default function ProductCarousel({ products }) {
  const [paused, setPaused] = useState(false)
  const doubled = [...products, ...products]
  const duration = `${Math.max(products.length, 1) * 6}s`

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-6"
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {doubled.map((item, i) => (
          <Link
            key={`${item.sku}-${i}`}
            to={`/product/${item.sku}`}
            className="group shrink-0 w-[240px]"
          >
            <div className="aspect-[4/5] bg-[#f2f2f2] overflow-hidden mb-4">
              <img
                src={resolveImageUrl(item.imageUrl)}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">
              {item.name}
            </h3>
            <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">
              {item.series} · {item.price.toLocaleString()} THB
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/kittipos/Desktop/WebShowcase/taywin-original && npm run build
```

Expected: `✓ built` with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProductCarousel.jsx
git commit -m "feat: add ProductCarousel auto-scroll marquee component"
```

---

### Task 3: Wire ProductCarousel into HeritagePage

**Files:**
- Modify: `src/pages/HeritagePage.jsx`

- [ ] **Step 1: Read the current file**

Read `src/pages/HeritagePage.jsx` to confirm the exact current state before editing.

- [ ] **Step 2: Add the import**

At the top of `src/pages/HeritagePage.jsx`, after the existing imports, add:

```jsx
import ProductCarousel from '../components/ProductCarousel'
```

The imports block should end up looking like:

```jsx
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { IMAGES, resolveImageUrl } from '../config/images'
import { useProducts } from '../hooks/useProducts'
import ProductCarousel from '../components/ProductCarousel'
```

- [ ] **Step 3: Remove the `curated` slice**

Find this line (line 20 in the current file) and delete it:

```jsx
const curated = products.slice(0, 3)
```

- [ ] **Step 4: Replace the grid with the carousel**

Find this entire block (inside the Curated Essentials section):

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {curated.map((item) => (
    <Link to={`/product/${item.sku}`} key={item.sku} className="group">
      <div className="aspect-[4/5] bg-[#f2f2f2] overflow-hidden mb-4">
        <img src={resolveImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">{item.name}</h3>
      <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">{item.series} · {item.price.toLocaleString()} THB</p>
    </Link>
  ))}
</div>
```

Replace it with:

```jsx
<ProductCarousel products={products} />
```

- [ ] **Step 5: Verify build passes**

```bash
cd /Users/kittipos/Desktop/WebShowcase/taywin-original && npm run build
```

Expected: `✓ built` with no errors.

- [ ] **Step 6: Manual check — carousel is visible and moving**

```bash
npm run dev
```

Open `http://localhost:5173/heritage`. Scroll to "Curated Essentials". The carousel should:
- Show product cards scrolling right-to-left continuously
- Pause when you hover over the track
- Resume scrolling when the cursor leaves
- Show product image, name, series, and price on each card
- Navigate to `/product/:sku` when a card is clicked

- [ ] **Step 7: Commit**

```bash
git add src/pages/HeritagePage.jsx
git commit -m "feat: replace heritage product grid with auto-scroll carousel"
```

---

### Task 4: Final build and push

- [ ] **Step 1: Full production build**

```bash
cd /Users/kittipos/Desktop/WebShowcase/taywin-original && npm run build
```

Expected: `✓ built` with no errors or warnings.

- [ ] **Step 2: Verify git log**

```bash
git log --oneline -5
```

Expected output includes:
```
feat: replace heritage product grid with auto-scroll carousel
feat: add ProductCarousel auto-scroll marquee component
feat: add marquee keyframe animation to global CSS
```

- [ ] **Step 3: Push to GitHub**

```bash
git push
```

Expected: all commits pushed. Vercel auto-deploys in ~60 seconds.
