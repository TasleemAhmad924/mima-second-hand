import { addCalendarMonths, addDays } from "@/lib/mima/dates";
import { isValidRange, rangesOverlap } from "@/lib/mima/intervals";
import {
  OCCUPYING_BOOKING_STATUSES,
  type Booking,
  type BookingStatus,
  type DateRange,
  type IsoDate,
  type RentalPlanId,
} from "@/lib/mima/types";

export function exclusiveEndFor(
  startDate: IsoDate,
  planId: RentalPlanId,
): IsoDate {
  switch (planId) {
    case "wochen-2":
      return addDays(startDate, 14);
    case "wochen-4":
      return addDays(startDate, 28);
    case "monate-3":
      return addCalendarMonths(startDate, 3);
  }
}

export function rangeForPlan(
  startDate: IsoDate,
  planId: RentalPlanId,
): DateRange {
  return { startDate, endDate: exclusiveEndFor(startDate, planId) };
}

export function isOccupyingStatus(status: BookingStatus): boolean {
  return (OCCUPYING_BOOKING_STATUSES as readonly string[]).includes(status);
}

export function occupyingBookings(bookings: readonly Booking[]): Booking[] {
  return bookings.filter((booking) => isOccupyingStatus(booking.status));
}

export function findOverlap(
  candidate: DateRange,
  bookings: readonly Booking[],
  shelfId: string,
  ignoreBookingId?: string,
): Booking | undefined {
  if (!isValidRange(candidate)) return undefined;
  return occupyingBookings(bookings).find((booking) => {
    if (booking.shelfId !== shelfId) return false;
    if (ignoreBookingId && booking.id === ignoreBookingId) return false;
    return rangesOverlap(candidate, {
      startDate: booking.startDate,
      endDate: booking.endDate,
    });
  });
}

export function isShelfFree(
  candidate: DateRange,
  bookings: readonly Booking[],
  shelfId: string,
  ignoreBookingId?: string,
): boolean {
  return !findOverlap(candidate, bookings, shelfId, ignoreBookingId);
}
