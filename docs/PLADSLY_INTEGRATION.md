# Pladsly Integration

Status legend: **CONFIRMED** (verified against official docs or the client) · **ASSUMED** (working guess, must be verified) · **OPEN** (unknown, needs an answer) · **BLOCKED** (cannot proceed without an external answer/access).

This is the source of truth for the MiMa ↔ Pladsly contract. Never silently promote an **ASSUMED** item to **CONFIRMED**.

Last updated: 2026-08-28

---

## 1. Architecture

```
Browser
   │
MiMa Next.js (Vercel)
   │  server-only integration layer (secrets never leave the server)
   ▼
Pladsly (portal · shop · booking assistant · [undocumented] API)
```

- **Stage A (now):** use Pladsly's officially supported entry points (links/redirects). Gives a working real booking/shop path with no private API.
- **Stage B (later):** read-only API (e.g. products) once documented.
- **Stage C (later):** live availability + booking via API with immediate re-validation before checkout.

Integration mode is controlled by `PLADSLY_INTEGRATION_MODE=mock|live` (server-only; `DATA_SOURCE` kept as alias). Default `mock`.

---

## 2. What Pladsly documents publicly — CONFIRMED (capability, not API contract)

- Booking assistant integration via **iframe or direct link**.
- Online **shop** integration (embed into an existing site, or use as its own page).
- **Seller portal** in the browser.
- **Stripe** booking payments.
- **Zettle / PayPal POS** integration + physical sale sync.

> The Pladsly **REST API is not publicly documented**. The API-key screen in the dashboard is **not** sufficient evidence of any specific endpoint/contract. We do **not** guess or reverse-engineer private endpoints.

---

## 3. Known entry points — CONFIRMED (as provided)

Public URLs (not secrets), configured in `src/config/external-services.ts`, overridable via `NEXT_PUBLIC_PLADSLY_*`:

- Seller portal: `https://portal.pladsly.app/`
- MiMa booking assistant: `https://mima.pladsly.app/default/wizard/package`
- MiMa shop: `https://mima.pladsly.app/default/shop/all`

`default` is treated as the store slug (`PLADSLY_STORE_SLUG`). **ASSUMED** — confirm stability.

---

## 4. Current temporary integration (Stage A) — CONFIRMED (our implementation)

| Route | V1 behaviour | Notes |
| --- | --- | --- |
| `/mein-mima` | Branded transition → opens Pladsly **seller portal** (new tab, `rel="noopener noreferrer"`). | No custom auth. URL from central config. |
| `/entdecken` | Custom curated grid shown as a **preview** (mock data, clearly labelled) + prominent link → live Pladsly **shop**. | No scraping, no CMS. |
| `/regal-mieten` | Custom floor plan as a **preview** (mock availability, never presented as live) + always-reachable link → Pladsly **booking assistant** to complete a real booking. | Geometry = MiMa; availability/booking = Pladsly. |

**Shop embedding decision:** V1 uses a **link** to the Pladsly shop (robust, no iframe sizing/mobile pitfalls). Iframe embedding is a documented option and is recorded as a **future** alternative to evaluate during browser QA.

---

## 5. Ownership matrix (for a non-technical store owner)

| Thing | Managed in | System owner |
| --- | --- | --- |
| Shelves / places | Pladsly dashboard | **Pladsly** |
| Bookings & booking state | Pladsly | **Pladsly** |
| Sellers / registration / login | Pladsly portal | **Pladsly** |
| Products & product images | Pladsly portal (by seller) | **Pladsly** |
| Sales | Pladsly + POS | **Pladsly / Zettle** |
| Payouts & balances | Pladsly | **Pladsly** |
| Barcodes / labels | Pladsly | **Pladsly** |
| Online shelf-rental payment | Stripe via Pladsly | **Stripe/Pladsly** |
| Physical checkout | Zettle / PayPal POS | **Zettle** |
| Website copy / text | MiMa repository | **MiMa** |
| Website images | MiMa repository | **MiMa** |
| FAQ / editorial content | MiMa repository | **MiMa** |
| Floor-plan geometry (positions) | MiMa repository | **MiMa** |
| SEO / analytics events | MiMa repository | **MiMa** |

One source of truth per row. MiMa never duplicates Pladsly-owned operational data.

---

## 6. Consolidated API discovery request (send to Pladsly)

> One consolidated request — not scattered questions. Track answers inline as CONFIRMED/ASSUMED and remove from OPEN.

### Products
- Can products be read via API? — **OPEN**
- Fields: images, price, category, size, availability, updated timestamp, sold state? — **OPEN**
- Pagination + filtering? — **OPEN**

### Product events (webhooks)
- created / updated / sold / removed? Signing + verification scheme? — **OPEN**

### Places / shelves
- List shelves/places? Stable shelf IDs (map to R01…R18)? — **OPEN**
- Availability by exact start/end date? — **OPEN**

### Bookings
- Book a specific shelf via API? Temporary hold/reserve? — **OPEN**
- Start checkout for a selected shelf? Success URL? Cancellation URL? Booking webhook? — **OPEN**

### Security
- API-key permissions / read-only scopes? Rate limits? — **OPEN**
- Server-only or a documented browser-safe public-key mechanism? Purpose of the CORS-domain field? — **OPEN**

### Shop
- Official embed method? Can a custom frontend consume product data directly? — **OPEN**

---

## 7. Auth scheme — ASSUMED

Server client currently sends `Authorization: Bearer <PLADSLY_API_KEY>`. **ASSUMED** — confirm header name/token format; adjust `src/lib/pladsly/client.server.ts`.

---

## 8. DTOs — ASSUMED

See `src/lib/pladsly/types.ts`. All fields assumed; adapters (`mapPladslyProduct`, `mapAvailability`) normalize into MiMa domain types and are unit-tested. Field names/shape unconfirmed.

---

## 9. Blocking items

- **BLOCKED:** `PladslyProductRepository` live fetch — needs product API contract (§6 Products).
- **BLOCKED:** live shelf availability + booking-via-API — needs places/booking contract (§6 Places/Bookings).
- **BLOCKED:** POS/Zettle end-to-end sale test — needs a real seller + test product + store hardware access.

---

## 10. Security requirements (must hold before go-live)

- API key server-side only; never `NEXT_PUBLIC_`, never logged/returned.
- All `/api/pladsly/*` inputs validated with Zod; no client-controlled Pladsly paths.
- Third-party responses validated + mapped before use (treat as untrusted input).
- Prices, availability, payment/booking state authoritative on the backend — never trusted from the client.
- Availability re-validated immediately before booking (Stage C).
- Errors → safe German messages only; technical detail logged server-side without secrets/PII.
- Webhooks (if added): verify signatures server-side; idempotent booking actions.

---

## 11. Enabling live mode (checklist)

1. Confirm §6 items; update `types.ts` + adapters + add Zod response schemas.
2. Implement `fetch*` in `src/lib/pladsly/products.server.ts` / `places.server.ts` via `pladslyRequest`.
3. Set `PLADSLY_API_KEY`, `PLADSLY_API_BASE_URL` in Vercel (Production/Preview).
4. Set `PLADSLY_INTEGRATION_MODE=live`.
5. Re-run unit tests + deployment verification; confirm no secret leaks (browser/network).
6. Extend CSP (`img-src`/`connect-src`) if product images or browser calls to a Pladsly host are introduced.
