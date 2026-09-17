import Link from "next/link";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

/** A restrained editorial text link with a small forward arrow. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  external = false,
  className = "",
  onClick,
}: ArrowLinkProps) {
  const color =
    tone === "light"
      ? "text-warm hover:text-taupe"
      : "text-charcoal hover:text-taupe-ink";

  const content = (
    <span className="group inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.14em]">
      <span className="link-underline">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="transition-transform duration-400 [transition-timing-function:var(--ease-inout)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${color} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${color} ${className}`} onClick={onClick}>
      {content}
    </Link>
  );
}
