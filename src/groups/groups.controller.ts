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
  HttpException,
  ParseIntPipe,
  ParseBoolPipe,
  DefaultValuePipe,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import {
  GroupCreateDto,
  GroupUpdateDto,
  GroupItemDto,
  GroupItemListDto,
} from './group.dto';
import { NotFoundInterceptor } from '../injectable';

const ERROR_NOT_FOUND = 'No group found for given Id';

const catchException = (err: HttpException): HttpException => {
  if (0 <= err.message.indexOf('long for type character varying')) {
    throw new HttpException(
      {
        message: err.message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return err;
};

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка групп' })
  @ApiQuery({ name: 'extends', required: false, type: Boolean })
  @ApiOkResponse({ type: [GroupItemListDto] })
  findAll(
    @Query('extends', new DefaultValuePipe(false), ParseBoolPipe)
    isExtends?: boolean,
  ): Promise<GroupItemListDto[]> {
    return this.groupsService.findAll(isExtends);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение группы с задачами' })
  @ApiOkResponse({ type: GroupItemDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GroupItemListDto | null> {
    return this.groupsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание группы' })
  @ApiCreatedResponse({ type: GroupItemDto })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() groupDateDto: GroupCreateDto,
  ): Promise<GroupItemDto | HttpException> {
    return this.groupsService.create(groupDateDto).catch(catchException);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Изменение группы' })
  @ApiOkResponse({ type: GroupItemDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() groupDateDto: GroupUpdateDto,
  ): Promise<GroupItemDto | HttpException> {
    return this.groupsService.update(id, groupDateDto).catch(catchException);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Удаление группы и всех задач в ней' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.groupsService.delete(id);
  }
}
