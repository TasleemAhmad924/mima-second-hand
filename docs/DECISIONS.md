# MiMa Decisions

Architecture Decision Records. Newest first. Status: **accepted** | **proposed** | **superseded**.

---

## 2026-09-17 — Pre-opening: no fake inventory, Wohlfühlort amenities

**Status:** accepted

Until the Laden is open, public pages must not present mock catalogue cards
as real stock. Homepage discovery and `/entdecken` are a coming-soon editorial
state. `mockProducts` stay in the repo for later Pladsly catalogue work only.

The rental recommender middle volume is labelled **„mehrere Teile“** (not
„eine Auswahl“) so the three options stay parallel: wenige / mehrere / viele.
Recommendation logic is unchanged.

A dedicated Wohlfühlort section lists only confirmed amenities:
**Spielecke, Wickeltisch, WC**. No invented extras. The Miriam story teaser
remains a separate section.

---

## 2026-09-17 — Final pre-launch audit (verify-first)

**Status:** accepted

Launch audit against the current site, not a rebuild. Lille Loppe used only as an IA/clarity benchmark.

- Homepage IA, booking gate, 17 %, Stockelsdorf, shelf 90 × 49 × 181 cm, Miriam photo, CCM19, Web3Forms, and the immediate Google Maps embed were already correct and were left in place.
- Navbar hover was **not missing**: desktop links already use `.link-underline`; the CTA already hovers charcoal → taupe-ink (DESIGN.md). Hover is now limited to `@media (hover: hover)`. No new fill animation was invented.
- SEO: canonicals and sitemap use trailing slashes to match `trailingSlash: true`. Preview/dev is `noindex` / `Disallow: /`. Production robots allow `/` and disallow `/intern/` and `/api/`. LocalBusiness JSON-LD now includes logo + image; still no invented ratings or coordinates.
- `poweredByHeader: false`. Next.js patched 16.3.2 → 16.3.5 (security advisories). Four large product JPEGs recompressed.
- Maps stay **immediate load** (client). Do not restore click-to-load for launch.
- Google Search Console: no verification token in the repo; submit sitemap after the production domain is live.

---

## 2026-09-17 — Google Maps embed loads immediately

**Status:** accepted

The Laden map on the homepage and `/kontakt` loads the Google Maps iframe
at once. There is no „Google Maps laden“ button.

- Address remains **Segeberger Straße 8, 23617 Stockelsdorf**.
- Embed is still the share iframe (`maps/embed?pb=…`). No Maps JavaScript API,
  no Leaflet, no API key.
- Cookie banner remains CCM19. Do not reintroduce a second click-to-load gate
  in this repo.
- Secondary action: „Route mit Google Maps“ opens Google Maps in a new tab.
- The SVG floor plan (`StoreMap`) is unrelated and stays.

This supersedes click-to-load until Usercentrics.

---

## 2026-09-17 — Contact form via Web3Forms

**Status:** accepted

The Kontakt form sends through **Web3Forms**, not `mailto:`.

- Public access key lives in `src/config/web3forms.ts` (overridable with
  `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`). Web3Forms documents this as a
  client-side form id, not a server secret.
- Submissions POST from the browser to `https://api.web3forms.com/submit`.
  Do not proxy this on the server: Web3Forms server-side posting needs a
  paid plan and IP allowlisting.
- CSP `connect-src` includes `https://api.web3forms.com`.
- A honeypot field discards bot traffic locally. Delivery still uses the
  existing `ContactTransport` so the form UI stays independent of the vendor.
- The Datenschutzerklärung names Web3Forms under Kontaktformular.

---

## 2026-09-17 — Datenschutzerklärung published from e-recht24 text

**Status:** accepted

The client supplied the e-recht24 text version. It is on `/datenschutz`.

