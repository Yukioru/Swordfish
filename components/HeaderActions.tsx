import { useTranslation } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';
import ButtonLink from './ButtonLink';
import HeaderUser from './HeaderUser';

async function HeaderActions({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng, 'common');
  const user = await getCurrentUser();

  const isAuth = !!user;
  console.log('user', user);

  return (
    <div className="ml-auto flex h-full items-center">
      {isAuth ? (
        <HeaderUser lng={lng} user={user} />
      ) : (
        <ButtonLink href="/auth/login">{t('menu.login')}</ButtonLink>
      )}
    </div>
  );
}

export default HeaderActions;
