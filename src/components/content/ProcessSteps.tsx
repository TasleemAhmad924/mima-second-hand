import type { ProcessStep } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

interface ProcessStepsProps {
  steps: ProcessStep[];
  /** "short" for the homepage teaser, "detail" for the full explanation. */
  variant?: "short" | "detail";
}

/**
 * Typography-led sequence — numbered rows, not four identical blocks.
 */
export function ProcessSteps({ steps, variant = "short" }: ProcessStepsProps) {
  return (
    <ol className="border-t border-line">
      {steps.map((step, index) => (
        <li
          key={step.number}
          className="border-b border-line py-6 sm:py-8"
        >
          <Reveal delay={index * 0.05}>
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 sm:gap-x-7 md:grid-cols-[4.75rem_minmax(0,15rem)_1fr] md:gap-x-10">
              <span className="font-display text-[1.85rem] leading-none text-taupe-ink sm:text-[2.55rem]">
                {step.number}
              </span>
              <h3 className="font-display text-[1.25rem] leading-tight text-charcoal sm:text-[1.55rem]">
                {step.title}
              </h3>
              <p className="col-span-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base md:col-span-1 md:col-start-3">
                {variant === "detail" ? step.detail : step.short}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
