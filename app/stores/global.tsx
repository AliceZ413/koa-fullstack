import { Dispatch, PropsWithChildren, createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { MenuChild, MenuList } from '../../types/layout';

type State = {
  menuList: MenuList;
  flatMenuList: MenuList;
};
type Action = {
  type: string;
  payload?: Partial<State>;
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

const initMenuList = (menu: MenuList) => {
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

const initValue: State = {
  menuList: [...menuList],
  flatMenuList: initMenuList(menuList),
};
const GlobalContext = createContext<Context>({
  state: initValue,
  dispatch: () => {},
});

export const ReducerContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer((draft: State, action: Action) => {
    switch (action.type) {
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
