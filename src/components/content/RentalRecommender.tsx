"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { formatEuro } from "@/lib/format";
import {
  recommendRental,
  type DurationIntent,
  type VolumeIntent,
} from "@/lib/rental-recommender";
import { EASE_OUT } from "@/lib/motion";

const durations: { id: DurationIntent; label: string }[] = [
  { id: "up-to-2-weeks", label: "bis 2 Wochen" },
  { id: "about-4-weeks", label: "etwa 3 bis 4 Wochen" },
  { id: "several-weeks", label: "mehrere Wochen" },
  { id: "up-to-3-months", label: "langfristig, bis 3 Monate" },
];

const volumes: { id: VolumeIntent; label: string }[] = [
  { id: "few", label: "wenige Teile" },
  { id: "some", label: "eine Auswahl" },
  { id: "many", label: "viele Teile" },
];

function Choice({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`min-h-11 border px-4 py-2 text-left text-sm leading-snug transition-colors duration-300 [transition-timing-function:var(--ease-inout)] ${
        selected
          ? "border-charcoal bg-charcoal text-warm"
          : "border-line-strong text-charcoal hover:border-charcoal"
      }`}
    >
      {children}
    </button>
  );
}

export function RentalRecommender() {
  const [duration, setDuration] = useState<DurationIntent>("about-4-weeks");
  const [volume, setVolume] = useState<VolumeIntent>("some");
  const reduce = useReducedMotion();
  const result = useMemo(
    () => recommendRental(duration, volume),
    [duration, volume],
  );

  return (
    <div>
      <h2 className="headline max-w-xl text-charcoal">
        Welches Mietmodell passt zu dir?
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Keine Gewinnrechnung. Nur eine Einschätzung, welcher Zeitraum zu deinem
        Vorhaben passt.
      </p>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="text-sm font-medium text-charcoal">
          Wie lange möchtest du ungefähr verkaufen?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {durations.map((option) => (
            <Choice
              key={option.id}
              selected={duration === option.id}
              onSelect={() => setDuration(option.id)}
            >
              {option.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7 border-0 p-0">
        <legend className="text-sm font-medium text-charcoal">
          Wie viele Teile möchtest du ungefähr anbieten?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {volumes.map((option) => (
            <Choice
              key={option.id}
              selected={volume === option.id}
              onSelect={() => setVolume(option.id)}
            >
              {option.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 border-t border-charcoal pt-6" aria-live="polite">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
          Für dich passt wahrscheinlich
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={result.plan.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <p className="mt-2 font-display text-[1.7rem] leading-tight text-charcoal sm:text-[2.05rem]">
              {result.plan.name}
              <span className="text-taupe-ink">
                {" "}
                {formatEuro(result.plan.price)}
              </span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {result.reason}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
