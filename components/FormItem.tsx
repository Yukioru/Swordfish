import { cx } from '@/lib/utils';
import {
  cloneElement,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';

interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  id: string;
  label?: string | null;
  error?: string;
  children?: ReactElement;
}

function FormItem({ id, label, error, children }: FormItemProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="leading-8 text-stone-600">
          {label}
        </label>
      )}
      {children &&
        cloneElement(children as ReactElement, {
          ...(children?.props || {}),
          id,
          'aria-invalid': error ? 'true' : 'false',
          className: cx(children?.props?.className, {
            'border-red-500': Boolean(error),
          }),
        })}
      {<small className="h-6 leading-6 text-red-500">{error}</small>}
    </div>
  );
}

export default FormItem;
