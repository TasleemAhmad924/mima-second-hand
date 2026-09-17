import { Container } from "@/components/ui/Container";
import { getOperationsProvider } from "@/lib/operations/index.server";
import { formatEuro } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function InternOverviewPage() {
  const overview = await getOperationsProvider().overview();

  const rows = [
    ["Regale gesamt", String(overview.totalShelves)],
    ["Belegt (aktive Buchungen)", String(overview.occupiedShelves)],
    ["Frei", String(overview.freeShelves)],
    ["Aktive Verkäufer", String(overview.activeSellers)],
    ["Aktive Produkte", String(overview.activeProducts)],
    ["Verkäufe", String(overview.salesCount)],
    ["Umsatz", formatEuro(overview.revenueCents / 100)],
  ];

  return (
    <section className="py-10">
      <Container>
        <h1 className="font-display text-2xl text-charcoal">Store-Überblick</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Zahlen kommen aus dem nativen Betriebsmodell, nicht aus Pladsly.
          Ohne echte Buchungen sind alle gezeichneten Stellplätze frei. Das
          ist Absicht, keine Demo-Belegung. Die genaue Regalzahl ist offen.
        </p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-2 items-baseline gap-4 py-3"
            >
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-right font-display text-xl text-charcoal">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
