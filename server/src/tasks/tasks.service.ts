import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto.create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const theOne = this.tasks.find(el => el.id === id);

    return theOne;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
    //
  }

  deleteTask(id: string): ITaskDelete {
    const theOne = this.tasks.findIndex(el => el.id === id);
    const copy = { ...this.tasks[theOne] };
    this.tasks = this.tasks.filter(el => el.id !== id);
    return { deleted: copy, updated: this.tasks };
  }
}
