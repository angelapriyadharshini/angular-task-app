import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Tasks } from './tasks/tasks';
import { TaskList } from './tasks/task-list/task-list';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { Header } from './shared/components/header/header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicClassPipe } from './shared/pipes/dynamic-class-pipe';
import { EditDialogComponent } from "./shared/dialogs/edit-dialog.component";

@NgModule({
  declarations: [
    App,
    Tasks,
    TaskList,
    TaskDetail,
    Header,
    DynamicClassPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditDialogComponent
],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
