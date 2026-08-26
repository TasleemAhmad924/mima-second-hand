import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/content/CtaBand";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über MiMa",
  description:
    "MiMa Second Hand ist ein Indoor-Flohmarkt in Lübeck: ein ordentlicher Ort für Second Hand, an dem gute Dinge einen zweiten Besitzer finden.",
  path: "/ueber-mima",
});

const principles = [
  {
    number: "01",
    title: "Gute Dinge bleiben im Umlauf",
    text: "Second Hand ist bei uns der Kern, nicht das Etikett. Was noch schön und brauchbar ist, verdient eine zweite Runde.",
  },
  {
    number: "02",
    title: "Verkaufen soll leicht sein",
    text: "Ein Regal statt Standdienst. Du bringst deine Stücke, wir übernehmen den Verkauf im Store.",
  },
  {
    number: "03",
    title: "Der Store lebt",
    text: "Das Sortiment verändert sich ständig. Jeder Besuch sieht ein bisschen anders aus.",
  },
];

export default function UeberMimaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über MiMa"
        title="Second Hand mit gutem Platz."
        intro={`MiMa ist ein Indoor-Flohmarkt in ${siteConfig.city}. Ein Ort, an dem gebrauchte Dinge ordentlich präsentiert werden – und an dem Verkaufen einfach ist.`}
      />

      <Section space="lg">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealMedia
              src="/images/store-interior.jpg"
              alt="Innenansicht eines Second-Hand-Stores mit Holzregalen und Kleidung."
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/3]"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-muted">
                <p>
                  Die Idee hinter MiMa ist einfach: Second Hand einen festen,
                  einladenden Ort geben. Kein improvisierter Stand, kein Aufbauen
                  bei Wind und Wetter, sondern ein Regal im Laden, das dir
                  gehört.
                </p>
                <p>
                  Wer verkaufen möchte, mietet ein Regal und richtet es ein. Den
                  Verkauf übernehmen wir im Store. Wer stöbern möchte, findet ein
                  Sortiment, das sich mit jedem Besuch verändert.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="md">
        <Container>
          <ol className="border-t border-line">
            {principles.map((principle, index) => (
              <li
                key={principle.number}
                className="border-b border-line py-8 sm:py-10"
              >
                <Reveal delay={index * 0.06}>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-10">
                    <span className="font-display text-[2.35rem] leading-none text-taupe md:col-span-2">
                      {principle.number}
                    </span>
                    <h2 className="font-display text-xl leading-tight text-charcoal md:col-span-4 sm:text-2xl">
                      {principle.title}
                    </h2>
                    <p className="max-w-md text-sm leading-relaxed text-muted md:col-span-6 sm:text-base">
                      {principle.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="Mach mit, auf deine Weise."
        primary={{ label: "Regal mieten", href: "/regal-mieten" }}
        secondary={{ label: "Second Hand entdecken", href: "/entdecken" }}
      />
    </>
  );
}