- Controller identity and contact come from `src/config/site.ts` (Miriam Vlot, MiMa Second Hand, Segeberger Straße 8, Stockelsdorf, confirmed phone and e-mail).
- Hosting is published as **IONOS**, as in the supplied text. Do not rewrite this to Vercel without a new legal text.
- Included as supplied: Cookies, Kontaktanfragen, Instagram/Meta, Newsletter, local Google Fonts, Google Maps, Art. 21 caps, Quelle e-recht24.
- Do not invent extra processors (CCM19, Usercentrics, Vercel, Pladsly) into this copy.
- Point CCM19’s privacy-policy URL at `/datenschutz/`.

---

## 2026-09-17 — Google Maps for the Laden location; click-to-load until Usercentrics

**Status:** superseded

Superseded by immediate embed loading (same day). The map is still Google Maps
Embed for Segeberger Straße 8, Stockelsdorf, not OpenStreetMap.

---

## 2026-09-17 — Confirmed owner, e-mail and Instagram

**Status:** accepted

Client-confirmed public identity:

- Inhaberin: **Miriam Vlot**
- E-Mail: **info@mima-secondhand.de** (replaces the draft `hallo@` address)
- Instagram: **https://www.instagram.com/mima.second.hand/**

Source of truth: `src/config/site.ts`. AGB, Impressum, Datenschutz,
footer, contact form and JSON-LD read from there.

The Datenschutzerklärung is published on `/datenschutz`. A Widerrufsbelehrung is still not on the site.

---

## 2026-09-16 — Public booking is not open yet

**Status:** accepted

There is already strong demand / a large number of registrations. Public
booking must not look available.

- Canonical statement: **„Buchung wird bald freigeschaltet.“**
- Primary CTA label: **„Buchung bald verfügbar“**
- Supporting line: **„Die Regalbuchung wird in Kürze freigeschaltet.“**
- Source of truth: `src/config/booking.ts` (`publicBooking.isOpen = false`).
- Public CTAs open a coming-soon panel or `/regal-mieten#buchung`. They do
  **not** send visitors to the Pladsly booking URL.
- Flip `isOpen` only when the client explicitly opens public booking.
- Do **not** remove Pladsly URLs, adapters, or Stage A architecture.

---

## 2026-09-16 — Public facts: Stockelsdorf, 17 %, hours, Second-Hand-Laden

**Status:** accepted

Customer-facing facts from the 2026-09-16 client review:

- Physical location city: **Stockelsdorf** (not Lübeck). Address remains
  Segeberger Straße 8, 23617 Stockelsdorf. Internal store id `store-luebeck`
  is a technical key only.
- Canonical business term: **Second-Hand-Laden**. Avoid Store / Shop /
  Geschäft / Concept Store in public copy unless legally required.
- Public sales commission: **17 %** (`SALES_COMMISSION_PERCENT` /
  `SALES_COMMISSION_BPS = 1700`). AGB August 2026 still states **15 %**
  until a new legal document is supplied. Do not silently rewrite the AGB.
- Opening hours: Di–Fr 10:00–17:00, Sa 10:00–16:00, Mo & So Ruhetag.
- Rental prices unchanged: 2 Wochen 39 €, 4 Wochen 75 €, 3 Monate 210 €.

The rental-model recommender (`src/lib/rental-recommender.ts`) is client-side
only. It recommends a package; it does not estimate earnings.

- bis 2 Wochen → 2 Wochen
- etwa 3–4 Wochen → 4 Wochen
- langfristig / bis 3 Monate → 3 Monate
- mehrere Wochen → 4 Wochen, or 3 Monate if volume is „viele Teile“

---

## 2026-09-16 — Client CI: Playfair Display + Montserrat

**Status:** accepted

Client corporate identity:

- Headings: Playfair Display
- Body: Montserrat
- Handwritten accent Holiday: **not embedded** until usage rights are confirmed
- Palette: `#F7F5F1`, `#4A3A32`, `#8C9A83`, `#292725`, `#CEBBA9`
- Logo: keep the supplied `/logo-transparent.png`. WhatsApp screenshots are
  not production assets. Original vector of „MiMa / SECOND HAND LADEN“ is still
  required.
