import type { ElementType, ReactNode } from "react";

type Space = "xs" | "sm" | "md" | "lg" | "xl";
type Tone = "warm" | "cream";

interface SectionProps {
  children: ReactNode;
  /** Vertical rhythm. Vary this deliberately to compose the page. */
  space?: Space;
  tone?: Tone;
  divider?: boolean;
  id?: string;
  className?: string;
  as?: ElementType;
}

/**
 * Vertical rhythm primitive. Instead of every section using the same padding,
 * pick a space to compose an intentional cadence:
 * compact → large editorial moment → quiet → large image → calm.
 */
const spacing: Record<Space, string> = {
  xs: "py-10 sm:py-14",
  sm: "py-14 sm:py-20",
  md: "py-16 sm:py-24 lg:py-28",
  lg: "py-20 sm:py-28 lg:py-36",
  xl: "py-20 sm:py-36 lg:py-44",
};

const tones: Record<Tone, string> = {
  warm: "",
  cream: "bg-cream/50",
};

export function Section({
  children,
  space = "md",
  tone = "warm",
  divider = true,
  id,
  className = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`${spacing[space]} ${tones[tone]} ${
        divider ? "border-b border-line" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
