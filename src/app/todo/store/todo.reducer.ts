import { createFeature, createReducer, on } from '@ngrx/store';
import { TodoStateInterface } from './store.model';
import { getTodosSuccessAction } from './todo.action';

const todoState: TodoStateInterface = {
  todos: [],
};

const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    todoState,
    on(getTodosSuccessAction, (state, action) => {
      return {
        ...state,
        todos: action.todos,
      };
    }),
  ),
});

export const {
  name: todoFeatureKey,
  reducer: todoReducer,
  selectTodos,
} = todoFeature;
