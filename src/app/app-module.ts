import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Tasks } from './tasks/tasks';
import { TaskList } from './tasks/task-list/task-list';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { TaskItem } from './tasks/task-list/task-item/task-item';

@NgModule({
  declarations: [
    App,
    Tasks,
    TaskList,
    TaskDetail,
    TaskItem
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
