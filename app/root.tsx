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

export const links: LinksFunction = () => {
  const result: LinkDescriptor[] = [
    { rel: 'icon', href: 'data:image/x-icon;base64,AA' },
    {
      rel: 'stylesheet',
      href: resetStyles,
    },
    {
      rel: 'stylesheet',
      href: antdStyle,
    },
  ];

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
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV !== 'production' && <LiveReload />}
      </body>
    </html>
  );
}
