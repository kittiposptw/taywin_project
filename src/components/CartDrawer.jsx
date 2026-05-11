import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { resolveImageUrl } from '../config/images'

export default function CartDrawer() {
  const {
    cartItems, updateQty, removeFromCart,
    totalItems, totalPrice, isOpen, closeCart,
  } = useCart()
  const navigate = useNavigate()

  const drawerRef = useRef(null)

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus()
    }
  }, [isOpen])

  function handleCheckout() {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* Dim overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 h-full w-[360px] max-w-[90vw] bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out outline-none ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#e2e2e2]">
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c]">
            Your Bag{totalItems > 0 ? ` (${totalItems})` : ''}
          </span>
          <button onClick={closeCart} aria-label="Close bag" className="text-[#7e7576] hover:text-[#1a1c1c] transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <span className="font-['Hanken_Grotesk'] text-xs uppercase tracking-[0.15em] text-[#7e7576]">
                Your bag is empty
              </span>
              <Link
                to="/collections"
                onClick={closeCart}
                className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1c1c] border-b border-[#1a1c1c] pb-0.5 hover:opacity-60 transition-opacity"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#f0f0f0]">
              {cartItems.map((item) => (
                <div key={`${item.sku}-${item.size}`} className="flex gap-4 py-4">
                  <div className="w-16 h-20 bg-[#f2f2f2] shrink-0 overflow-hidden">
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-['Hanken_Grotesk'] text-xs font-semibold text-[#1a1c1c] leading-tight pr-2">
                        {item.name}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.sku, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#bbb] hover:text-[#1a1c1c] transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
                      </button>
                    </div>
                    <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mb-3">
                      Size {item.size}
                    </p>
                    <div className="flex justify-between items-center">
                      {/* Qty controls */}
                      <div className="flex items-center border border-[#e2e2e2]">
                        <button
                          onClick={() => updateQty(item.sku, item.size, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#1a1c1c] hover:bg-[#f2f2f2] transition-colors text-base font-light"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-['Hanken_Grotesk'] text-xs font-semibold text-[#1a1c1c] border-x border-[#e2e2e2]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.sku, item.size, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#1a1c1c] hover:bg-[#f2f2f2] transition-colors text-base font-light"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-['Hanken_Grotesk'] text-xs font-semibold text-[#1a1c1c]">
                        {(item.price * item.qty).toLocaleString()} THB
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#e2e2e2] px-6 py-5">
            <div className="flex justify-between items-center mb-1">
              <span className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] uppercase tracking-[0.1em]">Subtotal</span>
              <span className="font-['Hanken_Grotesk'] text-xs text-[#7e7576]">{totalPrice.toLocaleString()} THB</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.1em] text-[#1a1c1c]">Total</span>
              <span className="font-['Bodoni_Moda'] text-xl text-[#1a1c1c]">{totalPrice.toLocaleString()} THB</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity mb-2"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 border border-[#e2e2e2] text-[#7e7576] font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] hover:border-[#1a1c1c] hover:text-[#1a1c1c] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
