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

function withButtonStyle<P = ElementDefaultProps>(
  WrappedComponent: ComponentType<PropsWithChildren<P | ElementDefaultProps>>
): ForwardRefExoticComponent<P & RefAttributes<HTMLElement>> {
  function Wrapped(
    { className, ...props }: PropsWithChildren<P | ElementDefaultProps>,
    ref: ForwardedRef<HTMLElement>
  ) {
    return (
      <WrappedComponent
        ref={ref}
        className={cx(
          'rounded-md bg-black px-3 pt-1 pb-1.5 text-sm font-medium tracking-wide text-white shadow-sm shadow-black/25 transition-shadow hover:shadow-lg hover:shadow-black/25 active:bg-black/90',
          className
        )}
        {...props}
      />
    );
  }

  Wrapped.displayName = `Wrapped${WrappedComponent.displayName}`;

  const WrappedWithRef = forwardRef<
    HTMLElement,
    PropsWithoutRef<PropsWithChildren<P | ElementDefaultProps>>
  >(Wrapped);

  return WrappedWithRef;
}

export default withButtonStyle;
