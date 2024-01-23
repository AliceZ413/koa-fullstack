/**
 * The root layout
 */

import { Outlet } from '@remix-run/react';
import { App, ConfigProvider } from 'antd';
import { Suspense } from 'react';

export default function IndexPage() {
  return (
    <ConfigProvider componentSize='middle'>
      <App>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </App>
    </ConfigProvider>
  );
}
