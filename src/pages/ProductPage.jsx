import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useProduct } from '../hooks/useProducts'
import { IMAGES } from '../config/images'

const ACCESSORIES = [
  { name: 'The Heritage Belt', price: '$115.00', img: IMAGES.accessories.belt },
  { name: 'Merino Rib Socks', price: '$35.00', img: IMAGES.accessories.socks },
  { name: 'Atelier Polish Kit', price: '$85.00', img: IMAGES.accessories.polishKit },
  { name: 'The Artisan Portfolio', price: '$550.00', img: IMAGES.accessories.portfolio },
]

export default function ProductPage() {
  const { product, loading } = useProduct()
  const [selectedSize, setSelectedSize] = useState(null)
  const [openSection, setOpenSection] = useState(null)

  const accordionSections = [
    { id: 'specs', label: 'Craftsmanship Specs' },
    { id: 'care', label: 'Material Care' },
    { id: 'shipping', label: 'Shipping & Heritage' },
  ]

  if (!product) {
    return (
      <div className="bg-[#081421] min-h-screen flex items-center justify-center">
        <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#d1c5ad]">
          {loading ? 'Loading…' : 'Product not found'}
        </span>
      </div>
    )
  }

  const sizes = product.sizes.length > 0 ? product.sizes : ['7', '8', '9', '10', '11']

  return (
    <div className="bg-[#081421] text-[#d7e3f5] min-h-screen font-['Manrope']">
      <NavBar />

      <main className="pt-[80px]">
        {/* Product Section */}
        <section className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/5] bg-[#15202d] overflow-hidden">
              <img src={product.imageUrl || IMAGES.oxfordMain} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#15202d] overflow-hidden">
              <img src={IMAGES.oxfordHeel} alt="Heel detail" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#15202d] overflow-hidden">
              <img src={IMAGES.oxfordTop} alt="Top view" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] h-fit">
            <div className="flex flex-col gap-6">
              <div>
                {product.series && (
                  <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#f0c131] mb-2 block">{product.series}</span>
                )}
                <h1 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mb-2">{product.name}</h1>
                <p className="font-['Manrope'] text-lg text-[#d1c5ad]">${product.price.toFixed(2)} USD</p>
              </div>

              <div className="h-px bg-[#4e4634]/30 w-full" />

              <p className="font-['Manrope'] text-base text-[#d1c5ad] leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-['Manrope'] text-xs uppercase tracking-widest">Select Size</span>
                  <button className="text-[#f0c131] font-['Manrope'] text-xs underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {sizes.map((size) => {
                    const selected = selectedSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 text-xs font-['Manrope'] font-semibold uppercase border transition-all
                          ${selected ? 'border-[#f0c131] bg-[#2a3643] text-[#f0c131]' :
                            'border-[#4e4634] hover:border-[#f0c131] text-[#d7e3f5]'}`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <Link
                  to={selectedSize ? '/checkout' : '#'}
                  onClick={(e) => { if (!selectedSize) e.preventDefault() }}
                  className={`w-full py-6 font-['Manrope'] text-xs font-bold uppercase tracking-widest transition-all text-center active:scale-[0.98]
                    ${selectedSize ? 'bg-[#f0c131] text-[#3e2e00] hover:opacity-90' : 'bg-[#f0c131]/40 text-[#3e2e00]/60 cursor-not-allowed'}`}
                >
                  {selectedSize ? 'Add to Bag' : 'Select a Size'}
                </Link>
                <button className="w-full py-6 border border-[#f0c131] text-[#f0c131] font-['Manrope'] text-xs uppercase tracking-widest hover:bg-[#f0c131]/10 transition-all">
                  In-Store Fitting
                </button>
              </div>

              {/* Accordion */}
              <div className="mt-4 border-t border-[#4e4634]/30">
                {accordionSections.map((s) => (
                  <div key={s.id} className="border-b border-[#4e4634]/30">
                    <button
                      onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                      className="py-4 flex justify-between items-center w-full group"
                    >
                      <span className="font-['Manrope'] text-xs uppercase tracking-widest group-hover:text-[#f0c131] transition-colors">{s.label}</span>
                      <span className="material-symbols-outlined text-sm transition-transform" style={{ transform: openSection === s.id ? 'rotate(180deg)' : 'rotate(0)' }}>
                        expand_more
                      </span>
                    </button>
                    {openSection === s.id && (
                      <div className="pb-4 text-[#d1c5ad] font-['Manrope'] text-sm leading-relaxed">
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
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="bg-[#15202d] rounded-sm p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img src={IMAGES.careKit} alt="Shoe care essentials" className="w-full h-[400px] object-cover" />
            </div>
            <div className="md:w-1/2 flex flex-col gap-6">
              <h2 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5]">Preserving the Original</h2>
              {[
                { num: '01', title: 'Rest Between Wears', desc: 'Allow 24 hours between wearing to let the leather breathe and dry naturally.' },
                { num: '02', title: 'Cedar Trees', desc: 'Use aromatic cedar shoe trees to maintain the shape and absorb moisture.' },
                { num: '03', title: 'Hydration', desc: 'Apply a high-quality leather cream once a month to prevent cracking and maintain suppleness.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <span className="font-['EB_Garamond'] text-3xl text-[#f0c131] opacity-50">{step.num}</span>
                  <div>
                    <h4 className="font-['Manrope'] text-xs uppercase tracking-widest mb-1">{step.title}</h4>
                    <p className="text-[#d1c5ad] font-['Manrope'] text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete the Look */}
        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#f0c131]">Curation</span>
            <h2 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mt-2">Complete The Look</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACCESSORIES.map((acc) => (
              <div key={acc.name} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#15202d] overflow-hidden mb-4">
                  <img src={acc.img} alt={acc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-['Manrope'] text-base text-[#d7e3f5] group-hover:text-[#f0c131] transition-colors">{acc.name}</h3>
                <p className="font-['Manrope'] text-xs text-[#d1c5ad]">{acc.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
