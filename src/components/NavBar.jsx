import { useState } from 'react'
import { Link } from 'react-router-dom'

const SIDEBAR_LINKS = [
  { label: 'Shop', to: '/collections' },
  { label: 'New Arrivals', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Heritage', to: '/heritage' },
  { label: 'Craftsmanship', to: '/heritage' },
  { label: 'Journal', to: '/' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f9] border-b border-[#e2e2e2] flex justify-between items-center px-8 md:px-12 py-4">
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 hover:opacity-60 transition-opacity">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>menu</span>
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.2em] uppercase hidden md:block">Menu</span>
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-['Bodoni_Moda'] text-xl tracking-[0.25em] text-[#1a1c1c]">TAYWIN</span>
        </Link>

        <div className="flex items-center gap-5">
          <button className="hover:opacity-60 transition-opacity hidden md:block">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>search</span>
          </button>
          <button className="hover:opacity-60 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>person</span>
          </button>
          <Link to="/checkout" className="hover:opacity-60 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>shopping_bag</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
