# MiMa Second Hand — Launch checklist

> Status: `[ ]` not checked · `[~]` in progress · `[x]` verified · `[!]` blocker
>
> Last verified: 2026-09-17 against localhost (dev + `next build` / `next start :3010`) and https://www.lille-loppe.de/ as a structural benchmark only.
>
> Production domain smoke test (section 51) is still open until https://www.mima-second-hand.de is live.

---

## Lille Loppe comparison (structural only)

Do not copy brand, layout, or copy. Useful patterns vs MiMa:

| Pattern | Lille Loppe | MiMa (current) | Action |
| --- | --- | --- | --- |
| Immediate concept | Hero states sell + discover | Hero + TwoSides does the same in MiMa voice | Leave |
| Seller steps | Four steps, repeated in the a11y tree | Four steps on home + `/so-funktionierts` + `/regal-mieten` | Leave |
| Das Regal | 200×78×32 cm, IKEA-bag claim | Real shelf photo + **90 × 49 × 181 cm** | Leave |
| Calculator | Earnings estimate with “Jetzt buchen” | Recommender, no profit claim, booking gated | Leave — do not copy earnings UI |
| Wohlfühlort | Play corner / changing table | Miriam story + real photo | Leave |
| Location | Address + hours + **Karte laden** | Address + hours + **immediate Google embed** + route CTA | Leave (client: load immediately) |
| Instagram | Feed-style section | Confirmed profile in location, About, footer | Leave — no fake feed |
| FAQ | Conversion blockers | Home teaser + `/faq` | Leave |
| Footer | Legal + contact + Widerruf | Legal + contact + Instagram | Widerruf still missing (legal, not invented) |
| Primary CTA | Jetzt buchen / Regal mieten | **Buchung bald verfügbar** | Leave until booking opens |

MiMa already tells a coherent story: Hero → sell/discover → how it works → prices/recommender → discover → Wohlfühlort → location/map → FAQ → footer. Do not mechanically reorder.

---

## 0. Project state

- [x] `docs/IMPLEMENTATION_PLAN.md` read
- [x] `docs/DECISIONS.md` read
- [x] `docs/PLADSLY_INTEGRATION.md` known (Stage A, no shelf pick)
- [x] Public routes, `src/config/site.ts`, pricing, booking gate, maps, CCM19, Web3Forms inspected
- [x] This checklist created

---

## 1–5. UX / IA / UI / anti-slop

- [x] Homepage flow is logical; no extra Lille-only sections added
- [x] Brand palette and Playfair + Montserrat in use
- [x] Booking copy is the coming-soon state, not “Jetzt buchen”
- [x] 17 % commission and rental prices 39 / 75 / 210 € in public UI
- [x] Stockelsdorf / Second-Hand-Laden in customer copy
- [x] No fake testimonials, no SaaS bento, no extra calculator

---

## 6–7. Navbar hover + motion

- [x] Desktop nav links: `.link-underline` draws from the left (`background-size`, hover-capable pointers only)
- [x] Header CTA: charcoal → taupe-ink; not `transition: all`
- [x] Hover scoped to `@media (hover: hover)` so touch does not stick
- [x] Focus-visible remains global charcoal outline
- [x] `prefers-reduced-motion` in `globals.css` + Framer `useReducedMotion` in booking/menu
- [x] No lost fill animation found in git — DESIGN.md already specifies taupe-ink hover. Not reinvented.

---

## 8–9. Responsive + accessibility

- [x] 1440 homepage: editorial split hero, CTA hierarchy intact
- [x] 375: `innerWidth` 375, no horizontal overflow, hero 375×281, H1 one per page
- [x] TwoSides images `hidden md:block`
- [x] Skip link, one H1/page, form labels, 16px inputs (`text-base`)
- [x] Form fields no longer use `outline-none` (keyboard outline restored)
- [x] Icon-only menu toggle has aria-label; Instagram has sr-only new-tab text
- [ ] Safari/Firefox not instrumented in this pass (Chromium browser tools only)
- [ ] Exhaustive 1280/1024/768/430/390/320 optical pass still informal (320 overflow checked via 375 `scrollWidth`)

---

## 10. Technical SEO

- [x] Unique title + description per public page
- [x] Canonicals use production host + trailing slash (`/regal-mieten/`)
- [x] Open Graph + Twitter via layout + `pageMetadata`; OG image 1200×630
- [x] Favicon `src/app/icon.svg`; logo `/logo-transparent.png`
- [x] robots.txt production: allow `/`, disallow `/intern/` and `/api/`
- [x] Preview/dev: `Disallow: /` + `robots: noindex` when `VERCEL_ENV !== production`
- [x] sitemap.xml: public canonical URLs only, trailing slashes, no intern/api
- [x] JSON-LD LocalBusiness: name, url, logo, image, address, hours, phone, Instagram; **no** ratings/geo/priceRange invented
- [x] Brand name consistent: MiMa Second Hand
- [x] Custom 404
- [x] GSC token: **none in repo**. Post-launch:
  1. Add URL-prefix property for `https://www.mima-second-hand.de`
  2. Verify ownership
  3. Submit `https://www.mima-second-hand.de/sitemap.xml`
  4. Inspect homepage
  5. Request indexing for `/`, `/regal-mieten/`, `/ueber-mima/`, `/kontakt/`

