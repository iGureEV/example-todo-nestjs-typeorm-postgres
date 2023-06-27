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
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import {
  GroupCreateDto,
  GroupUpdateDto,
  GroupItemDto,
  GroupItemListDto,
} from './group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(@Query('extends') isExtends?: boolean): Promise<GroupItemDto[]> {
    return this.groupsService.findAll(isExtends);
  }

  @Get('/:id')
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() groupDateDto: GroupUpdateDto,
  ): Promise<GroupItemDto> {
    return this.groupsService.update(id, groupDateDto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.groupsService.delete(id);
  }
}
