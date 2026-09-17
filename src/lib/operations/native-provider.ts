import { STORE_ZONES } from "@/data/store-layout";
import { NativeStore } from "@/lib/operations/native-store";
import type { OperationsProvider } from "@/lib/operations/types";

export function createNativeProvider(store: NativeStore): OperationsProvider {
  return {
    id: "native",
    async getAvailability(range) {
      return {
        range,
        shelves: store.availability(range),
        zones: STORE_ZONES,
        live: false,
        provider: "native",
      };
    },
    async createBooking(input) {
      return store.createBooking(input);
    },
    async ensureSeller(input) {
      return store.upsertSeller(input);
    },
    async listSellerBookings(sellerId) {
      return store.bookingsForSeller(sellerId);
    },
    async listSellerProducts(sellerId) {
      return store.productsForSeller(sellerId);
    },
    async listSellerSales(sellerId) {
      return store.salesForSeller(sellerId);
    },
    async overview() {
      return store.overview();
    },
  };
}
