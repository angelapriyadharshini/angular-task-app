import { TestBed } from '@angular/core/testing';

import { TaskService } from './task-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BACKEND_API_BASE_URL } from '../../shared/constants';
import { provideHttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpTestingController;

  const apiUrl = BACKEND_API_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(),
      provideHttpClientTesting(),
        TaskService]
    });
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all the tasks', () => {
    const mockTaskList: Task[] = [
      {
        'title': 'Fix login bug',
        'description': 'Users report that the login functionality is failing. When valid credentials are entered, the system does not authenticate the user and the login attempt is rejected.',
        'status': 'Done',
        'taskType': 'Bug',
        'createdAt': new Date('2025-12-04T12:18:16.776Z')
      },
      {
        'title': 'Implement search',
        'description': 'Need a search bar to locate a specific task',
        'createdAt': new Date('2025-12-04T12:18:16.776Z'),
        'status': 'Pending',
        'taskType': 'Bug'
      }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTaskList);
    });

    const request = http.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');

    request.flush(mockTaskList);
  });

  it('should GET a task by its Id', () => {
    const mockTask = [
      {
        'id': '3',
        'title': 'Fix login bug',
        'description': 'Users report that the login functionality is failing. When valid credentials are entered, the system does not authenticate the user and the login attempt is rejected.',
        'status': 'Done',
        'taskType': 'Bug',
        'createdAt': new Date('2025-12-04T12:18:16.776Z')
      }
    ];

    service.getTaskById(3).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const request = http.expectOne(`${apiUrl}/3`);
    expect(request.request.method).toBe('GET');

    request.flush(mockTask);
  });

  it('should POST a task', () => {
    const mockTask = {
      'title': 'Fix login bug',
      'description': 'Users report failing.',
      'status': 'Done',
      'taskType': 'Bug',
      'createdAt': new Date('2025-12-04T12:18:16.776Z')
    } as Task;

    const newTask = {
      'title': 'Fix login bug',
      'description': 'Users report failing.',
      'status': 'Done',
      'taskType': 'Bug',
      'createdAt': new Date('2025-12-04T12:18:16.776Z')
    }

    service.addTask(mockTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const request = http.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockTask);

    request.flush(mockTask);
  });

  it('should PUT(edit) a task', () => {
    const mockTask = {
      'title':'Login issue',
      'description': 'Users report failing.',
      'status': 'Done',
      'taskType': 'Bug',
      'createdAt': new Date('2025-12-04T12:18:16.776Z')
    };

    service.updateTask(2, mockTask).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const request = http.expectOne(`${apiUrl}/2`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(mockTask);

    request.flush(mockTask);
  });

  it('should DELETE a task', () => {
    

    service.deleteTask(1).subscribe(task => {
      expect(task).toBeUndefined();
    });

    const request = http.expectOne(`${apiUrl}/1`);
    expect(request.request.method).toBe('DELETE');

    request.flush({});
  });
  
});
