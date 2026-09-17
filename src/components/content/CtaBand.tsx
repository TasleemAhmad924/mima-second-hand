import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BookingCta } from "@/components/booking/BookingCta";

interface LinkTarget {
  label: string;
  href: string;
  external?: boolean;
}

interface CtaBandProps {
  title: string;
  text?: string;
  primary: LinkTarget | { bookingSoon: true };
  secondary?: LinkTarget;
}

function isBookingSoon(
  primary: CtaBandProps["primary"],
): primary is { bookingSoon: true } {
  return "bookingSoon" in primary;
}

export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="bg-cream/70 py-12 sm:py-14 lg:py-16">
      <Container className="flex flex-col gap-7 sm:gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="headline max-w-xl text-charcoal">{title}</h2>
          {text ? (
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {text}
            </p>
          ) : null}
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            {isBookingSoon(primary) ? (
              <BookingCta />
            ) : (
              <Button href={primary.href} external={primary.external}>
                {primary.label}
              </Button>
            )}
            {secondary ? (
              <ArrowLink href={secondary.href} external={secondary.external}>
                {secondary.label}
              </ArrowLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
