import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Confirm({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'confirm');
  return (
    <>
      <h1 className="mb-6 text-4xl font-extrabold">{t('heading')}</h1>
      <p>{t('description')}</p>
    </>
  );
}

export default Confirm;
