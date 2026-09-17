import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="border-b border-line pb-8 pt-8 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
      <Container>
        <Reveal immediate>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="display mt-3 max-w-4xl text-[clamp(1.9rem,1.1rem+2.4vw,3.35rem)] text-charcoal sm:mt-4">
            {title}
          </h1>
          {intro ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-7 sm:mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
