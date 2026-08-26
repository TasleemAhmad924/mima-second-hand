import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/content/Accordion";
import { CtaBand } from "@/components/content/CtaBand";
import { faqItems } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Häufige Fragen zu MiMa Second Hand – für Verkäuferinnen und Verkäufer sowie für alle, die bei uns stöbern und kaufen möchten.",
  path: "/faq",
});

const groups = [
  {
    key: "verkaufen" as const,
    label: "Für Verkäufer:innen",
    heading: "Regal mieten & verkaufen",
  },
  {
    key: "entdecken" as const,
    label: "Für Entdecker:innen",
    heading: "Stöbern & kaufen",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fragen & Antworten"
        title="Gut zu wissen."
        intro="Die häufigsten Fragen – getrennt nach Verkaufen und Entdecken. Ist deine Frage nicht dabei, melde dich gern."
      />

      <Section space="md">
        <Container className="flex flex-col gap-16 lg:gap-20">
          {groups.map((group) => {
            const items = faqItems.filter(
              (item) => item.audience === group.key,
            );
            return (
              <div
                key={group.key}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-4">
                  <Reveal>
                    <p className="eyebrow">{group.label}</p>
                    <h2 className="headline mt-4 text-charcoal">
                      {group.heading}
                    </h2>
                  </Reveal>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <Reveal delay={0.05}>
                    <Accordion items={items} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      <CtaBand
        title="Noch eine Frage offen?"
        text="Schreib uns. Wir antworten so schnell wir können."
        primary={{ label: "Kontakt aufnehmen", href: "/kontakt" }}
      />
    </>
  );
}
