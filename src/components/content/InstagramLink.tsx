import { siteConfig } from "@/config/site";

interface InstagramLinkProps {
  className?: string;
  label?: string;
}

/**
 * Confirmed Instagram profile. Renders nothing if the URL is empty.
 */
export function InstagramLink({
  className = "",
  label = "Instagram",
}: InstagramLinkProps) {
  const href = siteConfig.social.instagram.trim();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-2 text-sm transition-colors duration-300 hover:text-taupe-ink focus-visible:text-taupe-ink ${className}`}
    >
      <InstagramMark />
      <span>{label}</span>
      <span className="sr-only"> (öffnet in neuem Tab)</span>
    </a>
  );
}

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
