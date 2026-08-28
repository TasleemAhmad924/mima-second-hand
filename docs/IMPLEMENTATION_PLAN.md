# MiMa Second Hand — Implementation Plan

> Operational source of truth. Read at the start of every work session; update after every meaningful step. Never leave stale.
>
> Status legend: `[ ]` not started · `[~]` in progress · `[x]` completed · `[!]` blocked

Last updated: 2026-08-28

---

## Current phase

**Phase 3 — Progressive Pladsly integration (Stage A: supported entry points).**
Wire the site to Pladsly's officially supported entry points (portal, shop, booking assistant) while preserving the custom MiMa design and keeping the mock architecture replaceable. No custom/private Pladsly API work yet (API is undocumented).

---

## Completed work

- [x] Phase 1/2: Secure foundation, private GitHub repo, Vercel deployment (see git history).
- [x] Static export dropped so server-side integration is possible on Vercel.
- [x] Centralized external-service config (`src/config/external-services.ts`).
- [x] Server-only Pladsly integration scaffold (`src/lib/pladsly/*.server.ts`).
- [x] Repository abstraction (mock ⇄ Pladsly) for products + shelf availability.
- [x] Allowlisted, Zod-validated API routes (`/api/pladsly/products`, `/availability`).
- [x] Security-header baseline; safe error handling + redacting logger.
- [x] Unit tests (mapping, validation, errors, mock repos).

---

## Current task

- [x] Stage A wiring on branch `feat/pladsly-integration`:
  - [x] `/mein-mima` → Pladsly seller portal (tracked, safe external link).
  - [x] `/entdecken` → supported Pladsly shop link; curated preview kept + clearly labelled; product error state.
  - [x] `/regal-mieten` → always-reachable Pladsly booking assistant; preview clearly marked; availability error state.
  - [x] Rename integration flag → `PLADSLY_INTEGRATION_MODE` (kept `DATA_SOURCE` alias).
  - [x] Non-invasive analytics event hooks (`src/lib/analytics.ts` + `TrackedButton`).
  - [x] German failure/error states for products, availability, booking.
- [x] Branch pushed; browser QA run against a local production build (see Testing).
- [!] Vercel **preview** deployment — blocked (build stall, see Deployment status).

---

## Next tasks

- [ ] Resolve Vercel preview build stall (connect GitHub in Vercel → managed CI builds; or retry when the build queue clears), then browser-QA the live preview.
- [ ] Merge `feat/pladsly-integration` → `main` once a preview build succeeds and is verified.
- [ ] Send consolidated Pladsly API discovery request (see `PLADSLY_INTEGRATION.md` §6).
- [ ] After answers: implement `PladslyProductRepository` fetch + Zod response schemas.
- [ ] After answers: implement live availability + immediate re-validation before booking.
- [ ] POS/Zettle end-to-end test (see checklist below) — blocked on real seller/test data.

---

## Technical decisions

- **Static export removed**; app runs server-side on Vercel (needed for secret-safe API calls).
- **Integration mode flag**: `PLADSLY_INTEGRATION_MODE=mock|live` (server-only). `DATA_SOURCE` kept as a backward-compatible alias. Defaults to `mock`.
- **Stage A over custom API**: use supported entry points (link/redirect) first so a real booking/shop path exists before any private API work.
- **Entdecken V1**: link to the live Pladsly shop; keep the custom grid as a clearly-labelled curated **preview** (mock data). No scraping, no HTML parsing, no CMS.
- **Regal-mieten V1**: keep custom floor plan as a **preview** (mock availability, never presented as live); the Pladsly booking assistant is always reachable to complete a real booking.
- **Domain model**: UI depends on MiMa `Product`/`Shelf` types, not Pladsly shapes. Adapters map external → domain (kept minimal until real responses are known).
- **Caching** (planned): products may be cached briefly; availability must be fresh; booking state never from cache. Not yet implemented (no live API).

---

## Open questions

Tracked in detail in `docs/PLADSLY_INTEGRATION.md`. Headlines:

- Is there a readable product API (fields, images, pagination, sold-state)?
- Places/shelves API with stable IDs + availability by exact date range?
- Booking a specific shelf via API + hold/reserve + success/cancel URLs?
- Webhooks (product/booking/sale)? API-key scopes, rate limits, browser-safety?
- Official shop embedding method vs. link-only?

---

## External dependencies

