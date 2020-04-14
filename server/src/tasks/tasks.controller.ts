import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, ITaskDelete } from './task.model';
import { CreateTaskDto } from './dto/dto.create-task-dto';
import { create } from 'domain';
import { UpdateTaskDto, IUpdateTask } from './dto/update-task.dto';

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

  @Put('/:id')
  updateTask(@Param('id') id, @Body() updateTask: UpdateTaskDto): IUpdateTask {
    // console.log(id, updateTask);
    return this.tasksService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): ITaskDelete {
    return this.tasksService.deleteTask(id);
  }
}
