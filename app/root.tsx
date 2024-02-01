import { cssBundleHref } from '@remix-run/css-bundle';
import { LinkDescriptor, LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import resetStyles from './styles/reset.css';
import antdStyle from './styles/antd.min.css';
import { ReducerContextProvider } from './stores/global';
import { ConfigProvider, App as AntdApp, Spin } from 'antd';
import { PropsWithChildren } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

export const links: LinksFunction = () => {
  const result: LinkDescriptor[] = [
    { rel: 'icon', href: 'data:image/x-icon;base64,AA' },
    {
      rel: 'stylesheet',
      href: resetStyles,
    },
  ];

  if (process.env.NODE_ENV === 'production') {
    result.push({ rel: 'stylesheet', href: antdStyle });
  }

  cssBundleHref && result.push({ rel: 'stylesheet', href: cssBundleHref });

  return result;
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Koa + Remix' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  ];
};

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* BUG Provider必须此组件引入，其他地方讲将不会生效 */}
        <ClientOnly fallback={<Spin></Spin>}>
          {() => (
            <ReducerContextProvider>
              <div id='root'>
                <ConfigProvider componentSize='middle'>
                  <AntdApp>
                    <Outlet />
                  </AntdApp>
                </ConfigProvider>
              </div>
            </ReducerContextProvider>
          )}
        </ClientOnly>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV !== 'production' && <LiveReload />}
      </body>
    </html>
  );
}
