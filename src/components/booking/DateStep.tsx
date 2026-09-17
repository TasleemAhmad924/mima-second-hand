import { formatGermanDate } from "@/lib/format";

interface DateStepProps {
  value: string;
  min: string;
  onChange: (value: string) => void;
}

export function DateStep({ value, min, onChange }: DateStepProps) {
  return (
    <div className="max-w-sm">
      <label
        htmlFor="start-date"
        className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted"
      >
        Startdatum
      </label>
      <div className="relative mt-3 border-b border-line-strong transition-colors duration-300 focus-within:border-charcoal">
        <p className="pointer-events-none py-2.5 font-display text-[1.2rem] tabular-nums text-charcoal sm:text-xl">
          {formatGermanDate(value)}
        </p>
        <input
          id="start-date"
          type="date"
          lang="de"
          name="startdatum"
          autoComplete="off"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={`Startdatum, aktuell ${formatGermanDate(value)}`}
        />
      </div>
    </div>
  );
}
