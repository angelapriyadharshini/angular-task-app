import { Component, inject, OnInit } from '@angular/core';

import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  badgePrefix: string = 'btn-outline-';
  tasks: Task[] = [
    {id: 1, title: 'Fix login bug', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-20T10:00:00Z"), status: 'Done', taskType: 'Bug'},
    {id: 2, title: 'Implement search', description: 'Need a search bar to locate a specific task', createdAt: new Date("2025-12-01T10:00:00Z"), status: 'Pending', taskType: 'Bug'},
    {id: 3, title: 'Update documentation', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-20T10:00:00Z"), status: 'In Progress', taskType: 'Task'},
    {id: 4, title: 'Fix documentation bug', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-20T10:00:00Z"), status: 'Pending', taskType: 'Bug'},
    {id: 5, title: 'UI issue', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-10T10:00:00Z"), status: 'Done', taskType: 'Bug'},
    {id: 6, title: 'Duplicating values', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-15T10:00:00Z"), status: 'Pending', taskType: 'Bug'},
    {id: 7, title: 'Add a button', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-20T10:00:00Z"), status: 'Done', taskType: 'Feature'},
    {id: 8, title: 'Modify banner width', description: 'Users are unable to log in when entering correct credentials', createdAt: new Date("2025-11-12T10:00:00Z"), status: 'Done', taskType: 'Feature'}
  ];

  ngOnInit(): void {
  }

  goToDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  dynamicClass(status: string): string {
    if(status === 'In Progress') {
      return  `${this.badgePrefix}warning`;
    } else if (status === 'Pending'){
      return  `${this.badgePrefix}secondary`;
    } else if (status === 'Done') {
      return  `${this.badgePrefix}success`;
    } else if (status === 'New') {
      return  `${this.badgePrefix}primary`;
    } else {
      return  `${this.badgePrefix}dark`;
    }
  }
}
