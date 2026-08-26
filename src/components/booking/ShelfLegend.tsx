const entries = [
  { label: "Verfügbar", className: "border-charcoal bg-warm" },
  { label: "Belegt", className: "border-line-strong bg-[#e8dfd2]" },
  { label: "Ausgewählt", className: "border-charcoal bg-charcoal" },
];

export function ShelfLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {entries.map((entry) => (
        <li key={entry.label} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-2.5 w-3.5 border ${entry.className}`}
          />
          <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {entry.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
