"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Terminal, Lock, Code2, Database, Mail } from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition } from "@/components/page-transition";

export default function SurfSecPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.demos?.surfsec || {
    title: "SurfSec Intelligence",
    subtitle: "External Attack Surface Management",
    description: "Enterprise-grade automated security intelligence platform. Built with Python and Streamlit, it helps digital agencies proactively identify vulnerabilities in their clients' web properties before attackers do.",
    features: {
      title: "Core Capabilities",
      items: [
        "SSL & Certificate Validation Tracking",
        "Comprehensive Security Headers Assessment",
        "Sensitive File Exposure Detection (.env, .git)",
        "Intelligent Agency Portfolio Crawler",
        "Automated Branded Outreach System",
        "Professional HTML Security Reports",
        "GDPR-Compliant Anonymous Telemetry"
      ]
    },
    disclaimer: "This is a backend Python application and cannot be run directly in the browser.",
    backToProjects: "Back to Projects",
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Scanlines Effect */}
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
                <span>{t.backToProjects}</span>
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                <span className="font-mono font-semibold text-white">SurfSec</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-padding mx-auto max-w-7xl py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Title Section */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 mb-4">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-sm text-cyan-400">ENTERPRISE ASM</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                  {t.title}
                </h1>
                <p className="text-xl text-cyan-400 font-mono">
                  {t.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed text-lg">
                {t.description}
              </p>

              {/* Features List */}
              <div className="space-y-4">
                <h2 className="font-mono text-lg text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  {t.features.title}
                </h2>
                <ul className="space-y-3">
                  {t.features.items.map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3 text-zinc-300 font-mono text-[15px] bg-cyan-500/5 p-3 rounded border border-cyan-500/10"
                    >
                      <span className="text-cyan-400">▹</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badge */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                  <Code2 className="h-4 w-4 text-cyan-500" />
                  <span className="font-mono text-xs">Python 3.11+</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                  <Terminal className="h-4 w-4 text-green-500" />
                  <span className="font-mono text-xs">FastAPI</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                  <Database className="h-4 w-4 text-emerald-500" />
                  <span className="font-mono text-xs">Supabase</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                  <Terminal className="h-4 w-4 text-red-500" />
                  <span className="font-mono text-xs">Streamlit UI</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 border border-zinc-800 rounded bg-zinc-900/50 mt-8">
                <p className="font-mono text-sm text-zinc-400">
                  ℹ️ {t.disclaimer}
                </p>
              </div>
            </motion.div>

            {/* Right Column - Conceptual Architecture Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:mt-12"
            >
              <div className="relative border border-cyan-500/30 bg-card/80 backdrop-blur-xl rounded-lg p-6 shadow-2xl">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />
                
                <h3 className="font-mono text-xl text-white mb-6 border-b border-cyan-500/30 pb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-cyan-400" />
                  Architecture Overview
                </h3>

                <div className="space-y-6 font-mono text-sm">
                  <div className="p-4 rounded border border-zinc-700 bg-black/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-400 font-bold">1. Portfolio Scout</span>
                      <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">BeautifulSoup4</span>
                    </div>
                    <p className="text-zinc-400 text-xs">Crawls agency websites to discover client targets dynamically.</p>
                  </div>

                  <div className="p-4 rounded border border-zinc-700 bg-black/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-bold">2. Security Scanner</span>
                      <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">Requests + Core</span>
                    </div>
                    <p className="text-zinc-400 text-xs">Validates SSL, checks security headers, and finds exposed files.</p>
                  </div>

                  <div className="p-4 rounded border border-zinc-700 bg-black/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-bold">3. Telemetry & Db</span>
                      <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">Supabase</span>
                    </div>
                    <p className="text-zinc-400 text-xs">Stores GDPR-compliant anonymous risk scores for aggregate trends.</p>
                  </div>

                  <div className="p-4 rounded border border-zinc-700 bg-black/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-pink-400 font-bold">4. Actionable Output</span>
                      <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">Jinja2 + SMTP</span>
                    </div>
                    <p className="text-zinc-400 text-xs">Generates HTML reports and drafting highly contextual outreach emails.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-cyan-500/30 flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-mono">Status: Production Ready</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-500 font-mono">Systems Online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
