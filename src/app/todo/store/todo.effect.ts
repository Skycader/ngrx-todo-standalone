import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.action';
import { catchError, of, switchMap, map } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { TodoInterface } from '../todo.model';
@Injectable()
export class TodoEffect {
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodoAction),
      switchMap(({ todo }) => {
        return this.todoService.addTodo(todo).pipe(
          map(() => {
            return TodoActions.addTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(TodoActions.addTodoFailureAction());
          }),
        );
      }),
    ),
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodoAction),
      switchMap(({ todoId }) => {
        return this.todoService.removeTodo(todoId).pipe(
          map(() => {
            return TodoActions.removeTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(TodoActions.removeTodoFailureAction());
          }),
        );
      }),
    ),
  );

  checkTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.checkTodoAction),
      switchMap(({ todoId }) => {
        return this.todoService.checkTodo(todoId).pipe(
          map(() => {
            return TodoActions.checkTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(TodoActions.checkTodoFailureAction());
          }),
        );
      }),
    ),
  );

  uncheckTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.uncheckTodoAction),
      switchMap(({ todoId }) => {
        return this.todoService.uncheckTodo(todoId).pipe(
          map(() => {
            return TodoActions.uncheckTodoSuccessAction();
          }),
          catchError((e: Error) => {
            console.warn(e);
            return of(TodoActions.uncheckTodoFailureAction());
          }),
        );
      }),
    ),
  );

  getTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodosAction),
      switchMap(() => {
        return this.todoService.getTodos().pipe(
          map((todos: TodoInterface[]) => {
            return TodoActions.getTodosSuccessAction({ todos });
          }),
          catchError(() => {
            return of(TodoActions.getTodosFailureAction());
          }),
        );
      }),
    ),
  );

  refreshTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TodoActions.addTodoSuccessAction,
        TodoActions.removeTodoSuccessAction,
        TodoActions.checkTodoSuccessAction,
      ),
      switchMap(() => {
        return of(TodoActions.getTodosAction());
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) { }
}
