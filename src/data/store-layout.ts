/**
 * Store geometry traced from public/images/plan-trace.jpg (768 × 1024).
 *
 * Geometry notes (measured on the scan; kitchen at top-right, Spielecke
 * at bottom-left — the orientation in which the paper labels are readable):
 *
 * Outer shell is an irregular polygon, not a rectangle. Top wall slopes
 * slightly down toward the stairs; the east side is a kitchen/WC wing that
 * then steps inward; the south-east is a chain of angled wall segments;
 * the south-west is the Spielecke corner; the west wall is mostly vertical.
 *
 * Four central aisle rows, left to right: three long runs marked 26, then
 * a shorter run marked 16. They are not equal length and do not share a
 * common top or bottom. The 16-row sits lower because of the diagonal
 * “6 Regale” run above it.
 *
 * “6 Regale” is diagonal, upper-middle toward the right, below the striped
 * stair. Stairs are structure, not shelving. Upper-left is a separate L.
 *
 * South-east wall runs are separate: ~2, ~3, a short ~3, then ~4. Do not
 * merge. West wall has three distinct pieces (L, short mid, long low).
 *
 * Paper numbers 26 / 16 / 6 are used only as visual bay counts for those
 * marked runs. Other handwritten counts are uncertain. exactShelfCount
 * stays open. This file is not inventory and not live availability.
 */
import type {
  LayoutShelf,
  ShelfOrientation,
  ShelfRow,
  StoreLayout,
  StoreZone,
} from "@/lib/store-map/types";
import type { ShelfRecord, Store, Zone } from "@/lib/mima/types";

/** True only while overlaying the SVG on the scan. Must stay false in public UI. */
export const STORE_MAP_TRACE = false;

export const PLAN_IMAGE = {
  src: "/images/plan-trace.jpg",
  width: 768,
  height: 1024,
} as const;

/** Technical id kept stable. Customer-facing city is Stockelsdorf. */
export const LUEBECK_STORE: Store = {
  id: "store-luebeck",
  slug: "luebeck",
  name: "MiMa Second Hand",
  city: "Stockelsdorf",
  timezone: "Europe/Berlin",
};

const STANDARD_OPEN = {
  id: "standard-open",
  name: "Offenes Holzregal",
  widthCm: 90,
  depthCm: 49,
  heightCm: 181,
  inner: {
    hangingWidthCm: 81,
    topShelfFromFloorCm: 121.5,
    midClearanceCm: 60.5,
    lowerShelfFromFloorCm: 21,
    bottomShelfFromFloorCm: 20,
  },
} as const;

const ZONES: StoreZone[] = [
  {
    id: "zone-mitte",
    code: "M",
    name: "Mittelgänge",
    description: "Vier Regalreihen in der Ladenmitte: drei lange, eine kürzere.",
    sortOrder: 1,
  },
  {
    id: "zone-wand",
    code: "W",
    name: "Wandregale",
    description: "Getrennte Läufe an der Westwand und das L an der Nordwestecke.",
    sortOrder: 2,
  },
  {
    id: "zone-sued",
    code: "S",
    name: "Südseite",
    description: "Getrennte Regalläufe an der geknickten Südwand und die Spielecke.",
    sortOrder: 3,
  },
  {
    id: "zone-service",
    code: "D",
    name: "Service",
    description: "Küche, WC, Umkleide und die Treppe an der Nordostwand.",
    sortOrder: 4,
  },
];

function p(xPct: number, yPct: number): [number, number] {
  return [
    Math.round((xPct / 100) * PLAN_IMAGE.width),
    Math.round((yPct / 100) * PLAN_IMAGE.height),
  ];
}

function box(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): { x: number; y: number; width: number; height: number } {
  const a = p(x0, y0);
  const b = p(x1, y1);
  return {
    x: a[0],
    y: a[1],
    width: b[0] - a[0],
    height: b[1] - a[1],
  };
}

