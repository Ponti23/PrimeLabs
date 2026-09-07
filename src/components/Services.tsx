const services = [
  { name: 'A clean you can feel.', label: 'INTERIOR', text: 'From the daily crumbs to the hard-to-reach crevices. A thorough vacuum, surface clean and protection for your plastics and leather.', tags: 'Vacuum · Surfaces · Glass · Mats' },
  { name: 'Bring back the shine.', label: 'EXTERIOR', text: 'A full hand wash and foam bath to lift the everyday build-up. Finished with ceramic wax paint protection for that freshly detailed feeling.', tags: 'Foam bath · Hand wash · Ceramic wax' },
  { name: 'Finish at ground level.', label: 'WHEELS & TYRES', text: 'The details make the difference. A deep clean of your rims and tyres completes the look, right down to the road.', tags: 'Rims · Tyres · The finishing touches' },
];
export default function Services() {
  return <section id="services" className="services light-section section-space"><div className="page-width">
    <div className="section-heading"><h2>Every surface.<br />Nothing overlooked.</h2><p>Your daily driver deserves more than a quick rinse. One considered detail, inside and out. All at your place.</p></div>
    <div className="service-list">{services.map(service => <article className="service-row" key={service.label}><span className="service-label">{service.label}</span><h3>{service.name}</h3><div><p>{service.text}</p><span className="service-tags">{service.tags}</span></div><span className="service-arrow" aria-hidden="true">↗</span></article>)}</div>
  </div></section>;
}
