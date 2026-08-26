import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";

const sides = [
  {
    kicker: "01",
    title: "Ich möchte verkaufen",
    text: "Miete dein eigenes Regal und bring deine Lieblingsstücke unter Menschen. Den Verkauf im Store übernehmen wir für dich.",
    image: "/images/rack-minimal.jpg",
    alt: "Schlichte Kleiderstange mit ausgewählten Stücken vor heller Wand.",
    href: "/regal-mieten",
    linkLabel: "Regal mieten",
    offset: false,
  },
  {
    kicker: "02",
    title: "Ich möchte entdecken",
    text: "Stöbere durch ein Sortiment, das sich ständig verändert, und finde vor Ort dein nächstes Lieblingsstück.",
    image: "/images/store-interior.jpg",
    alt: "Blick in einen Second-Hand-Store mit Holzregalen und Kleidung.",
    href: "/entdecken",
    linkLabel: "Second Hand entdecken",
    offset: true,
  },
];

export function TwoSides() {
  return (
    <Section space="lg">
      <Container>
        <Reveal>
          <h2 className="headline max-w-xl text-charcoal">
            Ein Ort zum Verkaufen und zum Entdecken.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 md:mt-16 md:grid-cols-2">
          {sides.map((side, index) => (
            <article
              key={side.href}
              className={side.offset ? "md:mt-24" : ""}
            >
              <RevealMedia
                src={side.image}
                alt={side.alt}
                delay={index * 0.08}
                sizes="(max-width: 768px) 100vw, 44vw"
                className="aspect-[4/5] w-full"
              />
              <Reveal delay={0.06}>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-lg text-taupe">
                    {side.kicker}
                  </span>
                  <h3 className="font-display text-[1.45rem] text-charcoal sm:text-[1.7rem]">
                    {side.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                  {side.text}
                </p>
                <div className="mt-5">
                  <ArrowLink href={side.href}>{side.linkLabel}</ArrowLink>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
