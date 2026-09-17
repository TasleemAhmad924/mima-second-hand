/**
 * Public CCM19 embed. This is not a server secret.
 *
 * The apiKey in the script URL is the dashboard embed key. It is meant to
 * appear in HTML. Do not confuse it with PLADSLY_API_KEY.
 *
 * Layout, blocked scripts and extra cookies are configured in the CCM19
 * administration, not in this repository.
 */
const DEFAULT_API_KEY =
  "bfd139fd02e0cfd60cff706cab9c402463bd7fed38a8276f";
const DEFAULT_DOMAIN_ID = "6aa9385a8ece54a2cd0fdb73";

function readPublic(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export const ccm19 = {
  host: "https://cloud.ccm19.de",
  apiKey: readPublic(process.env.NEXT_PUBLIC_CCM19_API_KEY, DEFAULT_API_KEY),
  domainId: readPublic(
    process.env.NEXT_PUBLIC_CCM19_DOMAIN,
    DEFAULT_DOMAIN_ID,
  ),
  lang: "de_DE",
} as const;

export function ccm19ScriptSrc(): string {
  const url = new URL("/app.js", ccm19.host);
  url.searchParams.set("apiKey", ccm19.apiKey);
  url.searchParams.set("domain", ccm19.domainId);
  url.searchParams.set("lang", ccm19.lang);
  return url.toString();
}
