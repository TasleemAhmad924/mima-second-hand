import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreparingNotice } from "@/components/content/PreparingNotice";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description: "Datenschutzerklärung von MiMa Second Hand.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutz" />
      <PreparingNotice />
    </>
  );
}
