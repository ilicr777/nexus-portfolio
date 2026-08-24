"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Wand2, Globe, Shield, ShoppingCart, Github, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition } from "@/components/page-transition";
import { ScrollReveal, TextReveal } from "@/components/scroll-reveal";

// Project configuration with all metadata
const projectConfig = {
  copycraft: {
    icon: Wand2,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    glow: "bg-pink-500/20",
    link: "/projects/copycraft",
    linkType: "internal" as const,
    buttonText: "Live Demo",
    status: "live" as const,
  },
  menutranslator: {
    icon: Globe,
    gradient: "from-amber-400 via-orange-500 to-amber-600",
    glow: "bg-amber-500/20",
    link: "/projects/menu-translator",
    linkType: "internal" as const,
    buttonText: "Live Demo",
    status: "live" as const,
  },
  surfsec: {
    icon: Shield,
    gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    glow: "bg-blue-500/20",
    link: "/projects/surfsec",
    linkType: "internal" as const,
    buttonText: "Case Study",
    status: "live" as const,
  },
  secureguard: {
    icon: Github,
    gradient: "from-emerald-400 via-teal-500 to-emerald-600",
    glow: "bg-emerald-500/20",
    link: "https://github.com/ilicr777/secureguard-audit",
    linkType: "external" as const,
    buttonText: "View Code",
    status: "code" as const,
  },
  nexuscommerce: {
    icon: ShoppingCart,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    glow: "bg-purple-500/20",
    link: null,
    linkType: "disabled" as const,
    buttonText: "Coming Soon",
    status: "coming" as const,
  },
};

type ProjectKey = keyof typeof projectConfig;
const projectKeys: ProjectKey[] = ["copycraft", "menutranslator", "surfsec", "secureguard", "nexuscommerce"];

export function ProjectsContent() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const locale = params.locale as string;
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: dictionary.projects.filters.all },
    { id: "live", label: dictionary.projects.filters.liveDemo },
    { id: "code", label: dictionary.projects.filters.openSource },
    { id: "coming", label: dictionary.projects.filters.inDevelopment },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        
        {/* Premium Hero Section */}
        <section className="section-padding relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 bg-background">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
            />
            {/* Ultra-thin Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_80%)] opacity-[0.03]" />
          </div>

          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center">
              <ScrollReveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-xl text-sm font-semibold text-primary/80 uppercase tracking-widest shadow-sm mb-6">
                  {dictionary.projects.label}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                  <TextReveal text={dictionary.projects.title} />
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="mt-8 text-xl md:text-2xl text-muted-foreground font-light leading-relaxed text-balance">
                  {dictionary.projects.description}
                </p>
              </ScrollReveal>
            </div>

            {/* macOS Style Pill Filter */}
            <ScrollReveal delay={0.4}>
              <div className="flex justify-center mb-20">
                <div className="inline-flex items-center p-1.5 bg-card/40 backdrop-blur-xl border border-border/50 rounded-full shadow-lg relative z-20">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 z-10 ${
                        activeFilter === filter.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {activeFilter === filter.id && (
                        <motion.div
                          layoutId="activeFilter"
                          className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Alternating Showcase Layout */}
        <section className="container-padding mx-auto max-w-7xl space-y-32 md:space-y-48">
          {projectKeys.map((key, index) => {
            const project = dictionary.projects.items[key];
            const config = projectConfig[key];
            const Icon = config.icon;
            const isEven = index % 2 === 0;
            const isLive = config.status === "live";
            const isDisabled = config.linkType === "disabled";
            const isExternal = config.linkType === "external";
            
            // Apply filtering logic
            if (activeFilter !== "all" && config.status !== activeFilter) return null;

            return (
              <ScrollReveal key={key} delay={0.1}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                  
                  {/* Visual Anchor */}
                  <div className="w-full lg:w-1/2 relative group perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[3rem] transform -rotate-2 scale-105 opacity-50 blur-xl group-hover:opacity-100 group-hover:rotate-0 transition-all duration-700" />
                    
                    <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-[3rem] border border-border/40 bg-card/20 backdrop-blur-3xl overflow-hidden flex items-center justify-center shadow-2xl group-hover:-translate-y-2 transition-transform duration-700">
                      {/* Deep Glow inside */}
                      <div className={`absolute inset-0 opacity-40 blur-[100px] transition-opacity duration-700 group-hover:opacity-60 bg-gradient-to-br ${config.gradient}`} />
                      
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        className="relative z-10"
                      >
                        <Icon className="w-40 h-40 md:w-56 md:h-56 text-foreground opacity-90 drop-shadow-2xl filter" />
                      </motion.div>

                      {/* Status Badge */}
                      <div className="absolute top-8 right-8 z-20">
                        <div className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2">
                          {isLive && (
                            <>
                              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-xs font-bold text-green-400 tracking-wider">LIVE</span>
                            </>
                          )}
                          {config.status === "coming" && (
                            <>
                              <Clock className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs font-bold text-yellow-400 tracking-wider">SOON</span>
                            </>
                          )}
                          {config.status === "code" && (
                            <>
                              <Github className="w-3 h-3 text-cyan-400" />
                              <span className="text-xs font-bold text-cyan-400 tracking-wider">CODE</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="w-full lg:w-1/2 relative z-10">
                    <div className="absolute -left-12 -top-20 text-[12rem] font-black text-primary/[0.03] select-none pointer-events-none tracking-tighter">
                      0{index + 1}
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                      {project.title}
                    </h2>
                    
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8 max-w-xl text-balance">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/5 border border-primary/20 text-primary/80 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Premium CTA Button */}
                    <div>
                      {isDisabled ? (
                        <Button
                          variant="outline"
                          size="xl"
                          disabled
                          className="h-14 px-8 rounded-full gap-2 cursor-not-allowed opacity-50 text-lg"
                        >
                          {config.buttonText}
                        </Button>
                      ) : (
                        <div className="inline-flex relative group p-[1px] rounded-full overflow-hidden">
                          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          {isExternal ? (
                            <a href={config.link!} target="_blank" rel="noopener noreferrer" className="relative h-14 px-8 rounded-full bg-background/95 hover:bg-background text-foreground backdrop-blur-xl border-none shadow-2xl transition-all flex items-center gap-3 text-lg font-medium group/btn">
                              {config.buttonText}
                              <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                          ) : (
                            <Link href={`/${locale}${config.link!}`} className="relative h-14 px-8 rounded-full bg-background/95 hover:bg-background text-foreground backdrop-blur-xl border-none shadow-2xl transition-all flex items-center gap-3 text-lg font-medium group/btn">
                              {config.buttonText}
                              <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="mt-32 section-padding relative">
          <div className="container-padding mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="relative text-center p-12 md:p-20 rounded-[3rem] border border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
                
                <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">{dictionary.projects.cta.title}</h2>
                <p className="relative z-10 text-xl text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
                  {dictionary.projects.cta.description}
                </p>

                <div className="relative z-10 inline-flex group/cta p-[1px] rounded-full overflow-hidden">
                  <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-70 group-hover/cta:opacity-100 transition-opacity duration-700 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#393BB2_50%,#000000_100%)]" />
                  <Link href={`/${locale}/contact`} className="relative h-16 px-10 rounded-full bg-background hover:bg-background/90 text-foreground backdrop-blur-xl border-none shadow-2xl transition-all flex items-center gap-4 text-lg font-medium">
                    {dictionary.projects.cta.button}
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:bg-primary group-hover/cta:text-primary-foreground">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
