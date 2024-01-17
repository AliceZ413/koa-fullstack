import Sider, { SiderTheme } from 'antd/es/layout/Sider';
import styles from './Sider.module.css';
import { Menu, MenuProps, MenuTheme } from 'antd';
import {
  ItemType,
  MenuItemGroupType,
  MenuItemType,
} from 'antd/es/menu/hooks/useItems';
import { usePathname, useRouter } from 'next/navigation';
import { Path, pathToRegexp } from 'path-to-regexp';

type MenuItem = Required<MenuProps>['items'][number];

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
  const selectedKeys = pathname ? [pathname] : [];
  const defaultOpenKeys = findOpenSubMenuKey(pathname, menus!);

  const onClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <>
      <Sider theme={theme || 'dark'}>
        <div className={styles.logo}>
          <div className={styles.logoContent}></div>
        </div>
        <Menu
          theme={theme || 'dark'}
          items={menus}
          mode='inline'
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={onClick}
        ></Menu>
      </Sider>
    </>
  );
}
