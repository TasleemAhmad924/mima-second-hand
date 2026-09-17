import { describe, expect, it } from "vitest";
import { SEEDED_SHELVES } from "@/data/store-layout";
import { DomainError } from "@/lib/mima/errors";
import { NativeStore } from "@/lib/operations/native-store";

const TEST_SHELF = SEEDED_SHELVES[0]?.label ?? "";

describe("NativeStore isolation and booking", () => {
  it("starts with drawn shelves available and no invented occupancy", () => {
    const store = new NativeStore();
    const views = store.availability({
      startDate: "2026-10-01",
      endDate: "2026-11-01",
    });
    expect(views).toHaveLength(SEEDED_SHELVES.length);
    expect(views.every((shelf) => shelf.status === "available")).toBe(true);
  });

  it("rejects an overlapping booking on the same shelf", () => {
    const store = new NativeStore();
    const seller = store.upsertSeller({
      email: "anna@example.com",
      displayName: "Anna",
    });
    const shelf = store.shelfById(TEST_SHELF);
    if (!shelf) throw new Error("missing shelf");
    store.createBooking({
      sellerId: seller.id,
      shelfId: shelf.id,
      planId: "wochen-4",
      startDate: "2026-10-01",
    });
    expect(() =>
      store.createBooking({
        sellerId: seller.id,
        shelfId: shelf.label,
        planId: "wochen-4",
        startDate: "2026-10-15",
      }),
    ).toThrow(DomainError);
  });

  it("allows the next period on the turnover day", () => {
    const store = new NativeStore();
    const seller = store.upsertSeller({
      email: "anna@example.com",
      displayName: "Anna",
    });
    store.createBooking({
      sellerId: seller.id,
      shelfId: TEST_SHELF,
      planId: "wochen-4",
      startDate: "2026-10-01",
    });
    const next = store.createBooking({
      sellerId: seller.id,
      shelfId: TEST_SHELF,
      planId: "wochen-4",
      startDate: "2026-10-29",
    });
    expect(next.endDate).toBe("2026-11-26");
  });

  it("never returns another seller's products, bookings or sales", () => {
    const store = new NativeStore();
    const anna = store.upsertSeller({
      email: "anna@example.com",
      displayName: "Anna",
    });
    const ben = store.upsertSeller({
      email: "ben@example.com",
      displayName: "Ben",
    });
    store.createBooking({
      sellerId: anna.id,
      shelfId: TEST_SHELF,
      planId: "wochen-2",
      startDate: "2026-10-01",
    });
    const product = store.addProduct({
      sellerId: anna.id,
      title: "Tasse",
      priceCents: 1200,
      category: "wohnen",
    });
    store.recordSale({ productId: product.id, actorSellerId: anna.id });

    expect(store.bookingsForSeller(ben.id)).toEqual([]);
    expect(store.productsForSeller(ben.id)).toEqual([]);
    expect(store.salesForSeller(ben.id)).toEqual([]);
    expect(store.salesForSeller(anna.id)).toHaveLength(1);
    expect(() =>
      store.recordSale({ productId: product.id, actorSellerId: ben.id }),
    ).toThrow(DomainError);
  });
});
