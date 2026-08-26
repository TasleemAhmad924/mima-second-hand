import type { Shelf } from "@/types";

/**
 * MOCK shelf availability for the booking prototype.
 *
 * This is NOT live data. Availability, statuses and labels are placeholders so
 * the floor-plan interface can be designed and tested. The real availability
 * will be provided by the booking provider (see `src/lib/pladsly.ts`).
 *
 * `col`/`row` are positions on the schematic grid rendered in
 * `components/booking/FloorPlan`. The grid is 5 columns × 4 rows; the bottom
 * corners are reserved for the entrance (left) and checkout (right).
 */
export const mockShelves: Shelf[] = [
  { id: "R01", status: "available", col: 0, row: 0, hint: "am Eingang" },
  { id: "R02", status: "occupied", col: 1, row: 0 },
  { id: "R03", status: "available", col: 2, row: 0 },
  { id: "R04", status: "available", col: 3, row: 0 },
  { id: "R05", status: "occupied", col: 4, row: 0, hint: "am Fenster" },

  { id: "R06", status: "available", col: 0, row: 1 },
  { id: "R07", status: "occupied", col: 1, row: 1 },
  { id: "R08", status: "occupied", col: 2, row: 1 },
  { id: "R09", status: "available", col: 3, row: 1 },
  { id: "R10", status: "available", col: 4, row: 1 },

  { id: "R11", status: "available", col: 0, row: 2 },
  { id: "R12", status: "occupied", col: 1, row: 2 },
  { id: "R13", status: "available", col: 2, row: 2 },
  { id: "R14", status: "occupied", col: 3, row: 2 },
  { id: "R15", status: "available", col: 4, row: 2 },

  { id: "R16", status: "occupied", col: 1, row: 3 },
  { id: "R17", status: "available", col: 2, row: 3, hint: "zentral" },
  { id: "R18", status: "available", col: 3, row: 3 },
];

/** Geometry for the schematic floor plan, shared by the SVG renderer. */
export const floorPlan = {
  cols: 5,
  rows: 4,
  entrance: { col: 0, row: 3 },
  checkout: { col: 4, row: 3 },
} as const;
