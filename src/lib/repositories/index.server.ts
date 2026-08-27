import "server-only";

import { effectiveDataSource } from "@/lib/env.server";
import type {
  ProductRepository,
  ShelfAvailabilityRepository,
} from "@/lib/repositories/types";
import { mockProductRepository } from "@/lib/repositories/mock-product-repository";
import { mockShelfAvailabilityRepository } from "@/lib/repositories/mock-shelf-availability-repository";
import { pladslyProductRepository } from "@/lib/repositories/pladsly-product-repository.server";
import { pladslyShelfAvailabilityRepository } from "@/lib/repositories/pladsly-shelf-availability-repository.server";

/**
 * Server-side repository resolver.
 *
 * Chooses the mock or Pladsly-backed implementation based on the effective data
 * source (PLADSLY_INTEGRATION_MODE + whether credentials are configured). Runs only on
 * the server; client components must never import this module.
 */
export function getProductRepository(): ProductRepository {
  return effectiveDataSource() === "pladsly"
    ? pladslyProductRepository
    : mockProductRepository;
}

export function getShelfAvailabilityRepository(): ShelfAvailabilityRepository {
  return effectiveDataSource() === "pladsly"
    ? pladslyShelfAvailabilityRepository
    : mockShelfAvailabilityRepository;
}
