import { PropsWithChildren } from 'react';
import { PropsWithParams } from 'types';
import { dir } from 'i18next';
import { languages } from '@/lib/i18n/settings';
import { GlobalServerContext } from '@/lib/GlobalServerContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import GlobalContextClientProvider from '@/components/GlobalContextClientProvider';
import '@/styles/globals.css';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

function RootLayout({ children, params }: PropsWithChildren<PropsWithParams>) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <head />
      <body>
        <GlobalServerContext.Provider value={{ lng: params.lng }}>
          <GlobalContextClientProvider lng={params.lng}>
            {children}
          </GlobalContextClientProvider>
        </GlobalServerContext.Provider>
        {/* @ts-expect-error Server Component */}
        <LanguageSwitcher currentLang={params.lng} />
      </body>
    </html>
  );
}

export default RootLayout;
