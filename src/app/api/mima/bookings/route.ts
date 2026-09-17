import { NextResponse, type NextRequest } from "next/server";
import { getOperationsProvider } from "@/lib/operations/index.server";
import { ok, fail, failValidation } from "@/lib/api/respond.server";
import { domainUserMessage, domainStatus, DomainError } from "@/lib/mima/errors";
import { mimaBookingBodySchema } from "@/lib/validation/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Prototype hold only. Disabled unless MIMA_NATIVE_BOOKING=true.
 * Does not collect payment and must not be treated as a confirmed rental.
 */
export async function POST(request: NextRequest) {
  const operation = "api.mima.bookings";
  if (process.env.MIMA_NATIVE_BOOKING !== "true") {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Native Buchungen sind noch nicht freigeschaltet. Bitte den Pladsly-Buchungsassistenten nutzen.",
      },
      { status: 403, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return failValidation(operation, "Ungültiger JSON-Körper.");
  }

  const parsed = mimaBookingBodySchema.safeParse(body);
  if (!parsed.success) {
    const first =
      parsed.error.issues[0]?.message ?? "Ungültige Anfrageparameter.";
    return failValidation(operation, first);
  }

  try {
    const provider = getOperationsProvider();
    const seller = await provider.ensureSeller({
      email: parsed.data.email,
      displayName: parsed.data.name,
    });
    const booking = await provider.createBooking({
      sellerId: seller.id,
      shelfId: parsed.data.shelfId,
      planId: parsed.data.planId,
      startDate: parsed.data.startDate,
    });
    return ok(
      { booking, note: "pending_payment – keine Zahlungsbestätigung." },
      { source: "native", live: false },
    );
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { ok: false, error: domainUserMessage(error) },
        { status: domainStatus(error), headers: { "Cache-Control": "no-store" } },
      );
    }
    return fail(operation, error);
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Methode nicht erlaubt." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
