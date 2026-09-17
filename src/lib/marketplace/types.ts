/**
 * MiMa-facing marketplace boundary.
 * UI and pages depend on these shapes, not on raw Pladsly DTOs.
 */

export type IntegrationMode = "mock" | "live";

export interface MarketplaceStatus {
  mode: IntegrationMode;
  configured: boolean;
  /** True only when a confirmed live read has actually been executed. */
  liveReadVerified: boolean;
  probeAttempted: boolean;
  probeResult: "skipped" | "ok" | "failed";
  reason: string;
}

export interface ShopSummary {
  source: "mock" | "pladsly";
  name: string;
  city: string;
  publicShopUrl: string;
  publicBookingUrl: string;
}