- **Pladsly** — seller portal, shop, booking assistant, (undocumented) API. API access/docs pending.
- **Stripe (via Pladsly)** — online shelf-rental payment. Not integrated directly by MiMa.
- **Zettle / PayPal POS (via Pladsly)** — physical checkout + sale sync. Not integrated directly by MiMa.
- **Vercel** — hosting/deployments. GitHub auto-deploy connection is a pending manual step (Vercel GitHub App install).

---

## Security considerations

- `PLADSLY_API_KEY` is server-only; never `NEXT_PUBLIC_`, never in Git/logs/HTML/error responses. Verified: not present in client bundle.
- No client component imports any `*.server` module (only API routes do).
- All server-boundary input validated with Zod; API routes are explicit allowlisted actions (no transparent proxy).
- External links: HTTPS only, `rel="noopener noreferrer"`, no user-controlled redirect targets.
- CORS is not treated as security; assume API keys are private.
- Prices/availability/payment/booking state are never trusted from the client.

---

## Pladsly integration status

- **Stage A (supported entry points):** implemented on `feat/pladsly-integration` (portal / shop / booking-assistant wiring). Pending live-preview verification + merge.
- **Stage B (read-only API, e.g. products):** blocked — API undocumented.
- **Stage C (live availability + booking via API):** blocked — API undocumented.
- Mock mode is the default and keeps the whole site usable offline.

---

## Testing status

- Unit tests: `npm run test` — 26 passing (mapping, validation, errors, mock repos).
- Type check: `npm run typecheck` — clean. Build: `npm run build` — clean.
- Browser QA (this phase): run with `scripts/verify-deployment.mjs` against a **local production build** (`next start`) because the Vercel preview build is stalled. Findings:
  - All routes (`/`, `/entdecken`, `/regal-mieten`, `/mein-mima`, …) return 200 on desktop + mobile.
  - **Zero console/hydration errors** on every route (CSP intact).
  - Integration elements verified in rendered HTML: `/mein-mima` → portal link (`rel="noopener noreferrer"`); `/entdecken` → "Zum MiMa Shop" + shop URL + "kuratierte Vorschau" framing; `/regal-mieten` → "Buchungsassistenten" link + "Vorschau" + booking URL.
  - "Broken image" flags from the script are false positives: scroll/lazy-revealed images not yet in-viewport at screenshot time (assets confirmed HTTP 200).
- Pending: browser QA against the live Vercel preview once the build stall is resolved.

---

## Deployment status

- Production: https://mima-second-hand.vercel.app — **Ready** (unchanged this phase; still the previous phase's build). Healthy.
- Repo: https://github.com/TasleemAhmad924/mima-second-hand (private). Branch `feat/pladsly-integration` pushed.
- [!] **Preview build stalled:** CLI uploads complete, but Vercel builds stay `UNKNOWN` (0 ms, never start) for preview deployments; several attempts made and cleaned up. Production built fine previously, so this is a Vercel-side build-queue/infra issue, not a code issue (local `next build` succeeds).
  - Recommended fix: connect the GitHub repo in Vercel (Settings → Git) so pushes trigger **managed** Git builds instead of CLI uploads; or retry the CLI deploy later when the build queue clears. Requires the Vercel GitHub App to be installed on the repo (browser step).
- Manual step still pending: Vercel ↔ GitHub connection (also enables preview-per-PR and push-to-deploy).

---

## POS / Zettle end-to-end test checklist (STEP 21 — run later, needs real data)

Blocked until a real seller account + test product + store POS hardware are available. MiMa is **not** a POS sync layer; this only validates the Pladsly ⇄ Zettle flow.

1. [ ] Seller creates a test product in the Pladsly portal.
2. [ ] Product appears correctly (title, image, price).
3. [ ] Barcode/label is generated.
4. [ ] Product is available in the POS as expected.
5. [ ] Test sale is completed at the POS.
6. [ ] Sale appears in Pladsly.
7. [ ] Seller balance updates.
8. [ ] Product online status updates (sold/removed).
9. [ ] Refund behaviour works.
10. [ ] Duplicate-sale prevention is understood.

---

## Caching strategy (planned, not yet implemented — no live API)

- Product catalogue: may be cached briefly (e.g. short revalidate) once live.
- Shelf availability: must be fresh (no/low cache).
- Booking state: never from cache; re-validate immediately before checkout.
- No single global caching rule for all Pladsly requests.
