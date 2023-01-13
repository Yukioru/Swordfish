'use client';

import { GlobalClientContext } from '@/lib/GlobalClientContext';
import { PropsWithChildren } from 'react';
import { GlobalClientContext as TypeGlobalClientContext } from 'types';

function GlobalContextClientProvider({
  lng,
  children,
}: PropsWithChildren<TypeGlobalClientContext>) {
  return (
    <GlobalClientContext.Provider value={{ lng }}>
      {children}
    </GlobalClientContext.Provider>
  );
}

export default GlobalContextClientProvider;
