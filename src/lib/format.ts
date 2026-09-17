/** Formatting helpers shared across the site. */

const euroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatEuro(value: number): string {
  return euroFormatter.format(value);
}

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/** Formats an ISO date string (yyyy-mm-dd) as a German long date. */
export function formatGermanDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  return dateFormatter.format(new Date(year, month - 1, day));
}

/** Digits (and a leading +) from a display phone number. */
export function toTelNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/** Builds a `tel:` href from a display phone number. */
export function toTelHref(phone: string): string {
  return `tel:${toTelNumber(phone)}`;
}

/** Today's date as yyyy-mm-dd in the store timezone (Europe/Berlin). */
export function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
