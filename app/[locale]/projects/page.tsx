"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sparkles, Wand2, Globe, Shield, ShoppingCart, Github, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition } from "@/components/page-transition";
import { ScrollReveal } from "@/components/scroll-reveal";

// Project configuration with all metadata
const projectConfig = {
  copycraft: {
    icon: Wand2,
    gradient: "from-pink-500/20 to-rose-500/20",
    accent: "group-hover:text-pink-400",
    iconBg: "bg-pink-500/10",
    link: "/projects/copycraft",
    linkType: "internal" as const,
    buttonText: "Live Demo ✨",
    buttonIcon: Sparkles,
    status: "live" as const,
  },
  menutranslator: {
    icon: Globe,
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "group-hover:text-amber-400",
    iconBg: "bg-amber-500/10",
    link: "/projects/menu-translator",
    linkType: "internal" as const,
    buttonText: "Live Demo 🌍",
    buttonIcon: Globe,
    status: "live" as const,
  },
  secureguard: {
    icon: Shield,
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "group-hover:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    link: "https://github.com/ilicr777/secureguard-audit",
    linkType: "external" as const,
    buttonText: "View Code 🔒",
    buttonIcon: Github,
    status: "code" as const,
  },
  nexuscommerce: {
    icon: ShoppingCart,
    gradient: "from-violet-500/20 to-purple-500/20",
    accent: "group-hover:text-violet-400",
    iconBg: "bg-violet-500/10",
    link: null,
    linkType: "disabled" as const,
    buttonText: "Coming Soon 🚧",
    buttonIcon: Clock,
    status: "coming" as const,
  },
};

type ProjectKey = keyof typeof projectConfig;

export default function ProjectsPage() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const locale = params.locale as string;
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true });

  const projectKeys: ProjectKey[] = ["copycraft", "menutranslator", "secureguard", "nexuscommerce"];

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container-padding mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {dictionary.projects.label}
                </span>
                <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {dictionary.projects.title}
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                  {dictionary.projects.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Filter Tabs (decorative for now) */}
            <ScrollReveal delay={0.2}>
              <div className="flex justify-center gap-2 mb-12 flex-wrap">
                {[
                  dictionary.projects.filters.all,
                  dictionary.projects.filters.liveDemo,
                  dictionary.projects.filters.openSource,
                  dictionary.projects.filters.inDevelopment
                ].map((tab, index) => (
                  <Button
                    key={tab}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container-padding mx-auto max-w-7xl" ref={gridRef}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {projectKeys.map((key, index) => {
              const project = dictionary.projects.items[key];
              const config = projectConfig[key];
              const Icon = config.icon;
              const ButtonIcon = config.buttonIcon;
              const isLive = config.status === "live";
              const isDisabled = config.linkType === "disabled";
              const isExternal = config.linkType === "external";

              return (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group relative"
                >
                  <div className="relative h-full p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      {isLive && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                      {config.status === "coming" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          <Clock className="w-3 h-3" />
                          SOON
                        </span>
                      )}
                      {config.status === "code" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          <Github className="w-3 h-3" />
                          OPEN SOURCE
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center mb-6 ${config.accent} transition-colors duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex gap-3">
                        {isDisabled ? (
                          <Button
                            variant="outline"
                            size="lg"
                            disabled
                            className="gap-2 cursor-not-allowed opacity-50"
                          >
                            <ButtonIcon className="h-4 w-4" />
                            {config.buttonText}
                          </Button>
                        ) : isExternal ? (
                          <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="gap-2 group/btn"
                          >
                            <a href={config.link!} target="_blank" rel="noopener noreferrer">
                              <ButtonIcon className="h-4 w-4" />
                              {config.buttonText}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                          </Button>
                        ) : (
                          <Button
                            asChild
                            variant="glow"
                            size="lg"
                            className="gap-2 group/btn"
                          >
                            <Link href={`/${locale}${config.link!}`}>
                              <ButtonIcon className="h-4 w-4" />
                              {config.buttonText}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="section-padding mt-12">
          <div className="container-padding mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center p-12 rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">{dictionary.projects.cta.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {dictionary.projects.cta.description}
                </p>
                <Button asChild variant="glow" size="lg">
                  <Link href={`/${locale}/contact`}>
                    {dictionary.projects.cta.button}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
