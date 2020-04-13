import { TasksService } from './tasks.service';
import { Task, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto.create-task-dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    deleteTask(id: string): ITaskDelete;
}
