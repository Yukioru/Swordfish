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
