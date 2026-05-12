import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const SIDEBAR_LINKS = [
  { label: 'Shop All', to: '/collections' },
  { label: 'Heritage', to: '/heritage' },
]

export default function NavBar({ transparent = false }) {
  const [open, setOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <>
      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar drawer */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[#1a1c1c] z-[70] flex flex-col p-8 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-14">
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.3em] uppercase text-white">EXPLORE</span>
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-5">
          {SIDEBAR_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white hover:translate-x-1 transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Top nav bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-4 transition-colors ${transparent ? 'bg-transparent border-transparent' : 'bg-[#f9f9f9] border-b border-[#e2e2e2]'}`}>
        <button onClick={() => setOpen(true)} className={`flex items-center gap-2 hover:opacity-60 transition-opacity ${transparent ? 'text-white' : 'text-[#1a1c1c]'}`}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu</span>
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.2em] uppercase hidden md:block">Menu</span>
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className={`font-['Bodoni_Moda'] text-xl tracking-[0.25em] ${transparent ? 'text-white' : 'text-[#1a1c1c]'}`}>TAYWIN</span>
        </Link>

        <div className={`flex items-center gap-5 ${transparent ? 'text-white' : 'text-[#1a1c1c]'}`}>
          <button className="hover:opacity-60 transition-opacity hidden md:block">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>search</span>
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>person</span>
          </button>
          <button onClick={openCart} className="relative hover:opacity-60 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-[9px] font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  )
}
