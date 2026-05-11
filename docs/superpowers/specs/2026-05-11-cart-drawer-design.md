# Cart Drawer Design

## Goal

Replace the current single-product direct-to-checkout flow with a persistent shopping cart — a slide-out drawer that lets users add multiple products, adjust quantities, and proceed to checkout when ready.

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Cart UI | Slide-out drawer (right side) | Stays on page, luxury e-commerce standard |
| Duplicate item handling | Increase quantity | Same SKU + same size = qty bump, not new row |
| Persistence | localStorage (`taywin_cart`) | Cart survives page refresh and tab close |

---

## Architecture

### New files

**`src/context/CartContext.jsx`**
React Context + Provider that owns all cart state. Exposes:
- `cartItems` — array of `{ sku, name, series, price, imageUrl, size, qty }`
- `addToCart(product, size)` — adds item or increments qty if same sku+size exists
- `updateQty(sku, size, qty)` — sets qty; if qty ≤ 0, removes the item
- `removeFromCart(sku, size)` — removes item entirely
- `clearCart()` — empties the cart (called after checkout)
- `totalItems` — sum of all qty values (used for nav badge)
- `totalPrice` — sum of `price × qty` across all items
- `isOpen` — whether the drawer is visible
- `openCart()` / `closeCart()` — toggle drawer visibility

State is initialised from `localStorage.getItem('taywin_cart')` on mount and written back on every change via `useEffect`.

**`src/components/CartDrawer.jsx`**
The slide-out panel. Reads everything from `useCart()`. Renders:
- Header: "Your Bag (N)" + ✕ close button
- Item list: for each cart item — product image (`resolveImageUrl`), name, size, −/qty/+ controls, line price (`price × qty`), ✕ remove button
- Empty state: "Your bag is empty" + "Browse Collection" link
- Footer: subtotal label, total (Bodoni Moda), "Proceed to Checkout" button, "Continue Shopping" button

### Modified files

**`src/App.jsx`**
- Wrap entire app in `<CartProvider>`
- Add `<CartDrawer />` inside `CartProvider` but outside `Routes` so it's always mounted

**`src/components/NavBar.jsx`**
- Import `useCart`
- Bag icon `<Link>` → `<button>` calling `openCart()`
- Show a count badge when `totalItems > 0`

**`src/pages/ProductPage.jsx`**
- "Add to Bag" changes from `<Link to="/checkout">` to a `<button>`
- On click: calls `addToCart(product, selectedSize)` then `openCart()`
- Size must still be selected before button is active (no change to that logic)

**`src/pages/CheckoutPage.jsx`**
- Remove `useLocation` state reading
- Read `cartItems`, `totalPrice`, `clearCart` from `useCart()`
- Empty cart guard: if `cartItems.length === 0`, show "Your bag is empty" screen
- Order summary renders all cart items (image, name, size, qty, line price)
- Total comes from `totalPrice`
- "Complete Purchase" button calls `clearCart()` on click (placeholder — no real payment)

---

## Cart Item Shape

```js
{
  sku: 'LXR-LOAF-001',       // from product
  name: 'Atelier Loafer',    // from product
  series: 'The Atelier',     // from product (may be empty)
  price: 22500,              // unit price as number
  imageUrl: 'https://...',   // raw URL, resolved at render time
  size: '42',                // selected size string
  qty: 1,                    // quantity, always ≥ 1
}
```

Item identity key: `${sku}-${size}` — same product in different sizes = separate cart lines.

---

## Behaviour Details

### Adding to cart
- If key `${sku}-${size}` already exists → increment `qty` by 1
- If not → append new item with `qty: 1`
- After adding: open the drawer

### Quantity controls
- **+** → `updateQty(sku, size, qty + 1)`
- **−** → `updateQty(sku, size, qty - 1)` — if result is 0, item is removed
- Minimum display is 1 (− is disabled at qty 1 to prevent 0 confusion; clicking − at 1 shows a remove confirmation or just removes silently — **remove silently** for simplicity)

### Drawer open/close
- Opens: clicking bag icon in nav, or after "Add to Bag"
- Closes: clicking ✕, clicking "Continue Shopping", clicking the dim overlay, or navigating to checkout

### Checkout transition
- "Proceed to Checkout" navigates to `/checkout` and calls `closeCart()`
- Checkout reads from cart context (no more `useLocation` state passing)

### localStorage
- Key: `taywin_cart`
- Written as `JSON.stringify(cartItems)` on every cart change
- Read with `JSON.parse` on mount; malformed data falls back to `[]`

---

## What Is NOT in Scope

- Discount / promo codes (UI exists in checkout but does nothing)
- Stock validation (no stock data in the sheet)
- Quantity maximum cap
- Saved-for-later
- Real payment processing
