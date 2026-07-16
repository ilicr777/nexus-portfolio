"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { useDictionary } from "@/components/dictionary-provider";

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = params.locale as string;
  const { dictionary } = useDictionary();
  const t = dictionary.privacy;

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
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.controller.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.controller.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.dataTypes.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.dataTypes.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">{t.sections.dataTypes.items.name.split(' – ')[0]}</strong> – {t.sections.dataTypes.items.name.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.dataTypes.items.email.split(' – ')[0]}</strong> – {t.sections.dataTypes.items.email.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.dataTypes.items.projectType.split(' – ')[0]}</strong> – {t.sections.dataTypes.items.projectType.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.dataTypes.items.message.split(' – ')[0]}</strong> – {t.sections.dataTypes.items.message.split(' – ')[1]}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.purpose.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.purpose.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                {t.sections.purpose.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">{t.sections.purpose.noMarketing}</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.legalBasis.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.legalBasis.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.thirdParty.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.thirdParty.content}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.thirdParty.moreInfo} <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy Resend</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.cookies.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.cookies.content}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.sections.cookies.noAnalytics}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.retention.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.retention.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.rights.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.sections.rights.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong className="text-foreground">{t.sections.rights.items.access.split(' – ')[0]}</strong> – {t.sections.rights.items.access.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.rectification.split(' – ')[0]}</strong> – {t.sections.rights.items.rectification.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.erasure.split(' – ')[0]}</strong> – {t.sections.rights.items.erasure.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.restriction.split(' – ')[0]}</strong> – {t.sections.rights.items.restriction.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.portability.split(' – ')[0]}</strong> – {t.sections.rights.items.portability.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.objection.split(' – ')[0]}</strong> – {t.sections.rights.items.objection.split(' – ')[1]}</li>
                <li><strong className="text-foreground">{t.sections.rights.items.withdrawal.split(' – ')[0]}</strong> – {t.sections.rights.items.withdrawal.split(' – ')[1]}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.sections.rights.contact}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.complaint.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.complaint.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.sections.changes.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.changes.content}
              </p>
            </section>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}
