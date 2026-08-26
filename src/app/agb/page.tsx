import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreparingNotice } from "@/components/content/PreparingNotice";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von MiMa Second Hand.",
  path: "/agb",
});

export default function AgbPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Allgemeine Geschäftsbedingungen" />
      <PreparingNotice />
    </>
  );
}
