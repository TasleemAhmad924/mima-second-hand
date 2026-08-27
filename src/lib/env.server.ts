import "server-only";

/**
 * Server-only environment access.
 *
 * SECURITY: This module must never be imported by a client component. The
 * Pladsly API key is read here and only here. It is never exported to the
 * browser, never logged, and never returned in any response.
 *
 * Nothing throws at import time so that builds and mock-mode deployments work
 * without any Pladsly credentials configured.
 */

export type DataSource = "mock" | "pladsly";

/**
 * Integration mode. Preferred variable: PLADSLY_INTEGRATION_MODE=mock|live.
 * `DATA_SOURCE=mock|pladsly` is kept as a backward-compatible alias. "live"
 * and "pladsly" both mean the real integration; anything else means mock.
 */
function readDataSource(): DataSource {
  const mode = process.env.PLADSLY_INTEGRATION_MODE ?? process.env.DATA_SOURCE;
  return mode === "live" || mode === "pladsly" ? "pladsly" : "mock";
}

export const serverEnv = {
  dataSource: readDataSource(),
  pladsly: {
    /** SECRET. Server-side only. Never expose. */
    apiKey: process.env.PLADSLY_API_KEY ?? "",
    apiBaseUrl: process.env.PLADSLY_API_BASE_URL ?? "",
  },
} as const;

/** True only when the real Pladsly integration has the credentials it needs. */
export function isPladslyConfigured(): boolean {
  return Boolean(serverEnv.pladsly.apiKey && serverEnv.pladsly.apiBaseUrl);
}

/**
 * Resolves the effective data source. Falls back to "mock" if "pladsly" is
 * requested but not configured, so the site never breaks due to missing env.
 */
export function effectiveDataSource(): DataSource {
  if (serverEnv.dataSource === "pladsly" && isPladslyConfigured()) {
    return "pladsly";
  }
  return "mock";
}
