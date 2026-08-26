import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { PriceRows } from "@/components/content/PriceRows";
import { CtaBand } from "@/components/content/CtaBand";
import { pricingNotes } from "@/config/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Preise",
  description:
    "Regal mieten bei MiMa Second Hand: drei Mietzeiträume – zwei Wochen, ein Monat oder drei Monate. Alle Preise auf einen Blick.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Preise"
        title="Ein Regal, drei Zeiträume."
        intro="Du zahlst für den Zeitraum, den du wählst. Ohne versteckte Kosten – den Verkauf im Store übernehmen wir."
      />

      <Section space="md">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <PriceRows />
            <Reveal>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                {pricingNotes.disclaimer}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h2 className="eyebrow text-charcoal">Im Preis enthalten</h2>
              <ul className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {pricingNotes.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-4 shrink-0 bg-taupe"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Zeitraum gewählt? Dann weiter zum Regal."
        primary={{ label: "Regal auswählen", href: "/regal-mieten" }}
        secondary={{ label: "So funktioniert's", href: "/so-funktionierts" }}
      />
    </>
  );
}
