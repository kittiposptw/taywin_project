import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { IMAGES } from '../config/images'

export default function CheckoutPage() {
  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Hanken_Grotesk']">
      <NavBar />

      <main className="pt-[72px] pb-20">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            {/* Left: Form */}
            <div className="lg:col-span-7 space-y-12">
              {/* Contact */}
              <section>
                <h2 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] mb-1">Contact Information</h2>
                <div className="h-px bg-[#e2e2e2] mb-6" />
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Email Address</label>
                    <input className="checkout-input" placeholder="email@example.com" type="email" />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] mb-1">Shipping Address</h2>
                <div className="h-px bg-[#e2e2e2] mb-6" />
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">First Name</label>
                      <input className="checkout-input" placeholder="First Name" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Last Name</label>
                      <input className="checkout-input" placeholder="Last Name" type="text" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Address</label>
                    <input className="checkout-input" placeholder="Street Address" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Apartment, Suite, Etc. (Optional)</label>
                    <input className="checkout-input" placeholder="Apt, Suite, Unit" type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">City</label>
                      <input className="checkout-input" placeholder="City" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Postal Code</label>
                      <input className="checkout-input" placeholder="Postal Code" type="text" />
                    </div>
                  </div>
                </form>
              </section>

              {/* Payment */}
              <section>
                <h2 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] mb-1">Payment</h2>
                <div className="h-px bg-[#e2e2e2] mb-6" />
                <div className="border border-[#e2e2e2] p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#e2e2e2] pb-4">
                    <span className="font-['Hanken_Grotesk'] text-sm text-[#4c4546]">Credit Card</span>
                    <span className="material-symbols-outlined text-[#7e7576]" style={{ fontSize: 20 }}>credit_card</span>
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Card Number</label>
                    <input className="checkout-input" placeholder="0000 0000 0000 0000" type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Expiration Date (MM/YY)</label>
                      <input className="checkout-input" placeholder="MM/YY" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] block">Security Code</label>
                      <input className="checkout-input" placeholder="CVV" type="text" />
                    </div>
                  </div>
                </div>
              </section>

              <button type="button" className="w-full py-5 bg-[#1a1c1c] text-white font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                Complete Purchase
              </button>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <aside className="lg:sticky lg:top-24">
                <h2 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1c1c] mb-1">Order Summary</h2>
                <div className="h-px bg-[#e2e2e2] mb-6" />

                {/* Cart Items */}
                <div className="space-y-6 mb-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-24 shrink-0 bg-[#f2f2f2] overflow-hidden">
                      <img src={IMAGES.checkoutThumb} alt="The Heritage Oxford" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1a1c1c]">The Heritage Oxford</h4>
                        <p className="font-['Hanken_Grotesk'] text-xs text-[#7e7576] mt-0.5">Size 42 / Black</p>
                      </div>
                      <p className="font-['Hanken_Grotesk'] text-sm font-semibold text-[#1a1c1c]">$495.00</p>
                    </div>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="flex gap-2 mb-6">
                  <input className="checkout-input text-sm flex-1" placeholder="Discount Code" type="text" />
                  <button className="px-4 py-2 border border-[#1a1c1c] font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#1a1c1c] hover:text-white transition-colors whitespace-nowrap">
                    Apply
                  </button>
                </div>

                <div className="h-px bg-[#e2e2e2] mb-5" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Subtotal', value: '$495.00' },
                    { label: 'Shipping', value: 'Calculated at next step' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="font-['Hanken_Grotesk'] text-sm text-[#4c4546]">{row.label}</span>
                      <span className="font-['Hanken_Grotesk'] text-sm text-[#4c4546]">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#e2e2e2] mb-5" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-['Hanken_Grotesk'] text-sm font-semibold uppercase tracking-[0.1em]">Total</span>
                  <span className="font-['Bodoni_Moda'] text-2xl text-[#1a1c1c]">THB 495.00</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
