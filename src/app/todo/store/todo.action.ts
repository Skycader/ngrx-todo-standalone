import { createAction, props } from '@ngrx/store';
import { TodoActionTypes } from './action-types.enum';
import { TodoInterface } from '../todo.model';

export const addTodoAction = createAction(
  TodoActionTypes.ADD_TODO,
  props<{ todo: TodoInterface }>(),
);

export const addTodoSuccessAction = createAction(
  TodoActionTypes.ADD_TODO_SUCCESS,
);

export const addTodoFailureAction = createAction(
  TodoActionTypes.ADD_TODO_FAILURE,
);

export const getTodosAction = createAction(TodoActionTypes.GET_TODOS);

export const getTodosSuccessAction = createAction(
  TodoActionTypes.GET_TODOS_SUCCESS,
  props<{ todos: TodoInterface[] }>(),
);

export const getTodosFailureAction = createAction(
  TodoActionTypes.GET_TODOS_FAILURE,
);

export const removeTodoAction = createAction(
  TodoActionTypes.REMOVE_TODO,
  props<{ todoId: number }>(),
);

export const removeTodoSuccessAction = createAction(
  TodoActionTypes.REMOVE_TODO_SUCCESS,
);
export const removeTodoFailureAction = createAction(
  TodoActionTypes.REMOVE_TODO_FAILURE,
);
