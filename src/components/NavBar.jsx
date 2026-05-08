import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#081421]/90 backdrop-blur-md border-b border-[#4e4634]/30">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-['EB_Garamond'] text-3xl text-[#f0c131] tracking-tighter">
          TAYWIN ORIGINAL
        </Link>

        <div className="hidden md:flex gap-6">
          {['Collections', 'Heritage', 'Craftsmanship', 'Journal'].map((label) => (
            <Link
              key={label}
              to="/"
              className="font-['Manrope'] text-sm uppercase tracking-widest text-[#d1c5ad] hover:text-[#f0c131] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/checkout" className="text-[#f0c131] hover:opacity-80 transition-all p-1">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>shopping_bag</span>
          </Link>
          <button className="text-[#f0c131] hover:opacity-80 transition-all p-1">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>person</span>
          </button>
          <button className="md:hidden text-[#f0c131] p-1">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
