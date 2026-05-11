import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useProduct } from '../hooks/useProducts'
import { IMAGES, resolveImageUrl } from '../config/images'

const ACCESSORIES = [
  { name: 'The Heritage Belt', price: '$115.00', img: IMAGES.accessories.belt },
  { name: 'Merino Rib Socks', price: '$35.00', img: IMAGES.accessories.socks },
  { name: 'Atelier Polish Kit', price: '$85.00', img: IMAGES.accessories.polishKit },
  { name: 'The Artisan Portfolio', price: '$550.00', img: IMAGES.accessories.portfolio },
]

export default function ProductPage() {
  const { sku } = useParams()
  const { product, loading } = useProduct(sku)
  const [selectedSize, setSelectedSize] = useState(null)
  const [openSection, setOpenSection] = useState(null)

  const accordionSections = [
    { id: 'specs', label: 'Craftsmanship Specs' },
    { id: 'care', label: 'Material Care' },
    { id: 'shipping', label: 'Shipping & Heritage' },
  ]

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

  const sizes = product.sizes.length > 0 ? product.sizes : ['7', '8', '9', '10', '11']

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />

      <main className="pt-[72px]">
        {/* Product Section */}
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[4/5] bg-[#f2f2f2] overflow-hidden">
              <img src={resolveImageUrl(product.imageUrl) || IMAGES.oxfordMain} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#f2f2f2] overflow-hidden">
              <img src={IMAGES.oxfordHeel} alt="Heel detail" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#f2f2f2] overflow-hidden">
              <img src={IMAGES.oxfordTop} alt="Top view" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-[100px] h-fit">
            <div className="flex flex-col gap-6">
              <div>
                {product.series && (
                  <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#7e7576] mb-2 block">{product.series}</span>
                )}
                <h1 className="font-['Bodoni_Moda'] text-5xl text-[#1a1c1c] mb-2">{product.name}</h1>
                <p className="font-['Hanken_Grotesk'] text-xl text-[#1a1c1c] font-medium">${product.price.toFixed(2)} USD</p>
              </div>

              <div className="h-px bg-[#e2e2e2] w-full" />

              <p className="font-['Hanken_Grotesk'] text-sm text-[#4c4546] leading-relaxed">{product.description}</p>

              {/* Size Selection */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em]">Select Size</span>
                  <button className="font-['Hanken_Grotesk'] text-xs underline text-[#7e7576] hover:text-[#1a1c1c] transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizes.map((size) => {
                    const selected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 text-xs font-['Hanken_Grotesk'] font-semibold border transition-all ${selected ? 'border-[#1a1c1c] bg-[#1a1c1c] text-white' : 'border-[#e2e2e2] hover:border-[#1a1c1c] text-[#1a1c1c]'}`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <Link
                  to={selectedSize ? '/checkout' : '#'}
                  onClick={(e) => { if (!selectedSize) e.preventDefault() }}
                  className={`w-full py-5 font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] transition-all text-center ${selectedSize ? 'bg-[#1a1c1c] text-white hover:opacity-80' : 'bg-[#e2e2e2] text-[#7e7576] cursor-not-allowed'}`}
                >
                  {selectedSize ? 'Add to Bag' : 'Select a Size'}
                </Link>
                <button className="w-full py-5 border border-[#1a1c1c] text-[#1a1c1c] font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#1a1c1c]/5 transition-colors">
                  In-Store Fitting
                </button>
              </div>

              {/* Accordion */}
              <div className="mt-2 border-t border-[#e2e2e2]">
                {accordionSections.map((s) => (
                  <div key={s.id} className="border-b border-[#e2e2e2]">
                    <button
                      onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                      className="py-4 flex justify-between items-center w-full group"
                    >
                      <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] group-hover:opacity-60 transition-opacity">{s.label}</span>
                      <span className="material-symbols-outlined text-sm transition-transform" style={{ transform: openSection === s.id ? 'rotate(180deg)' : 'rotate(0)' }}>
                        expand_more
                      </span>
                    </button>
                    {openSection === s.id && (
                      <div className="pb-4 text-[#4c4546] font-['Hanken_Grotesk'] text-sm leading-relaxed">
                        {s.id === 'specs' && 'Upper: Full-grain French calfskin. Lining: Vegetable-tanned calf leather. Sole: Double leather sole with rubber heel cap. Construction: Goodyear welt. Last: Classic Oxford last with medium toe box.'}
                        {s.id === 'care' && 'Clean with a damp cloth after each wear. Apply leather cream monthly. Use cedar shoe trees when not worn. Avoid prolonged exposure to water. Polish with a high-quality wax for mirror shine.'}
                        {s.id === 'shipping' && 'Complimentary standard shipping (5–7 days) or Priority Atelier Delivery (2–3 days, $25). All orders ship in our heritage box with a cotton dust bag. Free returns within 30 days.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Care Guide */}
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16">
          <div className="bg-[#f3f3f3] p-12 flex flex-col md:flex-row gap-12 items-center border border-[#e2e2e2]">
            <div className="md:w-1/2">
              <img src={IMAGES.careKit} alt="Shoe care essentials" className="w-full h-[400px] object-cover grayscale" />
            </div>
            <div className="md:w-1/2 flex flex-col gap-8">
              <div>
                <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#7e7576] mb-3 block">Care Guide</span>
                <h2 className="font-['Bodoni_Moda'] text-4xl text-[#1a1c1c]">Preserving the Original</h2>
              </div>
              {[
                { num: '01', title: 'Rest Between Wears', desc: 'Allow 24 hours between wearing to let the leather breathe and dry naturally.' },
                { num: '02', title: 'Cedar Trees', desc: 'Use aromatic cedar shoe trees to maintain the shape and absorb moisture.' },
                { num: '03', title: 'Hydration', desc: 'Apply a high-quality leather cream once a month to prevent cracking and maintain suppleness.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-5 border-b border-[#e2e2e2] pb-5 last:border-0 last:pb-0">
                  <span className="font-['Bodoni_Moda'] italic text-2xl text-[#1a1c1c]/20">{step.num}</span>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] mb-1">{step.title}</h4>
                    <p className="font-['Hanken_Grotesk'] text-sm text-[#4c4546]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete the Look */}
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 border-t border-[#e2e2e2]">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#7e7576] mb-2 block">Curation</span>
              <h2 className="font-['Bodoni_Moda'] text-4xl text-[#1a1c1c]">Complete The Look</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACCESSORIES.map((acc) => (
              <div key={acc.name} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#f2f2f2] overflow-hidden mb-3">
                  <img src={acc.img} alt={acc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">{acc.name}</h3>
                <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">{acc.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
