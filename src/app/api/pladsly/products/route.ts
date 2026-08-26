import { NextResponse } from "next/server";
import { getProductRepository } from "@/lib/repositories/index.server";
import { effectiveDataSource } from "@/lib/env.server";
import { ok, fail } from "@/lib/api/respond.server";

/**
 * GET /api/pladsly/products
 *
 * Read-only, explicitly allowlisted action (NOT a transparent proxy). Returns
 * the product catalogue in the UI shape via the repository abstraction. Serves
 * mock data unless DATA_SOURCE=pladsly and credentials are configured.
 *
 * Exposes only the minimum fields the frontend needs; no Pladsly internals,
 * credentials or raw responses are ever returned.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const operation = "api.products.list";
  try {
    const repo = getProductRepository();
    const products = await repo.getProducts();
    return ok(products, { source: effectiveDataSource() });
  } catch (error) {
    return fail(operation, error);
  }
}

/** Only GET is allowed on this resource. */
export function POST() {
  return NextResponse.json(
    { ok: false, error: "Methode nicht erlaubt." },
    { status: 405, headers: { Allow: "GET" } },
  );
}
