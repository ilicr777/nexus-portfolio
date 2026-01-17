"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useDictionary } from "@/components/dictionary-provider";

export default function TermsOfServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.terms;

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-padding mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground">
              {t.lastUpdated}: {locale === 'it' ? '17 gennaio 2026' : 'January 17, 2026'}
            </p>
          </header>

          {/* Content */}
          <article className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.acceptance.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.acceptance.content}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.sections.acceptance.warning}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.ip.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.ip.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                {t.sections.ip.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.sections.ip.ownership}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.sections.ip.openSource}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.permitted.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.permitted.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                {t.sections.permitted.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.prohibited.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.prohibited.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">{t.sections.prohibited.items.reproduction.split(' – ')[0]}</strong> – {t.sections.prohibited.items.reproduction.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.prohibited.items.scraping.split(' – ')[0]}</strong> – {t.sections.prohibited.items.scraping.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.prohibited.items.commercial.split(' – ')[0]}</strong> – {t.sections.prohibited.items.commercial.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.prohibited.items.alteration.split(' – ')[0]}</strong> – {t.sections.prohibited.items.alteration.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.prohibited.items.harmful.split(' – ')[0]}</strong> – {t.sections.prohibited.items.harmful.split(' – ')[1]}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.disclaimer.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.disclaimer.intro}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.disclaimer.subIntro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">{t.sections.disclaimer.items.code.split(' – ')[0]}</strong> – {t.sections.disclaimer.items.code.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.disclaimer.items.accuracy.split(' – ')[0]}</strong> – {t.sections.disclaimer.items.accuracy.split(' – ')[1]}
                </li>
                <li>
                  <strong className="text-foreground">{t.sections.disclaimer.items.availability.split(' – ')[0]}</strong> – {t.sections.disclaimer.items.availability.split(' – ')[1]}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.liability.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.liability.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.thirdParty.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.thirdParty.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.services.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.services.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.changes.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.changes.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.jurisdiction.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.jurisdiction.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.contact.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.contact.content}
              </p>
            </section>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}
