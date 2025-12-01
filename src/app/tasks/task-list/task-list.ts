import { Component, OnInit, signal, computed } from '@angular/core';

import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: Task[] = [
    new Task('Fix login bug', 'Users are unable to log in when entering correct credentials', new Date("2025-11-20T10:00:00Z"), 'Done'),
    new Task('Implement search', 'Need a search bar to locate a specific task', new Date("2025-12-01T10:00:00Z"), 'In Progress'),
    new Task('Update documentation', 'The documentation for Angular to be updated to the latest version', new Date("2025-11-22T10:00:00Z"), 'Pending')
  ];

  ngOnInit(): void {
   
  }
}
