import React from 'react';
import { Provider } from '../Provider';
import { render } from 'react-testing-library';

export const renderWithStore = (ui, { initialState, reducer } = {}) => {
  return {
    ...render(
      <Provider state={{...initialState}} reducer={reducer} enableDebug={false}>
        {ui}
      </Provider>
    )
  };
};
