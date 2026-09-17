import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RevealMedia } from "@/components/ui/RevealMedia";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/content/CtaBand";
import { InstagramLink } from "@/components/content/InstagramLink";
import { siteConfig } from "@/config/site";
import { miriamPortrait } from "@/config/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über MiMa",
  description:
    "Hinter MiMa Second Hand steht Miriam Vlot. Ein Second-Hand-Laden in Stockelsdorf: Wohlfühlort, Familie, Nachhaltigkeit und Dinge mit Geschichte.",
  path: "/ueber-mima",
});

const chapters = [
  {
    title: "Warum MiMa?",
    text: "MiMa kommt von Miriam und dem Namen ihrer Tochter. Dahinter steckt Frauenpower und der Wunsch, einen Ort zu schaffen, an dem man sich wohlfühlt. Für Miriam ist das kein Nebenprojekt. Es ist Herzblut: Familie, Nachhaltigkeit, Gemeinschaft und schöne Dinge mit einer Geschichte.",
  },
  {
    title: "Wie bei einer Freundin stöbern.",
    text: "Der Second-Hand-Laden soll sich anfühlen wie der Schrank einer Freundin. Vertraut, entspannt, ohne Kaufdruck. Du darfst in Ruhe entdecken, anfassen, überlegen. Nichts muss, vieles darf.",
  },
  {
    title: "Dinge mit Geschichte.",
    text: "Wer verkauft, gibt guten Stücken ein zweites Leben, statt sie wegzulegen oder wegzuwerfen. Wer kauft, findet Besonderes und spart Ressourcen. Second Hand kann Geld sparen. Vor allem hält es Dinge im Umlauf.",
  },
  {
    title: "Mit Herzblut in Stockelsdorf.",
    text: `Gerade wird der leere Ladenraum eingerichtet, geplant, dekoriert. Miriam geht mit norddeutscher Gelassenheit, Leidenschaft und Vorfreude auf die Eröffnung zu. Wenn du vorbeikommst, sollst du Teil der MiMa-Gemeinschaft werden. ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.city}.`,
  },
];

export default function UeberMimaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ein Wohlfühlort"
        title="Mehr als ein Second-Hand-Laden."
        intro="Miriam Vlot verwandelt in Stockelsdorf einen leeren Ladenraum in MiMa. Einen Ort zum Ankommen, Stöbern und Weitergeben."
      />

      <Section space="lg">
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealMedia
              src={miriamPortrait.src}
              alt={miriamPortrait.alt}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[3/4] w-full max-w-lg sm:max-w-xl lg:max-w-none"
              objectPosition={miriamPortrait.objectPosition}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-muted">
                <p>
                  Hinter MiMa steht Miriam Vlot. Sie baut den Second-Hand-Laden
                  mit der gleichen Mischung aus Ruhe und Vorfreude, mit der sie
                  an die Eröffnung denkt.
                </p>
                <p>
                  Verkaufen heißt hier: ein Regal einrichten und loslassen.
                  Entdecken heißt: ohne Eile durch Dinge gehen, die schon ein
                  Leben hatten.
                </p>
                <InstagramLink
                  label="MiMa auf Instagram"
                  className="text-charcoal hover:text-taupe-ink"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section space="md">
        <Container>
          <ol className="border-t border-line">
            {chapters.map((chapter, index) => (
              <li
                key={chapter.title}
                className="border-b border-line py-8 sm:py-10"
              >
                <Reveal delay={index * 0.06}>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-10">
                    <h2 className="font-display text-xl leading-tight text-charcoal md:col-span-5 sm:text-2xl">
                      {chapter.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-muted md:col-span-7 sm:text-base">
                      {chapter.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="Werde Teil von MiMa."
        text="Zum Stöbern komm vorbei, sobald der Laden öffnet. Die Buchung für ein eigenes Regal folgt bald."
        primary={{ bookingSoon: true }}
        secondary={{ label: "Second Hand entdecken", href: "/entdecken" }}
      />
    </>
  );
}
