import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGcD7m27WxTpESEnSiYVwOJDbhblkuypFxWg8UIflMV7vqj-nHmChHgY2KrbQnhWbGis_8g2NemkWPsUNPMsKnsiY3z_G9jFX7NzRsjxwQOBQZ0lkseZ5GrdALWxoFCpb2bwdJlloxTvrgbaRj8Sv3ENuZJkxAscOgpXbx0oYPZtyVAnx1d4PRa7qgNqP5XaHmJOWwOl5TXu43sOAAJociwf-6eEmeumdkRtpwUVPmaVdocCfB1h3nn7htfKh_oFnix3kDb_vtc-18'
const DERBY_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCDYnL1gCu_ifv6iCo31LdTT-g1uNFC3UVstgDcyXRZJnBYqs2c62jlbcd9Kv0RLH4bUTwUy1Q1VB922yzcoIncU9Y1-NFebES_tjaOFEBj8GeBdGy2ITtbtOeWWdyZN3MF0ixFJT1vTb5cLl5F59I8q6LZZi8_-b5MOqwJkIDcA0-kvHOm8BSlI0PT6-hwYe5DFhiv-bompZxmRvcFa1x4C4CTlO3cyzgdjTlA-qNohElvmC9smJ2HVdv-t73EonidsTP7lzjEUHM'
const LOAFER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxehGvyPvWLcGD_4PS5mPzFyqXQmPoPxAHBcPq6qXQaNonW5qXt03wS3PG4c11LcdaRH02IxJkLFWOHwoOKE_g-8jEBMxCLf9BifWm-UPWDMZP1lhOp2nMAFgonb7FvK6i8tj8Ai2Z_Q5tecAt2CVjF67nlcPhyo4-ywUlpKZBDacVuF4elEhfc3HhklABKpVdw048171jlvODR11MtS61y888rnPFJkKDCTxA66vBjoLzXi1dD93psNQDrk9bR_7kAkPGroxlfIYc'
const CHELSEA_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGak3o3Vnf-JeWi2UkJ45P2q2EbED9Pn8gm8pLbG7pAf1akv5yc5crPEr6ZzA2x0hti2xbU29q2dkZnpEbcm_ZE9OjI_0aQy6O2-vPJRVrt4Ij3ZSCzNKRJGMwVFFONCL1zMMPSBOCgZHORIZlDZHZ1S3vrMh2xQV0STPXCifysz6476vCeZ7WEQe6ig-jLR__iYWULwT84L_fDyQR3X-jn_C79U2DujO073kG_kabqwzj0Y5rla38KGNoylFxTL7US0anRAJkWii9'

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
          <img src={HERO_IMG} alt="Flagship Footwear" className="w-full h-full object-cover" />
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
            <img src={DERBY_IMG} alt="The Signature Derby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-[#081421] to-transparent">
              <span className="font-['Manrope'] text-xs text-[#f0c131] uppercase tracking-widest mb-2 block">Limited Edition</span>
              <h3 className="font-['EB_Garamond'] text-3xl text-[#d7e3f5]">The Signature Derby</h3>
              <p className="font-['Manrope'] text-base text-[#d1c5ad]">Hand-burnished calfskin leather.</p>
            </div>
          </Link>

          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 bg-[#1f2b38] group cursor-pointer overflow-hidden relative min-h-[290px]">
              <img src={LOAFER_IMG} alt="Suede Loafers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#081421]/20 group-hover:bg-[#081421]/0 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-['Manrope'] text-xs text-[#d7e3f5] uppercase tracking-widest">Suede Loafers</h4>
                <p className="text-[#f0c131] font-['Manrope'] text-base mt-1">$280</p>
              </div>
            </div>
            <div className="flex-1 bg-[#1f2b38] group cursor-pointer overflow-hidden relative min-h-[290px]">
              <img src={CHELSEA_IMG} alt="Chelsea Boot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
