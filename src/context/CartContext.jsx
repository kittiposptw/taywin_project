import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('taywin_cart')) || []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('taywin_cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, size) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.sku === product.sku && item.size === size)
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, {
        sku: product.sku,
        name: product.name,
        series: product.series,
        price: product.price,
        imageUrl: product.imageUrl,
        size,
        qty: 1,
      }]
    })
  }

  function updateQty(sku, size, qty) {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => !(item.sku === sku && item.size === size)))
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.sku === sku && item.size === size ? { ...item, qty } : item
      )
    )
  }

  function removeFromCart(sku, size) {
    setCartItems((prev) => prev.filter((item) => !(item.sku === sku && item.size === size)))
  }

  function clearCart() {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
