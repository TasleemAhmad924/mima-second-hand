/**
 * Integration error taxonomy.
 *
 * These errors are safe to construct anywhere, but their `message` is for
 * server-side logs only. User-facing text is produced separately (in German)
 * by the API layer via `userMessage`. Raw third-party responses and stack
 * traces must never be sent to the browser.
 */

export type IntegrationErrorCode =
  | "not_configured"
  | "not_implemented"
  | "unavailable"
  | "timeout"
  | "rate_limited"
  | "malformed_response"
  | "invalid_input"
  | "not_found";

export class IntegrationError extends Error {
  readonly code: IntegrationErrorCode;
  /** Suggested HTTP status for API responses. */
  readonly status: number;

  constructor(code: IntegrationErrorCode, message: string, status: number) {
    super(message);
    this.name = "IntegrationError";
    this.code = code;
    this.status = status;
  }

  static notConfigured(op: string) {
    return new IntegrationError(
      "not_configured",
      `Pladsly integration not configured for operation: ${op}`,
      503,
    );
  }

  static notImplemented(op: string) {
    return new IntegrationError(
      "not_implemented",
      `Pladsly operation not implemented yet: ${op}`,
      501,
    );
  }

  static unavailable(op: string) {
    return new IntegrationError(
      "unavailable",
      `Pladsly unavailable for operation: ${op}`,
      502,
    );
  }

  static timeout(op: string) {
    return new IntegrationError("timeout", `Pladsly timeout for: ${op}`, 504);
  }

  static rateLimited(op: string) {
    return new IntegrationError(
      "rate_limited",
      `Pladsly rate limit for: ${op}`,
      429,
    );
  }

  static malformed(op: string) {
    return new IntegrationError(
      "malformed_response",
      `Malformed Pladsly response for: ${op}`,
      502,
    );
  }

  static invalidInput(detail: string) {
    return new IntegrationError("invalid_input", `Invalid input: ${detail}`, 400);
  }

  static notFound(op: string) {
    return new IntegrationError("not_found", `Not found: ${op}`, 404);
  }
}

/**
 * Maps any thrown value to a safe, user-facing German message. Never leaks the
 * underlying error text.
 */
export function userMessageFor(error: unknown): string {
  const code =
    error instanceof IntegrationError ? error.code : "unavailable";

  switch (code) {
    case "invalid_input":
      return "Die Angaben sind ungültig. Bitte prüfe deine Eingabe.";
    case "not_found":
      return "Das Gesuchte wurde nicht gefunden.";
    case "rate_limited":
      return "Gerade sind viele Anfragen unterwegs. Bitte versuche es in Kürze erneut.";
    case "not_configured":
    case "not_implemented":
    case "timeout":
    case "unavailable":
    case "malformed_response":
    default:
      return "Der Dienst ist momentan nicht erreichbar. Bitte versuche es später erneut.";
  }
}

export function statusFor(error: unknown): number {
  return error instanceof IntegrationError ? error.status : 502;
}
