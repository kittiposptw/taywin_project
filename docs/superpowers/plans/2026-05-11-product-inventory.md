# Product Inventory — Google Sheets Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing `useProducts`/`useProduct` hooks to CollectionsPage and ProductPage so all product data comes from Google Sheets, with Google Drive image support and loading/error/empty states.

**Architecture:** Add a `resolveImageUrl` utility that converts Google Drive sharing links to direct image URLs. Update the route for the product page to accept a SKU param. Replace hardcoded product arrays in CollectionsPage, ProductPage, and HeritagePage with live sheet data via existing hooks.

**Tech Stack:** React 18, React Router v6 (`useParams`), Tailwind CSS `animate-pulse` for skeletons, existing `useProducts`/`useProduct` hooks.

> **Note:** No test framework is installed. TDD steps are replaced with manual browser verification. Each task ends with a build check (`npm run build`) and manual spot-check in the dev server.

---

## File Map

| File | Change |
|---|---|
| `src/config/images.js` | Add `resolveImageUrl(url)` export |
| `src/App.jsx` | Change route `/product` → `/product/:sku` |
| `src/pages/CollectionsPage.jsx` | Replace hardcoded PRODUCTS with `useProducts()`, add skeleton/error/empty states, update card links |
| `src/pages/ProductPage.jsx` | Read SKU from `useParams`, apply `resolveImageUrl`, add skeleton, fix not-found link |
| `src/pages/HeritagePage.jsx` | Replace hardcoded CURATED with first 3 products from `useProducts()`, update links |

---

## Task 1: Add `resolveImageUrl` utility

**Files:**
- Modify: `src/config/images.js`

- [ ] **Step 1: Add the function**

Open `src/config/images.js` and add this export at the bottom of the file, after the closing brace of `IMAGES`:

```js
// Converts Google Drive sharing URLs to direct image URLs.
// All other URLs pass through unchanged.
export function resolveImageUrl(url) {
  if (!url) return ''
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`
  }
  return url
}
```

- [ ] **Step 2: Verify in browser console**

Start the dev server if not running:
```bash
cd /Users/kittipos/Desktop/WebShowcase/taywin-original && npm run dev
```

Open browser DevTools console and run:
```js
// Paste this directly into the console — not needed in production, just a sanity check
const url = 'https://drive.google.com/file/d/ABC123xyz/view?usp=sharing'
const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
console.log(match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url)
// Expected output: https://drive.google.com/uc?export=view&id=ABC123xyz
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original add src/config/images.js
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original commit -m "feat: add resolveImageUrl utility for Google Drive links"
```

---

## Task 2: Update product route to accept SKU

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Change the route**

In `src/App.jsx`, change line 15:
```jsx
// Before
<Route path="/product" element={<ProductPage />} />

// After
<Route path="/product/:sku" element={<ProductPage />} />
```

- [ ] **Step 2: Verify old URL redirects gracefully**

In the browser, navigate to `http://localhost:5175/product` (no SKU).

