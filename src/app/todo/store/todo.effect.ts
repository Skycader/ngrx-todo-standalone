import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTodoAction,
  addTodoFailureAction,
  addTodoSuccessAction,
  getTodosAction,
  getTodosFailureAction,
  getTodosSuccessAction,
  removeTodoAction,
  removeTodoFailureAction,
  removeTodoSuccessAction,
} from './todo.action';
import { catchError, of, switchMap, map } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from '../todo.model';
@Injectable()
export class TodoEffect {
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodoAction),
      switchMap(({ todo }) => {
        return this.todoService.addTodo(todo).pipe(
          map(() => {
            return addTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(addTodoFailureAction());
          }),
        );
      }),
    ),
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodoAction),
      switchMap(({ todoId }) => {
        return this.todoService.removeTodo(todoId).pipe(
          map(() => {
            return removeTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(removeTodoFailureAction());
          }),
        );
      }),
    ),
  );

  getTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodosAction),
      switchMap(() => {
        return this.todoService.getTodos().pipe(
          map((todos: TodoInterface[]) => {
            return getTodosSuccessAction({ todos });
          }),
          catchError(() => {
            return of(getTodosFailureAction());
          }),
        );
      }),
    ),
  );

  refreshTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodoSuccessAction, removeTodoSuccessAction),
      switchMap(() => {
        return of(getTodosAction());
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
}
