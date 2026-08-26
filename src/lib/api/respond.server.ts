import "server-only";

import { NextResponse } from "next/server";
import { userMessageFor, statusFor } from "@/lib/pladsly/errors";
import { logIntegration, newRequestId } from "@/lib/logger.server";

/**
 * Consistent, safe API responses.
 *
 * Success and error payloads share a small, predictable envelope. Errors expose
 * ONLY a safe German message and a stable code — never raw third-party
 * responses, stack traces, or credentials. Technical detail is logged
 * server-side with a correlation id.
 */

interface Meta {
  source: "mock" | "pladsly";
}

export function ok<T>(data: T, meta: Meta) {
  return NextResponse.json(
    { ok: true, data, meta },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export function fail(operation: string, error: unknown) {
  const requestId = newRequestId();
  const status = statusFor(error);
  logIntegration({
    operation,
    status: "error",
    requestId,
    detail: error instanceof Error ? error.name : "unknown",
  });
  return NextResponse.json(
    { ok: false, error: userMessageFor(error), requestId },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function failValidation(operation: string, message: string) {
  const requestId = newRequestId();
  logIntegration({ operation, status: "warn", requestId, detail: "invalid_input" });
  return NextResponse.json(
    { ok: false, error: message, requestId },
    { status: 400, headers: { "Cache-Control": "no-store" } },
  );
}
