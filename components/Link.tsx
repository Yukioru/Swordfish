import { GlobalServerContext } from '@/lib/GlobalServerContext';
import isAbsoluteURL from '@/lib/isAbsoluteURL';
import NextLink from 'next/link';
import { forwardRef, Ref, useContext } from 'react';
import { fallbackLng } from '@/lib/i18n/settings';
import { LinkDefaultProps } from 'types';

function Link(
  { href, ...props }: LinkDefaultProps,
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
