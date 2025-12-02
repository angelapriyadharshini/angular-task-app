import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './tasks/task-list/task-list';
import { TaskDetail } from './tasks/task-detail/task-detail';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskList,
    children: [
      { path: 'tasks/:id', component: TaskDetail }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
