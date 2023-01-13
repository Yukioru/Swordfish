import Link from '@/components/Link';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Register({ params }: PropsWithParams) {
  const { t: commonT } = await useTranslation(params.lng, 'common');
  const { t: authT } = await useTranslation(params.lng, 'auth');
  return (
    <div>
      <h1>{commonT('menu.register')}</h1>
      <div>
        <b>{authT('email')}</b>
      </div>
      <button>{authT('action.register')}</button>
      <Link href="/">Back to home</Link>
      <br />
      <Link href="/auth/login">Go to login</Link>
    </div>
  );
}

export default Register;
