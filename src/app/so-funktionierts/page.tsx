import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { CtaBand } from "@/components/content/CtaBand";
import { sellerSteps } from "@/data/process";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "So funktioniert's",
  description:
    "Regal auswählen, Lieblingsstücke vorbereiten, verkaufen lassen, Verkäufe verfolgen – so einfach ist Verkaufen bei MiMa Second Hand.",
  path: "/so-funktionierts",
});

const mimaHandles = [
  {
    title: "Verkauf im Store",
    text: "Deine Stücke stehen sichtbar im Laden. Wir beraten die Kundschaft und wickeln den Verkauf ab.",
  },
  {
    title: "Kasse & Abwicklung",
    text: "Die gesamte Kassenabwicklung im Store übernehmen wir – du musst nicht vor Ort sein.",
  },
  {
    title: "Überblick im Konto",
    text: "Verkäufe und Abrechnung siehst du transparent in deinem Online-Konto.",
  },
];

export default function SoFunktioniertsPage() {
  return (
    <>
      <PageHeader
        eyebrow="So funktioniert's"
        title="Verkaufen, ohne Standdienst."
        intro="Du bringst deine Lieblingsstücke, wir kümmern uns um den Rest. In vier Schritten von der Regalbuchung bis zum Verkauf."
      />

      <Section space="md">
        <Container>
          <ProcessSteps steps={sellerSteps} variant="detail" />
        </Container>
      </Section>

      <Section space="md">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="headline text-charcoal">
                Deinen Verkauf managen wir.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-line">
              {mimaHandles.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="grid grid-cols-1 gap-2 border-b border-line py-7 sm:grid-cols-3 sm:gap-8">
                    <dt className="font-display text-xl text-charcoal">
                      {item.title}
                    </dt>
                    <dd className="text-base leading-relaxed text-muted sm:col-span-2">
                      {item.text}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Bereit für dein eigenes Regal?"
        text="Wähle Zeitraum und Regal. Die Buchung schließt du anschließend sicher ab."
        primary={{ label: "Regal mieten", href: "/regal-mieten" }}
        secondary={{ label: "Preise ansehen", href: "/preise" }}
      />
    </>
  );
}
