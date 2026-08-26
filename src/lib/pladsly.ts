import { mockShelves } from "@/data/shelves";
import { mockProductRepository } from "@/lib/repositories/mock-product-repository";
import type { Product, Shelf } from "@/types";

/**
 * Client-safe data facade (mock mode).
 *
 * This is the entry point the existing client components use. It is intentionally
 * CLIENT-SAFE: it holds no secrets and imports no server-only modules. It backs
 * the UI with the shared mock repositories so mock mode keeps working offline
 * (Phase 27), while the secure server-side path (`src/lib/repositories/*.server`
 * + `/api/pladsly/*`) is prepared for the real Pladsly integration.
 *
 * Pladsly-owned concerns (accounts, login, dashboards, payments, payouts,
 * reporting) are intentionally NOT modelled here.
 */

export interface CatalogueProvider {
  getProducts(): Promise<Product[]>;
}

export interface BookingProvider {
  /**
   * Availability for a given start date and duration.
   * Mock implementation ignores the range and returns static availability.
   */
  getShelves(range?: { startDate: string; days: number }): Promise<Shelf[]>;
}

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const mockCatalogue: CatalogueProvider = {
  getProducts: () => mockProductRepository.getProducts(),
};

const mockBooking: BookingProvider = {
  // Returns combined geometry + mock status for the current floor-plan UI.
  // The future path separates MiMa geometry from Pladsly availability via
  // `/api/pladsly/availability`.
  getShelves: () => delay(mockShelves, 500),
};

export const catalogue: CatalogueProvider = mockCatalogue;
export const booking: BookingProvider = mockBooking;
