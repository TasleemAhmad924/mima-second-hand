/**
 * Repository domain types and interfaces.
 *
 * The repositories return the shapes the UI already consumes (`@/types`), so the
 * data source can change (mock -> Pladsly) WITHOUT redesigning the UI. Adapters
 * are responsible for mapping external DTOs into these shapes.
 *
 * Pure types — safe on client or server. The concrete Pladsly-backed
 * implementations and the resolver are server-only.
 */
import type { Product, Shelf } from "@/types";

export type { Product, Shelf };

/**
 * Operational, time-dependent availability for a single shelf. This is the part
 * Pladsly owns. It is deliberately separate from the shelf *geometry* (position
 * on the floor plan), which MiMa owns.
 */
export interface ShelfAvailability {
  shelfId: string;
  available: boolean;
}

export interface AvailabilityRange {
  /** ISO yyyy-mm-dd. */
  startDate: string;
  /** Rental duration in days. */
  days: number;
}

/** Reads the product catalogue (UI shape). */
export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}

/** Reads time-dependent shelf availability (Pladsly-owned concern). */
export interface ShelfAvailabilityRepository {
  getAvailability(range: AvailabilityRange): Promise<ShelfAvailability[]>;
}
