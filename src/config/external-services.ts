/**
 * Centralized external-service configuration.
 *
 * Single source of truth for the PUBLIC third-party URLs the website links to.
 * These are plain links (portal / shop / booking) — NOT secrets — so they may
 * be read on the client. They can be overridden per environment via
 * NEXT_PUBLIC_* variables (see `.env.example`); otherwise the known public
 * defaults below are used.
 *
 * SECURITY: Never put secret credentials (e.g. the Pladsly API key) in this
 * file. Secrets live only in server-side env (`src/lib/env.server.ts`) and must
 * never be prefixed with NEXT_PUBLIC_.
 */

const DEFAULTS = {
  portalUrl: "https://portal.pladsly.app/",
  shopUrl: "https://mima.pladsly.app/default/shop/all",
  bookingUrl: "https://mima.pladsly.app/default/wizard/package",
} as const;

/** Only accept absolute https URLs; fall back to the safe default otherwise. */
function publicUrl(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export const externalServices = {
  /** Pladsly seller portal (login, dashboard, products, payouts). */
  pladslyPortalUrl: publicUrl(
    process.env.NEXT_PUBLIC_PLADSLY_PORTAL_URL,
    DEFAULTS.portalUrl,
  ),
  /** Public Pladsly shop for MiMa. */
  pladslyShopUrl: publicUrl(
    process.env.NEXT_PUBLIC_PLADSLY_SHOP_URL,
    DEFAULTS.shopUrl,
  ),
  /** Pladsly booking wizard (shelf rental checkout handoff). */
  pladslyBookingUrl: publicUrl(
    process.env.NEXT_PUBLIC_PLADSLY_BOOKING_URL,
    DEFAULTS.bookingUrl,
  ),
} as const;

export type ExternalServices = typeof externalServices;
