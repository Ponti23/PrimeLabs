# Managing the PrimeLabs Website

A quick guide to the things you'll want to change yourself. Most changes are made
by editing a file on GitHub — when you save (commit) it, Vercel automatically
rebuilds and deploys the site within a minute or two.

---

## 1. Viewing new booking requests

When a customer completes a booking you get notified in **three** places:

- **Email** — a "New PrimeLabs Booking Request" email arrives at
  **hello.primelabs@gmail.com** with all their details and any photos attached.
- **Web3Forms dashboard** — every submission is also logged in your Web3Forms
  account (https://web3forms.com) as a backup, in case an email is missed.
- **Cal.com dashboard** — the chosen date/time appears on your Cal.com calendar
  (event **ponti23/detail**), and Cal.com sends its own booking email too.

> A booking is a **request** until you contact the customer to confirm. The site
> makes this clear to them on the confirmation screen.

---

## 2. Blocking dates/times & changing your availability

All scheduling lives in **Cal.com** — no code needed.

1. Log in at https://cal.com and open the **ponti23/detail** event / your
   **Availability** settings.
2. **Weekly availability** is currently:
   - Available: **Monday, Tuesday, Thursday, Friday, Saturday**
   - Unavailable: **Wednesday, Sunday**
   - Hours: **7:00 AM – 6:00 PM**, with booking **start times 7:00 AM – 4:00 PM**
3. To **block a specific date** (holiday, day off), add a **date override** in
   Cal.com and mark it unavailable.
4. To **block part of a day**, add a date override with a shorter time range.
5. To **change your regular hours or days**, edit the weekly availability.

Changes take effect immediately — the website reads live availability from
Cal.com, so there's nothing to redeploy.

> First-time setup: make sure the event duration + availability window are set so
> the **last start time is 4:00 PM** (e.g. a 2-hour service with availability
> ending at 6:00 PM).

---

## 3. Updating the Before & After photos

Photos live in **`public/gallery/`** and are listed in **`src/config/gallery.ts`**. The redesigned site currently shows stills from your video, stored in **`public/media/`**. Placeholder SVG pairs are hidden. Adding real JPG, PNG or WebP before/after pairs enables the category filters and comparison sliders automatically.

**Easiest way — replace a file:**
Upload your new photo to `public/gallery/` using the **exact same filename** as the
placeholder you're replacing (e.g. `exterior-1-after.svg`). Tip: real photos are
usually `.jpg` — if you upload `exterior-1-after.jpg`, update the matching path in
`src/config/gallery.ts` (change `.svg` to `.jpg`).

**To add or remove photos, or rename files**, edit `src/config/gallery.ts`. Each
item looks like:

```ts
{
  label: 'Full Hand Wash & Foam Bath',
  before: '/gallery/exterior-1-before.jpg',
  after: '/gallery/exterior-1-after.jpg',
},
```

- Photos are grouped under the three tabs: **Exterior**, **Interior**,
  **Wheel Cleaning**.
- Use before/after shots taken from the **same angle** so the slider lines up.
- Landscape, roughly **4:3**, works best.

---

## 4. Adding genuine reviews

Reviews live in **`src/config/reviews.ts`**. While the list is empty, the site
hides the reviews section. To add a review, add an object to the
`reviews` array:

```ts
export const reviews: Review[] = [
  { name: 'Jordan M.', location: 'Sydney', rating: 5,
    text: 'Fantastic job — my car looks brand new!' },
];
```

- `rating` is a whole number from **1 to 5**.
- `location` is optional (leave it out if you like).
- Save the file and the review appears after the next deploy.

---

## 5. Changing the price or what's included

Open **`src/components/Pricing.tsx`**:

- The **price** is the `$180` in the price block. Also update the description in `src/app/layout.tsx` when the price changes.
- The **inclusions** are the list at the top (`const includes = [ … ]`) — edit,
  add, or remove lines there.

---

## Setup checklist (one-time)

- [ ] Create a Web3Forms access key with recipient **hello.primelabs@gmail.com**,
      and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel → Settings →
      Environment Variables (and in `.env.local` for local testing).
- [ ] In Cal.com, set the availability described in section 2.
- [ ] Replace the placeholder images in `public/gallery/` with real photos.
