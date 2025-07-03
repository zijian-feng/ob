import resources from '@/locales';
import i18next from 'i18next';
import { I18nextProvider, reactI18nextModule } from "react-i18next";
import type { LocaleProviderProps } from "./types";

const i18n = i18next.use(reactI18nextModule).init({
  resources,
  lng: 'zh-CN',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  }
})
export default function LocaleProvider(props: LocaleProviderProps) {
  const { children } = props;
  return (
    <I18nextProvider
      i18n={i18n}
    >
      {children}
    </I18nextProvider>
  )
}