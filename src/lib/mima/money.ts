/**
 * Money is integer euro cents. Commission is basis points (1% = 100 bps).
 * The rate comes from store settings, never from a hardcoded business rule.
 */

export interface SaleSplit {
  grossCents: number;
  feeCents: number;
  sellerCents: number;
}

export function splitSale(
  grossCents: number,
  commissionBps: number,
): SaleSplit {
  if (!Number.isInteger(grossCents) || grossCents < 0) {
    throw new Error("grossCents must be a non-negative integer.");
  }
  if (!Number.isInteger(commissionBps) || commissionBps < 0 || commissionBps > 10_000) {
    throw new Error("commissionBps must be an integer from 0 to 10000.");
  }
  const feeCents = Math.round((grossCents * commissionBps) / 10_000);
  return {
    grossCents,
    feeCents,
    sellerCents: grossCents - feeCents,
  };
}

export function sellerRevenueCents(
  sales: readonly { sellerCents: number }[],
): number {
  return sales.reduce((sum, sale) => sum + sale.sellerCents, 0);
}

export function payoutableCents(
  sales: readonly { sellerCents: number }[],
  payouts: readonly { amountCents: number; status: string }[],
): number {
  const paidOut = payouts
    .filter((payout) => payout.status === "completed" || payout.status === "approved")
    .reduce((sum, payout) => sum + payout.amountCents, 0);
  return sellerRevenueCents(sales) - paidOut;
}

export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}
