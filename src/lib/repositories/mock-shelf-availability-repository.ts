import { mockShelves } from "@/data/shelves";
import type {
  AvailabilityRange,
  ShelfAvailability,
  ShelfAvailabilityRepository,
} from "@/lib/repositories/types";

/**
 * Mock shelf-availability repository — client-safe.
 *
 * Derives availability from the mock floor-plan status. This is NOT live data;
 * the range is accepted but ignored (mock availability is static). The real
 * implementation will query Pladsly for the given period.
 */
function delay<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockShelfAvailabilityRepository: ShelfAvailabilityRepository = {
  getAvailability: (_range: AvailabilityRange) => {
    const availability: ShelfAvailability[] = mockShelves.map((shelf) => ({
      shelfId: shelf.id,
      available: shelf.status === "available",
    }));
    return delay(availability);
  },
};
