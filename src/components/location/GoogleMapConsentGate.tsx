"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GoogleMap } from "@/components/location/GoogleMap";
import { googleMapsEmbedSrc, googleMapsPlaceUrl } from "@/config/maps";
import { siteConfig } from "@/config/site";
import {
  readLiveGoogleMapsConsent,
  readStoredGoogleMapsActivation,
  requestUsercentricsGoogleMapsConsent,
  shouldLoadGoogleMaps,
  storeGoogleMapsActivation,
  subscribeGoogleMapsConsent,
  type CmpConsent,
} from "@/lib/consent/google-maps";

const mapShellClass =
  "relative isolate min-h-[18.5rem] overflow-hidden border border-line bg-cream sm:min-h-[22rem] lg:min-h-[28rem] lg:aspect-[16/10]";

export function GoogleMapConsentGate() {
  const [userActivated, setUserActivated] = useState(false);
  const [cmpGranted, setCmpGranted] = useState<CmpConsent>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setUserActivated(readStoredGoogleMapsActivation());
    setCmpGranted(readLiveGoogleMapsConsent());
    return subscribeGoogleMapsConsent(setCmpGranted);
  }, []);

  const load = shouldLoadGoogleMaps({ userActivated, cmpGranted });
  const embedSrc = googleMapsEmbedSrc();

  const activate = useCallback(() => {
    storeGoogleMapsActivation();
    setUserActivated(true);
    if (cmpGranted === false) {
      requestUsercentricsGoogleMapsConsent();
    }
  }, [cmpGranted]);

  if (!load) {
    return (
      <div className={`${mapShellClass} flex items-center`}>
        <div className="max-w-md px-6 py-10 sm:px-10">
          <p className="eyebrow">Standort auf Google Maps</p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Um die Karte anzuzeigen, wird eine Verbindung zu Google Maps
            hergestellt.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button type="button" onClick={activate}>
              Google Maps laden
            </Button>
            <a
              href={googleMapsPlaceUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.14em] text-charcoal"
            >
              In Google Maps öffnen
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (failed) {
    return <MapFallback />;
  }

  return (
    <div className={mapShellClass}>
      <GoogleMap src={embedSrc} onError={() => setFailed(true)} />
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
