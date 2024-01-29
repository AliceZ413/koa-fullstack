/**
 * The root layout
 */

import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { App, ConfigProvider } from 'antd';
import { Suspense } from 'react';

export async function loader({ context }: LoaderFunctionArgs) {
  console.log(context);
}

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
