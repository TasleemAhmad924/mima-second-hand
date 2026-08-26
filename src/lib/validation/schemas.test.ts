import { describe, it, expect } from "vitest";
import {
  availabilityQuerySchema,
  isoDateSchema,
  rentalDaysSchema,
  shelfIdSchema,
} from "@/lib/validation/schemas";

function isoDaysFromToday(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

describe("isoDateSchema", () => {
  it("accepts a valid near-future date", () => {
    expect(isoDateSchema.safeParse(isoDaysFromToday(7)).success).toBe(true);
  });

  it("rejects malformed strings", () => {
    expect(isoDateSchema.safeParse("2026-13-40").success).toBe(false);
    expect(isoDateSchema.safeParse("not-a-date").success).toBe(false);
  });

  it("rejects dates far in the past or beyond the lookahead window", () => {
    expect(isoDateSchema.safeParse(isoDaysFromToday(-5)).success).toBe(false);
    expect(isoDateSchema.safeParse(isoDaysFromToday(9999)).success).toBe(false);
  });
});

describe("rentalDaysSchema", () => {
  it("accepts offered durations", () => {
    expect(rentalDaysSchema.safeParse(14).success).toBe(true);
    expect(rentalDaysSchema.safeParse(30).success).toBe(true);
    expect(rentalDaysSchema.safeParse(90).success).toBe(true);
  });

  it("rejects arbitrary durations", () => {
    expect(rentalDaysSchema.safeParse(3).success).toBe(false);
    expect(rentalDaysSchema.safeParse(31).success).toBe(false);
  });
});

describe("shelfIdSchema", () => {
  it("accepts valid shelf ids", () => {
    expect(shelfIdSchema.safeParse("R01").success).toBe(true);
    expect(shelfIdSchema.safeParse("R18").success).toBe(true);
  });

  it("rejects invalid shelf ids", () => {
    expect(shelfIdSchema.safeParse("X1").success).toBe(false);
    expect(shelfIdSchema.safeParse("R1").success).toBe(false);
    expect(shelfIdSchema.safeParse("'; DROP TABLE").success).toBe(false);
  });
});

describe("availabilityQuerySchema", () => {
  it("validates and coerces a correct query", () => {
    const result = availabilityQuerySchema.safeParse({
      startDate: isoDaysFromToday(3),
      days: "30",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.days).toBe(30);
  });

  it("rejects an out-of-range duration", () => {
    const result = availabilityQuerySchema.safeParse({
      startDate: isoDaysFromToday(3),
      days: "7",
    });
    expect(result.success).toBe(false);
  });
});
