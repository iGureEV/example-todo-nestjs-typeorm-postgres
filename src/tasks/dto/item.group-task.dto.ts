import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { GroupItemDto } from '../../groups/dto';
import { TaskItemDto } from './item-task.dto';

export class TaskItemListDto extends PartialType(TaskItemDto) {
  @ApiProperty()
  @IsOptional()
  group: GroupItemDto;
}
