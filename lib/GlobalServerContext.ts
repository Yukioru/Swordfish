import { createServerContext } from 'react';
import { GlobalServerContext as TypeGlobalServerContext } from 'types';
import { fallbackLng } from './i18n/settings';

export const GlobalServerContext = createServerContext<TypeGlobalServerContext>(
  'global',
  {
    lng: fallbackLng,
  }
);
