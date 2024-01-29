import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { SiderTheme } from 'antd/es/layout/Sider';
import { Outlet, useLocation } from '@remix-run/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';

import styles from '../styles/layout.module.css';
import LayoutHeader from '../components/layout/header';
import LayoutMenu from '../components/layout/menu';
import LayoutTabs from '../components/layout/tabs';
import { useGlobalContext } from '../stores/global';
import { RemixUserContext } from '../../shared/context';

export function loader({ context }: LoaderFunctionArgs) {
  console.log(context);

  const user = context.user as RemixUserContext;
  if (!user || !user.isLogIn) {
    return redirect('/login');
  }

  return {
    username: user.username,
  };
}

const { Sider, Content } = Layout;

export default function Dashboard() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [theme] = useState<SiderTheme>('light');
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [openKey, setOpenKey] = useState<string>();

  const { state } = useGlobalContext();

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
    const item = state.menuList.find((e) => e.path === `/${path}`);

    setOpenKey(item ? item.code : '');
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  return (
    <Layout className={styles.layoutPage}>
      <LayoutHeader
        collapsed={collapsed}
        toggle={toggle}
        theme={theme}
      />
      <Layout hasSider>
        <Sider
          className={styles.layoutPageSider}
          trigger={null}
          collapsible
          theme={theme}
          collapsedWidth={80}
          collapsed={collapsed}
          breakpoint='md'
        >
          <LayoutMenu
            menuList={state.menuList}
            selectedKey={selectedKey}
            openKey={openKey as string}
            onChangeOpenKey={(k) => setOpenKey(k)}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Sider>
        <Content className={styles.layoutPageContent}>
          <LayoutTabs menuList={state.flatMenuList} />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
