import type { IsoDate } from "@/lib/mima/types";

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseIsoDate(iso: IsoDate): Date {
  const match = ISO.exec(iso);
  if (!match) {
    throw new Error(`Ungültiges Datum: ${iso}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error(`Ungültiges Datum: ${iso}`);
  }
  return date;
}

export function toIsoDate(date: Date): IsoDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: IsoDate, days: number): IsoDate {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/**
 * Add calendar months, clamping to the last day of the target month
 * (31 Jan + 1 month → 28/29 Feb).
 */
export function addCalendarMonths(iso: IsoDate, months: number): IsoDate {
  const date = parseIsoDate(iso);
  const day = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, last));
  return toIsoDate(date);
}

export function lastOccupiedDay(exclusiveEnd: IsoDate): IsoDate {
  return addDays(exclusiveEnd, -1);
}
