import locales from '@/locales';
import type { HTMLAttributes } from 'react';

type LocaleType = typeof locales['zh-CN'] | typeof locales['zh-HK'] |  typeof locales['ja-JP'];

export interface ComponentProps {
  t: <T extends keyof LocaleType['translation']>(key: T) => LocaleType['translation'][T];
}

export interface Option {
  label: string;
  value: string;
}

export type Options = Option[];

export interface CustomElementProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  stylesheet?: string;
}
