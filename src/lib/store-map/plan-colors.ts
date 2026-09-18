/**
 * Shared fills for the orientation map and its legend.
 * Keep these quiet: cream, wood, sage — not a rainbow key.
 */
export const PLAN_COLORS = {
  ink: "#292725",
  taupe: "#4A3A32",
  floor: "#f4efe8",
  aisle: "#CEBBA9",
  wall: "#bda38e",
  kitchen: "#ead8c0",
  wc: "#c8c3bb",
  fitting: "#ddd1c2",
  play: "#d3decc",
  stairs: "#efe8df",
} as const;

export type PlanColorId = keyof typeof PLAN_COLORS;
