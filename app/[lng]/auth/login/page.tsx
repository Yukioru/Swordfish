import Link from '@/components/Link';
import LoginForm from '@/components/LoginForm';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Login({ params }: PropsWithParams) {
  const { t: commonT } = await useTranslation(params.lng, 'common');
  return (
    <div>
      <h1>{commonT('menu.login')}</h1>
      <LoginForm />
      <Link href="/">Back to home</Link>
      <br />
      <Link href="/auth/register">Go to register</Link>
    </div>
  );
}

export default Login;
