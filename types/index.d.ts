import {
  AnchorHTMLAttributes,
  RefAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import { LinkProps } from 'next/link';

export interface StaticPageParams {
  lng: string;
}

export interface GlobalServerContext {
  lng: string;
  [key: string]: any;
}

export interface GlobalClientContext {
  lng: string;
}

export type PropsWithParams<T = unknown> = T & { params: StaticPageParams };

export interface UseTranslationOptions {
  keyPrefix?: string;
}

export type ButtonDefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ElementDefaultProps = DetailedHTMLProps<HTMLAttributes>;

export type LinkDefaultProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;
