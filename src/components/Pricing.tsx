const packages = [
  {
    name: "Basic",
    price: 140,
    description: "A thorough clean for everyday vehicles.",
    features: [
      "Exterior Hand Wash & Dry",
      "Tire & Wheel Cleaning",
      "Window Clean (Exterior)",
      "Interior Vacuum",
      "Wipe-Down of Surfaces",
    ],
    highlight: false,
  },
  {
    name: "Silver",
    price: 180,
    description: "Extra attention inside and out.",
    features: [
      "Everything in Basic",
      "Clay Bar Treatment",
      "Door Jamb Cleaning",
      "Interior Steam Clean",
      "Leather Conditioning",
      "Air Freshener",
    ],
    highlight: false,
  },
  {
    name: "Gold",
    price: 250,
    description: "The full PrimeLabs experience.",
    features: [
      "Everything in Silver",
      "Machine Polish",
      "Wax / Paint Sealant",
      "Engine Bay Wipe-Down",
      "Odor Elimination",
      "Headlight Restoration",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black">Choose Your Package</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Flat-rate pricing — no surprises. All packages include our mobile
            service; we come to you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                pkg.highlight
                  ? "bg-gold/5 border-gold/40 shadow-[0_0_60px_rgba(0,212,255,0.12)]"
                  : "bg-surface-2 border-white/5 hover:border-white/10"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-black text-xs font-black px-3 py-1 rounded-full tracking-wide uppercase">
                    Best Value
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-1 ${pkg.highlight ? "bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent" : "text-white"}`}
                >
                  {pkg.name}
                </h3>
                <p className="text-white/50 text-sm">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black">${pkg.price}</span>
                <span className="text-white/40 text-sm ml-2">flat rate</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                    <svg
                      className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`block text-center font-bold py-3 rounded transition-colors duration-200 ${
                  pkg.highlight
                    ? "bg-gold text-black hover:bg-gold-light shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_30px_rgba(0,212,255,0.55)]"
                    : "border border-white/20 text-white hover:border-gold/50 hover:text-gold"
                }`}
              >
                Book {pkg.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
