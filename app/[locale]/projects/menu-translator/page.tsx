"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Loader2,
  Globe,
  AlertCircle,
  UtensilsCrossed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { translateMenu, type TranslatedMenu } from "@/app/actions/translate-menu";
import { useDictionary } from "@/components/dictionary-provider";

const languages = [
  { id: "english", label: "🇬🇧 English", flag: "🇬🇧" },
  { id: "french", label: "🇫🇷 Français", flag: "🇫🇷" },
  { id: "chinese", label: "🇨🇳 中文", flag: "🇨🇳" },
];

export default function MenuTranslatorPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.demos.menutranslator;
  const pt = dictionary.projects;

  const [menuText, setMenuText] = useState("");
  const [translations, setTranslations] = useState<TranslatedMenu | null>(null);
  const [activeTab, setActiveTab] = useState<keyof TranslatedMenu>("english");
  const [error, setError] = useState<string | null>(null);
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleTranslate = () => {
    if (!menuText.trim() || menuText.length < 10) {
      setError(t.errorMinLength);
      return;
    }

    setError(null);
    setTranslations(null);

    startTransition(async () => {
      const response = await translateMenu({ menuText });
      
      if (response.success && response.translations) {
        setTranslations(response.translations);
      } else {
        setError(response.error || t.errorGeneric);
      }
    });
  };

  const handleCopy = async (lang: keyof TranslatedMenu) => {
    if (translations && translations[lang]) {
      await navigator.clipboard.writeText(translations[lang]);
      setCopiedLang(lang);
      setTimeout(() => setCopiedLang(null), 2000);
    }
  };

  const exampleMenu = `Antipasti:
- Bruschetta al Pomodoro: pane tostato con pomodori freschi, basilico e olio EVO
- Carpaccio di Manzo: fette sottili di manzo crudo con rucola e scaglie di parmigiano

Primi Piatti:
- Spaghetti alla Carbonara: pasta con uova, guanciale croccante e pecorino romano
- Risotto ai Funghi Porcini: riso carnaroli mantecato con porcini freschi

Secondi:
- Ossobuco alla Milanese: stinco di vitello brasato con gremolata
- Branzino al Forno: pesce fresco con patate e olive taggiasche`;

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
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-semibold">MenuTranslator AI</span>
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
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Gemini AI</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            MenuTranslator AI
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
            {/* Menu Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="menu" className="text-base font-medium">
                  {t.menuLabel}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMenuText(exampleMenu)}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  {t.useExample}
                </Button>
              </div>
              <Textarea
                id="menu"
                placeholder={t.menuPlaceholder}
                value={menuText}
                onChange={(e) => setMenuText(e.target.value)}
                className="min-h-[200px] resize-none font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {t.menuHint}
              </p>
            </div>

            {/* Translate Button */}
            <Button
              onClick={handleTranslate}
              disabled={isPending || menuText.length < 10}
              variant="glow"
              size="lg"
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t.translating}</span>
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" />
                  <span>{t.translateButton}</span>
                </>
              )}
            </Button>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence>
              {translations && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-4"
                >
                  {/* Language Tabs */}
                  <div className="flex gap-2 p-1 rounded-lg bg-muted/50">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setActiveTab(lang.id as keyof TranslatedMenu)}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          activeTab === lang.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  {/* Translation Content */}
                  <div className="relative">
                    <div className="rounded-lg border border-border bg-muted/30 p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {languages.find(l => l.id === activeTab)?.flag}
                          </span>
                          <span className="font-semibold">
                            {languages.find(l => l.id === activeTab)?.label.split(" ")[1]}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(activeTab)}
                          className="flex-shrink-0"
                        >
                          {copiedLang === activeTab ? (
                            <>
                              <Check className="h-4 w-4 text-green-500" />
                              <span>{t.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span>{t.copy}</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground bg-transparent p-0 m-0">
                          {translations[activeTab]}
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "🇮🇹",
              title: t.features.identity.title,
              description: t.features.identity.description
            },
            {
              icon: "🌍",
              title: t.features.languages.title,
              description: t.features.languages.description
            },
            {
              icon: "⚡",
              title: t.features.speed.title,
              description: t.features.speed.description
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card/30 p-6 text-center"
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          {pt.demoNote}
        </motion.p>
      </main>
    </div>
  );
}
