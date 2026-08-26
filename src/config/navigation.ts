/** Primary navigation shared by the header, mobile menu and footer. */
export interface NavItem {
  label: string;
  href: string;
  /** External links open in a new tab and are excluded from the sitemap. */
  external?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: "Regal mieten", href: "/regal-mieten" },
  { label: "So funktioniert's", href: "/so-funktionierts" },
  { label: "Entdecken", href: "/entdecken" },
  { label: "Über MiMa", href: "/ueber-mima" },
  { label: "FAQ", href: "/faq" },
  { label: "Mein MiMa", href: "/mein-mima" },
];

/** Secondary links surfaced in the footer. */
export const footerNav: NavItem[] = [
  { label: "Regal mieten", href: "/regal-mieten" },
  { label: "Preise", href: "/preise" },
  { label: "So funktioniert's", href: "/so-funktionierts" },
  { label: "Entdecken", href: "/entdecken" },
  { label: "Über MiMa", href: "/ueber-mima" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Mein MiMa", href: "/mein-mima" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];
