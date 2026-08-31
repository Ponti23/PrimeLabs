// ─────────────────────────────────────────────────────────────────────────────
// PrimeLabs — Customer Reviews
//
// HOW TO ADD A REVIEW (see MANAGE.md):
//   Add an object to the `reviews` array below, e.g.
//
//     { name: "Jordan M.", location: "Sydney", rating: 5,
//       text: "Fantastic job, car looks brand new!" },
//
//   Save the file and it will appear on the site after the next deploy.
//   `rating` is a whole number from 1 to 5. `location` is optional.
//   While the array is empty, the Reviews section shows a clean
//   "reviews coming soon" placeholder.
// ─────────────────────────────────────────────────────────────────────────────

export interface Review {
  name: string;
  location?: string;
  rating: number; // 1–5
  text: string;
}

export const reviews: Review[] = [
  // No reviews yet — add genuine customer reviews here.
];
