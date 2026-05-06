export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0a1628_0%,_#050a14_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-gold text-sm font-bold tracking-widest uppercase mb-4">
          Mobile Auto Detailing
        </p>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          Your Car Deserves{" "}
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            The Best.
          </span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          PrimeLabs brings professional-grade detailing straight to your
          driveway. No drop-offs, no waiting — just a showroom finish at your
          door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-5 h-5 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
