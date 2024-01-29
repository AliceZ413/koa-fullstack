/**
 * The root layout
 */

import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { App, ConfigProvider } from 'antd';
import { Suspense } from 'react';

export async function loader({ context }: LoaderFunctionArgs) {
  console.log(context);
  return {};
}

export default function IndexPage() {
  return <Outlet />;
}
