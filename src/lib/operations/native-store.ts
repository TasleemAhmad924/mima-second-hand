import { randomUUID } from "node:crypto";
import { LUEBECK_STORE, SEEDED_SHELVES, STORE_ZONES } from "@/data/store-layout";
import { nextBarcode } from "@/lib/mima/barcode";
import { exclusiveEndFor, findOverlap } from "@/lib/mima/booking-rules";
import { DomainError } from "@/lib/mima/errors";
import { eurosToCents, splitSale } from "@/lib/mima/money";
import { getPlan, SALES_COMMISSION_BPS } from "@/config/pricing";
import type {
  Booking,
  DateRange,
  IsoDate,
  ProductRecord,
  RentalPlanId,
  Sale,
  Seller,
  ShelfRecord,
  ShelfView,
  StoreSettings,
} from "@/lib/mima/types";
import { isValidRange } from "@/lib/mima/intervals";

export interface NativeStoreOptions {
  /** Local QA only. Never enable in production. */
  demoOccupancy?: boolean;
}

function nowIso() {
  return new Date().toISOString();
}

export class NativeStore {
  readonly store = LUEBECK_STORE;
  readonly zones = STORE_ZONES;
  readonly shelves: ShelfRecord[];
  readonly settings: StoreSettings;
  sellers = new Map<string, Seller>();
  bookings = new Map<string, Booking>();
  products = new Map<string, ProductRecord>();
  sales: Sale[] = [];

  constructor(options: NativeStoreOptions = {}) {
    this.shelves = SEEDED_SHELVES.map((shelf) => ({ ...shelf }));
    this.settings = {
      storeId: LUEBECK_STORE.id,
      commissionBps: SALES_COMMISSION_BPS,
      barcodePrefix: "MM",
    };
    if (options.demoOccupancy) {
      this.seedDemoOccupancy();
    }
  }

  private seedDemoOccupancy() {
    const seller = this.upsertSeller({
      email: "demo@mima.local",
      displayName: "Demo",
    });
    const shelf = this.shelves[0];
    if (!shelf) return;
    const startDate = "2026-10-01";
    this.bookings.set("demo-oct", {
      id: "demo-oct",
      sellerId: seller.id,
      shelfId: shelf.id,
      planId: "wochen-4",
      startDate,
      endDate: exclusiveEndFor(startDate, "wochen-4"),
      status: "confirmed",
      paymentStatus: "paid",
      priceCents: eurosToCents(getPlan("wochen-4").price),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });
  }

  upsertSeller(input: { email: string; displayName: string; id?: string }): Seller {
    const existing = [...this.sellers.values()].find(
      (seller) => seller.email === input.email,
    );
    if (existing) return existing;
    const seller: Seller = {
      id: input.id ?? randomUUID(),
      authUserId: null,
      email: input.email,
      displayName: input.displayName,
      phone: null,
      status: "active",
    };
    this.sellers.set(seller.id, seller);
    return seller;
  }

  listShelves(): ShelfRecord[] {
    return this.shelves;
  }

  shelfById(id: string): ShelfRecord | undefined {
    return this.shelves.find((shelf) => shelf.id === id || shelf.label === id);
  }

  availability(range: DateRange): ShelfView[] {
    return this.shelves.map((shelf) => {
      const zone = this.zones.find((item) => item.id === shelf.zoneId);
      if (!shelf.active) {
        return view(shelf, zone?.code ?? "?", "inactive");
      }
      const free = !findOverlap(range, [...this.bookings.values()], shelf.id);
      return view(shelf, zone?.code ?? "?", free ? "available" : "occupied");
    });
  }

