import { ProjectsContent } from "./projects-content";
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
    title: locale === "it" ? "Progetti & Case Study" : "Projects & Case Studies",
    description:
      locale === "it"
        ? "Esplora i progetti realizzati da NEXUS.dev: applicazioni web moderne, intelligenza artificiale, architetture sicure e demo interattive."
        : "Explore projects built by NEXUS.dev: modern web apps, AI integrations, secure architectures, and interactive demos.",
    path: "/projects",
    locale,
  });
}

export default function ProjectsPage() {
  return <ProjectsContent />;
}
