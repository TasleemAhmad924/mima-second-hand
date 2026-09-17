/**
 * Public booking availability. Pladsly URLs stay in `siteConfig.external`.
 * Flip `isOpen` when the client explicitly starts taking public bookings.
 */
export const publicBooking = {
  isOpen: false,
  ctaLabel: "Buchung bald verfügbar",
  statement: "Buchung wird bald freigeschaltet.",
  support: "Die Regalbuchung wird in Kürze freigeschaltet.",
  href: "/regal-mieten#buchung",
} as const;
