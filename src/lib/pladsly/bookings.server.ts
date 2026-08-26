import "server-only";

import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Booking integration (server-only) — deliberately minimal.
 *
 * IMPORTANT OWNERSHIP NOTE:
 *   Bookings, booking state, checkout and payment are owned by Pladsly (and
 *   Stripe). MiMa does NOT create bookings or process payments itself. The
 *   website hands the visitor off to the Pladsly booking wizard
 *   (`externalServices.pladslyBookingUrl`).
 *
 *   We therefore do NOT implement booking-creation or payment logic here. If a
 *   future requirement proves MiMa must initiate bookings server-side, this is
 *   where a validated, CSRF-protected, idempotent, signature-verified flow
 *   would live — never trusting client-supplied price or payment state.
 */

/** Placeholder for a future server-initiated booking. Not implemented by design. */
export async function createBooking(): Promise<never> {
  throw IntegrationError.notImplemented("bookings.create");
}
