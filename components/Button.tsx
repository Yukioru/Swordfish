import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { ButtonDefaultProps } from 'types';
import withButtonStyle from '@/lib/hoc/withButtonStyle';

function Button(
  {
    children,
    type = 'button',
    ...props
  }: PropsWithChildren<ButtonDefaultProps>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button ref={ref} type={type} {...props}>
      {children}
    </button>
  );
}

export default withButtonStyle<PropsWithChildren<ButtonDefaultProps>>(
  forwardRef(Button)
);
