'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from '@/lib/i18n/client';
import { debounce } from 'lodash';
import { useContext, useState } from 'react';
import { GlobalClientContext } from '@/lib/GlobalClientContext';
import FormItem from './FormItem';
import Input from './Input';
import Button from './Button';
import { signIn } from 'next-auth/react';

interface FormData {
  email: string;
}

function LoginForm() {
  const { lng } = useContext(GlobalClientContext);
  const { t } = useTranslation(lng, 'login');
  const { t: commonT } = useTranslation(lng, 'common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const [status, setStatus] = useState('login');
  const [loading, setLoading] = useState(false);

  async function existsValidation(email: string) {
    const res = await fetch('/api/auth/checkEmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());

    setStatus(res?.status || 'login');
    return true;
  }

  async function onSubmit(data: FormData) {
    const res = await signIn('email', {
      email: data.email,
      redirect: false,
    });

    console.log('res', res);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormItem id="email" label={t('email')} error={errors.email?.message}>
        <Input
          {...register('email', {
            required: commonT('form.validate.notEmpty')!,
            validate: {
              exists: debounce(existsValidation, 200),
            },
          })}
          placeholder="dumbledore@hogwarts.uk"
        />
      </FormItem>
      <Button block type="submit">
        {t(status)}
      </Button>
    </form>
  );
}

export default LoginForm;
