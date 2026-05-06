'use client';

import { useEffect, useRef, useState } from 'react';

type Step = 'gate' | 'calendar';

export default function Booking() {
  const [step, setStep] = useState<Step>('gate');
  const [address, setAddress] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ address?: string; agreed?: string }>({});
  const addressRef = useRef(address);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  useEffect(() => {
    if (step !== 'calendar') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = (...a: any[]) => p(api, a);
          const ns = args[1];
          api.q = [];
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api;
            p(cal.ns[ns], args);
            p(cal, ['-', api]);
          } else {
            p(cal, args);
          }
          return;
        }
        p(cal, args);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Cal = (window as any).Cal;
    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', {
      elementOrSelector: '#cal-inline',
      calLink: 'Ponti23',
      layout: 'month_view',
      config: {
        defaultValues: {
          notes: `Service Address: ${addressRef.current}`,
        },
      },
    });
    Cal('ui', {
      styles: { branding: { brandColor: '#00D4FF' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, [step]);

  const handleContinue = () => {
    const newErrors: { address?: string; agreed?: string } = {};
    if (!address.trim()) newErrors.address = 'Please enter your service address.';
    if (!agreed) newErrors.agreed = 'You must agree to continue.';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep('calendar');
  };

  return (
    <section id="booking" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
          Schedule Online
        </p>
        <h2 className="text-4xl md:text-5xl font-black mb-4">Book Your Detail</h2>
        <p className="text-white/50 mb-12 max-w-xl mx-auto">
          Pick a time that works for you. We&apos;ll confirm your booking and show up ready to work.
        </p>

        {step === 'gate' ? (
          <div className="bg-surface-2 border border-white/5 rounded-2xl p-8 md:p-12 text-left">

            {/* Address */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-white/80 mb-2">
                Service Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: undefined })); }}
                placeholder="123 Main St, City, State"
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition-all"
              />
              {errors.address && <p className="text-red-400 text-xs mt-2">{errors.address}</p>}
            </div>

            {/* Disclaimer card */}
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Service Notice</h3>
                  <p className="text-white/50 text-sm mb-4">
                    Our mobile detailing setup requires access to utilities at your location. We keep usage minimal and tidy up after every job.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                      <span>
                        <span className="text-white font-semibold">Water supply</span>
                        <span className="text-white/50"> — a standard outdoor hose bib or faucet accessible from the service area.</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                      <span>
                        <span className="text-white font-semibold">Power outlet</span>
                        <span className="text-white/50"> — a standard 110V outlet (garage, exterior, or indoor nearby).</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agreement checkbox */}
            <label className="flex items-start gap-3 cursor-pointer mb-2">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); setErrors((p) => ({ ...p, agreed: undefined })); }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${agreed ? 'bg-gold border-gold shadow-[0_0_10px_rgba(0,212,255,0.4)]' : 'border-white/20 bg-dark'}`}>
                  {agreed && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-white/60 leading-relaxed">
                I confirm that water and power access will be available at the address above, and I agree to the service conditions described.
              </span>
            </label>
            {errors.agreed && <p className="text-red-400 text-xs mb-6 ml-8">{errors.agreed}</p>}

            <button
              onClick={handleContinue}
              className="w-full mt-8 bg-gold text-black font-bold py-4 rounded-xl hover:bg-gold-light transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.35)] hover:shadow-[0_0_36px_rgba(0,212,255,0.55)]"
            >
              Continue to Booking →
            </button>
          </div>
        ) : (
          <div className="bg-surface-2 border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 text-left">
              <div className="text-sm text-white/50">
                Booking for:{' '}
                <span className="text-white/80 font-medium">{address}</span>
              </div>
              <button
                onClick={() => setStep('gate')}
                className="text-xs text-white/30 hover:text-gold transition-colors"
              >
                ← Change address
              </button>
            </div>
            <div
              id="cal-inline"
              style={{ width: '100%', minHeight: '600px', overflow: 'scroll' }}
            />
          </div>
        )}

        <p className="mt-6 text-sm text-white/40">
          Prefer to call?{' '}
          <a href="#contact" className="text-gold hover:text-gold-light transition-colors">
            Get in touch directly
          </a>
        </p>
      </div>
    </section>
  );
}
