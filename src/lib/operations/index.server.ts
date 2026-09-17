import "server-only";

import { createNativeProvider } from "@/lib/operations/native-provider";
import { NativeStore } from "@/lib/operations/native-store";
import type {
  OperationsProvider,
  OperationsProviderId,
} from "@/lib/operations/types";
import { IntegrationError } from "@/lib/pladsly/errors";

const demoOccupancy =
  process.env.NODE_ENV !== "production" &&
  process.env.MIMA_DEMO_OCCUPANCY === "true";

const globalStore = globalThis as typeof globalThis & {
  __mimaNativeStore?: NativeStore;
};

function getNativeStore(): NativeStore {
  if (!globalStore.__mimaNativeStore) {
    globalStore.__mimaNativeStore = new NativeStore({ demoOccupancy });
  }
  return globalStore.__mimaNativeStore;
}

function readProviderId(): OperationsProviderId {
  const value = process.env.OPERATIONS_PROVIDER;
  if (value === "supabase" || value === "pladsly" || value === "native") {
    return value;
  }
  return "native";
}

/**
 * Resolves the operations backend. Supabase and live Pladsly booking APIs
 * are not connected yet; requesting them fails closed instead of inventing I/O.
 */
export function getOperationsProvider(): OperationsProvider {
  const id = readProviderId();
  if (id === "supabase") {
    throw IntegrationError.notConfigured("operations.supabase");
  }
  if (id === "pladsly") {
    throw IntegrationError.notImplemented("operations.pladsly.booking");
  }
  return createNativeProvider(getNativeStore());
}

export function isInternalUiEnabled(): boolean {
  return process.env.MIMA_INTERNAL_UI === "true";
}

export function getNativeStoreForTests(): NativeStore {
  return getNativeStore();
}
