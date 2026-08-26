import "server-only";

/**
 * Restrained server-side logging for integration events.
 *
 * SECURITY: Only safe, non-sensitive fields are logged. Never pass API keys,
 * authorization headers, full third-party payloads, or personal customer data
 * to these helpers. Keys are redacted defensively as a second line of defence.
 */

type LogStatus = "ok" | "error" | "warn";

interface IntegrationLogFields {
  operation: string;
  status: LogStatus;
  /** Optional non-sensitive correlation id (e.g. a generated request id). */
  requestId?: string;
  /** Optional coarse detail such as an error code or item count. */
  detail?: string | number;
}

const SENSITIVE_KEY = /(api[_-]?key|authorization|token|secret|password)/i;

function redact(value: string | number | undefined): string | number | undefined {
  if (typeof value !== "string") return value;
  return SENSITIVE_KEY.test(value) ? "[redacted]" : value;
}

export function logIntegration(fields: IntegrationLogFields): void {
  const entry = {
    ts: new Date().toISOString(),
    operation: fields.operation,
    status: fields.status,
    requestId: fields.requestId,
    detail: redact(fields.detail),
  };

  if (fields.status === "error") {
    console.error("[integration]", entry);
  } else if (fields.status === "warn") {
    console.warn("[integration]", entry);
  } else {
    console.info("[integration]", entry);
  }
}

/** Generates a short, non-sensitive request id for correlating logs. */
export function newRequestId(): string {
  return Math.random().toString(36).slice(2, 10);
}
