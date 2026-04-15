import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { ProjectLayout } from "./project-layout";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

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
