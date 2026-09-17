import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { PriceRows } from "@/components/content/PriceRows";
import { CtaBand } from "@/components/content/CtaBand";
import { RentalRecommender } from "@/components/content/RentalRecommender";
import { pricingNotes } from "@/config/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Preise",
  description:
    "Regal mieten bei MiMa Second Hand: 2 Wochen, 4 Wochen oder 3 Monate. Alle Preise auf einen Blick.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Preise"
        title="Ein Regal, drei Zeiträume."
        intro="Du zahlst für den Zeitraum, den du wählst. Vom Verkauf behält MiMa 17 % Provision. Den Verkauf im Second-Hand-Laden übernehmen wir."
      />

      <Section space="md">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <PriceRows />
            <Reveal>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                {pricingNotes.disclaimer}{" "}
                <a href="/agb/" className="link-underline text-charcoal">
                  AGB
                </a>
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

      <Section space="md" tone="cream">
        <Container>
          <RentalRecommender />
        </Container>
      </Section>

      <CtaBand
        title="Die Buchung wird bald freigeschaltet."
        text="Bis dahin kannst du Preise und Mietmodell in Ruhe ansehen."
        primary={{ bookingSoon: true }}
        secondary={{ label: "So funktioniert's", href: "/so-funktionierts" }}
      />
    </>
  );
}
