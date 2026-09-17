import { describe, expect, it } from "vitest";
import {
  exclusiveEndFor,
  findOverlap,
  isShelfFree,
  rangeForPlan,
} from "@/lib/mima/booking-rules";
import { lastOccupiedDay } from "@/lib/mima/dates";
import { rangesOverlap } from "@/lib/mima/intervals";
import type { Booking } from "@/lib/mima/types";

function booking(partial: Partial<Booking> & Pick<Booking, "startDate" | "endDate">): Booking {
  return {
    id: partial.id ?? "b1",
    sellerId: "seller-1",
    shelfId: partial.shelfId ?? "shelf-m1-12",
    planId: "wochen-4",
    status: partial.status ?? "confirmed",
    paymentStatus: "paid",
    priceCents: 7500,
    createdAt: "2026-09-10T00:00:00.000Z",
    updatedAt: "2026-09-10T00:00:00.000Z",
    ...partial,
  };
}

describe("exclusiveEndFor", () => {
  it("uses 14 days for two weeks", () => {
    expect(exclusiveEndFor("2026-10-01", "wochen-2")).toBe("2026-10-15");
  });

  it("uses 28 days for four weeks", () => {
    expect(exclusiveEndFor("2026-10-01", "wochen-4")).toBe("2026-10-29");
    expect(lastOccupiedDay("2026-10-29")).toBe("2026-10-28");
  });

  it("uses three calendar months so 01.10 ends 01.01", () => {
    expect(exclusiveEndFor("2026-10-01", "monate-3")).toBe("2027-01-01");
    expect(lastOccupiedDay("2027-01-01")).toBe("2026-12-31");
  });

  it("clamps 31 Jan + 3 months to 30 Apr 2026", () => {
    expect(exclusiveEndFor("2026-01-31", "monate-3")).toBe("2026-04-30");
  });
});

describe("overlap", () => {
  const october = booking({
    id: "oct",
    startDate: "2026-10-01",
    endDate: "2026-10-29",
  });

  it("rejects a second booking that starts mid-period", () => {
    const mid = rangeForPlan("2026-10-15", "wochen-4");
    expect(mid).toEqual({ startDate: "2026-10-15", endDate: "2026-11-12" });
    expect(findOverlap(mid, [october], "shelf-m1-12")?.id).toBe("oct");
    expect(isShelfFree(mid, [october], "shelf-m1-12")).toBe(false);
  });

  it("allows a booking that starts on the exclusive end", () => {
    const next = rangeForPlan("2026-10-29", "wochen-4");
    expect(isShelfFree(next, [october], "shelf-m1-12")).toBe(true);
    expect(rangesOverlap(rangeForPlan("2026-10-01", "wochen-4"), next)).toBe(
      false,
    );
  });

  it("ignores cancelled bookings", () => {
    const cancelled = booking({
      status: "cancelled",
      startDate: "2026-10-01",
      endDate: "2026-10-29",
    });
    expect(
      isShelfFree(rangeForPlan("2026-10-15", "wochen-4"), [cancelled], "shelf-m1-12"),
    ).toBe(true);
  });

  it("does not collide with another shelf", () => {
    expect(
      isShelfFree(
        rangeForPlan("2026-10-15", "wochen-4"),
        [october],
        "shelf-m2-01",
      ),
    ).toBe(true);
  });
});
