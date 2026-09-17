# MiMa Architecture

Source of truth for how MiMa’s digital operating system is structured.
The public website remains the customer-facing brand. This document describes
the **store operating layer** underneath it.

Last updated: 2026-09-16

---

## 1. Purpose

MiMa is one physical Second-Hand-Laden in Stockelsdorf. Private sellers rent a
shelf. MiMa sells the goods on site. The exact shelf count is **OPEN**
(verbal mention: 140; the hand drawing is the geometry source). The technical
store id remains `store-luebeck`; that is not customer-facing copy.

The long-term goal is that MiMa can run this store **independently**:

shelves → availability → bookings → sellers → products → barcodes → sales →
fees → payouts → store admin

This is **not** a Pladsly clone and **not** a multi-tenant marketplace platform.
It is the smallest reliable system for one store.

---

## 2. What stays separate

| Layer | Owns | Must not own |
|---|---|---|
| Public website | Brand, editorial pages, booking *UI* | Secrets, authorization, payments, availability truth |
| MiMa domain | Store, shelf, booking, seller, product, sale, payout | Provider-specific DTOs |
| Operations provider | Persistence and external I/O | UI components |
| Pladsly adapter | Mapping to/from Pladsly, while it remains in use | Domain rules |
| POS adapter | Future sale ingest | Cash-register UI |
| Stripe adapter | Future hosted Checkout + webhooks | Card data |

The public visual language (`DESIGN.md`) applies to customer pages only.
Internal tools are functional and dense.

---

## 3. Provider-agnostic flow

```
UI / API route
      ↓
MiMa service  (authorization + domain rules)
      ↓
OperationsProvider  (native | supabase | pladsly)
      ↓
PostgreSQL / in-memory store / external system
```

**Bad:** a component calling `fetch("some-pladsly-endpoint")`.

**Good:** a component calling a MiMa service; the service talks to a provider.

No undocumented Pladsly endpoints. No scraping. No session-cookie reuse.

---

## 4. Domain model

One store. Zones group shelves for the map. Bookings occupy a shelf for a
half-open date interval. Products belong to a seller and usually sit on that
seller’s current shelf. Revenue is **derived from sales**, never a writable
running total.

```
Store
  └── Zones
       └── Shelves

Seller
  ├── Bookings ──▶ Shelf
  ├── Products ──▶ Shelf?
  └── Payouts

Product ──▶ Sale ──▶ Seller
                 └── Employee?
```

### 4.1 Store

One row for the Stockelsdorf Laden (technical id `store-luebeck`). Fields:
`id`, `slug`, `name`, `city`, `timezone` (`Europe/Berlin`).

### 4.2 Zone

A named area of the floor (A–D in the placeholder plan). Fields: `id`,
`store_id`, `code` (`A`), `name`, `sort_order`, map offset.

### 4.3 Shelf

A **business object**, not a decorative rectangle.

| Field | Role |
|---|---|
| `id` | Stable UUID (database) |
| `label` | Layout-local code, e.g. `R1-01` (not a Pladsly ID, not inventory) |
| `zone_id` | Zone |
| `grid_col` / `grid_row` | Legacy grid fields; public map uses `src/data/store-layout.ts` |
| `size` | Optional physical hint (`standard` for now) |
| `active` | Inactive shelves cannot be booked |
| `hint` | Optional human note |

Geometry is data in `STORE_LAYOUT`. The public SVG map is an explorer, not a
live booking selector. Exact inventory remains OPEN.

### 4.4 Seller

| Field | Role |
|---|---|
| `id` | UUID |
| `auth_user_id` | Supabase Auth user, when connected |
| `email` | Login / contact |
| `display_name` | Shown to staff |
| `phone` | Optional |
| `status` | `active` / `suspended` |

A seller never reads another seller’s bookings, products, sales or payouts.

### 4.5 Booking

| Field | Role |
|---|---|
| `id` | UUID |
| `seller_id` | Who rents |
| `shelf_id` | Which shelf |
| `plan_id` | `wochen-2` / `wochen-4` / `monate-3` |
| `start_date` | Inclusive (`yyyy-mm-dd`, store timezone) |
| `end_date` | **Exclusive** first free day |
| `status` | See below |
| `payment_status` | Separate from booking status |
| `price_cents` | Snapshot of the plan price at creation |
| `created_at` / `updated_at` | Audit |

Booking status: `draft` → `pending_payment` → `confirmed` → `cancelled` |
`expired`.

Payment status: `unpaid` | `paid` | `refunded`. A browser return from Stripe
must **never** confirm a booking. Only a server-side webhook / verification
does (future).

Statuses that occupy a shelf: `pending_payment`, `confirmed`.

### 4.6 Product

Physical inventory, not an online shop catalogue.

| Field | Role |
|---|---|
| `id` | UUID |
| `seller_id` | Owner |
| `shelf_id` | Current shelf (nullable if unset) |
| `title` | Required |
| `description` | Optional |
| `category` | `mode` / `accessoires` / `wohnen` / `buecher` / `sonstiges` |
| `brand` / `size` | Optional |
| `price_cents` | Asking price |
| `image_path` | Supabase Storage path later |
| `barcode` | Unique MiMa code, e.g. `MM-000001` |
| `status` | `draft` / `active` / `sold` / `removed` / `expired` |

### 4.7 Sale

An immutable fact. Editing “seller revenue” by hand is forbidden.

