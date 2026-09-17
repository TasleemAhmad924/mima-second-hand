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
          <div className="group flex items-baseline justify-between gap-5 border-b border-line py-5 sm:gap-8 sm:py-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-[1.35rem] text-charcoal transition-colors duration-300 [transition-timing-function:var(--ease-inout)] group-hover:text-taupe-ink sm:text-[1.7rem]">
                  {plan.name}
                </h3>
                {plan.recommended ? (
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-taupe-ink">
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
            <div className="shrink-0 text-right">
              <span className="font-display text-[1.35rem] tabular-nums text-charcoal transition-colors duration-300 [transition-timing-function:var(--ease-inout)] group-hover:text-taupe-ink sm:text-[1.7rem]">
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
