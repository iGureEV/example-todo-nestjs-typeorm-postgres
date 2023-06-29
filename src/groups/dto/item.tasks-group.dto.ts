import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupItemDto } from './item-group.dto';
import { TaskItemDto } from '../../tasks/dto';

export class GroupItemListDto extends GroupItemDto {
  @ApiProperty({ type: [TaskItemDto] })
  @IsOptional()
  public tasks: TaskItemDto[];
}
