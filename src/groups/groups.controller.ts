import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import {
  GroupCreateDto,
  GroupUpdateDto,
  GroupItemDto,
  GroupItemListDto,
} from './group.dto';
import { NotFoundInterceptor } from '../injectable';

const ERROR_NOT_FOUND = 'No group found for given Id';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка групп' })
  @ApiQuery({ name: 'extends' })
  @ApiResponse({
    status: 200,
    description: 'Массив задач',
    type: [GroupItemListDto],
  })
  findAll(
    @Query('extends', new DefaultValuePipe(false), ParseBoolPipe)
    isExtends?: boolean,
  ): Promise<GroupItemListDto[]> {
    return this.groupsService.findAll(isExtends);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение группы с задачами' })
  @ApiResponse({ status: 200, description: 'Группа', type: GroupItemDto })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GroupItemListDto | null> {
    return this.groupsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание группы' })
  @ApiResponse({ status: 201, description: 'Группа', type: GroupItemDto })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() groupDateDto: GroupCreateDto): Promise<GroupItemDto> {
    return this.groupsService.create(groupDateDto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Изменение группы' })
  @ApiResponse({ status: 200, description: 'Группа', type: GroupItemDto })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() groupDateDto: GroupUpdateDto,
  ): Promise<GroupItemDto> {
    return this.groupsService.update(id, groupDateDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Удаление группы и всех задач в ней' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.groupsService.delete(id);
  }
}
