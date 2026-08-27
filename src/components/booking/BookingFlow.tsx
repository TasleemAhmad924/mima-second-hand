"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getPlan, type RentalPlanId } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { booking } from "@/lib/pladsly";
import { track, AnalyticsEvent } from "@/lib/analytics";
import { todayIso, formatEuro } from "@/lib/format";
import type { Shelf } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { DateStep } from "@/components/booking/DateStep";
import { DurationStep } from "@/components/booking/DurationStep";
import { FloorPlan } from "@/components/booking/FloorPlan";
import { ShelfLegend } from "@/components/booking/ShelfLegend";
import { BookingSummary } from "@/components/booking/BookingSummary";

function Step({
  number,
  title,
  children,
  id,
}: {
  number: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-lg leading-none text-taupe">
          {number}
        </span>
        <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-charcoal">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function BookingFlow() {
  const minDate = todayIso();
  const [startDate, setStartDate] = useState(minDate);
  const [planId, setPlanId] = useState<RentalPlanId>("monat-1");
  const [shelfId, setShelfId] = useState<string | null>(null);
  const [shelves, setShelves] = useState<Shelf[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    booking
      .getShelves({ startDate, days: getPlan(planId).days })
      .then((result) => {
        if (active) setShelves(result);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
    // Mock availability is static; a real provider would refetch on change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const availableCount =
    shelves?.filter((shelf) => shelf.status === "available").length ?? 0;
  const complete = Boolean(shelfId);
  const plan = getPlan(planId);
  const onBookingHandoff = () => track(AnalyticsEvent.BookingHandoff);

  return (
    <div className="grid grid-cols-1 gap-14 pb-20 lg:grid-cols-12 lg:gap-16 lg:pb-0">
      <div className="lg:col-span-12">
        <div className="flex flex-col gap-4 rounded-[var(--radius-sm)] border border-line bg-cream/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            <span className="font-medium text-charcoal">Vorschau.</span> Die hier
            gezeigte Belegung sind Beispieldaten und noch nicht live. Deine
            verbindliche Buchung – mit echter Verfügbarkeit und Zahlung – schließt
            du beim Buchungsassistenten unseres Partners Pladsly ab.
          </p>
          <ArrowLink
            href={siteConfig.external.bookingUrl}
            external
            onClick={onBookingHandoff}
            className="shrink-0"
          >
            Zum Buchungsassistenten
          </ArrowLink>
        </div>
      </div>

      <div className="flex flex-col gap-14 lg:col-span-7">
        <Step number="01" title="Startdatum wählen">
          <DateStep value={startDate} min={minDate} onChange={setStartDate} />
        </Step>

        <Step number="02" title="Mietdauer wählen">
          <DurationStep value={planId} onChange={setPlanId} />
        </Step>

        <Step number="03" title="Regal wählen" id="regal">
          {loadError ? (
            <div className="py-10">
              <p className="font-display text-xl text-charcoal">
                Die Belegungs-Vorschau konnte nicht geladen werden.
              </p>
              <p className="mt-2 max-w-md text-sm text-muted">
                Das ist nur die Vorschau – deine Buchung kannst du jederzeit
                direkt beim Buchungsassistenten abschließen.
              </p>
              <div className="mt-5">
                <ArrowLink
                  href={siteConfig.external.bookingUrl}
                  external
                  onClick={onBookingHandoff}
                >
                  Zum Buchungsassistenten
                </ArrowLink>
              </div>
            </div>
          ) : shelves === null ? (
            <div>
              <Skeleton className="aspect-[3/2] w-full min-w-[280px]" />
              <p className="mt-4 text-sm text-muted">Regale werden geladen …</p>
            </div>
          ) : availableCount === 0 ? (
            <div className="py-10">
              <p className="font-display text-xl text-charcoal">
                Für diesen Zeitraum ist gerade kein Regal frei.
              </p>
              <p className="mt-2 max-w-md text-sm text-muted">
                Wähle ein anderes Startdatum oder eine andere Mietdauer, oder
                schau später noch einmal vorbei.
              </p>
            </div>
          ) : (
            <div>
              <FloorPlan
                shelves={shelves}
                selectedId={shelfId}
                onSelect={setShelfId}
              />
              <div className="mt-5">
                <ShelfLegend />
              </div>
              <p className="mt-4 text-sm text-muted" aria-live="polite">
                {shelfId
                  ? `Ausgewählt: Regal ${shelfId}`
                  : "Tippe ein freies Regal an, um es auszuwählen."}
              </p>
            </div>
          )}
        </Step>
      </div>

      <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="lg:sticky lg:top-28">
          <BookingSummary
            startDate={startDate}
            planId={planId}
            shelfId={shelfId}
            onBook={onBookingHandoff}
          />
        </div>
      </aside>

      {/* Compact mobile summary + restrained sticky CTA */}
      <div className="lg:hidden">
        <BookingSummary
          startDate={startDate}
          planId={planId}
          shelfId={shelfId}
          onBook={onBookingHandoff}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-warm px-5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto flex max-w-[82rem] items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-display text-base text-charcoal">
              {formatEuro(plan.price)}
            </span>
            <span className="ml-2 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
              {shelfId ? `Regal ${shelfId}` : plan.name}
            </span>
          </div>
          {complete ? (
            <Button
              href={siteConfig.external.bookingUrl}
              external
              onClick={onBookingHandoff}
            >
              Weiter
            </Button>
          ) : (
            <a
              href="#regal"
              className="inline-flex min-h-10 items-center justify-center px-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-charcoal"
            >
              Regal wählen
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
