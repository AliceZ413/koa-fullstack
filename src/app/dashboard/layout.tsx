'use client';

import { Layout, Menu, MenuProps } from 'antd';
import { PropsWithChildren } from 'react';

import styles from './layout.module.css';
import LayoutSider from '@/components/Sider';

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const items: MenuItem[] = [
    {
      key: '/dashboard',
      label: 'Dashboard',
      children: [
        {
          key: '/dashboard/home',
          label: 'Home',
        },
        {
          key: '/dashboard/user',
          label: 'User',
        },
        {
          key: '/dashboard/post',
          label: 'Post',
        },
      ],
    },
  ];

  return (
    <>
      <Layout
        hasSider
        className={styles.page}
      >
        <LayoutSider menus={items} />
        <div className={styles.container}>
          <Header></Header>
          <Content className={styles.content}>
            {/* <Bread routerList={routerList} /> */}
            {children}
          </Content>
        </div>
      </Layout>
    </>
  );
}
