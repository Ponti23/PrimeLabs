"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#booking" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-black tracking-tight">
          PRIME<span className="text-gold drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]">LABS</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`transition-colors duration-200 ${isActive ? "text-gold" : "hover:text-gold"}`}
                >
                  {l.label}
                </a>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0 animate-fade-in" />
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="#booking"
          className="hidden md:inline-flex bg-gold text-black font-bold text-sm px-5 py-2 rounded hover:bg-gold-light transition-colors duration-200"
        >
          Book Now
        </a>

        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-dark/98 backdrop-blur border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/70 hover:text-gold font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="bg-gold text-black font-bold text-sm px-5 py-2 rounded text-center hover:bg-gold-light transition-colors"
            onClick={() => setOpen(false)}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
