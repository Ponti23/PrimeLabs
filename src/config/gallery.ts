// ─────────────────────────────────────────────────────────────────────────────
// PrimeLabs — Before & After Gallery
//
// HOW TO UPDATE PHOTOS (see MANAGE.md):
//   Each item has a `before` and `after` image path that points to a file in
//   the `public/` folder. To swap a photo, either:
//     (a) replace the file in `public/gallery/` keeping the same name, or
//     (b) drop a new file in `public/gallery/` and update the path here.
//
//   Paths are relative to `public/` (so "/gallery/exterior-1-after.jpg"
//   means the file at "public/gallery/exterior-1-after.jpg").
//
//   Add or remove items freely — the category tabs render whatever is listed.
//   Recommended: landscape photos, roughly 4:3, taken from the same angle so
//   the before/after slider lines up.
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryCategory = 'Exterior' | 'Interior' | 'Wheel Cleaning';

export interface BeforeAfterPair {
  label: string;
  before: string;
  after: string;
}

export const galleryCategories: GalleryCategory[] = [
  'Exterior',
  'Interior',
  'Wheel Cleaning',
];

export const gallery: Record<GalleryCategory, BeforeAfterPair[]> = {
  Exterior: [
    {
      label: 'Full Hand Wash & Foam Bath',
      before: '/gallery/exterior-1-before.svg',
      after: '/gallery/exterior-1-after.svg',
    },
    {
      label: 'Ceramic Wax Paint Protection',
      before: '/gallery/exterior-2-before.svg',
      after: '/gallery/exterior-2-after.svg',
    },
  ],
  Interior: [
    {
      label: 'Full Vacuum & Surface Wipe-Down',
      before: '/gallery/interior-1-before.svg',
      after: '/gallery/interior-1-after.svg',
    },
    {
      label: 'Plastics & Leather Clean',
      before: '/gallery/interior-2-before.svg',
      after: '/gallery/interior-2-after.svg',
    },
  ],
  'Wheel Cleaning': [
    {
      label: 'Deep Cleaning of Rims & Tyres',
      before: '/gallery/wheel-1-before.svg',
      after: '/gallery/wheel-1-after.svg',
    },
    {
      label: 'Rim Detail & Tyre Dressing',
      before: '/gallery/wheel-2-before.svg',
      after: '/gallery/wheel-2-after.svg',
    },
  ],
};
