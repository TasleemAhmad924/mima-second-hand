/**
 * Stylised store diagram based on public/images/plan-trace.jpg (768 × 1024).
 *
 * Spatial logic is taken from the hand drawing. Geometry is regularised
 * for a public website graphic: fewer outline points, even aisle rhythm,
 * elongated wall modules. This is not a 1:1 trace of the sketch.
 *
 * Kitchen at top-right, Spielecke at bottom-left. Outer shell stays
 * irregular: north wall slopes toward the stairs, east wing holds Küche
 * and WC, south-east is a simplified zigzag, west wall is mostly vertical.
 *
 * Four central aisle rows, left to right: three long runs (paper 26) and
 * a shorter run (paper 16). Diagonal “6 Regale” sits below the stairs.
 * South wall keeps four separate runs. West wall is one L plus one long
 * south run. Tiny islands from the sketch are omitted.
 *
 * Paper numbers 26 / 16 / 6 remain visual bay guides only. exactShelfCount
 * stays open. This file is not inventory and not live availability.
 * The public orientation graphic lives in store-plan.ts.
 */
import type {
  LayoutShelf,
  PlanLabel,
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
    description: "Vier Reihen in der Ladenmitte. Drei lange, eine kürzere.",
    sortOrder: 1,
  },
  {
    id: "zone-wand",
    code: "W",
    name: "Wandregale",
    description: "Regalmodule an der Westwand, der Nordwestecke und der Südseite.",
    sortOrder: 2,
  },
  {
    id: "zone-sued",
    code: "S",
    name: "Südseite",
    description: "Regalmodule entlang der geknickten Südwand, neben der Spielecke.",
    sortOrder: 3,
  },
  {
    id: "zone-service",
    code: "D",
    name: "Service",
    description: "Küche und WC im nordöstlichen Anbau, Umkleide und Treppe daneben.",
    sortOrder: 4,
  },
];

function p(xPct: number, yPct: number): [number, number] {
  return [
    Math.round((xPct / 100) * PLAN_IMAGE.width),
    Math.round((yPct / 100) * PLAN_IMAGE.height),
  ];
}

/** Keep SVG numbers identical across Node and the browser. */
function roundPlan(n: number): number {
  return Math.round(n * 100) / 100;
}

