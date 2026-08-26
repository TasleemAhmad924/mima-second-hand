import "server-only";

import type { ProductRepository } from "@/lib/repositories/types";
import { fetchPladslyProducts } from "@/lib/pladsly/products.server";

/**
 * Pladsly-backed product repository (server-only).
 *
 * Delegates to the integration layer. Currently the underlying fetch is a stub
 * (endpoint unconfirmed), so calls throw a typed IntegrationError which the API
 * layer converts into a safe response.
 */
export const pladslyProductRepository: ProductRepository = {
  getProducts: () => fetchPladslyProducts(),
};
