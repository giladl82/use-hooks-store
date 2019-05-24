import { validateCombineReducersStruct } from './interfaces';

export const combineReducers = reducers => {
  validateCombineReducersStruct({ reducers });
  return (state, action) => {
    let resultedState = {};

    Object.keys(reducers).forEach(key => {
      const prevState = state ? state[key] : undefined;
      resultedState[key] = reducers[key](prevState, action);
    });

    return resultedState;
  };
};
