import { Dropdown, Layout, Tooltip } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

type LayoutHeaderProps = {
  collapsed: boolean;
  theme: string;
  toggle: () => void;
};

export default function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <Header className='layout-page-header'>
      <div
        className='logo'
        style={{ width: props.collapsed ? 80 : 200 }}
      ></div>
      <div className='layout-page-header-main'>
        <div onClick={props.toggle}>
          <span className='sidebar-trigger'>
            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className='actions'>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: <span>个人设置</span>,
                },
                {
                  key: '2',
                  icon: <LogoutOutlined />,
                  label: <span>退出登录</span>,
                },
              ],
            }}
          >
            <span className='user-action'>Admin</span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
