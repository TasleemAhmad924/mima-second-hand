/**
 * Visual store-layout model. Geometry only.
 *
 * Explorer, not a booking selector. No occupancy, reservation or Pladsly ID
 * is stored here. Exact physical inventory remains OPEN.
 */

export type ShelfOrientation = "ns" | "ew";

export type ShelfRowKind = "central" | "wall" | "island";

export type StructuralKind =
  | "checkout"
  | "kitchen"
  | "wc"
  | "fitting"
  | "play"
  | "stairs"
  | "column"
  | "note";

export interface ShelfType {
  id: string;
  name: string;
  widthCm: number;
  depthCm: number;
  heightCm: number;
  inner?: {
    hangingWidthCm?: number;
    topShelfFromFloorCm?: number;
    midClearanceCm?: number;
    lowerShelfFromFloorCm?: number;
    bottomShelfFromFloorCm?: number;
  };
}

export interface ExactShelfCount {
  status: "open";
}

export interface StoreMapMetadata {
  storeId: string;
  name: string;
  city: string;
  timezone: string;
  source: string;
  /** Verbal mention from the client. Not inventory. */
  verbalShelfMention: number;
  exactShelfCount: ExactShelfCount;
  notes: string;
}

export interface StoreZone {
  id: string;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface ShelfRow {
  id: string;
  zoneId: string;
  label: string;
  kind: ShelfRowKind;
  orientation: ShelfOrientation;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Visual bay lines only. Not a confirmed inventory count. */
  unitCount: number;
  rotation?: number;
  typeId: string;
}

export interface LayoutShelf {
  id: string;
  label: string;
  rowId: string;
  zoneId: string;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  orientation: ShelfOrientation;
  typeId: string;
}

export interface StructuralArea {
  id: string;
  kind: StructuralKind;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: "rect" | "circle" | "polygon" | "label";
  rotation?: number;
  points?: [number, number][];
}

export interface StoreLayout {
  metadata: StoreMapMetadata;
  viewBox: { x: number; y: number; width: number; height: number };
  imageSize: { width: number; height: number };
  outline: [number, number][];
  /** Interior walls that are not the outer shell. */
  partitions: [number, number][][];
  shelfTypes: ShelfType[];
  zones: StoreZone[];
  rows: ShelfRow[];
  shelves: LayoutShelf[];
  fixtures: StructuralArea[];
}
