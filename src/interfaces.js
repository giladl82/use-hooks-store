import { struct } from 'superstruct';

export const validateStoreCreatorStruct = struct({
  state: 'any?',
  reducer: 'function'
});

export const validateCombineReducersStruct = ({ reducers }) => {
  const schema1 = struct.dict(['string', 'function']);
  const schema2 = struct.function(v => Object.keys(v).length > 0);
  const schema = struct.intersection([schema1, schema2]);
  const errors = schema.validate(reducers);
  if (errors[0]) {
    throw new Error(errors[0]);
  }

  return true;
};

export const validateUseStoreStruct = struct({
  mapStateAs: 'function?',
  mapActionsAs: 'object?'
});

export const validateMapActionsAs = struct({
  actions: struct.dict(['string', 'function'])
});
