# Pladsly Integration

Status legend (use only these):

- **CONFIRMED** — true in our codebase or in Pladsly’s public product pages (links, portal, shop). Not a live API test.
- **VERIFIED BY LIVE TEST** — we sent an authenticated request to a documented path and recorded the result. Nothing in this repo currently has this status.
- **LIKELY FROM PLADSLY COMMUNICATION** — stated in correspondence. Not independently tested. Do not treat as an API contract.
- **OPEN** — unknown. Needs an answer or a test.
- **UNSUPPORTED** — we will not build this unless Pladsly documents it and the business still wants it.

Never silently promote a communication claim to CONFIRMED or VERIFIED BY LIVE TEST.

Last updated: 2026-09-15

---

## 1. Desired architecture

```
MiMa Frontend
    ↓
MiMa server-side service layer
    ↓
Pladsly adapter  (src/lib/pladsly/*.server.ts)
    ↓
Pladsly API
```

Pladsly remains the operational source of truth for bookings, seller/renter
information, shelf allocation, availability, extensions and rental state.

MiMa owns website UX, brand, store-map geometry, presentation and public discovery.

Do not duplicate Pladsly booking state in a separate MiMa database.

Integration mode: `PLADSLY_INTEGRATION_MODE=mock|live` (server-only). Default `mock`.

---

## 2. Fallback V1 (this is the live customer path)

```
MiMa website
  → start booking CTA
  → Pladsly booking assistant
  → Pladsly performs booking and automatic shelf allocation
```

This fallback is acceptable even if the REST API stays closed. The custom
store map remains a visual explorer only.

**V1 product decision (Julian / Pladsly, 2026-09-15):** specific shelf
selection is not currently supported. Pladsly allocates automatically.
Specific shelf selection: **BLOCKED BY CURRENT PLADSLY CAPABILITY**.
Automatic allocation: **in use for V1**. Julian may add named-shelf
selection later; the map architecture can then be upgraded. Do not build a
MiMa-side picker in the meantime.

Progressive enhancement later, if documented capabilities appear. The website
must not depend on a future API.

---

## 3. What is CONFIRMED in our code / public Pladsly product

- Server-only integration modules exist (`src/lib/pladsly/*.server.ts`).
- API keys are not exposed to the client (`PLADSLY_API_KEY` is never `NEXT_PUBLIC_`).
- Mock / live separation exists (`PLADSLY_INTEGRATION_MODE`).
- Public URLs (not secrets), in `src/config/external-services.ts`:
  - Seller portal: `https://portal.pladsly.app/`
  - Booking assistant: `https://mima.pladsly.app/default/wizard/package`
  - Shop: `https://mima.pladsly.app/default/shop/all`
- Public Pladsly product pages describe a booking assistant (iframe or link),
  an online shop, a seller portal, Stripe payments, and Zettle / PayPal POS.

The API-key screen in a dashboard is **not** evidence of any endpoint.

---

## 4. VERIFIED BY LIVE TEST

None.

No authenticated Pladsly REST request has been executed from this repository.
No response body has been recorded. `GET /api/pladsly/status` reports
`probeResult: "skipped"` on purpose.

---

## 5. LIKELY FROM PLADSLY COMMUNICATION

Treat as conversation notes, not as callable contracts:

- API-key authentication can work.
- General shop information can be queried.
- General “when is the next fitting shelf free” can be queried.
- Bookings can be assigned to shelves internally.
- Pladsly prefers automatic shelf assignment.
- **Julian (2026-09-15): customer-side specific shelf selection is not
  currently supported.** He may add it later. V1 uses automatic allocation.
- A parallel availability system would fight theirs.

REST path, auth header, and response shape for all of the above: **OPEN**.

---

## 6. OPEN (needed before any live adapter work)

- Documented REST base URL and auth header.
- Shop-info endpoint and fields.
- General availability endpoint (start date / duration).
- Retrieve booking; retrieve assigned shelf/place.
- List shelf/place identifiers; stable IDs.
- Per-shelf availability.
- Create booking; assign/fix a shelf.
- Prefill / deep-link into the booking assistant beyond the public URL.
- Product and seller/renter read APIs.
- Webhooks, scopes, rate limits.

See `docs/PLADSLY_CAPABILITY_MATRIX.md`.

---

## 7. UNSUPPORTED (do not build)

- Scraping the Pladsly shop or portal.
- Reverse-engineering private requests.
- A second booking ledger on the MiMa site.
- Fake per-shelf availability on the floor plan.
- Customer-side “click this shelf, it is yours”. Blocked by current Pladsly
  capability (Julian, 2026-09-15). Revisit only if Pladsly ships it.

---

## 8. Current website behaviour (our implementation)

| Route | Behaviour |
| --- | --- |
| `/mein-mima` | Link to seller portal. |
| `/entdecken` | Curated preview + link to shop. |
| `/regal-mieten` | Prices, shelf photo, traced store map (explorer), CTA to booking assistant. |
| `GET /api/pladsly/status` | Mode + whether credentials exist. No secrets. |
| `GET /api/pladsly/products` | Mock unless a documented live fetch exists. |
| `GET /api/pladsly/availability` | Allowlisted query; live per-shelf fetch not implemented. |
| `POST /api/mima/bookings` | Prototype; 403 unless `MIMA_NATIVE_BOOKING=true`. Not the public source of truth. |

`default` in the public URLs is treated as the store slug. Stability is **OPEN**.

Auth header currently coded as `Authorization: Bearer <key>` — **OPEN** (not verified).

DTO field names in `src/lib/pladsly/types.ts` are working guesses. Not verified.

---

## 9. Ownership

| Thing | Owner |
| --- | --- |
| Bookings, allocation, availability, extensions | **Pladsly** |
| Sellers / renters, products, POS, payouts | **Pladsly** |
| Website UX, brand, copy, store-map geometry | **MiMa** |

---

## 10. Enabling live mode (only after a documented path)

1. Record the contract in the capability matrix as VERIFIED BY LIVE TEST.
2. Implement that path only. Add Zod response schemas.
3. Set `PLADSLY_API_KEY` and `PLADSLY_API_BASE_URL` in the host environment.
4. Set `PLADSLY_INTEGRATION_MODE=live`.
5. Re-test. Confirm no secret leaks.
6. Do not enable live mode solely because an API key field exists.
