---
name: PrimeLabs
description: Editorial mobile car detailing site built around graphite, acid yellow, and considered utility.
colors:
  acid: "#dfff00"
  acid-light: "#eaff78"
  ink: "#181a1b"
  paper: "#f4f4ed"
  muted: "#aeb0aa"
  surface: "#202325"
  surface-2: "#242729"
  line: "#414440"
  input-bg: "#151718"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(43px, 9.1vw, 96px)"
    fontWeight: 700
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(38px, 4.2vw, 62px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  legacy-md: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "56px"
  section: "104px"
components:
  button-primary:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 21px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 21px"
    height: "52px"
  input:
    backgroundColor: "{colors.input-bg}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "52px"
---

# Design System: PrimeLabs

## Overview

**Creative North Star: “The Considered Detail”**

PrimeLabs is a small mobile car detailing business whose primary job is to explain one Maintenance Detail and collect a request that the owner can confirm. The visual system treats detailing like editorial craft: restrained copy, strong photography, visible structure, and small signals of care rather than a generic automotive dashboard.

The implemented page is code-led. It uses a dark graphite shell, a warm off-white service surface, acid yellow as a deliberate action and emphasis color, and sharp rectangular geometry. The hero has an optional 27-second film: the poster remains the default until the visitor explicitly plays the video. The service facts, $180 starting price, genuine-review policy, booking flow, and owner-confirmation language are product constraints, not decorative copy.

**Key Characteristics:**

- Editorial, image-led hierarchy with compact utility labels.
- High-contrast acid actions against graphite and paper surfaces.
- Flat, square-edged UI with tonal layering instead of rounded-card styling.
- Responsive layout that becomes a single-column reading flow on small screens.

## Colors

The palette is intentionally narrow: graphite and near-black carry the working shell, paper carries explanatory sections, and acid yellow is reserved for action, selection, and emphasis.

### Primary

- **Acid yellow** (#dfff00): Primary action, selected gallery tab, price panel, focus ring, and brand accent.
- **Soft acid** (#eaff78): Hover treatment for acid actions.

### Neutral

- **Graphite ink** (#181a1b): Page background, dark buttons, header, and footer.
- **Warm paper** (#f4f4ed): Light service sections and primary text on dark surfaces.
- **Muted grey** (#aeb0aa): Secondary copy and subdued metadata.
- **Panel grey** (#202325): Booking and content panels.
- **Raised panel grey** (#242729): Available surface token for darker content.
- **Divider grey** (#414440): Header and structural rules.
- **Input black** (#151718): Form-field backgrounds and booking summary surfaces.

### Named Rules

**The Acid Signal Rule.** Use acid yellow for a clear action, selected state, focus state, or deliberate brand mark; do not turn every piece of copy into an accent.

## Typography

**Display Font:** Inter (with sans-serif fallback)

**Body Font:** Inter (with sans-serif fallback)

**Label/Mono Font:** Inter, used in uppercase with tracking for utility labels.

**Character:** Inter is used as a single-voice system: heavy and tightly tracked for headlines, regular and open for explanatory copy, and compact uppercase for operational labels. No decorative display face is introduced.

### Hierarchy

- **Display** (700, `clamp(52px, 6.7vw, 96px)`, 1.01, `-0.04em`): Hero headline; reduced to `clamp(43px, 9.1vw, 68px)` on small screens.
- **Headline** (600, `clamp(38px, 4.2vw, 62px)`, 1.05, `-0.04em`): Section titles and editorial statements.
- **Title** (500–600, approximately 20–50px): Service row titles, pricing title, and booking title; booking uses uppercase treatment.
- **Body** (400, 13–14px, 1.7–1.8): Service explanations, about copy, booking guidance, and metadata.
- **Label** (600, 9–12px, tracked, often uppercase): Category labels, utility strip, navigation, form labels, and captions.

## Layout

The desktop canvas uses a centered `.page-width` container: `calc(100% - 112px)` with a `1488px` maximum. The header is `104px` tall. Large sections use approximately `104px` vertical rhythm; the hero heading has `62px` top and `50px` bottom padding.

At `max-width: 1100px`, the page gutters tighten to `32px`, the header descriptor disappears, and service/pricing grids compress. At `max-width: 760px`, gutters become `20px`, the header becomes `80px`, navigation becomes a menu, the hero and service sections stack, the work grid becomes one column, and the pricing/about/footer layouts collapse. Booking has its own `max-width: 640px` form treatment and a `min-width: 768px` larger-panel rule.

The hero film spans nearly the viewport with a `24px` desktop side margin, a `clamp(360px, 39vw, 610px)` height, and a fixed `390px` small-screen height. Gallery comparisons use a `1.65` aspect ratio. Content order is service explanation, pricing, work, about, reviews when present, then booking.

## Elevation & Depth

The system is flat by default. Depth comes from alternating graphite/paper surfaces, one-pixel rules, image crops, and the acid selection color. Booking panels retain a restrained `0 18px 45px rgba(0, 0, 0, .24)` shadow; the terms dialog uses a stronger `0 24px 70px rgba(0, 0, 0, .48)` shadow. Hover states shift color or image scale rather than lifting cards dramatically.

**The Flat-By-Default Rule.** Do not add decorative card shadows or gradients when tonal contrast and a border already establish the hierarchy.

## Shapes

The active visual language is square and architectural: buttons, inputs, booking panels, terms surfaces, upload areas, and confirmation elements use `0px` radius. Structural edges are expressed with one-pixel grey rules. The hero and gallery rely on rectangular image frames; gallery images are cropped with `object-fit: cover`, while the opened film uses `contain` so the footage is not silently cropped.

Older components retain a few rounded utility classes, represented by the `legacy-md` token, but new branded surfaces should follow the zero-radius treatment.

## Components

### Buttons

- **Shape:** Square (`0px` radius), compact and text-led.
- **Primary:** Acid background with ink text; typically `16px 21px`, `52px` minimum height. The hero uses “Book your detail”; booking uses a taller uppercase submit button.
- **Hover / Focus:** Acid shifts to soft acid on general buttons; booking actions shift to warm paper. All controls use the acid focus ring with a visible offset.
- **Secondary:** Ink background with paper text for contrast against the acid pricing panel.

### Cards / Containers

- **Corner Style:** Square on active redesign surfaces.
- **Background:** Graphite shell, panel grey for booking, paper for service sections, acid for pricing.
- **Shadow Strategy:** Restrained panel shadows only; see Elevation & Depth.
- **Border:** Structural `#3a3e40` or `#414440` rules, with acid on selected/action states.
- **Internal Padding:** Desktop pricing uses `56px`; booking uses `48px` from `min-width: 768px` and `20px` on small screens.

### Inputs / Fields

- **Style:** Near-black `#151718` fill, muted grey border, paper text, square corners, minimum `52px` height.
- **Focus:** Acid border plus a `2px` acid outline with offset; caret is acid.
- **Error / Disabled:** Invalid fields use a red `#ff6b62` border. Inline errors are small and red; there is no separate disabled visual system.

### Navigation

- **Desktop:** `104px` graphite header with wordmark, small descriptor, compact tracked links, and a bordered booking link.
- **Mobile:** `80px` header with a Menu/Close toggle. The navigation expands as a full-width dark panel beneath the header; links have generous `15px` vertical padding.
- **Focus:** Acid focus ring; mobile menu state is communicated through visible “Menu”/“Close” text and `aria-expanded`.

### Hero Film

The poster image is the default and is also the accessible visual description. The play control explicitly reveals the native `<video>` controls and starts `/media/primelabs-film.mp4`; playback is optional and never required to understand the service.

### Before / After Work

Gallery tabs use `aria-pressed` and acid selected state. Available real pairs are shown as an image comparison with a range slider; SVG placeholder pairs are intentionally suppressed, with the real film stills used as the empty-gallery fallback.

## Do's and Don'ts

### Do:

- **Do** preserve the graphite / paper / acid palette and use acid sparingly as a signal.
- **Do** keep the Maintenance Detail facts accurate: starting at $180, interior/exterior/wheels, ceramic wax, and no carpet shampoo.
- **Do** keep the page readable without video playback or gallery assets; these are enhancements.
- **Do** use real customer reviews only; an empty review state is valid.
- **Do** preserve square form controls, visible focus rings, and the responsive breakpoints documented above.
- **Do** respect reduced-motion preferences; the global stylesheet disables animation and smooth scrolling when requested.

### Don't:

- **Don't** present placeholder SVGs as completed customer work.
- **Don't** invent reviews, service-area claims, contact details, or booking confirmations.
- **Don't** replace the restrained editorial system with generic rounded cards, neon gradients, or a dashboard-style layout.
- **Don't** make the film or gallery a prerequisite for booking or understanding the service.
- **Don't** remove the owner-confirmation language: submitting a request does not itself secure an appointment.
