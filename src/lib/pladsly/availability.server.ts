import "server-only";

import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Availability (server-only).
 *
 * Client communication (LIKELY, not CONFIRMED as an HTTP contract):
 * Pladsly can answer when the next fitting shelf becomes free, at a
 * general level. Bookings can be assigned to shelves internally.
 * Pladsly prefers automatic assignment.
 *
 * NOT CONFIRMED:
 * - stable per-shelf IDs on a public API
 * - live availability for a specific shelf
 * - customer-side booking of a named shelf
 * - the REST path / response shape for “next free shelf”
 *
 * Do not implement a fake per-shelf engine here.
 */

export interface GeneralAvailability {
  /** ISO date when any fitting shelf is next free, if known. */
  nextFreeDate: string | null;
  note: string;
}

/**
 * General next-free capability. Blocked until the path is documented.
 */
export async function getGeneralAvailability(): Promise<GeneralAvailability> {
  throw IntegrationError.notImplemented("availability.general");
}

/**
 * Per-shelf live availability. Blocked. Do not stub fake states.
 */
export async function getShelfAvailability(): Promise<never> {
  throw IntegrationError.notImplemented("availability.per-shelf");
}
