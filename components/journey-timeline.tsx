"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Gamepad2, BookOpen, ShieldCheck, Rocket } from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";

interface Milestone {
  icon: React.ElementType;
  phase: string;
  title: string;
  description: string;
}

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  isLast: boolean;
}

function MilestoneCard({ milestone, index, isLast }: MilestoneCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const Icon = milestone.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLast ? "" : "pb-16 md:pb-24"
      }`}
    >
      {/* Mobile: Always left-aligned */}
      {/* Desktop: Alternating sides */}
      <div
        className={`flex w-full items-center gap-4 md:gap-8 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
            isEven ? "md:text-right" : ""
          }`}
        >
          <div
            className={`group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 ${
              isEven ? "md:ml-auto" : ""
            }`}
          >
            {/* Glow on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

            {/* Phase Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3"
            >
              {milestone.phase}
            </motion.span>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {milestone.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </motion.div>

        {/* Center Icon Node - Desktop only, positioned absolutely */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
          className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20"
        >
          <div className="relative">
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            
            {/* Icon container */}
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Empty space for the other side on desktop */}
        <div className="hidden md:block md:w-[calc(50%-40px)]" />
      </div>
    </div>
  );
}

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dictionary } = useDictionary();
  const t = dictionary.timeline;

  // Build milestones from dictionary
  const milestones: Milestone[] = [
    {
      icon: Gamepad2,
      phase: t.milestones.origins.phase,
      title: t.milestones.origins.title,
      description: t.milestones.origins.description,
    },
    {
      icon: BookOpen,
      phase: t.milestones.dualPath.phase,
      title: t.milestones.dualPath.title,
      description: t.milestones.dualPath.description,
    },
    {
      icon: ShieldCheck,
      phase: t.milestones.choice.phase,
      title: t.milestones.choice.title,
      description: t.milestones.choice.description,
    },
    {
      icon: Rocket,
      phase: t.milestones.nexus.phase,
      title: t.milestones.nexus.title,
      description: t.milestones.nexus.description,
    },
  ];

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the scroll progress for a more fluid animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-padding mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-6"
          >
            ✨ {t.badge}
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.title}{" "}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Background Timeline Line (gray) */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-border" />

          {/* Animated Fill Line */}
          <motion.div
            className="absolute left-7 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-primary via-primary to-primary/50 origin-top"
            style={{ scaleY, height: "100%" }}
          />

          {/* Milestones */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.title}
                milestone={milestone}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>

          {/* End Cap */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-4 left-7 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
          />
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-muted-foreground mb-2">
            {t.cta.question}
          </p>
          <p className="text-xl font-semibold gradient-text">
            {t.cta.answer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
