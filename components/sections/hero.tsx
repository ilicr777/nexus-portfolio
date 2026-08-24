"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { TerminalTyping } from "@/components/ui/cyber-effects";

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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Hero() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements - Clean & Premium */}
      <div className="absolute inset-0 -z-10 bg-background pointer-events-none">
        {/* Soft Glow Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] sm:blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]" 
        />
        
        {/* Ultra-thin Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_80%)] opacity-[0.03]" />
      </div>

      <div className="container-padding mx-auto max-w-7xl pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-xl mb-6 sm:mb-8 text-xs sm:text-sm shadow-sm hover:border-primary/30 transition-colors">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="text-primary font-mono opacity-80">$</span>
              <TerminalTyping 
                text={dictionary.hero.badge} 
                speed={40}
                className="text-foreground/80 font-medium tracking-wide"
              />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter max-w-5xl text-foreground leading-[1.15] sm:leading-[1.1]"
          >
            {dictionary.hero.headline1}{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-emerald-500">
                {dictionary.hero.headline2}
              </span>
              <motion.span
                className="absolute -top-1 -right-6 sm:-top-2 sm:-right-8 md:-right-12"
                variants={floatingVariants}
                animate="animate"
              >
                <Code2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary opacity-80" />
              </motion.span>
            </span>
            <br />
            <span className="text-muted-foreground/80 font-semibold">{dictionary.hero.headline3}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-xl md:text-2xl mb-2 sm:mb-4 text-muted-foreground font-light max-w-3xl text-balance leading-relaxed"
          >
            {dictionary.hero.subheadline}
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 md:mt-16 w-full sm:w-auto flex justify-center"
          >
            <div className="relative group p-[1px] rounded-full overflow-hidden w-full sm:w-auto max-w-xs sm:max-w-none">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-700 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#393BB2_50%,#000000_100%)]" />
              <Button asChild size="xl" className="relative h-14 sm:h-16 px-6 sm:px-10 rounded-full bg-background/95 hover:bg-background text-foreground backdrop-blur-xl border-none shadow-2xl transition-all flex items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg w-full sm:w-auto">
                <Link href={`/${locale}/contact`}>
                  <span>{dictionary.hero.ctaPrimary}</span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground shrink-0">
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Desktop Only to prevent overlap on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:flex absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
            {dictionary.hero.scroll}
          </span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
