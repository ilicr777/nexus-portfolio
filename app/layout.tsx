import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
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
    url: "https://nexus.dev",
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
      </body>
    </html>
  );
}
