import { z } from "zod";
import {
  ALLOWED_RENTAL_DAYS,
  AVAILABILITY_LOOKAHEAD_DAYS,
  SHELF_ID_PATTERN,
} from "@/config/business";
import { todayIso } from "@/lib/format";

/**
 * Input validation schemas for the server boundary.
 *
 * Every value entering an API route is untrusted and must be validated here
 * before use. Client-supplied pricing, availability, payment or booking state
 * is NEVER trusted — it must be verified against the authoritative backend.
 */

/** ISO calendar date (yyyy-mm-dd) that is a real date and within a sane window. */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Datum muss im Format JJJJ-MM-TT sein.")
  .refine((value) => {
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  }, "Ungültiges Datum.")
  .refine((value) => {
    const [y, m, d] = value.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const [ty, tm, td] = todayIso().split("-").map(Number);
    const today = new Date(ty, tm - 1, td);
    const max = new Date(today);
    max.setDate(max.getDate() + AVAILABILITY_LOOKAHEAD_DAYS);
    return date >= today && date <= max;
  }, "Datum liegt außerhalb des gültigen Zeitraums.");

/** Rental duration in days — must be one of the offered durations. */
export const rentalDaysSchema = z.coerce
  .number()
  .int()
  .refine(
    (value) => (ALLOWED_RENTAL_DAYS as readonly number[]).includes(value),
    "Ungültige Mietdauer.",
  );

/** Layout-local shelf label, e.g. "M1-12". Not a Pladsly ID. */
export const shelfIdSchema = z
  .string()
  .regex(SHELF_ID_PATTERN, "Ungültige Regal-Kennung.");

export const rentalPlanIdSchema = z.enum(["wochen-2", "wochen-4", "monate-3"]);

/** Availability lookup query (used by /api/pladsly/availability). */
export const availabilityQuerySchema = z.object({
  startDate: isoDateSchema,
  days: rentalDaysSchema,
});

export const mimaAvailabilityQuerySchema = z.object({
  startDate: isoDateSchema,
  planId: rentalPlanIdSchema,
});

export const mimaBookingBodySchema = z.object({
  startDate: isoDateSchema,
  planId: rentalPlanIdSchema,
  shelfId: z.string().min(1).max(40),
  email: z.string().email("Bitte eine gültige E-Mail angeben."),
  name: z.string().trim().min(2).max(80),
});

/** Simple, bounded pagination for list endpoints. */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});

export type AvailabilityQueryInput = z.infer<typeof availabilityQuerySchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
