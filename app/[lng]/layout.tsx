import { PropsWithChildren } from 'react';
import { PropsWithParams } from 'types';
import { dir } from 'i18next';
// import { languages } from '@/lib/i18n/settings';
import { GlobalServerContext } from '@/lib/GlobalServerContext';
import GlobalContextClientProvider from '@/components/GlobalContextClientProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

import { Manrope } from '@next/font/google';
import { cx } from '@/lib/utils';

const manrope = Manrope({
  weight: 'variable',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
});

// https://github.com/vercel/next.js/pull/43395
// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }));
// }

function RootLayout({ children, params }: PropsWithChildren<PropsWithParams>) {
  return (
    <html
      lang={params.lng}
      dir={dir(params.lng)}
      className={cx(manrope.variable, 'flex min-h-full flex-col')}
    >
      <head />
      <body className="contents">
        <GlobalServerContext.Provider value={{ lng: params.lng }}>
          <GlobalContextClientProvider lng={params.lng}>
            <Header />
            <main className="flex grow flex-col">{children}</main>
            <Footer />
          </GlobalContextClientProvider>
        </GlobalServerContext.Provider>
      </body>
    </html>
  );
}

export default RootLayout;
