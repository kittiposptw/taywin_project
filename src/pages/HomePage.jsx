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
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />

      {/* Hero — split column: text left, editorial photo right */}
      <section className="pt-[72px] min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left: text content */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 lg:py-0 bg-[#f9f9f9]">
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-6 block">
            Spring / Summer 2025
          </span>
          <h1 className="font-['Bodoni_Moda'] italic text-[64px] md:text-[80px] leading-[0.95] text-[#1a1c1c] mb-8">
            The<br />Original<br />Choice.
          </h1>
          <p className="font-['Hanken_Grotesk'] text-base text-[#4c4546] mb-10 max-w-sm leading-relaxed">
            Discover footwear crafted for longevity. Traditional Thai craftsmanship with modern silhouettes — icons that endure.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/collections" className="bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 hover:opacity-80 transition-opacity">
              Shop Collection
            </Link>
            <Link to="/heritage" className="border border-[#1a1c1c] text-[#1a1c1c] font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 hover:bg-[#1a1c1c]/5 transition-colors">
              View Heritage
            </Link>
          </div>
        </div>

        {/* Right: editorial photo */}
        <div className="relative overflow-hidden min-h-[60vh] lg:min-h-0">
          <img src={IMAGES.derby} alt="New Collection" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Two editorial panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[640px]">
        {/* Left panel — dark, smaller */}
        <div className="relative overflow-hidden bg-[#1a1c1c] p-10 flex flex-col justify-end min-h-[400px] md:min-h-0">
          <img src={IMAGES.chelsea} alt="The Archive" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
          <div className="relative z-10">
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-3 block">
              Seasonal Edit
            </span>
            <h2 className="font-['Bodoni_Moda'] italic text-4xl text-white mb-3">The Archive</h2>
            <p className="font-['Hanken_Grotesk'] text-sm text-white/60 max-w-xs leading-relaxed mb-6">
              Heritage silhouettes, revisited for the modern wardrobe. Enduring craft in timeless forms.
            </p>
            <Link to="/collections" className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors">
              Explore
            </Link>
          </div>
        </div>

        {/* Right panel — lifestyle photo */}
        <div className="relative overflow-hidden bg-[#f2f2f2] p-10 flex flex-col justify-end min-h-[400px] md:min-h-0">
          <img src={IMAGES.loafer} alt="Atelier Craft" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10">
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-white/70 mb-3 block">
              New Arrivals
            </span>
            <h2 className="font-['Bodoni_Moda'] italic text-4xl text-white">Atelier Craft</h2>
          </div>
        </div>
      </section>

      {/* Editorial text section — "The Art of Restraint" */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-16 py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-6 block">
            The Philosophy
          </span>
          <h2 className="font-['Bodoni_Moda'] italic text-[52px] leading-[1.05] text-[#1a1c1c] mb-8">
            The Art of<br />Restraint.
          </h2>
          <p className="font-['Hanken_Grotesk'] text-base text-[#4c4546] leading-relaxed mb-8 max-w-md">
            True luxury is never about excess. It is found in the precision of a single stitch, the weight of a perfectly balanced last, and the confidence of a shoe that requires no introduction.
          </p>
          <Link to="/heritage" className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] border-b border-[#1a1c1c] pb-0.5 hover:opacity-60 transition-opacity">
            Our Story
          </Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-[#f2f2f2]">
          <img src={IMAGES.oxfordMain} alt="Craftsmanship detail" className="w-full h-full object-cover grayscale" />
        </div>
      </section>

      {/* Crafted for Longevity — features */}
      <section className="bg-[#f3f3f3] border-t border-[#e2e2e2] py-24">
        <div className="max-w-[1440px] mx-auto px-10 md:px-16">
          <div className="border-b border-[#e2e2e2] pb-12 mb-16 flex justify-between items-end">
            <div>
              <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-3 block">Our Promise</span>
              <h2 className="font-['Bodoni_Moda'] text-[52px] text-[#1a1c1c] leading-none">Crafted for<br />Longevity.</h2>
            </div>
            <Link to="/product" className="hidden md:block font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] border-b border-[#1a1c1c] pb-0.5 hover:opacity-60 transition-opacity">
              Shop Now
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-5">
                <span className="material-symbols-outlined text-[#1a1c1c]" style={{ fontSize: 28 }}>{f.icon}</span>
                <div className="w-8 h-px bg-[#e2e2e2]" />
                <h3 className="font-['Bodoni_Moda'] text-2xl text-[#1a1c1c]">{f.title}</h3>
                <p className="font-['Hanken_Grotesk'] text-sm text-[#4c4546] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-16 py-24 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#e2e2e2]">
        <div>
          <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-2 block">Begin Your Journey</span>
          <h2 className="font-['Bodoni_Moda'] italic text-[42px] text-[#1a1c1c]">Discover the Heritage Oxford</h2>
        </div>
        <Link to="/product" className="shrink-0 bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] px-12 py-4 hover:opacity-80 transition-opacity">
          Shop Now
        </Link>
      </section>

      <Footer />
    </div>
  )
}
