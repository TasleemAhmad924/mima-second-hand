import { getPlan, type RentalPlanId } from "@/config/pricing";

/**
 * Booking helpers. These are pure, client-safe calculations for the prototype.
 * The final, authoritative booking (availability, price, payment) is handled by
 * the provider — never trust these client-side values for real payments.
 */

/** Adds `days` to an ISO date and returns a new ISO date (yyyy-mm-dd). */
export function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Computes the (exclusive) end date for a plan starting on `startIso`. */
export function endDateFor(startIso: string, planId: RentalPlanId): string {
  const plan = getPlan(planId);
  return addDays(startIso, plan.days);
}

export function priceFor(planId: RentalPlanId): number {
  return getPlan(planId).price;
}
