# Pladsly capability matrix

Purpose: make the architecture decision obvious once Pladsly replies.

Statuses: **CONFIRMED** · **VERIFIED BY LIVE TEST** · **LIKELY FROM PLADSLY COMMUNICATION** · **OPEN** · **UNSUPPORTED**

V1 customer path does **not** require a REST API. Fallback is the public booking assistant.

Last updated: 2026-09-15

| # | Capability | Required for V1? | Current evidence | Live tested? | Fallback | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Authenticate with API key | No | Key field exists in Pladsly UI; our client can send `Authorization: Bearer` | No | Stay in `mock`; use public links | OPEN |
| 2 | Read shop information | No | Communication: shop info can be queried. No path recorded | No | Link to public shop URL | LIKELY FROM PLADSLY COMMUNICATION |
| 3 | Check general availability for a start date / duration | No | Communication: next fitting shelf becoming free. No path recorded | No | Booking assistant decides | LIKELY FROM PLADSLY COMMUNICATION |
| 4 | Retrieve booking | No | None | No | Seller sees bookings in the Pladsly portal | OPEN |
| 5 | Retrieve currently assigned shelf/place for a booking | No | Communication: bookings can be assigned internally | No | Allocation stays inside Pladsly | LIKELY FROM PLADSLY COMMUNICATION |
| 6 | List shelf/place identifiers | No | None | No | Floor plan is visual only; no ID mapping | OPEN |
| 7 | Read availability for a particular shelf/place | No | Julian 2026-09-15: specific-shelf selection not currently supported | No | Do not show per-shelf availability | UNSUPPORTED (current Pladsly) |
| 8 | Create a booking | No | Public booking assistant exists | No | CTA → booking assistant | CONFIRMED (assistant link, not API) |
| 9 | Assign/fix booking to a particular shelf | No | Julian 2026-09-15: V1 uses automatic allocation; customer does not pick a shelf | No | Automatic allocation in Pladsly | LIKELY FROM PLADSLY COMMUNICATION — V1 decision: automatic |
| 10 | Prefill or deep-link into the Pladsly booking flow | Nice to have | Public wizard URL is known. Prefill params unknown | No | Open the wizard URL as-is | CONFIRMED (URL) / OPEN (prefill) |
| 11 | Read products | No | Public shop URL exists. Product REST path unknown | No | Link to shop; curated preview on `/entdecken` | CONFIRMED (shop link) / OPEN (API) |
| 12 | Read seller/renter information | No | Portal URL exists. No read API recorded | No | Link to seller portal | CONFIRMED (portal link) / OPEN (API) |

## Decision rule

- V1: automatic Pladsly allocation. Map is an explorer. No shelf picker.
- Specific shelf selection: **BLOCKED BY CURRENT PLADSLY CAPABILITY**.
- If 1 and 3 are verified: optional “next free from …” copy, still no shelf picker.
- If 6 and 7 later become supported **and** the business wants named shelves: only then consider highlighting mapped places. Still no second ledger.

## What we will not implement without a documented contract

Creating bookings via guessed POST paths, listing places via guessed GET paths,
scraping, or inventing occupancy on the MiMa map.
