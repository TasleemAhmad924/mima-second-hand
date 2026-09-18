import Link from "next/link";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
  /** Kept for callers; the mark is tiny and must not compete with the hero LCP. */
  priority?: boolean;
  /** Rendered width in pixels (height scales to keep the 427×226 ratio). */
  width?: number;
}

/**
 * The MiMa Second Hand wordmark. The asset is used as provided and never
 * redrawn. On dark surfaces it is rendered as a solid light mark via filter.
 */
export function Logo({
  tone = "dark",
  className = "",
  width = 148,
}: LogoProps) {
  const height = Math.round((width * 226) / 427);
  const lightFilter = tone === "light" ? "[filter:brightness(0)_invert(1)]" : "";

  return (
    <Link
      href="/"
      aria-label="MiMa Second Hand – zur Startseite"
      className={`inline-flex shrink-0 ${className}`}
    >
      <img
        src="/logo-mark.webp"
        alt="MiMa Second Hand"
        width={width}
        height={height}
        decoding="async"
        className={`h-auto w-auto ${lightFilter}`}
        style={{ width, height }}
      />
    </Link>
  );
}
