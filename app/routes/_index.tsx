/**
 * The root layout
 */

import { Outlet } from '@remix-run/react';
import { App, ConfigProvider } from 'antd';

export default function IndexPage() {
  return (
    <ConfigProvider>
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  );
}
