import { Dropdown, Layout } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from '../../styles/layout.module.css';
import { apiLogout } from '../../apis/user';
import { useNavigate } from '@remix-run/react';

const { Header } = Layout;

type LayoutHeaderProps = {
  collapsed: boolean;
  theme: string;
  data: {
    username?: string;
  };
  toggle: () => void;
};

export default function LayoutHeader(props: LayoutHeaderProps) {
  const navigate = useNavigate();
  const onActionClick = async (action: string) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = await apiLogout();
        res && navigate('/login');
        return;
    }
  };

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
          {/* TODO 消息通知 */}
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
                  label: (
                    <span onClick={() => onActionClick('logout')}>
                      退出登录
                    </span>
                  ),
                },
              ],
            }}
          >
            <span className={styles.userAction}>
              {props.data ? props.data.username : null}
            </span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
