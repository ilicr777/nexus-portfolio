"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// Icons removed - location and CV button no longer needed
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition } from "@/components/page-transition";
import { ScrollReveal, FloatingElement } from "@/components/scroll-reveal";
import { JourneyTimeline } from "@/components/journey-timeline";

interface TechIcon {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools";
}

const techStack: TechIcon[] = [
  // Frontend
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "TypeScript", icon: "TS", category: "frontend" },
  // Backend
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Python", icon: "🐍", category: "backend" },
  // Database
  { name: "PostgreSQL", icon: "🐘", category: "database" },
  { name: "MySQL", icon: "🐬", category: "database" },
  // Tools
  { name: "Git", icon: "📦", category: "tools" },
  { name: "Docker", icon: "🐳", category: "tools" },
];

export default function AboutPage() {
  const { dictionary } = useDictionary();
  const techRef = useRef(null);
  const isTechInView = useInView(techRef, { once: true });

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Section with Profile */}
        <section className="section-padding relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Profile Image */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative flex justify-center lg:justify-start">
                  <FloatingElement duration={5} distance={8}>
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-2xl blur-lg opacity-50 animate-pulse" />
                      
                      {/* Image Container */}
                      <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-2 border-primary/50">
                        <Image
                          src="/profile.jpg"
                          alt={dictionary.about.profileAlt}
                          fill
                          className="object-cover"
                          priority
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      </div>


                    </div>
                  </FloatingElement>
                </div>
              </ScrollReveal>

              {/* Content */}
              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    {dictionary.about.label}
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    {dictionary.about.title}
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {dictionary.about.description}
                  </p>
                </ScrollReveal>


              </div>
            </div>
          </div>
        </section>

        {/* Values Cards */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(dictionary.about.cards).map(([key, card], index) => (
                <ScrollReveal key={key} delay={index * 0.1}>
                  <motion.div
                    className="group p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {(card as { title: string; description: string }).title}
                    </h3>
                    <p className="text-muted-foreground">
                      {(card as { title: string; description: string }).description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <JourneyTimeline />

        {/* Tech Stack */}
        <section className="section-padding" ref={techRef}>
          <div className="container-padding mx-auto max-w-7xl">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-4">{dictionary.about.techStack}</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Le tecnologie che uso quotidianamente per costruire esperienze digitali eccezionali.
              </p>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              initial="hidden"
              animate={isTechInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300 cursor-default"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
