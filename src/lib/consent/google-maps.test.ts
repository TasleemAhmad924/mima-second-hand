import { describe, expect, it } from "vitest";
import {
  readUsercentricsGoogleMapsConsent,
  shouldLoadGoogleMaps,
} from "@/lib/consent/google-maps";

describe("Google Maps consent", () => {
  it("loads after explicit activation when no CMP is present", () => {
    expect(
      shouldLoadGoogleMaps({ userActivated: false, cmpGranted: null }),
    ).toBe(false);
    expect(
      shouldLoadGoogleMaps({ userActivated: true, cmpGranted: null }),
    ).toBe(true);
  });

  it("follows Usercentrics and does not bypass a denied Google Maps service", () => {
    expect(
      shouldLoadGoogleMaps({ userActivated: true, cmpGranted: false }),
    ).toBe(false);
    expect(
      shouldLoadGoogleMaps({ userActivated: false, cmpGranted: true }),
    ).toBe(true);
  });

  it("reads Google Maps consent from Usercentrics service info", () => {
    expect(readUsercentricsGoogleMapsConsent(undefined)).toBeNull();
    expect(
      readUsercentricsGoogleMapsConsent({
        getServicesBaseInfo: () => [
          { name: "Google Maps", id: "maps", consent: { given: true } },
        ],
      }),
    ).toBe(true);
    expect(
      readUsercentricsGoogleMapsConsent({
        getServicesBaseInfo: () => [
          { name: "Google Maps", id: "maps", consent: false },
        ],
      }),
    ).toBe(false);
    expect(
      readUsercentricsGoogleMapsConsent({
        getServicesBaseInfo: () => [{ name: "YouTube", consent: true }],
      }),
    ).toBeNull();
  });
});
