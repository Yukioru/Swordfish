'use client';

import { useTranslation } from '@/lib/i18n/client';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { MouseEvent } from 'react';
import Button from './Button';

function HeaderUser({ user, lng }: { user: User; lng: string }) {
  const { t } = useTranslation(lng, 'common');
  console.log('user', user);

  async function handleLogout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await signOut({
      callbackUrl: '/',
    });
  }

  return <Button onClick={handleLogout}>{t('menu.logout')}</Button>;
}

export default HeaderUser;
