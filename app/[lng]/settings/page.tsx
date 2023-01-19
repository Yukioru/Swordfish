import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function SettingsPage({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'settings');
  return (
    <div>
      <h1 className="text-4xl font-extrabold">{t('heading')}</h1>
    </div>
  );
}

export default SettingsPage;
