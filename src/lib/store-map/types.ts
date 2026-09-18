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

export interface PlanLabel {
  id: string;
  text: string;
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  /** Highlights with this chip / zone / fixture id. */
  focusId?: string;
  /** Shown on small screens. Desktop always shows every label. */
  compact?: boolean;
}

export type StorePlanShelfKind = "aisle" | "wall";

export type StorePlanRoomKind = "kitchen" | "wc" | "fitting" | "play";

export interface StorePlanRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StorePlanShelf extends StorePlanRect {
  kind: StorePlanShelfKind;
}

export interface StorePlanRoom extends StorePlanRect {
  kind: StorePlanRoomKind;
}

export interface StorePlanLabel {
  id: string;
  text: string;
  x: number;
  y: number;
  level: "primary" | "secondary";
  anchor?: "start" | "middle" | "end";
  /** Hide inside the SVG on small screens; the legend still lists it. */
  desktopOnly?: boolean;
  /** sm = from 640px, lg = from 1024px. Default: always visible. */
  from?: "sm" | "lg";
}

export type StorePlanLegendMark = "fill" | "stairs";

export interface StorePlanLegendItem {
  id: string;
  label: string;
  group: "primary" | "secondary";
  /** Fill used on the diagram. Same value as the matching map shape. */
  color: string;
  mark?: StorePlanLegendMark;
}

/** Customer-facing orientation diagram. Not inventory, not CAD. */
export interface StorePlan {
  viewBox: { x: number; y: number; width: number; height: number };
  outline: readonly [number, number][];
  shelves: readonly StorePlanShelf[];
  rooms: readonly StorePlanRoom[];
  stairs: StorePlanRect;
  labels: readonly StorePlanLabel[];
  legend: readonly StorePlanLegendItem[];
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
  labels: PlanLabel[];
}