  createBooking(input: {
    sellerId: string;
    shelfId: string;
    planId: RentalPlanId;
    startDate: IsoDate;
  }): Booking {
    const seller = this.sellers.get(input.sellerId);
    if (!seller || seller.status !== "active") {
      throw new DomainError("unknown_seller", "Verkäuferkonto fehlt.", 404);
    }
    const shelf = this.shelfById(input.shelfId);
    if (!shelf) throw DomainError.unknownShelf();
    if (!shelf.active) throw DomainError.inactiveShelf();

    const endDate = exclusiveEndFor(input.startDate, input.planId);
    const range = { startDate: input.startDate, endDate };
    if (!isValidRange(range)) throw DomainError.invalidRange();
    if (findOverlap(range, [...this.bookings.values()], shelf.id)) {
      throw DomainError.overlap();
    }

    const booking: Booking = {
      id: randomUUID(),
      sellerId: seller.id,
      shelfId: shelf.id,
      planId: input.planId,
      startDate: input.startDate,
      endDate,
      status: "pending_payment",
      paymentStatus: "unpaid",
      priceCents: eurosToCents(getPlan(input.planId).price),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    this.bookings.set(booking.id, booking);
    return booking;
  }

  bookingsForSeller(sellerId: string): Booking[] {
    return [...this.bookings.values()].filter(
      (booking) => booking.sellerId === sellerId,
    );
  }

  assertSellerOwns(sellerId: string, resourceSellerId: string) {
    if (sellerId !== resourceSellerId) throw DomainError.forbidden();
  }

  addProduct(input: {
    sellerId: string;
    title: string;
    priceCents: number;
    category: ProductRecord["category"];
    shelfId?: string | null;
  }): ProductRecord {
    if (!this.sellers.has(input.sellerId)) {
      throw new DomainError("unknown_seller", "Verkäuferkonto fehlt.", 404);
    }
    const product: ProductRecord = {
      id: randomUUID(),
      sellerId: input.sellerId,
      shelfId: input.shelfId ?? null,
      title: input.title,
      description: null,
      category: input.category,
      brand: null,
      size: null,
      priceCents: input.priceCents,
      imagePath: null,
      barcode: nextBarcode(
        [...this.products.values()].map((item) => item.barcode),
        this.settings.barcodePrefix,
      ),
      status: "draft",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    this.products.set(product.id, product);
    return product;
  }

  productsForSeller(sellerId: string): ProductRecord[] {
    return [...this.products.values()].filter(
      (product) => product.sellerId === sellerId,
    );
  }

  recordSale(input: {
    productId: string;
    actorSellerId?: string;
    asAdmin?: boolean;
  }): Sale {
    const product = this.products.get(input.productId);
    if (!product) throw DomainError.notFound();
    if (!input.asAdmin) {
      if (!input.actorSellerId) throw DomainError.forbidden();
      this.assertSellerOwns(input.actorSellerId, product.sellerId);
    }
    const split = splitSale(product.priceCents, this.settings.commissionBps);
    const sale: Sale = {
      id: randomUUID(),
      productId: product.id,
      sellerId: product.sellerId,
      shelfId: product.shelfId,
      ...split,
      paymentMethod: "cash",
      soldAt: nowIso(),
      employeeId: null,
      source: "manual",
    };
    this.sales.push(sale);
    this.products.set(product.id, {
      ...product,
      status: "sold",
      updatedAt: nowIso(),
    });
    return sale;
  }

  salesForSeller(sellerId: string): Sale[] {
    return this.sales.filter((sale) => sale.sellerId === sellerId);
  }

  overview() {
    const occupying = [...this.bookings.values()].filter(
      (booking) =>
        booking.status === "confirmed" || booking.status === "pending_payment",
    );
    const occupiedIds = new Set(occupying.map((booking) => booking.shelfId));
    return {
      totalShelves: this.shelves.length,
      occupiedShelves: occupiedIds.size,
      freeShelves: this.shelves.filter((shelf) => shelf.active).length - occupiedIds.size,
      activeSellers: [...this.sellers.values()].filter((s) => s.status === "active")
        .length,
      activeProducts: [...this.products.values()].filter((p) => p.status === "active")
        .length,
      salesCount: this.sales.length,
      revenueCents: this.sales.reduce((sum, sale) => sum + sale.grossCents, 0),
    };
  }
}

function view(
  shelf: ShelfRecord,
  zoneCode: string,
  status: ShelfView["status"],
): ShelfView {
  return {
    id: shelf.id,
    label: shelf.label,
    zoneId: shelf.zoneId,
    zoneCode,
    col: shelf.gridCol,
    row: shelf.gridRow,
    hint: shelf.hint,
    status,
  };
}

// isValidRangeSafe was a mistaken import - I used isValidRange from intervals instead.
// Remove the unused import by fixing booking-rules export - I imported isValidRangeSafe
// which doesn't exist. Fix native-store imports.
