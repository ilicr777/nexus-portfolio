"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDictionary } from "@/components/dictionary-provider";

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
  { name: "HTML5", icon: "🌐", category: "frontend" },
  { name: "JavaScript", icon: "JS", category: "frontend" },
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
  { name: "Figma", icon: "🎯", category: "tools" },
];

function TechMarquee({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-8 md:gap-12"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...techStack, ...techStack].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300 cursor-default whitespace-nowrap"
          >
            <span className="text-xl">{tech.icon}</span>
            <span className="text-sm font-medium text-muted-foreground">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { dictionary } = useDictionary();

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
              {dictionary.about.label}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {dictionary.about.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.about.description}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {/* Main Card - Large */}
            <div className="md:col-span-2 lg:col-span-2 p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    {dictionary.about.cards.approach.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {dictionary.about.cards.approach.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Problem Solver", "Detail-Oriented", "Results-Driven"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">By the Numbers</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="text-2xl font-bold gradient-text">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Happy Clients</span>
                  <span className="text-2xl font-bold gradient-text">40+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Coffee Cups</span>
                  <span className="text-2xl font-bold gradient-text">∞</span>
                </div>
              </div>
            </div>

            {/* Learning Card */}
            <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{dictionary.about.cards.learning.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {dictionary.about.cards.learning.description}
              </p>
            </div>

            {/* Experience Card */}
            <div className="md:col-span-2 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {dictionary.about.cards.quality.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {dictionary.about.cards.quality.description}
              </p>
            </div>
          </motion.div>

          {/* Tech Stack Marquee */}
          <motion.div variants={itemVariants} className="mt-16">
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider">
              {dictionary.about.techStack}
            </p>
            <div className="space-y-4">
              <TechMarquee direction="left" />
              <TechMarquee direction="right" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
