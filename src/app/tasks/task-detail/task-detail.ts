import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Status } from '../models/status.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  readonly id: string;
  taskId = signal(''); // I used signal here to dynamically change param without reloading the entire component
  private activatedRoute = inject(ActivatedRoute);
  statuses: Status[] = [
    { value: 'new', label: 'New' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' }
  ];
  selectedValue: Status | null = { value: 'new', label: 'New' };

  constructor() {

    this.activatedRoute.params.subscribe((params) => {
      this.taskId.set(params['id']);
    });

  }
}
