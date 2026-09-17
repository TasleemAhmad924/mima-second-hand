import { NextResponse, type NextRequest } from "next/server";
import { rangeForPlan } from "@/lib/mima/booking-rules";
import { getOperationsProvider } from "@/lib/operations/index.server";
import { ok, fail, failValidation } from "@/lib/api/respond.server";
import { mimaAvailabilityQuerySchema } from "@/lib/validation/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const operation = "api.mima.availability";
  const params = request.nextUrl.searchParams;
  const parsed = mimaAvailabilityQuerySchema.safeParse({
    startDate: params.get("startDate") ?? undefined,
    planId: params.get("planId") ?? undefined,
  });

  if (!parsed.success) {
    const first =
      parsed.error.issues[0]?.message ?? "Ungültige Anfrageparameter.";
    return failValidation(operation, first);
  }

  try {
    const range = rangeForPlan(parsed.data.startDate, parsed.data.planId);
    const result = await getOperationsProvider().getAvailability(range);
    return ok(result, { source: result.provider === "pladsly" ? "pladsly" : "native", live: result.live });
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
