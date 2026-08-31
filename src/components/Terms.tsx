'use client';

import { useEffect } from 'react';

interface TermsProps {
  open: boolean;
  onClose: () => void;
}

interface Section {
  heading: string;
  body: string[];
}

const sections: Section[] = [
  {
    heading: 'Bookings & Confirmation',
    body: [
      'Submitting a booking request through the PrimeLabs website does not automatically confirm an appointment. Booking requests will be reviewed and the customer will be contacted with their quote and confirmation details.',
      'A booking is only secured once it has been confirmed by PrimeLabs.',
    ],
  },
  {
    heading: 'Cancellations & Rescheduling',
    body: [
      "If you need to cancel or reschedule your appointment, please provide at least 24 hours' notice where possible.",
      "If you are unable to provide 24 hours' notice, please contact PrimeLabs as soon as possible.",
    ],
  },
  {
    heading: 'Weather & PrimeLabs Rescheduling',
    body: [
      'As PrimeLabs is a mobile detailing service, weather or other conditions may occasionally make it unsuitable to complete a service safely or to the expected standard.',
      'If PrimeLabs needs to postpone or cancel an appointment, the customer will be contacted to arrange a suitable alternative.',
    ],
  },
  {
    heading: 'Vehicle Access & Work Area',
    body: [
      'The customer must ensure PrimeLabs has reasonable access to the vehicle and a safe, suitable area to carry out the service.',
      'Access to a suitable water supply and electricity must be available at the service location for the duration of the appointment unless otherwise agreed with PrimeLabs beforehand.',
    ],
  },
  {
    heading: 'Personal Belongings & Rubbish',
    body: [
      'Customers should remove valuables and important personal belongings from the vehicle before the appointment.',
      'Items that are clearly identifiable as rubbish may be removed and disposed of as part of the service. Items that cannot reasonably be identified as rubbish will be left in the vehicle.',
      'If there are any items the customer would specifically like kept, removed or treated differently, this should be mentioned in the Additional Notes section when submitting the booking request.',
      'PrimeLabs is not responsible for personal belongings that have not been removed from the vehicle prior to the service, except where required by law.',
    ],
  },
  {
    heading: 'Existing Damage & Vehicle Condition',
    body: [
      'PrimeLabs is not responsible for damage, defects or deterioration that existed before the service.',
      'Customers should disclose any known damaged, loose, fragile or defective areas that may be affected by the detailing process before work begins.',
    ],
  },
  {
    heading: 'Additional Work & Pricing',
    body: [
      'Quotes are based on the information provided by the customer when submitting their booking request.',
      'Additional services or requirements outside the agreed Maintenance Detail may result in an additional charge. Any additional charges will be communicated and agreed upon before the additional work is carried out.',
    ],
  },
  {
    heading: 'Service Results',
    body: [
      'PrimeLabs will make reasonable efforts to achieve the best possible result from the booked service. However, some stains, marks, scratches, oxidation, wear or other existing imperfections may not be completely removable through detailing.',
    ],
  },
  {
    heading: 'Photography & Media',
    body: [
      'PrimeLabs may take before-and-after photographs or videos of vehicles for documentation, portfolio, website and social media purposes.',
      'Vehicle registration plates and other clearly identifying personal information will be obscured before photographs or videos are published publicly.',
      'Customers who do not wish for their vehicle to be photographed or used for promotional purposes can advise PrimeLabs in the Additional Notes section of their booking request.',
    ],
  },
  {
    heading: 'Payment',
    body: [
      'Payment is due upon completion of the service.',
      'PrimeLabs currently accepts:',
    ],
  },
  {
    heading: 'Agreement',
    body: [
      'By proceeding with a confirmed booking, the customer acknowledges and agrees to these Terms & Conditions.',
    ],
  },
];

export default function Terms({ open, onClose }: TermsProps) {
  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
    >
      <div
        className="relative w-full max-w-2xl my-8 bg-surface-2 border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/10 bg-surface-2/95 backdrop-blur rounded-t-2xl">
          <div>
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">PrimeLabs</p>
            <h2 id="terms-title" className="text-xl md:text-2xl font-black">Terms &amp; Conditions</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-6 space-y-6">
          {sections.map((s) => (
            <div key={s.heading}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{s.heading}</h3>
              {s.body.map((p, i) => (
                <p key={i} className="text-white/55 text-sm leading-relaxed mb-2 last:mb-0">{p}</p>
              ))}
              {s.heading === 'Payment' && (
                <ul className="mt-2 space-y-1.5">
                  {['PayID / bank transfer', 'Cash'].map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 md:px-8 py-4 border-t border-white/10 bg-surface-2/95 backdrop-blur rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gold text-black font-bold py-3 rounded-xl hover:bg-gold-light transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
