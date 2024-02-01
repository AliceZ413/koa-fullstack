import { Dispatch, PropsWithChildren, createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { Route } from '@ant-design/pro-layout/lib/typing';
import store from 'store';
import { MenuChild, MenuList } from '../../types/layout';

type State = {
  menuList: MenuList;
  flatMenuList: MenuList;
  layoutMenuList: Route;

  tabList: Array<{ tab: string; key: string; path: string }>;
  tabActiveKey: string;
};
type Action = {
  type: string;
  payload?: any;
};
type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};

const menuList = [
  {
    code: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    children: [
      {
        code: 'dashboard/user',
        path: '/dashboard/user',
        label: 'User',
      },
      {
        code: 'dashboard/home',
        path: '/dashboard/home',
        label: 'Home',
      },
      {
        code: 'dashboard/ui-component',
        path: '/dashboard/ui-component',
        label: 'UI-Component',
      },
    ],
  },
];

const handleFlatMenuList = (menu: MenuList) => {
  const list: MenuChild[] = [];

  menu.forEach((e) => {
    if (!e?.children?.length) {
      list.push(e);
    } else {
      e?.children.forEach((child) => {
        list.push(child);
      });
    }
  });

  return list;
};

const handleLayoutMenuList = (menu: MenuList) => {
  const route: Route = {
    path: '/',
    routes: [],
  };

  route.routes = menu.map((e) => {
    return {
      key: e.code,
      path: e.path,
      name: e.label,
      children: e.children?.map((child) => ({
        key: child.code,
        path: child.path,
        name: child.label,
      })),
    };
  });

  return route;
};

const initValue: State = {
  menuList: [...menuList],
  flatMenuList: handleFlatMenuList(menuList),
  layoutMenuList: handleLayoutMenuList(menuList),

  tabList: [],
  tabActiveKey: '',
};
const GlobalContext = createContext<Context>({
  state: initValue,
  dispatch: () => {},
});

export const ReducerContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer((draft: State, action: Action) => {
    switch (action.type) {
      case 'tabList.push':
        draft.tabList.push(action.payload);
        store.set('tabList', draft.tabList);
        break;
      case 'tabList.set':
        draft.tabList = [...action.payload];
        store.set('tabList', draft.tabList);
        break;
      case 'tabList.splice':
        const { start, deleteNum = 1 } = action.payload;
        draft.tabList.splice(start, deleteNum);
        store.set('tabList', draft.tabList);
        break;
      case 'tabActiveTabKey.set':
        draft.tabActiveKey = action.payload;
        store.set('tabActiveTabKey', draft.tabActiveKey);
        break;
      default:
        break;
    }
  }, initValue);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
