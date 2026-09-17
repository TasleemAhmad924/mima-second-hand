export type DomainErrorCode =
  | "overlap"
  | "inactive_shelf"
  | "unknown_shelf"
  | "invalid_range"
  | "unknown_seller"
  | "forbidden"
  | "not_found";

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  readonly status: number;

  constructor(code: DomainErrorCode, message: string, status: number) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.status = status;
  }

  static overlap() {
    return new DomainError(
      "overlap",
      "Dieses Regal ist im gewählten Zeitraum bereits belegt.",
      409,
    );
  }

  static inactiveShelf() {
    return new DomainError(
      "inactive_shelf",
      "Dieses Regal kann derzeit nicht gebucht werden.",
      409,
    );
  }

  static unknownShelf() {
    return new DomainError("unknown_shelf", "Dieses Regal gibt es nicht.", 404);
  }

  static invalidRange() {
    return new DomainError(
      "invalid_range",
      "Der gewählte Zeitraum ist ungültig.",
      400,
    );
  }

  static forbidden() {
    return new DomainError(
      "forbidden",
      "Dieser Bereich gehört zu einem anderen Konto.",
      403,
    );
  }

  static notFound() {
    return new DomainError("not_found", "Der Eintrag wurde nicht gefunden.", 404);
  }
}

export function domainUserMessage(error: unknown): string {
  if (error instanceof DomainError) return error.message;
  return "Die Anfrage konnte nicht ausgeführt werden.";
}

export function domainStatus(error: unknown): number {
  if (error instanceof DomainError) return error.status;
  return 500;
}
