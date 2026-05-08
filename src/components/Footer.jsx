export default function Footer() {
  const links = ['Privacy Policy', 'Terms of Service', 'Shipping & Returns', 'Atelier Locations']

  return (
    <footer className="w-full py-20 px-6 flex flex-col items-center gap-6 border-t border-[#4e4634] bg-[#040f1b]">
      <div className="font-['EB_Garamond'] text-5xl text-[#f0c131] uppercase tracking-tighter">
        TAYWIN ORIGINAL
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {links.map((link) => (
          <span
            key={link}
            className="font-['Manrope'] text-xs uppercase tracking-widest text-[#d1c5ad]"
          >
            {link}
          </span>
        ))}
      </div>
      <p className="font-['Manrope'] text-xs uppercase tracking-widest text-[#e8c33f] mt-4 opacity-60">
        © 2024 TAYWIN ORIGINAL STYLE HANDCRAFTED FOR LONGEVITY.
      </p>
    </footer>
  )
}
