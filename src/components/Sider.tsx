'use client';

import Sider, { SiderTheme } from 'antd/es/layout/Sider';
import styles from './Sider.module.css';
import { Menu, MenuTheme, theme as AntdTheme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MenuChlid, MenuItem } from '@/types/menus';

type LayoutSiderProps = {
  theme?: SiderTheme | MenuTheme;
  menus?: MenuItem[];
};

const findOpenSubMenuKey = (pathname: string, menuItems: any[]) => {
  for (const item of menuItems) {
    if (item.children) {
      for (const child of item.children) {
        if (pathname.startsWith(child.key)) {
          return item.key;
        }
      }
    }
  }
  return []; // 如果没有匹配项，则返回null表示没有展开的SubMenu
};

export default function LayoutSider({ theme, menus }: LayoutSiderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const token = AntdTheme.useToken();
  const selectedKeys = pathname ? [pathname] : [];
  const defaultOpenKeys = findOpenSubMenuKey(pathname, menus!);
  const [collapsed, SetCollapsed] = useState(false);

  const initMenuList = (menus: MenuItem[]) => {
    const menuList: MenuChlid[] = [];

    menus.forEach((menuItem) => {
      if (!menuItem?.children?.length) {
        menuList.push(menuItem);
      } else {
        menuItem?.children.forEach((childMenuItem) => {
          menuList.push(childMenuItem);
        });
      }
    });

    return menuList;
  };
  const menuList: MenuItem[] = initMenuList([
    {
      code: '1',
      label: 'Dashboard',
      path: '/dashboard',
      children: [
        {
          code: '1.1',
          label: 'User',
          path: '/dashboard/user',
          children: [
            
          ],
        },
        {
          code: '1.2',
          label: 'Home',
          path: '/dashboard/home',
        },
        {
          code: '1.3',
          label: 'UI-Component',
          path: '/dashboard/ui-component'
        }
      ],
    },
  ]);

  const onClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <>
      <Sider
        theme={theme || 'dark'}
        collapsible
        collapsedWidth={80}
        collapsed={collapsed}
        breakpoint='md'
        style={{ backgroundColor: token.token.colorBgContainer }}
      >
        <div className={styles.logo}>
          <div className={styles.logoContent}></div>
        </div>
        <Menu
          theme={theme || 'dark'}
          items={menuList.map((menu) => {
            return menu.children
              ? {
                  key: menu.code,
                  label: menu.label,
                  children: menu.children.map((child) => ({
                    key: child.path,
                    label: child.label,
                  })),
                }
              : {
                  key: menu.path,
                  label: menu.label,
                };
          })}
          mode='inline'
        ></Menu>
      </Sider>
    </>
  );
}
