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
    buttonText: "Live Demo ✨",
    buttonIcon: Sparkles,
    status: "live" as const,
  },
  menutranslator: {
    icon: Globe,
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "group-hover:text-amber-400",
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
    link: null,
    linkType: "disabled" as const,
    buttonText: "Coming Soon 🚧",
    buttonIcon: Clock,
    status: "coming" as const,
  },
  securityscanner: {
    icon: Scan,
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "group-hover:text-cyan-400",
    link: "/projects/security-scanner",
    linkType: "internal" as const,
    buttonText: "Try Scanner 🔒",
    buttonIcon: Shield,
    status: "live" as const,
  },
};

type ProjectKey = keyof typeof projectConfig;

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { dictionary } = useDictionary();

  const projectKeys: ProjectKey[] = ["copycraft", "menutranslator", "securityscanner", "secureguard", "nexuscommerce"];

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
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
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
                  <div className="relative h-full p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      {isLive && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          LIVE
                        </span>
                      )}
                      {config.status === "coming" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          <Clock className="w-3 h-3" />
                          SOON
                        </span>
                      )}
                      {config.status === "code" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          <Github className="w-3 h-3" />
                          CODE
                        </span>
                      )}
                    </div>

                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-primary/10 transition-colors duration-300 ${config.accent}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
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
                            size="sm"
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
                            size="sm"
                            className="gap-2"
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
                            className="gap-2"
                          >
                            <Link href={config.link!}>
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
