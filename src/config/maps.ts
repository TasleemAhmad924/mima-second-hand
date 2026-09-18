import { siteConfig } from "@/config/site";

/**
 * Google Maps destinations for the physical Second-Hand-Laden.
 * Address comes from `siteConfig` — do not invent a street here.
 */

export function storeAddressQuery(): string {
  const { street, postalCode, city } = siteConfig.address;
  return `${street}, ${postalCode} ${city}`;
}

export function googleMapsPlaceUrl(): string {
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", storeAddressQuery());
  return url.toString();
}

export function googleMapsDirectionsUrl(): string {
  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("destination", storeAddressQuery());
  return url.toString();
}

/**
 * Client-supplied Google Maps share embed for Segeberger Str. 8, Stockelsdorf.
 * The public site loads this iframe when the map is about to enter view.
 */
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.5452153033034!2d10.6509094!3d53.8865127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b20c170c08ef2d%3A0xdd3807bbeb60cea!2sSegeberger%20Str.%208%2C%2023617%20Stockelsdorf!5e0!3m2!1sde!2sde!4v1789600822002!5m2!1sde!2sde";

export function googleMapsEmbedSrc(): string {
  return GOOGLE_MAPS_EMBED_SRC;
}

export const googleMapsFrameOrigins = [
  "https://www.google.com",
  "https://maps.google.com",
  "https://www.google.de",
] as const;
