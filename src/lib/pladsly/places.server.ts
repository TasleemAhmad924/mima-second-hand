import "server-only";

import type { ShelfAvailability, AvailabilityRange } from "@/lib/repositories/types";
import type { PladslyAvailabilityDTO } from "@/lib/pladsly/types";
import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Places / shelf-availability integration (server-only).
 *
 * MiMa owns the shelf *geometry* (floor-plan positions). Pladsly owns the
 * time-dependent *availability*. This module only concerns availability.
 *
 * The mapping adapter is implemented and tested; the network fetch is a stub
 * until the official places/availability endpoint is confirmed.
 */

/** Adapts a raw Pladsly availability DTO into the domain `ShelfAvailability`. */
export function mapAvailability(dto: PladslyAvailabilityDTO): ShelfAvailability {
  if (!dto || typeof dto.placeId !== "string" || typeof dto.available !== "boolean") {
    throw IntegrationError.malformed("places.mapAvailability");
  }
  return { shelfId: dto.placeId, available: dto.available };
}

/** Maps a list of availability DTOs, skipping malformed entries. */
export function mapAvailabilityList(dtos: unknown): ShelfAvailability[] {
  if (!Array.isArray(dtos)) {
    throw IntegrationError.malformed("places.mapAvailabilityList");
  }
  const result: ShelfAvailability[] = [];
  for (const dto of dtos) {
    try {
      result.push(mapAvailability(dto as PladslyAvailabilityDTO));
    } catch {
      // skip malformed entry
    }
  }
  return result;
}

/**
 * Fetches time-dependent shelf availability from Pladsly for a period.
 * NOT YET IMPLEMENTED — the endpoint contract is unconfirmed.
 */
export async function fetchPladslyAvailability(
  _range: AvailabilityRange,
): Promise<ShelfAvailability[]> {
  throw IntegrationError.notImplemented("places.availability");
}
