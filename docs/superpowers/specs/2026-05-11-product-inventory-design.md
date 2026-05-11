# Product Inventory — Google Sheets Integration

**Date:** 2026-05-11
**Status:** Approved

## Goal

Allow the store owner to add and manage products by editing a Google Sheet. Changes to the sheet automatically reflect on the live website without any code changes. No backend, no database, no admin panel required.

---

## 1. Google Sheet Structure

Published as CSV via **File → Share → Publish to web → CSV**. The URL is pasted into `src/config/sheetConfig.js`.

| Column | Type | Notes |
|---|---|---|
| SKU | string | Unique identifier per product (e.g. `OX-BLK-001`) |
| Name | string | Display name |
| Series | string | Collection name |
| Price | number | No currency symbol |
| Description | string | Full product description |
| ImageURL | string | Google Drive share link or any image URL |
| Sizes | string | Comma-separated EU sizes (e.g. `40,41,42,43,44`) |
| Visible | boolean | `TRUE` shows the product; `FALSE` hides it |

Row 1 must be these exact headers. All other rows are products.

---

## 2. Google Drive Image Handling

Google Drive sharing URLs (`https://drive.google.com/file/d/ID/view?usp=sharing`) cannot be used as `<img src>` directly. A utility function converts them automatically.

**Converter logic:**
- Detects any URL containing `drive.google.com`
- Extracts the file ID
- Returns `https://drive.google.com/uc?export=view&id=FILE_ID`
- Non-Drive URLs pass through unchanged

**Location:** `src/config/images.js` — exported as `resolveImageUrl(url)`

The converter is called wherever a product image is rendered. The owner just pastes the Drive share link into the sheet — no extra steps.

---

## 3. Collections Page

**File:** `src/pages/CollectionsPage.jsx`

Replace the hardcoded `PRODUCTS` array with `useProducts()`.

### Loading state
While the sheet is fetching: render 8 placeholder cards in the same 4-column grid. Each card is a gray animated shimmer block matching the aspect ratio of a real product card.

### Loaded state
Each card renders from sheet data: photo (via `resolveImageUrl`), name, price. Existing hover "Quick View" overlay is preserved. Filter buttons (Category, Material, Size) remain in the UI but do not filter sheet data — out of scope.

### Error state
If fetch fails: centered message — *"Unable to load products. Please try again later."*

### Empty state
If sheet returns zero visible products: centered message — *"No products available."*

---

## 4. Product Page

**File:** `src/pages/ProductPage.jsx`

### Route change
`/product` → `/product/:sku`

All product card `<Link>` elements in CollectionsPage and HeritagePage updated to pass the SKU: `/product/OX-BLK-001`.

### Data
Uses `useProduct(sku)` where `sku` comes from `useParams()`. Product name, price, description, sizes, and image all come from the matched sheet row.

### Loading state
Image area and text sections show gray animated shimmer placeholders while loading.

### Error / not-found state
If no product matches the SKU: message — *"Product not found"* with a link back to `/collections`.

### Size picker
Available sizes rendered from the sheet's `Sizes` column. Only sizes present in the sheet row appear as buttons.

---

## 5. Files Changed

| File | Change |
|---|---|
| `src/config/images.js` | Add `resolveImageUrl(url)` utility |
| `src/App.jsx` | Update route: `/product` → `/product/:sku` |
| `src/pages/CollectionsPage.jsx` | Replace hardcoded products with `useProducts()` |
| `src/pages/ProductPage.jsx` | Replace hardcoded product with `useProduct(sku)` + `useParams()` |
| `src/pages/HeritagePage.jsx` | Update "Curated Essentials" links to include SKU |
| `src/config/sheetConfig.js` | No code change — owner pastes sheet URL here |

---

## 6. Out of Scope

- Stock quantity tracking per size
- Category / badge columns in the sheet
- Filter functionality wired to sheet data
- Auto-refresh / polling
- Admin UI or login
