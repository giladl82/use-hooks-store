import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useStoreCreator } from './useStoreCreator';
import { getClearState } from './getClearState';

export const Context = React.createContext();

export const Provider = ({ children, state, reducer, enableDebug }) => {
  const store = useStoreCreator(state, reducer, enableDebug);
  const [devTools, setDevTools] = useState();
  store.__enableDebug = enableDebug;

  useEffect(() => {
    if (enableDebug) {
      if (
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__.connect &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__.connect === 'function'
      ) {
        const tools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
        setDevTools(tools);
        tools.init();
      }
    }
  }, [enableDebug]);

  useEffect(() => {
    if (enableDebug) {
      if (devTools) {
        devTools.send(store.__action, getClearState(store));
      } else {
        console.log(
          `%cAction: %c${JSON.stringify(store.__action)} |  %cState: %c${JSON.stringify(getClearState(store))}`,
          'font-weight:bold; color: green; font-size: 15px;',
          'color: black; font-size: 15px;',
          'font-weight:bold; color: blue; font-size: 15px;',
          'color: black; font-size: 15px;'
        );
      }
    }
  }, [store, enableDebug, devTools]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  reducer: PropTypes.func.isRequired,
  state: PropTypes.object,
  enableDebug: PropTypes.bool
};

Provider.defaultProps = {
  state: undefined,
  enableDebug: false
};
