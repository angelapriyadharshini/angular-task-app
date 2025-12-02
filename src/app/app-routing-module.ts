import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './tasks/task-list/task-list';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { Tasks } from './tasks/tasks';

const routes: Routes = [
  {
    path: 'tasks',
    component: Tasks,
    children: [
      { path: '', component: TaskList },
      { path: ':id', component: TaskDetail }
    ]
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
