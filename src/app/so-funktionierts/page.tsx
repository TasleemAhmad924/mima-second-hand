import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { CtaBand } from "@/components/content/CtaBand";
import { sellerSteps } from "@/data/process";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "So funktioniert's",
  description:
    "Zeitraum wählen, Lieblingsstücke vorbereiten, verkaufen lassen, Verkäufe verfolgen. So einfach ist Verkaufen bei MiMa Second Hand.",
  path: "/so-funktionierts",
});

const mimaHandles = [
  {
    title: "Verkauf im Laden",
    text: "Deine Stücke stehen sichtbar im Second-Hand-Laden. Wir beraten die Kundschaft und wickeln den Verkauf ab.",
  },
  {
    title: "Kasse & Abwicklung",
    text: "Die gesamte Kassenabwicklung im Second-Hand-Laden übernehmen wir. Du musst nicht vor Ort sein.",
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
        intro="Du bringst deine Lieblingsstücke, wir kümmern uns um den Rest. In vier Schritten vom Mietmodell bis zum Verkauf."
      />

      <Section space="md">
        <Container>
          <ProcessSteps steps={sellerSteps} variant="detail" />
        </Container>
      </Section>

      <Section space="sm" divider={false}>
        <Container>
          <RevealMedia
            src="/images/store-wall.jpg"
            alt="Holzregale im Second-Hand-Laden, aufgenommen in der Breite des Raums."
            objectPosition="center 28%"
            sizes="100vw"
            className="aspect-[16/9] w-full sm:aspect-[21/9]"
          />
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
        text="Buchung wird bald freigeschaltet. Bis dahin kannst du Preise und Ablauf in Ruhe ansehen."
        primary={{ bookingSoon: true }}
        secondary={{ label: "Preise ansehen", href: "/preise" }}
      />
    </>
  );
}
