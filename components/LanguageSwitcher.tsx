import { languages } from '@/lib/i18n/settings';
import { useTranslation } from '@/lib/i18n';
import LanguageLink from './LanguageLink';

async function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const { t } = await useTranslation(currentLang);
  return (
    <div>
      {t('languageSwitcher', { lng: currentLang })}
      {languages
        .filter((l) => currentLang !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' or '}
              <LanguageLink currentLang={currentLang} nextLang={l}>
                {l}
              </LanguageLink>
            </span>
          );
        })}
    </div>
  );
}

export default LanguageSwitcher;
