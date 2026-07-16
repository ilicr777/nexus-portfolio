import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n/config";

// Parsing RFC 4647 Accept-Language con q-factor
function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return i18n.defaultLocale;

  const parsedLangs = acceptLanguage.split(',');
  const localesWithQ: { lang: string; q: number }[] = [];

  for (const langStr of parsedLangs) {
    const parts = langStr.split(';');
    const lang = parts[0].trim().substring(0, 2).toLowerCase();
    let q = 1;

    if (parts.length > 1 && parts[1].trim().startsWith('q=')) {
      const qVal = parseFloat(parts[1].trim().substring(2));
      if (!isNaN(qVal)) q = qVal;
    }

    localesWithQ.push({ lang, q });
  }

  // Ordina per peso decrescente (q factor)
  localesWithQ.sort((a, b) => b.q - a.q);

  for (const { lang } of localesWithQ) {
    if (i18n.locales.includes(lang as typeof i18n.locales[number])) {
      return lang;
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Filtro ad alte prestazioni basato su string sizing per ignorare asset statici
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname.indexOf('.') !== -1
  ) {
    return NextResponse.next();
  }

  // Verifica se la rotta possiede già un prefisso locale corretto
  let hasLocale = false;
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      hasLocale = true;
      break;
    }
  }

  // Inietta il pathname originale negli header per l'accesso Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  if (hasLocale) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Esegui la content negotiation per iniettare la lingua corretta
  const acceptLanguage = request.headers.get("Accept-Language");
  const preferredLocale = getPreferredLocale(acceptLanguage);

  const newUrl = new URL(`/${preferredLocale}${pathname}${request.nextUrl.search}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Ignora programmaticamente le path intrinseche note e i suffissi tipici
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
