import { useTranslation } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';
import ButtonLink from './ButtonLink';

async function HeaderActions({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, 'common');
  const user = await getCurrentUser();
  // console.log('user', user);

  return (
    <div className="ml-auto flex h-full items-center">
      <ButtonLink href="/auth/login">{t('menu.login')}</ButtonLink>
    </div>
  );
}

export default HeaderActions;
