/**
 * Customer-facing store diagram.
 *
 * Spatial logic follows the real shop (irregular room, four central rows,
 * wall shelving, Küche / WC / Umkleide / Spielecke / Treppe). Geometry is
 * deliberately simplified: integer coordinates, no rotations, no partitions,
 * no per-shelf modules. Exact inventory stays OPEN in store-layout.ts.
 */
import { PLAN_COLORS } from "@/lib/store-map/plan-colors";
import type { StorePlan } from "@/lib/store-map/types";

export const STORE_PLAN: StorePlan = {
  viewBox: { x: 20, y: 4, width: 396, height: 436 },
  outline: [
    [52, 36],
    [208, 28],
    [386, 54],
    [386, 176],
    [316, 218],
    [232, 344],
    [118, 408],
    [52, 408],
  ],
  shelves: [
    { id: "aisle-a", kind: "aisle", x: 102, y: 84, width: 24, height: 236 },
    { id: "aisle-b", kind: "aisle", x: 148, y: 84, width: 24, height: 236 },
    { id: "aisle-c", kind: "aisle", x: 194, y: 84, width: 24, height: 236 },
    { id: "aisle-d", kind: "aisle", x: 240, y: 112, width: 24, height: 190 },
    { id: "wall-north", kind: "wall", x: 66, y: 50, width: 52, height: 12 },
    { id: "wall-west", kind: "wall", x: 66, y: 140, width: 14, height: 172 },
    { id: "wall-south", kind: "wall", x: 148, y: 332, width: 78, height: 12 },
  ],
  rooms: [
    { id: "kitchen", kind: "kitchen", x: 328, y: 66, width: 50, height: 46 },
    { id: "wc", kind: "wc", x: 328, y: 120, width: 50, height: 38 },
    { id: "fitting", kind: "fitting", x: 266, y: 166, width: 58, height: 46 },
    { id: "play", kind: "play", x: 66, y: 348, width: 68, height: 46 },
  ],
  stairs: { id: "stairs", x: 236, y: 46, width: 54, height: 14 },
  labels: [
    {
      id: "label-aisles",
      text: "Mittelgänge",
      x: 172,
      y: 62,
      level: "primary",
      from: "sm",
    },
    {
      id: "label-stairs",
      text: "Treppe",
      x: 263,
      y: 78,
      level: "secondary",
    },
    {
      id: "label-kitchen",
      text: "Küche",
      x: 353,
      y: 89,
      level: "secondary",
    },
    {
      id: "label-wc",
      text: "WC",
      x: 353,
      y: 139,
      level: "secondary",
    },
    {
      id: "label-fitting",
      text: "Umkleide",
      x: 295,
      y: 189,
      level: "secondary",
    },
    {
      id: "label-play",
      text: "Spielecke",
      x: 100,
      y: 371,
      level: "secondary",
    },
  ],
  legend: [
    {
      id: "legend-aisles",
      label: "Mittelgänge",
      group: "primary",
      color: PLAN_COLORS.aisle,
    },
    {
      id: "legend-walls",
      label: "Wandregale",
      group: "primary",
      color: PLAN_COLORS.wall,
    },
    {
      id: "legend-kitchen",
      label: "Küche",
      group: "secondary",
      color: PLAN_COLORS.kitchen,
    },
    {
      id: "legend-wc",
      label: "WC",
      group: "secondary",
      color: PLAN_COLORS.wc,
    },
    {
      id: "legend-fitting",
      label: "Umkleide",
      group: "secondary",
      color: PLAN_COLORS.fitting,
    },
    {
      id: "legend-play",
      label: "Spielecke",
      group: "secondary",
      color: PLAN_COLORS.play,
    },
    {
      id: "legend-stairs",
      label: "Treppe",
      group: "secondary",
      color: PLAN_COLORS.stairs,
      mark: "stairs",
    },
  ],
};
