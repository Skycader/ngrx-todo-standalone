import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { TodoInterface } from './todo.model';
import { CommonModule } from '@angular/common';
import { Store, provideState, select } from '@ngrx/store';
import { selectTodos, todoFeatureKey, todoReducer } from './store/todo.reducer';
import { AppStateInterface } from './models/app-state.model';
import {
  addTodoAction,
  checkTodoAction,
  getTodosAction,
  removeTodoAction,
  uncheckTodoAction,
} from './store/todo.action';
import { Todo } from './models/todo.class';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  imports: [CommonModule, FormsModule],
  providers: [],
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  public todoTitle: string = '';

  public todos$: Observable<TodoInterface[]> = this.store.pipe(
    select(selectTodos),
  );

  constructor(
    private store: Store<AppStateInterface>,
    private themeService: ThemeService,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(getTodosAction());
  }
  public addTodo() {
    this.store.dispatch(addTodoAction({ todo: new Todo(this.todoTitle) }));
    this.todoTitle = '';
  }

  public toggleTodo(todo: TodoInterface) {
    if (todo.done === 0)
      this.store.dispatch(checkTodoAction({ todoId: todo.id }));
    if (todo.done === 1)
      this.store.dispatch(uncheckTodoAction({ todoId: todo.id }));
  }

  public removeTodo(todoId: number) {
    this.store.dispatch(removeTodoAction({ todoId }));
  }
}
