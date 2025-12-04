import { Component, ElementRef, EventEmitter, inject, Output, signal, ViewChild } from "@angular/core";
import { Status } from "../../tasks/models/status.model";
import { BrowserModule } from "@angular/platform-browser";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskService } from "../../tasks/services/task-service";
import { Task } from "../../tasks/models/task.model";
import { TaskType } from "../../tasks/models/task-type.model";
import { CREATE_ERROR } from "../constants";

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrl: './edit-dialog.component.css',
    imports: [BrowserModule, ReactiveFormsModule]
})
export class EditDialogComponent {
    // dependency injections
    private taskService = inject(TaskService);

    // view and data binding properties
    @ViewChild('dialogElement') dialogElement!: ElementRef;
    @Output() taskResponse = new EventEmitter<any>();
    
    // signals
    isDialogOpen = signal(false);
    isRequestFailed = signal(false);
    createErrorMsg = signal(CREATE_ERROR);

    // other class members
    taskId: number;
    isEditMode: boolean;
    dialogTitle: string;
    taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        taskType: new FormControl('')
    });
    statuses: Status[] = [
        { value: 'new', label: 'New' },
        { value: 'inProgress', label: 'In Progress' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
    ];
    selectedValue: Status | null = { value: 'new', label: 'New' };

    taskTypes: TaskType[] = [
        { value: 'task', label: 'Task' },
        { value: 'feature', label: 'Feature' },
        { value: 'bug', label: 'Bug' }
    ];
    selectedTaskType: TaskType | null = { value: 'task', label: 'Task' };
    createdAt: Date;

    open(taskId: number, taskData: Task, isEditMode: boolean) {
        this.isEditMode = isEditMode;
        this.createdAt = taskData.createdAt;
        if (isEditMode) {
            this.dialogTitle = 'Edit';
            this.taskId = taskId;
            this.taskForm.setValue({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                taskType: taskData.taskType
            });
        } else {
            this.dialogTitle = 'Add';
        }
        this.isDialogOpen.set(true);
    }
    
    close() {
        this.isDialogOpen.set(false);
    }

    onSubmit() {
        const task: Task = {
            title: this.taskForm.value['title'],
            description: this.taskForm.value['description'],
            status: this.taskForm.value['status'],
            taskType: this.taskForm.value['taskType'],
            createdAt: this.createdAt
        };
        if (this.isEditMode) {
            this.taskService.updateTask(this.taskId, task).subscribe({
                next: (response) => {
                    console.log(typeof response);
                    this.taskResponse.emit(response);
                    this.close();
                },
                error: (error) => {
                    console.log(error);
                    this.isRequestFailed.set(true);
                    this.close();
                    setTimeout(() => {
                        this.isRequestFailed.set(false);
                    }, 3000);
                }
            });
        } else {
            this.taskService.addTask(task).subscribe({
                next: (response) => {
                    console.log(response)
                    this.taskResponse.emit(response);
                    this.close();
                },
                error: (error) => {
                    console.log(error);
                    this.isRequestFailed.set(true);
                    this.close();
                    setTimeout(() => {
                        this.isRequestFailed.set(false);
                    }, 3000);
                }
            });
        }
    }
}