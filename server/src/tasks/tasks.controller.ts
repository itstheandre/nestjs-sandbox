import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto.create-task-dto';
import { create } from 'domain';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    // // @Body('title') title: string,
    @Body() createTaskDto: CreateTaskDto,
    // @Body('description') description: string,
  ) {
    // console.log(title, description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): ITaskDelete {
    return this.tasksService.deleteTask(id);
  }
}
