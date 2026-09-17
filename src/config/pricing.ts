/**
 * Rental pricing — single source of truth for durations and prices.
 *
 * Confirmed from the client price graphic (2026-09-10):
 * 2 Wochen 39 € · 4 Wochen 75 € · 3 Monate 210 €.
 * Canonical wording uses “4 Wochen”, not “1 Monat”.
 */

export type RentalPlanId = "wochen-2" | "wochen-4" | "monate-3";

export interface RentalPlan {
  id: RentalPlanId;
  /** Short name used in controls and summaries. */
  name: string;
  /** Number of rental days — used to compute the booking end date. */
  days: number;
  /** Price in euro. */
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
    price: 39,
    note: "Zum Ausprobieren und für kleinere Auflösungen.",
  },
  {
    id: "wochen-4",
    name: "4 Wochen",
    days: 28,
    price: 75,
    note: "Der gewohnte Zeitraum mit genug Ruhe zum Verkaufen.",
    recommended: true,
  },
  {
    id: "monate-3",
    name: "3 Monate",
    days: 90,
    price: 210,
    note: "Für alle, die dauerhaft ein Regal bespielen möchten.",
  },
];

/** Public sales commission. AGB August 2026 still states 15 % until a new legal text is supplied. */
export const SALES_COMMISSION_PERCENT = 17;
export const SALES_COMMISSION_BPS = 1700;

/**
 * Included services. Extra service fees stay as stated at booking.
 */
export const pricingNotes = {
  includes: [
    "Ein eigenes Regal im Second-Hand-Laden für den gewählten Zeitraum",
    "Verkauf und Kassenabwicklung übernimmt MiMa vor Ort",
    "Deine Verkäufe verfolgst du bequem über dein Online-Konto",
  ],
  disclaimer: `Mietpreise für 2 Wochen, 4 Wochen und 3 Monate. Zusätzlich behält MiMa ${SALES_COMMISSION_PERCENT} % vom Verkaufspreis als Provision.`,
};

export function getPlan(id: RentalPlanId): RentalPlan {
  const plan = rentalPlans.find((p) => p.id === id);
  if (!plan) {
    throw new Error(`Unbekannter Mietzeitraum: ${id}`);
  }
  return plan;
}
