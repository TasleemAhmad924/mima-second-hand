import "server-only";

import type { Product, ProductCategory } from "@/types";
import type { PladslyProductDTO } from "@/lib/pladsly/types";
import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Product integration (server-only).
 *
 * The mapping adapter below is implemented and unit-tested. The network fetch
 * is intentionally NOT implemented because the official Pladsly product
 * endpoint, pagination and field names are not yet confirmed. Implementing an
 * undocumented endpoint is out of scope (see docs/pladsly-integration.md).
 */

const CATEGORY_MAP: Record<string, ProductCategory> = {
  mode: "mode",
  fashion: "mode",
  kleidung: "mode",
  accessoires: "accessoires",
  accessories: "accessoires",
  wohnen: "wohnen",
  home: "wohnen",
  buecher: "buecher",
  "bücher": "buecher",
  books: "buecher",
};

function toCategory(raw: string | undefined): ProductCategory {
  if (!raw) return "mode";
  return CATEGORY_MAP[raw.trim().toLowerCase()] ?? "mode";
}

/**
 * Adapts a raw Pladsly product DTO into the app's UI `Product`. Pure and
 * testable. Applies safe defaults for fields the UI needs but the DTO may not
 * provide. Throws if the DTO lacks the minimum required identity fields.
 */
export function mapPladslyProduct(dto: PladslyProductDTO): Product {
  if (!dto || typeof dto.id !== "string" || typeof dto.title !== "string") {
    throw IntegrationError.malformed("products.map");
  }

  const detailParts: string[] = [];
  if (dto.size) detailParts.push(`Gr. ${dto.size}`);
  if (typeof dto.available === "boolean") {
    detailParts.push(dto.available ? "verfügbar" : "verkauft");
  }

  return {
    id: dto.id,
    title: dto.title,
    category: toCategory(dto.category),
    detail: detailParts.join(" · "),
    image: dto.imageUrl?.trim() ? dto.imageUrl : "/images/product-trench.jpg",
    ratio: "portrait",
    alt: dto.title,
  };
}

/** Maps a list of DTOs, skipping malformed entries defensively. */
export function mapPladslyProducts(dtos: unknown): Product[] {
  if (!Array.isArray(dtos)) {
    throw IntegrationError.malformed("products.mapList");
  }
  const products: Product[] = [];
  for (const dto of dtos) {
    try {
      products.push(mapPladslyProduct(dto as PladslyProductDTO));
    } catch {
      // Skip malformed items rather than failing the whole catalogue.
    }
  }
  return products;
}

/**
 * Fetches the live product catalogue from Pladsly.
 * NOT YET IMPLEMENTED — the endpoint contract is unconfirmed.
 */
export async function fetchPladslyProducts(): Promise<Product[]> {
  // When the API is confirmed, call the client here, e.g.:
  //   const raw = await pladslyRequest<PladslyProductDTO[]>({
  //     operation: "products.list", path: "/products",
  //   });
  //   return mapPladslyProducts(raw);
  throw IntegrationError.notImplemented("products.list");
}
