import { describe, expect, it } from "vitest";
import {
  googleMapsDirectionsUrl,
  googleMapsEmbedSrc,
  googleMapsPlaceUrl,
  storeAddressQuery,
} from "@/config/maps";
import { siteConfig } from "@/config/site";

describe("Google Maps destination", () => {
  it("uses the confirmed Stockelsdorf street address", () => {
    expect(siteConfig.address.city).toBe("Stockelsdorf");
    expect(storeAddressQuery()).toBe(
      "Segeberger Straße 8, 23617 Stockelsdorf",
    );
    expect(storeAddressQuery().toLowerCase()).not.toContain("lübeck");
  });

  it("builds Google Maps place and directions URLs, not OpenStreetMap", () => {
    const place = googleMapsPlaceUrl();
    const directions = googleMapsDirectionsUrl();
    expect(place.startsWith("https://www.google.com/maps/search/")).toBe(true);
    expect(place).toContain("Segeberger");
    expect(place).toContain("Stockelsdorf");
    expect(directions.startsWith("https://www.google.com/maps/dir/")).toBe(
      true,
    );
    expect(directions).toContain("destination=");
    expect(place).not.toContain("openstreetmap");
    expect(directions).not.toContain("openstreetmap");
  });

  it("embeds the Stockelsdorf Google Maps share iframe", () => {
    const src = googleMapsEmbedSrc();
    expect(src.startsWith("https://www.google.com/maps/embed?pb=")).toBe(true);
    expect(src).toContain("Stockelsdorf");
    expect(src).toContain("Segeberger");
    expect(src).not.toContain("openstreetmap");
    expect(src).not.toContain("key=");
  });
});
