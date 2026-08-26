export function SkipLink() {
  return (
    <a
      href="#inhalt"
      className="sr-only rounded-[var(--radius-sm)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-warm"
    >
      Zum Inhalt springen
    </a>
  );
}
