import LanguageSwitcher from '@/components/LanguageSwitcher';
import { PropsWithChildren } from 'react';
import { PropsWithParams } from 'types';

function AuthTemplate({
  children,
  params,
}: PropsWithChildren<PropsWithParams>) {
  return (
    <div className="container min-h-screen">
      {children}
      {/* @ts-expect-error Server Component */}
      <LanguageSwitcher currentLang={params.lng} />
    </div>
  );
}

export default AuthTemplate;
