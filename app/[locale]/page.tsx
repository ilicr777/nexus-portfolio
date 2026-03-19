import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { PageTransition } from "@/components/page-transition";

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
