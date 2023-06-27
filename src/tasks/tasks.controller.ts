import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  TaskCreateDto,
  TaskUpdateDto,
  TaskItemDto,
  TaskItemListDto,
} from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<TaskItemDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskItemListDto | null> {
    return this.tasksService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() taskDateDto: TaskCreateDto): Promise<TaskItemDto> {
    return this.tasksService.create(taskDateDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDateDto: TaskUpdateDto,
  ): Promise<TaskItemDto> {
    return this.tasksService.update(id, taskDateDto);
  }

  @Patch(':id/done')
  async complete(@Param('id', ParseIntPipe) id: number): Promise<TaskItemDto> {
    return this.tasksService.update(id, { isComplete: true });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
