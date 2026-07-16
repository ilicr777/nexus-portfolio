"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Instagram, 
  Linkedin, 
  Facebook,
  Loader2,
  Wand2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePost, type GeneratePostInput } from "@/app/actions/generate-post";
import { useDictionary } from "@/components/dictionary-provider";

const platforms = [
  { value: "instagram", label: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-700" },
  { value: "facebook", label: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600" },
];

export default function CopyCraftPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.demos.copycraft;
  const pt = dictionary.projects;

  const tones = [
    { value: "divertente", label: t.tones.fun, description: t.tones.funDesc },
    { value: "professionale", label: t.tones.professional, description: t.tones.professionalDesc },
    { value: "urgente", label: t.tones.urgent, description: t.tones.urgentDesc },
  ];

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<GeneratePostInput["tone"]>("divertente");
  const [platform, setPlatform] = useState<GeneratePostInput["platform"]>("instagram");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await generatePost({ topic, tone, platform });
      
      if (response.success && response.content) {
        setResult(response.content);
      } else {
        setError(response.error || t.errorGeneric);
      }
    });
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedPlatform = platforms.find(p => p.value === platform);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-padding mx-auto max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{pt.backToPortfolio}</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">CopyCraft AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container-padding mx-auto max-w-4xl py-12 md:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <Wand2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.poweredBy}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            CopyCraft AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.tagline}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8"
        >
          <div className="space-y-6">
            {/* Topic Input */}
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-base font-medium">
                {t.topicLabel}
              </Label>
              <Textarea
                id="topic"
                placeholder={t.topicPlaceholder}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Selectors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tone Selector */}
              <div className="space-y-2">
                <Label htmlFor="tone" className="text-base font-medium">
                  {t.toneLabel}
                </Label>
                <Select value={tone} onValueChange={(v) => setTone(v as GeneratePostInput["tone"])}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder={t.tonePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tn) => (
                      <SelectItem key={tn.value} value={tn.value}>
                        <div className="flex flex-col">
                          <span>{tn.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Platform Selector */}
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-base font-medium">
                  {t.platformLabel}
                </Label>
                <Select value={platform} onValueChange={(v) => setPlatform(v as GeneratePostInput["platform"])}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder={t.platformPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center gap-2">
                          <p.icon className="h-4 w-4" />
                          <span>{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isPending || !topic.trim()}
              variant="glow"
              size="lg"
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  {t.generateButton}
                  <Sparkles className="h-4 w-4" />
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPlatform && (
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedPlatform.color}`}>
                        <selectedPlatform.icon className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="font-medium">{t.generatedContent}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        {t.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t.copy}
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="p-6 rounded-xl border border-border bg-muted/50 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          {pt.demoNote}
        </motion.p>
      </main>
    </div>
  );
}
