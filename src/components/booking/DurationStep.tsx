import { rentalPlans, type RentalPlanId } from "@/config/pricing";
import { formatEuro } from "@/lib/format";

interface DurationStepProps {
  value: RentalPlanId;
  onChange: (value: RentalPlanId) => void;
}

export function DurationStep({ value, onChange }: DurationStepProps) {
  return (
    <fieldset>
      <legend className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
        Mietdauer
      </legend>
      <div className="mt-4 flex flex-col border-t border-line sm:flex-row sm:border-t-0 sm:border-b sm:border-line">
        {rentalPlans.map((plan) => {
          const selected = plan.id === value;
          return (
            <label
              key={plan.id}
              className={`flex min-h-14 cursor-pointer items-center justify-between gap-4 border-b border-line px-0 py-4 transition-colors duration-300 [transition-timing-function:var(--ease-inout)] sm:min-h-[4.5rem] sm:flex-1 sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0 ${
                selected
                  ? "text-charcoal"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <input
                type="radio"
                name="mietdauer"
                value={plan.id}
                checked={selected}
                onChange={() => onChange(plan.id)}
                className="sr-only"
              />
              <span className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className={`block h-2 w-2 rounded-full border transition-colors duration-300 ${
                    selected
                      ? "border-charcoal bg-charcoal"
                      : "border-line-strong bg-transparent"
                  }`}
                />
                <span className="font-display text-lg text-current sm:text-xl">
                  {plan.name}
                </span>
              </span>
              <span className="text-sm text-current/70">
                {formatEuro(plan.price)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
