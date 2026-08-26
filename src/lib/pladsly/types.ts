/**
 * Pladsly integration DTOs.
 *
 * These describe the *raw* shapes we expect from Pladsly at the integration
 * boundary. They are intentionally marked as ASSUMED until the official API
 * contract is confirmed (see `docs/pladsly-integration.md`). Do NOT treat these
 * as confirmed API behaviour. Adapters map these DTOs to the app's UI types.
 *
 * This file is safe on client or server (pure types), but the modules that
 * actually call Pladsly are server-only.
 */

/** ASSUMED raw product shape from Pladsly. Confirm fields before use. */
export interface PladslyProductDTO {
  id: string;
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
  category?: string;
  size?: string;
  available?: boolean;
}

/** ASSUMED raw place/shelf shape from Pladsly. Confirm fields before use. */
export interface PladslyPlaceDTO {
  id: string;
  label?: string;
  status?: string;
}

/** ASSUMED raw availability shape for a period. Confirm before use. */
export interface PladslyAvailabilityDTO {
  placeId: string;
  available: boolean;
}

/** A period used when querying time-dependent availability. */
export interface AvailabilityQuery {
  /** ISO yyyy-mm-dd start date. */
  startDate: string;
  /** Rental duration in days. */
  days: number;
}
