"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { publicBooking } from "@/config/booking";
import { siteConfig } from "@/config/site";
import { EASE_OUT } from "@/lib/motion";

interface BookingCtaProps {
  className?: string;
  /** `link` sends visitors to the rental page coming-soon section. */
  mode?: "panel" | "link";
  onNavigate?: () => void;
}

/**
 * Public booking control. When `publicBooking.isOpen` is true this hands off
 * to Pladsly. Until then it is a complete, non-broken coming-soon action.
 */
export function BookingCta({
  className = "",
  mode = "panel",
  onNavigate,
}: BookingCtaProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = useReducedMotion();

  if (publicBooking.isOpen) {
    return (
      <Button
        href={siteConfig.external.bookingUrl}
        external
        className={`whitespace-nowrap ${className}`}
        onClick={onNavigate}
      >
        Buchung starten
      </Button>
    );
  }

  if (mode === "link") {
    return (
      <Button href={publicBooking.href} className={`whitespace-nowrap ${className}`} onClick={onNavigate}>
        {publicBooking.ctaLabel}
      </Button>
    );
  }

  return (
    <div className={className}>
      <Button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full whitespace-nowrap sm:w-auto"
        onClick={() => setOpen((value) => !value)}
      >
        {publicBooking.ctaLabel}
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mt-4 max-w-sm border-t border-line pt-4"
          >
            <p className="font-display text-lg text-charcoal">
              {publicBooking.statement}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {publicBooking.support} Es gibt bereits viele Anmeldungen. Wir
              geben Bescheid, sobald du ein Regal verbindlich nehmen kannst.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
