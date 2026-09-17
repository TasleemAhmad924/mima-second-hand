# MiMa Second Hand — Implementation Plan

> Operational source of truth. Read at the start of every work session; update after every meaningful step. Never leave stale.
>
> Status legend: `[ ]` not started · `[~]` in progress · `[x]` completed · `[!]` blocked

Last updated: 2026-09-17 (pre-opening content)

---

## Current phase

**Phase 10 — Pre-opening content: calculator, Wohlfühlort, no fake inventory** `[x]`

- [x] Calculator: „mehrere Teile“ instead of „eine Auswahl“; helper copy; result `4 Wochen · 75 €`. Logic unchanged.
- [x] Homepage Wohlfühlort section: Spielecke, Wickeltisch, WC. Not a three-card icon row. Miriam story preserved.
- [x] Homepage + `/entdecken` no longer present mock products as live inventory.

**Phase 9 — Final pre-launch audit** `[x]` (site is **READY WITH KNOWN ISSUES**)

Verify-first pass. Did not rebuild completed work. See `docs/LAUNCH_CHECKLIST.md`.

- [x] Trailing-slash canonicals + sitemap; preview/dev noindex; production robots allow with `/intern/` and `/api/` disallowed.
- [x] LocalBusiness JSON-LD logo + image (no invented ratings/geo).
- [x] `poweredByHeader: false`; Next.js 16.3.5 security patch; product JPEG recompress.
- [x] Form focus outline restored; CTA hover limited to pointer hover.
- [x] Navbar underline hover confirmed already present — not reinvented.
- [x] Google Maps remains immediate embed (client). Lille Loppe click-to-load was not copied.
- [!] Production domain / Search Console / Vercel preview still open.
- [!] AGB 15 % vs public 17 %; DSE names IONOS; no Widerruf; final hero photo + vector logo outstanding.

**Phase 8 — Client content & UX corrections (Stockelsdorf, booking wait, CI)** `[x]`

Not a redesign. Preserve the approved editorial layout. Apply the 2026-09-16
client brief to copy, facts, public booking state and brand tokens.

- [x] Stockelsdorf (not Lübeck) in all customer-facing location copy + SEO.
- [x] Canonical term: Second-Hand-Laden (natural German, no Store/Geschäft mix).
- [x] Opening hours: Di–Fr 10:00–17:00, Sa 10:00–16:00, Mo & So Ruhetag.
- [x] Commission 17 % in public copy and `commissionBps` (1700). AGB still 15 % until a new legal text is supplied.
- [x] Public booking gated: “Buchung wird bald freigeschaltet.” Pladsly architecture stays.
- [x] Rental-model recommender (client-side, no fake profit).
- [x] Hide TwoSides images on mobile only (`hidden md:block`).
- [x] About/Miriam editorial rewrite + “Ein Wohlfühlort”.
- [x] Hero prepared for real store photo (`/images/mima-store-hero.jpg`).
- [!] Replace hero image with final real MiMa store photograph.
- [!] Original vector/transparent logo of “MiMa / SECOND HAND LADEN” not yet supplied (WhatsApp screenshots are not production assets).
- [x] Instagram: https://www.instagram.com/mima.second.hand/
- [!] Holiday handwritten font: do not embed until usage rights are confirmed.
- [x] Pladsly V1: automatic allocation. Floor plan remains a visual explorer.
- [x] Location map: Google Maps Embed loads immediately. OSM link removed. Floor-plan SVG unchanged.

---

## Previous phases

**Phase 7 — Presentation prep: traced floor plan + honest Pladsly decision pack** `[x]` (local; Vercel preview still blocked)

**Phase 6 — Client materials + cautious Pladsly alignment** `[x]`

**Phase 5 — MIMA OPERATIONS FOUNDATION** `[x]` (foundation only; not a production cutover)

**Phase 4 — FINAL UI / NORDIC ART DIRECTION POLISH** `[x]`

**Phase 3 — Progressive Pladsly integration (Stage A).**

---

## Next tasks

