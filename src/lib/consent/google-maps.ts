import { GOOGLE_MAPS_CONSENT_SERVICE } from "@/config/maps";

export const GOOGLE_MAPS_ACTIVATION_KEY = "mima.googleMaps.activated";

export type CmpConsent = boolean | null;

interface UcService {
  name?: string;
  id?: string;
  consent?: boolean | { given?: boolean; status?: boolean };
}

interface UcUi {
  isInitialized?: () => boolean;
  getServicesBaseInfo?: () => UcService[];
  acceptService?: (serviceId: string) => void | Promise<void>;
}

interface ConsentWindow {
  UC_UI?: UcUi;
}

const UC_EVENTS = [
  "UC_UI_INITIALIZED",
  "UC_CONSENT",
  "UC_UI_CMP_EVENT",
] as const;

function serviceConsentGiven(service: UcService): boolean {
  if (typeof service.consent === "boolean") return service.consent;
  return Boolean(service.consent?.given || service.consent?.status);
}

function matchesGoogleMapsService(service: UcService): boolean {
  const name = service.name?.toLowerCase() ?? "";
  return name.includes(GOOGLE_MAPS_CONSENT_SERVICE.toLowerCase());
}

export function readUsercentricsGoogleMapsConsent(
  uc: UcUi | undefined,
): CmpConsent {
  if (!uc?.getServicesBaseInfo) return null;
  try {
    const services = uc.getServicesBaseInfo();
    if (!Array.isArray(services) || services.length === 0) return null;
    const match = services.find(matchesGoogleMapsService);
    if (!match) return null;
    return serviceConsentGiven(match);
  } catch {
    return null;
  }
}

/**
 * Load the embed when Usercentrics has granted Google Maps, or when no CMP
 * is present and the visitor has explicitly activated the map.
 * Never bypass a present CMP that has not granted the service.
 */
export function shouldLoadGoogleMaps(options: {
  userActivated: boolean;
  cmpGranted: CmpConsent;
}): boolean {
  if (options.cmpGranted === true) return true;
  if (options.cmpGranted === false) return false;
  return options.userActivated;
}

export function readStoredGoogleMapsActivation(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(GOOGLE_MAPS_ACTIVATION_KEY) === "1";
  } catch {
    return false;
  }
}

export function storeGoogleMapsActivation(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(GOOGLE_MAPS_ACTIVATION_KEY, "1");
  } catch {
    /* private mode / blocked storage */
  }
}

export function readLiveGoogleMapsConsent(): CmpConsent {
  if (typeof window === "undefined") return null;
  return readUsercentricsGoogleMapsConsent(
    (window as unknown as ConsentWindow).UC_UI,
  );
}

export function requestUsercentricsGoogleMapsConsent(): void {
  if (typeof window === "undefined") return;
  const uc = (window as unknown as ConsentWindow).UC_UI;
  const services = uc?.getServicesBaseInfo?.();
  const match = services?.find(matchesGoogleMapsService);
  if (match?.id && uc?.acceptService) {
    void uc.acceptService(match.id);
  }
}

export function subscribeGoogleMapsConsent(
  listener: (granted: CmpConsent) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const notify = () => listener(readLiveGoogleMapsConsent());
  notify();

  for (const eventName of UC_EVENTS) {
    window.addEventListener(eventName, notify);
  }

  return () => {
    for (const eventName of UC_EVENTS) {
      window.removeEventListener(eventName, notify);
    }
  };
}
