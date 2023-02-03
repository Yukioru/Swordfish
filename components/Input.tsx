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
  return <input ref={ref} className={cx('input', className)} {...props} />;
}

export default forwardRef(Input);
