const placeholders = [
  { label: "Before", bg: "bg-surface-2" },
  { label: "After", bg: "bg-[#1a1500]" },
  { label: "Before", bg: "bg-surface-2" },
  { label: "After", bg: "bg-[#1a1500]" },
  { label: "Before", bg: "bg-surface-2" },
  { label: "After", bg: "bg-[#1a1500]" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-black">Before & After</h2>
          <p className="text-white/50 mt-4">
            Real results from real cars. Photos coming soon.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((p, i) => (
            <div
              key={i}
              className={`${p.bg} border border-white/5 rounded-xl aspect-[4/3] flex flex-col items-center justify-center gap-2`}
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span
                className={`text-xs font-bold tracking-wider uppercase ${
                  p.label === "After" ? "text-gold/60" : "text-white/20"
                }`}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
