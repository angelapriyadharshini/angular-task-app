import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../services/task-service';
import { Task } from '../models/task.model';
import { EditDialogComponent } from '../../shared/dialogs/edit-dialog.component';
import { UPDATE_ERROR } from '../../shared/constants';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements AfterViewInit {
  // dependency injections
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);
  private taskService = inject(TaskService);

  // view properties
  @ViewChild('editDialog', { static: false }) dialog!: EditDialogComponent;

  // signals
  taskId = signal(0); // I used signal here to dynamically change param without reloading the entire component
  taskData = signal<Task>({
    title: '',
    description: '',
    status: '',
    createdAt: new Date(),
    taskType: ''
  });
  isEditSuccess = signal(false);
  isEditFailed = signal(false);
  updateErrorMsg = signal(UPDATE_ERROR);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId.set(params['id']);
      if (this.taskId) {
        this.taskService.getTaskById(this.taskId()).subscribe({
          next: (response) => {
            this.taskData.set(response);
          },
          error: (error) => {
            console.log(error)
            this.isEditFailed.set(true);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    // The Viewchild modal dialog is rendered here
  }

  openTaskEditModal() {
    const isEditMode = true;
    this.dialog.open(this.taskId(), this.taskData(), isEditMode);
  }

  handleTaskResponse(response) {
    this.taskData.set({
      title: response.title,
      description: response.description,
      status: response.status,
      taskType: response.taskType,
      createdAt: response.createdAt
    });
    this.isEditSuccess.set(true);
    setTimeout(() => {
      this.isEditSuccess.set(false); 
    }, 3000);
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId()).subscribe({
      next: (response) => {
        this.goBack();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
