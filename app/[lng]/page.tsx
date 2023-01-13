import Link from '@/components/Link';
import { useTranslation } from '@/lib/i18n';
import { PropsWithParams } from 'types';

async function Home({ params }: PropsWithParams) {
  const { t } = await useTranslation(params.lng);
  return (
    <>
      <h1>This is home page</h1>
      <br />
      <p>
        <Link href="/auth/login">{t('menu.login')}</Link>
      </p>
      <p>
        <Link href="/auth/register">{t('menu.register')}</Link>
      </p>
      <p>
        <Link href="https://google.com">Go to Google absolute</Link>
      </p>
    </>
  );
}

export default Home;
