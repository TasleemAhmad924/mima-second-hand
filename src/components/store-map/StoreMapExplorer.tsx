"use client";

import { useMemo, useState } from "react";
import { STORE_LAYOUT } from "@/data/store-layout";
import { StoreMap } from "@/components/store-map/StoreMap";

const AREA_CHIPS = [
  { id: "zone-mitte", label: "Mittelgänge" },
  { id: "zone-wand", label: "Wandregale" },
  { id: "zone-sued", label: "Südseite" },
  { id: "fixture-kitchen", label: "Küche" },
  { id: "fixture-wc", label: "WC" },
  { id: "fixture-fitting", label: "Umkleide" },
  { id: "fixture-play", label: "Spielecke" },
] as const;

export function StoreMapExplorer() {
  const [focusId, setFocusId] = useState<string | null>("zone-mitte");

  const caption = useMemo(() => {
    if (!focusId) {
      return "Der Grundriss folgt dem Ladenplan. Er zeigt den Raum, nicht die Buchung.";
    }
    const zone = STORE_LAYOUT.zones.find((item) => item.id === focusId);
    if (zone) return zone.description;
    const fixture = STORE_LAYOUT.fixtures.find((item) => item.id === focusId);
    if (fixture?.kind === "kitchen") {
      return "Küche im nordöstlichen Anbau, durch Wände vom Verkaufsraum getrennt.";
    }
    if (fixture?.kind === "wc") {
      return "WC unter der Küche, mit eigener Wand zum Verkaufsraum.";
    }
    if (fixture?.kind === "fitting") {
      return "Umkleide in der Nische südlich des WC, an der Ostwand.";
    }
    if (fixture?.kind === "play") {
      return "Spielecke in der südwestlichen Ecke.";
    }
    return "Der Grundriss folgt dem Ladenplan. Er zeigt den Raum, nicht die Buchung.";
  }, [focusId]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="list" aria-label="Ladenbereiche">
        {AREA_CHIPS.map((chip) => {
          const active = focusId === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFocusId(chip.id)}
              aria-pressed={active}
              className={`min-h-11 px-3 text-[0.7rem] font-medium uppercase tracking-[0.14em] ${
                active
                  ? "bg-charcoal text-warm"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{caption}</p>

      <p className="mt-6 text-[0.65rem] uppercase tracking-[0.14em] text-muted lg:hidden">
        Ziehen, um den Grundriss zu erkunden
      </p>

      <div className="mt-3 overflow-auto overscroll-contain border border-line bg-cream/50">
        <div className="mx-auto min-w-[40rem] max-w-[56rem] p-4 sm:min-w-0 sm:p-8 xl:max-w-[62rem]">
          <StoreMap focusId={focusId} onFocus={setFocusId} />
        </div>
      </div>
    </div>
  );
}
