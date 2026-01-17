"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle, Mail, MessageSquare, AlertCircle } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
              {dictionary.contact.label}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {dictionary.contact.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {dictionary.contact.conversation.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {dictionary.contact.conversation.description}
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{dictionary.contact.info.email}</h4>
                      <a
                        href="mailto:nexus.dev.contact@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        nexus.dev.contact@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{dictionary.contact.info.responseTime}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dictionary.contact.info.responseValue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                  <h4 className="font-medium mb-4">{dictionary.contact.expect.title}</h4>
                  <ul className="space-y-3">
                    {dictionary.contact.expect.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div variants={itemVariants}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {dictionary.contact.success.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {dictionary.contact.success.description}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {dictionary.contact.success.button}
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-6"
                >
                  {/* Error Message */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
                    >
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </motion.div>
                  )}

                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{dictionary.contact.form.name}</Label>
                    <Input
                      id="name"
                      placeholder={dictionary.contact.form.namePlaceholder}
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
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
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Type Field */}
                  <div className="space-y-2">
                    <Label htmlFor="projectType">{dictionary.contact.form.projectType}</Label>
                    <Select
                      onValueChange={(value) => setValue("projectType", value)}
                    >
                      <SelectTrigger
                        className={
                          errors.projectType ? "border-destructive" : ""
                        }
                      >
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
                      <p className="text-sm text-destructive">
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{dictionary.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      placeholder={dictionary.contact.form.messagePlaceholder}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {dictionary.contact.form.submitting}
                      </>
                    ) : (
                      <>
                        {dictionary.contact.form.submit}
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {dictionary.contact.form.privacy}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
