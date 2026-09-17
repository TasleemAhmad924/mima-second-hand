"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { googleMapsEmbedSrc, googleMapsPlaceUrl } from "@/config/maps";

const mapShellClass =
  "relative isolate h-[18.5rem] overflow-hidden border border-line bg-cream sm:h-[22rem] lg:h-auto lg:min-h-[28rem] lg:aspect-[16/10]";

interface GoogleMapProps {
  src?: string;
  className?: string;
}

/** Google Maps Embed for the Laden. Loads immediately. */
export function GoogleMap({
  src = googleMapsEmbedSrc(),
  className = "",
}: GoogleMapProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <MapFallback />;
  }

  return (
    <div className={`${mapShellClass} ${className}`}>
      <iframe
        title={`Karte: ${siteConfig.name}, ${siteConfig.city}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen"
        allowFullScreen
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function MapFallback() {
  const { name, address, openingHours } = siteConfig;

  return (
    <div className={`${mapShellClass} flex items-center`}>
      <div className="max-w-md px-6 py-10 sm:px-10">
        <p className="font-display text-xl text-charcoal">{name}</p>
        <p className="mt-2 text-sm uppercase tracking-[0.14em] text-taupe-ink">
          Second-Hand-Laden in {address.city}
        </p>
        <address className="mt-5 not-italic text-base leading-relaxed text-charcoal">
          {address.street}
          <br />
          {address.postalCode} {address.city}
        </address>
        <div className="mt-4 space-y-1 text-sm text-charcoal">
          {openingHours.map((entry) => (
            <p key={entry.days}>
              <span className="text-muted">{entry.days} </span>
              {entry.hours}
            </p>
          ))}
        </div>
        <a
          href={googleMapsPlaceUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-7 inline-block text-[0.78rem] font-medium uppercase tracking-[0.14em] text-charcoal"
        >
          In Google Maps öffnen
        </a>
      </div>
    </div>
  );
}
