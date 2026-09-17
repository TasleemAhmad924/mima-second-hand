/**
 * Non-secret business constants shared across the app and the integration
 * boundary. These describe MiMa's operating rules (not credentials) and are
 * safe on both client and server.
 */
import { rentalPlans } from "@/config/pricing";

/** IANA timezone the store operates in — used for date reasoning. */
export const STORE_TIMEZONE = "Europe/Berlin";

/**
 * Pladsly store slug seen in the known public URLs
 * (e.g. https://mima.pladsly.app/default/...). Kept configurable rather than
 * hardcoded in multiple places. This is public, not secret.
 */
export const PLADSLY_STORE_SLUG = "default";

/** Allowed rental durations in days, derived from the pricing source of truth. */
export const ALLOWED_RENTAL_DAYS: readonly number[] = rentalPlans.map(
  (plan) => plan.days,
);

/** Bounds for validating availability lookups (defensive, server-side). */
export const AVAILABILITY_LOOKAHEAD_DAYS = 365;

/** Layout-local shelf label, e.g. "M1-12". Legacy preview ids "R01" still parse. */
export const SHELF_ID_PATTERN = /^([A-Z][A-Z0-9]?-\d{2}|R\d{2})$/;
