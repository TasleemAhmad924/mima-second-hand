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
          className="border-b border-line py-7 sm:py-9"
        >
          <Reveal delay={index * 0.06}>
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 sm:gap-x-8 md:grid-cols-[5.5rem_minmax(0,14rem)_1fr] md:gap-x-10">
              <span className="font-display text-[2.35rem] leading-none text-taupe sm:text-[2.75rem]">
                {step.number}
              </span>
              <h3 className="font-display text-xl leading-tight text-charcoal sm:text-[1.65rem]">
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
