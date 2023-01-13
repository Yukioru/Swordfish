import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { UseTranslationOptions } from 'types';
import { getOptions } from './settings';

const initI18next = async (lng: string, ns?: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns?: string,
  options: UseTranslationOptions = {}
) {
  const i18nextInstance = await initI18next(lng, ns);

  const namespace: string = Array.isArray(ns) ? ns[0] : ns;
  const tInstance = i18nextInstance.getFixedT(
    lng,
    namespace,
    options.keyPrefix
  );

  return {
    t: tInstance,
    i18n: i18nextInstance,
  };
}
