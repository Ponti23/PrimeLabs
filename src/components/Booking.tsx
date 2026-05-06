'use client';

import { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    // Cal.com queue-based init — must run before embed.js loads
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
    });
    Cal('ui', {
      styles: { branding: { brandColor: '#00D4FF' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  return (
    <section id="booking" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
          Schedule Online
        </p>
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Book Your Detail
        </h2>
        <p className="text-white/50 mb-12 max-w-xl mx-auto">
          Pick a time that works for you. We&apos;ll confirm your booking and show
          up ready to work.
        </p>

        <div className="bg-surface-2 border border-white/5 rounded-2xl overflow-hidden">
          <div
            id="cal-inline"
            style={{ width: '100%', minHeight: '600px', overflow: 'scroll' }}
          />
        </div>

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
