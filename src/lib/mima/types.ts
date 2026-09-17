/**
 * MiMa domain types. UI and providers share these shapes.
 * External systems map *into* this model; they do not leak out.
 */

import type { RentalPlanId } from "@/config/pricing";

export type IsoDate = string;

export type { RentalPlanId };

export type BookingStatus =
  | "draft"
  | "pending_payment"
  | "confirmed"
  | "cancelled"
  | "expired";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type ShelfMapStatus =
  | "available"
  | "occupied"
  | "reserved"
  | "selected"
  | "inactive";

export type SellerStatus = "active" | "suspended";

export type ProductStatus =
  | "draft"
  | "active"
  | "sold"
  | "removed"
  | "expired";

export type ProductCategory =
  | "mode"
  | "accessoires"
  | "wohnen"
  | "buecher"
  | "sonstiges";

export type PayoutStatus = "pending" | "approved" | "completed";

export type UserRole = "seller" | "employee" | "admin";

export type SalePaymentMethod = "cash" | "card" | "other";

export type SaleSource = "manual" | "pos";

export interface Store {
  id: string;
  slug: string;
  name: string;
  city: string;
  timezone: string;
}

export interface Zone {
  id: string;
  storeId: string;
  code: string;
  name: string;
  sortOrder: number;
  mapCol: number;
  mapRow: number;
  columns: number;
  rows: number;
}

export interface ShelfRecord {
  id: string;
  storeId: string;
  zoneId: string;
  label: string;
  gridCol: number;
  gridRow: number;
  size: "standard";
  active: boolean;
  hint?: string;
}

export interface Seller {
  id: string;
  authUserId: string | null;
  email: string;
  displayName: string;
  phone: string | null;
  status: SellerStatus;
}

export interface Booking {
  id: string;
  sellerId: string;
  shelfId: string;
  planId: RentalPlanId;
  startDate: IsoDate;
  endDate: IsoDate;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  priceCents: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRecord {
  id: string;
  sellerId: string;
  shelfId: string | null;
  title: string;
  description: string | null;
  category: ProductCategory;
  brand: string | null;
  size: string | null;
  priceCents: number;
  imagePath: string | null;
  barcode: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  sellerId: string;
  shelfId: string | null;
  grossCents: number;
  feeCents: number;
  sellerCents: number;
  paymentMethod: SalePaymentMethod;
  soldAt: string;
  employeeId: string | null;
  source: SaleSource;
}

export interface Payout {
  id: string;
  sellerId: string;
  amountCents: number;
  status: PayoutStatus;
  periodStart: IsoDate;
  periodEnd: IsoDate;
}

export interface StoreSettings {
  storeId: string;
  commissionBps: number;
  barcodePrefix: string;
}

export interface DateRange {
  startDate: IsoDate;
  endDate: IsoDate;
}

/** Shelf as shown on the map: geometry + derived occupancy. */
export interface ShelfView {
  id: string;
  label: string;
  zoneId: string;
  zoneCode: string;
  col: number;
  row: number;
  hint?: string;
  status: Extract<ShelfMapStatus, "available" | "occupied" | "inactive">;
}

export const OCCUPYING_BOOKING_STATUSES: readonly BookingStatus[] = [
  "pending_payment",
  "confirmed",
];
