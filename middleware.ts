import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { languages, fallbackLng } from '@/lib/i18n/settings';
import acceptLanguage from '@/lib/accept-language';

acceptLanguage.languages(languages);

const authPages = ['/auth/login'];
const restrictedToAuth = ['/settings'];

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

const cookieName = String(process.env.I18N_COOKIE_NAME);

function getCurrentLang(req: NextRequest, isPrefix?: boolean) {
  let lng: string | null | undefined;
  let fallbackUsed = false;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)!.value)!;
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('accept-language'));
  }
  if (!lng) {
    lng = fallbackLng;
    fallbackUsed = true;
  }

  if (isPrefix) {
    const currentPathLng = req.nextUrl.pathname.slice(1, 3);
    if (lng !== currentPathLng && currentPathLng !== fallbackLng) {
      lng = currentPathLng;
    }
  }

  return {
    lng,
    fallbackUsed,
  };
}

function i18Next(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  ) {
    return NextResponse.next();
  }

  const isPrefix = languages.some((lang) =>
    req.nextUrl.pathname.startsWith(`/${lang}`)
  );

  const { lng, fallbackUsed } = getCurrentLang(req, isPrefix);

  function applyCookieFromReferrer(req: NextRequest, res: NextResponse) {
    const refererUrl = new URL(req.headers.get('referer')!);
    console.log('refererUrl', refererUrl);
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

    if (lngInReferer) {
      res.cookies.set(cookieName, lngInReferer);
    }
    return res;
  }

  const isSystem = req.nextUrl.pathname.startsWith('/_next');

  if (!isPrefix && !isSystem) {
    const response = NextResponse[lng !== fallbackLng ? 'redirect' : 'rewrite'](
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );

    if (req.headers.has('referer')) {
      return applyCookieFromReferrer(req, response);
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
      return applyCookieFromReferrer(req, response);
    }
    return response;
  }

  const response = NextResponse.next();
  if (req.headers.has('referer') && !isSystem) {
    return applyCookieFromReferrer(req, response);
  }
  if (isPrefix && fallbackUsed) {
    const currentLng = req.nextUrl.pathname.slice(1, 3);
    if (currentLng) {
      response.cookies.set(cookieName, currentLng);
    }
  }
  return response;
}

async function auth(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  let isAuthPage = false;
  authPages.forEach((page) => {
    if (isAuthPage) return;
    isAuthPage = req.nextUrl.pathname.includes(page);
  });

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return null;
  }

  let isRestrictedToAuthPage = false;
  restrictedToAuth.forEach((page) => {
    if (isRestrictedToAuthPage) return;
    isRestrictedToAuthPage = req.nextUrl.pathname.includes(page);
  });

  if (!isAuth && isRestrictedToAuthPage) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    const { lng } = getCurrentLang(req);
    return NextResponse.redirect(
      new URL(
        `${
          lng === fallbackLng ? '' : `/${lng}`
        }/auth/login?from=${encodeURIComponent(from)}`,
        req.url
      )
    );
  }
}

async function middleware(req: NextRequest) {
  const res = await auth(req);
  if (res) return res;

  return i18Next(req);
}

export default withAuth(middleware, {
  callbacks: {
    async authorized() {
      return true;
    },
  },
});
