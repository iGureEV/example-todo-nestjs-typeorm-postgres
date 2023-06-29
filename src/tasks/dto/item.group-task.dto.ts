import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupItemDto } from '../../groups/dto';
import { TaskItemDto } from './item-task.dto';

export class TaskItemListDto extends TaskItemDto {
  @ApiProperty()
  @Allow()
  group: GroupItemDto;
}
