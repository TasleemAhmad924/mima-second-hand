import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";

const sides = [
  {
    kicker: "01",
    title: "Ich möchte verkaufen",
    text: "Miete dein eigenes Regal und bring deine Lieblingsstücke unter Menschen. Den Verkauf im Second-Hand-Laden übernehmen wir für dich.",
    image: "/images/store-wall.jpg",
    alt: "Holzregale mit sorgfältig gehängter Kleidung und gefalteten Textilien im Second-Hand-Laden.",
    href: "/regal-mieten",
    linkLabel: "Zum Mietmodell",
    objectPosition: "center 30%",
    aspect: "aspect-[4/5]",
    offset: false,
  },
  {
    kicker: "02",
    title: "Ich möchte entdecken",
    text: "Stöbere durch ein Sortiment, das sich ständig verändert, und finde vor Ort dein nächstes Lieblingsstück.",
    image: "/images/product-ceramics.jpg",
    alt: "Handgetöpferte Kanne und Becher, stellvertretend für Wohnstücke im Sortiment.",
    href: "/entdecken",
    linkLabel: "Second Hand entdecken",
    objectPosition: "center 55%",
    aspect: "aspect-[5/6]",
    offset: true,
  },
];

export function TwoSides() {
  return (
    <Section space="md">
      <Container>
        <Reveal>
          <h2 className="headline max-w-lg text-charcoal">
            Ein Ort zum Verkaufen und zum Entdecken.
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-y-12 md:mt-14 md:grid-cols-2 md:gap-x-14 md:gap-y-16">
          {sides.map((side, index) => (
            <article
              key={side.href}
              className={side.offset ? "md:mt-20" : ""}
            >
              <RevealMedia
                src={side.image}
                alt={side.alt}
                delay={index * 0.08}
                objectPosition={side.objectPosition}
                sizes="(max-width: 768px) 100vw, 44vw"
                className={`w-full ${side.aspect}`}
              />
              <Reveal delay={0.06}>
                <div className="mt-4 flex items-baseline gap-3.5 md:mt-5">
                  <span className="font-display text-[1.35rem] leading-none text-taupe-ink">
                    {side.kicker}
                  </span>
                  <h3 className="font-display text-[1.4rem] leading-tight text-charcoal sm:text-[1.65rem]">
                    {side.title}
                  </h3>
                </div>
                <p className="mt-2.5 max-w-md text-base leading-relaxed text-muted md:mt-3">
                  {side.text}
                </p>
                <div className="mt-3 md:mt-4">
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
