import { ArrowLink } from "@/components/ui/ArrowLink";
import { GoogleMapConsentGate } from "@/components/location/GoogleMapConsentGate";
import { googleMapsDirectionsUrl } from "@/config/maps";

/** Location map + route action. Google-specific embed stays behind the gate. */
export function LocationMap() {
  return (
    <div>
      <GoogleMapConsentGate />
      <div className="mt-5">
        <ArrowLink href={googleMapsDirectionsUrl()} external>
          Route mit Google Maps
        </ArrowLink>
      </div>
    </div>
  );
}
