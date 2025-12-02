// export class Task {
//     public title: string;
//     public description: string;
//     public createdAt: Date;
//     public status: string;
//     public taskType: string;

//     constructor(title, description, createdAt, status, taskType) {
//         this.title = title;
//         this.description = description;
//         this.createdAt = createdAt;
//         this.status = status;
//         this.taskType = taskType;
//     }
// }

export interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    status: string;
    taskType: string;
}