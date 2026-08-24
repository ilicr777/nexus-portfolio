import { CopyCraftContent } from "./copycraft-content";
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
    title: "CopyCraft AI - Social Post Generator",
    description:
      locale === "it"
        ? "Genera post social accattivanti e ottimizzati per Instagram, LinkedIn e Facebook grazie all'intelligenza artificiale."
        : "Generate engaging and high-converting social media posts for Instagram, LinkedIn, and Facebook using AI.",
    path: "/projects/copycraft",
    locale,
  });
}

export default function CopyCraftPage() {
  return <CopyCraftContent />;
}
