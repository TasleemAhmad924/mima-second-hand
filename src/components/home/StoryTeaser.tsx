import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function StoryTeaser() {
  return (
    <Section space="xl">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <RevealMedia
            src="/images/product-satchel.jpg"
            alt="Gebrauchte Ledertasche mit Patina auf einem alten Holzhocker."
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Die Idee</p>
            <h2 className="headline mt-4 text-charcoal sm:mt-5">
              Gute Dinge verdienen einen zweiten Besitzer.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:mt-7 sm:space-y-5">
              <p>
                MiMa gibt Second Hand einen ordentlichen Ort. Kein Aufbauen am
                Wochenende, kein Standdienst bei Wind und Wetter. Du mietest ein
                Regal, wir kümmern uns um den Verkauf.
              </p>
              <p>
                Und für alle, die stöbern: ein Sortiment, das lebt. Was heute im
                Regal steht, ist morgen vielleicht schon weg, und dafür etwas
                Neues da.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 sm:mt-8">
              <ArrowLink href="/ueber-mima">Über MiMa</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