/** Shelf run along a wall segment. Start/end in plan percent; depth in px. */
function angled(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  depthPx: number,
): {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
} {
  const a = p(x0, y0);
  const b = p(x1, y1);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = Math.hypot(dx, dy);
  const cx = (a[0] + b[0]) / 2;
  const cy = (a[1] + b[1]) / 2;
  return {
    x: cx - length / 2,
    y: cy - depthPx / 2,
    width: length,
    height: depthPx,
    rotation: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

function visualBays(
  orientation: ShelfOrientation,
  width: number,
  height: number,
): number {
  const along = orientation === "ns" ? height : width;
  const depth = orientation === "ns" ? width : height;
  if (depth <= 2) return 1;
  return Math.max(1, Math.round((along / depth) * (49 / 90)));
}

function poly(pcts: readonly [number, number][]): [number, number][] {
  return pcts.map(([x, y]) => p(x, y));
}

function row(
  partial: Omit<ShelfRow, "unitCount" | "typeId"> & { unitCount?: number },
): ShelfRow {
  return {
    ...partial,
    typeId: STANDARD_OPEN.id,
    unitCount:
      partial.unitCount ??
      visualBays(partial.orientation, partial.width, partial.height),
  };
}

const AISLE_DEPTH = 31;

const ROWS: ShelfRow[] = [
  row({
    id: "row-nw-l-v",
    zoneId: "zone-wand",
    label: "Nordwest L",
    kind: "wall",
    orientation: "ns",
    ...box(10.9, 10.6, 15.4, 17.2),
  }),
  row({
    id: "row-nw-l-h",
    zoneId: "zone-wand",
    label: "Nordwest L",
    kind: "wall",
    orientation: "ew",
    ...box(10.9, 14.0, 24.2, 17.4),
  }),
  row({
    id: "row-six",
    zoneId: "zone-wand",
    label: "Nordost diagonal",
    kind: "wall",
    orientation: "ew",
    unitCount: 6,
    ...angled(50.0, 21.6, 64.0, 28.6, 24),
  }),
  row({
    id: "row-aisle-a",
    zoneId: "zone-mitte",
    label: "Mittelgang A",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(19.2, 25.0, 23.8, 67.8),
  }),
  row({
    id: "row-aisle-b",
    zoneId: "zone-mitte",
    label: "Mittelgang B",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(31.0, 20.8, 35.6, 63.6),
  }),
  row({
    id: "row-aisle-c",
    zoneId: "zone-mitte",
    label: "Mittelgang C",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(42.2, 20.6, 46.8, 64.4),
  }),
  row({
    id: "row-aisle-d",
    zoneId: "zone-mitte",
    label: "Mittelgang D",
    kind: "central",
    orientation: "ns",
    unitCount: 16,
    ...box(52.8, 26.4, 57.4, 62.2),
  }),
  row({
    id: "row-west-mid",
    zoneId: "zone-wand",
    label: "Westwand Mitte",
    kind: "wall",
    orientation: "ns",
    ...box(10.9, 37.4, 14.9, 42.6),
  }),
  row({
    id: "row-west-low",
    zoneId: "zone-wand",
    label: "Westwand Süd",
    kind: "wall",
    orientation: "ns",
    ...box(10.9, 43.8, 15.0, 77.6),
  }),
  row({
    id: "row-island-ab-top",
    zoneId: "zone-mitte",
    label: "Insel an B",
    kind: "island",
    orientation: "ew",
    ...box(35.6, 20.2, 38.6, 23.8),
  }),
  row({
    id: "row-island-b-mid",
    zoneId: "zone-mitte",
    label: "Insel neben B",
    kind: "island",
    orientation: "ew",
    ...box(35.8, 53.6, 38.6, 56.8),
  }),
  row({
    id: "row-island-cd-mid",
    zoneId: "zone-mitte",
    label: "Insel neben D",
    kind: "island",
    orientation: "ew",
    ...box(50.2, 52.2, 53.0, 55.6),
  }),
  row({
    id: "row-island-south-a",
    zoneId: "zone-mitte",
    label: "Insel unter A",
    kind: "island",
    orientation: "ns",
    ...box(19.2, 69.0, 23.8, 75.0),
  }),
  row({
    id: "row-island-south-b",
    zoneId: "zone-mitte",
    label: "Insel unter B",
    kind: "island",
    orientation: "ns",
    ...box(31.0, 64.8, 35.6, 70.6),
  }),
  row({
    id: "row-east-wall",
    zoneId: "zone-service",
    label: "Ostwand",
    kind: "wall",
    orientation: "ns",
    ...box(71.6, 45.0, 74.8, 58.8),
  }),
  row({
    id: "row-south-2",
    zoneId: "zone-sued",
    label: "Südwand 2",
    kind: "wall",
    orientation: "ew",
    unitCount: 2,
    ...angled(64.6, 65.2, 73.6, 60.6, AISLE_DEPTH),
  }),
  row({
    id: "row-south-3",
    zoneId: "zone-sued",
    label: "Südwand 3",
    kind: "wall",
    orientation: "ew",
    unitCount: 3,
    ...angled(52.8, 72.2, 64.0, 65.6, AISLE_DEPTH),
  }),
  row({
    id: "row-south-3b",
    zoneId: "zone-sued",
    label: "Südwand 3 kurz",
    kind: "wall",
    orientation: "ew",
    unitCount: 3,
    ...angled(40.0, 77.6, 51.8, 74.6, 24),
  }),
  row({
    id: "row-south-4",
    zoneId: "zone-sued",
    label: "Südwand 4",
    kind: "wall",
    orientation: "ew",
    unitCount: 4,
    ...angled(28.2, 87.8, 38.0, 77.4, 28),
  }),
  row({
    id: "row-south-corner",
    zoneId: "zone-sued",
    label: "Südwand Ecke",
    kind: "island",
    orientation: "ns",
    ...box(38.4, 74.8, 42.0, 79.2),
  }),
];

const GAP = 0.75;

function shelvesFromRows(rows: readonly ShelfRow[]): LayoutShelf[] {
  const shelves: LayoutShelf[] = [];
  rows.forEach((item, rowIndex) => {
    const code = `R${rowIndex + 1}`;
    for (let i = 0; i < item.unitCount; i += 1) {
      const ns = item.orientation === "ns";
      const cellW = ns ? item.width : item.width / item.unitCount;
      const cellH = ns ? item.height / item.unitCount : item.height;
      const x = ns ? item.x : item.x + i * cellW;
      const y = ns ? item.y + i * cellH : item.y;
      const label = `${code}-${String(i + 1).padStart(2, "0")}`;
      shelves.push({
        id: `shelf-${label.toLowerCase()}`,
        label,
        rowId: item.id,
        zoneId: item.zoneId,
        index: i,
        x,
        y,
        width: ns ? cellW : Math.max(cellW - GAP, 2),
        height: ns ? Math.max(cellH - GAP, 2) : cellH,
        orientation: item.orientation,
        typeId: item.typeId,
      });
    }
  });
  return shelves;
}

const SHELVES = shelvesFromRows(ROWS);

export const STORE_LAYOUT: StoreLayout = {
  metadata: {
    storeId: LUEBECK_STORE.id,
    name: LUEBECK_STORE.name,
    city: LUEBECK_STORE.city,
    timezone: LUEBECK_STORE.timezone,
    source: "client-hand-drawing-2026-09-10",
    verbalShelfMention: 140,
    exactShelfCount: { status: "open" },
    notes:
      "Traced from the hand drawing. Marked aisle counts 26/26/26/16 and 6 are visual bay guides only. Exact inventory is OPEN. Interior kitchen/WC walls are partitions. The map is an explorer, not a booking selector.",
  },
  viewBox: { x: 68, y: 88, width: 652, height: 848 },
  imageSize: { width: PLAN_IMAGE.width, height: PLAN_IMAGE.height },
  outline: poly([
    [10.7, 10.3],
    [32.0, 11.2],
    [48.2, 13.2],
    [54.6, 14.0],
    [64.2, 16.8],
    [72.8, 20.0],
    [90.8, 22.0],
    [91.0, 32.0],
    [90.6, 43.6],
    [83.2, 45.4],
    [82.6, 58.8],
    [75.4, 61.8],
    [66.4, 66.8],
    [56.8, 73.2],
    [52.4, 75.4],
    [47.8, 77.0],
    [39.6, 82.8],
    [29.8, 88.6],
    [27.0, 89.2],
    [10.7, 89.2],
  ]),
  partitions: [
    poly([
      [72.6, 19.7],
      [76.8, 28.4],
      [77.6, 32.6],
    ]),
    poly([
      [77.6, 32.6],
      [90.8, 32.2],
    ]),
    poly([
      [77.6, 32.6],
      [74.2, 36.2],
      [68.4, 38.6],
      [73.8, 44.8],
    ]),
    poly([
      [73.8, 44.8],
      [83.2, 45.4],
    ]),
    poly([
      [73.6, 45.0],
      [73.8, 59.0],
    ]),
  ],
  shelfTypes: [STANDARD_OPEN],
  zones: ZONES,
  rows: ROWS,
  shelves: SHELVES,
  fixtures: [
    {
      id: "fixture-column",
      kind: "column",
      label: "",
      x: p(49.0, 14.6)[0],
      y: p(49.0, 14.6)[1],
      width: 18,
      height: 18,
      shape: "circle",
    },
    {
      id: "fixture-near-column-a",
      kind: "note",
      label: "",
      x: p(51.4, 13.8)[0],
      y: p(51.4, 13.8)[1],
      width: 14,
      height: 12,
      shape: "rect",
    },
    {
      id: "fixture-near-column-b",
      kind: "note",
      label: "",
      x: p(53.2, 15.4)[0],
      y: p(53.2, 15.4)[1],
      width: 12,
      height: 12,
      shape: "rect",
    },
    {
      id: "fixture-stairs",
      kind: "stairs",
      label: "Treppe",
      x: p(57.8, 15.2)[0],
      y: p(57.8, 15.2)[1],
      width: 108,
      height: 22,
      rotation: 18,
    },
    {
      id: "fixture-kitchen",
      kind: "kitchen",
      label: "Küche",
      shape: "polygon",
      points: poly([
        [73.4, 20.6],
        [90.6, 22.2],
        [90.8, 31.8],
        [78.4, 32.4],
        [75.8, 26.6],
      ]),
      ...box(73.4, 20.6, 90.8, 32.4),
    },
    {
      id: "fixture-wc",
      kind: "wc",
      label: "WC",
      shape: "polygon",
      points: poly([
        [77.6, 33.0],
        [90.5, 32.4],
        [90.4, 43.4],
        [74.2, 44.8],
        [68.6, 38.8],
        [74.4, 36.0],
      ]),
      ...box(68.6, 32.4, 90.5, 44.8),
    },
    {
      id: "fixture-fitting",
      kind: "fitting",
      label: "Umkleide",
      shape: "label",
      x: p(60.0, 48.8)[0],
      y: p(60.0, 48.8)[1],
      width: 86,
      height: 22,
    },
    {
      id: "fixture-play",
      kind: "play",
      label: "Spielecke",
      shape: "polygon",
      points: poly([
        [10.9, 79.6],
        [18.2, 79.6],
        [27.0, 88.6],
        [10.9, 89.0],
      ]),
      ...box(10.9, 79.6, 27.0, 89.0),
    },
  ],
};

export const STORE_ZONES: Zone[] = ZONES.map((zone) => ({
  id: zone.id,
  storeId: LUEBECK_STORE.id,
  code: zone.code,
  name: zone.name,
  sortOrder: zone.sortOrder,
  mapCol: 0,
  mapRow: 0,
  columns: 1,
  rows: 1,
}));

export function buildShelfSeed(): ShelfRecord[] {
  return SHELVES.map((shelf) => ({
    id: shelf.id,
    storeId: LUEBECK_STORE.id,
    zoneId: shelf.zoneId,
    label: shelf.label,
    gridCol: 0,
    gridRow: shelf.index,
    size: "standard",
    active: true,
    hint: STORE_LAYOUT.rows.find((item) => item.id === shelf.rowId)?.label,
  }));
}

export const SEEDED_SHELVES = buildShelfSeed();

export const STANDARD_SHELF_TYPE = STANDARD_OPEN;
export const exactShelfCount = STORE_LAYOUT.metadata.exactShelfCount;
