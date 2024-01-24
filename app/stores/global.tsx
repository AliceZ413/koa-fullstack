import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { MenuList } from '../../types/layout';

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

const initValue: State = {
  menuList: [
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
  ],
  flatMenuList: [
    {
      code: 'dashboard',
      path: '/dashboard',
      label: 'Dashboard',
    },
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
};
const GlobalContext = createContext<Context>({
  state: initValue,
  dispatch: () => {},
});

export const ReducerContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      default:
        return { ...state };
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
