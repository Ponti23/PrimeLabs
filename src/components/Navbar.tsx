'use client';
import { useRef, useState } from 'react';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header page-width" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <a className="wordmark" href="#hero" aria-label="PrimeLabs home">PRIME<span>LABS</span><svg className="brand-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 1v22M1 12h22M4 4l16 16M4 20 20 4" /></svg></a>
    <span className="header-descriptor">MOBILE DETAILING<br />A LITTLE MORE OBSESSIVE.</span>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      <a href="#services" onClick={() => setOpen(false)}>The detail</a><a href="#gallery" onClick={() => setOpen(false)}>Our work</a><a href="#about" onClick={() => setOpen(false)}>About us</a><a className="nav-book" href="#booking" onClick={() => setOpen(false)}>Book a detail <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