| Field | Role |
|---|---|
| `id` | UUID |
| `product_id` | What sold |
| `seller_id` | Denormalized for isolation queries |
| `shelf_id` | Where it sat |
| `gross_cents` | Price charged |
| `fee_cents` | MiMa share, from **configurable** store settings |
| `seller_cents` | `gross - fee` |
| `payment_method` | `cash` / `card` / `other` |
| `sold_at` | Timestamp |
| `employee_id` | Optional staff |
| `source` | `manual` / `pos` |

On sale: product status becomes `sold`. Seller balance = `sum(seller_cents) -
sum(completed payouts)`.

### 4.8 Payout

Prepared only. No money movement in this phase.

`pending` → `approved` → `completed`. Amount is computed from unpaid sales,
not typed in as an arbitrary balance.

### 4.9 Store settings

Configurable, not hardcoded in business logic:

- `commission_bps` (basis points; public rate 17 % = `1700`; AGB § 16 still 15 % until updated)
- `barcode_prefix` (`MM`)

### 4.10 Employee / admin

Role on a profile: `seller` | `employee` | `admin`.
Admin sees the store. Employee may record sales later. Seller sees only self.

---

## 5. Interval semantics

Bookings use a **half-open** date interval:

```
[start_date, end_date)
```

- `start_date` is the first occupied calendar day.
- `end_date` is the first day the shelf is free again (turnover day).
- The last occupied day is `end_date - 1 day`.
- A following booking **may start on `end_date`**.

Duration:

| Plan | Rule |
|---|---|
| 2 Wochen | `end = start + 14 days` |
| 4 Wochen | `end = start + 28 days` |
| 3 Monate | `end = start + 3 calendar months` (clamp end-of-month) |

Example:

- Shelf `R1-01` (layout-local visual bay, not a Pladsly ID), booking `2026-10-01` → `2026-10-29` (4 Wochen).
- `2026-10-15` → `2026-11-12` **rejected** (overlaps).
- `2026-10-29` → `2026-11-26` **allowed**.

Two ranges overlap when `a.start < b.end AND b.start < a.end`.

The database must enforce this (exclusion constraint) in addition to the
service. Frontend checks are UX only.

---

## 6. Shelf system and store map

```
database / seed
      ↓
shelf + availability service
      ↓
store layout (geometry)
      ↓
StoreMap UI
```

Do not hardcode shelf rectangles in JSX. Public geometry is `STORE_LAYOUT`
(irregular room traced from the 2026-09-10 hand drawing). Exact shelf count
stays `{ status: "open" }`. The public map is an explorer: no live occupancy
colours, no guaranteed shelf pick, no scan overlay.

Preferred live path, when a documented API exists:

```
MiMa Frontend → MiMa server-side service → Pladsly adapter → Pladsly API
```

Until then, Fallback V1 is the customer path: website CTA → Pladsly booking
assistant → Pladsly automatic shelf allocation.

Internal prototype states (`available` / `occupied` / `inactive`) stay on the
native provider. They must not be presented as live Pladsly availability.

**Never show invented occupancy to customers.** Default native data has
**zero** demo bookings. A local-only `MIMA_DEMO_OCCUPANCY=true` flag may add
sample overlaps for staff QA. It must stay off in production.

---

## 7. Barcode

Internal MiMa identifier, not an assumed retail standard (EAN-13 / Code128
encoding is a later print decision).

Format: `{prefix}-{6 digits}` → `MM-000001`.

Resolution path:

```
barcode → product → seller → shelf → price
```

Needed for a future POS scan. No cash register is built in this phase.

---

## 8. POS boundary

```
MiMa Product
    ↓ barcode
POS (Zettle or successor)
    ↓ sale event (undocumented today)
MiMa Sale record
```

`PosProvider` is an interface only. No invented API. Until a real contract
exists, sales can be entered by staff (future) or stay empty.

---

## 9. Payments (future)

Stripe Checkout, server-side session, webhook confirmation.
Secrets never `NEXT_PUBLIC_`. Card data never stored.
Not implemented in this foundation.

Until then, a real paid booking still goes through the **supported Pladsly
booking assistant** (Stage A). The native engine can create
`pending_payment` rows for tests; it does not collect money.

---

## 10. Migration

```
NOW
  Website ──Stage A links──▶ Pladsly
  Website ──native provider──▶ in-memory / future Supabase
                               (prototype, not production bookings)

LATER
  Website ──MiMa services──▶ Supabase
  Pladsly adapter remains until cutover
```

The public site is not rewritten. Providers swap behind the same types.

---

## 11. Security

- Authorization is server-side and (when Supabase is connected) RLS.
- Sellers are isolated by `seller_id = auth.uid()` policies.
- Admins use an explicit role check, not a hidden client flag.
- `/intern` is **off** unless `MIMA_INTERNAL_UI=true` (local/staff only).
- Zod at every HTTP boundary.
- Prices, availability and payment state from the browser are never trusted.

---

## 12. What this phase implements vs postpones

Implemented: domain, SQL schema stub, overlap engine, native provider,
hand-drawn store map, availability API, booking prototype API, seller /
product / sale / payout **models**, intern overview stub, Pladsly still as
the live payment/account path. Public rental UX is explorer + handoff.

Postponed: live Supabase project, Auth, Stripe, POS ingest, payout transfers,
full admin. Cookie consent is CCM19 Cloud (not Usercentrics). The Laden
location map is a Google Maps embed behind click-to-load, with a Usercentrics
service hook ready in `src/lib/consent/google-maps.ts`.
