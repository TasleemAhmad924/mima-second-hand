import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { sellerSteps } from "@/data/process";

export function HowItWorks() {
  return (
    <Section space="sm">
      <Container>
        <Reveal>
          <h2 className="headline max-w-xl text-charcoal">
            In vier Schritten zum eigenen Regal.
          </h2>
          <div className="mt-5">
            <ArrowLink href="/so-funktionierts">Alle Schritte ansehen</ArrowLink>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14">
          <ProcessSteps steps={sellerSteps} variant="short" />
        </div>
      </Container>
    </Section>
  );
}
