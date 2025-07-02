import '@/assets/styles/global.scss';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';
import IntlProvider from '@/contexts/IntlProvider';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <IntlProvider>
      <RouterProvider router={router} />
    </IntlProvider>
  );
}
