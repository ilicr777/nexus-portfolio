import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexus-dev.it"),
  title: "NEXUS.dev | Freelance Full-Stack Developer",
  description:
    "Building the web of tomorrow, today. Freelance Full-Stack Developer delivering pixel-perfect, high-performance digital experiences.",
  keywords: [
    "web developer",
    "full-stack developer",
    "freelance developer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "web development",
    "custom web development",
  ],
  authors: [{ name: "NEXUS.dev" }],
  creator: "NEXUS.dev",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.nexus-dev.it",
    title: "NEXUS.dev | Freelance Full-Stack Developer",
    description:
      "Building the web of tomorrow, today. Freelance Full-Stack Developer delivering pixel-perfect, high-performance digital experiences.",
    siteName: "NEXUS.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS.dev | Freelance Full-Stack Developer",
    description:
      "Building the web of tomorrow, today. Freelance Full-Stack Developer delivering pixel-perfect, high-performance digital experiences.",
    creator: "@nexusdev",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
