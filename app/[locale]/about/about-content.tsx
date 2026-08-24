"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ScrollReveal, FloatingElement, TextReveal } from "@/components/scroll-reveal";
import { JourneyTimeline } from "@/components/journey-timeline";
import { Code2, Server, Database, GitBranch, Box, ShieldCheck, Terminal, Cpu } from "lucide-react";

interface TechIcon {
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "database" | "tools";
}

const techStack: TechIcon[] = [
  // Frontend
  { name: "React", icon: <Code2 className="w-6 h-6" />, category: "frontend" },
  { name: "Next.js", icon: <Box className="w-6 h-6" />, category: "frontend" },
  { name: "Tailwind CSS", icon: <Box className="w-6 h-6" />, category: "frontend" },
  { name: "TypeScript", icon: <Code2 className="w-6 h-6" />, category: "frontend" },
  // Backend & Security
  { name: "Node.js", icon: <Server className="w-6 h-6" />, category: "backend" },
  { name: "Python", icon: <Terminal className="w-6 h-6" />, category: "backend" },
  { name: "Security", icon: <ShieldCheck className="w-6 h-6" />, category: "backend" },
  // Database
  { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, category: "database" },
  // Tools
  { name: "Git", icon: <GitBranch className="w-6 h-6" />, category: "tools" },
  { name: "Docker", icon: <Cpu className="w-6 h-6" />, category: "tools" },
];

export function AboutContent() {
  const { dictionary } = useDictionary();
  const techRef = useRef(null);
  const isTechInView = useInView(techRef, { once: true, margin: "-50px" });

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        
        {/* Hero Section with Profile */}
        <section className="section-padding relative overflow-hidden">
          {/* Premium Background Elements */}
          <div className="absolute inset-0 -z-10 bg-background">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" 
            />
            {/* Ultra-thin Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_80%)] opacity-[0.03]" />
          </div>

          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              
              {/* Premium Founder Card Image */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="relative flex justify-center lg:justify-start">
                  <FloatingElement duration={6} distance={10}>
                    <div className="relative group p-[2px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                      {/* Animated Gradient Border */}
                      <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#393BB2_50%,#000000_100%)]" />
                      
                      {/* Image Container */}
                      <div className="relative w-72 h-80 md:w-80 md:h-[22rem] lg:w-[26rem] lg:h-[30rem] rounded-[2.4rem] overflow-hidden bg-background">
                        <div className="absolute inset-0 bg-foreground/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                        <Image
                          src="/profile.jpg"
                          alt={dictionary.about.profileAlt}
                          fill
                          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
                          priority
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-20" />
                        
                        {/* Floating Badge inside Image */}
                        <div className="absolute bottom-6 left-6 right-6 z-30 flex justify-center">
                          <div className="px-6 py-3 rounded-2xl bg-background/60 backdrop-blur-md border border-white/10 shadow-lg">
                            <p className="text-sm font-mono text-primary font-bold tracking-widest uppercase">FOUNDER & ENGINEER</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </ScrollReveal>

              {/* Content */}
              <div className="space-y-8">
                <ScrollReveal delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-xl text-sm font-semibold text-primary/80 uppercase tracking-widest shadow-sm">
                    {dictionary.about.label}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                    <TextReveal text={dictionary.about.title} />
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light text-balance">
                    {dictionary.about.description}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Values Cards */}
        <section className="py-20">
          <div className="container-padding mx-auto max-w-7xl">
            <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(dictionary.about.cards).map(([key, card], index) => {
                const gradients = [
                  "from-blue-500/10 via-cyan-500/5",
                  "from-emerald-500/10 via-green-500/5",
                  "from-purple-500/10 via-pink-500/5"
                ];

                return (
                  <StaggerItem key={key}>
                    <div className="group relative p-8 md:p-10 rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 shadow-soft hover:shadow-2xl hover:-translate-y-2 overflow-hidden h-full">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 3]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      
                      <div className="relative z-10">
                        <div className="text-primary/50 text-4xl font-black mb-6 opacity-30 group-hover:opacity-100 transition-opacity">0{index + 1}</div>
                        <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                          {(card as { title: string; description: string }).title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed font-light">
                          {(card as { title: string; description: string }).description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Journey Timeline */}
        <JourneyTimeline />

        {/* Tech Stack (Bento/Pill Grid) */}
        <section className="py-32 relative" ref={techRef}>
          <div className="absolute inset-0 bg-muted/20 border-t border-border/30" />
          
          <div className="container-padding mx-auto max-w-7xl relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">{dictionary.about.techStack}</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                  Le tecnologie che uso quotidianamente per costruire infrastrutture sicure ed esperienze digitali eccezionali.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto"
              initial="hidden"
              animate={isTechInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-primary/40 hover:bg-card transition-all duration-300 cursor-default group"
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-lg font-semibold tracking-tight">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
