import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const MAIN_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-99_M2DW3ANBKgyxsiXdYwhQLzT2Yca8xzuBWPOMZner5yZ0in8ZlS5hCVaNiuUYXl1TbioKaClxIwE6D17EqaraUxk2hZkgCCa41_E--S7CQpZT8paPMGdlGd5oA_U-qp3NIvxH8-ZMstbpuwBKg4o9pABRluOo-DhQYG1wo08U6eYJaCN67NtBcaOqHiQAq3A2EJU9CqmDSUy_FarVwR93sGCYxyrOGX-F8V2PxDuzXgILOXfT02qm-QAfaYycOYNR07kpq5vY'
const HEEL_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGak3o3Vnf-JeWi2UkJ45P2q2EbED9Pn8gm8pLbG7pAf1akv5yc5crPEr6ZzA2x0hti2xbU29q2dkZnpEbcm_ZE9OjI_0aQy6O2-vPJRVrt4Ij3ZSCzNKRJGMwVFFONCL1zMMPSBOCgZHORIZlDZHZ1S3vrMh2xQV0STPXCifysz6476vCeZ7WEQe6ig-jLR__iYWULwT84L_fDyQR3X-jn_C79U2DujO073kG_kabqwzj0Y5rla38KGNoylFxTL7US0anRAJkWii9'
const TOP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8sUBODg5GDiP0zK-offoFZ2ggzV1AwDYGX-8HVp9FWcmYkxSDl98iGR7VIJHIcv8bJj7KSR68UqvSbP-EJ4VOFR5X4R3sGpqO3gXHt7Sc52Zk5sIfbzI-c4tBDz_0NLGEpEA_c02S0K29p76JrRpkbI1OEPLOmCNfg8Ggr4VXz2JvfhxFCh8ZkrNMYOLjvDABGfPXWCOgv_S3l1zl3BXFvY0NzHx6Ev4oa7f3Z1zHX3x5eEz8v3HWEO5yXx8r4KdMhiS-x3Gg'
const CARE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVxwwS2Nm_SAzWOF8Fbd1nhDi6szTYpI-k7IAFoKQjeEf1qZwEhGDOKdCJrpvtP-M5Uft77w9JThPpqVaIJnvIMFDPDV_Z4crp65L2luicOl5ftQMQIFJt306-CJiJMKVPzjussRmWOocPVTX7vxr6Rp-qHw0ZzGqomiqzXdWg6w2FmZQWnzQzN90pFMnB_4FqxwQJ3Od4t0PS9MhsClEkhMyBiKl6bF6EDNHveKzl7yGSGu0hIeHr4kuxdxUASd3SRps41N5Oo-cB'

