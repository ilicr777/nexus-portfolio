"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Zap, ShieldCheck, PenTool, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { TerminalTyping, GlitchText, CyberLine } from "@/components/ui/cyber-effects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Hero() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const locale = params.locale as string;
  const [headlineComplete, setHeadlineComplete] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 -z-20">
        <MatrixRain 
          className="opacity-30" 
          color="var(--primary)" 
          speed={1.2}
          density={0.7}
        />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Animated Cyber Lines */}
        <div className="absolute top-20 left-0 right-0">
          <CyberLine />
        </div>
        <div className="absolute bottom-32 left-0 right-0">
          <CyberLine />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 scanline pointer-events-none opacity-10" />
      </div>

      <div className="container-padding mx-auto max-w-7xl pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge - Terminal Style */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-black/50 backdrop-blur-sm mb-8 font-mono text-sm">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-emerald-400">$</span>
              <TerminalTyping 
                text={dictionary.hero.badge} 
                speed={40}
                className="text-muted-foreground"
              />
            </div>
          </motion.div>

          {/* Main Headline - Cyberpunk Style */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl"
          >
            {dictionary.hero.headline1}{" "}
            <span className="relative">
              <GlitchText 
                text={dictionary.hero.headline2} 
                className="gradient-text"
                intensity="low"
              />
              <motion.span
                className="absolute -top-1 -right-6 md:-right-8"
                variants={floatingVariants}
                animate="animate"
              >
                <Code2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </motion.span>
            </span>
            <br />
            <span className="text-muted-foreground">{dictionary.hero.headline3}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed"
          >
            {dictionary.hero.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button asChild variant="cyber" size="xl" className="group">
              <Link href={`/${locale}/projects`}>
                <span className="relative z-10 flex items-center gap-2">
                  {dictionary.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-primary/30 hover:border-primary/60 hover:bg-primary/5">
              <Link href={`/${locale}/contact`}>{dictionary.hero.ctaSecondary}</Link>
            </Button>
          </motion.div>

          {/* Core Values */}
          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            {[
              {
                icon: ShieldCheck,
                title: dictionary.coreValues.security.title,
                description: dictionary.coreValues.security.description,
                accent: "text-red-400",
                border: "hover:border-red-500/50",
              },
              {
                icon: Zap,
                title: dictionary.coreValues.performance.title,
                description: dictionary.coreValues.performance.description,
                accent: "text-yellow-400",
                border: "hover:border-yellow-500/50",
              },
              {
                icon: PenTool,
                title: dictionary.coreValues.custom.title,
                description: dictionary.coreValues.custom.description,
                accent: "text-cyan-400",
                border: "hover:border-cyan-500/50",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative p-6 rounded-2xl border border-border bg-black/30 backdrop-blur-sm ${value.border} hover:bg-black/50 transition-all duration-300 card-cyber`}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/50" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/50" />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors`}>
                  <value.icon className={`w-6 h-6 ${value.accent}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {dictionary.hero.scroll}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
