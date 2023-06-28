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
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import {
  TaskCreateDto,
  TaskUpdateDto,
  TaskItemDto,
  TaskItemListDto,
  TaskCompleteDto,
} from './task.dto';
import { NotFoundInterceptor } from '../injectable';

const ERROR_NOT_FOUND = 'No task found for given Id';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary:
      'Получение всех задач (с группами в которые они входят (если есть))',
  })
  @ApiResponse({
    status: 200,
    description: 'Массив задач',
    type: [TaskItemDto],
  })
  findAll(): Promise<TaskItemListDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение задачи' })
  @ApiResponse({ status: 200, description: 'Задача', type: TaskItemDto })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskItemDto | null> {
    return this.tasksService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 201, description: 'Задача', type: TaskItemDto })
  @HttpCode(201)
  async create(@Body() taskDateDto: TaskCreateDto): Promise<TaskItemDto> {
    return this.tasksService.create(taskDateDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение задачи' })
  @ApiResponse({ status: 200, description: 'Задача', type: TaskItemDto })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDateDto: TaskUpdateDto,
  ): Promise<TaskItemDto | null> {
    return this.tasksService.update(id, taskDateDto);
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Проставить флаг завершенности для задачи' })
  @ApiResponse({ status: 200, description: 'Задача', type: TaskItemDto })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDataDto: TaskCompleteDto
  ): Promise<TaskItemDto | null> {
    return this.tasksService.update(id, taskDataDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
