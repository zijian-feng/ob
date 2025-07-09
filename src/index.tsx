import '@/assets/styles/global.scss';
import './utils/i18n';

import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { componentSize } from './constants';
import { router } from './router';

import '@/components/Steps';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <ConfigProvider
      componentSize={componentSize}
      theme={{
        token: {
          colorPrimary: '#FF8500',
          colorLink: '#FF8500'
        },
        components: {
          Form: {
            labelColor: '#858A99'
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
