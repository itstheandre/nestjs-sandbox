import { TaskStatus, Task } from '../task.model';
export declare class UpdateTaskDto {
    id: string;
    status: TaskStatus;
}
export interface IUpdateTask {
    updated: Task[];
    changed: Task;
}
