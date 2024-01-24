import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { MenuList } from '../../../types/layout';
import { useLocation } from '@remix-run/react';
import { useList } from 'react-use';

type Props = {
  menuList: MenuList;
};

export default function LayoutTabs(props: Props) {
  const { menuList } = props;
  const [tags, setTags] = useState<
    Array<{
      path: string;
      label: string;
      closable: boolean;
    }>
  >([]);
  const location = useLocation();

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find((m) => m.path === location.pathname);
      if (menu) {
        const exist = tags.find((e) => e.path == menu.path);
        if (!exist) {
          setTags([
            ...tags,
            {
              label: menu.label,
              path: menu.path,
              closable: menu.path !== '/dashboard',
            },
          ]);
        }
      }
    }
  }, [location.pathname, menuList]);

  return (
    <Tabs
      style={{ padding: '6px 4px' }}
      type='editable-card'
      tabBarStyle={{ margin: 0 }}
      hideAdd
      items={tags.map((tag) => ({
        key: tag.path,
        closable: tag.closable,
        label: tag.label,
      }))}
    ></Tabs>
  );
}
