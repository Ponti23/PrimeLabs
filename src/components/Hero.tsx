'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  async function play() { setOpened(true); try { await video.current?.play(); } catch { /* Native controls remain available. */ } }
  return <section id="hero" className="hero">
    <div className="hero-heading page-width"><h1>Good as new.<br /><span>Better as yours.</span></h1><div className="hero-intro"><p>A proper detail. A fresh start.<br />Car care, brought to your driveway.</p><a className="button button-acid" href="#booking">Book your detail <span aria-hidden="true">↗</span></a></div></div>
    <div className={`hero-film ${opened ? 'film-open' : ''}`}>
      <Image src="/media/hero.jpg" alt="Blue Volkswagen in a driveway, from the PrimeLabs detailing film" fill priority sizes="100vw" className="hero-poster" />
      <video ref={video} playsInline controls={opened} preload="none" poster="/media/hero.jpg" aria-label="PrimeLabs detailing film"><source src="/media/primelabs-film.mp4" type="video/mp4" /></video>
      {!opened && <div className="film-caption"><span>THE LITTLE THINGS.<br />THE BIG DIFFERENCE.</span><button className="film-play" onClick={play} aria-label="Play the PrimeLabs detailing film"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7z" /></svg><span>Watch the detail <small>00:27</small></span></button></div>}
      <div className="film-edge" aria-hidden="true">PRIMELABS / IN THE DETAILS</div>
    </div>
    <div className="service-strip"><span>YOUR DRIVEWAY. OUR WORKSPACE.</span><span>INTERIOR + EXTERIOR</span><span>ONE COMPLETE DETAIL</span><a href="#services">Explore the service <span aria-hidden="true">↓</span></a></div>
  </section>;
}
