export default function Booking() {
  return (
    <section id="booking" className="py-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gold text-sm font-bold tracking-widest uppercase mb-3">
          Schedule Online
        </p>
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Book Your Detail
        </h2>
        <p className="text-white/50 mb-12 max-w-xl mx-auto">
          Pick a time that works for you. We&apos;ll confirm your booking and show
          up ready to work.
        </p>

        <div className="bg-surface-2 border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="text-white/30 text-sm mb-6">
            Cal.com booking widget will appear here
          </div>
          <div className="bg-dark/60 border border-white/5 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-white/40 text-sm">
                Booking calendar coming soon
              </p>
              <p className="text-white/20 text-xs mt-1">
                Powered by Cal.com
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-sm text-white/40 text-center">
            Prefer to call?{" "}
            <a href="#contact" className="text-gold hover:text-gold-light transition-colors">
              Get in touch directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
