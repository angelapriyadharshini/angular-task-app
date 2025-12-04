import { Component, inject, signal, ViewChild } from '@angular/core';

import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task-service';
import { EditDialogComponent } from '../../shared/dialogs/edit-dialog.component';
import { LIST_ERROR, SUCCESS_MSG } from '../../shared/constants';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @ViewChild('editDialog', { static: false }) dialog!: EditDialogComponent;

  tasks = signal<Task[]>([]);
  taskData = signal<Task>({
    title: '',
    description: '',
    status: '',
    createdAt: new Date(),
    taskType: ''
  });
  isRequestSuccess = signal(false);
  filteredTaskList = signal<Task[]>([]);
  errorMsg = signal(LIST_ERROR);
  taskSuccessMsg = signal(SUCCESS_MSG);
  isError = signal(false);

  isAscendingOrder: boolean = true;

  constructor() {
    // loading the tasks initiallly
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks.set(response);
        this.filteredTaskList.set(this.tasks());
      },
      error: (error) => {
        this.isError.set(true);
        setTimeout(() => {
          this.isError.set(false);
        }, 3000);
      }
    });
  }

  openTaskEditModal() {
    const isEditMode = false;
    this.dialog.open(0, this.taskData(), isEditMode);
  }

  handleTaskResponse(response) {
    if (response) {
      this.isRequestSuccess.set(true);
      this.taskService.getTasks().subscribe({
        next: (response) => {
          this.tasks.set(response);
          this.filteredTaskList.set(this.tasks());
        },
        error: (error) => {
          console.log(error)
        }
      });
      setTimeout(() => {
        this.isRequestSuccess.set(false);
      }, 3000);
    }
  }

  goToDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  // to be moved to utility class
  // sort all the tasks by title
  sortTasks() {
    this.isAscendingOrder = !this.isAscendingOrder;
    this.filteredTaskList.set(this.filteredTaskList().sort((a, b) => {
      if (this.isAscendingOrder) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    }));
  }

  // to be moved to utility class
  searchTasks(text: string) {
    if (!text) {
      this.filteredTaskList.set(this.tasks());
    }
    this.filteredTaskList.set(this.tasks().filter((task) =>
      task?.title.toLowerCase().includes(text.toLowerCase())));
  }

}