---

## 11. SEO content

- [x] Natural Stockelsdorf / Second-Hand-Laden / Regal mieten
- [x] No customer-facing Lübeck
- [x] No public “15 %” (AGB legal text still 15 % — flagged)
- [x] No “Jetzt buchen”

---

## 12–32. Security

- [x] Attack surface: public pages, Web3Forms contact POST, read-only `/api/pladsly/*`, gated `/api/mima/bookings`, intern UI behind `MIMA_INTERNAL_UI`
- [x] No proprietary auth, uploads, webhooks, or payment capture on this site
- [x] CSRF: not applicable (no cookie-authenticated state-changing endpoints)
- [x] SSRF: Pladsly client fetches only configured base URL + allowlisted paths
- [x] Secrets: `.env*` gitignored; `.env.example` names only; Pladsly key server-only
- [x] XSS: JSON-LD is first-party `JSON.stringify`; no untrusted HTML
- [x] API Zod validation already present; `X-Robots-Tag: noindex` on JSON envelopes
- [x] CORS: no `Access-Control-Allow-Origin: *`
- [x] CSP present; `poweredByHeader: false` (no `X-Powered-By` on production)
- [x] HSTS / nosniff / DENY / Referrer-Policy / Permissions-Policy
- [x] Maps: share iframe, no API key in repo; loads immediately (client decision)
- [x] Production browser source maps not enabled
- [x] Logger redacts key-like strings
- [x] Contact form: labels, validation, honeypot, loading/success/error, no double submit
- [x] Rate limit: Web3Forms + honeypot; native booking 403 unless flagged. No extra limiter added.
- [x] Next.js patched **16.3.2 → 16.3.5** (critical image-opt / Windows RCE advisories; `npm audit` 0 after patch)
- [ ] Google Maps API key domain restriction: **N/A** (keyless embed). Confirm Google share embed remains valid on the production domain.
- [ ] Usercentrics: not installed. CCM19 is the current CMP.

---

## 33–36. Legal / privacy / performance

- [x] Impressum, Datenschutz (e-recht24), AGB
- [!] Datenschutz still names **IONOS** as host; production target is Vercel — do not rewrite without new legal text
- [!] No Widerrufsbelehrung (Lille has one; do not invent)
- [x] CCM19 cookie banner present
- [x] Hero uses optimized fallback `store-interior.jpg` (177 KB), priority
- [x] Four oversized product JPEGs recompressed (~700–800 KB → ~215–260 KB)
- [x] `images.unoptimized = true` left as-is (behavioural; not flipped hours before launch)
- [!] Final real hero file `/images/mima-store-hero.jpg` still missing

---

## 37–45. Nav / CTA / calculator / shelf / maps / Instagram / copy / empty states

- [x] Desktop nav + booking CTA; mobile menu ESC, focus, scroll lock (existing)
- [x] Primary CTA: Buchung bald verfügbar / Buchung wird bald freigeschaltet
- [x] Calculator: 4 Wochen / 75 € default path; disclaimer; no guaranteed profit
- [x] Das Regal: photo + 90 × 49 × 181 cm
- [x] Miriam photo `miriam-regal.jpg` on About (and home story)
- [x] Google Maps iframe Stockelsdorf; no OSM; no “Google Maps laden”
- [x] Instagram https://www.instagram.com/mima.second.hand/ `target=_blank` `rel=noopener noreferrer`
- [x] 404 branded with path home
- [x] Map fallback component exists if iframe errors
- [x] Intern `/intern/` 404s unless `MIMA_INTERNAL_UI=true`

---

## 46–51. Cross-browser / guidelines / launch tests / GSC / deploy

- [x] Chromium QA: home, regal-mieten, kontakt, 404, about
- [ ] Safari / Firefox
- [x] `typecheck` passed
- [x] `vitest` 20 files / 74 tests passed
- [x] `next build` passed (Next 16.3.5)
- [x] Production `next start :3010`: robots, sitemap, canonical, CSP, no X-Powered-By
- [ ] No dedicated lint script in this repo
- [ ] Lighthouse not run against production domain (avoid gaming; run after DNS)
- [!] Vercel preview GitHub App still stalled (existing)
- [!] Custom domain HTTPS + Search Console only after go-live
- [ ] After deploy: repeat robots, sitemap, canonical, JSON-LD, Maps, OG, GSC submit

---

## Production readiness

**READY WITH KNOWN ISSUES**

The public marketing site can go live as a coming-soon Second-Hand-Laden site. Do not mark READY until the production domain is smoke-tested and the legal mismatches below are accepted by the client.

Known issues (not silent bugs in public UI):

1. AGB § 16 still 15 %; public copy 17 %
2. Datenschutz names IONOS; hosting is Vercel
3. No Widerrufsbelehrung
4. Hero is a fallback interior photo, not the final MiMa store shot
5. Wordmark is a PNG screenshot-derived asset; vector logo outstanding
6. Public booking closed (intentional)
7. Vercel preview connection outstanding
8. GSC / live HTTPS domain not verified yet
