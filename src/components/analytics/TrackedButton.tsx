"use client";

import { Button } from "@/components/ui/Button";
import { track, type AnalyticsEventName } from "@/lib/analytics";

interface TrackedButtonProps {
  href: string;
  event: AnalyticsEventName;
  variant?: "primary" | "secondary" | "on-dark" | "on-dark-outline";
  className?: string;
  children: React.ReactNode;
}

/**
 * External CTA that fires a coarse analytics event on click. Lets server
 * components (e.g. /mein-mima, /entdecken) trigger an event without becoming
 * client components themselves. Reuses the shared Button styling and its safe
 * external-link behaviour (`target="_blank"`, `rel="noopener noreferrer"`).
 */
export function TrackedButton({
  href,
  event,
  variant = "primary",
  className,
  children,
}: TrackedButtonProps) {
  return (
    <Button
      href={href}
      external
      variant={variant}
      className={className}
      onClick={() => track(event)}
    >
      {children}
    </Button>
  );
}
