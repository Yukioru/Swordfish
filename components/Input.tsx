import { cx } from '@/lib/utils';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

function Input(
  {
    className,
    ...props
  }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={cx(
        'rounded-sm border border-black px-3 leading-10 shadow transition-shadow hover:shadow-md focus:shadow-md focus:outline-none',
        className
      )}
      {...props}
    />
  );
}

export default forwardRef(Input);
