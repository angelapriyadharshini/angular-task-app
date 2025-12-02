import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Status } from '../models/status.model';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  statuses: Status[] = [
    { value: 'new', label: 'New' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' }
  ];
  selectedValue: Status | null = { value: 'new', label: 'New' };

}
