"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useDictionary } from "@/components/dictionary-provider";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ScrollReveal, TextReveal } from "@/components/scroll-reveal";
import { ShieldAlert, Terminal, Server, CheckCircle2, Target, PenTool, Code2, Rocket, ArrowRight, Check, Database, Bot } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function ServicesContent() {
  const { dictionary, locale } = useDictionary();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const springY = useSpring(yParallax, { stiffness: 100, damping: 30 });

  const services = [
    {
      id: "01",
      icon: <Server className="h-10 w-10" />,
      ...dictionary.servicesPage.fullStack,
      color: "from-blue-500/20 to-cyan-500/5",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md aspect-video rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 group-hover:shadow-blue-500/20">
            <div className="h-10 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="p-6 flex flex-col gap-4 opacity-80">
              <div className="w-3/4 h-4 rounded bg-primary/20 animate-pulse" />
              <div className="w-1/2 h-4 rounded bg-primary/20 animate-pulse" style={{ animationDelay: "150ms" }} />
              <div className="w-5/6 h-4 rounded bg-foreground/10 mt-6" />
              <div className="w-4/6 h-4 rounded bg-foreground/10" />
              <div className="w-full flex-grow rounded border border-dashed border-border/50 mt-4 flex items-center justify-center bg-foreground/5">
                <span className="text-muted-foreground text-xs font-mono">SECURE_CONTAINER_MOUNTED</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl" />
        </div>
      )
    },
    {
      id: "02",
      icon: <ShieldAlert className="h-10 w-10" />,
      ...dictionary.servicesPage.penTesting,
      color: "from-red-500/20 to-orange-500/5",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md h-64 rounded-2xl border border-red-500/20 bg-black/90 font-mono text-xs md:text-sm p-6 shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500 text-red-400 group-hover:shadow-red-500/20 overflow-hidden">
            <div className="flex gap-2 mb-6 opacity-70">
              <Terminal className="w-5 h-5" />
              <span>root@nexus-sec:~# ./run_exploit.sh</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="flex flex-col gap-3"
            >
              <p className="text-muted-foreground">{">"} bypassing WAF signatures...</p>
              <p className="text-muted-foreground">{">"} injecting payload...</p>
              <p className="text-white mt-2 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {">"} ACCESS GRANTED [Privilege: ROOT]_
              </p>
            </motion.div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-2xl" />
          </div>
        </div>
      )
    },
    {
      id: "03",
      icon: <Terminal className="h-10 w-10" />,
      ...dictionary.servicesPage.automation,
      color: "from-emerald-500/20 to-green-500/5",
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
          <div className="relative w-full h-full flex items-center justify-center z-10">
            {/* Node 1 */}
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-md shadow-lg">
              <Database className="w-6 h-6 text-emerald-400" />
            </motion.div>
            {/* Node 2 */}
            <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-md shadow-lg">
              <Bot className="w-6 h-6 text-emerald-400" />
            </motion.div>
            {/* Node 3 (Center) */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-card/80 backdrop-blur-xl border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)] z-20 group-hover:scale-110 transition-transform duration-500">
              <Rocket className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
            </div>
            {/* Connecting Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
              <path d="M 30% 30% C 40% 40% 60% 60% 70% 70%" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="6 6" className="text-emerald-500" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
      )
    },
  ];

  const processSteps = [
    { icon: <Target className="h-6 w-6" />, ...dictionary.servicesPage.process.steps.discovery },
    { icon: <PenTool className="h-6 w-6" />, ...dictionary.servicesPage.process.steps.design },
    { icon: <Code2 className="h-6 w-6" />, ...dictionary.servicesPage.process.steps.development },
    { icon: <Rocket className="h-6 w-6" />, ...dictionary.servicesPage.process.steps.delivery },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20" ref={containerRef}>
        {/* Header Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <motion.div 
              style={{ y: springY }}
              className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" 
            />
          </div>

          <div className="container-padding mx-auto max-w-5xl text-center relative z-10 pt-6 sm:pt-10 md:pt-20">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 sm:mb-8 leading-tight">
              <TextReveal text={dictionary.servicesPage.title} />
            </h1>
            <ScrollReveal delay={0.3}>
              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                {dictionary.servicesPage.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Editorial Services Layout */}
        <section className="py-14 sm:py-20 md:py-32 overflow-hidden">
          <div className="container-padding mx-auto max-w-7xl flex flex-col gap-20 sm:gap-32">
            {services.map((service, index) => {
              const isEven = index % 2 !== 0;
              return (
                <div key={service.id} className="relative w-full group">
                  {/* Giant Background Number */}
                  <div className={`hidden sm:block absolute top-0 ${isEven ? 'right-0 md:right-auto md:left-0' : 'left-0'} -translate-y-1/4 select-none pointer-events-none overflow-hidden`}>
                    <motion.span 
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 0.03, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="text-[200px] md:text-[300px] font-black leading-none text-foreground tracking-tighter"
                    >
                      {service.id}
                    </motion.span>
                  </div>

                  <div className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 sm:gap-12 lg:gap-24`}>
                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                      <ScrollReveal direction={isEven ? "left" : "right"}>
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} border border-border/50 text-foreground shadow-lg backdrop-blur-md shrink-0`}>
                            {service.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-mono tracking-widest text-muted-foreground uppercase">
                            {service.subtitle}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                          {service.title}
                        </h2>
                        
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-10 font-light">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {service.features.map((feature: string, fIndex: number) => (
                            <motion.div 
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: fIndex * 0.1, duration: 0.5 }}
                              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-card/30 border border-border/40 hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
                            >
                              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                              <span className="text-xs sm:text-sm font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollReveal>
                    </div>

                    {/* Visual Element */}
                    <div className="w-full md:w-1/2 h-[260px] sm:h-[360px] md:h-[500px] rounded-2xl sm:rounded-[2rem] overflow-hidden relative border border-border/20 group-hover:border-border/50 transition-colors duration-700">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
                      <div className="absolute inset-0 backdrop-blur-3xl" />
                      
                      {/* Dynamic Visual Mockup */}
                      {service.visual}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-muted/30 border-y border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="container-padding mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{dictionary.servicesPage.process.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                  {dictionary.servicesPage.process.description}
                </p>
              </ScrollReveal>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent z-0" />

              {processSteps.map((step, index) => (
                <StaggerItem key={step.title} className="relative z-10">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-8 shadow-sm relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary/50">
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                      <div className="text-foreground/70 group-hover:text-primary transition-colors duration-500 scale-125">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-16 items-center">
              <div className="lg:col-span-2">
                <ScrollReveal direction="right">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">{dictionary.servicesPage.whyMe.title}</h2>
                  <p className="text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                    {dictionary.servicesPage.whyMe.description}
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-3">
                <StaggerContainer className="space-y-6">
                  {dictionary.servicesPage.whyMe.reasons.map((reason: any, index: number) => (
                    <StaggerItem key={reason.title}>
                      <div className="group flex gap-6 p-8 rounded-3xl bg-card/20 border border-border/30 hover:bg-card/40 hover:border-border/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 backdrop-blur-sm">
                        <div className="mt-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{reason.title}</h4>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{reason.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Magnetic Animated CTA */}
        <section className="py-32">
          <div className="container-padding mx-auto max-w-5xl">
            <ScrollReveal>
              <div className="relative rounded-[2.5rem] overflow-hidden p-[1px] group">
                {/* Animated Gradient Border */}
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#393BB2_50%,#000000_100%)]" />
                
                {/* Inner Container */}
                <div className="relative h-full w-full rounded-[2.5rem] bg-card/90 backdrop-blur-2xl p-12 md:p-20 text-center flex flex-col items-center justify-center">
                  <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">{dictionary.servicesPage.cta.title}</h2>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                    {dictionary.servicesPage.cta.description}
                  </p>
                  
                  {/* Premium Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="xl" className="h-16 px-10 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all">
                      <Link href={`/${locale}/contact`} className="flex items-center gap-3">
                        {dictionary.servicesPage.cta.button}
                        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center backdrop-blur-sm">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
