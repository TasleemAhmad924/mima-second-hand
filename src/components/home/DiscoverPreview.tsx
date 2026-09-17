import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { InstagramLink } from "@/components/content/InstagramLink";

export function DiscoverPreview() {
  return (
    <Section space="lg">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <RevealMedia
            src="/images/shelf-open.png"
            alt="Offenes Holzregal bei MiMa, bereit für die ersten Lieblingsstücke."
            objectPosition="center"
            objectFit="contain"
            zoom={false}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mx-auto aspect-[4/5] w-full max-w-md bg-warm sm:max-w-none sm:aspect-[5/6] lg:aspect-[4/5]"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Bald bei MiMa</p>
            <h2 className="headline mt-4 text-charcoal">
              Lieblingsstücke, die darauf warten, entdeckt zu werden.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Unser Second-Hand-Laden füllt sich gerade erst. Schon bald zeigen
              wir dir hier eine wechselnde Auswahl an Kleidung, Accessoires,
              Wohnschätzen und vielen weiteren besonderen Fundstücken.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Schau bald wieder vorbei. Die ersten Stücke folgen.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-7 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
              <ArrowLink href="/ueber-mima">Mehr über MiMa erfahren</ArrowLink>
              <InstagramLink
                label="Auf Instagram folgen"
                className="text-charcoal"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
