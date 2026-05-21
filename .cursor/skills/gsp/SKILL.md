---
name: gsp
description: Builds and maintains the Aman Groom Studio luxury e-commerce frontend (Next.js, Tailwind, shadcn, Framer Motion). Use when working on Aman Groom Studio, groom couture, luxury wedding wear, /gsp, or this project's UI, pages, components, or brand assets.
---

# Aman Groom Studio — GSP

## Brand (verbatim)

- **Brand Name:** Aman Groom Studio
- **Tagline:** Luxury Groom Couture
- **Location:** E-19, BM, Lajpat Nagar-II, Central Market, New Delhi

## Logo & favicon

- Primary logo: `public/logo.png` (source: project root `Logo.png`)
- Favicon: use `public/logo.png` in `app/layout.tsx` metadata `icons`
- Never replace with generic icons; keep burgundy-on-charcoal mark

## Visual system

| Token | Role |
|-------|------|
| `--burgundy` / `--wine` | Primary brand, CTAs |
| `--gold` / `--champagne` | Accents, labels |
| `--ivory` | Body text on dark |
| `--charcoal` | Backgrounds |

- Headings: Cormorant Garamond
- Body: Manrope
- Accent script: sparingly for couture labels
- Dark cinematic UI: gradients, grain overlay, glass panels — not flat black/white
- Avoid generic Shopify/SaaS templates and animation spam

## Stack

- Next.js App Router, TypeScript strict
- Tailwind + CSS variables in `globals.css`
- shadcn/ui (customized), Framer Motion, Zustand
- `@/` imports, modular `src/components/{feature}/`

## Architecture

```
src/
├── app/           # routes: /, /shop, /shop/[slug], /checkout, /booking, /wishlist
├── components/    # ui/, layout/, home/, shop/, cart/, booking/
├── data/          # demo products, collections, testimonials (CMS-ready schemas)
├── store/         # cart, wishlist, recently-viewed (Zustand + persist)
├── types/         # Product, Collection, Testimonial, GalleryItem
└── lib/           # utils, constants, image helpers
```

## CMS-ready schemas

Extend `src/types/cms.ts` — do not break field names when wiring a CMS:

- `Product`, `Collection`, `Testimonial`, `GalleryItem`

## Images

- Section-specific luxury Indian groom couture visuals under `public/images/`
- Consistent grading: deep burgundy/wine, gold highlights, charcoal shadows, editorial framing
- `next/image` with `sizes`, lazy load, skeleton placeholders via `LuxuryImage`
- Generate or add campaign-quality assets per category (sherwani, tuxedo, tailoring, etc.)

## Performance (rate-limit safe)

- Static/demo data in `src/data/` — no unnecessary API calls
- `dynamic` only where required; prefer static pages
- Lazy-load below-fold sections and images
- Skeleton loaders for async UI; graceful empty/error states

## Pages checklist

- [ ] Home: hero, collections, bespoke, timeline, products, testimonials, clients, gallery, booking CTA, store, FAQ, footer
- [ ] Shop: filter, search overlay, category nav
- [ ] PDP: zoom gallery, variants, size guide, sticky mobile CTA
- [ ] Cart drawer, wishlist, multi-step checkout
- [ ] Booking: date, slots, form, WhatsApp CTA

## Quality bar

- Mobile-first, sticky bottom nav on mobile
- Floating navbar: transparent → solid on scroll
- Accessibility: semantic HTML, focus states, aria on modals/drawers
- All cart/wishlist/checkout/booking interactions must work with demo data

## Do not

- Default Tailwind/shadcn look without customization
- Plain cards without art direction
- `console.log` in committed code
- Skills in `~/.cursor/skills-cursor/`
