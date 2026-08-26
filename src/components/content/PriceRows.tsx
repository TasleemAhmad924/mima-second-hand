import { rentalPlans } from "@/config/pricing";
import { formatEuro } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

interface PriceRowsProps {
  /** Show the per-plan note line under each duration. */
  showNotes?: boolean;
}

/**
 * Editorial, typography-led pricing presentation — comparison rows rather than
 * three identical pricing cards. Prices come from the central config.
 */
export function PriceRows({ showNotes = true }: PriceRowsProps) {
  return (
    <div className="border-t border-line">
      {rentalPlans.map((plan, index) => (
        <Reveal key={plan.id} delay={index * 0.06}>
          <div className="group flex items-baseline justify-between gap-5 border-b border-line py-6 transition-colors duration-300 [transition-timing-function:var(--ease-inout)] sm:gap-6 sm:py-7 hover:bg-cream/40">
            <div className="min-w-0 pl-0 transition-[padding] duration-300 [transition-timing-function:var(--ease-inout)] sm:group-hover:pl-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-[1.45rem] text-charcoal sm:text-[1.85rem]">
                  {plan.name}
                </h3>
                {plan.recommended ? (
                  <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-taupe-ink">
                    Beliebt
                  </span>
                ) : null}
              </div>
              {showNotes ? (
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                  {plan.note}
                </p>
              ) : null}
            </div>
            <div className="shrink-0 pr-0 text-right transition-[padding] duration-300 [transition-timing-function:var(--ease-inout)] sm:group-hover:pr-2">
              <span className="font-display text-[1.45rem] tabular-nums text-charcoal sm:text-[1.85rem]">
                {formatEuro(plan.price)}
              </span>
              <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                gesamt
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
