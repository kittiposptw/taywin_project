import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useProducts } from '../hooks/useProducts'
import { resolveImageUrl } from '../config/images'

const CATEGORIES = ['Oxford', 'Loafers', 'Boots']
const SIZES = ['40', '41', '42', '43', '44', '45']
const CATEGORY_STEMS = { Oxford: 'Oxford', Loafers: 'Loafer', Boots: 'Boot' }

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#e2e2e2] mb-4" style={{ aspectRatio: '4/5' }} />
      <div className="h-3 bg-[#e2e2e2] w-3/4 mb-2" />
      <div className="h-3 bg-[#e2e2e2] w-1/3" />
    </div>
  )
}

const PAGE_SIZE = 12

export default function CollectionsPage() {
  const { products, loading, error } = useProducts()
  const [activeCategories, setActiveCategories] = useState([])
  const [activeSizes, setActiveSizes] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  function toggleCategory(cat) {
    setActiveCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])
    setCurrentPage(1)
  }
  function toggleSize(size) {
    setActiveSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])
    setCurrentPage(1)
  }

  const filtered = products.filter((p) => {
    const categoryMatch = activeCategories.length === 0
      || activeCategories.some((cat) => p.name.toLowerCase().includes((CATEGORY_STEMS[cat] ?? cat).toLowerCase()))
    const sizeMatch = activeSizes.length === 0
      || activeSizes.some((s) => p.sizes.includes(s))
    return categoryMatch && sizeMatch
  })

  const activeFilterCount = activeCategories.length + activeSizes.length
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

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
                {loading ? '' : `${filtered.length} items`}
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
                    onClick={() => { setActiveCategories([]); setActiveSizes([]); setCurrentPage(1) }}
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

            {!loading && !error && products.length > 0 && filtered.length === 0 && (
              <div className="col-span-4 py-24 text-center">
                <p className="font-['Hanken_Grotesk'] text-sm text-[#7e7576]">No products match your filters.</p>
              </div>
            )}

            {!loading && !error && paginated.map((product) => (
              <Link to={`/product/${product.sku}`} key={product.sku} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={resolveImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c]">{product.name}</h3>
                  <span className="font-['Hanken_Grotesk'] text-sm text-[#7e7576]">{product.price.toLocaleString()} THB</span>
                </div>
              </Link>
            ))}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mb-24">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-[#e2e2e2] hover:border-[#1a1c1c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center border font-['Hanken_Grotesk'] text-xs font-semibold transition-colors ${page === currentPage ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : 'border-[#e2e2e2] text-[#1a1c1c] hover:border-[#1a1c1c]'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-[#e2e2e2] hover:border-[#1a1c1c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </nav>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
