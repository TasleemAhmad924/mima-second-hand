import { mockProducts } from "@/data/products";
import type { Product, ProductRepository } from "@/lib/repositories/types";

/**
 * Mock product repository — client-safe (no secrets, no server-only imports).
 *
 * Backed by bundled placeholder data. A small artificial delay lets the UI
 * exercise its loading/empty states, matching real async behaviour.
 */
function delay<T>(value: T, ms = 550): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const mockProductRepository: ProductRepository = {
  getProducts: () => delay(mockProducts as Product[]),
};
