import { cleanup } from 'react-hooks-testing-library';
import { combineReducers } from '../combineReducers';

afterEach(cleanup);

describe('store', () => {
  describe('combineReducers', () => {
    it('Should throw an error if reducers is null', () => {
      expect(() => {
        combineReducers(null);
      }).toThrowError();
    });

    it('Should throw an error if reducers is an empty object', () => {
      expect(() => {
        combineReducers({});
      }).toThrowError();
    });

    it('Should throw an error if a reducer value is not a function', () => {
      expect(() => {
        combineReducers({
          test: null
        });
      }).toThrowError();
    });

    it('Should return a combined function and dispatch all reducers on call', () => {
      const rd1 = jest.fn();
      const rd2 = jest.fn();

      const reducers = combineReducers({
        rd1,
        rd2
      });

      const state = {};
      const action = 'TEST';

      expect(typeof reducers).toBe('function');

      reducers(state, action);

      expect(rd1).toHaveBeenCalledTimes(1);
      expect(rd1).toHaveBeenCalledWith(state, action);
      expect(rd2).toHaveBeenCalledTimes(1);
      expect(rd2).toHaveBeenCalledWith(state, action);
    });
  });
});
