import CommonTags from '@/lib/head/CommonTags';
import LocalesTags from '@/lib/head/LocalesTags';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';
import { siteName } from '@/config/brand';

async function Head({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'common');
  return (
    <>
      <title>{`${t('head.title')} | ${siteName}`}</title>
      <meta name="description" content={t('head.description', { siteName })!} />
      <CommonTags />
      <LocalesTags lng={params.lng} />
    </>
  );
}

export default Head;
