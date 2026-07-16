"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: "https://github.com/ilicr777", icon: Github, label: "GitHub" },
];

export function Footer() {
  const { dictionary } = useDictionary();
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  const footerLinks = [
    {
      title: dictionary.footer.navigation,
      links: [
        { href: `/${locale}`, label: dictionary.nav.home },
        { href: `/${locale}/about`, label: dictionary.nav.about },
        { href: `/${locale}/projects`, label: dictionary.nav.projects },
        { href: `/${locale}/contact`, label: dictionary.nav.contact },
      ],
    },
    {
      title: dictionary.footer.services,
      links: [
        { href: `/${locale}/contact`, label: dictionary.footer.webDevelopment },
        { href: `/${locale}/contact`, label: dictionary.footer.designServices },
        { href: `/${locale}/contact`, label: dictionary.footer.securityServices },
        { href: `/${locale}/contact`, label: dictionary.footer.consulting },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text">NEXUS</span>
                <span className="text-muted-foreground">.dev</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              {dictionary.footer.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "transition-colors",
                        isActive(link.href)
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} NEXUS.dev. {dictionary.footer.rights}
          </p>
          
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy-policy`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {dictionary.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms-of-service`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {dictionary.footer.terms}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/20 bg-background/80 backdrop-blur-sm"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </motion.div>
    </footer>
  );
}
