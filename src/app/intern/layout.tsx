import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isInternalUiEnabled } from "@/lib/operations/index.server";

export const metadata: Metadata = {
  title: "Intern · MiMa",
  robots: { index: false, follow: false },
};

export default function InternLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!isInternalUiEnabled()) notFound();
  return (
    <div className="border-b border-line bg-cream/40">
      <div className="mx-auto w-full max-w-[82rem] px-6 py-4 sm:px-8">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-taupe-ink">
          Intern
        </p>
        <p className="mt-1 text-sm text-muted">
          Funktionsansicht. Nicht Teil der öffentlichen Marke. Auth folgt mit
          Supabase.
        </p>
      </div>
      {children}
    </div>
  );
}
