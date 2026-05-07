'use client';

const trustItems = [
  { icon: "★", text: "5.0 Rating" },
  { icon: "✦", text: "100+ Cars Detailed" },
  { icon: "◎", text: "Same-Day Booking" },
  { icon: "⬡", text: "Mobile Service" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p
          className="text-gold text-sm font-bold tracking-widest uppercase mb-4 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Mobile Auto Detailing
        </p>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black leading-tight mb-6 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          Your Car Deserves{" "}
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            The Best.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          PrimeLabs brings professional-grade detailing straight to your
          driveway. No drop-offs, no waiting — just a showroom finish at your
          door.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
        >
          <a
            href="#booking"
            className="bg-gold text-black font-bold px-8 py-4 rounded text-base hover:bg-gold-light transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.35)] hover:shadow-[0_0_36px_rgba(0,212,255,0.55)]"
          >
            Book Your Detail
          </a>
          <a
            href="#services"
            className="border border-white/20 text-white font-semibold px-8 py-4 rounded text-base hover:border-gold/50 hover:text-gold transition-colors duration-200"
          >
            See Services
          </a>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/40">
              <span className="text-gold text-xs">{item.icon}</span>
              <span>{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="ml-8 hidden sm:block w-px h-3 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