- Instagram: component ready; URL unconfirmed — do not invent a handle.
- Hero: layout ready for `/images/mima-store-hero.jpg`; current fallback is
  `store-interior.jpg`. Do not generate a fake storefront.

---

## 2026-09-15 — CCM19 cookie consent

**Status:** accepted

Cookie consent is **CCM19 Cloud**, not Usercentrics and not a custom banner.

- German embed (`lang=de_DE`) as a native `<script>` in the root `<head>`,
  with `referrerpolicy="origin"`, as CCM19 requires.
- `suppressHydrationWarning` on `<html>` and `<body>`: CCM19 sets CSS
  variables on the document element before React hydrates.
- The dashboard `apiKey` in the script URL is a public embed key, not a
  server secret.
- Layout, blocked scripts and extra cookies are configured in the CCM19
  administration. Do not restyle or reimplement the banner in this repo.
- Content-Security-Policy allows `https://cloud.ccm19.de` for script,
  connect, image, font and frame.
- Point CCM19’s privacy-policy URL at `/datenschutz/`.

---

## 2026-09-15 — Pladsly V1: automatic shelf allocation; no customer shelf pick

**Status:** accepted

Direct conversation with Julian at Pladsly (V1 product decision):

- Specific shelf selection through Pladsly is **not currently supported**.
- Julian considers named-shelf selection useful and may add it later.
- Until that exists, Pladsly assigns the shelf automatically.

V1 therefore:

- Pladsly remains the operational source of truth.
- Customers do **not** choose an exact shelf on mima-second-hand.de.
- The floor plan is a store explorer (structure, rooms, orientation), not a live booking selector.
- No green/red availability, no “reserve this shelf”, no invented occupancy.

Specific shelf selection: **BLOCKED BY CURRENT PLADSLY CAPABILITY**.

When Pladsly exposes specific-shelf selection / availability, the existing map architecture may be upgraded. Do not build a parallel allocation engine in the meantime.

---

## 2026-09-15 — AGB August 2026 published

**Status:** accepted

The client supplied the AGB. They are on `/agb`.

- Legal address: Segeberger Straße 8, 23617 Stockelsdorf.
- Sales commission: **15 %** of the sale price (AGB § 16).
- Regular rental periods in the AGB: 14 days 39 €, 28 days 75 €. The public site still also offers 3 Monate 210 € from the confirmed price graphic.
- Inhaberin: **Miriam Vlot**. Legal e-mail: **info@mima-secondhand.de** (filled 2026-09-17).
- Impressum and the Datenschutzerklärung are published from the same facts.
- A separate Widerrufsbelehrung is referenced in the AGB and is not on the site yet.

---

## 2026-09-14 — Trace the hand drawing; exact count stays open

**Status:** accepted

The client floor-plan scan is the primary visual reference. The public SVG
traces that irregular geometry (outer polygon, interior kitchen/WC walls,
four unequal central aisles, separate south-east wall runs, L at the
north-west, Umkleide alcove, Spielecke). It is not a cleaned symmetric layout.
A Theke is not labelled on the drawing and is not invented on the map.

- `exactShelfCount.status = "open"`. Verbal “140” is recorded, not shown.
- Do not publish an aisle total, a “142”, or paper numbers (26 / 21 / 3x3).
- Real shelf type: 90 × 49 × 181 cm. Rows follow the sketch; 90:49 is a guide.
- Public map = explorer. Booking stays Pladsly Fallback V1 until a documented API exists.

---

## 2026-09-12 — Real floor plan, honest rental UX, confirmed prices

**Status:** accepted

Client materials from 2026-09-10 are now binding for geometry and prices.

