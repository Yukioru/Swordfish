import LoginForm from '@/components/LoginForm';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Login({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng, 'login');
  return (
    <>
      <h1 className="mb-6 text-4xl font-extrabold">{t('heading')}</h1>
      <LoginForm />
    </>
  );
}

export default Login;
