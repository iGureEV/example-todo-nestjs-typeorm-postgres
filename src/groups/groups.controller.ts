import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupEntity } from './group.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(): Promise<GroupEntity[]> {
    return this.groupsService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<GroupEntity | null> {
    return this.groupsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: Partial<GroupEntity>): Promise<GroupEntity> {
    return this.groupsService.create(data);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<GroupEntity>,
  ): Promise<void> {
    return this.groupsService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.groupsService.delete(id);
  }
}
