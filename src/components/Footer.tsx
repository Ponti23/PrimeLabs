export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-xl font-black tracking-tight mb-3">
              PRIME<span className="text-gold drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]">LABS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Mobile auto detailing that comes to you. Premium results,
              zero hassle.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              {["Services", "Pricing", "Gallery", "About", "Book Now"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-gold transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <span className="text-white/30">Phone: </span>
                <a href="tel:+1" className="hover:text-gold transition-colors">
                  (Coming Soon)
                </a>
              </li>
              <li>
                <span className="text-white/30">Email: </span>
                <a
                  href="mailto:"
                  className="hover:text-gold transition-colors"
                >
                  (Coming Soon)
                </a>
              </li>
              <li>
                <span className="text-white/30">Instagram: </span>
                <a href="#" className="hover:text-gold transition-colors">
                  @primelabsdetail
                </a>
              </li>
              <li className="pt-1">
                <span className="text-white/30">Hours: </span>Mon–Sat,
                8am–6pm
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} PrimeLabs. All rights reserved.</p>
          <p>Mobile Auto Detailing</p>
        </div>
      </div>
    </footer>
  );
}
