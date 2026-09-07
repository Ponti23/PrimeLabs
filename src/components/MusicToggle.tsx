'use client';

import { useRef, useState } from 'react';

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState('');

  const label = !hasStarted ? 'Play music' : isMuted ? 'Unmute music' : 'Mute music';

  async function handleClick() {
    const audio = audioRef.current;
    if (!audio) return;

    setError('');

    if (!hasStarted) {
      audio.muted = false;

      try {
        await audio.play();
        setHasStarted(true);
        setIsMuted(false);
      } catch {
        setHasStarted(false);
        setIsMuted(false);
        setError('Music could not start. Try again.');
      }

      return;
    }

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <audio
        ref={audioRef}
        src="/media/primelabs-music.m4a"
        loop
        preload="none"
        onError={() => {
          setHasStarted(false);
          setIsMuted(false);
          setError('Music could not load. Try again.');
        }}
      />
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        className="group flex min-h-11 min-w-11 items-center gap-2 rounded-full border border-gold/40 bg-dark/95 px-3.5 py-2.5 text-sm font-semibold text-gold shadow-[0_8px_28px_rgba(0,0,0,0.38),0_0_20px_rgba(0,212,255,0.12)] transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-gold/70 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0"
        >
          <path d="M5 10v4h3l4 3.5v-11L8 10H5Z" />
          {isMuted ? (
            <>
              <path d="m16 10 4 4" />
              <path d="m20 10-4 4" />
            </>
          ) : (
            <>
              <path d="M16 9.5a4 4 0 0 1 0 5" />
              <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
            </>
          )}
        </svg>
        <span>{label}</span>
      </button>
      <p aria-live="polite" className="sr-only">
        {error}
      </p>
    </div>
  );
}
