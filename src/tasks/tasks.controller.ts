import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task | null> {
    return this.tasksService.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Task>): Promise<Task> {
    return this.tasksService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Task>,
  ): Promise<void> {
    return this.tasksService.update(id, data);
  }

  @Patch(':id/done')
  async complete(@Param('id') id: number): Promise<void> {
    return this.tasksService.update(id, { isComplete: true });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
