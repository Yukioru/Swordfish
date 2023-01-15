import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { ButtonDefaultProps } from 'types';
import withButtonStyle from '@/lib/hoc/withButtonStyle';

function Button(
  { children, ...props }: PropsWithChildren<ButtonDefaultProps>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
}

export default withButtonStyle<PropsWithChildren<ButtonDefaultProps>>(
  forwardRef(Button)
);
