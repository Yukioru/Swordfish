import { GlobalServerContext } from '@/lib/GlobalServerContext';
import isAbsoluteURL from '@/lib/isAbsoluteURL';
import NextLink, { LinkProps } from 'next/link';
import { forwardRef, Ref, useContext } from 'react';
import { fallbackLng } from '@/lib/i18n/settings';

function Link(
  {
    href,
    ...props
  }: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>,
  ref: Ref<HTMLAnchorElement>
) {
  const { lng } = useContext(GlobalServerContext);
  let langPrefix = '';
  if (typeof href === 'string' && !isAbsoluteURL(href) && lng !== fallbackLng) {
    langPrefix = `/${lng}`;
  }
  return <NextLink ref={ref} href={`${langPrefix}${href}`} {...props} />;
}

export default forwardRef(Link);
