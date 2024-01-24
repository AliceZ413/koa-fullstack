import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

type State = {};

type Context = {
  state: State;
  dispatch: Dispatch<{
    type: string;
    payload?: Partial<State>;
  }>;
};

const initValue: State = {};
const Context = createContext<Context>({
  state: initValue,
  dispatch: () => {},
});

export const ReducerContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    (
      state: State,
      action: {
        type: string;
        payload?: Partial<State>;
      }
    ) => {
      return {
        ...state,
      };
    },
    initValue
  );

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export const useReducerContext = () => {
  return useContext(Context);
};
