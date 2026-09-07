import { reviews } from '@/config/reviews';
export default function Testimonials() {
 if (!reviews.length) return null;
 return <section className="reviews-section page-width" aria-labelledby="reviews-heading"><h2 id="reviews-heading">Word gets around.</h2><div className="review-list">{reviews.map((review,index) => <blockquote key={index}><span aria-label={review.rating + ' out of 5 stars'}>{review.rating}/5</span><p>“{review.text}”</p><cite>{review.name}{review.location ? ' · '+review.location : ''}</cite></blockquote>)}</div></section>;
}
