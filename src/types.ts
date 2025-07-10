import locales from '@/locales';

type LocaleType = typeof locales['zh-CN'] | typeof locales['zh-HK'] |  typeof locales['ja-JP'];

export interface ComponentProps {
  t: <T extends keyof LocaleType['translation']>(key: T) => LocaleType['translation'][T];
}

export interface Option {
  label: string;
  value: string;
}

export type Options = Option[];

export interface CustomElementProps {
  stylesheet?: string;
  class?: string
}
