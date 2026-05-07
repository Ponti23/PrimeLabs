'use client';

import { useRef, useState, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';

const pairs = [
  {
    label: "Paint Correction",
    beforeStyle: "bg-gradient-to-br from-[#1a1206] via-[#2a1e0a] to-[#0e0b06]",
    afterStyle: "bg-gradient-to-br from-[#0a1a2a] via-[#0d2035] to-[#061018]",
    beforeAccent: "from-yellow-900/20 to-transparent",
    afterAccent: "from-gold/20 to-transparent",
  },
  {
    label: "Interior Clean",
    beforeStyle: "bg-gradient-to-br from-[#1c1209] via-[#241608] to-[#130e07]",
    afterStyle: "bg-gradient-to-br from-[#081520] via-[#0b1c2a] to-[#050f18]",
    beforeAccent: "from-orange-900/20 to-transparent",
    afterAccent: "from-cyan-500/15 to-transparent",
  },
  {
    label: "Wheel Detail",
    beforeStyle: "bg-gradient-to-br from-[#181210] via-[#1f1510] to-[#0f0c0a]",
    afterStyle: "bg-gradient-to-br from-[#091520] via-[#0c1d2c] to-[#060e18]",
    beforeAccent: "from-red-900/15 to-transparent",
    afterAccent: "from-blue-400/15 to-transparent",
  },
];

function BeforeAfterSlider({ pair }: { pair: typeof pairs[0] }) {
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
      <div className={`absolute inset-0 ${pair.afterStyle}`}>
        <div className={`absolute inset-0 bg-gradient-to-tl ${pair.afterAccent}`} />
        {/* Simulated gloss reflections */}
        <div className="absolute top-4 left-6 w-16 h-2 bg-white/8 rounded-full rotate-12 blur-sm" />
        <div className="absolute top-8 left-10 w-8 h-1 bg-white/5 rounded-full rotate-12 blur-sm" />
        <div className="absolute bottom-6 right-8 w-20 h-1.5 bg-gold/15 rounded-full -rotate-6 blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest uppercase text-gold/50 select-none">After</span>
        </div>
      </div>

      {/* Before (clipped to left of handle) */}
      <div
        className={`absolute inset-0 ${pair.beforeStyle}`}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-tl ${pair.beforeAccent}`} />
        {/* Simulated dirt/grime texture */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(100,70,20,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(80,50,10,0.2) 0%, transparent 40%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest uppercase text-white/20 select-none">Before</span>
        </div>
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-xs font-bold tracking-wider uppercase text-white/30 bg-dark/40 px-3 py-1 rounded-full backdrop-blur-sm">
          {pair.label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.05);

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${headIn ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black">Before & After</h2>
          <p className="text-white/50 mt-4">Drag the handle to reveal the transformation.</p>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${gridIn ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          {pairs.map((pair) => (
            <BeforeAfterSlider key={pair.label} pair={pair} />
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mt-8 tracking-wide">
          Real photo gallery coming soon — these are design previews.
        </p>
      </div>
    </section>
  );
}
