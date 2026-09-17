import { getPlan, type RentalPlan, type RentalPlanId } from "@/config/pricing";

export type DurationIntent =
  | "up-to-2-weeks"
  | "about-4-weeks"
  | "several-weeks"
  | "up-to-3-months";

export type VolumeIntent = "few" | "some" | "many";

/**
 * Deterministic rental-model recommender.
 *
 * Duration is the primary signal:
 * - up to 2 weeks → 2 Wochen
 * - about 3-4 weeks → 4 Wochen
 * - up to 3 months / long-term → 3 Monate
 * - several weeks → 4 Wochen, unless volume is "many" then 3 Monate
 *
 * Volume never upgrades a 2-week intent and never downgrades a 3-month intent.
 * No earnings, no sell-through estimates.
 */
export function recommendRentalPlan(
  duration: DurationIntent,
  volume: VolumeIntent = "some",
): RentalPlanId {
  if (duration === "up-to-2-weeks") return "wochen-2";
  if (duration === "about-4-weeks") return "wochen-4";
  if (duration === "up-to-3-months") return "monate-3";
  return volume === "many" ? "monate-3" : "wochen-4";
}

export function recommendRental(duration: DurationIntent, volume?: VolumeIntent): {
  plan: RentalPlan;
  reason: string;
} {
  const id = recommendRentalPlan(duration, volume ?? "some");
  return { plan: getPlan(id), reason: reasonFor(id, duration, volume ?? "some") };
}

function reasonFor(
  id: RentalPlanId,
  duration: DurationIntent,
  volume: VolumeIntent,
): string {
  if (id === "wochen-2") {
    return "Ein kurzer Zeitraum reicht zum Ausprobieren, ohne dass du dich lange bindest.";
  }
  if (id === "monate-3") {
    if (duration === "up-to-3-months") {
      return "Wenn du über Wochen hinweg dabei sein möchtest, ist der längste Zeitraum der ruhigste.";
    }
    return "Bei vielen Teilen gibt der längere Zeitraum mehr Ruhe, nach und nach nachzuräumen.";
  }
  if (volume === "few") {
    return "Vier Wochen geben einer überschaubaren Auswahl genug Zeit, ohne gleich drei Monate zu mieten.";
  }
  return "Vier Wochen sind der ausgewogene Zeitraum: genug Ruhe zum Verkaufen, ohne gleich langfristig zu planen.";
}
