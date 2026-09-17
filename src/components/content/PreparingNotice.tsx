import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

/**
 * Honest placeholder for legal pages still waiting on remaining copy.
 */
export function PreparingNotice() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted">
            Diese Inhalte werden derzeit vorbereitet und in Kürze ergänzt.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Bei Fragen erreichst du uns jederzeit unter{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="link-underline text-charcoal"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
