import React from 'react';
import { cleanup } from 'react-hooks-testing-library';
import { renderWithStore } from '../__helpers__/renderWithStore';
import { useStore } from '../useStore';

afterEach(cleanup);

describe('store', () => {
  describe('useStore abilities', () => {
    it('Should get full store state', () => {
      const initialState = {
        data: 'data'
      };

      const reducer = (state, action) => ({ ...initialState });

      let resultedState;
      const Child = () => {
        const [state, dispatch] = useStore();
        resultedState = state;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState);
    });

    it('Should get only the data from store state', () => {
      const initialState = {
        data: 'data'
      };

      const reducer = (state, action) => ({ ...initialState });

      let resultedState;
      const Child = () => {
        const [data, dispatch] = useStore(s => s.data);
        resultedState = data;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState.data);
    });

    it('Should get only the data from store state + the action from the reducer', () => {
      const initialState = {
        data: 'data'
      };

      const st1Action = () => ({ type: 'ACTION' });

      const reducer = (state, action) => ({ ...initialState });

      let resultedState, resultedDispatch;
      const Child = () => {
        const [data, actions] = useStore(s => s.data, {
          st1: st1Action
        });

        resultedState = data;
        resultedDispatch = actions;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState.data);
      expect(typeof resultedDispatch.st1).toBe('function');
    });
  });
});
