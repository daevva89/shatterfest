// src/middleware.ts (Minimal Test - Revert)
import { NextRequest, NextResponse } from 'next/server'

// Define i18n config directly within middleware
const i18nConfig = {
  locales: ['en', 'ro'] as const,
  defaultLocale: 'en' as const,
};

// Paths to explicitly ignore in the middleware logic
const PUBLIC_FILE = /\.(.*)$/; // Regex to match file extensions
const EXCLUDED_PATHS = ['/api', '/studio', '/favicon.ico']; // Add other paths like /images if needed

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // --- START: Path exclusion logic --- 
  // Skip Next.js internal paths
  if (pathname.startsWith('/_next')) {
    // console.log('[Middleware] Skipping: _next path');
    return NextResponse.next();
  }
  
  // Skip paths with file extensions
  if (PUBLIC_FILE.test(pathname)) {
    // console.log('[Middleware] Skipping: Public file');
    return NextResponse.next();
  }

  // Skip explicitly excluded paths
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    // console.log(`[Middleware] Skipping: Excluded path (${pathname})`);
    return NextResponse.next();
  }
  // --- END: Path exclusion logic --- 

  // console.log(`[Middleware] Pathname: ${pathname}`); // REMOVE LOG

  // Check if the pathname *already* has a valid locale prefix
  // console.log(`[Middleware] === Checking Path: ${pathname} ===`); // REMOVE LOG
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => {
      const checkPath = `/${locale}`;
      const checkPathSlash = `/${locale}/`;
      const starts = pathname.startsWith(checkPathSlash);
      const equals = pathname === checkPath;
      // console.log(`[Middleware] Checking ${pathname} against /${locale}/ (${starts}) or /${locale} (${equals})`); // REMOVE LOG
      return starts || equals;
    }
  );
  // console.log(`[Middleware] Result for ${pathname}: pathnameHasLocale = ${pathnameHasLocale}`); // REMOVE LOG

  // Redirect if locale is missing
  if (!pathnameHasLocale) { 
    const locale = i18nConfig.defaultLocale
    // console.log(`[Middleware] Condition !pathnameHasLocale is TRUE for ${pathname}, redirecting...`); // REMOVE LOG
    // console.log(`[Middleware] Locale missing, redirecting to /${locale}${pathname}`); // REMOVE LOG
    
    // Construct absolute URL for redirect
    const { protocol, host } = request.nextUrl;
    const redirectUrl = `${protocol}//${host}/${locale}${pathname === '/' ? '' : pathname}`;
    // console.log(`[Middleware] Redirecting to absolute URL: ${redirectUrl}`); // REMOVE LOG

    // Redirect to the same path but with the locale prefix
    return NextResponse.redirect(redirectUrl, 308);
  } else {
      // console.log(`[Middleware] Condition !pathnameHasLocale is FALSE for ${pathname}, continuing...`); // REMOVE LOG
  }

  // console.log(`[Middleware] Locale present, continuing for path: ${pathname}`); // REMOVE LOG
  // If locale is present, continue
  return NextResponse.next();
}

// NO config export - Middleware runs for all paths, handled by logic above
// export const config = { ... } 