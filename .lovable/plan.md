# The Woodpecker Inn — Authentic Mountain Lodge Rebrand

Complete visual and content pivot away from the current luxury-hotel styling toward a warm, Scandinavian/modern-mountain-lodge feel. No new AI images (per your instruction — real property photos will replace placeholders later).

## 1. Design system overhaul

- **Colors** (replace pine/wood/mist tokens):
  - Forest Green `#234229` (primary)
  - Warm Wood Brown `#8B5E3C` (secondary)
  - Cream `#F8F6F1` (background)
  - Sky Blue `#9CCBEA` (accent)
  - Charcoal `#2B2B2B` (text)
- **Fonts**: Replace Playfair/Inter with **Poppins** (headings) + **DM Sans** (body). Manrope as alt.
- Update `index.css`, `tailwind.config.ts`, `index.html` font loading, and Button variants (rename `pine` → `forest`, `wood` → `brown`).

## 2. Homepage — full rebuild (11 sections)

1. **Hero** — "Wake Up To The Mountains Of Jibhi" + new subheading, Book Now / Explore Rooms CTAs, sticky booking bar
2. **Trust bar** — animated counters (Google/Booking/MMT ratings, review count, happy guests, years)
3. **Why Guests Love Us** — 12 icon cards (Mountain Views, Balconies, Bonfire, Café, WiFi, Dorm, Private Rooms, Family, Peaceful, Walking Distance, Nature, Fresh Air)
4. **Rooms** — 4 cards: Private Deluxe, Mountain View, Family, Dormitory
5. **Café Experience** — large photo band, warm food-focused copy
6. **Experience Jibhi** — 11 attraction cards (Mini Thailand, Waterfall, Jalori, Serolsar, Chehni Kothi, River Walk, Sunrise, Café Hop, Adventure, Trekking, Nature Walks)
7. **Gallery** — masonry grid (existing lightbox reused)
8. **Reviews** — empty scaffold ready for Google embed + recurring themes chips
9. **Property Amenities** — 15-item grid
10. **FAQ** — 14 questions (check-in, parking, road, pets, bonfire, WiFi, distances, etc.)
11. **Location** — Google Map embed + WhatsApp/Call/Book buttons

## 3. Pages

- **Keep & update tone**: Home, About, Rooms, Café, Attractions (renamed "Explore Jibhi"), Gallery, Contact
- **New pages**: Dormitory, Blog (list + placeholder posts), Privacy Policy, Terms, Cancellation Policy
- **Remove**: Pet Friendly (folded into amenities — property isn't explicitly pet-focused per new brief)

## 4. Copy overhaul

Purge "luxury / premium / elite / royal / exclusive" from all pages. Rewrite in warm, conversational, nature-focused voice throughout.

## 5. SEO

- New meta titles/descriptions per page targeting: "Best Hotel in Jibhi", "Dormitory Jibhi", "Hotels Near Mini Thailand/Jalori/Serolsar", "Backpacker Hostel Jibhi"
- Update Hotel schema in `index.html` (add priceRange, amenities, new address)
- Keep existing FAQ schema, extend with new questions
- `robots.txt` + `sitemap.xml` update for new routes

## 6. Floating conversion widget

Sticky Book/WhatsApp/Call buttons visible on every page (desktop side rail + mobile bottom bar).

## Technical notes

- Colors migrated via CSS variables — no component-level hex changes needed
- Button `variant="pine"` renamed to `variant="forest"` across all files
- Header/Footer redesigned with new palette and menu (add Dormitory, Blog links)
- All existing generated images kept as placeholders with `alt` text noting real photos coming
- Framer Motion animations kept lightweight (fade + counter animations only)

## Out of scope for this pass

- Real blog posts (only scaffold + 2 sample posts)
- Actual Google Reviews embed (needs API key — scaffold only)
- Payment/booking gateway integration
- New image generation (per your instruction)

Ready to build?