import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { IMAGES } from '../config/images'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState('priority')

  return (
    <div className="bg-[#081421] text-[#d7e3f5] min-h-screen font-['Manrope']">
      <NavBar />

      <main className="pt-[80px] pb-20 px-6 max-w-[1280px] mx-auto mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-7 space-y-12">
            {/* Stepper */}
            <div className="flex items-center gap-8">
              {STEPS.map((label, i) => (
                <div key={label} className={`flex flex-col items-center gap-2 ${i > step ? 'opacity-40' : ''}`}>
                  <span className={`font-['Manrope'] text-xs uppercase tracking-widest ${i === step ? 'text-[#f0c131]' : 'text-[#d1c5ad]'}`}>
                    {label}
                  </span>
                  <div className={`h-px w-12 ${i <= step ? 'bg-[#f0c131]' : 'bg-[#4e4634]'}`} />
                </div>
              ))}
            </div>

            <section className="space-y-6">
              <h1 className="font-['EB_Garamond'] text-5xl text-[#d7e3f5]">Shipping Details</h1>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">First Name</label>
                    <input className="checkout-input" placeholder="Enter first name" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">Last Name</label>
                    <input className="checkout-input" placeholder="Enter last name" type="text" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">Email Address</label>
                  <input className="checkout-input" placeholder="email@address.com" type="email" />
                </div>

                <div className="space-y-1">
                  <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">Shipping Address</label>
                  <input className="checkout-input" placeholder="Street address, apartment, suite" type="text" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">City</label>
                    <input className="checkout-input" placeholder="City" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">State</label>
                    <input className="checkout-input" placeholder="State" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest block">Zip Code</label>
                    <input className="checkout-input" placeholder="ZIP" type="text" />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="pt-6 border-t border-[#4e4634]/20">
                  <h3 className="font-['EB_Garamond'] text-3xl mb-4">Shipping Method</h3>
                  <div className="space-y-4">
                    <label
                      onClick={() => setShipping('priority')}
                      className={`flex items-center justify-between p-6 border cursor-pointer transition-all
                        ${shipping === 'priority' ? 'bg-[#101c29] border-[#f0c131]' : 'bg-[#101c29] border-[#4e4634]/30 hover:border-[#f0c131]'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full border-2 border-[#f0c131] flex items-center justify-center">
                          {shipping === 'priority' && <div className="w-2 h-2 rounded-full bg-[#f0c131]" />}
                        </div>
                        <div>
                          <p className="font-['Manrope'] text-sm font-bold uppercase tracking-widest text-[#f0c131]">Priority Atelier Delivery</p>
                          <p className="font-['Manrope'] text-xs text-[#d1c5ad]">2-3 Business Days</p>
                        </div>
                      </div>
                      <span className="font-['Manrope'] text-base text-[#d7e3f5]">$25.00</span>
                    </label>

                    <label
                      onClick={() => setShipping('standard')}
                      className={`flex items-center justify-between p-6 border cursor-pointer transition-all
                        ${shipping === 'standard' ? 'bg-[#040f1b] border-[#4e4634]/50' : 'bg-[#040f1b] border-[#4e4634]/10 hover:border-[#4e4634]/50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full border-2 border-[#4e4634] flex items-center justify-center">
                          {shipping === 'standard' && <div className="w-2 h-2 rounded-full bg-[#4e4634]" />}
                        </div>
                        <div>
                          <p className="font-['Manrope'] text-sm uppercase tracking-widest">Standard Shipping</p>
                          <p className="font-['Manrope'] text-xs text-[#d1c5ad]">5-7 Business Days</p>
                        </div>
                      </div>
                      <span className="font-['Manrope'] text-base text-[#d7e3f5]">Complimentary</span>
                    </label>
                  </div>
                </div>

                <div className="pt-12">
                  <button
                    type="button"
                    className="w-full md:w-auto px-20 py-4 bg-[#f0c131] text-[#241a00] font-['Manrope'] text-xs font-extrabold uppercase tracking-widest hover:opacity-90 transition-all active:scale-95"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <aside className="lg:sticky lg:top-20 space-y-4">
              <div className="bg-[#15202d] border border-[#4e4634]/20 p-6 shadow-xl">
                <h2 className="font-['EB_Garamond'] text-3xl mb-6">Order Summary</h2>

                {/* Cart Item */}
                <div className="flex gap-4 pb-6 border-b border-[#4e4634]/20">
                  <div className="w-24 h-32 flex-shrink-0 bg-[#2a3643]">
                    <img src={IMAGES.checkoutThumb} alt="The Heritage Oxford" className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-['EB_Garamond'] text-xl text-[#d7e3f5]">The Heritage Oxford</h4>
                      <p className="font-['Manrope'] text-xs text-[#d1c5ad] uppercase tracking-widest">Tan Burnished Leather / 42</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-['Manrope'] text-xs text-[#d1c5ad]">QTY: 01</span>
                      <span className="font-['Manrope'] text-base text-[#f0c131] font-bold">$495.00</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-6 space-y-4">
                  {[
                    { label: 'Subtotal', value: '$495.00' },
                    { label: 'Shipping', value: shipping === 'priority' ? '$25.00' : 'Free' },
                    { label: 'Estimated Tax', value: '$40.84' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between font-['Manrope'] text-base">
                      <span className="text-[#d1c5ad]">{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 pb-6 border-b border-[#4e4634]/20">
                  <input className="checkout-input text-sm" placeholder="PROMO CODE" type="text" />
                  <button className="px-4 py-1 border border-[#9a907a] font-['Manrope'] text-xs uppercase tracking-widest hover:bg-[#4e4634]/20 transition-colors whitespace-nowrap">
                    Apply
                  </button>
                </div>

                {/* Total */}
                <div className="pt-6 flex justify-between items-end">
                  <span className="font-['EB_Garamond'] text-3xl">Total</span>
                  <div className="text-right">
                    <span className="font-['Manrope'] text-xs text-[#d1c5ad] block uppercase tracking-widest">USD</span>
                    <span className="font-['EB_Garamond'] text-3xl text-[#f0c131]">
                      {shipping === 'priority' ? '$560.84' : '$535.84'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: 'lock', label: 'Secure SSL Encrypted' },
                  { icon: 'verified_user', label: 'Lifetime Warranty' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[#f0c131]" style={{ fontSize: 20 }}>{t.icon}</span>
                    <span className="font-['Manrope'] text-xs uppercase tracking-widest">{t.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
