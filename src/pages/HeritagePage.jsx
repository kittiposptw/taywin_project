import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { IMAGES, resolveImageUrl } from '../config/images'
import { useProducts } from '../hooks/useProducts'

const {
  atelier1: IMG_ATELIER_1,
  atelier2: IMG_ATELIER_2,
  processDesign: IMG_PROCESS_DESIGN,
  processLeather: IMG_PROCESS_LEATHER,
  processAssembly: IMG_PROCESS_ASSEMBLY,
  timeline1984: IMG_TIMELINE_1984,
  timeline2004: IMG_TIMELINE_2004,
  timelineToday: IMG_TIMELINE_TODAY,
} = IMAGES.heritage

export default function HeritagePage() {
  const { products } = useProducts()
  const curated = products.slice(0, 3)

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />

      <main className="pt-[72px]">

        {/* Hero — split: left editorial photo, right headline + text */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
          {/* Left: editorial photo */}
          <div className="relative overflow-hidden bg-[#1a1c1c] min-h-[400px] lg:min-h-0">
            <img
              src={IMG_ATELIER_1}
              alt="TAYWIN Heritage"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>

          {/* Right: headline + description + CTA */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-20 lg:py-0 border-l border-[#e2e2e2]">
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-6 block">
              Established 1984
            </span>
            <h1 className="font-['Bodoni_Moda'] italic text-[48px] md:text-[56px] leading-[1.05] text-[#1a1c1c] mb-8">
              Modern Heritage:<br />The Architecture<br />of Form
            </h1>
            <p className="font-['Hanken_Grotesk'] text-base text-[#4c4546] leading-relaxed mb-10 max-w-md">
              Four decades of uncompromising dedication to the art of shoemaking. Every TAYWIN is a testament to the belief that true style is a legacy, not a trend.
            </p>
            <Link
              to="/collections"
              className="inline-block bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 hover:opacity-80 transition-opacity w-fit"
            >
              Shop the Collection
            </Link>
          </div>
        </section>

        {/* Standing on the shoulders — text + smaller image */}
        <section className="max-w-[1440px] mx-auto px-10 md:px-16 py-24 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576]">Our Story</span>
            <h2 className="font-['Bodoni_Moda'] italic text-4xl text-[#1a1c1c] leading-tight">
              Standing on the shoulders<br />of remarkable craft.
            </h2>
            <div className="w-12 h-px bg-[#1a1c1c]" />
            <p className="font-['Hanken_Grotesk'] text-base text-[#4c4546] leading-[1.8] max-w-lg">
              Located in the heart of the historic district, our atelier serves as the beating heart of TAYWIN. It is here that raw, ethically sourced hides are transformed into footwear that defies time. The smell of aged leather and the rhythmic sound of heavy machinery create a symphony of production unchanged for generations.
            </p>
            <p className="font-['Hanken_Grotesk'] text-base text-[#4c4546] leading-[1.8] max-w-lg">
              Each pair passes through the hands of at least twelve artisans before it ever touches the floor of our showroom. We do not make shoes quickly. We make them right.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={IMG_ATELIER_2} alt="Atelier" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img src={IMG_PROCESS_LEATHER} alt="Leather selection" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </div>
        </section>

        {/* Process items — horizontal list */}
        <section className="border-t border-[#e2e2e2] bg-[#f3f3f3]">
          <div className="max-w-[1440px] mx-auto px-10 md:px-16 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e2e2]">
              {[
                { step: '01', title: 'Design & Pattern', img: IMG_PROCESS_DESIGN, desc: 'Every silhouette begins with a hand-drawn pattern refined over dozens of iterations.' },
                { step: '02', title: 'Leather Selection', img: IMG_PROCESS_LEATHER, desc: 'We source exclusively from tanneries that uphold the highest environmental and quality standards.' },
                { step: '03', title: 'Goodyear Assembly', img: IMG_PROCESS_ASSEMBLY, desc: 'The Goodyear welt construction allows for resoling — extending the life of each pair indefinitely.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 px-8 py-8 first:pl-0 last:pr-0">
                  <span className="font-['Bodoni_Moda'] italic text-4xl text-[#1a1c1c]/15 shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1c1c] mb-2">{item.title}</h3>
                    <p className="font-['Hanken_Grotesk'] text-sm text-[#4c4546] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Large italic quote */}
        <section className="py-28 px-10 md:px-16 text-center border-b border-[#e2e2e2]">
          <blockquote className="font-['Bodoni_Moda'] italic text-[42px] md:text-[60px] text-[#1a1c1c] leading-[1.1] max-w-[900px] mx-auto">
            "Elegance is not being noticed,<br />but being remembered."
          </blockquote>
          <cite className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mt-8 block not-italic">
            — Founding Master Craftsman, TAYWIN Original Style
          </cite>
        </section>

        {/* Curated Essentials — 3-column product grid */}
        <section className="max-w-[1440px] mx-auto px-10 md:px-16 py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-[#7e7576] mb-2 block">From the Collection</span>
              <h2 className="font-['Bodoni_Moda'] text-4xl text-[#1a1c1c]">Curated Essentials</h2>
            </div>
            <Link to="/collections" className="hidden md:block font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1c1c] border-b border-[#1a1c1c] pb-0.5 hover:opacity-60 transition-opacity">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curated.map((item) => (
              <Link to={`/product/${item.sku}`} key={item.sku} className="group">
                <div className="aspect-[4/5] bg-[#f2f2f2] overflow-hidden mb-4">
                  <img src={resolveImageUrl(item.imageUrl)} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c] group-hover:opacity-60 transition-opacity">{item.name}</h3>
                <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">{item.series} · ${item.price}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* The TAYWIN Manifesto — editorial text block */}
        <section className="bg-[#1a1c1c] py-24 px-10 md:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-6 block">Our Beliefs</span>
              <h2 className="font-['Bodoni_Moda'] italic text-5xl text-white leading-tight">
                The TAYWIN<br />Manifesto
              </h2>
            </div>
            <div className="flex flex-col gap-6 pt-2 md:pt-14">
              {[
                "We believe a shoe should outlast its owner's best decade.",
                "We believe craftsmanship is the highest form of respect for the wearer.",
                "We believe that trend is temporary. Form, material, and construction are permanent.",
                "We do not make shoes to be replaced. We make them to be resoled.",
              ].map((line, i) => (
                <div key={i} className="flex gap-5 border-b border-white/10 pb-6 last:border-0">
                  <span className="font-['Bodoni_Moda'] italic text-xl text-white/20 shrink-0">0{i + 1}</span>
                  <p className="font-['Hanken_Grotesk'] text-sm text-white/70 leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
