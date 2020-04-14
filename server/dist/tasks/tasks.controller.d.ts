import { TasksService } from './tasks.service';
import { Task, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto/dto.create-task-dto';
import { UpdateTaskDto, IUpdateTask } from './dto/update-task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTask(id: any, updateTask: UpdateTaskDto): IUpdateTask;
    deleteTask(id: string): ITaskDelete;
}
