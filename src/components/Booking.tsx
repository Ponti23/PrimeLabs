'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Terms from './Terms';
import { sendBookingEmail } from '@/lib/sendBookingEmail';

type Step = 'form' | 'calendar' | 'confirmed';

interface Suggestion {
  place_id: number;
  display_name: string;
}

type AddressStatus = 'idle' | 'checking' | 'valid' | 'invalid';

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  vehicle: string;
  address: string;
  vehicleNotes: string;
  additionalNotes: string;
  photos: File[];
}

interface Errors {
  fullName?: string;
  mobile?: string;
  vehicle?: string;
  address?: string;
  agreed?: string;
}

const emptyForm: FormState = {
  fullName: '',
  mobile: '',
  email: '',
  vehicle: '',
  address: '',
  vehicleNotes: '',
  additionalNotes: '',
  photos: [],
};

function formatCalDateTime(iso?: string): { date: string; time: string } {
  if (!iso) return { date: '', time: '' };
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { date: '', time: '' };
  return {
    date: d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }),
  };
}

const inputBase =
  'w-full bg-dark border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-2 focus:outline-gold focus:outline-offset-2 transition-all';

export default function Booking() {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [termsOpen, setTermsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({ date: '', time: '' });

  // Latest form snapshot for use inside the Cal.com callback closure.
  const formRef = useRef<FormState>(form);
  useEffect(() => { formRef.current = form; }, [form]);

  // Address autocomplete (kept from the original, relabelled to Suburb).
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [addressStatus, setAddressStatus] = useState<AddressStatus>('idle');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Close suggestions on outside click.
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
    if (query.length < 4) { setSuggestions([]); setAddressStatus('idle'); return; }
    setAddressStatus('checking');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setAddressStatus(data.length > 0 ? 'valid' : 'idle');
      setShowSuggestions(data.length > 0);
    } catch {
      setAddressStatus('idle');
    }
  }, []);

  const handleAddressChange = (val: string) => {
    set('address', val);
    setAddressStatus('idle');
    setSuggestions([]);
    setErrors((p) => ({ ...p, address: undefined }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 800);
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    set('address', s.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setAddressStatus('valid');
    setErrors((p) => ({ ...p, address: undefined }));
  };

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files).filter((f) => f.type.startsWith('image/'));
    setForm((f) => ({ ...f, photos: [...f.photos, ...incoming] }));
  };

  const removePhoto = (index: number) =>
    setForm((f) => ({ ...f, photos: f.photos.filter((_, i) => i !== index) }));

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!form.mobile.trim()) e.mobile = 'Please enter your mobile number.';
    if (!form.vehicle.trim()) e.vehicle = 'Please enter your vehicle make & model.';
    if (!form.address.trim()) e.address = 'Please enter your service address or suburb.';
    if (!agreed) e.agreed = 'You must agree to the Terms & Conditions to continue.';
    setErrors(e);
    const firstInvalid = (['fullName', 'mobile', 'vehicle', 'address', 'agreed'] as const)
      .find((field) => Boolean(e[field]));
    if (firstInvalid) {
      requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
    }
    return !firstInvalid;
  };

  const handleContinue = () => {
    if (!validate()) {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setStep('calendar');
  };

  // Initialize the Cal.com inline embed on the calendar step.
  useEffect(() => {
    if (step !== 'calendar') return;

    const container = document.getElementById('cal-inline');
    if (container) container.innerHTML = '';

    const f = formRef.current;
    const notes = [
      `Vehicle: ${f.vehicle}`,
      f.address ? `Service Address / Suburb: ${f.address}` : '',
      f.vehicleNotes ? `Vehicle details / requests: ${f.vehicleNotes}` : '',
      f.additionalNotes ? `Additional notes: ${f.additionalNotes}` : '',
      f.photos.length ? `Photos provided: ${f.photos.length}` : '',
    ].filter(Boolean).join('\n');

    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        // eslint-disable-next-line prefer-rest-params
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () {
            // eslint-disable-next-line prefer-rest-params
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = (window as any).Cal;
    Cal('init', 'detail', { origin: 'https://cal.com' });
    Cal.ns.detail('inline', {
      elementOrSelector: '#cal-inline',
      calLink: 'ponti23/detail',
      layout: 'month_view',
      config: {
        name: f.fullName,
        email: f.email || undefined,
        notes,
      },
    });
    Cal.ns.detail('ui', {
      styles: { branding: { brandColor: '#00D4FF' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
    Cal.ns.detail('on', {
      action: 'bookingSuccessful',
      callback: (e: any) => {
        const data = e?.detail?.data ?? {};
        const iso = data?.booking?.startTime ?? data?.date ?? data?.startTime;
        const { date, time } = formatCalDateTime(iso);
        setConfirmation({ date, time });
        setStep('confirmed');
        window.scrollTo({ top: document.getElementById('booking')?.offsetTop ?? 0, behavior: 'smooth' });

        const cur = formRef.current;
        void sendBookingEmail({
          fullName: cur.fullName,
          mobile: cur.mobile,
          email: cur.email,
          vehicle: cur.vehicle,
          address: cur.address,
          preferredDate: date || 'See Cal.com booking',
          preferredTime: time || 'See Cal.com booking',
          vehicleNotes: cur.vehicleNotes,
          additionalNotes: cur.additionalNotes,
          photos: cur.photos,
        }).then((res) => {
          if (!res.ok) console.error('Booking notification email failed:', res.error);
          else if (res.photosOmitted > 0) console.warn('Some photos were not attached:', res.error);
        });
      },
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [step]);

  return (
    <section id="booking" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <header className="">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Book Your Detail</h2>
          <p className="text-white/50 mb-12 max-w-xl mx-auto">
            Tell us about your car, then pick a time that suits you. We&apos;ll review your request and be
            in touch with your quote and confirmation.
          </p>
        </header>

        {step === 'form' && (
          <form
            className="bg-surface-2 border border-white/5 rounded-2xl p-6 md:p-10 text-left"
            onSubmit={(e) => { e.preventDefault(); handleContinue(); }}
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-white/80 mb-2">
                  Full Name <span className="text-gold">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  value={form.fullName}
                  onChange={(e) => { set('fullName', e.target.value); setErrors((p) => ({ ...p, fullName: undefined })); }}
                  placeholder="Jane Smith"
                  className={`${inputBase} ${errors.fullName ? 'border-red-500/60' : 'border-white/10 focus:border-gold/50'}`}
                />
                {errors.fullName && <p id="fullName-error" className="text-red-400 text-xs mt-1.5">{errors.fullName}</p>}
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-bold text-white/80 mb-2">
                  Mobile Number <span className="text-gold">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.mobile)}
                  aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                  value={form.mobile}
                  onChange={(e) => { set('mobile', e.target.value); setErrors((p) => ({ ...p, mobile: undefined })); }}
                  placeholder="0400 000 000"
                  className={`${inputBase} ${errors.mobile ? 'border-red-500/60' : 'border-white/10 focus:border-gold/50'}`}
                />
                {errors.mobile && <p id="mobile-error" className="text-red-400 text-xs mt-1.5">{errors.mobile}</p>}
              </div>

              {/* Email (optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white/80 mb-2">
                  Email <span className="text-white/30 font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`${inputBase} border-white/10 focus:border-gold/50`}
                />
              </div>

              {/* Vehicle */}
              <div>
                <label htmlFor="vehicle" className="block text-sm font-bold text-white/80 mb-2">
                  Vehicle Make &amp; Model <span className="text-gold">*</span>
                </label>
                <input
                  id="vehicle"
                  type="text"
                  aria-invalid={Boolean(errors.vehicle)}
                  aria-describedby={errors.vehicle ? 'vehicle-error' : undefined}
                  value={form.vehicle}
                  onChange={(e) => { set('vehicle', e.target.value); setErrors((p) => ({ ...p, vehicle: undefined })); }}
                  placeholder="Toyota Corolla"
                  className={`${inputBase} ${errors.vehicle ? 'border-red-500/60' : 'border-white/10 focus:border-gold/50'}`}
                />
                {errors.vehicle && <p id="vehicle-error" className="text-red-400 text-xs mt-1.5">{errors.vehicle}</p>}
              </div>
            </div>

            {/* Address / Suburb */}
            <div className="mt-5" ref={wrapperRef}>
              <label htmlFor="address" className="block text-sm font-bold text-white/80 mb-2">
                Service Address / Suburb <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <input
                  id="address"
                  type="text"
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? 'address-error' : undefined}
                  value={form.address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  placeholder="Street address or suburb"
                  autoComplete="off"
                  className={`${inputBase} ${errors.address ? 'border-red-500/60' : addressStatus === 'valid' ? 'border-emerald-500/40' : 'border-white/10 focus:border-gold/50'}`}
                />
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
              {errors.address && <p id="address-error" className="text-red-400 text-xs mt-1.5">{errors.address}</p>}
            </div>

            {/* Vehicle notes */}
            <div className="mt-5">
              <label htmlFor="vehicleNotes" className="block text-sm font-bold text-white/80 mb-2">
                Anything we should know about the vehicle?
              </label>
              <textarea
                id="vehicleNotes"
                rows={3}
                value={form.vehicleNotes}
                onChange={(e) => set('vehicleNotes', e.target.value)}
                placeholder="Pet hair, stains, heavily soiled areas, carpet or seat cleaning requests, or anything else you'd like addressed."
                className={`${inputBase} border-white/10 focus:border-gold/50 resize-none`}
              />
              <p className="text-white/35 text-xs mt-1.5">Additional charges may apply.</p>
            </div>

            {/* Photo upload */}
            <div className="mt-5">
              <label className="block text-sm font-bold text-white/80 mb-2">
                Upload Photos <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <label
                htmlFor="photos"
                className="flex items-center justify-center gap-3 w-full border border-dashed border-white/15 rounded-xl px-4 py-6 cursor-pointer hover:border-gold/40 hover:bg-white/[0.02] transition-colors text-white/50"
              >
                <svg className="w-5 h-5 text-gold/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Tap to add photos (you can add several)</span>
              </label>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => { handlePhotos(e.target.files); e.target.value = ''; }}
              />
              {form.photos.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {form.photos.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 bg-dark border border-white/8 rounded-lg px-3 py-2 text-sm">
                      <span className="truncate text-white/70">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="text-white/40 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-white/35 text-xs mt-2">
                Photos are optional, but providing them can help us provide a more accurate quote.
              </p>
            </div>

            {/* Additional notes */}
            <div className="mt-5">
              <label htmlFor="additionalNotes" className="block text-sm font-bold text-white/80 mb-2">
                Additional Notes <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                value={form.additionalNotes}
                onChange={(e) => set('additionalNotes', e.target.value)}
                placeholder="Anything else you'd like us to know."
                className={`${inputBase} border-white/10 focus:border-gold/50 resize-none`}
              />
            </div>

            {/* Terms agreement */}
            <div className="mt-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    id="agreed"
                    type="checkbox"
                    aria-invalid={Boolean(errors.agreed)}
                    aria-describedby={errors.agreed ? 'agreed-error' : undefined}
                    checked={agreed}
                    onChange={(e) => { setAgreed(e.target.checked); setErrors((p) => ({ ...p, agreed: undefined })); }}
                    className="sr-only"
                  />
                  <div className={` w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${agreed ? ' bg-gold border-gold' : 'border-white/20 bg-dark'}`}>
                    {agreed && (
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-white/70 leading-relaxed">
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setTermsOpen(true); }}
                    className="text-gold hover:text-gold-light underline underline-offset-2 font-medium"
                  >
                    Terms &amp; Conditions and Booking Policy
                  </button>
                  .
                </span>
              </label>
              {errors.agreed && <p id="agreed-error" className="text-red-400 text-xs mt-1.5 ml-8">{errors.agreed}</p>}
              <p className="text-white/40 text-xs mt-3 ml-8 leading-relaxed">
                Please use the Additional Notes section to let us know about any important personal
                belongings or if you do not want your vehicle used in PrimeLabs photos or videos.
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gold text-black font-bold py-4 rounded-xl hover:bg-gold-light transition-all duration-200"
            >
              Continue to Date &amp; Time →
            </button>
          </form>
        )}

        {step === 'calendar' && (
          <div className=" bg-surface-2 border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 text-left flex-wrap gap-2">
              <div className="text-sm text-white/50 flex flex-col gap-0.5">
                <span>Vehicle: <span className="text-gold font-medium">{form.vehicle}</span></span>
                <span>Location: <span className="text-white/80 font-medium">{form.address}</span></span>
              </div>
              <button
                onClick={() => setStep('form')}
                className="text-xs text-white/30 hover:text-gold transition-colors"
              >
                ← Edit details
              </button>
            </div>
            <p className="text-left text-white/45 text-sm px-6 pt-4">
              Choose your preferred date &amp; time below. Wednesdays and Sundays are unavailable.
            </p>
            <div id="cal-inline" style={{ width: '100%', minHeight: '700px' }} />
          </div>
        )}

        {step === 'confirmed' && (
          <div className=" bg-surface-2 border border-gold/25 rounded-2xl p-8 md:p-12 text-center animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black mb-3">Booking Request Received!</h3>
            <p className="text-white/60 mb-2">Thanks for choosing PrimeLabs.</p>
            <p className="text-white/50 text-sm max-w-lg mx-auto mb-8">
              Your booking request has been received and is currently being reviewed. We&apos;ll be in
              contact shortly with your quote and confirmation details.
            </p>

            <div className="bg-dark border border-white/8 rounded-xl p-6 text-left max-w-md mx-auto mb-8">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4">Your Request</p>
              <dl className="space-y-3 text-sm">
                {[
                  ['Vehicle', form.vehicle],
                  ['Preferred Date', confirmation.date || '—'],
                  ['Preferred Time', confirmation.time || '—'],
                  ['Location', form.address],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-white/45 flex-shrink-0">{label}</dt>
                    <dd className="text-white/85 font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="text-white/45 text-sm max-w-lg mx-auto">
              Please note: Your appointment is not confirmed until you receive confirmation from
              PrimeLabs.
            </p>
          </div>
        )}

        {step === 'form' && (
          <p className="mt-6 text-sm text-white/40">
            Prefer to reach out first?{' '}
            <a href="#contact" className="text-gold hover:text-gold-light transition-colors">
              Get in touch
            </a>
          </p>
        )}
      </div>

      <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />
    </section>
  );
}
