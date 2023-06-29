import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GroupItemDto } from '../../groups/dto';
import { TaskItemDto } from './item-task.dto';

export class TaskItemListDto extends PartialType(TaskItemDto) {
  @ApiPropertyOptional()
  public group?: GroupItemDto;
}
