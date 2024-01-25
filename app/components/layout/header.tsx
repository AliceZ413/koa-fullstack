import { Dropdown, Layout } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from '../../styles/layout.module.css';

const { Header } = Layout;

type LayoutHeaderProps = {
  collapsed: boolean;
  theme: string;
  toggle: () => void;
};

export default function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <Header className={styles.layoutPageHeader}>
      <div
        className='logo'
        style={{ width: props.collapsed ? 80 : 200 }}
      ></div>
      <div className={styles.layoutPageHeaderMain}>
        <div onClick={props.toggle}>
          <span className={styles.sidebarTrigger}>
            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className={styles.actions}>
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
            <span className={styles.userAction}>Admin</span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
