import { describe, it, expect } from "vitest";
import { mockProductRepository } from "@/lib/repositories/mock-product-repository";
import { mockShelfAvailabilityRepository } from "@/lib/repositories/mock-shelf-availability-repository";

describe("mockProductRepository", () => {
  it("returns a non-empty product list in the UI shape", async () => {
    const products = await mockProductRepository.getProducts();
    expect(products.length).toBeGreaterThan(0);
    for (const p of products) {
      expect(typeof p.id).toBe("string");
      expect(typeof p.title).toBe("string");
      expect(["mode", "accessoires", "wohnen", "buecher"]).toContain(p.category);
    }
  });
});

describe("mockShelfAvailabilityRepository", () => {
  it("derives {shelfId, available} entries and ignores the range", async () => {
    const list = await mockShelfAvailabilityRepository.getAvailability({
      startDate: "2026-09-01",
      days: 30,
    });
    expect(list.length).toBeGreaterThan(0);
    for (const entry of list) {
      expect(typeof entry.shelfId).toBe("string");
      expect(typeof entry.available).toBe("boolean");
    }
    // At least one available and one unavailable in the mock floor plan.
    expect(list.some((e) => e.available)).toBe(true);
    expect(list.some((e) => !e.available)).toBe(true);
  });
});
