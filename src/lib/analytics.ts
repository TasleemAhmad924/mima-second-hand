/**
 * Non-invasive analytics event vocabulary.
 *
 * PRINCIPLES:
 *   - No tracking library is installed automatically. `track()` is a safe no-op
 *     unless a consented analytics sink (`window.dataLayer`) is already present.
 *   - Never pass personal, booking or product-identifying data here. Events are
 *     intentionally coarse (a handoff happened), not personal.
 *   - Client-safe. No secrets. No network calls of its own.
 */

export const AnalyticsEvent = {
  /** User opens the Pladsly seller portal from /mein-mima. */
  MeinMimaPortalClick: "mein_mima_portal_click",
  /** User is handed off to the Pladsly booking assistant. */
  BookingHandoff: "pladsly_booking_handoff",
  /** User opens the live Pladsly shop from /entdecken. */
  EntdeckenShopClick: "entdecken_shop_click",
  /** Navigational intent events (prepared for future wiring). */
  RegalMietenClick: "regal_mieten_click",
  EntdeckenClick: "entdecken_click",
  ProductInteraction: "product_interaction",
  ContactInteraction: "contact_interaction",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

type EventParams = Record<string, string | number | boolean>;

interface DataLayerWindow {
  dataLayer?: unknown[];
}

/**
 * Emits an event to a consented analytics sink if one exists. Safe to call
 * anywhere on the client; does nothing on the server or when no sink is present.
 */
export function track(event: AnalyticsEventName, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const sink = (window as unknown as DataLayerWindow).dataLayer;
  if (!Array.isArray(sink)) return;
  sink.push({ event, ...(params ?? {}) });
}
