# Pladsly Integration

Status legend: **CONFIRMED** (verified against official docs or the client) · **ASSUMED** (working guess, must be verified) · **OPEN** (unknown, needs an answer).

This document is the source of truth for the MiMa ↔ Pladsly integration contract. Do **not** enable `DATA_SOURCE=pladsly` in production until the items below are **CONFIRMED**.

---

## 1. Architecture

```
Browser
   │
MiMa Next.js (Vercel)
   │  server-only integration layer
   ▼
Pladsly API
```

- Secret credentials live **only** in server-side env (`PLADSLY_API_KEY`, `PLADSLY_API_BASE_URL`). Never `NEXT_PUBLIC_*`, never in the browser, never in logs or responses.
- The browser talks only to our own allowlisted routes (`/api/pladsly/*`), never directly to Pladsly with a key.
- Data-source mode is switchable via `DATA_SOURCE=mock|pladsly` (defaults to `mock`).

### Ownership (do not duplicate)

| Concern | Owner |
| --- | --- |
| Public website, brand, content, floor-plan geometry, SEO, integration layer | **MiMa** |
| Seller accounts, login, portal, products, product images, shelves/places, bookings, booking state, balances, payouts, barcodes/labels, operational data | **Pladsly** |
| Online shelf-rental payment | **Pladsly → Stripe** |
| Physical checkout | **PayPal POS / Zettle → Pladsly** |

---

## 2. Known public URLs — CONFIRMED (as provided)

These are public links (not secrets), configured via `NEXT_PUBLIC_*` with defaults in `src/config/external-services.ts`:

- Seller portal: `https://portal.pladsly.app/`
- MiMa booking wizard: `https://mima.pladsly.app/default/wizard/package`
- MiMa shop: `https://mima.pladsly.app/default/shop/all`

> Note: the `default` path segment is treated as the store slug (`PLADSLY_STORE_SLUG` in `src/config/business.ts`). **ASSUMED** — confirm this is stable/correct for MiMa.

---

## 3. Open API questions

| # | Topic | Status | Notes / what we need |
| --- | --- | --- | --- |
| 1 | Product list endpoint | **OPEN** | Base URL, path, method, auth scheme. |
| 2 | Product images | **OPEN** | Absolute URLs? CDN host (for CSP `img-src`)? Sizes? |
| 3 | Product availability/status | **OPEN** | Is a product "sold" reflected in the catalogue response? |
| 4 | Pagination | **OPEN** | Cursor vs. page/limit; max page size. |
| 5 | Filtering | **OPEN** | By category/size/availability? Server- or client-side? |
| 6 | Places/shelves endpoint | **OPEN** | Do "places" map 1:1 to MiMa shelf ids (R01…R18)? |
| 7 | Time-dependent availability | **OPEN** | Query by date range? Response shape? |
| 8 | Specific shelf booking | **OPEN** | Is booking a specific place possible via API, or wizard-only? |
| 9 | Booking creation | **OPEN** | Likely wizard-only (handoff). Confirm no server booking is expected. |
| 10 | Checkout handoff | **ASSUMED** | Redirect to booking wizard URL; confirm params (dates, place, return URL). |
| 11 | Webhooks | **OPEN** | Events (sale, booking, payout)? Signing secret + verification scheme? |
| 12 | API key permissions/scopes | **OPEN** | Are scoped/read-only keys available? (See least-privilege below.) |
| 13 | Rate limits | **OPEN** | Limits + headers so we can back off and add our own limiting. |
| 14 | CORS model | **OPEN** | Assume server-side only unless a browser-safe public key is documented. |
| 15 | Success/callback URLs | **OPEN** | Allowed return URLs after booking/payment. |
| 16 | POS sale synchronization | **OPEN** | How physical sales propagate; any API to read updated stock/balances. |

---

## 4. Auth scheme — ASSUMED

The server client currently sends `Authorization: Bearer <PLADSLY_API_KEY>`. **ASSUMED** — confirm header name and token format with Pladsly. Adjust `src/lib/pladsly/client.server.ts` once known.

---

## 5. DTOs — ASSUMED

See `src/lib/pladsly/types.ts`. All fields are assumed and must be confirmed. Adapters (`mapPladslyProduct`, `mapAvailability`) already normalize DTOs into the app's UI/domain types and are unit-tested; only the field names/shape are unconfirmed.

---

## 6. Security requirements (must hold before go-live)

- API key server-side only; never `NEXT_PUBLIC_`, never logged, never returned.
- All `/api/pladsly/*` inputs validated with Zod; no client-controlled Pladsly paths.
- Prices, availability, payment/booking state are authoritative on the backend — never trusted from the client.
- Least privilege: request a read-only/scoped key if Pladsly supports it; otherwise treat the key as highly privileged and document its access.
- Errors return safe German messages only; technical detail is logged server-side without secrets or PII.
- If webhooks are introduced, verify signatures server-side and make booking actions idempotent.

---

## 7. Enabling the real integration (checklist)

1. Confirm items #1–#16 above; update `types.ts` + adapters accordingly.
2. Implement the `fetch*` functions in `src/lib/pladsly/products.server.ts` / `places.server.ts` using `pladslyRequest`.
3. Set `PLADSLY_API_KEY`, `PLADSLY_API_BASE_URL` in Vercel (Production/Preview).
4. Set `DATA_SOURCE=pladsly`.
5. Re-run unit tests and deployment verification; confirm no secret leaks in browser/network.
6. Extend CSP (`img-src`/`connect-src`) if product images or browser calls to a Pladsly host are introduced.
