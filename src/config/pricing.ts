/**
 * Rental pricing — single source of truth for durations and prices.
 *
 * IMPORTANT (developer note): The prices below are PLACEHOLDERS. Final prices
 * were not provided by the client. Replace the `price` values (and any
 * commission wording) once confirmed. The `/preise` page, the homepage rental
 * section and the booking summary all read from here.
 */

export type RentalPlanId = "wochen-2" | "monat-1" | "monate-3";

export interface RentalPlan {
  id: RentalPlanId;
  /** Short name used in controls and summaries. */
  name: string;
  /** Number of rental days — used to compute the booking end date. */
  days: number;
  /** Price in euro. PLACEHOLDER until confirmed. */
  price: number;
  /** One concise line describing who the duration suits. */
  note: string;
  /** Marks the duration highlighted in the pricing layout. */
  recommended?: boolean;
}

export const rentalPlans: RentalPlan[] = [
  {
    id: "wochen-2",
    name: "2 Wochen",
    days: 14,
    price: 39, // PLACEHOLDER
    note: "Zum Ausprobieren und für kleinere Auflösungen.",
  },
  {
    id: "monat-1",
    name: "1 Monat",
    days: 30,
    price: 69, // PLACEHOLDER
    note: "Der gewohnte Zeitraum mit genug Ruhe zum Verkaufen.",
    recommended: true,
  },
  {
    id: "monate-3",
    name: "3 Monate",
    days: 90,
    price: 179, // PLACEHOLDER
    note: "Für alle, die dauerhaft ein Regal bespielen möchten.",
  },
];

/**
 * PLACEHOLDER — wording only, no invented figures. MiMa handles the sale in the
 * store; the exact commission/service model is confirmed with the client.
 */
export const pricingNotes = {
  includes: [
    "Ein eigenes Regal im MiMa Store für den gewählten Zeitraum",
    "Verkauf und Kassenabwicklung übernimmt MiMa vor Ort",
    "Deine Verkäufe verfolgst du bequem über dein Online-Konto",
  ],
  // PLACEHOLDER: Provision/Servicegebühr vom Mandanten bestätigen lassen.
  disclaimer:
    "Alle Preise sind vorläufige Angaben und werden vor dem Start final bestätigt.",
};

export function getPlan(id: RentalPlanId): RentalPlan {
  const plan = rentalPlans.find((p) => p.id === id);
  if (!plan) {
    throw new Error(`Unbekannter Mietzeitraum: ${id}`);
  }
  return plan;
}
