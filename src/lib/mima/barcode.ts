import type { ProductRecord } from "@/lib/mima/types";

const DEFAULT_PREFIX = "MM";

export function formatBarcode(sequence: number, prefix = DEFAULT_PREFIX): string {
  if (!Number.isInteger(sequence) || sequence < 1) {
    throw new Error("Barcode sequence must be a positive integer.");
  }
  return `${prefix}-${String(sequence).padStart(6, "0")}`;
}

export function parseBarcode(
  code: string,
  prefix = DEFAULT_PREFIX,
): number | null {
  const match = new RegExp(`^${prefix}-(\\d{6})$`).exec(code.trim());
  if (!match) return null;
  return Number(match[1]);
}

export function nextBarcode(
  existing: readonly string[],
  prefix = DEFAULT_PREFIX,
): string {
  let max = 0;
  for (const code of existing) {
    const parsed = parseBarcode(code, prefix);
    if (parsed && parsed > max) max = parsed;
  }
  return formatBarcode(max + 1, prefix);
}

export interface BarcodeResolution {
  product: ProductRecord;
  sellerId: string;
  shelfId: string | null;
  priceCents: number;
}

export function resolveBarcode(
  code: string,
  products: readonly ProductRecord[],
): BarcodeResolution | null {
  const product = products.find((item) => item.barcode === code);
  if (!product) return null;
  return {
    product,
    sellerId: product.sellerId,
    shelfId: product.shelfId,
    priceCents: product.priceCents,
  };
}
