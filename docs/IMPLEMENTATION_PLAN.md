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

- [~] Stage A wiring on branch `feat/pladsly-integration`:
  - `/mein-mima` → Pladsly seller portal (verify + analytics event).
  - `/entdecken` → supported Pladsly shop link (curated preview stays, clearly labelled).
  - `/regal-mieten` → always-reachable Pladsly booking assistant; preview clearly marked.
  - Rename integration flag → `PLADSLY_INTEGRATION_MODE` (keep `DATA_SOURCE` alias).
  - Non-invasive analytics event hooks.
  - German failure/error states for products, availability, booking.

---

## Next tasks

- [ ] Push branch, create Vercel **preview** deployment, browser-QA (desktop + mobile).
- [ ] Send consolidated Pladsly API discovery request (see `PLADSLY_INTEGRATION.md`).
- [ ] After answers: implement `PladslyProductRepository` fetch + Zod response schemas.
- [ ] After answers: implement live availability + immediate re-validation before booking.
- [ ] POS/Zettle end-to-end test checklist (blocked on real seller/test data).

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

- **Stage A (supported entry points):** in progress on `feat/pladsly-integration`.
- **Stage B (read-only API, e.g. products):** blocked — API undocumented.
- **Stage C (live availability + booking via API):** blocked — API undocumented.
- Mock mode is the default and keeps the whole site usable offline.

---

## Testing status

- Unit tests: `npm run test` (mapping, validation, errors, mock repos) — passing.
- Deployment verification script: `scripts/verify-deployment.mjs` (routes, console errors, images, screenshots).
- Browser QA of preview deployment: pending this phase.

---

## Deployment status

- Production: https://mima-second-hand.vercel.app (Ready).
- Repo: https://github.com/TasleemAhmad924/mima-second-hand (private, branch `main`).
- Preview: created per feature branch (this phase).
- Manual step pending: connect GitHub repo in Vercel (Settings → Git) for push-to-deploy.
