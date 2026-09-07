const includes = ['Full vacuum', 'Surfaces, cracks & crevices cleaned', 'Plastics & leather cleaned and protected', 'Floor mats & carpets cleaned (no shampoo)', 'Interior glass cleaned', 'Full hand wash & foam bath', 'Rims & tyres deep cleaned', 'Ceramic wax paint protection'];
export default function Pricing() {
  return <section id="pricing" className="pricing-section light-section"><div className="pricing-panel page-width">
    <div className="pricing-title"><h2>The Maintenance<br />Detail.</h2><p>One package. A proper reset.</p><div className="price"><span>FROM</span><strong>$180</strong><span>AUD</span></div><a className="button button-dark" href="#booking">Make it feel new again <span aria-hidden="true">↗</span></a></div>
    <div className="pricing-includes"><h3>Good care comes standard.</h3><ul>{includes.map(item => <li key={item}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>{item}</li>)}</ul><p className="pricing-note">Starting price. Tell us about your vehicle when requesting a booking. We’ll confirm the details with you.</p></div>
  </div></section>;
}
