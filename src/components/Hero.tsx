'use client';

import { useEffect, useRef, useState } from 'react';

const trustItems = [
  { icon: "⬡", text: "We Come to You" },
  { icon: "✦", text: "Interior & Exterior" },
  { icon: "◈", text: "Rims & Tyres" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  const toggleVideo = () => {
    if (videoRef.current?.paused) videoRef.current.play().catch(() => {});
    else videoRef.current?.pause();
  };
  return (
    <>
      <section id="hero" className="film-opening" aria-label="PrimeLabs detailing film">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero.jpg"
          className="film-opening-video"
          aria-label="PrimeLabs car detailing showcase"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/primelabs-film.mp4" type="video/mp4" />
          Your browser does not support this video.
        </video>
        <div className="film-opening-controls">
          <a className="film-scroll-hint" href="#welcome">
            <span>Scroll to explore</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 4v16m-6-6 6 6 6-6" />
            </svg>
          </a>
          <button
            type="button"
            onClick={toggleVideo}
            className="film-pause"
            aria-label={playing ? 'Pause video' : 'Play video'}
          >
            {playing ? 'Pause video' : 'Play video'}
          </button>
        </div>
      </section>
      <section id="welcome" className="relative py-24 px-6 scroll-mt-20">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p
          className="text-gold text-sm font-bold tracking-widest uppercase mb-4 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Mobile Car Detailing
        </p>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black leading-tight mb-6 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          Your Car Deserves{" "}
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#40E0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            The Best.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          PrimeLabs brings professional-grade detailing straight to your
          driveway. No drop-offs, no waiting — just a showroom finish at your
          door.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
        >
          <a
            href="#booking"
            className="bg-gold text-black font-bold px-8 py-4 rounded text-base hover:bg-gold-light transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.35)] hover:shadow-[0_0_36px_rgba(0,212,255,0.55)]"
          >
            Book Your Detail
          </a>
          <a
            href="#services"
            className="border border-white/20 text-white font-semibold px-8 py-4 rounded text-base hover:border-gold/50 hover:text-gold transition-colors duration-200"
          >
            See Services
          </a>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-0-init animate-fade-up"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/40">
              <span className="text-gold text-xs">{item.icon}</span>
              <span>{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="ml-8 hidden sm:block w-px h-3 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>


      </section>
    </>
  );
}
