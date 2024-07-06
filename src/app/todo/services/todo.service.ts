import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { db } from '../database/db';
import { Todo } from '../database/todo.entity';
import { TodoInterface } from '../todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public getTodos(): Observable<TodoInterface[]> {
    return from(db.todo.orderBy(Todo.id).toArray());
  }

  public addTodo(todo: TodoInterface): Observable<number> {
    return from(db.todo.add(todo));
  }

  public checkTodo(todoId: number) {
    return from(db.todo.where({ id: todoId }).modify({ done: 1 }));
  }

  public uncheckTodo(todoId: number) {
    return from(db.todo.where({ id: todoId }).modify({ done: 0 }));
  }

  public removeTodo(todoId: number) {
    return from(db.todo.where({ id: todoId }).delete());
  }

  public clearTodos() {
    return from(db.todo.clear());
  }
}
