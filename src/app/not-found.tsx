import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const suggestions = [
  { label: "Regal mieten", href: "/regal-mieten" },
  { label: "Entdecken", href: "/entdecken" },
  { label: "Über MiMa", href: "/ueber-mima" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[62vh] items-center py-16 sm:py-20">
      <Container>
        <p className="eyebrow">Fehler 404</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(1.9rem,1.1rem+3vw,3.8rem)] text-charcoal">
          Diese Seite haben wir leider verlegt.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
          Vielleicht wurde sie verschoben oder gibt es nicht mehr. Von hier aus
          findest du schnell zurück.
        </p>

        <div className="mt-9">
          <Button href="/">Zur Startseite</Button>
        </div>

        <nav
          aria-label="Vorschläge"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 sm:mt-12"
        >
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
