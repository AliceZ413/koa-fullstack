import { Menu } from 'antd';
import { MenuList } from '../../../types/layout';
import { useNavigate } from '@remix-run/react';

type MenuProps = {
  menuList: MenuList;
  selectedKey: string;
  openKey: string;
  onChangeOpenKey: (key?: string) => void;
  onChangeSelectedKey: (key: string) => void;
};

export default function LayoutMenu(props: MenuProps) {
  const {
    menuList,
    selectedKey,
    openKey,
    onChangeOpenKey,
    onChangeSelectedKey,
  } = props;

  const navigate = useNavigate();

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
  };

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
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
    ></Menu>
  );
}
