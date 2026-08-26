import { NextResponse, type NextRequest } from "next/server";
import { getShelfAvailabilityRepository } from "@/lib/repositories/index.server";
import { effectiveDataSource } from "@/lib/env.server";
import { availabilityQuerySchema } from "@/lib/validation/schemas";
import { ok, fail, failValidation } from "@/lib/api/respond.server";

/**
 * GET /api/pladsly/availability?startDate=YYYY-MM-DD&days=30
 *
 * Read-only, explicitly allowlisted action. Returns time-dependent shelf
 * availability (Pladsly-owned) as `{ shelfId, available }[]`. It deliberately
 * does NOT return floor-plan geometry — that is MiMa-owned and served with the
 * page. All query input is validated with Zod before use.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const operation = "api.availability";
  const params = request.nextUrl.searchParams;

  const parsed = availabilityQuerySchema.safeParse({
    startDate: params.get("startDate") ?? undefined,
    days: params.get("days") ?? undefined,
  });

  if (!parsed.success) {
    const first =
      parsed.error.issues[0]?.message ?? "Ungültige Anfrageparameter.";
    return failValidation(operation, first);
  }

  try {
    const repo = getShelfAvailabilityRepository();
    const availability = await repo.getAvailability(parsed.data);
    return ok(availability, { source: effectiveDataSource() });
  } catch (error) {
    return fail(operation, error);
  }
}

export function POST() {
  return NextResponse.json(
    { ok: false, error: "Methode nicht erlaubt." },
    { status: 405, headers: { Allow: "GET" } },
  );
}
