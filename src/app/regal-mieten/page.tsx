import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Regal mieten",
  description:
    "Wähle Startdatum, Mietdauer und dein Regal im MiMa Store. Eine Vorschau der künftigen Buchung – die finale Buchung läuft über unseren Partner Pladsly.",
  path: "/regal-mieten",
});

export default function RegalMietenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Regal mieten"
        title="Sichere dir dein Regal."
        intro="Wähle in drei Schritten deinen Zeitraum und dein Regal. Das ist eine Vorschau der künftigen Online-Buchung – deine Auswahl wird noch nicht verbindlich reserviert."
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container>
          <BookingFlow />
        </Container>
      </section>
    </>
  );
}
