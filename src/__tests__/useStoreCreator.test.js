import { renderHook, cleanup } from 'react-hooks-testing-library';
import { useStoreCreator } from '../useStoreCreator';

afterEach(cleanup);

describe('store', () => {
  describe('useStoreCreator', () => {
    it('Should throw an error if reducers is an undefined object', () => {
      expect(() => {
        useStoreCreator({});
      }).toThrowError();
    });

    it('Should throw an error if a reducer value is not a function', () => {
      expect(() => {
        useStoreCreator(undefined, {});
      }).toThrowError();
    });

    it('Should return a store object', () => {
      const initialStore = {
        data: 'data'
      };

      const reducer = (state, action) => initialStore;

      const { result } = renderHook(() => useStoreCreator(undefined, reducer));

      expect(result.current).toBe(initialStore);
      expect(typeof result.current.__dispatch).toBe('function');
    });
  });
});
