"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, ShieldAlert, Terminal, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/components/dictionary-provider";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  learnMore: string;
}

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

function ServiceCard({ service, index }: { service: Service, index: number }) {
  // Use slightly different gradients for each card
  const gradients = [
    "from-blue-500/10 via-cyan-500/5",
    "from-red-500/10 via-orange-500/5",
    "from-emerald-500/10 via-green-500/5"
  ];
  
  const colors = [
    "text-blue-500 group-hover:text-blue-400 group-hover:bg-blue-500/10",
    "text-red-500 group-hover:text-red-400 group-hover:bg-red-500/10",
    "text-emerald-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10"
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="group relative p-8 md:p-10 rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 shadow-soft hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground/5 mb-8 transition-all duration-500 ${colors[index]}`}>
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight mb-4 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8 font-light">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-muted-foreground font-medium"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Link */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group/link"
          >
            {service.learnMore}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { dictionary } = useDictionary();

  const services: Service[] = [
    {
      icon: <Server className="h-8 w-8" />,
      title: dictionary.services.items.fullStack.title,
      description: dictionary.services.items.fullStack.description,
      features: dictionary.services.items.fullStack.features,
      learnMore: dictionary.services.learnMore,
    },
    {
      icon: <ShieldAlert className="h-8 w-8" />,
      title: dictionary.services.items.penTesting.title,
      description: dictionary.services.items.penTesting.description,
      features: dictionary.services.items.penTesting.features,
      learnMore: dictionary.services.learnMore,
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: dictionary.services.items.automation.title,
      description: dictionary.services.items.automation.description,
      features: dictionary.services.items.automation.features,
      learnMore: dictionary.services.learnMore,
    },
  ];

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-sm font-semibold text-primary/80 uppercase tracking-widest">
              {dictionary.services.label}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground text-balance">
              {dictionary.services.title}
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              {dictionary.services.description}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground/80 mb-6 text-lg">
              {dictionary.services.cta.question}
            </p>
            <div className="inline-flex relative group p-[1px] rounded-full overflow-hidden">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-card/90 backdrop-blur-xl border border-border/50 text-foreground font-medium hover:bg-background transition-all"
              >
                {dictionary.services.cta.link}
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
