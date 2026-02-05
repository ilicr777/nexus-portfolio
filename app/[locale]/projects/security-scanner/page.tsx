"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Shield, Terminal, Lock, Code2 } from "lucide-react";
import { SecurityScanner } from "@/components/security-scanner";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition } from "@/components/page-transition";

export default function SecurityScannerPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.demos?.securityScanner || {
    title: "Security Posture Scanner",
    subtitle: "Real-time browser security analysis",
    description: "This tool analyzes your browser's security configuration, privacy settings, and potential vulnerabilities. All checks run locally - no data leaves your device.",
    features: {
      title: "What We Check",
      items: [
        "HTTPS connection encryption status",
        "Cookie security and permissions",
        "Do Not Track (DNT) configuration",
        "Bot/automation detection signatures",
        "Display and viewport integrity",
        "Network connection properties",
        "Locale and language settings"
      ]
    },
    disclaimer: "This scanner is for educational purposes. It demonstrates browser-based security analysis techniques.",
    backToProjects: "Back to Projects"
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
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          
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
                <span className="font-mono font-semibold text-white">SecurityScanner</span>
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
                  <span className="font-mono text-sm text-cyan-400">SECURITY TOOL</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
                  {t.title}
                </h1>
                <p className="text-xl text-cyan-400 font-mono">
                  {t.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed">
                {t.description}
              </p>

              {/* Features List */}
              <div className="space-y-4">
                <h2 className="font-mono text-lg text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  {t.features.title}
                </h2>
                <ul className="space-y-2">
                  {t.features.items.map((item: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3 text-zinc-400 font-mono text-sm"
                    >
                      <span className="text-cyan-400">▹</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badge */}
              <div className="flex items-center gap-2 pt-4">
                <Code2 className="h-4 w-4 text-zinc-500" />
                <span className="font-mono text-xs text-zinc-500">
                  Built with TypeScript • Next.js • Client-Side Only
                </span>
              </div>

              {/* Disclaimer */}
              <div className="p-4 border border-zinc-800 rounded bg-zinc-900/50">
                <p className="font-mono text-xs text-zinc-500">
                  ⚠️ {t.disclaimer}
                </p>
              </div>
            </motion.div>

            {/* Right Column - Scanner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SecurityScanner />
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
