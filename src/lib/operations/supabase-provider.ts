import "server-only";

import { IntegrationError } from "@/lib/pladsly/errors";
import type { OperationsProvider } from "@/lib/operations/types";

/**
 * Placeholder. A live Supabase client is only constructed after a project
 * and service-role key exist. Missing credentials must fail closed.
 */
export function createSupabaseProvider(): OperationsProvider {
  throw IntegrationError.notConfigured("operations.supabase");
}
