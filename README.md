# MiMa Second Hand

Public website for **MiMa Second Hand** — an indoor second-hand market and shelf-rental store in Lübeck. Built with Next.js (App Router) and deployed on Vercel. Pladsly is the operational backend (seller accounts, products, shelves, bookings, payouts); this app is the branded public frontend and a secure, server-side integration layer in front of Pladsly.

## Tech

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · Framer Motion
- Zod (input validation) · Vitest (tests)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev
```

Useful scripts:

```bash
npm run build       # production build
npm run start       # run the production server
npm run typecheck   # tsc --noEmit
npm run test        # unit tests (vitest)
```

## Environment

See `.env.example`. Two rules:

- **Secrets** (e.g. `PLADSLY_API_KEY`) are server-side only — never prefixed with `NEXT_PUBLIC_`, never shipped to the browser. Set them in the Vercel dashboard, not in the repo.
- **Public URLs** (`NEXT_PUBLIC_PLADSLY_*`) are plain links and safe to expose.

`PLADSLY_INTEGRATION_MODE` (server-only) selects the data source: `mock` (default) or `live`. (`DATA_SOURCE=mock|pladsly` is still accepted as an alias.)

## Architecture

```
Browser → MiMa Next.js (Vercel) → server-only integration layer → Pladsly API
```

- Client components use mock data via `src/lib/pladsly.ts` (no secrets).
- Server-side integration lives in `src/lib/pladsly/*.server.ts` (guarded with `import "server-only"`).
- Data access is abstracted behind repositories (`src/lib/repositories`) so the source can change from mock to Pladsly without redesigning the UI.
- Allowlisted, validated API routes: `src/app/api/pladsly/{products,availability}`.

MiMa owns content, brand, floor-plan geometry, SEO and the integration layer. **Pladsly** owns seller accounts, products, shelves, bookings, payments and payouts — these are never duplicated here.

## Pladsly integration

The real API contract is not yet confirmed. The living plan is in [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md); open questions and the go-live checklist are in [`docs/PLADSLY_INTEGRATION.md`](docs/PLADSLY_INTEGRATION.md). Do **not** set `PLADSLY_INTEGRATION_MODE=live` in production until those items are confirmed.

## Security

- No secrets in the repo; `.env*` is gitignored (except `.env.example`).
- API key server-side only; never logged or returned.
- All server-boundary input is validated with Zod; no client-controlled Pladsly paths.
- Prices, availability and payment/booking state are authoritative on the backend — never trusted from the client.
- Security-header baseline (CSP, HSTS, etc.) is configured in `next.config.ts`.
