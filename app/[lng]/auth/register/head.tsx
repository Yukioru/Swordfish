import { siteName } from '@/config/brand';
import CommonTags from '@/lib/head/CommonTags';
import LocalesTags from '@/lib/head/LocalesTags';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Head({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'register');
  return (
    <>
      <title>{`${t('head.title')} | ${siteName}`}</title>
      <meta name="description" content={t('head.description')!} />
      <CommonTags />
      <LocalesTags lng={params.lng} url="/auth/register" />
    </>
  );
}

export default Head;
