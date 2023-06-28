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
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
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
  @ApiOkResponse({ type: [TaskItemDto] })
  findAll(): Promise<TaskItemListDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskItemDto | null> {
    return this.tasksService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание задачи' })
  @ApiCreatedResponse({ type: TaskItemDto })
  @HttpCode(201)
  async create(@Body() taskDataDto: TaskCreateDto): Promise<TaskItemDto> {
    return this.tasksService.create(taskDataDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDataDto: TaskUpdateDto,
  ): Promise<TaskItemDto | null> {
    return this.tasksService.update(id, taskDataDto);
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Проставить флаг завершенности для задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDataDto: TaskCompleteDto
  ): Promise<TaskItemDto | null> {
    return this.tasksService.update(id, taskDataDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
