"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Terminal, Code2 } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { ProjectFrontmatter } from "@/lib/mdx";

export function ProjectLayout({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: ProjectFrontmatter;
}) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none opacity-50" />
        </div>

        {/* Header */}
        <header className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container-padding mx-auto max-w-7xl py-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                <span className="font-mono font-semibold text-white">Project Case Study</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-padding mx-auto max-w-4xl py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title Section */}
            <div className="border-b border-cyan-500/20 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 mb-4">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="font-mono text-sm text-cyan-400">ARCHITECTURE DOC</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-cyan-400 font-mono mb-6">
                {frontmatter.subtitle}
              </p>
              <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                {frontmatter.description}
              </p>

              {/* Tech Stack Bar */}
              <div className="flex flex-wrap items-center gap-4">
                {frontmatter.techStack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800"
                  >
                    <Code2 className="h-4 w-4 text-cyan-500" />
                    <span className="font-mono text-xs">{tech}</span>
                  </div>
                ))}
              </div>

              {/* Status Section */}
              <div className="mt-8 pt-6 flex justify-between items-center bg-black/40 p-4 rounded border border-zinc-800">
                <span className="text-xs text-zinc-500 font-mono">Status: {frontmatter.status}</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-500 font-mono">{frontmatter.systemStatus}</span>
                </div>
              </div>
            </div>

            {/* MDX Document Body (Server Side Injected) */}
            <div className="mt-12">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
    </PageTransition>
  );
}