function labelAt(xPct: number, yPct: number): { x: number; y: number } {
  const [x, y] = p(xPct, yPct);
  return { x, y };
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
    x: roundPlan(cx - length / 2),
    y: roundPlan(cy - depthPx / 2),
    width: roundPlan(length),
    height: depthPx,
    rotation: roundPlan((Math.atan2(dy, dx) * 180) / Math.PI),
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

const AISLE_DEPTH = 22;
const AISLE_W = 4.15;

const ROWS: ShelfRow[] = [
  row({
    id: "row-nw-l-v",
    zoneId: "zone-wand",
    label: "Nordwest L",
    kind: "wall",
    orientation: "ns",
    ...box(11.0, 10.6, 15.1, 17.0),
  }),
  row({
    id: "row-nw-l-h",
    zoneId: "zone-wand",
    label: "Nordwest L",
    kind: "wall",
    orientation: "ew",
    ...box(11.0, 14.2, 24.0, 17.2),
  }),
  row({
    id: "row-six",
    zoneId: "zone-wand",
    label: "Nordost diagonal",
    kind: "wall",
    orientation: "ew",
    unitCount: 6,
    ...angled(50.2, 21.4, 64.4, 28.2, 20),
  }),
  row({
    id: "row-aisle-a",
    zoneId: "zone-mitte",
    label: "Mittelgang A",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(19.8, 25.2, 19.8 + AISLE_W, 68.4),
  }),
  row({
    id: "row-aisle-b",
    zoneId: "zone-mitte",
    label: "Mittelgang B",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(31.5, 21.2, 31.5 + AISLE_W, 65.2),
  }),
  row({
    id: "row-aisle-c",
    zoneId: "zone-mitte",
    label: "Mittelgang C",
    kind: "central",
    orientation: "ns",
    unitCount: 26,
    ...box(43.2, 21.2, 43.2 + AISLE_W, 65.6),
  }),
  row({
    id: "row-aisle-d",
    zoneId: "zone-mitte",
    label: "Mittelgang D",
    kind: "central",
    orientation: "ns",
    unitCount: 16,
    ...box(54.9, 27.6, 54.9 + AISLE_W, 63.4),
  }),
  row({
    id: "row-west-low",
    zoneId: "zone-wand",
    label: "Westwand",
    kind: "wall",
    orientation: "ns",
    ...box(11.0, 38.2, 14.8, 77.8),
  }),
  row({
    id: "row-east-wall",
    zoneId: "zone-service",
    label: "Ostwand",
    kind: "wall",
    orientation: "ns",
    ...box(71.8, 45.6, 75.0, 58.6),
  }),
  row({
    id: "row-south-2",
    zoneId: "zone-sued",
    label: "Südwand 2",
    kind: "wall",
    orientation: "ew",
    unitCount: 2,
    ...angled(65.2, 66.6, 74.4, 61.6, AISLE_DEPTH),
  }),
  row({
    id: "row-south-3",
    zoneId: "zone-sued",
    label: "Südwand 3",
    kind: "wall",
    orientation: "ew",
    unitCount: 3,
    ...angled(53.0, 74.0, 64.6, 67.2, AISLE_DEPTH),
  }),
  row({
    id: "row-south-3b",
    zoneId: "zone-sued",
    label: "Südwand 3 kurz",
    kind: "wall",
    orientation: "ew",
    unitCount: 3,
    ...angled(40.8, 79.4, 52.2, 75.2, 18),
  }),
  row({
    id: "row-south-4",
    zoneId: "zone-sued",
    label: "Südwand 4",
    kind: "wall",
    orientation: "ew",
    unitCount: 4,
    ...angled(28.4, 87.2, 39.0, 79.0, 20),
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
      "Stylised public diagram from the hand drawing. Marked aisle counts 26/26/26/16 and 6 are visual bay guides only. Exact inventory is OPEN. Interior kitchen/WC walls are partitions. The map is an explorer, not a booking selector.",
  },
  viewBox: { x: 48, y: 62, width: 680, height: 880 },
  imageSize: { width: PLAN_IMAGE.width, height: PLAN_IMAGE.height },
  outline: poly([
    [11.0, 10.2],
    [48.0, 13.2],
    [68.0, 18.0],
    [91.0, 21.6],
    [91.0, 43.6],
    [82.8, 45.4],
    [82.8, 58.4],
    [74.6, 62.0],
    [64.8, 67.6],
    [52.6, 74.8],
    [39.4, 82.8],
    [27.0, 89.0],
    [11.0, 89.0],
  ]),
  partitions: [
    poly([
      [73.2, 20.4],
      [77.4, 32.4],
    ]),
    poly([
      [77.4, 32.4],
      [91.0, 32.4],
    ]),
    poly([
      [77.4, 32.4],
      [73.6, 36.2],
      [68.8, 38.8],
      [74.2, 45.0],
    ]),
    poly([
      [74.2, 45.0],
      [82.8, 45.4],
    ]),
    poly([
      [74.0, 45.2],
      [74.0, 59.0],
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
      x: p(49.2, 14.8)[0],
      y: p(49.2, 14.8)[1],
      width: 16,
      height: 16,
      shape: "circle",
    },
    {
      id: "fixture-stairs",
      kind: "stairs",
      label: "Treppe",
      x: p(58.2, 15.4)[0],
      y: p(58.2, 15.4)[1],
      width: 104,
      height: 20,
      rotation: 16,
    },
    {
      id: "fixture-kitchen",
      kind: "kitchen",
      label: "Küche",
      shape: "polygon",
      points: poly([
        [73.4, 20.6],
        [91.0, 22.0],
        [91.0, 32.2],
        [77.6, 32.4],
        [74.8, 25.8],
      ]),
      ...box(73.4, 20.6, 91.0, 32.4),
    },
    {
      id: "fixture-wc",
      kind: "wc",
      label: "WC",
      shape: "polygon",
      points: poly([
        [77.6, 32.8],
        [91.0, 32.6],
        [91.0, 43.6],
        [82.8, 45.2],
        [74.2, 44.8],
        [68.8, 38.8],
        [74.6, 36.0],
      ]),
      ...box(68.8, 32.6, 91.0, 45.2),
    },
    {
      id: "fixture-fitting",
      kind: "fitting",
      label: "Umkleide",
      shape: "label",
      x: p(60.4, 48.6)[0],
      y: p(60.4, 48.6)[1],
      width: 88,
      height: 22,
    },
    {
      id: "fixture-play",
      kind: "play",
      label: "Spielecke",
      shape: "polygon",
      points: poly([
        [11.0, 79.4],
        [19.6, 79.4],
        [27.0, 89.0],
        [11.0, 89.0],
      ]),
      ...box(11.0, 79.4, 27.0, 89.0),
    },
  ],
  labels: [
    {
      id: "label-kitchen",
      text: "Küche",
      ...labelAt(82.0, 26.4),
      focusId: "fixture-kitchen",
      compact: true,
    },
    {
      id: "label-wc",
      text: "WC",
      ...labelAt(82.6, 38.6),
      focusId: "fixture-wc",
      compact: true,
    },
    {
      id: "label-fitting",
      text: "Umkleide",
      ...labelAt(63.2, 51.6),
      focusId: "fixture-fitting",
    },
    {
      id: "label-play",
      text: "Spielecke",
      ...labelAt(16.8, 84.6),
      focusId: "fixture-play",
      compact: true,
    },
    {
      id: "label-stairs",
      text: "Treppe",
      ...labelAt(62.4, 19.2),
      focusId: "fixture-stairs",
    },
  ] satisfies PlanLabel[],
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
