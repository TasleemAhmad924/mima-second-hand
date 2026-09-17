import { NextResponse } from "next/server";
import { getMarketplaceStatus } from "@/lib/marketplace/status.server";
import { effectiveDataSource } from "@/lib/env.server";
import { ok } from "@/lib/api/respond.server";

/**
 * GET /api/pladsly/status
 *
 * Read-only snapshot of integration mode and whether credentials exist.
 * Never returns keys, base URLs, or raw Pladsly payloads.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return ok(getMarketplaceStatus(), { source: effectiveDataSource() });
}

export function POST() {
  return NextResponse.json(
    { ok: false, error: "Methode nicht erlaubt." },
    { status: 405, headers: { Allow: "GET" } },
  );
}
