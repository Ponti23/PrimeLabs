'use client';

import { useInView } from '@/hooks/useInView';

const includes = [
  'Full vacuum',
  'Wipe-down of surfaces, cracks & crevices',
  'Clean & protect plastics and leather',
  'Floor mats & carpet cleaning (no shampoo)',
  'Interior glass',
  'Full hand wash & foam bath',
  'Deep cleaning of rims & tyres',
  'Ceramic wax paint protection',
];

export default function Pricing() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: cardRef, inView: cardIn } = useInView(0.1);

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">Our Package</p>
          <h2 className="text-4xl md:text-5xl font-black">Maintenance Detail</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            One thorough package that covers your car inside and out — brought straight to your driveway.
          </p>
        </div>

        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`relative rounded-2xl p-8 md:p-10 bg-gold/5 border border-gold/40 animate-pulse-glow
            ${cardIn ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationFillMode: 'forwards' }}
        >
          {/* Shimmer bar */}
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl overflow-hidden">
            <div
              className="h-full w-full animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.8) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent">
              Maintenance Detail
            </h3>
            <div>
              <span className="text-white/40 text-lg align-top">From</span>{' '}
              <span className="text-5xl font-black">$180</span>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
            {includes.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full block text-center font-bold py-4 rounded-xl bg-gold text-black hover:bg-gold-light shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_30px_rgba(0,212,255,0.55)] transition-all duration-200"
          >
            Request a Booking
          </button>
        </div>
      </div>
    </section>
  );
}
