import { describe, it, expect } from "vitest";
import { mapAvailability, mapAvailabilityList } from "@/lib/pladsly/places.server";
import { IntegrationError } from "@/lib/pladsly/errors";

describe("mapAvailability", () => {
  it("maps a valid availability DTO", () => {
    expect(mapAvailability({ placeId: "R01", available: true })).toEqual({
      shelfId: "R01",
      available: true,
    });
  });

  it("throws malformed when fields are missing or wrong type", () => {
    // @ts-expect-error intentional malformed input
    expect(() => mapAvailability({ placeId: "R01" })).toThrow(IntegrationError);
    // @ts-expect-error intentional malformed input
    expect(() => mapAvailability({ available: true })).toThrow(IntegrationError);
  });
});

describe("mapAvailabilityList", () => {
  it("maps a list and skips malformed entries", () => {
    const result = mapAvailabilityList([
      { placeId: "R01", available: true },
      { placeId: "R02" },
      { placeId: "R03", available: false },
    ]);
    expect(result).toEqual([
      { shelfId: "R01", available: true },
      { shelfId: "R03", available: false },
    ]);
  });

  it("throws when payload is not an array", () => {
    expect(() => mapAvailabilityList(null as unknown)).toThrow(IntegrationError);
  });
});
