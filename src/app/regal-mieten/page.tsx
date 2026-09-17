import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RentalExperience } from "@/components/booking/RentalExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Regal mieten",
  description:
    "Preise, Grundriss und der Weg zur Regalmiete bei MiMa Second Hand in Stockelsdorf. Die öffentliche Buchung wird bald freigeschaltet.",
  path: "/regal-mieten",
});

export default function RegalMietenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Regal mieten"
        title="Dein Regal im Laden."
        intro="Du wählst Zeitraum und Mietdauer. Die öffentliche Buchung wird bald freigeschaltet."
      />
      <section className="py-10 sm:py-16 lg:py-20">
        <Container>
          <RentalExperience />
        </Container>
      </section>
    </>
  );
}
