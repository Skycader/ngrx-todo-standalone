import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.routes').then((m) => m.routes),
  },
];
