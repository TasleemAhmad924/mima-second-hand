"use client";

import { PriceRows } from "@/components/content/PriceRows";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { RentalRecommender } from "@/components/content/RentalRecommender";
import { StoreMapExplorer } from "@/components/store-map/StoreMapExplorer";
import { BookingCta } from "@/components/booking/BookingCta";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { sellerSteps } from "@/data/process";
import { pricingNotes } from "@/config/pricing";
import { publicBooking } from "@/config/booking";
import { STANDARD_SHELF_TYPE } from "@/data/store-layout";

export function RentalExperience() {
  const shelf = STANDARD_SHELF_TYPE;

  return (
    <div className="flex flex-col gap-12 pb-8 sm:gap-16 lg:gap-24">
      <div
        id="buchung"
        className="grid scroll-mt-28 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-7">
          <p className="eyebrow">Das Prinzip</p>
          <h2 className="headline mt-4 text-charcoal">Ein Regal im Laden.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Du wählst Zeitraum und Mietdauer. Die passende Regalfläche wird
            später im Buchungsprozess zugeordnet. MiMa übernimmt Verkauf und
            Kasse vor Ort.
          </p>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-charcoal pt-6">
            <p className="eyebrow">Buchung</p>
            <p className="mt-4 font-display text-xl text-charcoal">
              {publicBooking.statement}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {publicBooking.support}
            </p>
            <div className="mt-6">
              <BookingCta />
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <RevealMedia
            src="/images/shelf-open.png"
            alt="Offenes Holzregal, wie es bei MiMa im Second-Hand-Laden steht."
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="mx-auto aspect-[4/5] w-full max-w-md bg-warm sm:max-w-none sm:aspect-[5/6]"
            objectPosition="center"
            objectFit="contain"
            zoom={false}
          />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow">Das Regal</p>
          <h2 className="headline mt-4 text-charcoal">Offenes Holz, klarer Grundriss.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Die Mietregale sind offene Holzregale. Oben eine Stange, darunter
            zwei Fachböden. Maße circa {shelf.widthCm} × {shelf.depthCm} ×{" "}
            {shelf.heightCm} cm (Breite, Tiefe, Höhe).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Preise</p>
          <h2 className="headline mt-4 text-charcoal">Drei Zeiträume.</h2>
          <div className="mt-8">
            <PriceRows />
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            {pricingNotes.disclaimer}{" "}
            <a href="/agb/" className="link-underline text-charcoal">
              AGB
            </a>
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-charcoal">Im Preis enthalten</p>
          <ul className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            {pricingNotes.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-3 h-px w-4 shrink-0 bg-taupe"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RentalRecommender />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Der Laden</p>
          <h2 className="headline mt-3 text-charcoal">So ist MiMa aufgebaut.</h2>
          <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-pretty text-muted">
            Der Plan zeigt, wie der Laden grob organisiert ist. Vier
            Mittelgänge, Wandregale, Küche, WC, Umkleide und Spielecke. Er
            gibt Orientierung. Ein bestimmtes Regal wählst du hier nicht aus.
          </p>
        </div>
        <div className="lg:col-span-7">
          <StoreMapExplorer />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Ablauf</p>
          <h2 className="headline mt-4 text-charcoal">Vier Schritte.</h2>
          <div className="mt-8">
            <ProcessSteps steps={sellerSteps} variant="detail" />
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-charcoal pt-6 lg:sticky lg:top-28">
            <p className="eyebrow">Bald soweit</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {publicBooking.support}
            </p>
            <div className="mt-6">
              <BookingCta />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
