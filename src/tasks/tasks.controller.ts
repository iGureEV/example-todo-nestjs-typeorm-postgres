import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpException,
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
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { TaskCreateDto, TaskUpdateDto, TaskItemDto, TaskItemListDto, TaskCompleteDto } from './dto';
import { NotFoundInterceptor } from '../injectables';
import { ERROR_NOT_FOUND_TASK } from '../util/exception';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех задач (с группами в которые они входят (если есть))' })
  @ApiOkResponse({ type: [TaskItemDto] })
  findAll(): Promise<TaskItemListDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND_TASK))
  async findById(@Param('id', ParseIntPipe) id: number): Promise<TaskItemDto | null> {
    return this.tasksService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание задачи' })
  @ApiCreatedResponse({ type: TaskItemDto })
  @ApiBadRequestResponse()
  @HttpCode(201)
  async create(@Body() taskDataDto: TaskCreateDto): Promise<TaskItemDto | HttpException> {
    return this.tasksService.create(taskDataDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND_TASK))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDataDto: TaskUpdateDto,
  ): Promise<TaskItemDto | HttpException> {
    return this.tasksService.update(id, taskDataDto);
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Проставить флаг завершенности для задачи' })
  @ApiOkResponse({ type: TaskItemDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND_TASK))
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDataDto: TaskCompleteDto,
  ): Promise<TaskItemDto | HttpException> {
    return this.tasksService.complete(id, taskDataDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.delete(id);
  }
}
