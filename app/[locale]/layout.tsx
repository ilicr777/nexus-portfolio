import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IntroWrapper } from "@/components/intro-wrapper";
import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { headers } from "next/headers";

import type { Metadata } from "next";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const rawPathname = headersList.get("x-pathname") || "/";

  // Identifica e rimuovi il locale corrente dal rawPathname
  let genericPath = rawPathname;
  for (const locale of i18n.locales) {
    if (rawPathname.startsWith(`/${locale}/`)) {
      genericPath = rawPathname.substring(locale.length + 1);
      break;
    } else if (rawPathname === `/${locale}`) {
      genericPath = "/";
      break;
    }
  }

  // Rimuovi leading slash se presente per sicurezza del join
  if (genericPath !== "/" && genericPath.startsWith("/")) {
    genericPath = genericPath.substring(1);
  }

  const languages = i18n.locales.reduce((acc, locale) => {
    acc[locale] = genericPath === "/" || genericPath === "" ? `/${locale}` : `/${locale}/${genericPath}`;
    return acc;
  }, {} as Record<string, string>);

  languages["x-default"] = genericPath === "/" || genericPath === "" ? `/${i18n.defaultLocale}` : `/${i18n.defaultLocale}/${genericPath}`;

  return {
    alternates: {
      languages,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "it" ? rawLocale : "it") as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <DictionaryProvider dictionary={dictionary} locale={locale}>
        <IntroWrapper>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </IntroWrapper>
      </DictionaryProvider>
    </ThemeProvider>
  );
}
