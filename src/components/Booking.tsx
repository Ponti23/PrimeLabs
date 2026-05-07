'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Step = 'gate' | 'calendar';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service…' },
  { value: 'Basic Package — $140', label: 'Basic Package — $140' },
  { value: 'Silver Package — $180', label: 'Silver Package — $180' },
  { value: 'Gold Package — $250', label: 'Gold Package — $250' },
];

interface Suggestion {
  place_id: number;
  display_name: string;
}

type AddressStatus = 'idle' | 'checking' | 'valid' | 'invalid';

export default function Booking() {
  const [step, setStep] = useState<Step>('gate');
  const [address, setAddress] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ address?: string; service?: string; agreed?: string }>({});

  // Address autocomplete
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [addressStatus, setAddressStatus] = useState<AddressStatus>('idle');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addressRef = useRef(address);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => { addressRef.current = address; }, [address]);

  // Listen for service selection from Pricing section
  useEffect(() => {
    const handler = (e: Event) => {
      const service = (e as CustomEvent<{ service: string }>).detail.service;
      setSelectedService(service);
      setErrors((p) => ({ ...p, service: undefined }));
    };
    window.addEventListener('select-service', handler);
    return () => window.removeEventListener('select-service', handler);
  }, []);


  // Close suggestions on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 5) { setSuggestions([]); setAddressStatus('idle'); return; }
    setAddressStatus('checking');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setAddressStatus(data.length > 0 ? 'valid' : 'invalid');
      setShowSuggestions(data.length > 0);
    } catch {
      setAddressStatus('invalid');
    }
  }, []);

  const handleAddressChange = (val: string) => {
    setAddress(val);
    setAddressStatus('idle');
    setSuggestions([]);
    setErrors((p) => ({ ...p, address: undefined }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 800);
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setAddress(s.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setAddressStatus('valid');
    setErrors((p) => ({ ...p, address: undefined }));
  };

  const handleContinue = () => {
    const newErrors: typeof errors = {};
    if (!selectedService) newErrors.service = 'Please select a service.';
    if (!address.trim()) {
      newErrors.address = 'Please enter your service address.';
    } else if (address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address including street, city, and state.';
    } else if (addressStatus === 'invalid') {
      newErrors.address = 'Address not recognized — please select from the suggestions or check the spelling.';
    } else if (addressStatus === 'checking') {
      newErrors.address = 'Still verifying address, please wait a moment.';
    }
    if (!agreed) newErrors.agreed = 'You must agree to continue.';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setErrors({});
    setStep('calendar');
  };

  const statusIcon = () => {
    if (addressStatus === 'checking') return (
      <svg className="w-4 h-4 text-gold animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    );
    if (addressStatus === 'valid') return (
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
    if (addressStatus === 'invalid') return (
      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    return null;
  };

  return (
    <section id="booking" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">Schedule Online</p>
        <h2 className="text-4xl md:text-5xl font-black mb-4">Book Your Detail</h2>
        <p className="text-white/50 mb-12 max-w-xl mx-auto">
          Pick a time that works for you. We&apos;ll confirm your booking and show up ready to work.
        </p>

        {step === 'gate' ? (
          <div className="bg-surface-2 border border-white/5 rounded-2xl p-8 md:p-12 text-left">

            {/* Service selector */}
            <div className="mb-8">
              <label htmlFor="service-select" className="block text-sm font-bold text-white/80 mb-2">
                Service <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <select
                  id="service-select"
                  value={selectedService}
                  onChange={(e) => { setSelectedService(e.target.value); setErrors((p) => ({ ...p, service: undefined })); }}
                  className={`w-full bg-dark border rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)] transition-all cursor-pointer
                    ${errors.service ? 'border-red-500/60' : selectedService ? 'border-gold/40 focus:border-gold/50' : 'border-white/10 focus:border-gold/50'}`}
                >
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#0e1728]">{o.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.service && <p className="text-red-400 text-xs mt-2">{errors.service}</p>}
              {selectedService && !errors.service && (
                <p className="text-emerald-400/70 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {selectedService} selected
                </p>
              )}
            </div>

            {/* Address with autocomplete */}
            <div className="mb-8" ref={wrapperRef}>
              <label htmlFor="address-input" className="block text-sm font-bold text-white/80 mb-2">
                Service Address <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <input
                  id="address-input"
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  placeholder="123 Main St, City, State"
                  autoComplete="off"
                  className={`w-full bg-dark border rounded-xl px-4 py-3 pr-10 text-white placeholder-white/30 focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)] transition-all
                    ${errors.address ? 'border-red-500/60' : addressStatus === 'valid' ? 'border-emerald-500/50' : addressStatus === 'invalid' ? 'border-red-500/40' : 'border-white/10 focus:border-gold/50'}`}
                />
                {/* Status icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {statusIcon()}
                </div>

                {/* Autocomplete dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#0e1728] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                    {suggestions.map((s) => (
                      <button
                        key={s.place_id}
                        type="button"
                        onClick={() => handleSelectSuggestion(s)}
                        className="w-full text-left px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-start gap-3"
                      >
                        <svg className="w-3.5 h-3.5 text-gold/50 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{s.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.address && <p className="text-red-400 text-xs mt-2">{errors.address}</p>}
              {addressStatus === 'invalid' && !errors.address && (
                <p className="text-red-400/70 text-xs mt-2">Address not found — try adding city and state.</p>
              )}
              {addressStatus === 'checking' && (
                <p className="text-gold/60 text-xs mt-2">Verifying address…</p>
              )}
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 text-left flex-wrap gap-2">
              <div className="text-sm text-white/50 flex flex-col gap-0.5">
                <span>
                  Service: <span className="text-gold font-medium">{selectedService}</span>
                </span>
                <span>
                  Address: <span className="text-white/80 font-medium">{address}</span>
                </span>
              </div>
              <button
                onClick={() => setStep('gate')}
                className="text-xs text-white/30 hover:text-gold transition-colors"
              >
                ← Change
              </button>
            </div>
            <iframe
              src="https://cal.com/ponti23/car-detailing?embed=true&layout=month_view&theme=dark&hideEventTypeDetails=false"
              style={{ width: '100%', height: '700px', border: 'none' }}
              loading="lazy"
              title="Book your detail appointment"
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
