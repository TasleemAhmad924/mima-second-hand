import type { RentalPlanId } from "@/config/pricing";

export type ShelfStatus = "available" | "occupied";

/** A single shelf position on the store floor plan. */
export interface Shelf {
  /** Label shown to the visitor, e.g. "R01". */
  id: string;
  status: ShelfStatus;
  /** Grid coordinates within the schematic floor plan (column, row). */
  col: number;
  row: number;
  /** Optional human hint, e.g. "am Fenster". */
  hint?: string;
}

export type ProductCategory =
  | "mode"
  | "accessoires"
  | "wohnen"
  | "buecher";

/** A discovery item. Later replaced by catalogue data from the provider. */
export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  /** Short, understated metadata line (e.g. condition or material). */
  detail: string;
  image: string;
  /** Portrait / square hint so the grid can vary rhythm intentionally. */
  ratio: "portrait" | "square" | "landscape";
  alt: string;
}

export interface CategoryMeta {
  id: ProductCategory | "alle";
  label: string;
}

export type FaqAudience = "verkaufen" | "entdecken";

export interface FaqItem {
  question: string;
  answer: string;
  audience: FaqAudience;
}

/** A resolved booking selection, produced by the booking prototype. */
export interface BookingSelection {
  startDate: string; // ISO yyyy-mm-dd
  planId: RentalPlanId;
  shelfId: string;
}
