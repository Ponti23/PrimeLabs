'use client';

import { useInView } from '@/hooks/useInView';

const highlights = [
  { icon: '⬡', title: 'We Come to You', text: 'Home, work, or wherever your car is parked — no drop-offs, no waiting rooms.' },
  { icon: '◈', title: 'Full Setup Brought Along', text: 'We arrive with everything needed to detail your car right there in the driveway.' },
  { icon: '✦', title: 'Careful, Thorough Work', text: 'Every car gets the same patient, detailed care — inside, outside, and the wheels.' },
];

export default function Services() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: cardRef, inView: cardIn } = useInView(0.1);

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black">Mobile Car Detailing</h2>
          <p className="text-white/55 mt-5 max-w-2xl mx-auto leading-relaxed">
            PrimeLabs brings professional car detailing straight to your location. We come to you and
            take care of everything on-site — so your car gets a proper clean without you ever leaving
            the driveway.
          </p>
        </div>

        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`bg-surface-2 border border-white/5 rounded-2xl p-8 md:p-10
            hover:border-gold/30 hover:shadow-[0_0_48px_rgba(0,212,255,0.08)] transition-all duration-400
            ${cardIn ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="grid sm:grid-cols-3 gap-8">
            {highlights.map((h) => (
              <div key={h.title} className="text-center sm:text-left">
                <div className="text-gold text-2xl mb-4 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto sm:mx-0
                  drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                  <span aria-hidden="true">{h.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{h.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex bg-gold text-black font-bold px-7 py-3 rounded hover:bg-gold-light transition-colors duration-200 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              See What&apos;s Included
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
