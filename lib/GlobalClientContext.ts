'use client';
import { createContext } from 'react';
import { GlobalClientContext as TypeGlobalClientContext } from 'types';
import { fallbackLng } from './i18n/settings';

export const GlobalClientContext = createContext<TypeGlobalClientContext>({
  lng: fallbackLng,
});
