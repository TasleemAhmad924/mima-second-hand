import "server-only";

import { siteConfig } from "@/config/site";
import { effectiveDataSource, isPladslyConfigured } from "@/lib/env.server";
import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Shop / general info (server-only).
 *
 * CONFIRMED public entry points: shop URL and booking assistant URL.
 * NOT CONFIRMED: a REST path that returns shop records.
 *
 * This module therefore never guesses a shop endpoint. Live mode still
 * returns the known public URLs until a documented contract exists.
 */

export interface ShopInfo {
  source: "mock" | "pladsly";
  name: string;
  city: string;
  publicShopUrl: string;
  publicBookingUrl: string;
  configured: boolean;
}

export async function getShopInfo(): Promise<ShopInfo> {
  const source = effectiveDataSource();
  return {
    source,
    name: siteConfig.name,
    city: siteConfig.city,
    publicShopUrl: siteConfig.external.shopUrl,
    publicBookingUrl: siteConfig.external.bookingUrl,
    configured: isPladslyConfigured(),
  };
}

/**
 * Reserved for a documented shop-record fetch. Do not call an invented path.
 */
export async function fetchPladslyShopRecord(): Promise<never> {
  throw IntegrationError.notImplemented("shop.record");
}
