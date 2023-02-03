'use client';

import { useTranslation } from '@/lib/i18n/client';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { MouseEvent } from 'react';

function HeaderUser({ user, lng }: { user: User; lng: string }) {
  const { t } = useTranslation(lng, 'common');
  console.log('user', user);

  async function handleLogout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await signOut({
      callbackUrl: '/',
    });
  }

  return (
    <button className="button button-md" onClick={handleLogout}>
      {t('menu.logout')}
    </button>
  );
}

export default HeaderUser;
