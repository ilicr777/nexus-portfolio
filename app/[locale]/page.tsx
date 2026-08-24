import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { PageTransition } from "@/components/page-transition";
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
    title:
      locale === "it"
        ? "Sviluppatore Full-Stack Freelance & Cybersecurity"
        : "Freelance Full-Stack Developer & Cybersecurity",
    description:
      locale === "it"
        ? "Non scrivo solo codice: realizzo architetture digitali sicure, veloci e costruite per scalare. Specializzato in Next.js, TypeScript e Cybersecurity."
        : "Building the web of tomorrow, today. Freelance Full-Stack Developer delivering pixel-perfect, high-performance, and secure digital experiences.",
    path: "",
    locale,
  });
}

export default function Home() {
  return (
    <PageTransition>
      {/* 1 — Hero: singola CTA orientata al contatto */}
      <Hero />
      {/* 2 — Social Proof: stack tecnico, abbassa la diffidenza */}
      <TechStack />
      {/* 3 — Progetti in evidenza: prova tangibile prima della proposta */}
      <Projects />
      {/* 4 — Value Proposition: i 3 step concreti dopo aver visto il lavoro */}
      <Services />
    </PageTransition>
  );
}
