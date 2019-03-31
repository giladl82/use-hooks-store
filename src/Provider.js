import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useStoreCreator } from './useStoreCreator';
import { getClearState } from './getClearState';

export const Context = React.createContext();

export const Provider = ({ children, state, reducer, enableDebug }) => {
  const store = useStoreCreator(state, reducer, enableDebug);
  store.__enableDebug = enableDebug;

  useEffect(() => {
    if (enableDebug) {
      console.log(
        `%cAction: %c${JSON.stringify(store.__action)} |  %cState: %c${JSON.stringify(getClearState(store))}`,
        'font-weight:bold; color: green; font-size: 15px;',
        'color: black; font-size: 15px;',
        'font-weight:bold; color: blue; font-size: 15px;',
        'color: black; font-size: 15px;'
      );
    }
  }, [store]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

Provider.propTypes = {
  reducer: PropTypes.func.isRequired,
  state: PropTypes.object,
  enableDebug: PropTypes.bool
};

Provider.defaultProps = {
  state: undefined,
  enableDebug: false
};
