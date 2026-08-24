import { PrivacyContent } from "./privacy-content";
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
    title: locale === "it" ? "Privacy Policy" : "Privacy Policy",
    description:
      locale === "it"
        ? "Informativa sulla privacy e trattamento dei dati personali ai sensi del GDPR per NEXUS.dev."
        : "Privacy Policy and personal data protection statement in compliance with GDPR for NEXUS.dev.",
    path: "/privacy-policy",
    locale,
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
