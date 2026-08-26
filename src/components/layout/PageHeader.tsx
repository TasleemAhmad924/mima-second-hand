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
    <section className="border-b border-line pb-10 pt-10 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-[4.5rem]">
      <Container>
        <Reveal immediate>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="display mt-4 max-w-4xl text-[clamp(1.85rem,1.05rem+2.6vw,3.6rem)] text-charcoal sm:mt-5">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-7 sm:mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
