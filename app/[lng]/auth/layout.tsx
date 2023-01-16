import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto w-full max-w-xs shrink-0 pt-8 pb-12">{children}</div>
  );
}

export default AuthLayout;
