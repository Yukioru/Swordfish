import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from '@/lib/i18n/settings';
import acceptLanguage from '@/lib/accept-language';

acceptLanguage.languages(languages);

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

const cookieName = String(process.env.I18N_COOKIE_NAME);

export default function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  ) {
    return NextResponse.next();
  }

  let lng: string | null | undefined;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)!.value)!;
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('accept-language'));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  function applyCookie(req: NextRequest, res: NextResponse) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const isRefererPrefix = languages.some((lang) =>
      refererUrl.pathname.startsWith(`/${lang}`)
    );
    let lngInReferer = null;
    if (!isRefererPrefix && lng === fallbackLng) {
      lngInReferer = languages.find((l) =>
        req.nextUrl.pathname.startsWith(`/${l}`)
      );
    }
    if (isRefererPrefix && lng !== fallbackLng) {
      lngInReferer = languages.find((l) =>
        req.nextUrl.pathname.startsWith(`/${l}`)
      );
    }
    if (isRefererPrefix && lng !== fallbackLng && !lngInReferer) {
      lngInReferer = fallbackLng;
    }

    if (lngInReferer) res.cookies.set(cookieName, lngInReferer);
    return res;
  }

  const isPrefix = languages.some((lang) =>
    req.nextUrl.pathname.startsWith(`/${lang}`)
  );
  const isSystem = req.nextUrl.pathname.startsWith('/_next');

  if (!isPrefix && !isSystem) {
    const response = NextResponse[lng !== fallbackLng ? 'redirect' : 'rewrite'](
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );

    if (req.headers.has('referer')) {
      return applyCookie(req, response);
    }
    return response;
  }

  const isFallbackPrefix =
    isPrefix && req.nextUrl.pathname.slice(1, 3) === fallbackLng;
  if (isFallbackPrefix && !isSystem) {
    const currentLng = req.nextUrl.pathname.slice(1, 3);
    let nextPathname = req.nextUrl.pathname.replace(`/${currentLng}`, '');
    if (!nextPathname) nextPathname = '/';
    const response = NextResponse.redirect(new URL(nextPathname, req.url));
    if (req.headers.has('referer')) {
      return applyCookie(req, response);
    }
    return response;
  }

  const response = NextResponse.next();
  if (req.headers.has('referer') && !isSystem) {
    return applyCookie(req, response);
  }
  return response;
}
