import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto w-full max-w-xs shrink-0 py-12">{children}</div>
  );
}

export default AuthLayout;
