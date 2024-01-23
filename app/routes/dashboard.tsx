import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { LinksFunction } from '@remix-run/node';
import { SiderTheme } from 'antd/es/layout/Sider';
import { Outlet, useLocation } from '@remix-run/react';

import layoutStyles from '../styles/layout.css';
import LayoutHeader from '../components/layout/header';
import LayoutMenu from '../components/layout/menu';
import { MenuList } from '../../types/layout';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: layoutStyles },
];

const { Sider, Content } = Layout;

export default function Dashboard() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [theme] = useState<SiderTheme>('light');
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [openKey, setOpenKey] = useState<string>();
  const menuList: MenuList = [
    {
      code: '1',
      label: 'Dashboard',
      path: '/dashboard',
      children: [
        {
          code: '1.1',
          label: 'User',
          path: '/dashboard/user',
        },
        {
          code: '1.2',
          label: 'Home',
          path: '/dashboard/home',
        },
        {
          code: '1.3',
          label: 'UI-Component',
          path: '/dashboard/ui-component',
        },
      ],
    },
  ];

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const getStrTimesIndex = (str: string, cha: string, num: number) => {
    let x = str.indexOf(cha);

    for (let i = 0; i < num; i++) {
      x = str.indexOf(cha, x + 1);
    }

    return x;
  };

  const getFirstPathCode = (path: string) => {
    const index0 = getStrTimesIndex(path, '/', 0);
    const index1 = getStrTimesIndex(path, '/', 1);

    const activeKey = path.slice(index0 + 1, index1 > 0 ? index1 : path.length);

    return activeKey;
  };

  useEffect(() => {
    const path = getFirstPathCode(location.pathname);
    const item = menuList.find((e) => e.path === `/${path}`);

    setOpenKey(item ? item.code : '');
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  return (
    <Layout className='layout-page'>
      <LayoutHeader
        collapsed={collapsed}
        toggle={toggle}
        theme={theme}
      />
      <Layout hasSider>
        <Sider
          className='layout-page-sider'
          trigger={null}
          collapsible
          theme={theme}
          collapsedWidth={80}
          collapsed={collapsed}
          breakpoint='md'
        >
          <LayoutMenu
            menuList={menuList}
            selectedKey={selectedKey}
            openKey={openKey as string}
            onChangeOpenKey={(k) => setOpenKey(k)}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
