import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { miriamPortrait } from "@/config/media";

export function StoryTeaser() {
  return (
    <Section space="lg">
      <Container className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <Reveal>
            <p className="eyebrow">Über MiMa</p>
            <h2 className="headline mt-4 text-charcoal">
              Mehr als ein Second-Hand-Laden.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:mt-7 sm:space-y-5">
              <p>
                Hinter MiMa steht Miriam Vlot. Sie baut in Stockelsdorf einen
                Ort, an dem man sich wohlfühlt: Familie, Nachhaltigkeit,
                Gemeinschaft und Dinge mit Geschichte.
              </p>
              <p>
                Stöbern soll sich anfühlen wie bei einer Freundin im Schrank.
                Ruhig, vertraut, ohne Kaufdruck.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 sm:mt-8">
              <ArrowLink href="/ueber-mima">Über MiMa</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-6">
          <RevealMedia
            src={miriamPortrait.src}
            alt={miriamPortrait.alt}
            objectPosition={miriamPortrait.objectPosition}
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="aspect-[3/4] w-full max-w-lg lg:max-w-none"
          />
        </div>
      </Container>
    </Section>
  );
}
