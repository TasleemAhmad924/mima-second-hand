import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Narrower measure for long-form reading passages. */
  size?: "default" | "narrow" | "wide";
}

const sizes = {
  default: "max-w-[82rem]",
  narrow: "max-w-[44rem]",
  wide: "max-w-[88rem]",
};

/**
 * The single horizontal grid for the whole site. Header, footer and every
 * section share this measure and gutters, so edges align across pages.
 */
export function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${sizes[size]} px-6 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
