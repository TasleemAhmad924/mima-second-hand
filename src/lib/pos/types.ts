/**
 * POS integration boundary.
 *
 * MiMa already plans to use a physical register (today: Zettle via Pladsly).
 * Do not invent an API. A future provider implements this once a contract exists.
 *
 * Expected later flow:
 *   product barcode → POS scan → sale event → MiMa Sale row
 */

export interface PosSaleEvent {
  externalId: string;
  barcode: string;
  amountCents: number;
  soldAt: string;
  paymentMethod: "cash" | "card" | "other";
}

export interface PosProvider {
  readonly id: string;
  /** Pull or receive a documented sale event. Not implemented. */
  fetchSale?(externalId: string): Promise<PosSaleEvent>;
}

export const posBoundaryNote =
  "POS ingest waits on a documented provider contract. MiMa does not scrape or guess endpoints.";
