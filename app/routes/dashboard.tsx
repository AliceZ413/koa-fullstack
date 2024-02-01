import { Avatar, Dropdown, TabPaneProps } from 'antd';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import store from 'store';
import { RemixUserContext } from '../../shared/context';
import { apiLogout } from '../apis/user';
import { useGlobalContext } from '../stores/global';

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

export default function Dashboard() {
  const location = useLocation();
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [tabActiveKey, setTabActiveKey] = useState('');

  const { dispatch, state } = useGlobalContext();

  useEffect(() => {
    const tabList = store.get('tabList');
    if (tabList) {
      dispatch({
        type: 'tabList.set',
        payload: tabList,
      });
    }

    const tabActiveTabKey = store.get('tabActiveTabKey');
    if (tabActiveTabKey) {
      dispatch({
        type: 'tabActiveTabKey.set',
        payload: tabActiveTabKey,
      });
    }
  }, []);

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

  const handleClickMenuItem = (item: MenuDataItem) => {
    navigate(item.path!);
    const exist = state.tabList.findIndex((e) => e.key === item.key);
    if (exist === -1) {
      dispatch({
        type: 'tabList.push',
        payload: {
          key: item.key,
          tab: item.name,
          path: item.path,
        },
      });
    }
    dispatch({
      type: 'tabActiveTabKey.set',
      payload: item.key,
    });
  };

  return (
    <ProLayout
      layout='mix'
      route={state.layoutMenuList}
      location={{
        pathname: location.pathname,
      }}
      menuItemRender={(item) => (
        <Link
          to={item.path!}
          onClick={() => handleClickMenuItem(item)}
        >
          {item.name}
        </Link>
      )}
      logo={false}
      title={'Dashboard'}
      collapsedButtonRender={() => null}
      avatarProps={{
        render() {
          return (
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
              <Avatar>{loaderData.username.charAt(0).toUpperCase()}</Avatar>
            </Dropdown>
          );
        },
      }}
    >
      <PageContainer
        tabActiveKey={state.tabActiveKey}
        tabList={state.tabList}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onTabClick: (value) => {
            const tab = state.tabList.find((e) => e.key === value);
            if (tab) {
              if (tab.key) {
                const key = tab.key as string;
                dispatch({
                  type: 'tabActiveTabKey.set',
                  payload: key,
                });
                navigate(key.startsWith('/') ? key : `/${key}`);
              }
            }
          },
          onEdit: (key, action) => {
            if (action === 'remove') {
              const index = state.tabList.findIndex((e) => e.key === key);
              const newTags = state.tabList.filter((e) => e.key !== key);
              dispatch({
                type: 'tabList.set',
                payload: newTags,
              });
              if (key === state.tabActiveKey) {
                if (newTags[index]) {
                  navigate(newTags[index].path);
                  dispatch({
                    type: 'tabActiveTabKey.set',
                    payload: newTags[index].key,
                  });
                  return;
                }
                if (newTags[index - 1]) {
                  navigate(newTags[index - 1].path);
                  dispatch({
                    type: 'tabActiveTabKey.set',
                    payload: newTags[index - 1].key,
                  });
                  return;
                }
                navigate('/dashboard');
              }
            } else {
              return;
            }
          },
        }}
        ghost
        header={{
          breadcrumb: {},
          title: '',
          subTitle: '',
        }}
      >
        <button
          onClick={() =>
            dispatch({
              type: 'tabActiveTabKey.set',
              payload: 'dashboard',
            })
          }
        >
          test
        </button>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );

  // return (
  //   <Layout className={styles.layoutPage}>
  //     <LayoutHeader
  //       collapsed={collapsed}
  //       toggle={toggle}
  //       theme={theme}
  //       data={{
  //         username: loaderData.username,
  //       }}
  //     />
  //     <Layout hasSider>
  //       <Sider
  //         className={styles.layoutPageSider}
  //         trigger={null}
  //         collapsible
  //         theme={theme}
  //         collapsedWidth={80}
  //         collapsed={collapsed}
  //         breakpoint='md'
  //       >
  //         <LayoutMenu
  //           menuList={state.menuList}
  //           selectedKey={selectedKey}
  //           openKey={openKey as string}
  //           onChangeOpenKey={(k) => setOpenKey(k)}
  //           onChangeSelectedKey={(k) => setSelectedKey(k)}
  //         />
  //       </Sider>
  //       <Content className={styles.layoutPageContent}>
  //         <LayoutTabs menuList={state.flatMenuList} />
  //         <Outlet />
  //       </Content>
  //     </Layout>
  //   </Layout>
  // );
}
