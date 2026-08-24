import { TermsContent } from "./terms-content";
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
    title: locale === "it" ? "Termini di Servizio" : "Terms of Service",
    description:
      locale === "it"
        ? "Termini e condizioni di utilizzo dei servizi e del sito web NEXUS.dev."
        : "Terms and conditions governing the use of NEXUS.dev website and services.",
    path: "/terms-of-service",
    locale,
  });
}

export default function TermsOfServicePage() {
  return <TermsContent />;
}
