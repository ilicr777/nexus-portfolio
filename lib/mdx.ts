import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  status: string;
  systemStatus: string;
}

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}

export function getProjectBySlug(slug: string, locale: string): ProjectData | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  } catch (e) {
    // Fallback to English if localized version doesn't exist
    if (locale !== "en") {
      try {
        const fallbackPath = path.join(contentDirectory, "en", `${slug}.mdx`);
        const fileContents = fs.readFileSync(fallbackPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
          slug,
          frontmatter: data as ProjectFrontmatter,
          content,
        };
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}
