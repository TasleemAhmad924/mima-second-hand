import type { ElementType, ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: ElementType;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  /** Controls the display size of the heading. */
  size?: "md" | "lg";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  align = "left",
  tone = "dark",
  className = "",
  size = "md",
}: SectionHeadingProps) {
  const titleColor = tone === "light" ? "text-warm" : "text-charcoal";
  const introColor = tone === "light" ? "text-warm/70" : "text-muted";
  const eyebrowColor = tone === "light" ? "text-taupe" : "";
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";
  const titleClass = size === "lg" ? "display" : "headline";

  return (
    <div className={`flex max-w-xl flex-col gap-4 sm:gap-5 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      ) : null}
      <Heading className={`${titleClass} ${titleColor}`}>{title}</Heading>
      {intro ? (
        <p className={`max-w-prose text-base leading-relaxed sm:text-lg ${introColor}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
