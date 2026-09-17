import "server-only";

import { effectiveDataSource, isPladslyConfigured, serverEnv } from "@/lib/env.server";
import { getShopInfo } from "@/lib/pladsly/shop.server";
import type { MarketplaceStatus, ShopSummary } from "@/lib/marketplace/types";

/**
 * Connection / capability snapshot. Never logs or returns the API key.
 *
 * A live HTTP probe is skipped until a confirmed health or shop-info path
 * exists. Missing credentials are reported as not configured, not as a
 * failed undocumented request.
 */
export function getMarketplaceStatus(): MarketplaceStatus {
  const configured = isPladslyConfigured();
  const liveRequested = serverEnv.dataSource === "pladsly";

  return {
    mode: liveRequested ? "live" : "mock",
    configured,
    liveReadVerified: false,
    probeAttempted: false,
    probeResult: "skipped",
    reason: configured
      ? "Credentials are present, but no confirmed REST path exists for a health or shop-info probe. HTTP was not attempted."
      : "PLADSLY_API_KEY and PLADSLY_API_BASE_URL are not both set. Mock / Stage A links remain in use.",
  };
}

export async function getShopSummary(): Promise<ShopSummary> {
  const info = await getShopInfo();
  return {
    source: effectiveDataSource(),
    name: info.name,
    city: info.city,
    publicShopUrl: info.publicShopUrl,
    publicBookingUrl: info.publicBookingUrl,
  };
}
