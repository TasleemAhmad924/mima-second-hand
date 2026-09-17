import { parseIsoDate } from "@/lib/mima/dates";
import type { DateRange, IsoDate } from "@/lib/mima/types";

/**
 * Half-open [start, end). Valid when start < end as calendar dates.
 */
export function isValidRange(range: DateRange): boolean {
  return parseIsoDate(range.startDate) < parseIsoDate(range.endDate);
}

/**
 * Two half-open ranges overlap when each starts before the other ends.
 * Touching at the exclusive end is allowed (turnover day).
 */
export function rangesOverlap(a: DateRange, b: DateRange): boolean {
  return a.startDate < b.endDate && b.startDate < a.endDate;
}

export function rangeContains(range: DateRange, day: IsoDate): boolean {
  return range.startDate <= day && day < range.endDate;
}
