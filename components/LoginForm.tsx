'use client';

import { useTranslation } from '@/lib/i18n/client';
import { FormEvent } from 'react';
import { useContext } from 'react';
import { GlobalClientContext } from '@/lib/GlobalClientContext';

function LoginForm() {
  const { lng } = useContext(GlobalClientContext);
  const { t } = useTranslation(lng, 'auth');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">{t('email')}</label>
      <br />
      <input id="email" type="text" name="email" placeholder={t('email')!} />
      <br />
      <button type="submit">{t('action.login')}</button>
    </form>
  );
}

export default LoginForm;
