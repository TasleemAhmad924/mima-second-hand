import "server-only";

import type {
  AvailabilityRange,
  ShelfAvailabilityRepository,
} from "@/lib/repositories/types";
import { fetchPladslyAvailability } from "@/lib/pladsly/places.server";

/**
 * Pladsly-backed shelf-availability repository (server-only).
 *
 * Delegates to the integration layer. The underlying fetch is currently a stub
 * (endpoint unconfirmed) and throws a typed IntegrationError.
 */
export const pladslyShelfAvailabilityRepository: ShelfAvailabilityRepository = {
  getAvailability: (range: AvailabilityRange) => fetchPladslyAvailability(range),
};
