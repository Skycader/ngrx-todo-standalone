import { TodoInterface } from '../todo.model';

export class Todo implements TodoInterface {
  id = Date.now();
  title = '';
  description = '';
  deadline = 0;
  done = 0;

  constructor(public todoTitle: string) {
    this.title = todoTitle;
  }
}
