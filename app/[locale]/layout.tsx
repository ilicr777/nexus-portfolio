import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IntroWrapper } from "@/components/intro-wrapper";
import { i18n, type Locale, getDictionary } from "@/lib/i18n";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" || rawLocale === "it" ? rawLocale : "it") as Locale;

  return constructMetadata({
    title: locale === "it" ? "Sviluppatore Full-Stack Freelance" : "Freelance Full-Stack Developer",
    description:
      locale === "it"
        ? "Sviluppatore Full-Stack Freelance & Cybersecurity. Realizzo applicazioni web ad alte prestazioni, sicure e su misura."
        : "Freelance Full-Stack Developer & Cybersecurity. Building high-performance, secure, and bespoke web applications.",
    path: "",
    locale,
  });
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
