/**
 * Public booking availability. Pladsly URLs stay in `siteConfig.external`.
 * Flip `isOpen` when the client explicitly starts taking public bookings.
 */
export const publicBooking = {
  isOpen: false,
  ctaLabel: "Buchung bald verfügbar",
  statement: "Die Buchung wird bald freigeschaltet.",
  support:
    "Es gibt bereits viele Anmeldungen. Wir geben Bescheid, sobald du ein Regal verbindlich nehmen kannst.",
  href: "/regal-mieten#buchung",
} as const;
