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
import { GroupsService } from './groups.service';
import {
  GroupCreateDto,
  GroupUpdateDto,
  GroupItemDto,
  GroupItemListDto,
} from './group.dto';
import { NotFoundInterceptor } from '../injectable';

const ERROR_NOT_FOUND = 'No group found for given Id';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(
    @Query('extends', new DefaultValuePipe(false), ParseBoolPipe)
    isExtends?: boolean,
  ): Promise<GroupItemDto[]> {
    return this.groupsService.findAll(isExtends);
  }

  @Get('/:id')
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GroupItemListDto | null> {
    return this.groupsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() groupDateDto: GroupCreateDto): Promise<GroupItemDto> {
    return this.groupsService.create(groupDateDto);
  }

  @Patch('/:id')
  @UseInterceptors(new NotFoundInterceptor(ERROR_NOT_FOUND))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() groupDateDto: GroupUpdateDto,
  ): Promise<GroupItemDto> {
    return this.groupsService.update(id, groupDateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.groupsService.delete(id);
  }
}
