import { AboutContent } from "./about-content";
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
    title: locale === "it" ? "Chi Sono | Sviluppatore & Cybersecurity" : "About Me | Developer & Cybersecurity",
    description:
      locale === "it"
        ? "Scopri il percorso, le competenze e l'approccio ingegneristico di NEXUS.dev. Unisco sviluppo web avanzato e sicurezza informatica."
        : "Discover the journey, skills, and engineering approach of NEXUS.dev. Combining modern web development and offensive cybersecurity.",
    path: "/about",
    locale,
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
