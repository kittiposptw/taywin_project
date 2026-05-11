export default function Footer() {
  const links = ['Privacy Policy', 'Terms of Service', 'Shipping & Returns', 'Atelier Locations']

  return (
    <footer className="w-full py-16 px-8 md:px-12 bg-[#eeeeee] border-t border-[#e2e2e2]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <div className="font-['Bodoni_Moda'] text-2xl tracking-[0.25em] text-[#1a1c1c]">TAYWIN</div>
          <p className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-[0.15em] text-[#7e7576] mt-2">
            © {new Date().getFullYear()} TAYWIN ORIGINAL STYLE. HANDCRAFTED FOR LONGEVITY.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {links.map((link) => (
            <span key={link} className="font-['Hanken_Grotesk'] text-xs font-medium uppercase tracking-[0.1em] text-[#4c4546] hover:text-[#1a1c1c] transition-colors cursor-pointer">
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
