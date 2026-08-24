import { MenuTranslatorContent } from "./menu-translator-content";
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
    title: "MenuTranslator AI - AI Restaurant Menu Translation",
    description:
      locale === "it"
        ? "Traduci e valorizza i piatti e le descrizioni dei menu del tuo ristorante in più lingue con Gemini AI."
        : "Translate and enrich your restaurant menus into multiple languages preserving culinary nuances with Gemini AI.",
    path: "/projects/menu-translator",
    locale,
  });
}

export default function MenuTranslatorPage() {
  return <MenuTranslatorContent />;
}
