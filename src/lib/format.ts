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

/** Today's date as an ISO yyyy-mm-dd string, in local time. */
export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}
