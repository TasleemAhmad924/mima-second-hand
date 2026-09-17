import { describe, expect, it } from "vitest";
import { payoutableCents, sellerRevenueCents, splitSale } from "@/lib/mima/money";

describe("splitSale", () => {
  it("keeps the whole amount for the seller when commission is 0", () => {
    expect(splitSale(2500, 0)).toEqual({
      grossCents: 2500,
      feeCents: 0,
      sellerCents: 2500,
    });
  });

  it("splits the current public rate of 17 percent", () => {
    expect(splitSale(10_000, 1700)).toEqual({
      grossCents: 10_000,
      feeCents: 1700,
      sellerCents: 8300,
    });
  });

  it("splits from configurable basis points", () => {
    expect(splitSale(2500, 2000)).toEqual({
      grossCents: 2500,
      feeCents: 500,
      sellerCents: 2000,
    });
  });
});

describe("sellerRevenueCents", () => {
  it("sums sales instead of storing a writable balance", () => {
    expect(
      sellerRevenueCents([{ sellerCents: 2000 }, { sellerCents: 1500 }]),
    ).toBe(3500);
  });

  it("subtracts approved and completed payouts", () => {
    expect(
      payoutableCents(
        [{ sellerCents: 3500 }],
        [
          { amountCents: 1000, status: "completed" },
          { amountCents: 500, status: "pending" },
        ],
      ),
    ).toBe(2500);
  });
});
