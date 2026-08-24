import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { ProjectLayout } from "./project-layout";
import { constructMetadata } from "@/lib/seo";
import { i18n, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const knownSlugs = ["copycraft", "menu-translator", "surfsec"];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18n.locales) {
    for (const slug of knownSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale === "en" || rawLocale === "it" ? rawLocale : "it") as Locale;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "The requested project could not be found.",
      path: `/projects/${slug}`,
      locale,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${project.frontmatter.title} - ${project.frontmatter.subtitle || "Case Study"}`,
    description: project.frontmatter.description || "In-depth project case study and technical breakdown.",
    path: `/projects/${slug}`,
    locale,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <ProjectLayout frontmatter={project.frontmatter}>
      <article className="prose prose-invert prose-cyan max-w-none font-mono prose-headings:text-cyan-400 prose-a:text-cyan-500 marker:text-cyan-500">
        <MDXRemote source={project.content} components={mdxComponents} />
      </article>
    </ProjectLayout>
  );
}
