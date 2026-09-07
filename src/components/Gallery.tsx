'use client';
import Image from 'next/image';
import { useState } from 'react';
import { gallery, galleryCategories, type BeforeAfterPair } from '@/config/gallery';
function Comparison({ pair }: { pair: BeforeAfterPair }) {
 const [position, setPosition] = useState(50);
 return <figure className="work-figure"><div className="comparison"><Image src={pair.after} alt={pair.label + ' after detailing'} fill sizes="(max-width: 760px) 100vw, 50vw" /><div style={{position:'absolute',inset:0,clipPath:`inset(0 ${100-position}% 0 0)`}}><Image src={pair.before} alt={pair.label + ' before detailing'} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><span className="comparison-label before">Before</span><span className="comparison-label after">After</span><input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label={pair.label + ' before and after comparison'} /></div><figcaption>{pair.label}</figcaption></figure>;
}
export default function Gallery() {
 const categories = galleryCategories.filter(category => gallery[category].some(pair => !pair.before.endsWith('.svg') && !pair.after.endsWith('.svg')));
 const [selected, setSelected] = useState(categories[0]);
 const pairs = selected ? gallery[selected].filter(pair => !pair.before.endsWith('.svg') && !pair.after.endsWith('.svg')) : [];
 return <section id="gallery" className="work-section page-width"><div className="section-heading"><h2>Less talk.<br />More detail.</h2><p>A closer look at PrimeLabs.<br />Real footage. Care in the little things.</p></div>
 {categories.length > 0 ? <><div className="work-tabs" role="group" aria-label="Gallery category">{categories.map(category => <button key={category} aria-pressed={category===selected} onClick={() => setSelected(category)}>{category}</button>)}</div><div className="work-grid">{pairs.map(pair => <Comparison key={pair.label} pair={pair} />)}</div></> :
 <div className="work-grid"><figure className="work-figure"><div className="work-photo"><Image src="/media/hero.jpg" alt="Blue Volkswagen exterior featured in the PrimeLabs detailing film" fill sizes="(max-width: 760px) 100vw, 60vw" /></div><figcaption><span>THE OUTSIDE STORY</span><span>From the PrimeLabs film ↗</span></figcaption></figure><figure className="work-figure"><div className="work-photo"><Image src="/media/interior.jpg" alt="Volkswagen interior featured in the PrimeLabs detailing film" fill sizes="(max-width: 760px) 100vw, 40vw" /></div><figcaption><span>A FRESH PERSPECTIVE</span><span>Inside the detail ↗</span></figcaption></figure></div>}
 </section>;
}
