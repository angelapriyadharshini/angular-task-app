export class Task {
    public title: string;
    public description: string;
    public createdAt: Date;
    public status: string;

    constructor(title, description, createdAt, status) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.status = status;
    }
}