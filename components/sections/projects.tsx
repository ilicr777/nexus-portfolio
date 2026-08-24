"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Sparkles, Wand2, Globe, Shield, ShoppingCart, Github, Clock, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Project configuration with all metadata
const projectConfig = {
  copycraft: {
    icon: Wand2,
    gradient: "from-pink-500/20 to-rose-500/20",
    accent: "group-hover:text-pink-400",
    link: "/projects/copycraft",
    linkType: "internal" as const,
    buttonText: "Live Demo",
    buttonIcon: Sparkles,
    status: "live" as const,
  },
  menutranslator: {
    icon: Globe,
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "group-hover:text-amber-400",
    link: "/projects/menu-translator",
    linkType: "internal" as const,
    buttonText: "Live Demo",
    buttonIcon: Globe,
    status: "live" as const,
  },
  secureguard: {
    icon: Shield,
    gradient: "from-emerald-500/20 to-teal-500/20",
    accent: "group-hover:text-emerald-400",
    link: "https://github.com/ilicr777/secureguard-audit",
    linkType: "external" as const,
    buttonText: "View Code",
    buttonIcon: Github,
    status: "code" as const,
  },
  nexuscommerce: {
    icon: ShoppingCart,
    gradient: "from-violet-500/20 to-purple-500/20",
    accent: "group-hover:text-violet-400",
    link: null,
    linkType: "disabled" as const,
    buttonText: "Coming Soon",
    buttonIcon: Clock,
    status: "coming" as const,
  },
  surfsec: {
    icon: Scan,
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "group-hover:text-cyan-400",
    link: "/projects/surfsec",
    linkType: "internal" as const,
    buttonText: "Case Study",
    buttonIcon: Shield,
    status: "live" as const,
  },
};

type ProjectKey = keyof typeof projectConfig;

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { dictionary, locale } = useDictionary();

  const projectKeys: ProjectKey[] = ["copycraft", "menutranslator", "surfsec", "secureguard", "nexuscommerce"];

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {dictionary.projects.label}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-foreground text-balance">
              {dictionary.projects.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.projects.description}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectKeys.map((key) => {
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
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="relative h-full p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 shadow-soft hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                      {isLive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                      {config.status === "coming" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 backdrop-blur-md">
                          <Clock className="w-3 h-3" />
                          SOON
                        </span>
                      )}
                      {config.status === "code" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                          <Github className="w-3 h-3" />
                          CODE
                        </span>
                      )}
                    </div>

                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${config.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {/* Icon & Title - with pr-20 to never collide with top-right badge */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 pr-20">
                          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-foreground/5 transition-all duration-500 ${config.accent} group-hover:bg-foreground/10 shrink-0`}>
                            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {isDisabled ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="w-full sm:w-auto gap-2 cursor-not-allowed opacity-50 justify-center"
                          >
                            <ButtonIcon className="h-4 w-4" />
                            {config.buttonText}
                          </Button>
                        ) : isExternal ? (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto gap-2 justify-center"
                          >
                            <a href={config.link!} target="_blank" rel="noopener noreferrer">
                              <ButtonIcon className="h-4 w-4" />
                              {config.buttonText}
                            </a>
                          </Button>
                        ) : (
                          <Button
                            asChild
                            variant="glow"
                            size="sm"
                            className="w-full sm:w-auto gap-2 justify-center"
                          >
                            <Link href={`/${locale}${config.link!}`}>
                              <ButtonIcon className="h-4 w-4" />
                              {config.buttonText}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
