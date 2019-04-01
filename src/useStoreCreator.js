import { useReducer, useState } from 'react';
import { validateStoreCreatorStruct } from './interfaces';

export const useStoreCreator = (state, reducer) => {
  validateStoreCreatorStruct({
    state,
    reducer
  });

  state = state ? { ...state } : undefined;

  const ACTION_TYPE = '@@INIT_STATE';
  const [store, dispatch] = useReducer(reducer, reducer(state, { ACTION_TYPE }));
  const [action, setAction] = useState(ACTION_TYPE);

  store.__dispatch = dispatch;
  store.__action = action;
  store.__setAction = setAction;

  return store;
};
