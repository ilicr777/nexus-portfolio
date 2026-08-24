import { MetadataRoute } from "next";

const BASE_URL = "https://www.nexus-dev.it";
const LOCALES = ["it", "en"] as const;

// Definizione delle rotte statiche pubbliche per ogni locale
const staticRoutes = [
  "", // Homepage
  "/about",
  "/services",
  "/projects",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

// Definizione dei progetti
const projectSlugs = [
  "copycraft",
  "menu-translator",
  "surfsec",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Genera sitemap per tutte le rotte statiche per ciascun locale
  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      const path = route === "" ? `/${locale}` : `/${locale}${route}`;
      
      const languages: Record<string, string> = {};
      for (const loc of LOCALES) {
        languages[loc] = route === "" ? `${BASE_URL}/${loc}` : `${BASE_URL}/${loc}${route}`;
      }

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/projects" || route === "/services" ? 0.9 : 0.8,
        alternates: {
          languages,
        },
      });
    }

    // 2. Genera sitemap per i singoli progetti
    for (const slug of projectSlugs) {
      const path = `/${locale}/projects/${slug}`;

      const languages: Record<string, string> = {};
      for (const loc of LOCALES) {
        languages[loc] = `${BASE_URL}/${loc}/projects/${slug}`;
      }

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
