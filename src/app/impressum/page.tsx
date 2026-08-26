import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PreparingNotice } from "@/components/content/PreparingNotice";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum von MiMa Second Hand.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <PreparingNotice />
    </>
  );
}
