export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-16 px-6 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-xl font-black tracking-tight mb-3">
              PRIME<span className="text-gold drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]">LABS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Mobile auto detailing that comes to you. Premium results, zero hassle.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/primelabsdetail"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { label: "Services", href: "#services" },
                { label: "Pricing", href: "#pricing" },
                { label: "Gallery", href: "#gallery" },
                { label: "About", href: "#about" },
                { label: "Book Now", href: "#booking" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-gold transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <span className="text-gold/50 text-xs">📞</span>
                <a href="tel:+1" className="hover:text-gold transition-colors">(Coming Soon)</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold/50 text-xs">✉</span>
                <a href="mailto:" className="hover:text-gold transition-colors">(Coming Soon)</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold/50 text-xs">◎</span>
                <a href="https://instagram.com/primelabsdetail" className="hover:text-gold transition-colors">@primelabsdetail</a>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <span className="text-gold/50 text-xs">🕐</span>
                <span>Mon–Sat, 8am–6pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} PrimeLabs. All rights reserved.</p>
          <p>Mobile Auto Detailing · San Diego, CA</p>
        </div>
      </div>
    </footer>
  );
}