const ACCESSORIES = [
  { name: 'The Heritage Belt', price: '$115.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYYEr3flKxaPsvDuHHvQIeeNNQEy2RXmCPSpFOP5cYNg2hdUwOmP5dEmZaatcPObHRra5-nbCEqbVXEWqiL82C5LOK0Zc3wsyNnOzsllO8cCu7xH1YH30fWKZ4N1PAELQko0-M9uRwgO6ckULqBN8HihXUlLT-G1-7Ur3paxUjItsu0I8L4r5lBCZ-LenVD9qd5SqNyJ6k03maRRHbafJeXJGkVP-ekNDeH-byxMDrDVhypZvKzF5ExBMa-jMSGf4lx2_sB-CrjtU' },
  { name: 'Merino Rib Socks', price: '$35.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSzzxeV4K1VW406n5nBG1uVfTblosLdwkNGWc39KRabvz0pCrHaD692WVePy2QpvdQ8UCrZ6oQWDjoD0UVlZijeydgaA3_HRsUGRGjN8LNM4ZzvRR9ty8pHFXhhCuplFuN0RHoSh09h7C4g5pVx7ETxPS6wdVNavDTWToH3kQZO2IgXmPV2fnbC8Ob8GbsHTnPJuiobNgv0ptW3BYFJYGqvVILHeO06sNjJXA9xhbYZFDV1ak3fal_w8TU9k21xc_8EKyM9rLRWj9X' },
  { name: 'Atelier Polish Kit', price: '$85.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU4Wa4OqcBncSdP42ptzaPGJ4464vPnlaycgam6W_vaYW2O5lRX9qNj_oC5UHS1k14WtHq4I4rv0skPkrumccoFejS3jXE54ppawDbMV-o88NWsnIfe1lZ1aP-AwCtl-B_WZy0xCSxgnHDpE0SfflogKjx5BNkJPLrH9xPRzF9Lp8Ve6xxXbVNEQNOvBShZcl7jTZ9MMCnVjeJ7mYy1hB8ZXpRlkPOdMBqyhZvJma3iPMuxrQdvgpGjQp-JeEsi8eWJ6IkQZeDlSqi' },
  { name: 'The Artisan Portfolio', price: '$550.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNzmGC2vdsUXg2anobU18ZgsSPHp6O1RQv2IZyJzxeTBRbyuB9Qrf8kSqs8PhZ4uuml16OLRXwGhz1vJl24jBmHGlMumSH0DPf6e0Kzu_fEv_1PJgIozNM-QW8ZhseVX0MOKCCmQNO_MGqpsFj8V0TC4ZVOymOTSIv3QEsNnauMgRmaWT_Zd8qxF9WHKjr3e53cDNtOR0jaQD9oNd1hy40DP5-bGblRbEwemgeXf-D2Drg16I9JS19sVmTK3Oz_PLMMohnV1RfSlE' },
]

const SIZES = ['7', '8', '9', '10', '11', '12']

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('9')
  const [openSection, setOpenSection] = useState(null)

  const accordionSections = [
    { id: 'specs', label: 'Craftsmanship Specs' },
    { id: 'care', label: 'Material Care' },
    { id: 'shipping', label: 'Shipping & Heritage' },
  ]

  return (
    <div className="bg-[#081421] text-[#d7e3f5] min-h-screen font-['Manrope']">
      <NavBar />

      <main className="pt-[80px]">
        {/* Product Section */}
        <section className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/5] bg-[#15202d] overflow-hidden">
              <img src={MAIN_IMG} alt="Heritage Oxford" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#15202d] overflow-hidden">
              <img src={HEEL_IMG} alt="Heel detail" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-[#15202d] overflow-hidden">
              <img src={TOP_IMG} alt="Top view" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] h-fit">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-['Manrope'] text-xs uppercase tracking-widest text-[#f0c131] mb-2 block">The Foundation Series</span>
                <h1 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5] mb-2">The Heritage Oxford</h1>
                <p className="font-['Manrope'] text-lg text-[#d1c5ad]">$425.00 USD</p>
              </div>

              <div className="h-px bg-[#4e4634]/30 w-full" />

              <p className="font-['Manrope'] text-base text-[#d1c5ad] leading-relaxed">
                A definitive statement in traditional shoemaking. Crafted from single-batch full-grain calfskin, the Heritage Oxford features a traditional Goodyear welt construction that ensures decades of wear and the ability to be resoled indefinitely.
              </p>

              {/* Size Selection */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-['Manrope'] text-xs uppercase tracking-widest">Select Size</span>
                  <button className="text-[#f0c131] font-['Manrope'] text-xs underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {SIZES.map((size) => {
                    const unavailable = size === '12'
                    const selected = selectedSize === size
                    return (
                      <button
                        key={size}
                        disabled={unavailable}
                        onClick={() => !unavailable && setSelectedSize(size)}
                        className={`py-4 text-xs font-['Manrope'] font-semibold uppercase border transition-all
                          ${unavailable ? 'border-[#4e4634]/30 text-[#d7e3f5] opacity-40 cursor-not-allowed' :
                            selected ? 'border-[#f0c131] bg-[#2a3643] text-[#f0c131]' :
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
                  to="/checkout"
                  className="w-full py-6 bg-[#f0c131] text-[#3e2e00] font-['Manrope'] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all text-center active:scale-[0.98]"
                >
                  Add to Bag
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
              <img src={CARE_IMG} alt="Shoe care essentials" className="w-full h-[400px] object-cover" />
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
