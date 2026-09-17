import { getPlan, type RentalPlanId } from "@/config/pricing";
import { publicBooking } from "@/config/booking";
import { siteConfig } from "@/config/site";
import { lastDayFor } from "@/lib/booking";
import { formatEuro, formatGermanDate } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface BookingSummaryProps {
  startDate: string;
  planId: RentalPlanId;
  shelfId: string | null;
  /** Fired when the user is handed off to the Pladsly booking assistant. */
  onBook?: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm text-charcoal">{value}</dd>
    </div>
  );
}

export function BookingSummary({
  startDate,
  planId,
  shelfId,
  onBook,
}: BookingSummaryProps) {
  const plan = getPlan(planId);
  const endDate = lastDayFor(startDate, planId);
  const complete = Boolean(shelfId);

  return (
    <div className="border-t border-charcoal pt-6">
      <p className="eyebrow">Deine Auswahl</p>

      <dl className="mt-5 divide-y divide-line">
        <Row label="Regal" value={shelfId ?? "Noch nicht gewählt"} />
        <Row label="Start" value={formatGermanDate(startDate)} />
        <Row label="Ende" value={formatGermanDate(endDate)} />
        <Row label="Mietdauer" value={plan.name} />
        <div className="flex items-baseline justify-between gap-4 pt-4">
          <dt className="text-sm text-muted">Preis</dt>
          <dd className="font-display text-[1.65rem] leading-none tabular-nums text-charcoal">
            {formatEuro(plan.price)}
          </dd>
        </div>
      </dl>

      <div className="mt-7">
        {publicBooking.isOpen ? (
          complete ? (
            <Button
              href={siteConfig.external.bookingUrl}
              external
              className="w-full"
              onClick={onBook}
            >
              Weiter zur Buchung
            </Button>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-sm)] border border-line-strong px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted"
            >
              Buchung starten
            </button>
          )
        ) : (
          <p className="text-sm leading-relaxed text-muted">
            {publicBooking.statement} {publicBooking.support}
          </p>
        )}
      </div>

      {publicBooking.isOpen ? (
        <>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Buchung, Konto und Zahlung schließt du sicher bei unserem Partner
            Pladsly ab.
          </p>
          <div className="mt-4">
            <ArrowLink
              href={siteConfig.external.bookingUrl}
              external
              onClick={onBook}
            >
              Direkt beim Buchungsassistenten buchen
            </ArrowLink>
          </div>
        </>
      ) : null}
    </div>
  );
}
