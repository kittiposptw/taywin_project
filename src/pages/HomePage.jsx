import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { IMAGES } from '../config/images'

const FEATURES = [
  { icon: 'architecture', title: 'Goodyear Welted', desc: 'The gold standard of construction. Built with a leather rib that allows for multiple resoling operations, ensuring a lifetime of service.' },
  { icon: 'workspace_premium', title: 'French Calfskin', desc: "Sourced from the D'Annonay tannery, our full-grain leather develops a unique character and rich patina over time." },
  { icon: 'brush', title: 'Hand-Burnished', desc: 'Each pair undergoes an 8-hour finishing process by our master artisans to achieve the perfect depth of color and satin sheen finish.' },
]

export default function HomePage() {
  return (
    <div className="bg-[#081421] text-[#d7e3f5] min-h-screen font-['Manrope']">
      <NavBar />

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#081421] via-[#081421]/60 to-transparent z-10" />
          <img src={IMAGES.hero} alt="Flagship Footwear" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1280px] mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="font-['Manrope'] text-xs text-[#f0c131] uppercase tracking-widest mb-4 block">Legacy in every step</span>
            <h1 className="font-['EB_Garamond'] text-[64px] leading-[1.1] tracking-[-0.02em] text-[#d7e3f5] mb-6">
              The Original<br />Choice
            </h1>
            <p className="font-['Manrope'] text-lg text-[#d1c5ad] mb-12 max-w-lg leading-relaxed">
              Discover footwear crafted for longevity. We blend traditional Thai craftsmanship with modern silhouettes to create icons that endure.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/product"
                className="bg-[#f0c131] text-[#241a00] font-['Manrope'] text-xs font-bold px-12 py-4 uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Shop Collection
              </Link>
              <button className="border border-[#f0c131] text-[#f0c131] font-['Manrope'] text-xs px-12 py-4 uppercase tracking-widest hover:bg-[#f0c131]/10 transition-all">
                View Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-['Manrope'] text-xs text-[#e8c33f] uppercase tracking-widest">Current Season</span>
            <h2 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mt-2">New Arrivals</h2>
          </div>
          <Link to="/product" className="font-['Manrope'] text-xs text-[#f0c131] uppercase border-b border-[#f0c131] pb-1">
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Link to="/product" className="md:col-span-8 group overflow-hidden bg-[#15202d] relative h-[600px] block">
            <img src={IMAGES.derby} alt="The Signature Derby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-[#081421] to-transparent">
              <span className="font-['Manrope'] text-xs text-[#f0c131] uppercase tracking-widest mb-2 block">Limited Edition</span>
              <h3 className="font-['EB_Garamond'] text-3xl text-[#d7e3f5]">The Signature Derby</h3>
              <p className="font-['Manrope'] text-base text-[#d1c5ad]">Hand-burnished calfskin leather.</p>
            </div>
          </Link>

          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 bg-[#1f2b38] group cursor-pointer overflow-hidden relative min-h-[290px]">
              <img src={IMAGES.loafer} alt="Suede Loafers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#081421]/20 group-hover:bg-[#081421]/0 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-['Manrope'] text-xs text-[#d7e3f5] uppercase tracking-widest">Suede Loafers</h4>
                <p className="text-[#f0c131] font-['Manrope'] text-base mt-1">$280</p>
              </div>
            </div>
            <div className="flex-1 bg-[#1f2b38] group cursor-pointer overflow-hidden relative min-h-[290px]">
              <img src={IMAGES.chelsea} alt="Chelsea Boot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#081421]/20 group-hover:bg-[#081421]/0 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-['Manrope'] text-xs text-[#d7e3f5] uppercase tracking-widest">Chelsea Boot</h4>
                <p className="text-[#f0c131] font-['Manrope'] text-base mt-1">$395</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="bg-[#040f1b] py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-['Manrope'] text-xs text-[#f0c131] uppercase tracking-widest">Our Promise</span>
            <h2 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mt-2">Built to Last</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-[#f0c131]" style={{ fontSize: 40 }}>{f.icon}</span>
                <h3 className="font-['EB_Garamond'] text-3xl text-[#d7e3f5]">{f.title}</h3>
                <p className="text-[#d1c5ad] font-['Manrope'] text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 max-w-[1280px] mx-auto px-6 text-center">
        <span className="font-['Manrope'] text-xs text-[#f0c131] uppercase tracking-widest">Begin Your Journey</span>
        <h2 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mt-2 mb-6">Discover the Heritage Oxford</h2>
        <Link
          to="/product"
          className="inline-block bg-[#f0c131] text-[#241a00] font-['Manrope'] text-xs font-bold px-16 py-4 uppercase tracking-widest hover:brightness-110 transition-all"
        >
          Shop Now
        </Link>
      </section>

      <Footer />
    </div>
  )
}
