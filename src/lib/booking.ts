import { getPlan, type RentalPlanId } from "@/config/pricing";
import { exclusiveEndFor } from "@/lib/mima/booking-rules";
import { addDays as addIsoDays, lastOccupiedDay } from "@/lib/mima/dates";

/**
 * Client-safe display helpers. Authoritative overlap and payment live in the
 * operations service — never trust these values to take money.
 */

export function addDays(iso: string, days: number): string {
  return addIsoDays(iso, days);
}

/** Exclusive first free day (turnover). */
export function endDateFor(startIso: string, planId: RentalPlanId): string {
  return exclusiveEndFor(startIso, planId);
}

/** Last occupied calendar day, for customer-facing copy. */
export function lastDayFor(startIso: string, planId: RentalPlanId): string {
  return lastOccupiedDay(endDateFor(startIso, planId));
}

export function priceFor(planId: RentalPlanId): number {
  return getPlan(planId).price;
}
