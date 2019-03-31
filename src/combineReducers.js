import { validateCombineReducersStruct } from './interfaces';

export const combineReducers = reducers => {
  validateCombineReducersStruct({ reducers });
  return (state, action) => {
    let resultedState = {};

    Object.keys(reducers).forEach(key => {
      resultedState[key] = reducers[key](state, action);
    });

    return resultedState;
  };
};
