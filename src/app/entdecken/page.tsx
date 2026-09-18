import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/content/CtaBand";
import { InstagramLink } from "@/components/content/InstagramLink";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Entdecken",
  description:
    "Bald bei MiMa Second Hand in Stockelsdorf: eine wechselnde Auswahl an Second-Hand-Stücken zum Entdecken. Gekauft wird vor Ort im Second-Hand-Laden.",
  path: "/entdecken",
});

export default function EntdeckenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Entdecken"
        title="Bald zeigen wir hier erste Lieblingsstücke."
        intro="Nach der Eröffnung findest du hier regelmäßig ausgewählte Stücke aus dem Second-Hand-Laden. Das Sortiment verändert sich laufend. Vorbeischauen lohnt sich."
      />

      <Section space="sm">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <RevealMedia
                src="/images/store-wall.webp"
                alt="Holzregale im Second-Hand-Laden von MiMa, bereit für die ersten Lieblingsstücke."
                objectPosition="center 28%"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[4/3] w-full sm:aspect-[16/10]"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              <p className="eyebrow">Bis zur Eröffnung</p>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
                Einblicke in den Aufbau und die ersten Neuigkeiten findest du
                auf Instagram.
              </p>
              <div className="mt-7">
                <InstagramLink
                  label="MiMa auf Instagram"
                  className="text-charcoal"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Lieber selbst verkaufen?"
        text="Miete dein eigenes Regal und bring deine Lieblingsstücke ins Sortiment. Die Buchung wird bald freigeschaltet."
        primary={{ bookingSoon: true }}
        secondary={{ label: "Vorbeikommen", href: "/kontakt" }}
      />
    </>
  );
}
