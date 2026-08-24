import { SurfSecContent } from "./surfsec-content";
import { constructMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "it" ? rawLocale : "it") as Locale;

  return constructMetadata({
    title: "SurfSec - External Attack Surface Management",
    description:
      locale === "it"
        ? "Piattaforma avanzata di External Attack Surface Management per identificare vulnerabilità, configurazioni errate e asset esposti."
        : "Enterprise-grade automated security intelligence platform helping teams identify web vulnerabilities proactively.",
    path: "/projects/surfsec",
    locale,
  });
}

export default function SurfSecPage() {
  return <SurfSecContent />;
}
