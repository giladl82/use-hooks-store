# use-hooks-store 🏪
#### A React Hooks state manager

Depends on React Hooks which are available as of react version 16.8.0 and higher.

## Installation
```js
    #Yarn
    yarn add use-hooks-stroe

    # npm
    npm install --save use-hooks-store
```

## Usage

```js
// index.js

import React from 'react';
import { Provider } from 'use-hooks-store';
import reducer from '../../state/reducer';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <Provider state={undefined} reducer={reducer} enableDebug={true}>
      <h1>Todo Hooks Reducer</h1>
      <AddTodo />
      <TodoList />
    </Provider>
  );
};

export default TodoApp;
```
```js
// AddTodo.js

import React from 'react';

import useForm from '../useForm';
import { useStore } from 'use-hooks-store';
import { addTodo } from '../../state/actions';

const AddTodo = () => {
  const actionCreators = useStore(undefined, {
    addTodo
  })[1];

  const { values, handleChange, reset } = useForm();

  const handleSubmit = event => {
    event.preventDefault();
    // dispatch(addTodo(values));
    actionCreators.addTodo(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="todo-input"
        name="todo"
        className="App-todo-input"
        value={values.todo || ''}
        onChange={handleChange}
        required
      />
      <button data-testid="submit-button" className="App-todo-button">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
```
```js
// TodoList.js

import React from 'react';

import { useStore } from 'use-hooks-store';
import { deleteTodo } from '../../state/actions';

const TodoList = () => {
  const [todos, dispatch] = useStore(({todos}) => todos);
  const handleDeleteItem = event => {
    event.preventDefault();
    dispatch(deleteTodo(event.target.dataset.id));
  };

  if (!todos || !todos.length) return null;

  return (
    <ul data-testid="todo-list" className="App-todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.label}{' '}
          <button data-testid="todo-delete" data-id={todo.id} onClick={handleDeleteItem}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

```

## API

`usestore`, is very similar to react-redux in away it enable you to mapStateToProps (mapStateAs) and mapDispatchToProps (mapActionsAs).

### Provider
React component used to pass state to useStore consumers

| property| default | description |
| ------ | ------ | ------ |
| state | undefined | store initial state |
| reducer | | The reducer function to handle action dispatch. Required! |
| enableDebug | false | When true, every action will be logged to console or to Redux devtools |

### useStore
React hook. Used consume Provider's context state.
Receives two optional parameters.

| name| type | description |
| ------ | ------ | ------ |
| mapStateAs | function | Passed in the state and returns an object of the mapped state  |
| mapActionsAs | object | A dictionary of string, function. **When undefined, reducer 'dispatch' function is returned** |


*Handling async actions*

The `mapActionAs`, will handle async action creators.
When passing in an async action creator, `usestore` will check if the action creator is of type promise. If so, it will await it to resolve.
A promise action creator, **most resolve an action**.

### combineReducers
Combine multiple reducer functions, into a single function
Receives a string, function reducers dictionary.

## More resources

If you like to read more about the process of creating this package, you can read this [post](http://www.one.co.il).

## License
MIT
