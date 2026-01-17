"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, User, Briefcase, Mail, Code2, Sparkles } from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface HighlightCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  learnMore: string;
  delay?: number;
}

function HighlightCard({ href, icon, title, description, gradient, learnMore, delay = 0 }: HighlightCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <Link href={href} className="block">
        {/* Glow Effect */}
        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50`} />
        
        {/* Card */}
        <div className="relative h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-card/80">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} mb-6 transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
          
          {/* Arrow */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              {learnMore}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Highlights() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const locale = params.locale as string;
  const learnMore = dictionary.highlights?.learnMore || "Learn more";

  const highlights = [
    {
      href: `/${locale}/about`,
      icon: <User className="h-6 w-6 text-white" />,
      title: dictionary.highlights?.about?.title || "About Me",
      description: dictionary.highlights?.about?.description || "Discover my story, technical skills, and the path that led me to become a specialized web developer.",
      gradient: "from-violet-500 to-purple-600",
      learnMore,
    },
    {
      href: `/${locale}/projects`,
      icon: <Code2 className="h-6 w-6 text-white" />,
      title: dictionary.highlights?.projects?.title || "Projects",
      description: dictionary.highlights?.projects?.description || "Explore my portfolio: AI applications, e-commerce, security systems, and much more.",
      gradient: "from-blue-500 to-cyan-500",
      learnMore,
    },
    {
      href: `/${locale}/contact`,
      icon: <Mail className="h-6 w-6 text-white" />,
      title: dictionary.highlights?.contact?.title || "Contact",
      description: dictionary.highlights?.contact?.description || "Have a project in mind? Let's talk! I'm always open to new collaborations.",
      gradient: "from-emerald-500 to-teal-500",
      learnMore,
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {dictionary.highlights?.badge || "Explore"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {dictionary.highlights?.title || "What I Can Offer"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {dictionary.highlights?.subtitle || "Navigate through the sections to discover who I am, what I do, and how we can work together."}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.href} {...highlight} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Featured Project Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <Link href={`/${locale}/projects`} className="group block">
            <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-primary/50">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
              
              {/* Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-50" />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Briefcase className="h-3.5 w-3.5" />
                    {dictionary.highlights?.featured?.badge || "Featured Project"}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    {dictionary.highlights?.featured?.title || "CopyCraft AI"}
                  </h3>
                  <p className="text-muted-foreground max-w-lg">
                    {dictionary.highlights?.featured?.description || "Advanced AI-powered marketing copy generator. Create persuasive content in seconds."}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 group-hover:gap-4">
                    {dictionary.highlights?.featured?.cta || "View Demo"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
