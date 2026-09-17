/**
 * Customer-facing store diagram.
 *
 * Spatial logic follows the real shop (irregular room, four central rows,
 * wall shelving, Küche / WC / Umkleide / Spielecke / Treppe). Geometry is
 * deliberately simplified: integer coordinates, no rotations, no partitions,
 * no per-shelf modules. Exact inventory stays OPEN in store-layout.ts.
 */
import type { StorePlan } from "@/lib/store-map/types";

export const STORE_PLAN: StorePlan = {
  viewBox: { x: 40, y: 18, width: 360, height: 434 },
  outline: [
    [52, 40],
    [210, 30],
    [388, 56],
    [388, 178],
    [318, 222],
    [220, 368],
    [52, 440],
  ],
  shelves: [
    { id: "aisle-a", kind: "aisle", x: 102, y: 96, width: 24, height: 228 },
    { id: "aisle-b", kind: "aisle", x: 148, y: 86, width: 24, height: 238 },
    { id: "aisle-c", kind: "aisle", x: 194, y: 86, width: 24, height: 238 },
    { id: "aisle-d", kind: "aisle", x: 240, y: 114, width: 24, height: 192 },
    { id: "wall-north", kind: "wall", x: 66, y: 52, width: 52, height: 13 },
    { id: "wall-west", kind: "wall", x: 66, y: 146, width: 15, height: 186 },
    { id: "wall-south", kind: "wall", x: 136, y: 342, width: 84, height: 13 },
  ],
  rooms: [
    { id: "kitchen", kind: "kitchen", x: 318, y: 70, width: 60, height: 48 },
    { id: "wc", kind: "wc", x: 318, y: 124, width: 60, height: 40 },
    { id: "fitting", kind: "fitting", x: 268, y: 174, width: 52, height: 36 },
    { id: "play", kind: "play", x: 64, y: 388, width: 64, height: 42 },
  ],
  stairs: { id: "stairs", x: 234, y: 48, width: 56, height: 14 },
  labels: [
    {
      id: "label-aisles",
      text: "Mittelgänge",
      x: 173,
      y: 74,
      level: "primary",
      from: "sm",
    },
    {
      id: "label-stairs",
      text: "Treppe",
      x: 262,
      y: 80,
      level: "secondary",
    },
    {
      id: "label-kitchen",
      text: "Küche",
      x: 348,
      y: 98,
      level: "secondary",
    },
    {
      id: "label-wc",
      text: "WC",
      x: 348,
      y: 148,
      level: "secondary",
    },
    {
      id: "label-fitting",
      text: "Umkleide",
      x: 286,
      y: 218,
      level: "secondary",
    },
    {
      id: "label-play",
      text: "Spielecke",
      x: 96,
      y: 414,
      level: "secondary",
    },
  ],
  legend: [
    { id: "legend-aisles", label: "Mittelgänge", group: "primary" },
    { id: "legend-walls", label: "Wandregale", group: "primary" },
    { id: "legend-kitchen", label: "Küche", group: "secondary" },
    { id: "legend-wc", label: "WC", group: "secondary" },
    { id: "legend-fitting", label: "Umkleide", group: "secondary" },
    { id: "legend-play", label: "Spielecke", group: "secondary" },
    { id: "legend-stairs", label: "Treppe", group: "secondary" },
  ],
};
