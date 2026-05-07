'use client';

import { useInView } from '@/hooks/useInView';

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
    highlights: ["Deep Vacuum", "Steam Clean", "Leather & Trim", "Odor Removal"],
  },
  {
    icon: "⬡",
    title: "Mobile Service",
    description:
      "We come to you — at home, work, or anywhere that's convenient. No drop-offs, no waiting around. Just schedule and we handle the rest.",
    highlights: ["We Come to You", "Home or Office", "Flexible Scheduling", "No Drop-Off Needed"],
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group bg-surface-2 border border-white/5 rounded-2xl p-8
        hover:border-gold/40 hover:shadow-[0_0_48px_rgba(0,212,255,0.1)]
        hover:bg-[#111d2e] transition-all duration-400 cursor-default
        ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
    >
      <div className="text-gold text-2xl mb-5 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center
        drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]
        group-hover:bg-gold/20 group-hover:drop-shadow-[0_0_16px_rgba(0,212,255,0.6)]
        transition-all duration-300">
        <span aria-hidden="true">{s.icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">{s.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-6">{s.description}</p>
      <ul className="space-y-2">
        {s.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-sm text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 group-hover:shadow-[0_0_6px_rgba(0,212,255,0.8)] transition-all duration-300" />
            {h}
          </li>
        ))}
      </ul>
      {s.title !== 'Mobile Service' && (
        <button
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-6 inline-block text-xs font-bold text-gold/60 hover:text-gold transition-colors duration-200 tracking-wider uppercase"
        >
          See Packages →
        </button>
      )}
    </div>
  );
}

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
