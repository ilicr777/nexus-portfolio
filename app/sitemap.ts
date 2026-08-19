import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.nexus-dev.it';
const LOCALES = ['it', 'en'];

// Definizione delle rotte statiche pubbliche per ogni locale
const staticRoutes = [
  '', // Homepage
  '/about',
  '/contact',
  '/services',
  '/projects',
  '/privacy-policy',
  '/terms-of-service',
];

// Definizione dei progetti statici (slug reali)
const projectSlugs = [
  'copycraft',
  'menu-translator',
  'surfsec',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Genera sitemap per tutte le locales e rotte statiche
  LOCALES.forEach((locale) => {
    staticRoutes.forEach((route) => {
      const path = route === '' ? `/${locale}` : `/${locale}${route}`;
      
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // Genera sitemap per i progetti dinamici
    projectSlugs.forEach((slug) => {
      const path = `/${locale}/projects/${slug}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return entries;
}
