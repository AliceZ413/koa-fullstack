import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { MenuList } from '../../../types/layout';
import { useLocation, useNavigate } from '@remix-run/react';

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
  const navigate = useNavigate();

  const handleChange = (activeKey: string) => {
    const tag = tags.find((e) => e.path === activeKey);
    if (tag) {
      if (tag.path !== location.pathname) {
        navigate(tag.path);
      }
    }
  };
  const handleClose = (targetKey: string) => {
    const index = tags.findIndex((e) => e.path === targetKey);
    const newTags = tags.filter((e) => e.path !== targetKey);
    setTags([...newTags]);
    if (targetKey === location.pathname) {
      // 删除的节点为当前展示的节点
      // 优先展示右侧节点，其次左侧节点
      if (newTags[index]) {
        // 展示右侧节点
        navigate(newTags[index].path);
        return;
      }
      if (newTags[index - 1]) {
        navigate(newTags[index - 1].path);
        return;
      }
      navigate('/dashboard');
    }
  };

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
      activeKey={location.pathname}
      tabBarStyle={{ margin: 0 }}
      hideAdd
      items={tags.map((tag) => ({
        key: tag.path,
        closable: tag.closable,
        label: tag.label,
      }))}
      onEdit={(targetKey, action) =>
        action === 'remove' && handleClose(targetKey as string)
      }
      onChange={handleChange}
    ></Tabs>
  );
}
