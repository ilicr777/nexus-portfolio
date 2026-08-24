import { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n";

export const SITE_URL = "https://www.nexus-dev.it";

export interface SEOProps {
  title: string;
  description: string;
  path?: string; // e.g. '', '/about', '/projects/copycraft'
  locale: Locale;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path = "",
  locale,
  image = "/icon.svg",
  noIndex = false,
}: SEOProps): Metadata {
  // Normalize path without trailing slash
  let cleanPath = path.trim();
  if (cleanPath === "/") {
    cleanPath = "";
  } else if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }
  if (cleanPath.endsWith("/") && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }

  const canonicalUrl = `${SITE_URL}/${locale}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const loc of i18n.locales) {
    languages[loc] = `${SITE_URL}/${loc}${cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/${i18n.defaultLocale}${cleanPath}`;

  const fullTitle = `${title} | NEXUS.dev`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "NEXUS.dev",
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@nexusdev",
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
