import { useContext } from 'react';
import { Context } from './Provider';
import { getClearState } from './getClearState';
import { validateMapActionsAs, validateUseStoreStruct } from './interfaces';

export const useStore = (...maps) => {
  const [mapStateAs, mapActionsAs] = maps;
  validateUseStoreStruct({
    mapStateAs,
    mapActionsAs
  });

  const store = useContext(Context);
  const { __dispatch, __enableDebug, __setAction } = store;
  let state, dispatcher;

  if (mapStateAs) {
    state = mapStateAs(getClearState(store));
  } else {
    state = getClearState(store);
  }

  dispatcher = actionCreator => {
    if (actionCreator instanceof Promise) {
      Promise.all([actionCreator]).then(([action]) => {
        if (__enableDebug) {
          __setAction(action);
        }
        __dispatch(action);
      });
    } else {
      __dispatch(actionCreator);
      if (__enableDebug) {
        __setAction(actionCreator);
      }
    }
  };

  if (mapActionsAs) {
    validateMapActionsAs({
      actions: maps[1]
    });

    const actions = Object.keys(mapActionsAs).reduce((result, key) => {
      result[key] = function() {
        return dispatcher(mapActionsAs[key].apply(this, arguments));
      };

      return result;
    }, {});

    return [state, actions];
  }

  return [state, dispatcher];
};
