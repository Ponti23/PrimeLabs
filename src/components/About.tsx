'use client';

import { useInView } from '@/hooks/useInView';

const facts = [
  { value: 'Mobile', label: 'We come to you' },
  { value: 'From $180', label: 'Maintenance Detail' },
  { value: 'Driveway', label: 'Detailed on-site' },
];

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
              Your friendly{' '}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent">
                neighbourhood detailer.
              </span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              PrimeLabs is a small mobile detailing business built around one simple idea: making it
              easier to keep your car looking its best.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              I bring the setup to you, take my time with the details, and treat every car with the
              same care I&apos;d want given to my own.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              No massive operation or complicated packages — just friendly, reliable detailing brought
              straight to your driveway.
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
            {facts.map((f) => (
              <div
                key={f.label}
                className="bg-surface-2 border border-white/5 rounded-2xl p-6 text-center hover:border-gold/20 transition-colors duration-300"
              >
                <div className="text-2xl font-black bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] mb-1">
                  {f.value}
                </div>
                <div className="text-xs text-white/50 font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