- [ ] Resolve Vercel preview build stall (GitHub App in Vercel), then QA a live preview.
- [ ] Send consolidated Pladsly API discovery request (see `PLADSLY_INTEGRATION.md` §6).
- [!] After answers: read-only shop / general-availability API — blocked on a documented contract.
- [!] Per-shelf IDs, live per-shelf availability, customer-side exact-shelf booking — **BLOCKED BY CURRENT PLADSLY CAPABILITY** (Julian, 2026-09-15).
- [x] V1 uses automatic Pladsly shelf allocation.
- [x] CCM19 Cloud cookie banner (German embed, CSP allowlist). Layout stays in CCM19 admin.
- [!] Flip `publicBooking.isOpen` only when the client explicitly opens public booking.
- [!] Replace AGB § 16 (15 %) when the client supplies an updated legal document for 17 %.

---

## Technical decisions

- **Pladsly stays the operational source of truth** for bookings, sellers, products, POS and payouts.
- **Public booking is closed** until the waitlist/demand is processed. The Pladsly booking URL remains in config; public CTAs do not send visitors there.
- **No parallel reservation engine** on the public site. Native `/api/mima/*` remains prototype / intern-only.
- **Floor-plan geometry is MiMa-owned.** Public map = explorer. No live occupancy, no shelf pick.
- **Canonical prices / wording**: 2 Wochen 39 €, 4 Wochen 75 €, 3 Monate 210 €.
- **4 Wochen = 28 days.** 3 Monate remains calendar months.
- **Public location city = Stockelsdorf.** Internal store id `store-luebeck` is a technical key, not customer copy.
- **Location map = Google Maps Embed**, loaded immediately. No OSM, no Leaflet. The SVG floor plan is separate.
- **Brand type:** Playfair Display + Montserrat (client CI). Holiday script is not embedded without a license.
- **Paid booking** remains the Pladsly booking assistant once public booking is opened.

---

## Open questions / missing assets

- Final hero photograph of the real Second-Hand-Laden.
- Original logo file (SVG/PDF/PNG with transparency), not a chat screenshot.
- License for Holiday (handwritten accent).
- Updated AGB if 17 % is to replace 15 % in the legal text.
- Exact date when public booking should go live.

---

## External dependencies

- **Pladsly** — seller portal, shop, booking assistant, (undocumented) API.
- **Stripe (via Pladsly)** — online shelf-rental payment.
- **Zettle / PayPal POS (via Pladsly)** — physical checkout + sale sync.
- **Vercel** — hosting. GitHub auto-deploy connection is still a manual step.
- **CCM19 Cloud** — cookie banner.
- **Google Maps** — share iframe for Segeberger Str. 8, loaded immediately.

---

## Testing status

Launch audit (2026-09-17):

- `npm run typecheck` passed
- `npm run test` — 20 files, 74 tests passed
- `npm run build` passed (Next.js 16.3.5; no dedicated lint script)
- `npm audit` — 0 vulnerabilities after the 16.3.5 patch
- Production `next start :3010`: robots allow + intern/api disallow, sitemap trailing slashes, canonical HTTPS, no `X-Powered-By`
- Browser QA (Chromium): homepage 1440/375, `/regal-mieten`, `/kontakt` (Maps iframe, no load button), `/ueber-mima` (Miriam photo), 404
- Lille Loppe used as IA benchmark only

Google Maps location swap (2026-09-17):

- `npm run typecheck` passed
- `npm run test` — 15 files, 64 tests passed
- `npm run build` passed (no dedicated lint script in this repo)
- Browser QA: homepage + Kontakt map at 1440; overflow checks at 768, 390, 320
- Google Maps iframe loads without „Google Maps laden“
- OSM link removed; SVG floor plan on `/regal-mieten` unchanged
- After activation the Google share iframe for Segeberger Str. 8 loads

Phase 8 quality gate (2026-09-16):

- `npm run typecheck` passed
- `npm run test` — 13 files, 58 tests passed
- `npm run build` passed (no dedicated lint script in this repo)
- Browser QA: homepage, Über MiMa, Regal mieten, Kontakt at 1440 and 390
- Public copy audit: no customer-facing Lübeck; no public 15 %; booking gated
- AGB August 2026 still contains 15 % (legal text, flagged)

---

## Deployment status

- Production: https://mima-second-hand.vercel.app — previous phase; do not ship unverified work blindly.
- Repo: https://github.com/TasleemAhmad924/mima-second-hand (private).
- [!] **Preview build stalled:** Vercel CLI uploads stay `UNKNOWN`. Local `next build` has been the verification path.
