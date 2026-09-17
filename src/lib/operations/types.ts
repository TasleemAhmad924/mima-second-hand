import type {
  Booking,
  DateRange,
  IsoDate,
  ProductRecord,
  RentalPlanId,
  Sale,
  Seller,
  ShelfView,
  Zone,
} from "@/lib/mima/types";

export type OperationsProviderId = "native" | "supabase" | "pladsly";

export interface AvailabilityResult {
  range: DateRange;
  shelves: ShelfView[];
  zones: Zone[];
  /** True only when this is authoritative production data. */
  live: boolean;
  provider: OperationsProviderId;
}

export interface OperationsProvider {
  readonly id: OperationsProviderId;
  getAvailability(range: DateRange): Promise<AvailabilityResult>;
  createBooking(input: {
    sellerId: string;
    shelfId: string;
    planId: RentalPlanId;
    startDate: IsoDate;
  }): Promise<Booking>;
  ensureSeller(input: { email: string; displayName: string }): Promise<Seller>;
  listSellerBookings(sellerId: string): Promise<Booking[]>;
  listSellerProducts(sellerId: string): Promise<ProductRecord[]>;
  listSellerSales(sellerId: string): Promise<Sale[]>;
  overview(): Promise<{
    totalShelves: number;
    occupiedShelves: number;
    freeShelves: number;
    activeSellers: number;
    activeProducts: number;
    salesCount: number;
    revenueCents: number;
  }>;
}
