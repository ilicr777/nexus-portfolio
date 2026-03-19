"use client";

import { motion } from "framer-motion";
import { TechMarquee } from "@/components/sections/about";
import { useDictionary } from "@/components/dictionary-provider";

export function TechStack() {
  const { dictionary } = useDictionary();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden border-y border-border/40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-muted/20" />
      </div>

      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
            {dictionary.about.techStack}
          </p>
          <div className="space-y-4">
            <TechMarquee direction="left" />
            <TechMarquee direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
