import { Task, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto/dto.create-task-dto';
import { UpdateTaskDto, IUpdateTask } from './dto/update-task.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): IUpdateTask;
    deleteTask(id: string): ITaskDelete;
}
