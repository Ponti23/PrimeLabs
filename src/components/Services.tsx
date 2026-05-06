const services = [
  {
    icon: "✦",
    title: "Exterior Detail",
    description:
      "Hand wash, clay bar treatment, machine polish, and premium wax or paint protection film. We remove contaminants and restore your paint's true depth and gloss.",
    highlights: ["Hand Wash & Dry", "Clay Bar", "Machine Polish", "Wax / PPF"],
  },
  {
    icon: "◈",
    title: "Interior Detail",
    description:
      "Deep vacuum, steam clean, leather conditioning, trim restoration, and full odor elimination. We leave the inside looking and smelling factory-fresh.",
    highlights: [
      "Deep Vacuum",
      "Steam Clean",
      "Leather & Trim",
      "Odor Removal",
    ],
  },
  {
    icon: "⬡",
    title: "Mobile Service",
    description:
      "We come to you — at home, work, or anywhere that's convenient. No drop-offs, no waiting around. Just schedule and we handle the rest.",
    highlights: [
      "We Come to You",
      "Home or Office",
      "Flexible Scheduling",
      "No Drop-Off Needed",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-black">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-surface-2 border border-white/5 rounded-2xl p-8 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="text-gold text-3xl mb-5">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <ul className="space-y-2">
                {s.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
