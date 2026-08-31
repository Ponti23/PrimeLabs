'use client';

import { useInView } from '@/hooks/useInView';
import { reviews } from '@/config/reviews';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: bodyRef, inView: bodyIn } = useInView(0.1);
  const hasReviews = reviews.length > 0;

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">What Clients Say</p>
          <h2 className="text-4xl md:text-5xl font-black">Reviews</h2>
        </div>

        {hasReviews ? (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, inView } = useInView(0.1);
              return (
                <div
                  key={`${r.name}-${i}`}
                  ref={ref as React.RefObject<HTMLDivElement>}
                  className={`bg-surface-2 border border-white/5 rounded-2xl p-7
                    hover:border-gold/20 hover:shadow-[0_0_32px_rgba(0,212,255,0.06)]
                    transition-all duration-300
                    ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'forwards' }}
                >
                  <div className="mb-4">
                    <Stars count={r.rating} />
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/20 flex items-center justify-center text-xs font-black text-gold">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80">{r.name}</p>
                      {r.location && <p className="text-xs text-white/35">{r.location}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            ref={bodyRef as React.RefObject<HTMLDivElement>}
            className={`max-w-xl mx-auto text-center bg-surface-2 border border-white/5 rounded-2xl p-10 ${bodyIn ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="text-gold text-2xl mb-4 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
              <span aria-hidden="true">★</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Genuine reviews coming soon</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              PrimeLabs is just getting started. Real customer reviews will appear here as they come in.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