Expected: React Router renders nothing / blank page. This is acceptable — no links in the app point to `/product` bare anymore after Tasks 3–5.

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original add src/App.jsx
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original commit -m "feat: update product route to /product/:sku"
```

---

## Task 3: Wire CollectionsPage to live sheet data

**Files:**
- Modify: `src/pages/CollectionsPage.jsx`

- [ ] **Step 1: Replace the file content**

Replace the entire contents of `src/pages/CollectionsPage.jsx` with:

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useProducts } from '../hooks/useProducts'
import { resolveImageUrl } from '../config/images'

const CATEGORIES = ['Oxford', 'Loafers', 'Boots']
const MATERIALS = ['Full-grain Leather', 'Suede']
const SIZES = ['40', '41', '42', '43', '44', '45']

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#e2e2e2] mb-4" style={{ aspectRatio: '4/5' }} />
      <div className="h-3 bg-[#e2e2e2] w-3/4 mb-2" />
      <div className="h-3 bg-[#e2e2e2] w-1/3" />
    </div>
  )
}

export default function CollectionsPage() {
  const { products, loading, error } = useProducts()
  const [activeCategories, setActiveCategories] = useState([])
  const [activeMaterials, setActiveMaterials] = useState([])
  const [activeSizes, setActiveSizes] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  function toggleCategory(cat) {
    setActiveCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])
  }
  function toggleMaterial(mat) {
    setActiveMaterials((prev) => prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat])
  }
  function toggleSize(size) {
    setActiveSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])
  }

  const activeFilterCount = activeCategories.length + activeMaterials.length + activeSizes.length

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />

      <main className="pt-[72px]">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">

          {/* Header + filter bar */}
          <div className="flex flex-col md:flex-row justify-between items-baseline py-8 border-b border-[#e2e2e2]">
            <div>
              <h1 className="font-['Bodoni_Moda'] text-4xl text-[#1a1c1c]">Shop All</h1>
              <p className="font-['Hanken_Grotesk'] text-xs font-medium uppercase tracking-[0.1em] text-[#7e7576] mt-1">
                {loading ? '' : `${products.length} items`}
              </p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
              >
                Refine
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 bg-[#1a1c1c] text-white text-[10px] flex items-center justify-center">{activeFilterCount}</span>
                )}
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>tune</span>
              </button>
              <button className="flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                Sort
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>expand_more</span>
              </button>
            </div>
          </div>

          {/* Collapsible filter row */}
          {filtersOpen && (
            <div className="border-b border-[#e2e2e2] py-6 flex flex-wrap gap-10">
              <div>
                <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] mb-3 block">Category</span>
                <div className="flex gap-2">
                  {CATEGORIES.map((cat) => {
                    const active = activeCategories.includes(cat)
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 border font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${active ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : 'border-[#e2e2e2] text-[#1a1c1c] hover:border-[#1a1c1c]'}`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] mb-3 block">Material</span>
                <div className="flex gap-2">
                  {MATERIALS.map((mat) => {
                    const active = activeMaterials.includes(mat)
                    return (
                      <button
                        key={mat}
                        onClick={() => toggleMaterial(mat)}
                        className={`px-3 py-1.5 border font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${active ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : 'border-[#e2e2e2] text-[#1a1c1c] hover:border-[#1a1c1c]'}`}
                      >
                        {mat}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] mb-3 block">Size</span>
                <div className="flex gap-2">
                  {SIZES.map((size) => {
                    const active = activeSizes.includes(size)
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-10 h-8 border font-['Hanken_Grotesk'] text-xs font-semibold transition-colors ${active ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : 'border-[#e2e2e2] text-[#1a1c1c] hover:border-[#1a1c1c]'}`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex items-end">
                  <button
                    onClick={() => { setActiveCategories([]); setActiveMaterials([]); setActiveSizes([]) }}
                    className="font-['Hanken_Grotesk'] text-xs font-medium uppercase tracking-[0.1em] text-[#7e7576] underline hover:text-[#1a1c1c] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Product grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14 py-10 mb-16">
            {loading && Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

            {error && (
              <div className="col-span-4 py-24 text-center">
                <p className="font-['Hanken_Grotesk'] text-sm text-[#7e7576]">Unable to load products. Please try again later.</p>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="col-span-4 py-24 text-center">
                <p className="font-['Hanken_Grotesk'] text-sm text-[#7e7576]">No products available.</p>
              </div>
            )}

            {!loading && !error && products.map((product) => (
              <Link to={`/product/${product.sku}`} key={product.sku} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-[#f2f2f2] mb-4" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={resolveImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c]">{product.name}</h3>
                  <span className="font-['Hanken_Grotesk'] text-sm text-[#7e7576]">${product.price}</span>
                </div>
              </Link>
            ))}
          </section>

          {/* Pagination */}
          <nav className="flex justify-center items-center gap-2 mb-24">
            <button className="w-10 h-10 flex items-center justify-center border border-[#e2e2e2] hover:border-[#1a1c1c] transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            {['1', '2', '3', '...', '14'].map((num, i) => (
              <button
                key={i}
                className={`w-10 h-10 flex items-center justify-center border font-['Hanken_Grotesk'] text-xs font-semibold transition-colors ${i === 0 ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : num === '...' ? 'border-transparent text-[#7e7576] cursor-default' : 'border-[#e2e2e2] text-[#1a1c1c] hover:border-[#1a1c1c]'}`}
              >
                {num}
              </button>
            ))}
            <button className="w-10 h-10 flex items-center justify-center border border-[#e2e2e2] hover:border-[#1a1c1c] transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </nav>

        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Manual verification — loading state**

In the browser, navigate to `http://localhost:5175/collections`.

Since `SHEET_CSV_URL` is empty in `sheetConfig.js`, the hook skips the fetch and returns the fallback product immediately. You should see **The Heritage Oxford** card with its image.

To test the loading skeleton: temporarily set a slow URL. Open DevTools → Network tab → set throttling to "Slow 3G", then hard-refresh. You should see 8 gray pulsing placeholder cards before the product appears.

Reset throttling to "No throttling" after.

- [ ] **Step 3: Manual verification — product card link**

Click on the product card. The URL should change to `/product/HO-TAN-42` (the SKU from the fallback product). The page will be blank for now since ProductPage isn't wired yet — that's expected.

- [ ] **Step 4: Build check**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original add src/pages/CollectionsPage.jsx
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original commit -m "feat: wire CollectionsPage to useProducts with loading/error/empty states"
```

---

## Task 4: Wire ProductPage to SKU routing

**Files:**
- Modify: `src/pages/ProductPage.jsx`

- [ ] **Step 1: Update imports and hook call**

In `src/pages/ProductPage.jsx`, change the import on line 2 from:
```jsx
import { Link } from 'react-router-dom'
```
to:
```jsx
import { Link, useParams } from 'react-router-dom'
```

Also add `resolveImageUrl` to the images import on line 6:
```jsx
import { IMAGES, resolveImageUrl } from '../config/images'
```

- [ ] **Step 2: Read SKU from URL params**

In `src/pages/ProductPage.jsx`, change line 16 from:
```jsx
const { product, loading } = useProduct()
```
to:
```jsx
const { sku } = useParams()
const { product, loading } = useProduct(sku)
```

- [ ] **Step 3: Update the not-found state to include a back link**

Replace the existing not-found/loading `return` block (lines 26–34) with:
```jsx
if (!product && !loading) {
  return (
    <div className="bg-[#f9f9f9] min-h-screen flex flex-col items-center justify-center gap-4">
      <span className="font-['Hanken_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#7e7576]">
        Product not found
      </span>
      <Link to="/collections" className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1c1c] border-b border-[#1a1c1c] pb-0.5 hover:opacity-60 transition-opacity">
        Back to Collections
      </Link>
    </div>
  )
}

if (loading) {
  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />
      <main className="pt-[72px]">
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-7 grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[4/5] bg-[#e2e2e2]" />
            <div className="aspect-square bg-[#e2e2e2]" />
            <div className="aspect-square bg-[#e2e2e2]" />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 pt-4">
            <div className="h-4 bg-[#e2e2e2] w-1/3" />
            <div className="h-10 bg-[#e2e2e2] w-2/3" />
            <div className="h-4 bg-[#e2e2e2] w-1/4" />
            <div className="h-px bg-[#e2e2e2]" />
            <div className="space-y-2">
              <div className="h-3 bg-[#e2e2e2]" />
              <div className="h-3 bg-[#e2e2e2]" />
              <div className="h-3 bg-[#e2e2e2] w-3/4" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Apply `resolveImageUrl` to the main product image**

In the gallery section, find the main product image (the `col-span-2` image, currently around line 48):
```jsx
// Before
<img src={product.imageUrl || IMAGES.oxfordMain} alt={product.name} className="w-full h-full object-cover" />

// After
<img src={resolveImageUrl(product.imageUrl) || IMAGES.oxfordMain} alt={product.name} className="w-full h-full object-cover" />
```

- [ ] **Step 5: Manual verification**

Navigate to `http://localhost:5175/collections` and click the product card.

Expected: URL becomes `/product/HO-TAN-42` and the full product page renders with name, price, description, and sizes from the fallback data.

Navigate to `http://localhost:5175/product/FAKE-SKU`.

Expected: "Product not found" message with a "Back to Collections" link.

- [ ] **Step 6: Build check**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original add src/pages/ProductPage.jsx
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original commit -m "feat: wire ProductPage to SKU route param with loading skeleton"
```

---

## Task 5: Update HeritagePage Curated Essentials

**Files:**
- Modify: `src/pages/HeritagePage.jsx`

- [ ] **Step 1: Replace the CURATED constant and imports**

At the top of `src/pages/HeritagePage.jsx`, add these imports after line 3:
```jsx
import { useProducts } from '../hooks/useProducts'
import { resolveImageUrl } from '../config/images'
```

Remove the existing `CURATED` constant (lines 17–21):
```jsx
// DELETE this entire block:
const CURATED = [
  { name: 'The Heritage Oxford', material: 'Full-grain Calfskin', price: '$495', img: IMAGES.collections[0] },
  { name: 'Atelier Loafer', material: 'Premium Suede', price: '$420', img: IMAGES.collections[1] },
  { name: 'The Nomad Boot', material: 'Weather-resistant Leather', price: '$585', img: IMAGES.collections[2] },
]
```

- [ ] **Step 2: Add hook call inside the component**

Inside the `HeritagePage` function, add this as the first line:
```jsx
const { products } = useProducts()
const curated = products.slice(0, 3)
```

- [ ] **Step 3: Update the Curated Essentials grid**

Find the Curated Essentials grid section (currently maps over `CURATED`). Replace it with:
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {curated.map((item) => (
    <Link to={`/product/${item.sku}`} key={item.sku} className="group">
      <div className="aspect-[4/5] bg-[#f2f2f2] overflow-hidden mb-4">
        <img src={resolveImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">{item.name}</h3>
      <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">{item.series} · ${item.price}</p>
    </Link>
  ))}
</div>
```

- [ ] **Step 4: Manual verification**

Navigate to `http://localhost:5175/heritage` and scroll to "Curated Essentials".

Expected: The Heritage Oxford card appears (from fallback data). Clicking it navigates to `/product/HO-TAN-42`.

- [ ] **Step 5: Build check**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original add src/pages/HeritagePage.jsx
git -C /Users/kittipos/Desktop/WebShowcase/taywin-original commit -m "feat: wire HeritagePage curated essentials to live sheet data"
```

---

## Final Step: Connect the Sheet

Once the code is live, Mew connects her Google Sheet:

1. Open the Google Sheet
2. **File → Share → Publish to web → Comma-separated values (.csv) → Publish**
3. Copy the published URL
4. Open `src/config/sheetConfig.js` and paste the URL:
   ```js
   export const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/...'
   ```
5. Save the file — the dev server hot-reloads and products from the sheet appear immediately

---

## Self-Review Checklist

- [x] `resolveImageUrl` defined in Task 1, used in Tasks 3, 4, and 5 — consistent
- [x] Route `/product/:sku` defined in Task 2, linked from Task 3 (`/product/${product.sku}`) and Task 5 (`/product/${item.sku}`) — consistent
- [x] `useProduct(sku)` called with `sku` from `useParams()` in Task 4 — matches `useProduct` signature in `useProducts.js` which accepts an optional `sku` arg
- [x] Loading skeleton in Task 4 uses `animate-pulse` consistent with Task 3's `SkeletonCard`
- [x] All 5 files from the spec's file map are covered
- [x] No TBDs or placeholders
