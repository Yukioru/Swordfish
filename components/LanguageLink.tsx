'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

function LanguageLink({
  currentLang,
  nextLang,
  children,
  ...props
}: PropsWithChildren<{ currentLang: string; nextLang: string }>) {
  const pathname = usePathname();
  let realPath = pathname;
  if (pathname?.startsWith(`/${currentLang}`)) {
    realPath = pathname?.replace(`/${currentLang}`, '');
  }
  return (
    <Link href={`/${nextLang}${realPath}`} prefetch={false} {...props}>
      {children}
    </Link>
  );
}

export default LanguageLink;
