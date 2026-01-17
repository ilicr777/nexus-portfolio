"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Shield, ArrowUpRight } from "lucide-react";
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

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Link */}
        <div className="mt-6 pt-6 border-t border-border">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300"
          >
            {service.learnMore}
            <ArrowUpRight className="h-4 w-4" />
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
      icon: <Code className="h-6 w-6" />,
      title: dictionary.services.items.webDev.title,
      description: dictionary.services.items.webDev.description,
      features: dictionary.services.items.webDev.features,
      learnMore: dictionary.services.learnMore,
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: dictionary.services.items.design.title,
      description: dictionary.services.items.design.description,
      features: dictionary.services.items.design.features,
      learnMore: dictionary.services.learnMore,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: dictionary.services.items.security.title,
      description: dictionary.services.items.security.description,
      features: dictionary.services.items.security.features,
      learnMore: dictionary.services.learnMore,
    },
  ];

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-muted/30"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
              {dictionary.services.label}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {dictionary.services.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.services.description}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              {dictionary.services.cta.question}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline underline-offset-4"
            >
              {dictionary.services.cta.link}
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
