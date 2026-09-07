'use client';

import { useRef, useState, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';
import { gallery, galleryCategories, type BeforeAfterPair, type GalleryCategory } from '@/config/gallery';

function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; updatePosition(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePosition(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/5 focus:outline-none focus:ring-2 focus:ring-gold/50"
      tabIndex={0}
      role="slider"
      aria-label={`${pair.label} before and after comparison. Use arrow keys to adjust.`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      onTouchMove={onTouchMove}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5));
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5));
      }}
    >
      {/* After (full width, beneath) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pair.after} alt={`${pair.label} — after`} className="w-full h-full object-cover" draggable={false} />
        <span className="absolute bottom-3 right-3 text-[10px] font-black tracking-widest uppercase text-white bg-gold/80 px-2 py-0.5 rounded-full select-none">
          After
        </span>
      </div>

      {/* Before (clipped to left of handle) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pair.before} alt={`${pair.label} — before`} className="w-full h-full object-cover" draggable={false} />
        <span className="absolute bottom-3 left-3 text-[10px] font-black tracking-widest uppercase text-white/70 bg-black/50 px-2 py-0.5 rounded-full select-none">
          Before
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/90 border-2 border-gold shadow-[0_0_16px_rgba(0,212,255,0.6)] flex items-center justify-center">
          <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-xs font-bold tracking-wider uppercase text-white/70 bg-dark/50 px-3 py-1 rounded-full backdrop-blur-sm">
          {pair.label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.05);
  const [active, setActive] = useState<GalleryCategory>(galleryCategories[0]);

  const pairs = gallery[active] ?? [];

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-10 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black">Before &amp; After</h2>
          <p className="text-white/50 mt-4">Drag the handle to reveal the transformation.</p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 bg-surface-2 border border-white/8 rounded-full">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  active === cat
                    ? 'bg-gold text-black shadow-[0_0_16px_rgba(0,212,255,0.35)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          key={active}
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${gridIn ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationFillMode: 'forwards' }}
        >
          {pairs.length > 0 ? (
            pairs.map((pair) => <BeforeAfterSlider key={pair.label} pair={pair} />)
          ) : (
            <p className="col-span-full text-center text-white/40 text-sm py-12">
              Photos for this category are coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
