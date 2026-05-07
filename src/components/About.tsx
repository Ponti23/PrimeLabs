const stats = [
  { value: "100+", label: "Cars Detailed" },
  { value: "5★", label: "Average Rating" },
  { value: "100%", label: "Mobile Service" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Passion for the{" "}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent">Perfect Finish</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              PrimeLabs started with a simple idea: every car deserves
              professional-grade care without the hassle of dropping it off at
              a shop. We bring the detail bay to you, wherever you are.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              We use professional-grade products and take pride in the
              details — because that&apos;s what separates a good clean from a
              truly great one.
            </p>
            <a
              href="#booking"
              className="inline-flex bg-gold text-black font-bold px-7 py-3 rounded hover:bg-gold-light transition-colors duration-200"
            >
              Book Now
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface-2 border border-white/5 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-white/50 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
