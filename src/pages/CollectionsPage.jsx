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
