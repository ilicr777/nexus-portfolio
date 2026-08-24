import { ContactContent } from "./contact-content";
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
    title: locale === "it" ? "Contatti | Inizia un Progetto" : "Contact | Start a Project",
    description:
      locale === "it"
        ? "Hai un progetto in mente o hai bisogno di una consulenza tecnica/security? Contattami per una risposta entro 24 ore."
        : "Have a project in mind or need technical/security consulting? Get in touch for a response within 24 hours.",
    path: "/contact",
    locale,
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
