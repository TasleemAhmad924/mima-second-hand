import { siteConfig } from "@/config/site";

interface GoogleMapProps {
  src: string;
  className?: string;
  onError?: () => void;
}

/** Lightweight Google Maps Embed. Do not load this until consent/activation. */
export function GoogleMap({ src, className = "", onError }: GoogleMapProps) {
  return (
    <iframe
      title={`Karte: ${siteConfig.name}, ${siteConfig.city}`}
      src={src}
      className={`h-full w-full border-0 ${className}`}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="fullscreen"
      allowFullScreen
      onError={onError}
    />
  );
}