- Public store map follows the irregular hand drawing (not a 4×35 grid).
- Exact shelf count is **OPEN**. Verbal “140” is recorded, not confirmed.
- Canonical prices / wording: 2 Wochen 39 €, 4 Wochen 75 €, 3 Monate 210 €.
- 4 Wochen = 28 days. 3 Monate stays calendar months.
- `/regal-mieten` is process + prices + layout explorer + Pladsly handoff.
- No public claim that a visitor can reserve a specific shelf on this site.
- Pladsly remains the operational source of truth. No parallel booking engine.

---

## 2026-09-10 — Native operations foundation, Pladsly remains Stage A

**Status:** accepted

MiMa is evaluating a move off Pladsly. This phase adds a **MiMa-owned domain
and provider boundary**, not a cutover.

- Live customer bookings, shop and seller login stay on **supported Pladsly
  entry points** until Auth + Stripe + a connected database exist.
- New code talks to `OperationsProvider` (`native` | `supabase` | `pladsly`).
- Default provider is `native` (in-process store). It is **prototype-level**:
  data does not survive serverless cold starts.
- Supabase SQL + RLS ships as migrations so a project can be attached later
  without redesign.
- No undocumented Pladsly API work.

---

## 2026-09-10 — Half-open booking intervals + calendar months

**Status:** accepted *(4-week rule updated 2026-09-12)*

A shelf is occupied on `[start_date, end_date)`. The next booking may start
on `end_date`.

- 2 weeks = 14 days.
- 4 weeks = 28 days.
- 3 months = calendar months (end-of-month clamp).

This matches “01.10–31.10 blocks 15.10; 01.11 is free” without a same-day
double booking.

Overlap is checked in the service **and** (in Postgres) with an exclusion
constraint on occupying statuses.

---

## 2026-09-10 — 140 shelves as data, placeholder geometry

**Status:** superseded *(2026-09-12 — real hand-drawn layout; count OPEN)*

Four zones (A–D) × 35 shelves = 140 was a placeholder until the floor plan
arrived. The public map now uses `STORE_LAYOUT` from the client drawing.

---

## 2026-09-10 — No fake public availability

**Status:** accepted

The native store starts with **no bookings**. Every shelf is available unless
a real occupying booking overlaps.

`MIMA_DEMO_OCCUPANCY` may seed QA overlaps locally. It defaults off and must
not be set in production.

The `/regal-mieten` UI always states that paid booking is still Pladsly
until the native path is production-ready.

---

## 2026-09-10 — Internal barcode, not a retail symbology yet

**Status:** accepted

`MM-000001` is a unique product key. Encoding as EAN-13 / Code128 is a later
label-print decision. The resolver is `barcode → product → seller → shelf →
price`.

---

## 2026-09-10 — Commission is configuration, revenue is derived

**Status:** accepted *(public rate 17 % / 1700 bps as of 2026-09-16; AGB § 16 still 15 % until a new legal text)*

Fee rate lives in `store_settings.commission_bps` and
`SALES_COMMISSION_BPS`. Public customer copy uses **17 %**. The published
AGB still say 15 %. Sales store `gross_cents`, `fee_cents`, `seller_cents`.
Seller revenue is `sum(seller_cents)`, never a mutable field.

---

## 2026-09-10 — Stripe and POS are boundaries only

**Status:** accepted

No custom card handling. No invented POS API. Interfaces are documented;
implementation waits on real contracts and secrets.

---

## 2026-09-10 — Intern UI is env-gated, not a public dashboard

**Status:** accepted

`/intern` returns 404 unless `MIMA_INTERNAL_UI=true`. It is a staff sketch,
not the public brand, and not a substitute for Auth + RLS.

---

## Earlier decisions (still in force)

See `docs/IMPLEMENTATION_PLAN.md` and `docs/PLADSLY_INTEGRATION.md`:

- Static export removed; server-side secrets only.
- `PLADSLY_INTEGRATION_MODE=mock|live`.
- Stage A = supported links only.
- Domain types are MiMa-shaped; adapters map inbound data.
