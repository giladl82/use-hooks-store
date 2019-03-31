
export const getClearState = store => {
  const state = { ...store };
  Object.keys(state).forEach(key => {
    if (key.startsWith('__')) {
      delete state[key];
    }
  });

  return state;
};