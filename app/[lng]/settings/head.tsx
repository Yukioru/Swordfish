import { siteName } from '@/config/brand';
import CommonTags from '@/lib/head/CommonTags';
import LocalesTags from '@/lib/head/LocalesTags';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Head({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'settings');
  return (
    <>
      <title>{`${t('head.title')} | ${siteName}`}</title>
      <meta name="description" content={t('head.description')!} />
      <meta name="robots" content="noindex" />
      <CommonTags />
      <LocalesTags lng={params.lng} url="/settings" />
    </>
  );
}

export default Head;
