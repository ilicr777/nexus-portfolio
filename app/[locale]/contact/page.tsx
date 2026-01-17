"use client";

import { motion } from "framer-motion";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { 
  Send, 
  CheckCircle, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  Clock,
  ArrowRight,
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
import { ScrollReveal } from "@/components/scroll-reveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nexus.dev.contact@gmail.com",
    href: "mailto:nexus.dev.contact@gmail.com",
  },
  {
    icon: Clock,
    label: "Risposta",
    value: "Entro 24 ore",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/ilicr777", label: "GitHub" },
];

export default function ContactPage() {
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
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container-padding mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {dictionary.contact.label}
                </span>
                <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {dictionary.contact.title}
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                  {dictionary.contact.description}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-padding mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal direction="left">
                <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6">{dictionary.contact.conversation.title}</h2>
                  <p className="text-muted-foreground mb-8">
                    {dictionary.contact.conversation.description}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-4 mb-8">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="font-medium hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* What to Expect */}
                  <div>
                    <h3 className="font-semibold mb-4">{dictionary.contact.expect.title}</h3>
                    <ul className="space-y-3">
                      {dictionary.contact.expect.items.map((item: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              {/* Social Links */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-border bg-card/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{dictionary.contact.success.title}</h3>
                      <p className="text-muted-foreground mb-8">{dictionary.contact.success.description}</p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        {dictionary.contact.success.button}
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <Label htmlFor="name">{dictionary.contact.form.name}</Label>
                          <Input
                            id="name"
                            placeholder={dictionary.contact.form.namePlaceholder}
                            {...register("name")}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email">{dictionary.contact.form.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={dictionary.contact.form.emailPlaceholder}
                            {...register("email")}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Project Type */}
                      <div className="space-y-2">
                        <Label htmlFor="projectType">{dictionary.contact.form.projectType}</Label>
                        <Select onValueChange={(value) => setValue("projectType", value)}>
                          <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                            <SelectValue placeholder={dictionary.contact.form.projectTypePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.projectType && (
                          <p className="text-sm text-destructive">{errors.projectType.message}</p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">{dictionary.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          placeholder={dictionary.contact.form.messagePlaceholder}
                          rows={6}
                          {...register("message")}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Error Message */}
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{submitError}</p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.div>
                            {dictionary.contact.form.submitting}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {dictionary.contact.form.submit}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
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
