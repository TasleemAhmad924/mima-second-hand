import "server-only";

import { serverEnv, isPladslyConfigured } from "@/lib/env.server";
import { IntegrationError } from "@/lib/pladsly/errors";

/**
 * Server-only Pladsly HTTP client.
 *
 * SECURITY:
 *   - The API key is attached only here, server-side, in the Authorization
 *     header. It is never returned to callers and never logged.
 *   - This is a thin, generic request helper for the integration modules. It is
 *     NOT a public proxy: only the internal server modules call it, and each
 *     builds explicit, known request paths. Client input never controls the
 *     path directly (routes validate + map inputs first).
 *
 * The concrete endpoint paths, auth scheme and response shapes are ASSUMED and
 * must be confirmed against the official Pladsly API docs before enabling
 * PLADSLY_INTEGRATION_MODE=live (see docs/PLADSLY_INTEGRATION.md).
 */

const DEFAULT_TIMEOUT_MS = 8000;

interface RequestOptions {
  /** Operation label for errors/logs (no sensitive data). */
  operation: string;
  /** Path relative to the configured base URL, e.g. "/products". */
  path: string;
  method?: "GET" | "POST";
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  timeoutMs?: number;
}

function buildUrl(base: string, path: string, query?: RequestOptions["query"]): string {
  const url = new URL(path.replace(/^\//, ""), base.endsWith("/") ? base : `${base}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/**
 * Performs an authenticated Pladsly request and returns parsed JSON.
 * Throws a typed IntegrationError on any failure; never leaks the key.
 */
export async function pladslyRequest<T>(options: RequestOptions): Promise<T> {
  if (!isPladslyConfigured()) {
    throw IntegrationError.notConfigured(options.operation);
  }

  const { apiKey, apiBaseUrl } = serverEnv.pladsly;
  const url = buildUrl(apiBaseUrl, options.path, options.query);

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        // ASSUMED auth scheme — confirm with Pladsly (Bearer vs. custom header).
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw IntegrationError.timeout(options.operation);
    }
    throw IntegrationError.unavailable(options.operation);
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    throw IntegrationError.rateLimited(options.operation);
  }
  if (response.status === 404) {
    throw IntegrationError.notFound(options.operation);
  }
  if (!response.ok) {
    // Do NOT surface the raw body; it may contain sensitive detail.
    throw IntegrationError.unavailable(options.operation);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw IntegrationError.malformed(options.operation);
  }
}
