import messages from '@/locales';
import { useLocaleStore } from '@/store/locale';
import { IntlProvider as Provider } from 'react-intl';

import type { IntlProviderProps } from './types';


export default function IntlProvider(props: IntlProviderProps) {
  const { children } = props;
  const locale = useLocaleStore((state) => state.locale);
  return (
    <Provider locale={ locale } messages={ messages[locale] }>
      {children}
    </Provider>
  )
}