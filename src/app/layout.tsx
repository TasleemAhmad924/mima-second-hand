import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { canonicalUrl, isIndexableDeployment } from "@/lib/seo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Ccm19Script } from "@/components/legal/Ccm19Script";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import { Ccm19AnalyticsConsent } from "@/components/analytics/Ccm19AnalyticsConsent";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { HeroPreload } from "@/components/home/HeroPreload";

/*
  Fonts are downloaded at build time and served from our own origin by Next's
  font handling. Playfair Display and Montserrat are the client CI pairing.
  Holiday (handwritten accent) is not embedded until usage rights are confirmed.
*/
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Second-Hand-Laden & Mietregale in ${siteConfig.city}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: canonicalUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} – Second-Hand-Laden & Mietregale in ${siteConfig.city}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – Second-Hand-Laden in ${siteConfig.city}`,
    description: siteConfig.description,
  },
  robots: isIndexableDeployment()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <HeroPreload />
        <Ccm19Script />
        <GoogleTag />
        <LocalBusinessJsonLd />
      </head>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <Ccm19AnalyticsConsent />
        <SkipLink />
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
