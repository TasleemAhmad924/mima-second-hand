import { describe, expect, it } from "vitest";
import {
  formatBarcode,
  nextBarcode,
  parseBarcode,
  resolveBarcode,
} from "@/lib/mima/barcode";
import type { ProductRecord } from "@/lib/mima/types";

const product: ProductRecord = {
  id: "p1",
  sellerId: "seller-1",
  shelfId: "shelf-a-01",
  title: "Kanne",
  description: null,
  category: "wohnen",
  brand: null,
  size: null,
  priceCents: 1800,
  imagePath: null,
  barcode: "MM-000001",
  status: "active",
  createdAt: "2026-09-10T00:00:00.000Z",
  updatedAt: "2026-09-10T00:00:00.000Z",
};

describe("barcode", () => {
  it("formats a zero-padded MiMa code", () => {
    expect(formatBarcode(1)).toBe("MM-000001");
    expect(parseBarcode("MM-000042")).toBe(42);
  });

  it("allocates the next sequence", () => {
    expect(nextBarcode(["MM-000001", "MM-000007"])).toBe("MM-000008");
  });

  it("resolves barcode → product → seller → shelf → price", () => {
    expect(resolveBarcode("MM-000001", [product])).toEqual({
      product,
      sellerId: "seller-1",
      shelfId: "shelf-a-01",
      priceCents: 1800,
    });
    expect(resolveBarcode("MM-000002", [product])).toBeNull();
  });
});
