import { ServicesContent } from "./services-content";
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
    title: locale === "it" ? "Servizi di Sviluppo Web & Cybersecurity" : "Web Development & Cybersecurity Services",
    description:
      locale === "it"
        ? "Sviluppo Web Full-Stack moderno, Penetration Testing & Sicurezza offensiva, Automazione e Scripting custom per aziende."
        : "Full-Stack Web Development, Penetration Testing & Offensive Security, Automation & Custom Scripting for high-growth businesses.",
    path: "/services",
    locale,
  });
}

export default function ServicesPage() {
  return <ServicesContent />;
}
