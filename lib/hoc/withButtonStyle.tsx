import {
  ComponentType,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { ElementDefaultProps } from 'types';
import { cx } from '../utils';

interface ExtraButtonProps {
  block?: boolean;
}

function withButtonStyle<P = ElementDefaultProps>(
  WrappedComponent: ComponentType<PropsWithChildren<P | ElementDefaultProps>>
): ForwardRefExoticComponent<
  P & ExtraButtonProps & RefAttributes<HTMLElement>
> {
  function Wrapped(
    {
      className,
      block,
      ...props
    }: PropsWithChildren<(P & ExtraButtonProps) | ElementDefaultProps>,
    ref: ForwardedRef<HTMLElement>
  ) {
    return (
      <WrappedComponent
        ref={ref}
        className={cx(
          'rounded-sm bg-black px-3 pt-1 pb-1.5 text-sm font-medium tracking-wide text-white shadow-sm shadow-black/25 transition-shadow hover:shadow-md hover:shadow-black/25 active:bg-black/90',
          {
            'w-full': block,
          },
          className
        )}
        {...props}
      />
    );
  }

  Wrapped.displayName = `Wrapped${WrappedComponent.displayName}`;

  const WrappedWithRef = forwardRef<
    HTMLElement,
    PropsWithoutRef<
      PropsWithChildren<(P & ExtraButtonProps) | ElementDefaultProps>
    >
  >(Wrapped);

  return WrappedWithRef;
}

export default withButtonStyle;
