import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GroupItemDto } from './item-group.dto';
import { TaskItemDto } from '../../tasks/dto';

export class GroupItemListDto extends PartialType(GroupItemDto) {
  @ApiPropertyOptional({ type: TaskItemDto, isArray: true })
  public tasks?: TaskItemDto[];
}
