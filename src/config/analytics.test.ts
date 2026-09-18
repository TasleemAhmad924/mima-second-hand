import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  googleAnalytics,
  googleTagBootstrap,
  googleTagSrc,
  isGaMeasurementId,
} from "./analytics";

describe("Google Analytics tag", () => {
  it("uses the confirmed GA4 measurement ID", () => {
    expect(googleAnalytics.measurementId).toBe("G-7MBL4EZ18H");
    expect(isGaMeasurementId(googleAnalytics.measurementId)).toBe(true);
  });

  it("bootstraps Consent Mode v2 as denied before config", () => {
    const bootstrap = googleTagBootstrap(googleAnalytics.measurementId);
    expect(bootstrap.indexOf("consent")).toBeLessThan(bootstrap.indexOf("config"));
    expect(bootstrap).toContain("analytics_storage: 'denied'");
    expect(bootstrap).toContain("ad_storage: 'denied'");
    expect(bootstrap).toContain("ad_user_data: 'denied'");
    expect(bootstrap).toContain("ad_personalization: 'denied'");
    expect(bootstrap).toContain("G-7MBL4EZ18H");
    expect(bootstrap).toContain("document.createElement('script')");
    expect(bootstrap).toContain(
      "https://www.googletagmanager.com/gtag/js?id=G-7MBL4EZ18H",
    );
    expect(googleTagSrc(googleAnalytics.measurementId)).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-7MBL4EZ18H",
    );
  });

  it("keeps the first-party bootstrap file in sync so CCM19 cannot swallow the RSC payload", () => {
    const file = readFileSync("public/analytics-consent.js", "utf8").trim();
    expect(file).toBe(googleTagBootstrap(googleAnalytics.measurementId));
  });

  it("rejects a measurement ID that is not GA4", () => {
    expect(isGaMeasurementId("GTM-XXXX")).toBe(false);
    expect(() => googleTagBootstrap("GTM-XXXX")).toThrow(/Ungültige/);
  });
});
