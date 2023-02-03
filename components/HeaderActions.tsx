import { useTranslation } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';
import HeaderUser from './HeaderUser';
import Link from './Link';

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
        <Link className="button button-md" href="/auth/login">
          {t('menu.login')}
        </Link>
      )}
    </div>
  );
}

export default HeaderActions;
