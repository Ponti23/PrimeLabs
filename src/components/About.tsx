'use client';

import { useInView, useCountUp } from '@/hooks/useInView';

const stats = [
  { value: 100, suffix: "+", label: "Cars Detailed" },
  { value: 5, suffix: "★", label: "Average Rating" },
  { value: 100, suffix: "%", label: "Mobile Service" },
  { value: 2, suffix: "hr", label: "Avg. Job Time" },
];

function StatCard({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.value, inView, 1400);
  return (
    <div className="bg-surface-2 border border-white/5 rounded-2xl p-6 text-center hover:border-gold/20 transition-colors duration-300">
      <div className="text-3xl font-black bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-white/50 font-medium">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const { ref: textRef, inView: textIn } = useInView(0.1);

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={textIn ? 'animate-fade-up' : 'opacity-0'}
            style={{ animationFillMode: 'forwards' }}
          >
            <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Passion for the{" "}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent">
                Perfect Finish
              </span>
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
              className="inline-flex bg-gold text-black font-bold px-7 py-3 rounded hover:bg-gold-light transition-colors duration-200 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              Book Now
            </a>
          </div>

          <div
            ref={sectionRef as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-2 gap-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
