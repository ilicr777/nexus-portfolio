"use client";

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Send, 
  CheckCircle, 
  Mail, 
  AlertCircle, 
  Clock,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDictionary } from "@/components/dictionary-provider";
import { sendContactEmail } from "@/app/actions/send-email";
import { PageTransition } from "@/components/page-transition";
import { ScrollReveal, TextReveal } from "@/components/scroll-reveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@nexus-dev.it",
    href: "mailto:info@nexus-dev.it",
  },
  {
    icon: Clock,
    label: "Risposta Rapida",
    value: "Entro 24 ore",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/ilicr777", label: "GitHub Profile" },
];

export function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { dictionary } = useDictionary();

  const contactSchema = z.object({
    name: z.string().min(2, dictionary.contact.errors.nameMin),
    email: z.string().email(dictionary.contact.errors.emailInvalid),
    projectType: z.string().min(1, dictionary.contact.errors.projectTypeRequired),
    message: z.string().min(10, dictionary.contact.errors.messageMin),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const projectTypes = [
    { value: "website", label: dictionary.contact.projectTypes.website },
    { value: "webapp", label: dictionary.contact.projectTypes.webapp },
    { value: "ecommerce", label: dictionary.contact.projectTypes.ecommerce },
    { value: "optimization", label: dictionary.contact.projectTypes.optimization },
    { value: "consulting", label: dictionary.contact.projectTypes.consulting },
    { value: "other", label: dictionary.contact.projectTypes.other },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    
    startTransition(async () => {
      const result = await sendContactEmail({
        name: data.name,
        email: data.email,
        subject: data.projectType,
        message: data.message,
      });

      if (result.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setSubmitError(result.message);
      }
    });
  };

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20 relative">
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" 
          />
          {/* Ultra-thin Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_80%)] opacity-[0.03]" />
        </div>

        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-16 flex flex-col items-center">
              <ScrollReveal delay={0.1}>
                {/* Available for projects Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-xl mb-8 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-foreground/80 uppercase tracking-widest">
                    Available For New Projects
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
                  <TextReveal text={dictionary.contact.title} />
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto text-balance">
                  {dictionary.contact.description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-padding mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Contact Info & Values */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-12 relative z-10">
              <ScrollReveal direction="left">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-4">{dictionary.contact.conversation.title}</h2>
                  <p className="text-base sm:text-lg text-muted-foreground font-light mb-6 sm:mb-8 text-balance">
                    {dictionary.contact.conversation.description}
                  </p>

                  {/* Contact Info Pills */}
                  <div className="space-y-3 sm:space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
                        <div className="relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/40 hover:bg-card/60 transition-all duration-300">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                            <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">{info.label}</p>
                            {info.href ? (
                              <a href={info.href} className="text-base sm:text-lg font-medium group-hover:text-primary transition-colors break-all">
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-base sm:text-lg font-medium">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 sm:mt-12">
                  <h3 className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-muted-foreground mb-4 sm:mb-6">
                    {dictionary.contact.expect.title}
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {dictionary.contact.expect.items.map((item: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                        </div>
                        <span className="text-muted-foreground font-light text-sm sm:text-base md:text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/40">
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md flex items-center justify-center hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-md pointer-events-none" />
                        <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary relative z-10 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Deep Glass Form */}
            <div className="lg:col-span-7 relative">
              {/* Massive Glow behind the form */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 blur-3xl rounded-[3rem] -z-10 pointer-events-none" />
              
              <ScrollReveal direction="right">
                <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  {/* Subtle noise/gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                        <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight">{dictionary.contact.success.title}</h3>
                      <p className="text-lg text-muted-foreground mb-10 font-light">{dictionary.contact.success.description}</p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full px-8 h-12">
                        {dictionary.contact.success.button}
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                      <div className="grid sm:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{dictionary.contact.form.name}</Label>
                          <Input
                            id="name"
                            placeholder={dictionary.contact.form.namePlaceholder}
                            {...register("name")}
                            className={`h-14 rounded-2xl bg-background/40 border-white/10 backdrop-blur-md focus:bg-background/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${errors.name ? "border-destructive" : ""}`}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive ml-1">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{dictionary.contact.form.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={dictionary.contact.form.emailPlaceholder}
                            {...register("email")}
                            className={`h-14 rounded-2xl bg-background/40 border-white/10 backdrop-blur-md focus:bg-background/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${errors.email ? "border-destructive" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive ml-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Project Type */}
                      <div className="space-y-3">
                        <Label htmlFor="projectType" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{dictionary.contact.form.projectType}</Label>
                        <Select onValueChange={(value) => setValue("projectType", value)}>
                          <SelectTrigger className={`h-14 rounded-2xl bg-background/40 border-white/10 backdrop-blur-md focus:bg-background/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${errors.projectType ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={dictionary.contact.form.projectTypePlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-white/10 bg-card/90 backdrop-blur-xl">
                            {projectTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value} className="rounded-xl">
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.projectType && (
                          <p className="text-xs text-destructive ml-1">{errors.projectType.message}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">{dictionary.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          placeholder={dictionary.contact.form.messagePlaceholder}
                          rows={6}
                          {...register("message")}
                          className={`rounded-2xl bg-background/40 border-white/10 backdrop-blur-md focus:bg-background/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none p-4 ${errors.message ? "border-destructive" : ""}`}
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive ml-1">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Error Message */}
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive backdrop-blur-md"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm font-medium">{submitError}</p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-bold tracking-wide"
                        >
                          {isPending ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Send className="w-5 h-5" />
                              </motion.div>
                              {dictionary.contact.form.submitting}
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              {dictionary.contact.form.submit}
                            </>
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-center text-muted-foreground/60 mt-6">
                        {dictionary.contact.form.privacy}
                      </p>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>
      </main>
    </PageTransition>
  );
}
