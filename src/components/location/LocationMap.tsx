import { ArrowLink } from "@/components/ui/ArrowLink";
import { GoogleMap } from "@/components/location/GoogleMap";
import { googleMapsDirectionsUrl } from "@/config/maps";

/** Location map + route action. The embed loads immediately. */
export function LocationMap() {
  return (
    <div>
      <GoogleMap />
      <div className="mt-5">
        <ArrowLink href={googleMapsDirectionsUrl()} external>
          Route mit Google Maps
        </ArrowLink>
      </div>
    </div>
  );
}
