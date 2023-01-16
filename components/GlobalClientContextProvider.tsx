'use client';

import { SessionProvider } from 'next-auth/react';
import { GlobalClientContext } from '@/lib/GlobalClientContext';
import { PropsWithChildren } from 'react';
import { GlobalClientContext as TypeGlobalClientContext } from 'types';

function GlobalContextClientProvider({
  lng,
  children,
}: PropsWithChildren<TypeGlobalClientContext>) {
  return (
    <SessionProvider>
      <GlobalClientContext.Provider value={{ lng }}>
        {children}
      </GlobalClientContext.Provider>
    </SessionProvider>
  );
}

export default GlobalContextClientProvider;
