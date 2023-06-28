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
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  TaskCreateDto,
  TaskUpdateDto,
  TaskItemDto,
  TaskItemListDto,
} from './task.dto';
import { NotFoundInterceptor } from '../injectable';

const ERROR_NOT_FOUND = 'No task found for given Id';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<TaskItemDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
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
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDateDto: TaskUpdateDto,
  ): Promise<TaskItemListDto | null> {
    return this.tasksService.update(id, taskDateDto);
  }

  @Patch(':id/done')
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async complete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskItemListDto | null> {
    return this.tasksService.update(id, { isComplete: true });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
