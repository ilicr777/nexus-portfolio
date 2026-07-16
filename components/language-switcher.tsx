"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";
import { i18n, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    
    // Set cookie to persist the locale preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    router.push(newPath);
    router.refresh();
  };

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "it" : "en";
    switchLocale(newLocale);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-1.5">
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium">{i18n.defaultLocale.toUpperCase()}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium uppercase">{locale}</span>
    </Button>
  );
}
