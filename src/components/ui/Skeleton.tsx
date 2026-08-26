interface SkeletonProps {
  className?: string;
}

/** Neutral loading placeholder. Pulse is disabled under reduced-motion. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-cream ${className}`}
    />
  );
}
